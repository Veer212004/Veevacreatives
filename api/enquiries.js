import nodemailer from "nodemailer";
import { buildEnquiryEmail } from "../server/email-template.js";

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

function readText(body, key, maxLength, required = false) {
  const value = body[key];
  if (typeof value !== "string") return "";
  const text = value.trim();
  if (text.length > maxLength) return "";
  return required && !text ? "" : text;
}

export function createEnquiryHandler(
  createTransport = nodemailer.createTransport,
) {
  return async function handler(req, res) {
    res.setHeader("Allow", "POST");
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST")
      return res
        .status(405)
        .json({ success: false, message: "Method not allowed." });
    if (req.body?.website)
      return res.status(201).json({ success: true, emailSent: false });

    const errors = {};
    const enquiry = {
      name: readText(req.body || {}, "name", 120, true),
      email: readText(req.body || {}, "email", 254, true).toLowerCase(),
      phone: readText(req.body || {}, "phone", 40),
      brand: readText(req.body || {}, "brand", 120),
      service: readText(req.body || {}, "service", 160, true),
      budget: readText(req.body || {}, "budget", 80),
      description: readText(req.body || {}, "desc", 5000, true),
      preferred_contact_method:
        readText(req.body || {}, "method", 20) || "Email",
    };

    if (!enquiry.name) errors.name = "Please enter your name.";
    if (!enquiry.email) errors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiry.email))
      errors.email = "Enter a valid email address.";
    if (!enquiry.service) errors.service = "Please choose a service.";
    else if (!SERVICES.has(enquiry.service))
      errors.service = "Choose a valid service.";
    if (!BUDGETS.has(enquiry.budget))
      errors.budget = "Choose a valid project budget.";
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

    const { SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_USER || !SMTP_PASS)
      return res.status(503).json({
        success: false,
        message: "Gmail email delivery is not configured yet.",
      });

    const port = Number(process.env.SMTP_PORT || 465);
    if (!Number.isInteger(port) || port < 1 || port > 65535)
      return res.status(500).json({
        success: false,
        message: "Email delivery is incorrectly configured.",
      });

    const transport = createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure: process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE === "true"
        : port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    const from = process.env.SMTP_FROM || `Veeva Creatives <${SMTP_USER}>`;
    const studioEmail =
      process.env.STUDIO_EMAIL || "veevacreatives26@gmail.com";
    const customerEmail = buildEnquiryEmail({
      title: `Thank you, ${enquiry.name}!`,
      intro:
        "We have received your project enquiry and will review the details. Our team will get back to you within 24 hours.",
      enquiry,
    });
    const studioMessage = buildEnquiryEmail({
      title: "New project enquiry",
      intro: "A new enquiry was submitted through the Veeva Creatives website.",
      enquiry,
    });

    const results = await Promise.allSettled([
      transport.sendMail({
        from,
        to: enquiry.email,
        subject: "We received your project enquiry — Veeva Creatives",
        html: customerEmail.html,
        text: customerEmail.text,
      }),
      transport.sendMail({
        from,
        to: studioEmail,
        replyTo: enquiry.email,
        subject: `New project enquiry: ${enquiry.service} — ${enquiry.name}`,
        html: studioMessage.html,
        text: studioMessage.text,
      }),
    ]);

    const deliveryAccepted = (result, recipient) =>
      result.status === "fulfilled" &&
      result.value.accepted?.some(
        (address) =>
          (typeof address === "string"
            ? address
            : address.address
          )?.toLowerCase() === recipient.toLowerCase(),
      );
    const customerSent = deliveryAccepted(results[0], enquiry.email);
    const studioNotified = deliveryAccepted(results[1], studioEmail);

    if (!customerSent || !studioNotified) {
      console.error("One or more Gmail email deliveries failed.", {
        customer:
          results[0].status === "rejected"
            ? results[0].reason?.message
            : results[0].value?.rejected?.join(", "),
        studio:
          results[1].status === "rejected"
            ? results[1].reason?.message
            : results[1].value?.rejected?.join(", "),
      });
    }

    if (!studioNotified)
      return res.status(502).json({
        success: false,
        message:
          "We couldn't deliver your enquiry. Please try again or contact us directly.",
      });

    return res.status(201).json({
      success: true,
      emailSent: customerSent,
      studioNotified,
    });
  };
}

export default createEnquiryHandler();
