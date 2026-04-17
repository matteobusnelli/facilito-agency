import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Zap,
  Inbox,
  Mail,
  Database,
  FileText,
  Search,
  Plus,
  LayoutDashboard,
  RefreshCw,
} from "lucide-react";
import { useTranslation } from "@/i18n";

const SCENE_DURATION = 5800;
const SCENES = ["website", "automation", "dashboard"] as const;
type Scene = (typeof SCENES)[number];

// Stagger helper
const s = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
  transition: { delay: 0.28 + i * 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
});

// ─── Scene: Website skeleton ────────────────────────────────────────────────
const WebsiteScene = () => (
  <motion.div
    key="website"
    className="space-y-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.25 } }}
  >
    {/* Nav */}
    <motion.div {...s(0)} className="flex items-center gap-2.5">
      <div className="w-4 h-4 rounded-md shrink-0" style={{ background: "hsl(252 91% 63%)" }} />
      <div className="h-2.5 w-14 rounded-full bg-white/70" />
      <div className="flex-1" />
      <div className="h-2 w-8 rounded-full bg-white/25" />
      <div className="h-2 w-8 rounded-full bg-white/25" />
      <div
        className="h-5 w-16 rounded-lg"
        style={{
          background: "hsl(252 91% 63% / 0.85)",
          boxShadow: "0 2px 8px hsl(252 91% 63% / 0.4)",
        }}
      />
    </motion.div>

    <motion.div {...s(0)} className="h-px bg-white/[0.08]" />

    {/* Hero headline */}
    <motion.div {...s(1)} className="pt-0.5 space-y-2">
      <div className="h-4 w-[78%] rounded-full bg-white/88" />
      <div className="h-4 w-[58%] rounded-full bg-white/88" />
    </motion.div>

    {/* Body copy */}
    <motion.div {...s(2)} className="space-y-1.5">
      <div className="h-2 w-full rounded-full bg-white/35" />
      <div className="h-2 w-[72%] rounded-full bg-white/35" />
    </motion.div>

    {/* CTA */}
    <motion.div {...s(3)}>
      <div
        className="h-8 w-32 rounded-xl"
        style={{
          background: "hsl(252 91% 63%)",
          boxShadow: "0 4px 20px hsl(252 91% 63% / 0.6)",
        }}
      />
    </motion.div>

    {/* Feature cards */}
    <motion.div {...s(4)} className="grid grid-cols-2 gap-2 pt-0.5">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-white/[0.08] p-3 space-y-1.5"
          style={{ background: "hsl(240 12% 12%)" }}
        >
          <div className="w-5 h-5 rounded-md bg-primary/50 mb-2" />
          <div className="h-2 w-[60%] rounded-full bg-white/60" />
          <div className="h-1.5 w-full rounded-full bg-white/22" />
          <div className="h-1.5 w-[75%] rounded-full bg-white/22" />
        </div>
      ))}
    </motion.div>
  </motion.div>
);

// ─── Scene: Automation (n8n style) ──────────────────────────────────────────
const AutomationScene = ({ m }: { m: ReturnType<typeof useTranslation>["t"]["mockup"] }) => {
  const nodes = [
    { label: m.autoNode1, icon: Inbox, done: true },
    { label: m.autoNode2, icon: Mail, done: true },
    { label: m.autoNode3, icon: Database, active: true },
    { label: m.autoNode4, icon: FileText, pending: true },
  ];

  return (
    <motion.div
      key="automation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="space-y-2.5"
    >
      {/* Title row */}
      <motion.div {...s(0)} className="flex items-center gap-2 pb-1">
        <div className="w-4 h-4 rounded-md bg-amber-500/70 flex items-center justify-center shrink-0">
          <RefreshCw className="w-2.5 h-2.5 text-white/90" />
        </div>
        <span className="text-xs font-semibold text-white/80">{m.autoTitle}</span>
        <div className="flex-1" />
        <span className="flex items-center gap-1 text-[10px] text-green-400/80">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
          </span>
          live
        </span>
      </motion.div>

      {/* Flow nodes */}
      <div className="space-y-1.5">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.div key={node.label} {...s(i + 1)} className="relative">
              {/* Connector line (not for last) */}
              {i < nodes.length - 1 && (
                <div className="absolute left-[18px] top-full h-1.5 w-px bg-white/[0.12] z-10" />
              )}
              <div
                className="flex items-center gap-3 rounded-xl border px-3 py-2.5"
                style={{
                  background: node.active
                    ? "hsl(252 91% 63% / 0.12)"
                    : node.done
                      ? "hsl(240 12% 13%)"
                      : "hsl(240 12% 10%)",
                  borderColor: node.active
                    ? "hsl(252 91% 63% / 0.35)"
                    : node.done
                      ? "hsl(255 50% 60% / 0.18)"
                      : "hsl(240 12% 18%)",
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: node.active
                      ? "hsl(252 91% 63% / 0.25)"
                      : node.done
                        ? "hsl(252 91% 63% / 0.15)"
                        : "hsl(240 12% 18%)",
                  }}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{
                      color: node.done || node.active ? "hsl(252 91% 75%)" : "hsl(240 5% 50%)",
                    }}
                  />
                </div>

                <span
                  className="text-xs font-medium flex-1"
                  style={{
                    color: node.done || node.active ? "hsl(0 0% 90%)" : "hsl(240 5% 50%)",
                  }}
                >
                  {node.label}
                </span>

                {/* Status indicator */}
                {node.done && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />}
                {node.active && (
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                  </span>
                )}
                {node.pending && (
                  <div className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer status */}
      <motion.div
        {...s(5)}
        className="flex items-center gap-1.5 pt-1 border-t border-white/[0.06]"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-[9px] text-white/35">{m.autoFooter}</span>
      </motion.div>
    </motion.div>
  );
};

// ─── Scene: Gestionale (mini CRM) ───────────────────────────────────────────
const DashboardScene = ({ m }: { m: ReturnType<typeof useTranslation>["t"]["mockup"] }) => {
  const rows = [
    { name: m.dashRow1Name, service: m.dashRow1Service, status: m.dashStatusActive, color: "green" },
    { name: m.dashRow2Name, service: m.dashRow2Service, status: m.dashStatusProgress, color: "amber" },
    { name: m.dashRow3Name, service: m.dashRow3Service, status: m.dashStatusNew, color: "blue" },
  ];

  const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
    green: { bg: "hsl(142 70% 45% / 0.15)", text: "hsl(142 70% 65%)", dot: "hsl(142 70% 55%)" },
    amber: { bg: "hsl(38 98% 58% / 0.15)", text: "hsl(38 98% 72%)", dot: "hsl(38 98% 58%)" },
    blue:  { bg: "hsl(220 80% 60% / 0.15)", text: "hsl(220 80% 75%)", dot: "hsl(220 80% 65%)" },
  };

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="space-y-2.5"
    >
      {/* Title + actions */}
      <motion.div {...s(0)} className="flex items-center gap-2">
        <LayoutDashboard className="w-3.5 h-3.5 text-primary/80 shrink-0" />
        <span className="text-xs font-semibold text-white/80">{m.dashTitle}</span>
        <div className="flex-1" />
        <div
          className="flex items-center gap-1 h-5 px-2 rounded-md text-[9px] font-medium text-white/70"
          style={{ background: "hsl(252 91% 63% / 0.2)", border: "1px solid hsl(252 91% 63% / 0.3)" }}
        >
          <Plus className="w-2.5 h-2.5" />
          Nuovo
        </div>
      </motion.div>

      {/* Search bar */}
      <motion.div
        {...s(1)}
        className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-2.5 h-7"
        style={{ background: "hsl(240 12% 12%)" }}
      >
        <Search className="w-3 h-3 text-white/30 shrink-0" />
        <div className="h-1.5 w-24 rounded-full bg-white/15" />
      </motion.div>

      {/* Table header */}
      <motion.div
        {...s(2)}
        className="grid gap-2 px-1"
        style={{ gridTemplateColumns: "1fr 1fr auto" }}
      >
        {[m.dashColName, m.dashColService, m.dashColStatus].map((col) => (
          <span key={col} className="text-[9px] font-semibold uppercase tracking-wider text-white/35">
            {col}
          </span>
        ))}
      </motion.div>

      <div className="h-px bg-white/[0.07]" />

      {/* Rows */}
      <div className="space-y-1">
        {rows.map((row, i) => {
          const c = statusColors[row.color];
          return (
            <motion.div
              key={row.name}
              {...s(3 + i)}
              className="grid gap-2 items-center rounded-lg px-2.5 py-2 border border-transparent hover:border-white/[0.06] transition-colors"
              style={{
                gridTemplateColumns: "1fr 1fr auto",
                background: "hsl(240 12% 11%)",
              }}
            >
              <span className="text-[11px] font-medium text-white/85 truncate">{row.name}</span>
              <span className="text-[10px] text-white/45 truncate">{row.service}</span>
              <span
                className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-semibold whitespace-nowrap"
                style={{ background: c.bg, color: c.text }}
              >
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: c.dot }} />
                {row.status}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────
const HeroBrowserMockup = () => {
  const { t } = useTranslation();
  const m = t.mockup;
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setSceneIndex((i) => (i + 1) % SCENES.length),
      SCENE_DURATION
    );
    return () => clearInterval(id);
  }, []);

  const scene = SCENES[sceneIndex];

  const badgeTop = scene === "website" ? m.badgeLive : scene === "automation" ? m.badgeAuto : m.badgeDash;
  const badgeBottom =
    scene === "website" ? m.successLive : scene === "automation" ? m.successAuto : m.successDash;
  const badgeBottomColor =
    scene === "website"
      ? { border: "hsl(142 70% 45% / 0.3)", bg: "hsl(142 70% 45% / 0.12)", text: "hsl(142 70% 65%)", icon: CheckCircle2 }
      : scene === "automation"
        ? { border: "hsl(38 98% 58% / 0.3)", bg: "hsl(38 98% 58% / 0.12)", text: "hsl(38 98% 72%)", icon: RefreshCw }
        : { border: "hsl(220 80% 60% / 0.3)", bg: "hsl(220 80% 60% / 0.12)", text: "hsl(220 80% 75%)", icon: CheckCircle2 };

  const url =
    scene === "website" ? m.urlWebsite : scene === "automation" ? m.urlAutomation : m.urlDashboard;

  const BottomIcon = badgeBottomColor.icon;

  return (
    <motion.div
      className="relative w-full max-w-[440px] mx-auto lg:mx-0 lg:ml-auto"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, hsl(252 91% 63% / 0.2) 0%, transparent 68%)",
          filter: "blur(48px)",
          transform: "scale(1.3)",
        }}
      />

      {/* Top badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`top-${scene}`}
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute -top-4 -left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-xl backdrop-blur-sm select-none"
          style={{
            borderColor: "hsl(38 98% 58% / 0.3)",
            background: "hsl(38 98% 58% / 0.1)",
            color: "hsl(38 98% 72%)",
          }}
        >
          <Zap className="w-3 h-3" />
          {badgeTop}
        </motion.div>
      </AnimatePresence>

      {/* Browser card */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl border border-white/[0.10] overflow-hidden"
        style={{
          background: "hsl(240 12% 9%)",
          boxShadow:
            "0 32px 80px -12px hsl(240 10% 4% / 0.75), 0 0 0 1px hsl(252 91% 63% / 0.07)",
        }}
      >
        {/* Browser top bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07]"
          style={{ background: "hsl(240 12% 7%)" }}
        >
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`url-${scene}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 h-5 rounded-md bg-white/[0.06] flex items-center px-2.5 gap-1.5 overflow-hidden"
            >
              <div className="w-2 h-2 rounded-full bg-green-400/50 shrink-0" />
              <span className="text-[9px] text-white/35 font-mono truncate">{url}</span>
            </motion.div>
          </AnimatePresence>

          {/* Scene tabs */}
          <div className="flex gap-1">
            {SCENES.map((sc, i) => (
              <button
                key={sc}
                onClick={() => setSceneIndex(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: i === sceneIndex ? "hsl(252 91% 63%)" : "hsl(240 5% 30%)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Scene content */}
        <div className="p-5 min-h-[300px]">
          <AnimatePresence mode="wait">
            {scene === "website" && <WebsiteScene key="website" />}
            {scene === "automation" && <AutomationScene key="automation" m={m} />}
            {scene === "dashboard" && <DashboardScene key="dashboard" m={m} />}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bottom-${scene}`}
          initial={{ opacity: 0, scale: 0.8, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -8 }}
          transition={{ delay: 1.5, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute -bottom-4 -right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-xl backdrop-blur-sm select-none"
          style={{
            borderColor: badgeBottomColor.border,
            background: badgeBottomColor.bg,
            color: badgeBottomColor.text,
          }}
        >
          <BottomIcon className="w-3 h-3" />
          {badgeBottom}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default HeroBrowserMockup;
