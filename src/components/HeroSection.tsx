import { motion, useMotionValue } from "framer-motion";
import { type MouseEvent } from "react";
import { Zap, Lock, Rocket } from "lucide-react";
import { useTranslation } from "@/i18n";
import HeroBackground from "@/components/HeroBackground";
import HeroRing from "@/components/HeroRing";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const TRUST_STYLES = [
  { Icon: Zap, color: "hsl(25 95% 58%)", tint: "hsl(25 95% 45% / 0.15)" },
  { Icon: Lock, color: "hsl(258 90% 68%)", tint: "hsl(258 90% 45% / 0.15)" },
  { Icon: Rocket, color: "hsl(271 81% 68%)", tint: "hsl(271 81% 45% / 0.15)" },
] as const;

const HeroSection = () => {
  const { t } = useTranslation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center bg-hero overflow-hidden"
    >
      <HeroBackground mouseX={mouseX} mouseY={mouseY} />

      <div className="container mx-auto px-6 relative z-10 pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-6 items-center">

          {/* LEFT — text content */}
          <div>
            {/* Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight text-white mb-6"
            >
              <span className="block">{t.hero.line1}</span>
              <span className="block">{t.hero.line2}</span>
              <span className="block text-gradient-warm animate-gradient-shimmer">{t.hero.line3}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-xl"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#contatti"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-warm text-white font-semibold text-base hover:opacity-90 transition-opacity"
              >
                {t.hero.cta}
              </a>
              <a
                href="#come-funziona"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-base hover:bg-white/5 hover:border-white/30 transition-colors"
              >
                {t.hero.secondary}
              </a>
            </motion.div>

            {/* Calendly link */}
            {CALENDLY_URL && (
              <motion.div {...fadeUp(0.35)} className="mb-8">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  {t.hero.bookCall}
                </a>
              </motion.div>
            )}

            {/* Trust badges */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-x-8 gap-y-5">
              {t.hero.trust.map((item, i) => {
                const { Icon, color, tint } = TRUST_STYLES[i];
                return (
                  <div key={item} className="flex items-center gap-3 max-w-[170px]">
                    <span
                      className="flex items-center justify-center w-11 h-11 rounded-full shrink-0"
                      style={{ background: tint }}
                    >
                      <Icon className="w-[18px] h-[18px]" style={{ color }} />
                    </span>
                    <span className="text-sm text-white/70 leading-snug">{item}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT — brand graphic: the mark stays still, only the ring of light around it flows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[600px]" style={{ aspectRatio: "897 / 786" }}>
              <HeroRing />
              <img
                src="/hero-graphic.webp"
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full select-none"
                style={{
                  maskImage: "radial-gradient(closest-side, black 55%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(closest-side, black 55%, transparent 100%)",
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
