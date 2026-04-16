import { motion } from "framer-motion";
import { Globe, LayoutDashboard, Workflow, Check } from "lucide-react";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";

const ICONS = [Globe, LayoutDashboard, Workflow];

const ServicesSection = () => {
  const { t } = useTranslation();
  const { items, heading, subheading } = t.services;

  return (
    <section id="servizi" className="py-28 md:py-36 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-xl"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            {t.nav.services}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">{heading}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{subheading}</p>
        </motion.div>

        {/* Services: first card large, two below it */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {/* Featured — first service, spans full width on md */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 group relative p-8 md:p-10 rounded-2xl bg-foreground text-background overflow-hidden"
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-5">
                  {items[0].tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {items[0].title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm md:text-base">
                  {items[0].description}
                </p>
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
            const Icon = ICONS[i + 1];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (i + 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative p-8 rounded-2xl border border-border bg-background overflow-hidden",
                  "hover:border-primary/20 hover:shadow-[0_8px_30px_-8px_hsl(252_91%_63%_/_0.12)] transition-all duration-300"
                )}
              >
                <span
                  aria-hidden
                  className="absolute right-6 top-3 text-[80px] font-black text-foreground/[0.04] leading-none select-none pointer-events-none"
                >
                  {service.number}
                </span>

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-primary/70 tracking-wider uppercase mb-3 block">
                    {service.tag}
                  </span>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
