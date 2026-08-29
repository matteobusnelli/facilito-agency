import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, BadgeCheck, Zap, Calendar, AlertCircle } from "lucide-react";
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
    { icon: BadgeCheck, label: t.contact.guarantee, color: "hsl(252 91% 65%)", tint: "hsl(252 91% 60% / 0.1)" },
    { icon: Zap, label: t.contact.fastResponse, color: "hsl(25 95% 55%)", tint: "hsl(25 95% 50% / 0.1)" },
  ];

  const inputCls =
    "w-full h-11 px-4 rounded-lg border border-white/15 bg-white/[0.05] text-white text-sm placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <section id="contatti" className="py-28 md:py-36">
      <div className="container mx-auto px-6">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-10"
        >
          {/* Urgency signal */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/25 bg-amber-400/[0.1] text-amber-300 text-xs font-semibold mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
            </span>
            {t.contact.urgency}
          </div>

          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            {t.contact.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-tight text-white">
            {t.contact.heading}
          </h2>
          <p className="text-white/60 leading-relaxed text-lg">
            {t.contact.subheading}
          </p>
        </motion.div>

        {/* Guarantees — centered row */}
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-10">
          {guarantees.map(({ icon: Icon, label, color, tint }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-2.5 text-sm text-white"
            >
              <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: tint }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </span>
              {label}
            </motion.li>
          ))}
        </ul>

        {/* Calendly CTA */}
        {CALENDLY_URL && (
          <div className="max-w-sm mx-auto mb-10 p-5 rounded-xl border border-primary/25 bg-primary/[0.08] text-center">
            <p className="text-sm font-semibold mb-1 text-white">{t.contact.bookCall}</p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              {t.contact.bookCallCta}
            </a>
          </div>
        )}

        {/* Form — centered as a card; labels stay left-aligned inside it for readability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-lg mx-auto"
        >
            <AnimatePresence mode="wait">
              {/* ── Success state ── */}
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm min-h-[420px]"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{f.successTitle}</h3>
                  <p className="text-white/60 text-sm max-w-xs leading-relaxed">
                    {f.successMessage}
                  </p>

                  {CALENDLY_URL && (
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      {t.contact.bookCallCta}
                    </a>
                  )}

                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-xs text-white/50 underline underline-offset-4 hover:text-white transition-colors"
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
                  className="p-8 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm space-y-5"
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
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/25 text-sm text-red-300">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-white/80" htmlFor="name">
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
                    <label className="block text-sm font-medium mb-1.5 text-white/80" htmlFor="email">
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
                    <label className="block text-sm font-medium mb-1.5 text-white/80" htmlFor="phone">
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
                    <label className="block text-sm font-medium mb-1.5 text-white/80" htmlFor="service">
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
                    <label className="block text-sm font-medium mb-1.5 text-white/80" htmlFor="message">
                      {f.message}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder={f.messagePlaceholder}
                      {...register("message")}
                      className="w-full px-4 py-3 rounded-lg border border-white/15 bg-white/[0.05] text-white text-sm placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-destructive text-xs mt-1.5">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full bg-gradient-warm text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ boxShadow: "0 8px 24px -4px hsl(25 95% 55% / 0.35)" }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {f.submitting}
                      </>
                    ) : (
                      f.submit
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
