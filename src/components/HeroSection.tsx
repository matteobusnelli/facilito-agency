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
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(252 91% 63% / 0.12) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(220 90% 58% / 0.07) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 relative z-10 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div {...fadeUp(0)} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] text-white/70 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6"
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
            <a
              href="#contatti"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all"
              style={{ boxShadow: "0 8px 32px -4px hsl(252 91% 63% / 0.35)" }}
            >
              {t.hero.cta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#servizi"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/[0.14] text-white/70 font-medium text-base hover:border-white/30 hover:text-white transition-all"
            >
              {t.hero.secondary}
            </a>
          </motion.div>

          {/* Calendly secondary CTA — only when VITE_CALENDLY_URL is set */}
          {CALENDLY_URL && (
            <motion.div {...fadeUp(0.35)} className="mb-10">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
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

        {/* Stats */}
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
