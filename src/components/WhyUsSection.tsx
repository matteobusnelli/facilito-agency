import { motion } from "framer-motion";
import { Zap, BadgeEuro, Paintbrush, Heart } from "lucide-react";
import { useTranslation } from "@/i18n";

const ICONS = [Zap, BadgeEuro, Paintbrush, Heart];

const WhyUsSection = () => {
  const { t } = useTranslation();
  const { heading, subheading, items } = t.why;

  return (
    <section className="py-28 md:py-36 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Left: sticky header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:sticky md:top-24"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Facilito
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">{heading}</h2>
            <p className="text-muted-foreground leading-relaxed">{subheading}</p>

            <a
              href="#contatti"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              {t.nav.cta}
            </a>
          </motion.div>

          {/* Right: 4 items in a 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-surface border border-border"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
