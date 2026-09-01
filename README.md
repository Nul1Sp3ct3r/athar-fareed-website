# Athar Fareed — أثر فريد

Bilingual (EN/AR) marketing site for Athar Fareed, a technology and digital
solutions company. Next.js App Router, TypeScript strict, Tailwind CSS v4,
Motion for animation, Lenis for smooth scrolling.

**Art direction.** Warm paper canvas, ink type, a condensed display face and a
six-colour accent system, with an original hand-drawn illustration set. All
design tokens live in `src/app/globals.css`; nothing is hard-coded in
components.

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000 → redirects to /en or /ar
pnpm lint
pnpm build && pnpm start
```

`/` redirects to a locale based on the browser's `Accept-Language`
(`src/proxy.ts`). Both `/en` and `/ar` are prerendered.

## Architecture

```
src/
  app/
    layout.tsx              # pass-through root; the document lives one level down
    [locale]/
      layout.tsx            # <html lang dir>, fonts, header/footer, JSON-LD
      template.tsx          # replays the page transition per navigation
      page.tsx              # homepage
      opengraph-image.tsx   # generated share card (next/og)
      work/ work/[slug]/ services/ about/ contact/
      not-found.tsx
    api/contact/route.ts
    robots.ts sitemap.ts
  components/
    layout/                 # header, footer, smooth scroll, cursor, transitions
    navigation/             # wordmark, nav links, mobile menu, language switcher
    sections/               # hero, marquee, services, work, about, process, why, cta
    ui/                     # container, section, buttons, eyebrow, arrow
    motion/                 # Reveal, TextReveal, Marquee, Magnetic, Parallax, …
    illustration/           # Doodle set, Sticker/DoodleTile, Marks, ConvergeScene
    work/ contact/          # project cards + visuals, inquiry form
  config/site.ts            # company name, email, phone, socials, URL
  data/services.ts          # 6 bento services: colour, doodle, span, copy
  data/projects.ts          # projects + full case-study content
  data/proof.ts             # social proof — deliberately empty, see below
  lib/                      # i18n, seo, fonts, animations, utils, contact
  messages/{en,ar}.json     # all UI copy
```

**Content model.** UI chrome copy lives in `src/messages/*.json`. Content that
behaves like CMS records — services and projects — lives in `src/data/*.ts` with
`{ en, ar }` values, so a real CMS can replace those two files without touching
components.

**i18n.** No i18n library. `src/lib/i18n.ts` resolves a dictionary on the
server; `I18nProvider` hands it to the few client components that need it, so
neither language's copy is duplicated into the client bundle.

**RTL.** Logical properties throughout (`ps-`, `me-`, `start-`, `text-start`),
`rtl:` variants where a transform has to mirror, and Arabic-specific typography
rules in `globals.css` (letter-spacing is dropped in RTL — tracking separates
connected Arabic letterforms).

**Motion.** Reduced-motion is read through `useReducedMotionSafe()`
(`useSyncExternalStore` with a `false` server snapshot). It only shortens
durations — never changes which elements render — which is what keeps hydration
clean. The marquee is pure CSS.

**Illustration system.** One 120×120 stage, thick ink outlines, flat fills and
geometry rotated a degree or two off true — see the contract at the top of
`components/illustration/Doodle.tsx`. Every drawing is original; nothing is
imported from a stock set. Project "screenshots" are composed from the same
primitives in `components/work/ProjectVisual.tsx`.

**Type.** Anton for display (Tajawal 800 in Arabic — no condensed Arabic
counterpart exists in this pairing), Manrope for text. The `font-display`
utility handles the swap, so components never branch on locale for type.

**Social proof.** `src/data/proof.ts` is empty on purpose: there are no
approved client quotes or logos, so nothing is invented. `SocialProof` renders
`null` in production and a clearly-labelled stub in development. Adding entries
to that file turns the section on.

## Contact form

`POST /api/contact` validates with `src/lib/contact/schema.ts` (shared with the
client for inline errors) and fans out through
`src/lib/contact/delivery.ts`. The only transport today logs to the server.
To add email / CRM / WhatsApp / database, implement `InquiryTransport` and add
it to the `transports` array — the route does not change.

## Placeholders to replace before launch

| Where | What |
| --- | --- |
| `src/config/site.ts` | `email`, `phone`, `social` hrefs, `location` |
| `.env` / `NEXT_PUBLIC_SITE_URL` | production origin (defaults to `https://atharfareed.com`) |
| `src/data/projects.ts` | project copy; `results: []` is intentionally empty — no invented metrics |
| `src/data/proof.ts` | empty until approved testimonials or partner logos exist |
| `src/messages/*.json` | `pages.about.statsNote`, `work.placeholderNote`, `caseStudy.resultsPlaceholder` |
| `src/lib/contact/delivery.ts` | a real transport |
| `src/components/navigation/Wordmark.tsx` | text wordmark, pending a real logo |
| `src/app/favicon.ico` | still the Next.js default |

No company statistics are stated anywhere; the About page says metrics will be
published once verified.

## Verified

- `pnpm lint` and `pnpm build` clean; 24 static routes prerendered.
- No hydration errors and no console warnings on `/en`, `/ar`, a case study or
  the contact page.
- No horizontal overflow and exactly one `<h1>` per page across
  1440 / 1280 / 1024 / 768 / 430 / 390 px, in both locales.
- Canonical + `hreflang` (incl. `x-default`), Open Graph, Twitter card,
  Organization JSON-LD, `robots.txt`, `sitemap.xml` with language alternates.
