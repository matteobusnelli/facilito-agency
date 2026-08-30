import { motion } from "framer-motion";
import { Zap, BadgeEuro, Paintbrush, Heart } from "lucide-react";
import { useTranslation } from "@/i18n";
import CaseStudies from "@/components/CaseStudies";

const ICON_STYLES = [
  { Icon: Zap, color: "hsl(25 95% 55%)", tint: "hsl(25 95% 50% / 0.1)" },
  { Icon: BadgeEuro, color: "hsl(252 91% 65%)", tint: "hsl(252 91% 60% / 0.1)" },
  { Icon: Paintbrush, color: "hsl(320 85% 60%)", tint: "hsl(320 85% 55% / 0.1)" },
  { Icon: Heart, color: "hsl(271 81% 65%)", tint: "hsl(271 81% 60% / 0.1)" },
] as const;

const WhyUsSection = () => {
  const { t } = useTranslation();
  const { heading, subheading, items } = t.why;

  return (
    <section id="perche-noi" className="py-16 md:py-28 lg:py-36">
      <div className="container mx-auto px-6">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Facilito
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 text-white whitespace-pre-line">{heading}</h2>
          <p className="text-white/60 leading-relaxed text-lg">{subheading}</p>

          <a
            href="#contatti"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-gradient-warm text-white text-base font-semibold hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
          >
            {t.nav.cta}
          </a>
        </motion.div>

        {/* 4 items in a centered 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {items.map((item, i) => {
            const { Icon, color, tint } = ICON_STYLES[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.07] hover:border-white/[0.14] flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.1 + 0.15 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: tint }}
                >
                  <Icon className="w-[18px] h-[18px]" style={{ color }} strokeWidth={2} />
                </motion.div>
                <h3 className="font-bold text-base mb-2 text-white">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Case studies — full-width grid, breaks out of the narrower max-w above */}
        <div className="mt-24">
          <CaseStudies />
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
