/**
 * Single source of truth for company-level content.
 */
export const siteConfig = {
  /** Production origin — used for canonical URLs, OG tags and the sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://uniqueimpact.sa",

  /** Brand name — Latin in both locales. */
  name: "UNIQUE IMPACT",
  /** Official logo, served from public/. */
  logo: "/brand/unique-impact-logo.png",

  email: "info@uniqueimpact.sa",
  /** Displayed as written locally; dialled and published in international form. */
  phone: "0580122802",
  phoneInternational: "+966580122802",
  location: { en: "Jeddah, Saudi Arabia", ar: "جدة، المملكة العربية السعودية" },
} as const;
