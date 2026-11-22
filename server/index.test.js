import assert from "node:assert/strict";
import { once } from "node:events";
import { after, before, test } from "node:test";
import { createServer } from "node:http";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import Database from "better-sqlite3";
import { createApp, createDatabase } from "./index.js";

const db = new Database(":memory:");
db.exec(`
  CREATE TABLE enquiries (
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

let receivedEmail;
let emailDeliveryFailed = false;
const app = createApp({
  db,
  sendEmails: async (message) => {
    receivedEmail = message;
    return {
      customerSent: !emailDeliveryFailed,
      studioNotified: !emailDeliveryFailed,
    };
  },
  studioEmail: "studio@example.com",
});
const server = createServer(app);
let baseUrl;

before(async () => {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.close();
  db.close();
});

test("stores a valid enquiry and sends the confirmation", async () => {
  const response = await fetch(`${baseUrl}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Riya",
      email: "RIYA@example.com",
      phone: "1234567890",
      brand: "Riya Studio",
      service: "Website Design & Development",
      budget: "₹10,000 – ₹25,000",
      desc: "A new portfolio website.",
      method: "Email",
      consent: true,
      website: "",
    }),
  });
  const result = await response.json();

  assert.equal(response.status, 201);
  assert.deepEqual(result, {
    success: true,
    emailSent: true,
    studioNotified: true,
    saved: true,
  });
  assert.equal(
    db.prepare("SELECT COUNT(*) AS count FROM enquiries").get().count,
    1,
  );
  assert.equal(receivedEmail.enquiry.email, "riya@example.com");
  assert.equal(receivedEmail.studioEmail, "studio@example.com");
});

test("rejects invalid data without storing an enquiry", async () => {
  const response = await fetch(`${baseUrl}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "No email", consent: true, website: "" }),
  });
  const result = await response.json();

  assert.equal(response.status, 400);
  assert.equal(result.success, false);
  assert.ok(result.errors.email);
  assert.equal(
    db.prepare("SELECT COUNT(*) AS count FROM enquiries").get().count,
    1,
  );
});

test("keeps the enquiry when email delivery is unavailable", async () => {
  emailDeliveryFailed = true;
  const response = await fetch(`${baseUrl}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Asha",
      email: "asha@example.com",
      service: "Other",
      desc: "A project request.",
      consent: true,
      website: "",
    }),
  });
  const result = await response.json();

  assert.equal(response.status, 201);
  assert.deepEqual(result, {
    success: true,
    emailSent: false,
    studioNotified: false,
    saved: true,
  });
  assert.equal(
    db.prepare("SELECT COUNT(*) AS count FROM enquiries").get().count,
    2,
  );
});

test("persists enquiries when the SQLite database is reopened", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "veeva-enquiry-test-"));
  const databasePath = path.join(directory, "enquiries.sqlite");
  const now = new Date().toISOString();
  const persistedDb = createDatabase(databasePath);

  persistedDb
    .prepare(
      `
      INSERT INTO enquiries (
        name, email, phone, brand, service, budget, description,
        preferred_contact_method, consent_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    )
    .run(
      "Test",
      "test@example.com",
      "",
      "",
      "Other",
      "",
      "Persistent request",
      "Email",
      now,
      now,
    );
  persistedDb.close();

  const reopenedDb = createDatabase(databasePath);
  const saved = reopenedDb.prepare("SELECT description FROM enquiries").get();
  reopenedDb.close();
  rmSync(directory, { recursive: true, force: true });

  assert.equal(saved.description, "Persistent request");
});
