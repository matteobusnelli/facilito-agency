import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// ─── Rate limiting ─────────────────────────────────────────────────────────────
// Per-instance in-memory store. Enough for basic bot protection on Vercel.
// For stronger guarantees use Upstash Redis.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3; // max submissions per window
const RATE_WINDOW_MS = 60_000; // 60 seconds

// ─── Helpers ──────────────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIp(req: VercelRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string") return fwd.split(",")[0].trim();
  return "unknown";
}

/**
 * Parse CONTACT_EMAILS env var.
 * Format: "email1@example.com,email2@example.com"
 */
function parseRecipients(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((e) => e.trim())
    .filter((e) => EMAIL_REGEX.test(e));
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): string {
  const safeMessage = data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="utf-8"><title>Nuova richiesta</title></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;color:#0d0d12;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

    <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7c5ef7;">
      Facilito Agency
    </p>
    <h1 style="margin:0 0 32px;font-size:22px;font-weight:700;letter-spacing:-0.02em;">
      Nuova richiesta di contatto
    </h1>

    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f2;width:110px;font-size:12px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Nome</td>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f2;font-size:14px;font-weight:600;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f2;font-size:12px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Email</td>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f2;font-size:14px;">
          <a href="mailto:${data.email}" style="color:#7c5ef7;text-decoration:none;">${data.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f2;font-size:12px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Telefono</td>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f2;font-size:14px;">
          <a href="tel:${data.phone}" style="color:#7c5ef7;text-decoration:none;">${data.phone}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f2;font-size:12px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Servizio</td>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f2;font-size:14px;">${data.service}</td>
      </tr>
    </table>

    <div style="margin-top:24px;">
      <p style="margin:0 0 10px;font-size:12px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Messaggio</p>
      <div style="background:#f8f8fb;border-radius:10px;padding:16px 20px;font-size:14px;line-height:1.7;color:#1a1a2e;">
        ${safeMessage}
      </div>
    </div>

    <div style="margin-top:32px;padding-top:20px;border-top:1px solid #f0f0f2;">
      <p style="margin:0;font-size:12px;color:#a1a1aa;">
        Rispondi direttamente a questa email per contattare <strong>${data.name}</strong>.
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── Rate limiting ──
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (entry && now < entry.resetAt) {
    entry.count += 1;
    if (entry.count > RATE_LIMIT) {
      return res.status(429).json({ error: "Too many requests. Please wait a moment and try again." });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  }

  // ── Parse body ──
  const {
    name,
    email,
    phone,
    service,
    message,
    website, // honeypot — bots fill this, humans don't
  } = (req.body ?? {}) as Record<string, string | undefined>;

  // ── Honeypot check ──
  // Return fake success so bots don't retry
  if (website) {
    console.warn("[contact] Honeypot triggered — request blocked. value:", website);
    return res.status(200).json({ success: true });
  }

  // ── Server-side validation ──
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: "Invalid name." });
  }
  if (!email || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  if (!message || message.trim().length < 10) {
    return res.status(400).json({ error: "Message is too short." });
  }

  // ── Parse recipients ──
  const recipients = parseRecipients(process.env.CONTACT_EMAILS);
  if (recipients.length === 0) {
    console.error("[contact] CONTACT_EMAILS is missing or contains no valid addresses.");
    return res.status(500).json({ error: "Server configuration error." });
  }

  // ── Send via Resend ──
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL ?? "Facilito Agency <onboarding@resend.dev>";
  const serviceLabel = service?.trim() || "Non specificato";

  try {
    const { error: resendError } = await resend.emails.send({
      from,
      to: recipients,
      replyTo: email.trim(),
      subject: `Nuova richiesta: ${serviceLabel} — ${name.trim()}`,
      html: buildEmailHtml({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() ?? "",
        service: serviceLabel,
        message: message.trim(),
      }),
    });

    if (resendError) {
      console.error("[contact] Resend error:", resendError);
      return res.status(500).json({ error: "Failed to send email. Please try again." });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected server error." });
  }
}
