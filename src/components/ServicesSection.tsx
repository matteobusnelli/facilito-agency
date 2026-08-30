import { motion } from "framer-motion";
import { Globe, LayoutDashboard, Workflow, Megaphone, Check } from "lucide-react";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";

const ICON_STYLES = [
  { Icon: Globe, color: "hsl(252 91% 68%)", tint: "hsl(252 91% 60% / 0.1)" },
  { Icon: LayoutDashboard, color: "hsl(271 81% 68%)", tint: "hsl(271 81% 60% / 0.1)" },
  { Icon: Workflow, color: "hsl(25 95% 58%)", tint: "hsl(25 95% 55% / 0.12)" },
  { Icon: Megaphone, color: "hsl(320 85% 65%)", tint: "hsl(320 85% 60% / 0.1)" },
] as const;

const ServicesSection = () => {
  const { t } = useTranslation();
  const { items, heading, subheading, categories, cta } = t.services;

  return (
    <section id="servizi" className="py-16 md:py-28 lg:py-36">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl mx-auto text-center"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            {t.nav.services}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-white">{heading}</h2>
          <p className="text-white/60 text-lg leading-relaxed">{subheading}</p>
        </motion.div>

        {/* Category strip — signals these are grouped by result, not by technology */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2.5 mb-10"
        >
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/60 border border-white/[0.1] bg-white/[0.03]"
            >
              {cat}
            </span>
          ))}
        </motion.div>

        {/* Services: first card large, three below it */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Featured — first service, spans full width */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -4, borderColor: "hsl(0 0% 100% / 0.2)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3 group relative p-8 md:p-10 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm overflow-hidden"
          >
            {/* Subtle number watermark */}
            <span
              aria-hidden
              className="absolute right-8 top-4 text-[120px] font-black text-white/[0.04] leading-none select-none pointer-events-none"
            >
              {items[0].number}
            </span>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-start">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold mb-5"
                  style={{ borderColor: "hsl(25 95% 55% / 0.3)", background: "hsl(25 95% 55% / 0.1)", color: "hsl(28 100% 72%)" }}
                >
                  {items[0].tag}
                </span>
                <p className="text-sm font-semibold text-white/50 mb-1.5">{items[0].hook}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {items[0].title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm md:text-base mb-6">
                  {items[0].description}
                </p>
                <a
                  href="#contatti"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  {items[0].cta}
                </a>
              </div>
              <ul className="space-y-2.5 mt-2 md:mt-8">
                {items[0].highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Second and third services */}
          {items.slice(1).map((service, i) => {
            const { Icon, color, tint } = ICON_STYLES[i + 1];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (i + 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-sm overflow-hidden flex flex-col",
                  "hover:bg-white/[0.07] hover:border-white/[0.14] hover:shadow-[0_20px_50px_-16px_hsl(252_91%_63%_/_0.25)] transition-[background-color,border-color,box-shadow] duration-300"
                )}
              >
                <span
                  aria-hidden
                  className="absolute right-6 top-3 text-[80px] font-black text-white/[0.04] leading-none select-none pointer-events-none"
                >
                  {service.number}
                </span>

                <div className="relative z-10 flex flex-col flex-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: (i + 1) * 0.1 + 0.15 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: tint }}
                  >
                    <Icon
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{ color }}
                    />
                  </motion.div>
                  <span className="text-xs font-semibold text-primary/70 tracking-wider uppercase mb-3 block">
                    {service.tag}
                  </span>
                  <p className="text-xs font-semibold text-white/45 mb-1">{service.hook}</p>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-white">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-sm text-white/60">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contatti"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    {service.cta}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a
            href="#contatti"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-warm text-white font-semibold text-base hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
            style={{ boxShadow: "0 8px 32px -4px hsl(25 95% 55% / 0.3)" }}
          >
            {cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
