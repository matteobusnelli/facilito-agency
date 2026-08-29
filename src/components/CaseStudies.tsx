import { motion } from "framer-motion";
import {
  Globe,
  LayoutDashboard,
  Workflow,
  Palette,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Zap,
  ArrowUpRight,
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  Search,
  Star,
} from "lucide-react";
import { useTranslation } from "@/i18n";

type ProjectType = "website" | "cms" | "automation" | "brand";

const STYLES: Record<
  ProjectType,
  {
    Icon: typeof Globe;
    StatIcon: typeof TrendingUp;
    chipText: string;
    chipBorder: string;
    chipDot: string;
    iconBg: string;
    iconColor: string;
    link: string;
    glow: string;
    hoverBorder: string;
    hoverShadow: string;
  }
> = {
  website: {
    Icon: Globe,
    StatIcon: TrendingUp,
    chipText: "text-blue-300",
    chipBorder: "border-blue-400/25",
    chipDot: "bg-blue-400",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    link: "text-blue-400 hover:text-blue-300",
    glow: "hsl(217 91% 60% / 0.16)",
    hoverBorder: "hover:border-blue-400/30",
    hoverShadow: "hover:shadow-[0_24px_70px_-16px_rgba(59,130,246,0.35)]",
  },
  cms: {
    Icon: LayoutDashboard,
    StatIcon: TrendingUp,
    chipText: "text-pink-300",
    chipBorder: "border-pink-400/25",
    chipDot: "bg-pink-400",
    iconBg: "bg-pink-500/15",
    iconColor: "text-pink-400",
    link: "text-pink-400 hover:text-pink-300",
    glow: "hsl(330 81% 60% / 0.16)",
    hoverBorder: "hover:border-pink-400/30",
    hoverShadow: "hover:shadow-[0_24px_70px_-16px_rgba(219,39,119,0.35)]",
  },
  automation: {
    Icon: Workflow,
    StatIcon: TrendingDown,
    chipText: "text-violet-300",
    chipBorder: "border-violet-400/25",
    chipDot: "bg-violet-400",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    link: "text-violet-400 hover:text-violet-300",
    glow: "hsl(271 81% 60% / 0.16)",
    hoverBorder: "hover:border-violet-400/30",
    hoverShadow: "hover:shadow-[0_24px_70px_-16px_rgba(139,92,246,0.35)]",
  },
  brand: {
    Icon: Palette,
    StatIcon: TrendingUp,
    chipText: "text-emerald-300",
    chipBorder: "border-emerald-400/25",
    chipDot: "bg-emerald-400",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    link: "text-emerald-400 hover:text-emerald-300",
    glow: "hsl(160 70% 45% / 0.16)",
    hoverBorder: "hover:border-emerald-400/30",
    hoverShadow: "hover:shadow-[0_24px_70px_-16px_rgba(16,185,129,0.35)]",
  },
};

const STAT_ICONS: Record<ProjectType, typeof Clock> = {
  website: TrendingUp,
  cms: Users,
  automation: Zap,
  brand: TrendingUp,
};

// Mini fake-UI preview per project type, staged inside an elevated "device"
// frame — no real screenshots yet, so each card gets an abstract on-brand
// mockup instead of a placeholder icon.
const PreviewWebsite = () => (
  <div className="w-[86%] rounded-xl border border-white/10 bg-[#0b0b13] shadow-2xl shadow-black/60 overflow-hidden">
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06]">
      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
    </div>
    <div className="p-4 space-y-2">
      <div className="h-2 w-2/3 rounded-full bg-white/70" />
      <div className="h-2 w-1/2 rounded-full bg-white/70" />
      <div className="h-1.5 w-full rounded-full bg-white/20 mt-1.5" />
      <div className="h-1.5 w-4/5 rounded-full bg-white/20" />
      <div className="h-6 w-20 rounded-lg bg-blue-500 mt-2" />
    </div>
  </div>
);

const PreviewCms = () => (
  <div className="w-[86%] rounded-xl border border-white/10 bg-[#0b0b13] shadow-2xl shadow-black/60 p-3.5 space-y-2.5">
    <div className="flex items-center gap-1.5">
      <Search className="w-2.5 h-2.5 text-white/30" />
      <div className="h-1.5 w-16 rounded-full bg-white/20" />
    </div>
    <div className="grid grid-cols-2 gap-2 pt-0.5">
      <div className="rounded-lg bg-pink-500/10 border border-pink-500/20 p-2">
        <p className="text-sm font-bold text-white leading-none">18</p>
        <p className="text-[7px] text-white/40 uppercase tracking-wide mt-1">Appuntamenti</p>
      </div>
      <div className="rounded-lg bg-white/[0.04] border border-white/10 p-2">
        <p className="text-sm font-bold text-white leading-none">1.284</p>
        <p className="text-[7px] text-white/40 uppercase tracking-wide mt-1">Clienti</p>
      </div>
    </div>
  </div>
);

const PreviewAutomation = () => {
  const nodes = [Mail, Calendar, MessageSquare, FileText];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        {nodes.map((_, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 24;
          const y = 50 + Math.sin(angle) * 30;
          return (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${x}%`}
              y2={`${y}%`}
              stroke="hsl(271 81% 70% / 0.25)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-400/40 flex items-center justify-center z-10 shadow-lg shadow-violet-900/40">
        <Zap className="w-4 h-4 text-violet-300" />
      </div>
      {nodes.map((Icon, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * 48;
        const y = Math.sin(angle) * 42;
        return (
          <div
            key={i}
            className="absolute w-7 h-7 rounded-lg bg-[#0b0b13] border border-white/15 flex items-center justify-center shadow-lg shadow-black/50"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <Icon className="w-3 h-3 text-white/60" />
          </div>
        );
      })}
    </div>
  );
};

const PreviewBrand = () => (
  <div className="w-24 rounded-xl border border-white/15 bg-[#0b0b13] shadow-2xl shadow-black/60 overflow-hidden">
    <div className="h-16 bg-gradient-to-br from-emerald-600/50 via-emerald-800/40 to-amber-700/40" />
    <div className="p-2 space-y-1.5">
      <div className="flex items-center gap-1">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        <div className="h-1.5 w-10 rounded-full bg-white/30" />
      </div>
      <div className="flex items-center gap-1 text-emerald-400">
        <Star className="w-2.5 h-2.5 fill-current" />
        <div className="h-1.5 w-14 rounded-full bg-white/15" />
      </div>
    </div>
  </div>
);

const PREVIEWS: Record<ProjectType, () => JSX.Element> = {
  website: PreviewWebsite,
  cms: PreviewCms,
  automation: PreviewAutomation,
  brand: PreviewBrand,
};

const CaseStudies = () => {
  const { t } = useTranslation();
  const {
    caseStudyEyebrow,
    caseStudyHeading1,
    caseStudyHeading2,
    caseStudySubheading,
    caseStudyCtaAll,
    portfolioCtaLabel,
    portfolio,
    portfolioDisclaimer,
  } = t.why;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center mb-14"
      >
        <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
          {caseStudyEyebrow}
        </p>
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
          <span className="block text-white">{caseStudyHeading1}</span>
          <span className="block text-gradient-warm">{caseStudyHeading2}</span>
        </h3>
        <p className="text-white/60 leading-relaxed text-lg">{caseStudySubheading}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolio.map((project, i) => {
          const type = project.type as ProjectType;
          const style = STYLES[type];
          const StatIcon = STAT_ICONS[type];
          const Preview = PREVIEWS[type];
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`group rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.015] overflow-hidden flex flex-col shadow-xl shadow-black/30 transition-all duration-300 ${style.hoverBorder} ${style.hoverShadow}`}
            >
              {/* Preview */}
              <div
                className="relative aspect-[4/3] shrink-0 flex items-center justify-center px-4"
                style={{ background: `radial-gradient(circle at 50% 22%, ${style.glow}, hsl(240 14% 7%) 78%)` }}
              >
                <span
                  className={`absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide backdrop-blur-md bg-black/40 border ${style.chipBorder} ${style.chipText}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${style.chipDot}`} />
                  {project.category}
                </span>
                <div className="transition-transform duration-500 -rotate-2 group-hover:rotate-0 group-hover:scale-[1.04]">
                  <Preview />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h4 className="font-bold text-white text-lg leading-snug tracking-tight mb-2">
                  {project.title}
                </h4>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{project.description}</p>

                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/[0.08]">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg}`}>
                    <StatIcon className={`w-4 h-4 ${style.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold leading-none tracking-tight text-white tabular-nums">
                      {project.stat}
                    </p>
                    <p className="text-[11px] text-white/40 mt-1">{project.statLabel}</p>
                  </div>
                </div>

                <a
                  href="#contatti"
                  className={`group/link inline-flex items-center gap-1 mt-5 text-xs font-semibold transition-colors ${style.link}`}
                >
                  {portfolioCtaLabel}
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4 mt-14">
        <a
          href="#contatti"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-warm text-white text-base font-semibold shadow-lg shadow-black/30 hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
        >
          {caseStudyCtaAll}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <p className="text-[11px] text-white/25">{portfolioDisclaimer}</p>
      </div>
    </div>
  );
};

export default CaseStudies;
