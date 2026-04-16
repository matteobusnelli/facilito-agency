import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ArrowRight, BadgeCheck, Zap, ShieldCheck, Calendar, AlertCircle } from "lucide-react";
import { useTranslation } from "@/i18n";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const ContactSection = () => {
  const { t } = useTranslation();
  const f = t.contact.form;

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const honeypotRef = useRef<HTMLInputElement>(null);

  const schema = z.object({
    name: z.string().min(2, f.errors.nameRequired),
    email: z.string().email(f.errors.emailInvalid),
    phone: z.string().min(5, f.errors.phoneRequired),
    service: z.string().min(1, f.errors.serviceRequired),
    message: z.string().min(10, f.errors.messageRequired),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message,
          website: honeypotRef.current?.value ?? "",
        }),
      });

      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setServerError(json.error ?? f.errorMessage);
        setStatus("error");
      }
    } catch {
      setServerError(f.errorMessage);
      setStatus("error");
    }
  };

  const guarantees = [
    { icon: BadgeCheck, label: t.contact.guarantee },
    { icon: ShieldCheck, label: t.contact.noSpam },
    { icon: Zap, label: t.contact.fastResponse },
  ];

  const inputCls =
    "w-full h-11 px-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <section id="contatti" className="py-28 md:py-36 bg-surface">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">

          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:sticky md:top-24"
          >
            {/* Urgency signal */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/[0.08] text-amber-700 dark:text-amber-300/90 text-xs font-semibold mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
              </span>
              {t.contact.urgency}
            </div>

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
            <ul className="space-y-3">
              {guarantees.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            {/* Calendly CTA */}
            {CALENDLY_URL && (
              <div className="mt-10 p-5 rounded-xl border border-primary/20 bg-primary/[0.04]">
                <p className="text-sm font-semibold mb-1">{t.contact.bookCall}</p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  {t.contact.bookCallCta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </motion.div>

          {/* ── Right column — form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {/* ── Success state ── */}
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-background border border-border min-h-[420px]"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.successTitle}</h3>
                  <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                    {f.successMessage}
                  </p>

                  {CALENDLY_URL && (
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      {t.contact.bookCallCta}
                    </a>
                  )}

                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                  >
                    {f.sendAnother}
                  </button>
                </motion.div>

              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-8 rounded-2xl bg-background border border-border space-y-5"
                  noValidate
                >
                  {/* Honeypot — off-screen, not zero-height, so Chrome autofill ignores it */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                    <label htmlFor="__trap">Leave this empty</label>
                    <input
                      ref={honeypotRef}
                      id="__trap"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="new-password"
                    />
                  </div>

                  {/* Server error banner */}
                  {status === "error" && serverError && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/8 border border-destructive/20 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

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
                      className={inputCls}
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
                      className={inputCls}
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs mt-1.5">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="phone">
                      {f.phone}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder={f.phonePlaceholder}
                      autoComplete="tel"
                      {...register("phone")}
                      className={inputCls}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-xs mt-1.5">{errors.phone.message}</p>
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
                      className={`${inputCls} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>—</option>
                      {f.serviceOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
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
                    style={{ boxShadow: "0 8px 24px -4px hsl(252 91% 63% / 0.35)" }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {f.submitting}
                      </>
                    ) : (
                      <>
                        {f.submit}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    {t.contact.noSpam}
                  </p>
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
