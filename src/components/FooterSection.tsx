import { Mail } from "lucide-react";
import { useTranslation } from "@/i18n";

const TikTokIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-hero border-t border-white/[0.06]">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <img src="/logo.png" alt="Facilito Agency" className="h-12 w-auto mb-2" />
            <p className="text-white/35 text-sm">{t.footer.tagline}</p>
          </div>

          {/* Contact + socials — icon column aligned via grid */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:info@facilitoagency.com"
              className="grid grid-cols-[1rem_1fr] items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>info@facilitoagency.com</span>
            </a>
            <a
              href="https://www.tiktok.com/@facilito.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[1rem_1fr] items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <TikTokIcon />
              <span>{t.footer.tiktok}</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] text-xs text-white/25">
          &copy; 2026 Facilito Agency. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
