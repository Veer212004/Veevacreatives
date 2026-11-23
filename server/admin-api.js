import { randomUUID, timingSafeEqual, createHash } from "node:crypto";

const WORKS_PATH = "src/data/admin-works.json";
const WORK_CATEGORIES = new Set([
  "Posters",
  "Social Media Creatives",
  "Product Advertising",
  "Logos & Branding",
  "Festival & Promotional Designs",
  "Print & Outdoor",
]);
const MAX_IMAGE_BYTES = 800_000;
const MAX_TOTAL_IMAGE_BYTES = 2_500_000;

const json = (res, status, body) => res.status(status).json(body);

function constantTimeEqual(left, right) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function submittedAdminCode(req) {
  const authorization = req.headers?.authorization || "";
  return authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";
}

function isAuthorized(req) {
  const expected = process.env.ADMIN_CODE;
  const submitted = submittedAdminCode(req);
  return Boolean(expected && submitted && constantTimeEqual(submitted, expected));
}

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY || "Veer212004/Veevacreatives";
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token) throw new Error("GITHUB_TOKEN is not configured.");
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository))
    throw new Error("GITHUB_REPOSITORY must use owner/repository format.");
  if (!/^[\w./-]+$/.test(branch))
    throw new Error("GITHUB_BRANCH contains invalid characters.");
  return { token, repository, branch };
}

function validImage(dataUrl) {
  const match =
    typeof dataUrl === "string" &&
    dataUrl.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/]+={0,2})$/);
  if (!match) throw new Error("Uploaded images must be valid JPEG files.");
  const bytes = Buffer.from(match[1], "base64");
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES)
    throw new Error("Each image must be smaller than 800 KB after optimization.");
  return bytes.toString("base64");
}

function validateNewWork(input) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Work details are required.");
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const category = typeof input.cat === "string" ? input.cat : "";
  const description =
    typeof input.desc === "string" ? input.desc.trim() : "";
  if (!title || title.length > 160) throw new Error("Enter a title up to 160 characters.");
  if (!WORK_CATEGORIES.has(category)) throw new Error("Choose a valid work category.");
  if (description.length > 3000)
    throw new Error("Description must be 3000 characters or fewer.");
  if (!Array.isArray(input.images) || !input.images.length || input.images.length > 6)
    throw new Error("Add between 1 and 6 artwork images.");

  const images = input.images.map(validImage);
  const totalBytes = images.reduce(
    (total, image) => total + Buffer.from(image, "base64").length,
    0,
  );
  if (totalBytes > MAX_TOTAL_IMAGE_BYTES)
    throw new Error("The optimized images are too large. Upload fewer or smaller images.");

  return { title, category, description, images };
}

export function createAdminAuthHandler() {
  return function adminAuthHandler(req, res) {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST")
      return json(res, 405, { success: false, message: "Method not allowed." });
    const expected = process.env.ADMIN_CODE;
    const submitted = typeof req.body?.code === "string" ? req.body.code : "";
    if (!expected)
      return json(res, 503, {
        success: false,
        message: "Admin access is not configured.",
      });
    if (!submitted || !constantTimeEqual(submitted, expected))
      return json(res, 401, { success: false, message: "Incorrect admin code." });
    return json(res, 200, { success: true });
  };
}

export function createAdminPublishHandler(fetchImpl = globalThis.fetch) {
  return async function adminPublishHandler(req, res) {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST")
      return json(res, 405, { success: false, message: "Method not allowed." });
    if (!isAuthorized(req))
      return json(res, 401, { success: false, message: "Admin session is not authorized." });

    let github;
    try {
      github = getGitHubConfig();
    } catch (error) {
      return json(res, 503, { success: false, message: error.message });
    }

    let workInput;
    let action;
    let removeId;
    try {
      action = req.body?.action;
      if (action === "add") workInput = validateNewWork(req.body?.work);
      else if (action === "remove" && /^admin-[\da-f-]{36}$/i.test(req.body?.id))
        removeId = req.body.id;
      else throw new Error("Choose a valid work publishing action.");
    } catch (error) {
      return json(res, 400, { success: false, message: error.message });
    }

    const apiBase = `https://api.github.com/repos/${github.repository}`;
    const githubRequest = async (path, method = "GET", body) => {
      const response = await fetchImpl(`${apiBase}${path}`, {
        method,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${github.token}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
          "User-Agent": "Veeva-Creatives-Admin",
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(
          result.message || `GitHub returned HTTP ${response.status}.`,
        );
        error.status = response.status;
        throw error;
      }
      return result;
    };

    try {
      const branchRef = encodeURIComponent(github.branch).replaceAll("%2F", "/");
      const ref = await githubRequest(`/git/ref/heads/${branchRef}`);
      const parentCommit = await githubRequest(`/git/commits/${ref.object.sha}`);
      const file = await githubRequest(
        `/contents/${WORKS_PATH}?ref=${encodeURIComponent(github.branch)}`,
      );
      const works = JSON.parse(
        Buffer.from(file.content, "base64").toString("utf8"),
      );
      if (!Array.isArray(works))
        throw new Error("The committed admin works file has an invalid format.");

      const tree = [];
      let updatedWorks = works;
      let resultWork;

      if (action === "add") {
        const id = `admin-${randomUUID()}`;
        const imagePaths = workInput.images.map(
          (_image, index) => `/assets/admin/${id}-${index + 1}.jpg`,
        );
        resultWork = {
          id,
          title: workInput.title,
          cat: workInput.category,
          tags: ["VEEVA Upload"],
          desc: workInput.description || "Recently uploaded creative work.",
          objective: "Present this creative work with a strong visual message.",
          approach: "Custom uploaded artwork managed through the Veeva admin panel.",
          deliver: ["Creative artwork"],
          images: imagePaths,
        };
        updatedWorks = [...works, resultWork];
        for (let index = 0; index < workInput.images.length; index += 1) {
          const blob = await githubRequest("/git/blobs", "POST", {
            content: workInput.images[index],
            encoding: "base64",
          });
          tree.push({
            path: `public${imagePaths[index]}`,
            mode: "100644",
            type: "blob",
            sha: blob.sha,
          });
        }
      } else {
        resultWork = works.find((work) => work.id === removeId);
        if (!resultWork)
          return json(res, 404, { success: false, message: "Work was not found." });
        updatedWorks = works.filter((work) => work.id !== removeId);
        for (const image of resultWork.images || []) {
          if (typeof image !== "string" || !image.startsWith(`/assets/admin/${removeId}-`))
            continue;
          tree.push({
            path: `public${image}`,
            mode: "100644",
            type: "blob",
            sha: null,
          });
        }
      }

      const jsonBlob = await githubRequest("/git/blobs", "POST", {
        content: JSON.stringify(updatedWorks, null, 2) + "\n",
        encoding: "utf-8",
      });
      tree.push({
        path: WORKS_PATH,
        mode: "100644",
        type: "blob",
        sha: jsonBlob.sha,
      });

      const newTree = await githubRequest("/git/trees", "POST", {
        base_tree: parentCommit.tree.sha,
        tree,
      });
      const commit = await githubRequest("/git/commits", "POST", {
        message:
          action === "add"
            ? `content: add work — ${resultWork.title}`
            : `content: remove work — ${resultWork.title}`,
        tree: newTree.sha,
        parents: [ref.object.sha],
      });
      await githubRequest(`/git/refs/heads/${branchRef}`, "PATCH", {
        sha: commit.sha,
        force: false,
      });

      return json(res, 200, {
        success: true,
        work: resultWork,
        commit: commit.sha,
        deploymentTriggered: true,
      });
    } catch (error) {
      console.error("Admin content commit failed:", error.message);
      const status = error.status === 409 ? 409 : 502;
      return json(res, status, {
        success: false,
        message:
          status === 409
            ? "The website changed while publishing. Please try again."
            : "Could not publish the work to GitHub. Check the Vercel function logs.",
      });
    }
  };
}
