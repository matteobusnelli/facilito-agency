import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "@/i18n";

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const { heading, subheading, items } = t.testimonials;

  return (
    <section className="py-28 md:py-36 bg-hero bg-dot-grid overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Clienti
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {heading}
          </h2>
          <p className="text-white/50 max-w-md mx-auto">{subheading}</p>
        </motion.div>

        {/* Aggregate rating strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-center gap-2 mb-14"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-white/60 text-sm font-medium">5.0 · 50+ recensioni</span>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 leading-relaxed text-sm mb-6">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-5 border-t border-white/[0.08]">
                <p className="font-semibold text-sm text-white">{item.name}</p>
                <p className="text-white/40 text-sm mt-0.5">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA nudge after social proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center mt-14"
        >
          <a
            href="#contatti"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            style={{ boxShadow: "0 8px 32px -4px hsl(252 91% 63% / 0.4)" }}
          >
            {t.testimonials.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
