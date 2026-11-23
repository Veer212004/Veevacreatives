import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  createAdminAuthHandler,
  createAdminPublishHandler,
} from "./admin-api.js";

const originalEnv = {
  ADMIN_CODE: process.env.ADMIN_CODE,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
  GITHUB_BRANCH: process.env.GITHUB_BRANCH,
};

afterEach(() => {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function responseRecorder() {
  return {
    headers: {},
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(status) {
      this.statusCode = status;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

function githubStub(works = []) {
  const calls = [];
  const fetchImpl = async (url, options = {}) => {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname.replace(
      "/repos/Veer212004/Veevacreatives",
      "",
    );
    calls.push({ path, method: options.method || "GET", body: options.body });
    let body;
    if (path === "/git/ref/heads/main")
      body = { object: { sha: "parent-sha" } };
    else if (path === "/git/commits/parent-sha")
      body = { tree: { sha: "base-tree" } };
    else if (path.startsWith("/contents/src/data/admin-works.json"))
      body = { content: Buffer.from(JSON.stringify(works)).toString("base64") };
    else if (path === "/git/blobs" && options.method === "POST")
      body = { sha: `blob-${calls.length}` };
    else if (path === "/git/trees" && options.method === "POST")
      body = { sha: "new-tree" };
    else if (path === "/git/commits" && options.method === "POST")
      body = { sha: "new-commit" };
    else if (path === "/git/refs/heads/main" && options.method === "PATCH")
      body = { ref: "refs/heads/main" };
    else
      return new Response(JSON.stringify({ message: `Unexpected ${path}` }), {
        status: 404,
      });
    return new Response(JSON.stringify(body), { status: 200 });
  };
  return { calls, fetchImpl };
}

function configureGitHub() {
  process.env.ADMIN_CODE = "test-admin-code";
  process.env.GITHUB_TOKEN = "test-token";
  process.env.GITHUB_REPOSITORY = "Veer212004/Veevacreatives";
  process.env.GITHUB_BRANCH = "main";
}

test("admin authentication rejects an incorrect code without exposing it", async () => {
  process.env.ADMIN_CODE = "test-admin-code";
  const res = responseRecorder();
  await createAdminAuthHandler()(
    { method: "POST", body: { code: "wrong" } },
    res,
  );

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, {
    success: false,
    message: "Incorrect admin code.",
  });
  assert.equal(res.headers["Cache-Control"], "no-store");
});

test("publishing rejects an unauthorized request before contacting GitHub", async () => {
  configureGitHub();
  let fetchCalled = false;
  const res = responseRecorder();

  await createAdminPublishHandler(async () => {
    fetchCalled = true;
  })(
    {
      method: "POST",
      headers: { authorization: "Bearer wrong-code" },
      body: { action: "add" },
    },
    res,
  );

  assert.equal(res.statusCode, 401);
  assert.equal(fetchCalled, false);
});

test("publishing new work commits optimized image and metadata", async () => {
  configureGitHub();
  const { calls, fetchImpl } = githubStub();
  const res = responseRecorder();
  const image = `data:image/jpeg;base64,${Buffer.from("jpeg").toString("base64")}`;

  await createAdminPublishHandler(fetchImpl)(
    {
      method: "POST",
      headers: { authorization: "Bearer test-admin-code" },
      body: {
        action: "add",
        work: {
          title: "Test poster",
          cat: "Posters",
          desc: "Campaign artwork",
          images: [image],
        },
      },
    },
    res,
  );

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.commit, "new-commit");
  assert.match(res.body.work.id, /^admin-[\da-f-]{36}$/i);
  assert.deepEqual(res.body.work.images, [
    `/assets/admin/${res.body.work.id}-1.jpg`,
  ]);
  const treeCall = calls.find((call) => call.path === "/git/trees");
  const tree = JSON.parse(treeCall.body).tree;
  assert.equal(tree.length, 2);
  assert.equal(tree[0].path, `public${res.body.work.images[0]}`);
  assert.equal(tree[1].path, "src/data/admin-works.json");
});

test("publishing a removal deletes only its admin-owned image paths", async () => {
  configureGitHub();
  const id = "admin-123e4567-e89b-12d3-a456-426614174000";
  const { calls, fetchImpl } = githubStub([
    {
      id,
      title: "Old poster",
      images: [`/assets/admin/${id}-1.jpg`, "/assets/portfolio/keep.jpg"],
    },
  ]);
  const res = responseRecorder();

  await createAdminPublishHandler(fetchImpl)(
    {
      method: "POST",
      headers: { authorization: "Bearer test-admin-code" },
      body: { action: "remove", id },
    },
    res,
  );

  assert.equal(res.statusCode, 200);
  const treeCall = calls.find((call) => call.path === "/git/trees");
  const tree = JSON.parse(treeCall.body).tree;
  assert.deepEqual(
    tree.map(({ path, sha }) => ({ path, sha })),
    [
      { path: `public/assets/admin/${id}-1.jpg`, sha: null },
      { path: "src/data/admin-works.json", sha: tree[1].sha },
    ],
  );
});
