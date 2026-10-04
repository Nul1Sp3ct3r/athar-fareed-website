/**
 * Single source of truth for company-level content.
 */
export const siteConfig = {
  /** Production origin — used for canonical URLs, OG tags and the sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://uniqueimpact.sa",

  /** Brand name — Latin in both locales. */
  name: "UNIQUE IMPACT",
  /**
   * Official logo, used as supplied from public/. The file has transparent
   * padding, so `art` records where the artwork sits inside it (measured from
   * the alpha channel); frames crop to that box instead of editing the file.
   */
  logo: {
    file: "/brand/Unique Impact_ Fingerprint Typography.png",
    width: 2172,
    height: 724,
    art: { x: 189, y: 193, width: 1807, height: 393 },
  },

  email: "info@uniqueimpact.sa",
  /** Displayed as written locally; dialled and published in international form. */
  phone: "0580122802",
  phoneInternational: "+966580122802",
  location: { en: "Jeddah, Saudi Arabia", ar: "جدة، المملكة العربية السعودية" },
} as const;

/** The logo's URL path; the file name contains spaces, so it is encoded. */
export const logoUrl = encodeURI(siteConfig.logo.file);
