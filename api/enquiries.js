import { Resend } from "resend";

const SERVICES = new Set([
  "Poster & Social Media Design",
  "Website Design & Development",
  "Branding & Visual Identity",
  "UI/UX Design",
  "Creative Collaterals",
  "Custom Digital Solutions",
  "Multiple Services",
  "Other",
]);
const BUDGETS = new Set([
  "",
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000+",
]);
const METHODS = new Set(["Email", "Phone", "WhatsApp"]);

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const detailRows = (enquiry) => [
  ["Full name", enquiry.name],
  ["Email", enquiry.email],
  ["Phone", enquiry.phone || "Not provided"],
  ["Business / brand", enquiry.brand || "Not provided"],
  ["Service", enquiry.service],
  ["Budget", enquiry.budget || "Not provided"],
  ["Preferred contact", enquiry.preferred_contact_method],
].map(
  ([label, value]) =>
    `<tr><td style="padding:10px 12px;border-bottom:1px solid #eee;color:#777;font-size:13px;width:38%"><strong>${escapeHtml(label)}</strong></td><td style="padding:10px 12px;border-bottom:1px solid #eee;color:#18181d;font-size:13px">${escapeHtml(value)}</td></tr>`,
);

const emailShell = ({ preheader, title, intro, rows, accent = "#f2265b" }) => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:#f4f4f6;font-family:Arial,'Helvetica Neue',sans-serif;color:#18181d">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f6;padding:32px 12px">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e7e7ea">
            <tr>
              <td style="background:#050505;padding:28px 32px;border-bottom:4px solid ${accent}">
                <div style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:2px">VEEVA CREATIVES</div>
                <div style="color:#b8b8c2;font-size:12px;margin-top:4px;letter-spacing:1px;text-transform:uppercase">Digital creative studio</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px">
                <h1 style="margin:0 0 12px;font-size:26px;line-height:1.2;color:#18181d">${escapeHtml(title)}</h1>
                <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:#555560">${intro}</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #eee;border-radius:12px;overflow:hidden">${rows}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#fafafa;border-top:1px solid #eee;color:#777;font-size:12px;line-height:1.6">
                Veeva Creatives · <a href="mailto:veevacreatives26@gmail.com" style="color:${accent};text-decoration:none">veevacreatives26@gmail.com</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

function readText(body, key, maxLength, required = false) {
  const value = body[key];
  if (typeof value !== "string") return "";
  const text = value.trim();
  if (text.length > maxLength) return "";
  return required && !text ? "" : text;
}

export default async function handler(req, res) {
  res.setHeader("Allow", "POST");
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed." });
  if (req.body?.website) return res.status(201).json({ success: true, emailSent: false });

  const errors = {};
  const enquiry = {
    name: readText(req.body || {}, "name", 120, true),
    email: readText(req.body || {}, "email", 254, true).toLowerCase(),
    phone: readText(req.body || {}, "phone", 40),
    brand: readText(req.body || {}, "brand", 120),
    service: readText(req.body || {}, "service", 160, true),
    budget: readText(req.body || {}, "budget", 80),
    description: readText(req.body || {}, "desc", 5000, true),
    preferred_contact_method: readText(req.body || {}, "method", 20) || "Email",
  };

  if (!enquiry.name) errors.name = "Please enter your name.";
  if (!enquiry.email) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiry.email))
    errors.email = "Enter a valid email address.";
  if (!enquiry.service) errors.service = "Please choose a service.";
  else if (!SERVICES.has(enquiry.service)) errors.service = "Choose a valid service.";
  if (!BUDGETS.has(enquiry.budget)) errors.budget = "Choose a valid project budget.";
  if (!enquiry.description) errors.desc = "Please describe your project.";
  if (!METHODS.has(enquiry.preferred_contact_method))
    errors.method = "Choose a valid contact method.";
  if (req.body?.consent !== true) errors.consent = "Consent is required.";

  if (Object.keys(errors).length)
    return res.status(400).json({
      success: false,
      message: "Please check the enquiry details and try again.",
      errors,
    });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey)
    return res.status(503).json({
      success: false,
      message: "Email delivery is not configured yet.",
    });

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM || "Veeva Creatives <onboarding@resend.dev>";
  const studioEmail = process.env.STUDIO_EMAIL || "veevacreatives26@gmail.com";
  const rows = detailRows(enquiry);

  const customerHtml = emailShell({
    preheader: `We received your ${enquiry.service} enquiry`,
    title: `Thank you, ${enquiry.name}!`,
    intro: "We have received your project enquiry and will review the details. Our team will get back to you within 24 hours.",
    rows: [
      ...rows,
      `<tr><td style="padding:10px 12px;color:#777;font-size:13px;width:38%;vertical-align:top"><strong>Project details</strong></td><td style="padding:10px 12px;color:#18181d;font-size:13px;line-height:1.6;white-space:pre-wrap">${escapeHtml(enquiry.description)}</td></tr>`,
    ].join(""),
  });

  const studioHtml = emailShell({
    preheader: `New ${enquiry.service} enquiry from ${enquiry.name}`,
    title: "New project enquiry",
    intro: "A new enquiry was submitted through the Veeva Creatives website.",
    rows: [
      ...rows,
      `<tr><td style="padding:10px 12px;color:#777;font-size:13px;width:38%;vertical-align:top"><strong>Project details</strong></td><td style="padding:10px 12px;color:#18181d;font-size:13px;line-height:1.6;white-space:pre-wrap">${escapeHtml(enquiry.description)}</td></tr>`,
    ].join(""),
  });

  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to: enquiry.email,
      subject: "We received your project enquiry — Veeva Creatives",
      html: customerHtml,
    }),
    resend.emails.send({
      from,
      to: studioEmail,
      replyTo: enquiry.email,
      subject: `New project enquiry: ${enquiry.service} — ${enquiry.name}`,
      html: studioHtml,
    }),
  ]);

  const customerSent = results[0].status === "fulfilled";
  const studioNotified = results[1].status === "fulfilled";

  if (!customerSent || !studioNotified) {
    console.error("One or more Resend deliveries failed.", {
      customer: results[0].status === "rejected" ? results[0].reason : null,
      studio: results[1].status === "rejected" ? results[1].reason : null,
    });
  }

  if (!customerSent && !studioNotified)
    return res.status(502).json({
      success: false,
      message: "The enquiry could not be emailed. Please try again.",
    });

  return res.status(201).json({
    success: true,
    emailSent: customerSent,
  });
}
