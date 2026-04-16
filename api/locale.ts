import type { VercelRequest, VercelResponse } from "@vercel/node";

const COUNTRY_TO_LOCALE: Record<string, string> = {
  IT: "it",
  ES: "es",
  // Spanish-speaking Latin America
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  EC: "es",
  BO: "es",
  UY: "es",
  PY: "es",
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Vercel injects this header automatically — no external API needed
  const country = req.headers["x-vercel-ip-country"];
  const code = (Array.isArray(country) ? country[0] : country ?? "").toUpperCase();
  const locale = COUNTRY_TO_LOCALE[code] ?? "en";

  // Cache for 1 hour — IP country rarely changes mid-session
  res.setHeader("Cache-Control", "public, max-age=3600");
  return res.status(200).json({ locale });
}
