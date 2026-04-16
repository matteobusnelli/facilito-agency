import { Mail } from "lucide-react";
import { useTranslation } from "@/i18n";

const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-hero border-t border-white/[0.06]">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-white tracking-tight">
              Facilito<span className="text-primary">Agency</span>
            </p>
            <p className="text-white/35 text-sm mt-1">{t.footer.tagline}</p>
            <p className="text-white/25 text-xs mt-3">
              {t.footer.vatLabel} {t.footer.vatNumber}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm">
            <a
              href={`mailto:${t.footer.email}`}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t.footer.email}
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-white/50 hover:text-white transition-colors font-medium"
            >
              LinkedIn
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white/50 hover:text-white transition-colors font-medium"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <span>
            &copy; {new Date().getFullYear()} Facilito Agency. {t.footer.rights}
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/60 transition-colors">
              {t.footer.links.privacy}
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              {t.footer.links.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
