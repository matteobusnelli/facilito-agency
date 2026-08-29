import { motion } from "framer-motion";
import HeroRing from "@/components/HeroRing";

/**
 * First thing shown on load: the brand mark, alone and centered on the
 * full screen, breathing gently while it holds there. The backdrop is
 * transparent — the page's own AmbientBackground (mounted behind this,
 * fixed) shows through, so the intro sits on the exact same animated
 * background as the rest of the site rather than a flat color.
 *
 * When the intro ends (Index flips it out of the tree), the mark shares a
 * layoutId with the one rendered inside HeroSection, so Framer Motion
 * animates it — position and size both — from here to its actual spot in
 * the hero, instead of crossfading two separate copies.
 */
const IntroOverlay = () => (
  <motion.div
    aria-hidden
    className="fixed inset-0 z-[100] flex items-center justify-center"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.div
      animate={{ scale: [1, 1.035, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        layoutId="hero-graphic"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[220px] sm:w-[300px] md:w-[380px]"
        style={{ aspectRatio: "897 / 786" }}
      >
        <HeroRing />
        <img
          src="/hero-graphic.webp"
          alt=""
          className="absolute inset-0 w-full h-full select-none"
          style={{
            maskImage: "radial-gradient(closest-side, black 55%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(closest-side, black 55%, transparent 100%)",
          }}
        />
      </motion.div>
    </motion.div>
  </motion.div>
);

export default IntroOverlay;
