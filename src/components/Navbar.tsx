import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTranslation, type Locale, LOCALE_LABELS } from "@/i18n";
import { cn } from "@/lib/utils";

const LOCALES: Locale[] = ["it", "en", "es"];

const Navbar = () => {
  const { t, locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.services, href: "#servizi" },
    { label: t.nav.why, href: "#perche-noi" },
    { label: t.nav.process, href: "#come-funziona" },
    { label: t.nav.contact, href: "#contatti" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Floating capsule — flush and transparent over the hero, then contracts
          into an inset glass pill once the page scrolls past it. */}
      <div
        className={cn(
          "pointer-events-auto mx-auto transition-[max-width,margin,padding] duration-500 ease-out",
          scrolled ? "max-w-5xl mt-3 px-3" : "max-w-full mt-0 px-0"
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-between px-6 transition-all duration-500 ease-out",
            scrolled
              ? "h-14 rounded-2xl bg-hero/75 backdrop-blur-xl border border-white/[0.09] shadow-2xl shadow-black/40"
              : "h-20 rounded-none bg-transparent border border-transparent shadow-none"
          )}
        >
          {/* Logo */}
          <a href="#" aria-label="Facilito Agency" className="shrink-0">
            <img
              src="/logo.png"
              alt="Facilito Agency"
              className={cn("w-auto transition-all duration-500", scrolled ? "h-9" : "h-11")}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-underline text-sm text-white/70 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-0.5 bg-white/[0.06] border border-white/[0.08] rounded-lg p-1">
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
              className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-warm text-white text-sm font-semibold shadow-lg shadow-black/20 hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
            >
              {t.nav.cta}
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Scroll progress indicator */}
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-3 right-3 h-[2px] origin-left rounded-full"
            style={{ scaleX: scrollYProgress, background: "var(--gradient-primary)" }}
          />
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden mt-2 rounded-2xl bg-hero/95 backdrop-blur-xl border border-white/[0.09] shadow-2xl shadow-black/40 overflow-hidden"
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
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-warm text-white text-sm font-semibold text-center mt-1"
                >
                  {t.nav.cta}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
