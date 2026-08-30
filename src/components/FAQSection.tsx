import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslation } from "@/i18n";

const FAQSection = () => {
  const { t } = useTranslation();
  const { eyebrow, heading, items } = t.faq;

  return (
    <section id="faq" className="py-16 md:py-28 lg:py-36">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">{eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{heading}</h2>
          </motion.div>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {items.map((item, i) => (
              <motion.details
                key={item.q}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                className="group py-5"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-white text-base">
                  {item.q}
                  <Plus className="w-4 h-4 text-primary shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="text-white/60 text-sm leading-relaxed mt-3 pr-8">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
