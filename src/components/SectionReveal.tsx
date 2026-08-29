import { type ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Wraps a section so it materializes as it scrolls into place — fade,
 * a soft blur dissolving into focus, a rise, and a slight scale-in.
 * Triggered once via viewport intersection rather than tied to exact
 * scroll-pixel thresholds, so it always resolves to fully visible even
 * for the last section on the page (no scroll room left past it).
 */
const SectionReveal = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 70, scale: 0.96, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default SectionReveal;
