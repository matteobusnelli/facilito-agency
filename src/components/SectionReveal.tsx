import { type ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Animating `filter: blur()` forces the browser to repaint the whole section
// on every frame of the transition instead of just compositing it — cheap
// on desktop, but with several sections' reveals landing close together
// during a fast mobile scroll it's a real source of jank. Mobile keeps the
// fade/rise/scale, just without the blur term.
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

/**
 * Wraps a section so it materializes as it scrolls into place — fade,
 * a soft blur dissolving into focus (desktop only), a rise, and a slight
 * scale-in. Triggered once via viewport intersection rather than tied to
 * exact scroll-pixel thresholds, so it always resolves to fully visible
 * even for the last section on the page (no scroll room left past it).
 */
const SectionReveal = ({ children }: { children: ReactNode }) => {
  const isDesktop = useIsDesktop();

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.96, ...(isDesktop ? { filter: "blur(10px)" } : {}) }}
      whileInView={{ opacity: 1, y: 0, scale: 1, ...(isDesktop ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
