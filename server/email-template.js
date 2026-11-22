const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export function buildEnquiryEmail({ title, intro, enquiry }) {
  const details = [
    ["Full name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "Not provided"],
    ["Business / brand", enquiry.brand || "Not provided"],
    ["Service", enquiry.service],
    ["Budget", enquiry.budget || "Not provided"],
    ["Preferred contact", enquiry.preferred_contact_method],
  ];
  const rows = details
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 12px;border-bottom:1px solid #eee;color:#777;font-size:13px;width:38%"><strong>${escapeHtml(label)}</strong></td><td style="padding:10px 12px;border-bottom:1px solid #eee;color:#18181d;font-size:13px">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return {
    html: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:#f4f4f6;font-family:Arial,'Helvetica Neue',sans-serif;color:#18181d">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f6;padding:32px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fff;border-radius:18px;overflow:hidden;border:1px solid #e7e7ea">
          <tr><td style="background:#050505;padding:28px 32px;border-bottom:4px solid #f2265b">
            <div style="color:#fff;font-size:20px;font-weight:800;letter-spacing:2px">VEEVA CREATIVES</div>
            <div style="color:#b8b8c2;font-size:12px;margin-top:4px;letter-spacing:1px;text-transform:uppercase">Digital creative studio</div>
          </td></tr>
          <tr><td style="padding:32px">
            <h1 style="margin:0 0 12px;font-size:26px;line-height:1.2;color:#18181d">${escapeHtml(title)}</h1>
            <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:#555560">${escapeHtml(intro)}</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #eee;border-radius:12px;overflow:hidden">
              ${rows}
              <tr><td style="padding:10px 12px;color:#777;font-size:13px;width:38%;vertical-align:top"><strong>Project details</strong></td><td style="padding:10px 12px;color:#18181d;font-size:13px;line-height:1.6;white-space:pre-wrap">${escapeHtml(enquiry.description)}</td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:20px 32px;background:#fafafa;border-top:1px solid #eee;color:#777;font-size:12px;line-height:1.6">
            Veeva Creatives · <a href="mailto:veevacreatives26@gmail.com" style="color:#f2265b;text-decoration:none">veevacreatives26@gmail.com</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
    text: [
      intro,
      "",
      ...details.map(([label, value]) => `${label}: ${value}`),
      "",
      "Project details:",
      enquiry.description,
      "",
      "Veeva Creatives",
    ].join("\n"),
  };
}
