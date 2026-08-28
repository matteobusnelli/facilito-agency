/**
 * Traces the elliptical light-trail baked into the brand graphic and sends
 * two glowing comets flowing along it continuously — the 3D mark itself
 * stays perfectly still, only the ring of light around it moves.
 */
const HeroRing = () => (
  <svg
    aria-hidden
    viewBox="0 0 897 786"
    className="absolute inset-0 w-full h-full pointer-events-none"
  >
    <defs>
      <radialGradient id="cometOrange" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(28 100% 68%)" stopOpacity="1" />
        <stop offset="55%" stopColor="hsl(25 95% 58%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(25 95% 58%)" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="cometPurple" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(275 90% 75%)" stopOpacity="1" />
        <stop offset="55%" stopColor="hsl(258 90% 65%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(258 90% 65%)" stopOpacity="0" />
      </radialGradient>
    </defs>

    <g transform="rotate(19 430 490)">
      {/* Faint static track, echoes the ring already in the artwork */}
      <ellipse
        cx="430"
        cy="490"
        rx="430"
        ry="172"
        fill="none"
        stroke="hsl(280 60% 70% / 0.1)"
        strokeWidth="1.5"
      />
      <path
        id="hero-ring-path"
        d="M 0,490 A 430,172 0 1,1 860,490 A 430,172 0 1,1 0,490"
        fill="none"
        stroke="none"
      />

      <circle r="11" fill="url(#cometOrange)">
        <animateMotion dur="7s" repeatCount="indefinite">
          <mpath href="#hero-ring-path" />
        </animateMotion>
      </circle>
      <circle r="8" fill="url(#cometPurple)">
        <animateMotion dur="9.5s" repeatCount="indefinite" begin="-4s">
          <mpath href="#hero-ring-path" />
        </animateMotion>
      </circle>
      <circle r="5" fill="url(#cometOrange)" opacity="0.7">
        <animateMotion dur="7s" repeatCount="indefinite" begin="-2.3s">
          <mpath href="#hero-ring-path" />
        </animateMotion>
      </circle>
    </g>
  </svg>
);

export default HeroRing;
