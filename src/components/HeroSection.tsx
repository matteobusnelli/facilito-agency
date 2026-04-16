import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import { useTranslation } from "@/i18n";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-hero bg-dot-grid overflow-hidden">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(252 91% 63% / 0.15) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(220 90% 58% / 0.08) 0%, transparent 70%)" }}
      />
      {/* Accent glow under CTA area */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/4 w-[600px] h-[300px] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse, hsl(252 91% 63% / 0.06) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 relative z-10 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-4xl">
          {/* Urgency badge — amber to signal scarcity */}
          <motion.div {...fadeUp(0)} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/[0.08] text-amber-300/90 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline — price anchor front and centre */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight text-white mb-6"
          >
            {t.hero.line1}{" "}
            <span className="block sm:inline">{t.hero.line2}{" "}</span>
            <span className="text-gradient">{t.hero.line3}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-lg sm:text-xl text-white/55 leading-relaxed mb-10 max-w-2xl"
          >
            {t.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Primary CTA — pulsing ring for attention */}
            <a
              href="#contatti"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all"
              style={{ boxShadow: "0 8px 32px -4px hsl(252 91% 63% / 0.45)" }}
            >
              <span className="absolute inset-0 rounded-xl animate-cta-ring" aria-hidden />
              {t.hero.cta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            {/* Secondary CTA — much weaker, doesn't compete */}
            <a
              href="#come-funziona"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white/40 font-medium text-base hover:text-white/70 transition-colors"
            >
              {t.hero.secondary}
            </a>
          </motion.div>

          {/* Calendly link */}
          {CALENDLY_URL && (
            <motion.div {...fadeUp(0.35)} className="mb-10">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                {t.hero.bookCall}
              </a>
            </motion.div>
          )}

          {/* Trust badges */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-x-8 gap-y-3">
            {t.hero.trust.map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/45">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats — now includes price anchor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-20 pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-8 max-w-md"
        >
          {t.hero.stats.map((stat) => (
            <div key={stat.label}>
              <p className="number-hero text-3xl text-white mb-1">{stat.value}</p>
              <p className="text-xs text-white/40 leading-snug">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fade to background */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
      />
    </section>
  );
};

export default HeroSection;
