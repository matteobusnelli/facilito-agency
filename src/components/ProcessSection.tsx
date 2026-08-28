import { motion } from "framer-motion";
import { useTranslation } from "@/i18n";

const ProcessSection = () => {
  const { t } = useTranslation();
  const { heading, subheading, steps } = t.process;

  return (
    <section id="come-funziona" className="py-28 md:py-36 bg-surface">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 max-w-lg mx-auto"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Processo
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{heading}</h2>
          <p className="text-muted-foreground leading-relaxed">{subheading}</p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid sm:grid-cols-[80px_1fr] gap-6 pb-12 last:pb-0"
            >
              {/* Connector line — grows downward as the step scrolls into view */}
              {i < steps.length - 1 && (
                <motion.div
                  aria-hidden
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "top" }}
                  className="absolute left-[39px] top-14 bottom-0 w-px bg-border hidden sm:block"
                />
              )}

              {/* Number bubble */}
              <div className="hidden sm:flex flex-col items-center">
                <div className="w-[78px] h-[78px] rounded-2xl border-2 border-border bg-background flex items-center justify-center relative z-10">
                  <span className="number-hero text-2xl text-foreground">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="pb-4 sm:pb-0 pt-1">
                {/* Mobile number */}
                <span className="sm:hidden inline-block text-4xl font-black text-foreground/10 mb-1">
                  {step.number}
                </span>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                  {/* Duration pill — shows how fast each step is */}
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: "hsl(25 95% 55% / 0.12)", color: "hsl(28 100% 55%)" }}
                  >
                    {step.duration}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA below process */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#contatti"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-warm text-white font-semibold text-base hover:opacity-90 transition-opacity"
            style={{ boxShadow: "0 8px 32px -4px hsl(25 95% 55% / 0.3)" }}
          >
            {t.nav.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
