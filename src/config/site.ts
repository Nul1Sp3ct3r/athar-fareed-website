/**
 * Single source of truth for company-level content.
 * Swap these values when the real brand assets / contact details land.
 */
export const siteConfig = {
  /** Production origin — used for canonical URLs, OG tags and the sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://atharfareed.com",

  name: "Athar Fareed",
  nameAr: "أثر فريد",

  /** PLACEHOLDER — replace with a monitored inbox. */
  email: "hello@atharfareed.com",
  /** PLACEHOLDER — replace or remove. */
  phone: "+966 00 000 0000",
  location: { en: "Riyadh, Saudi Arabia", ar: "الرياض، المملكة العربية السعودية" },

  /** PLACEHOLDER social handles — update hrefs before launch. */
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "X", href: "https://x.com/" },
  ],
} as const;
