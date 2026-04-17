import type { Translations } from "./it";

export const en: Translations = {
  meta: {
    title: "Facilito Agency — Websites, Management Systems & Automation",
    description:
      "We build websites, custom management systems, and automations for freelancers and small businesses. Free quote in 24h.",
  },
  nav: {
    services: "Services",
    process: "How it works",
    contact: "Contact",
    cta: "Free quote",
  },
  hero: {
    badge: "Only 3 slots available this month — response in 24h",
    line1: "Your website,",
    line2: "live in 7 days.",
    line3: "Built for you.",
    description:
      "Done for you, no technical knowledge required. Websites, management systems, and automations for freelancers and small businesses.",
    cta: "Get your free quote",
    secondary: "How it works ↓",
    bookCall: "Or book a free call",
    trust: ["Free quote in 24h", "Fixed price, no surprises", "Live in 7 days"],
    stats: [
      { value: "50+", label: "Happy clients" },
      { value: "7d", label: "Average delivery" },
      { value: "24h", label: "Free quote" },
    ],
  },
  services: {
    heading: "What you get with us",
    subheading: "Concrete solutions. Fixed prices. Results in days.",
    items: [
      {
        number: "01",
        title: "Professional Website",
        tag: "Live in 7 days",
        description:
          "A site that works for you: attracts clients, communicates who you are, works on every device. Delivered in a week.",
        highlights: ["Custom design, never a template", "SEO optimized for Google", "CMS: update it yourself"],
        cta: "I want my website →",
      },
      {
        number: "02",
        title: "Custom Management System",
        tag: "By quote",
        description:
          "Goodbye spreadsheets. Clients, orders, inventory — all in one software built for your workflow.",
        highlights: ["Access from any device", "Secure cloud data", "Scalable over time"],
        cta: "Request a quote →",
      },
      {
        number: "03",
        title: "Automation",
        tag: "Save 5+ hours every week",
        description:
          "Automatic invoices, follow-up emails, reports. Stop doing manually what a computer can do for you.",
        highlights: ["Integrates with your tools", "Fully custom workflows", "Ongoing support"],
        cta: "Automate my work →",
      },
    ],
  },
  why: {
    heading: "Why choose Facilito",
    subheading: "A small team, clear goals: real results in days, not months.",
    items: [
      {
        title: "Actually fast",
        description: "From first call to live website: under 7 days. Not months.",
      },
      {
        title: "Transparent pricing",
        description: "Free, detailed quote before we start. You always know what you'll pay — no surprises.",
      },
      {
        title: "Built for you",
        description: "No off-the-shelf templates. Every project starts from your real needs.",
      },
      {
        title: "Always there",
        description: "We don't disappear after delivery. Direct support, always.",
      },
    ],
  },
  process: {
    heading: "How it works",
    subheading: "From idea to launch in 3 steps. Simpler than you think.",
    steps: [
      {
        number: "01",
        title: "Tell us your project",
        duration: "~15 min",
        description:
          "A quick call or a message. No commitment. We send a free quote within 24 hours.",
      },
      {
        number: "02",
        title: "We build everything",
        duration: "5–7 days",
        description:
          "Design, development, content. We stay in touch at every step — no jargon, just results.",
      },
      {
        number: "03",
        title: "You go live",
        duration: "30 min setup",
        description:
          "We publish together. We walk you through managing it in 30 minutes and stay available.",
      },
    ],
  },
  testimonials: {
    heading: "What clients say",
    subheading: "Real clients. Real results.",
    cta: "Join them — free quote",
    items: [
      {
        name: "Marco R.",
        role: "Freelance photographer",
        text: "Within a week I was online with a site I actually love. Fast, precise, available. Nothing more to ask.",
        rating: 5,
      },
      {
        name: "Laura B.",
        role: "Beauty salon owner",
        text: "They automated my bookings and I save hours every week. I should have done it sooner.",
        rating: 5,
      },
      {
        name: "Alessandro T.",
        role: "Financial consultant",
        text: "Finally someone who speaks plainly. The management system is perfect for how I work.",
        rating: 5,
      },
    ],
  },
  contact: {
    heading: "The quote is free.",
    subheading:
      "Send us a message — we'll get back within 24 hours with a tailored offer. No spam, no pressure.",
    urgency: "Now accepting new projects · limited slots",
    guarantee: "Free quote within 24h",
    noSpam: "Zero spam, ever",
    fastResponse: "Same-day response",
    bookCall: "Prefer to talk directly?",
    bookCallCta: "Book a call",
    form: {
      name: "Full name",
      namePlaceholder: "John Smith",
      email: "Email",
      emailPlaceholder: "john@example.com",
      phone: "Phone number",
      phonePlaceholder: "+44 7700 123456",
      service: "What do you need?",
      serviceOptions: [
        { value: "website", label: "Website" },
        { value: "cms", label: "Custom management system" },
        { value: "automation", label: "Automation" },
        { value: "other", label: "Other / Not sure yet" },
      ],
      message: "Tell us about the project",
      messagePlaceholder: "Briefly describe what you're looking for...",
      submit: "Send me a free quote",
      submitting: "Sending...",
      successTitle: "Message received!",
      successMessage:
        "We'll get back to you within 24 hours. Check your spam folder if you don't hear from us.",
      errorMessage: "Something went wrong. Please try again or contact us directly.",
      sendAnother: "Send another request",
      errors: {
        nameRequired: "Name is required",
        emailInvalid: "Enter a valid email address",
        phoneRequired: "Phone number is required",
        serviceRequired: "Please select a service",
        messageRequired: "Please describe your project briefly",
      },
    },
  },
  mockup: {
    badgeLive: "Site live in 7d",
    badgeAuto: "Automation active",
    badgeDash: "Dashboard online",
    successLive: "Site live!",
    successAuto: "Running...",
    successDash: "Data updated",
    urlWebsite: "yoursite.com",
    urlAutomation: "n8n.yourbusiness.com/workflow",
    urlDashboard: "dashboard.yourbusiness.com",
    autoTitle: "Lead automation",
    autoNode1: "New Lead",
    autoNode2: "Email Sent",
    autoNode3: "CRM Updated",
    autoNode4: "Invoice Ready",
    autoFooter: "Active flow · last run 2 min ago",
    dashTitle: "CRM — Clients",
    dashColName: "Client",
    dashColService: "Service",
    dashColStatus: "Status",
    dashRow1Name: "Marco R.",
    dashRow1Service: "Website",
    dashRow2Name: "Laura B.",
    dashRow2Service: "Automation",
    dashRow3Name: "Alex T.",
    dashRow3Service: "Dashboard",
    dashStatusActive: "Active",
    dashStatusProgress: "In progress",
    dashStatusNew: "New",
  },
  footer: {
    tagline: "The digital you actually need.",
    vatLabel: "VAT",
    vatNumber: "00000000000",
    rights: "All rights reserved.",
    email: "info@facilitoagency.com",
    tiktok: "Follow us on TikTok",
    links: {
      privacy: "Privacy",
      terms: "Terms",
    },
  },
};
