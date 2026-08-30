import { motion, useMotionValue } from "framer-motion";
import { type MouseEvent, useEffect, useState } from "react";
import { useTranslation } from "@/i18n";
import HeroBackground from "@/components/HeroBackground";
import HeroRing from "@/components/HeroRing";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

// Matches the `lg` breakpoint the layout switches to two columns at — the
// brand graphic only lives permanently on that wider layout. On mobile it's
// shown once by IntroOverlay on load and then simply fades away instead of
// landing in the hero (there's no right column to land in).
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
};

const HeroSection = ({ showGraphic = true }: { showGraphic?: boolean }) => {
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();
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
      className="relative lg:min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <HeroBackground mouseX={mouseX} mouseY={mouseY} />

      <div className="container mx-auto px-6 relative z-10 pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-6 items-center">

          {/* LEFT — text content */}
          <div>
            {/* Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.08] tracking-tight text-white mb-7"
            >
              <span className="block">{t.hero.line1}</span>
              <span className="block">{t.hero.line2}</span>
              <span className="block text-gradient-warm animate-gradient-shimmer">{t.hero.line3}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-xl sm:text-2xl text-white/60 leading-relaxed mb-11 max-w-2xl"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-5 mb-2">
              <a
                href="#contatti"
                className="group inline-flex items-center justify-center gap-2 px-9 py-5 rounded-full bg-gradient-warm text-white font-semibold text-lg hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
              >
                {t.hero.cta}
              </a>
              <a
                href="#come-funziona"
                className="inline-flex items-center justify-center gap-2 px-9 py-5 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 hover:border-white/30 hover:scale-105 active:scale-95 transition-all"
              >
                {t.hero.secondary}
              </a>
            </motion.div>

            {/* Calendly link */}
            {CALENDLY_URL && (
              <motion.div {...fadeUp(0.35)} className="mt-6">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-white/40 hover:text-white/70 transition-colors"
                >
                  {t.hero.bookCall}
                </a>
              </motion.div>
            )}
          </div>

          {/* RIGHT — brand graphic: the mark stays still, only the ring of light around it flows.
              Desktop-only — on mobile there's no right column to land in, so IntroOverlay's
              copy (shown once on load) just fades away instead of FLIPping here. Rendered only
              once the intro handoff fires — its layoutId picks up the FLIP transition from
              IntroOverlay's centered copy into this exact spot. */}
          {isDesktop && (
            <div className="relative flex items-center justify-center lg:justify-end">
              {showGraphic && (
                <motion.div
                  layoutId="hero-graphic"
                  transition={{ type: "spring", stiffness: 80, damping: 20, mass: 0.9 }}
                  className="relative w-full max-w-[600px]"
                  style={{ aspectRatio: "897 / 786" }}
                >
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
                </motion.div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
