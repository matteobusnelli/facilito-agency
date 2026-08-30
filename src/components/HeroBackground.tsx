import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

// Fewer concurrent particle animations on mobile — each one carries a
// box-shadow that repaints every frame, and this layer is exactly where
// scroll jank is worst (the first few seconds, hero still on screen).
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

/** Dim ambient dust spread across the whole section. */
const DUST = Array.from({ length: 18 }, (_, i) => ({
  id: `dust-${i}`,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 1 + Math.random() * 1.4,
  delay: Math.random() * 12,
  duration: 8 + Math.random() * 10,
}));

/**
 * Warm/violet embers biased toward the brand graphic's position (right
 * side, vertically centered) so they read as sparks drifting off the 3D
 * object rather than a generic, disconnected particle layer.
 */
const EMBERS_RIGHT = Array.from({ length: 24 }, (_, i) => ({
  id: `ember-r-${i}`,
  left: 42 + Math.random() * 56,
  top: 12 + Math.random() * 72,
  size: 2 + Math.random() * 2.4,
  delay: Math.random() * 12,
  duration: 7 + Math.random() * 9,
  color: i % 3 === 0 ? "hsl(25 95% 62%)" : "hsl(280 85% 70%)",
}));

/**
 * A sparser, dimmer ember scatter around the text column — framing the
 * copy (top strip / bottom strip, avoiding the headline itself) so the
 * left side reads as the same lit environment as the graphic, not a flat
 * backdrop it happens to sit in front of.
 */
const EMBERS_LEFT = Array.from({ length: 10 }, (_, i) => ({
  id: `ember-l-${i}`,
  left: 2 + Math.random() * 34,
  top: i % 2 === 0 ? 4 + Math.random() * 14 : 68 + Math.random() * 26,
  size: 1.6 + Math.random() * 1.8,
  delay: Math.random() * 12,
  duration: 8 + Math.random() * 9,
  color: i % 2 === 0 ? "hsl(258 90% 70%)" : "hsl(25 95% 62%)",
}));

const AuroraBlob = ({
  className,
  background,
  driftClass,
  parallaxX,
  parallaxY,
}: {
  className: string;
  background: string;
  driftClass: string;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}) => (
  <motion.div aria-hidden className={className} style={{ x: parallaxX, y: parallaxY }}>
    <div
      className={`w-full h-full rounded-full mix-blend-screen ${driftClass}`}
      style={{ background, filter: "blur(80px)" }}
    />
  </motion.div>
);

/**
 * Purely decorative background layer for the hero. `mouseX`/`mouseY` are
 * driven by the parent section's onMouseMove (normalized -0.5..0.5) so the
 * ambient blobs parallax with the cursor — the handler lives on the section
 * because content sibling elements would otherwise swallow the bubbled event.
 *
 * One continuous lit environment: a dominant warm source sits behind the
 * brand graphic, a dimmer violet source sits behind the text column, and a
 * soft wide "bridge" wash across the middle blends the two into a single
 * scene instead of two independently-lit halves. Everything blends via
 * mix-blend-screen and the whole layer drifts through hue over ~40s.
 */
const HeroBackground = ({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) => {
  const isDesktop = useIsDesktop();
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.5 });

  const aX = useTransform(springX, (v) => v * 45);
  const aY = useTransform(springY, (v) => v * 32);
  const bX = useTransform(springX, (v) => v * -40);
  const bY = useTransform(springY, (v) => v * -28);
  const cX = useTransform(springX, (v) => v * 22);
  const cY = useTransform(springY, (v) => v * 16);

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,black_0%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_88%,transparent_100%)] lg:[mask-image:linear-gradient(to_bottom,black_0%,black_65%,transparent_96%)] lg:[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_65%,transparent_96%)]"
    >
      {/* Base dot-grid + solid color come from the page-wide AmbientBackground behind this
          section — this layer only adds the hero's extra mouse-reactive flair on top of it.
          It fades out (via mask) well before the section's own bottom edge, so the hand-off
          to the shared background below is gradual instead of being clipped mid-brightness.
          The mobile fade is pushed much later than desktop's, since content stacks there and
          the brand graphic can sit well down the section — cutting the glow off early would
          leave it sitting on flat background instead of inside the same lit scene. */}

      {/* Mobile-only vertical light column — the layout stacks text above the graphic here,
          so instead of chasing its exact position (which shifts with content length/language),
          one soft column runs down the center and covers wherever it ends up landing. */}
      <div
        className="lg:hidden absolute top-[18%] left-1/2 -ml-[220px] w-[440px] h-[78%] rounded-full mix-blend-screen animate-aurora-a"
        style={{
          background: "radial-gradient(ellipse, hsl(25 95% 55% / 0.22) 0%, hsl(280 80% 55% / 0.13) 42%, hsl(254 91% 60% / 0.08) 66%, transparent 82%)",
          filter: "blur(70px)",
        }}
      />

      {/* Aurora — blend-screened and hue-drifting as one continuous wash */}
      <div className="absolute inset-0 md:animate-hue-drift">
        {/* Wide bridge wash, ties both halves into one lit space */}
        <AuroraBlob
          className="absolute top-[6%] left-[8%] w-[1150px] h-[680px]"
          driftClass="animate-aurora-a"
          background="radial-gradient(ellipse, hsl(268 70% 55% / 0.09) 0%, hsl(258 60% 45% / 0.05) 45%, transparent 72%)"
          parallaxX={cX}
          parallaxY={cY}
        />
        {/* Dominant source, centered on the brand graphic itself (desktop layout only —
            mobile gets its own vertical column above, since the graphic sits centered
            below the text there instead of to the right) */}
        <AuroraBlob
          className="hidden lg:block absolute top-[8%] right-[-12%] w-[920px] h-[920px]"
          driftClass="animate-aurora-a"
          background="radial-gradient(circle, hsl(25 95% 55% / 0.26) 0%, hsl(300 80% 55% / 0.16) 38%, hsl(254 91% 60% / 0.1) 62%, transparent 78%)"
          parallaxX={aX}
          parallaxY={aY}
        />
        {/* Secondary, dimmer source behind the text column */}
        <AuroraBlob
          className="absolute top-[18%] left-[-12%] w-[620px] h-[620px]"
          driftClass="animate-aurora-b"
          background="radial-gradient(circle, hsl(258 85% 60% / 0.16) 0%, hsl(280 80% 55% / 0.08) 50%, transparent 74%)"
          parallaxX={bX}
          parallaxY={bY}
        />
        {/* Low balance, bottom-left */}
        <AuroraBlob
          className="absolute bottom-[-20%] left-[-15%] w-[520px] h-[520px]"
          driftClass="animate-aurora-b"
          background="radial-gradient(circle, hsl(254 91% 60% / 0.14) 0%, transparent 70%)"
          parallaxX={bX}
          parallaxY={bY}
        />
      </div>

      {/* Ambient dust, whole section */}
      {DUST.slice(0, isDesktop ? DUST.length : 8).map((p) => (
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

      {/* Embers, clustered around the brand graphic */}
      {EMBERS_RIGHT.slice(0, isDesktop ? EMBERS_RIGHT.length : 10).map((p) => (
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
            "--particle-opacity": 0.8,
          }}
        />
      ))}

      {/* Sparser embers framing the text column, same light as the graphic's */}
      {EMBERS_LEFT.slice(0, isDesktop ? EMBERS_LEFT.length : 5).map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-ember"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 5px 1px ${p.color}`,
            opacity: 0,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            // @ts-expect-error custom property for keyframe target opacity
            "--particle-opacity": 0.45,
          }}
        />
      ))}
    </div>
  );
};

export default HeroBackground;
