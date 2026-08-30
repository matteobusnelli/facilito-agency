import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// The parallax below recomputes on every scroll pixel for a fixed,
// full-viewport layer — cheap on desktop, but a real jank source on mobile
// where it stacks with everything else happening in the first few seconds
// (intro, hero, section reveals). Mobile keeps the ambient blobs, just
// pinned in place instead of drifting with scroll.
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

const DUST = Array.from({ length: 20 }, (_, i) => ({
  id: `amb-dust-${i}`,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 1 + Math.random() * 1.4,
  delay: Math.random() * 12,
  duration: 8 + Math.random() * 10,
}));

const EMBERS = Array.from({ length: 16 }, (_, i) => ({
  id: `amb-ember-${i}`,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 1.6 + Math.random() * 2.2,
  delay: Math.random() * 12,
  duration: 7 + Math.random() * 9,
  color: i % 3 === 0 ? "hsl(25 95% 62%)" : i % 3 === 1 ? "hsl(280 85% 70%)" : "hsl(258 90% 70%)",
}));

/**
 * Fixed, full-viewport backdrop reusing the hero's exact dot-grid, aurora
 * and ember animations. Pinned behind every section (position: fixed) so
 * the whole page reads as one continuous lit scene instead of separate
 * per-section blocks — scrolling never changes what's behind the content.
 */
const AmbientBackground = () => {
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, mass: 0.5 });

  // Each layer drifts a different distance as the page scrolls — a classic
  // parallax depth cue that reads as motion/"wow" the whole way down, while
  // the layer itself never leaves the viewport (still position: fixed).
  // Pinned in place (0) on mobile — see useIsDesktop above.
  const slow = useTransform(progress, [0, 1], [0, isDesktop ? -120 : 0]);
  const mid = useTransform(progress, [0, 1], [0, isDesktop ? 160 : 0]);
  const fast = useTransform(progress, [0, 1], [0, isDesktop ? -200 : 0]);
  const rotate = useTransform(progress, [0, 1], [0, isDesktop ? 25 : 0]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-hero overflow-hidden pointer-events-none">
      <motion.div className="absolute inset-0 bg-dot-grid opacity-[0.05] md:animate-grid-pan" style={{ y: mid, rotate }} />

      <div className="absolute inset-0 md:animate-hue-drift">
        <motion.div
          className="absolute top-[8%] right-[-15%] w-[900px] h-[900px] rounded-full mix-blend-screen animate-aurora-a"
          style={{
            background:
              "radial-gradient(circle, hsl(25 95% 55% / 0.16) 0%, hsl(300 80% 55% / 0.1) 40%, hsl(254 91% 60% / 0.06) 65%, transparent 78%)",
            filter: "blur(90px)",
            y: slow,
          }}
        />
        <motion.div
          className="absolute top-[38%] left-[-15%] w-[700px] h-[700px] rounded-full mix-blend-screen animate-aurora-b"
          style={{
            background: "radial-gradient(circle, hsl(258 85% 60% / 0.12) 0%, hsl(280 80% 55% / 0.06) 50%, transparent 74%)",
            filter: "blur(90px)",
            y: fast,
          }}
        />
        <motion.div
          className="absolute bottom-[-12%] right-[8%] w-[600px] h-[600px] rounded-full mix-blend-screen animate-aurora-a"
          style={{ background: "radial-gradient(circle, hsl(254 91% 60% / 0.1) 0%, transparent 70%)", filter: "blur(90px)", y: mid }}
        />
        <motion.div
          className="absolute bottom-[8%] left-[5%] w-[500px] h-[500px] rounded-full mix-blend-screen animate-aurora-b"
          style={{ background: "radial-gradient(circle, hsl(320 80% 55% / 0.08) 0%, transparent 72%)", filter: "blur(90px)", y: slow }}
        />
      </div>

      {DUST.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-ember"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: "hsl(0 0% 100%)",
            opacity: 0,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            // @ts-expect-error custom property for keyframe target opacity
            "--particle-opacity": 0.3,
          }}
        />
      ))}

      {EMBERS.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-ember"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 6px 1px ${p.color}`,
            opacity: 0,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            // @ts-expect-error custom property for keyframe target opacity
            "--particle-opacity": 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default AmbientBackground;
