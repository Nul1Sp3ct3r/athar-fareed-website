# UNIQUE IMPACT

Bilingual (EN/AR) marketing site for UNIQUE IMPACT, a technology and digital
solutions company based in Jeddah, Saudi Arabia. Production:
<https://uniqueimpact.sa>.

Next.js App Router as a fully static export (`output: "export"`), TypeScript
strict, Tailwind CSS v4, Motion for animation, Lenis for smooth scrolling.
Deployed as a Cloudflare Worker that serves the export as static assets and
handles one endpoint, `POST /api/contact`.

**Art direction.** Warm paper canvas, ink type, a condensed display face and a
six-colour accent system, with an original hand-drawn illustration set. All
design tokens live in `src/app/globals.css`; nothing is hard-coded in
components.

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000 → redirects to /en or /ar
pnpm lint
pnpm build      # static export to out/
```

`next dev` serves the pages but not the Worker, so the contact form cannot
submit there. To run the full site including `/api/contact`, build first and
then run the Worker locally (Wrangler is not a project dependency):

```bash
pnpm build
pnpm dlx wrangler dev
```

`/` is a static page that sends the browser to `/en` or `/ar` based on
`navigator.languages` (default `/en`; a `<noscript>` meta refresh covers
script-less clients). Every route is prerendered.

## Architecture

```
src/
  app/
    layout.tsx              # pass-through root; the document lives one level down
    page.tsx                # static locale redirect for /
    [locale]/
      layout.tsx            # <html lang dir>, fonts, header/footer, JSON-LD
      template.tsx          # replays the page transition per navigation
      page.tsx              # homepage
      opengraph-image.tsx   # generated share card (next/og), embeds the logo
      services/ about/ contact/
      not-found.tsx
    robots.ts sitemap.ts    # force-static metadata routes
  components/
    layout/                 # header, footer, smooth scroll, cursor, transitions
    navigation/             # logo (Wordmark), nav links, mobile menu, language switcher
    sections/               # hero, marquee, services, about, process, why, cta
    ui/                     # container, section, buttons, eyebrow, arrow
    motion/                 # Reveal, TextReveal, Marquee, Magnetic, …
    illustration/           # Doodle set, Sticker/DoodleTile, Marks, ConvergeScene
    contact/                # inquiry form
  config/site.ts            # brand name, logo path, email, phone, location, URL
  data/services.ts          # 6 bento services: colour, doodle, span, copy
  data/proof.ts             # social proof — deliberately empty, see below
  lib/                      # i18n, seo, fonts, animations, utils, contact
  messages/{en,ar}.json     # all UI copy
public/
  brand/Unique Impact_ Fingerprint Typography.png  # official logo — use as supplied
worker/
  index.ts                  # Cloudflare Worker: /api/contact, everything else → assets
wrangler.jsonc              # Worker name, static assets (out/), non-secret vars
```

**Brand.** The official logo (`public/brand/Unique Impact_ Fingerprint Typography.png`) is used
unmodified in the header, footer, mobile menu and share card, for both locales.
The file has transparent padding around the artwork, so `Wordmark.tsx` frames
it to the artwork bounds instead of resizing or editing the file. Text contexts
(titles, metadata, alt text, JSON-LD) use the name `UNIQUE IMPACT`.

**Content model.** UI chrome copy lives in `src/messages/*.json`. Content that
behaves like CMS records — services — lives in `src/data/*.ts` with
`{ en, ar }` values, so a real CMS can replace it without touching components.

**i18n.** No i18n library. `src/lib/i18n.ts` resolves a dictionary on the
server; `I18nProvider` hands it to the few client components that need it, so
neither language's copy is duplicated into the client bundle.

**RTL.** Logical properties throughout (`ps-`, `me-`, `start-`, `text-start`),
`rtl:` variants where a transform has to mirror, and Arabic-specific typography
rules in `globals.css` (letter-spacing is dropped in RTL — tracking separates
connected Arabic letterforms). Arabic text is stored in normal logical order;
direction comes from `dir`, never from reversed strings.

**Motion.** Reduced-motion is read through `useReducedMotionSafe()`
(`useSyncExternalStore` with a `false` server snapshot). It only shortens
durations — never changes which elements render — which is what keeps hydration
clean. The marquee is pure CSS.

**Illustration system.** One 120×120 stage, thick ink outlines, flat fills and
geometry rotated a degree or two off true — see the contract at the top of
`components/illustration/Doodle.tsx`. Every drawing is original; nothing is
imported from a stock set.

**Type.** Anton for display (Tajawal 800 in Arabic — no condensed Arabic
counterpart exists in this pairing), Manrope for text. The `font-display`
utility handles the swap, so components never branch on locale for type.

**Social proof.** `src/data/proof.ts` is empty on purpose: there are no
approved client quotes or logos, so nothing is invented. `SocialProof` renders
`null` in production and a clearly-labelled stub in development. Adding entries
to that file turns the section on.

## Contact form

The form posts JSON to `/api/contact`, which `wrangler.jsonc` routes to
`worker/index.ts` (`run_worker_first: ["/api/*"]`); all other requests are
served straight from `out/`.

- Validation: `src/lib/contact/schema.ts`, shared with the client for inline
  errors. A hidden honeypot field silently drops bot submissions.
- Delivery: `src/lib/contact/delivery.ts` sends a plain-text email through
  Arsel's HTTP API (`POST https://api.arsel.sa/v1/email/send`), with
  `reply_to` set to the visitor's address.
- Responses: `400` invalid JSON, `422` validation errors, `502` delivery
  failure, `200` success.

Configuration:

| Name | Where | Notes |
| --- | --- | --- |
| `ARSEL_API_KEY` | Cloudflare Worker **secret** | never in the repo or in `NEXT_PUBLIC_*` |
| `CONTACT_FROM_EMAIL` | `wrangler.jsonc` `vars` | sender on the verified Arsel domain |
| `CONTACT_FROM_NAME` | `wrangler.jsonc` `vars` | sender display name |
| `CONTACT_TO_EMAIL` | `wrangler.jsonc` `vars` | inbox that receives inquiries |

Plain-text variables set in the Cloudflare dashboard are overwritten on every
`wrangler deploy`, which is why the non-secret values live in `wrangler.jsonc`.
For local `wrangler dev`, copy `.dev.vars.example` to `.dev.vars` (gitignored)
and set `ARSEL_API_KEY`; leave the other lines out so the `wrangler.jsonc`
values apply.

## Deployment

Cloudflare Workers Builds:

- Build command: `pnpm run build`
- Deploy command: `npx wrangler deploy`

`NEXT_PUBLIC_SITE_URL` (see `.env.example`) sets the origin used for canonical
URLs, Open Graph, `robots.txt` and the sitemap. It is read at build time and
defaults to `https://uniqueimpact.sa` when unset.

## Still to do

| Where | What |
| --- | --- |
| `public/brand/` | an optimized/SVG version of the official logo |
| `src/app/favicon.ico` | still the Next.js default |
| `src/data/proof.ts` | empty until approved testimonials or partner logos exist |
| `src/messages/*.json` | `pages.about.statsNote` — metrics to be published once verified |

No company statistics are stated anywhere; the About page says metrics will be
published once verified.
