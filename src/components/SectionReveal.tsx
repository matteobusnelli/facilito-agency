import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

/**
 * Wraps a section so it materializes as it scrolls into place — fade,
 * a soft blur dissolving into focus, a rise, and a slight scale-in, all
 * tied to the same scroll progress (not a one-shot trigger). Resolves to
 * a fully sharp, settled state well before the section is fully in view,
 * so nothing stays blurred or interferes with its own content.
 */
const SectionReveal = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 40%"] });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.div ref={ref} style={{ opacity, y, scale, filter }}>
      {children}
    </motion.div>
  );
};

export default SectionReveal;
