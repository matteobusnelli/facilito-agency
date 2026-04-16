import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation, type Locale, LOCALE_LABELS } from "@/i18n";
import { cn } from "@/lib/utils";

const LOCALES: Locale[] = ["it", "en", "es"];

const Navbar = () => {
  const { t, locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.services, href: "#servizi" },
    { label: t.nav.process, href: "#come-funziona" },
    { label: t.nav.contact, href: "#contatti" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-hero/95 backdrop-blur-md border-b border-white/[0.08]"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white"
          aria-label="Facilito Agency"
        >
          Facilito<span className="text-primary">Agency</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language switcher */}
          <div className="flex items-center gap-0.5 bg-white/[0.08] rounded-lg p-1">
            {LOCALES.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-150",
                  locale === l
                    ? "bg-white text-hero"
                    : "text-white/50 hover:text-white"
                )}
                aria-pressed={locale === l}
              >
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </div>

          <a
            href="#contatti"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-hero/98 backdrop-blur-md border-b border-white/[0.08] overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-white/[0.08]">
                <span className="text-xs text-white/40">Lingua:</span>
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs font-semibold transition-all",
                      locale === l
                        ? "bg-primary text-primary-foreground"
                        : "text-white/50 hover:text-white"
                    )}
                  >
                    {LOCALE_LABELS[l]}
                  </button>
                ))}
              </div>
              <a
                href="#contatti"
                onClick={() => setOpen(false)}
                className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold text-center mt-1"
              >
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
