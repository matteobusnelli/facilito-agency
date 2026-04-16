import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ArrowRight, BadgeCheck, Zap, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/i18n";

type FormValues = {
  name: string;
  email: string;
  service: string;
  message: string;
};

const ContactSection = () => {
  const { t } = useTranslation();
  const f = t.contact.form;
  const [submitted, setSubmitted] = useState(false);

  const schema = z.object({
    name: z.string().min(2, f.errors.nameRequired),
    email: z.string().email(f.errors.emailInvalid),
    service: z.string().min(1, f.errors.serviceRequired),
    message: z.string().min(10, f.errors.messageRequired),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    const serviceLabel =
      f.serviceOptions.find((o) => o.value === data.service)?.label ?? data.service;
    const subject = encodeURIComponent(`Richiesta preventivo — ${serviceLabel}`);
    const body = encodeURIComponent(
      `Nome: ${data.name}\nEmail: ${data.email}\nServizio: ${serviceLabel}\n\n${data.message}`
    );
    window.open(`mailto:${t.footer.email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
    reset();
  };

  const guarantees = [
    { icon: BadgeCheck, label: t.contact.guarantee },
    { icon: ShieldCheck, label: t.contact.noSpam },
    { icon: Zap, label: t.contact.fastResponse },
  ];

  return (
    <section id="contatti" className="py-28 md:py-36 bg-surface">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Left column — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:sticky md:top-24"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Contatti
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 leading-tight">
              {t.contact.heading}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
              {t.contact.subheading}
            </p>

            {/* Guarantees */}
            <ul className="space-y-4">
              {guarantees.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-background border border-border h-full min-h-[400px]"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.successTitle}</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">{f.successMessage}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                  >
                    Invia un'altra richiesta
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-8 rounded-2xl bg-background border border-border space-y-5"
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="name">
                      {f.name}
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder={f.namePlaceholder}
                      autoComplete="name"
                      {...register("name")}
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs mt-1.5">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="email">
                      {f.email}
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder={f.emailPlaceholder}
                      autoComplete="email"
                      {...register("email")}
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs mt-1.5">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="service">
                      {f.service}
                    </label>
                    <select
                      id="service"
                      {...register("service")}
                      defaultValue=""
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        —
                      </option>
                      {f.serviceOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-destructive text-xs mt-1.5">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="message">
                      {f.message}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder={f.messagePlaceholder}
                      {...register("message")}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-destructive text-xs mt-1.5">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ boxShadow: "0 8px 24px -4px hsl(252 91% 63% / 0.3)" }}
                  >
                    {isSubmitting ? f.submitting : f.submit}
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
