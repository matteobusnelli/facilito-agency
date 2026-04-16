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
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Clienti
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {heading}
          </h2>
          <p className="text-white/50 max-w-md mx-auto">{subheading}</p>
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
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/75 leading-relaxed text-sm mb-6">
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
