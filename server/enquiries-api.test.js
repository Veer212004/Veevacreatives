import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { createEnquiryHandler } from "../api/enquiries.js";

const originalEnv = {
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SECURE: process.env.SMTP_SECURE,
  SMTP_FROM: process.env.SMTP_FROM,
  STUDIO_EMAIL: process.env.STUDIO_EMAIL,
};

afterEach(() => {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("reports a rejected customer confirmation when the studio email succeeds", async () => {
  process.env.SMTP_USER = "studio@example.com";
  process.env.SMTP_PASS = "test-app-password";
  process.env.STUDIO_EMAIL = "studio@example.com";
  const sentMessages = [];
  const handler = createEnquiryHandler(() => ({
    sendMail: async (message) => {
      sentMessages.push(message);
      if (message.to === "client@example.com")
        throw new Error("Recipient rejected.");
      return { accepted: ["studio@example.com"], rejected: [] };
    },
  }));

  const response = {
    statusCode: 200,
    body: null,
    setHeader() {},
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  await handler(
    {
      method: "POST",
      body: {
        name: "Test Client",
        email: "client@example.com",
        service: "Website Design & Development",
        desc: "A test project enquiry.",
        consent: true,
        website: "",
      },
    },
    response,
  );

  assert.equal(response.statusCode, 201);
  assert.deepEqual(response.body, {
    success: true,
    emailSent: false,
    studioNotified: true,
  });
  assert.equal(sentMessages.length, 2);
  assert.match(sentMessages[0].html, /Thank you, Test Client/);
  assert.match(sentMessages[1].html, /New project enquiry/);
});
