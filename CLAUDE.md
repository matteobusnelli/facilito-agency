# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

Presentation website for **Facilito Agency**, a software development agency offering:
- Websites (from €499)
- Custom management systems (CRUD apps)
- Custom automation solutions

**Target audience:** Low-budget impulse buyers — freelancers with VAT numbers and small local businesses (Italian market primary, with English and Spanish support).

**Conversion goal:** High visual impact, strong first impression, fast scanning, emotional triggers. The design must feel modern and premium despite targeting budget-conscious clients.

## Commands

```bash
npm run dev          # Dev server on localhost:8080
npm run build        # Production build
npm run lint         # ESLint
npm run preview      # Preview production build
npm run test         # Run tests once (Vitest)
npm run test:watch   # Watch mode
```

## Architecture

Single-page landing (SPA) built with React 18 + TypeScript + Vite.

### Page composition (`src/pages/Index.tsx`)

```
Navbar → HeroSection → ServicesSection → WhyUsSection →
ProcessSection → TestimonialsSection → ContactSection → FooterSection
```

Anchor IDs: `#servizi`, `#come-funziona`, `#contatti`

### i18n (`src/i18n/`)

Lightweight context-based system — no external library.

- `src/i18n/index.tsx` — `I18nProvider`, `useTranslation()` hook, `LOCALE_LABELS`
- `src/i18n/locales/it.ts` — Italian (default), exports `Translations` type
- `src/i18n/locales/en.ts` — English
- `src/i18n/locales/es.ts` — Spanish

**All UI text lives in translation files.** Never hardcode visible strings in components — always use `const { t } = useTranslation()`.

Adding a new locale: create `src/i18n/locales/xx.ts` satisfying `Translations`, add it to the `locales` map in `src/i18n/index.tsx`.

### Design system

**Colors (CSS variables in `src/index.css`):**
- `--primary`: Electric Indigo `hsl(252 91% 63%)` — main brand accent
- `--accent`: Warm Amber `hsl(38 98% 58%)` — secondary highlights
- `--hero`: `hsl(240 10% 5%)` — very dark, used for hero and footer backgrounds
- `--surface`: `hsl(240 5% 96%)` — alternate section background

**Typography:**
- One typeface everywhere: Space Grotesk. Headings use 700–800 weight with `letter-spacing: -0.02em`; body text uses lighter weights (400–600). Never mix in a second family.

**Key utility classes** (defined in `src/index.css`):
- `.bg-hero` / `.text-hero-foreground` — dark hero sections
- `.bg-dot-grid` — subtle dot pattern for dark sections
- `.text-gradient` — indigo→blue gradient text
- `.number-hero` — large tabular number display
- `.link-underline` — animated hover underline

**Alternating section rhythm:** light (`bg-background`) → surface (`bg-surface`) → dark (`bg-hero`) → surface → dark (testimonials) → surface (contact) → dark (footer)

### Animations

Framer Motion for all entrance animations. Pattern:
```tsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
```
Always use `viewport={{ once: true }}` — animations fire once on scroll into view.

### Contact form & email (`ContactSection.tsx` + `api/contact.ts`)

The form posts JSON to `/api/contact` (Vercel serverless function). The function:
1. Rate-limits by IP (3 req / 60s, per serverless instance)
2. Checks a honeypot field (`_hp`) — bots that fill it get a fake 200
3. Validates name/email/message server-side
4. Parses `CONTACT_EMAILS` env var (comma-separated) into a recipient list
5. Sends via **Resend** (`resend` npm package) using `RESEND_API_KEY`
6. Returns `{ success: true }` or `{ error: "..." }`

The frontend handles three states: `idle` → `success` / `error`. On success, a Calendly booking CTA is optionally shown.

**Email service: Resend** — free tier is 3,000 emails/month, 100/day. No credit card required.

### Environment variables

See `.env.example` for the full reference. Copy it to `.env.local` for local dev.

| Variable | Where | Description |
|---|---|---|
| `RESEND_API_KEY` | Server only | From resend.com dashboard |
| `RESEND_FROM_EMAIL` | Server only | `Name <email@domain.com>` format. Use `onboarding@resend.dev` until domain is verified. |
| `CONTACT_EMAILS` | Server only | Comma-separated recipient list |
| `VITE_CALENDLY_URL` | Client (Vite) | Calendly booking link. Leave empty to hide the CTA entirely. |

**⚠️ Never add `VITE_` prefix to `RESEND_API_KEY` or `CONTACT_EMAILS`** — that would expose them in the frontend bundle.

**Domain verification (for production):** Register your domain in the Resend dashboard → add DNS records → then set `RESEND_FROM_EMAIL=Facilito Agency <info@facilitoagency.it>`.

### Calendly

`VITE_CALENDLY_URL` drives two CTAs:
- A subtle link below the hero buttons in `HeroSection`
- A boxed CTA in the left column of `ContactSection`
- A post-submission upsell in the success state of `ContactSection`

Both are conditionally rendered — if the env var is empty, nothing is shown.

### Providers (`App.tsx`)

```
I18nProvider → QueryClientProvider → TooltipProvider → Toaster/Sonner → Router
```

### shadcn/ui

Components in `src/components/ui/`. Add new ones with:
```bash
npx shadcn@latest add <component>
```

### TypeScript

Intentionally loose: `noImplicitAny: false`, `strictNullChecks: false`. Do not tighten these settings.

## Design Principles

1. **Dark hero, light content.** The hero and footer use the dark `--hero` token. Content sections alternate between white and `--surface`.
2. **No decorative images.** Visual interest comes from typography, spacing, and subtle CSS effects (gradients, dot grid, ambient glows).
3. **One accent color.** Use `primary` (indigo) for interactive elements and highlights. Avoid using amber (`accent`) for CTAs.
4. **Big numbers.** Stats, step numbers, and service numbers use large, heavy type to create rhythm and scannability.
5. **Asymmetric layouts where possible.** Avoid uniform 3-column grids — break with featured/hero card patterns (see `ServicesSection`).
6. **Conversion first.** Every section ends with a path to `#contatti`. The CTA is always visible in the navbar.
