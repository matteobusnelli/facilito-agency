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
    badge: "Response in 24h — no commitment",
    line1: "The digital",
    line2: "you actually",
    line3: "need.",
    description:
      "Websites, management systems, and automations built for freelancers and small businesses. No bureaucracy, no surprises.",
    cta: "Request a quote",
    secondary: "Explore services",
    bookCall: "Book a free call",
    trust: ["Free quote", "Response within 24h", "Fixed, transparent pricing"],
    stats: [
      { value: "50+", label: "Happy clients" },
      { value: "7d", label: "Average delivery" },
      { value: "100%", label: "Projects completed" },
    ],
  },
  services: {
    heading: "What we do for you",
    subheading: "Three concrete solutions. Zero complications.",
    items: [
      {
        number: "01",
        title: "Websites",
        tag: "From €499",
        description:
          "A professional site that represents you and attracts new clients. Responsive, fast, and easy to update.",
        highlights: ["Custom design", "SEO optimized", "CMS included"],
      },
      {
        number: "02",
        title: "Custom Management Systems",
        tag: "By quote",
        description:
          "Software built for your workflow. Manage clients, orders, inventory — without endless spreadsheets.",
        highlights: ["Access from any device", "Secure data", "Scalable over time"],
      },
      {
        number: "03",
        title: "Automation",
        tag: "Save hours every week",
        description:
          "Automatic invoices, follow-up emails, reports. Automate the tasks that steal your time every day.",
        highlights: ["Integrates with your tools", "Custom workflows", "Ongoing support"],
      },
    ],
  },
  why: {
    heading: "Why choose Facilito",
    subheading:
      "We're a small team with one clear goal: help you get results without overcomplicating things.",
    items: [
      {
        title: "Fast",
        description: "From quote to delivery in record time. No months-long waits.",
      },
      {
        title: "Clear",
        description: "Fixed prices, direct communication. You always know what you're paying for.",
      },
      {
        title: "Custom",
        description: "No copy-paste templates. Every project starts from your actual needs.",
      },
      {
        title: "Close",
        description: "We don't disappear after delivery. We're here when you need us.",
      },
    ],
  },
  process: {
    heading: "How it works",
    subheading: "Three steps from idea to finished product.",
    steps: [
      {
        number: "01",
        title: "Tell us what you need",
        description:
          "A 15-minute call or a message. No commitment. We understand your project and send a free quote.",
      },
      {
        number: "02",
        title: "We build together",
        description:
          "We design and develop while keeping you updated at every stage. No jargon, just concrete progress.",
      },
      {
        number: "03",
        title: "You go live",
        description:
          "We deliver, train you if needed, and stay available. Your project is ready to work for you.",
      },
    ],
  },
  testimonials: {
    heading: "Those who've worked with us",
    subheading: "Not our words. Theirs.",
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
    heading: "Let's talk.",
    subheading:
      "Tell us about your project. Get a free quote within 24 hours. No commitment, no pressure.",
    guarantee: "Free quote within 24h",
    noSpam: "Zero spam, zero sales pressure",
    fastResponse: "Quick and direct response",
    bookCall: "Prefer to talk directly?",
    bookCallCta: "Book a call",
    form: {
      name: "Full name",
      namePlaceholder: "John Smith",
      email: "Email",
      emailPlaceholder: "john@example.com",
      service: "What do you need?",
      serviceOptions: [
        { value: "website", label: "Website" },
        { value: "cms", label: "Custom management system" },
        { value: "automation", label: "Automation" },
        { value: "other", label: "Other / Not sure yet" },
      ],
      message: "Tell us about the project",
      messagePlaceholder: "Briefly describe what you're looking for...",
      submit: "Send request",
      submitting: "Sending...",
      successTitle: "Request sent!",
      successMessage:
        "We'll get back to you within 24 hours. Check your spam folder if you don't hear from us.",
      errorMessage: "Something went wrong. Please try again or contact us directly.",
      sendAnother: "Send another request",
      errors: {
        nameRequired: "Name is required",
        emailInvalid: "Enter a valid email address",
        serviceRequired: "Please select a service",
        messageRequired: "Please describe your project briefly",
      },
    },
  },
  footer: {
    tagline: "The digital you actually need.",
    vatLabel: "VAT",
    vatNumber: "00000000000",
    rights: "All rights reserved.",
    email: "info@facilitoagency.it",
    links: {
      privacy: "Privacy",
      terms: "Terms",
    },
  },
};
