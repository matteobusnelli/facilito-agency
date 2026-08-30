import { motion } from "framer-motion";
import { useTranslation } from "@/i18n";

const ProblemSection = () => {
  const { t } = useTranslation();
  const { eyebrow, heading, points, reframeHeading, reframeBody } = t.problem;

  return (
    <section className="py-16 md:py-28 lg:py-36">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">{eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">{heading}</h2>
          </motion.div>

          {/* Scannable — 5 short lines, not a paragraph. Numbered instead of bulleted, so a
              stray last item completes a row instead of stretching into an odd, oversized box. */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {points.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="w-full lg:basis-[calc(33.333%-0.667rem)] lg:flex-none p-5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.14] transition-colors duration-200"
              >
                <span className="block text-xs font-bold text-primary/60 tabular-nums mb-2.5">
                  0{i + 1}
                </span>
                <p className="text-sm text-white/70 leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>

          {/* Reframe — closes the section in the same scroll beat */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="p-7 md:p-9 rounded-2xl bg-white/[0.06] border border-white/10 text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight whitespace-pre-line">{reframeHeading}</h3>
            <p className="text-white/60 leading-relaxed max-w-xl mx-auto">{reframeBody}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
