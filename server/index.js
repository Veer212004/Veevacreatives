import "dotenv/config";
import express from "express";
import Database from "better-sqlite3";
import nodemailer from "nodemailer";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const STUDIO_EMAIL = process.env.STUDIO_EMAIL || "veevacreatives26@gmail.com";
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
const CONTACT_METHODS = new Set(["Email", "Phone", "WhatsApp"]);

export function createDatabase(databasePath) {
  const resolvedPath =
    databasePath === ":memory:" ? databasePath : path.resolve(databasePath);
  if (resolvedPath !== ":memory:")
    mkdirSync(path.dirname(resolvedPath), { recursive: true });
  const db = new Database(resolvedPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      brand TEXT NOT NULL,
      service TEXT NOT NULL,
      budget TEXT NOT NULL,
      description TEXT NOT NULL,
      preferred_contact_method TEXT NOT NULL,
      consent_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
  return db;
}

export function createEmailSender(env = process.env) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = env;
  const credentials = [SMTP_HOST, SMTP_USER, SMTP_PASS];
  if (credentials.some(Boolean) && !credentials.every(Boolean))
    throw new Error(
      "SMTP_HOST, SMTP_USER, and SMTP_PASS must be set together.",
    );
  if (!credentials.some(Boolean)) return null;

  const port = Number(env.SMTP_PORT || 587);
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error("SMTP_PORT must be a valid port number.");

  const from = env.SMTP_FROM || SMTP_USER;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: env.SMTP_SECURE === "true" || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return async ({ enquiry, studioEmail }) => {
    const details = [
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone || "Not provided"}`,
      `Business or brand: ${enquiry.brand || "Not provided"}`,
      `Service: ${enquiry.service}`,
      `Budget: ${enquiry.budget || "Not provided"}`,
      `Preferred contact method: ${enquiry.preferred_contact_method}`,
      "",
      "Project description:",
      enquiry.description,
    ].join("\n");
    const results = await Promise.allSettled([
      transporter.sendMail({
        from,
        to: enquiry.email,
        subject: "We received your project enquiry — Veeva Creatives",
        text: [
          `Hi ${enquiry.name},`,
          "",
          "Thank you for contacting Veeva Creatives. We have received your project request and will review the details and get back to you within 24 hours.",
          "",
          "Your enquiry:",
          details,
          "",
          "Warm regards,",
          "Veeva Creatives",
        ].join("\n"),
      }),
      transporter.sendMail({
        from,
        to: studioEmail,
        replyTo: enquiry.email,
        subject: `New project enquiry: ${enquiry.service} — ${enquiry.name}`,
        text: details,
      }),
    ]);

    return {
      customerSent: results[0].status === "fulfilled",
      studioNotified: results[1].status === "fulfilled",
    };
  };
}

function readText(body, key, maxLength, errors, required = false) {
  const value = body[key] ?? "";
  if (typeof value !== "string") {
    errors[key] = "Must be text.";
    return "";
  }
  const text = value.trim();
  if (required && !text) errors[key] = "This field is required.";
  if (text.length > maxLength)
    errors[key] = `Must be ${maxLength} characters or fewer.`;
  return text;
}

function validateEnquiry(body) {
  if (!body || typeof body !== "object" || Array.isArray(body))
    return { errors: { body: "An enquiry object is required." } };

  const errors = {};
  const enquiry = {
    name: readText(body, "name", 120, errors, true),
    email: readText(body, "email", 254, errors, true).toLowerCase(),
    phone: readText(body, "phone", 40, errors),
    brand: readText(body, "brand", 120, errors),
    service: readText(body, "service", 160, errors, true),
    budget: readText(body, "budget", 80, errors),
    description: readText(body, "desc", 5000, errors, true),
    preferred_contact_method: readText(body, "method", 20, errors),
  };

  if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiry.email))
    errors.email = "Enter a valid email address.";
  if (enquiry.service && !SERVICES.has(enquiry.service))
    errors.service = "Choose a valid service.";
  if (!BUDGETS.has(enquiry.budget))
    errors.budget = "Choose a valid project budget.";
  if (!enquiry.preferred_contact_method)
    enquiry.preferred_contact_method = "Email";
  if (!CONTACT_METHODS.has(enquiry.preferred_contact_method))
    errors.method = "Choose a valid contact method.";
  if (body.consent !== true) errors.consent = "Consent is required.";
  if (typeof body.website !== "string") errors.website = "Invalid submission.";

  return { enquiry, errors };
}

export function createApp({
  db,
  sendEmails = createEmailSender(),
  studioEmail = STUDIO_EMAIL,
}) {
  if (!db) throw new Error("A database connection is required.");
  const app = express();
  const rateLimits = new Map();
  const trustProxyHops = Number(process.env.TRUST_PROXY_HOPS || 0);
  if (!Number.isInteger(trustProxyHops) || trustProxyHops < 0)
    throw new Error("TRUST_PROXY_HOPS must be a non-negative integer.");
  const insertEnquiry = db.prepare(`
    INSERT INTO enquiries (
      name, email, phone, brand, service, budget, description,
      preferred_contact_method, consent_at, created_at
    ) VALUES (
      @name, @email, @phone, @brand, @service, @budget, @description,
      @preferred_contact_method, @consent_at, @created_at
    )
  `);

  app.disable("x-powered-by");
  app.set("trust proxy", trustProxyHops || false);
  app.use(express.json({ limit: "16kb" }));

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

  app.post("/api/enquiries", async (req, res, next) => {
    const now = Date.now();
    const client = req.ip || req.socket.remoteAddress || "unknown";
    const windowMs = 15 * 60 * 1000;
    const current = rateLimits.get(client);
    if (current && current.expiresAt > now && current.count >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
      });
    }
    if (!current || current.expiresAt <= now)
      rateLimits.set(client, { count: 1, expiresAt: now + windowMs });
    else current.count += 1;

    const { enquiry, errors } = validateEnquiry(req.body);
    if (Object.keys(errors).length)
      return res.status(400).json({
        success: false,
        message: "Please check the enquiry details and try again.",
        errors,
      });

    if (req.body.website)
      return res.status(201).json({ success: true, emailSent: false });

    try {
      const createdAt = new Date().toISOString();
      insertEnquiry.run({
        ...enquiry,
        consent_at: createdAt,
        created_at: createdAt,
      });

      let emailSent = false;
      if (sendEmails) {
        try {
          const result = await sendEmails({ enquiry, studioEmail });
          emailSent = result.customerSent;
          if (!result.customerSent || !result.studioNotified)
            console.error("One or more enquiry emails could not be delivered.");
        } catch (error) {
          console.error("Enquiry email delivery failed:", error.message);
        }
      }

      return res.status(201).json({ success: true, emailSent });
    } catch (error) {
      return next(error);
    }
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(ROOT, "dist")));
    app.get("*path", (req, res, next) => {
      if (req.path.startsWith("/api/")) return next();
      return res.sendFile(path.join(ROOT, "dist", "index.html"), (error) => {
        if (error) next(error);
      });
    });
  }

  app.use((error, _req, res, _next) => {
    console.error("Request failed:", error.message);
    if (res.headersSent) return;
    const status =
      error.status === 413 ? 413 : error.status === 400 ? 400 : 500;
    return res.status(status).json({
      success: false,
      message:
        status === 413
          ? "The request is too large."
          : status === 400
            ? "Invalid JSON request."
            : "The request could not be processed.",
    });
  });

  return app;
}

function start() {
  const databasePath =
    process.env.DB_PATH || path.join(ROOT, "data", "enquiries.sqlite");
  const db = createDatabase(databasePath);
  const sendEmails = createEmailSender();
  const app = createApp({ db, sendEmails });
  if (!sendEmails)
    console.warn(
      "SMTP is not configured; enquiries will be saved without email confirmations.",
    );
  const port = Number(process.env.PORT || 3001);
  app.listen(port, "0.0.0.0", () => {
    console.log(`Veeva enquiries server listening on port ${port}.`);
  });
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  start();
