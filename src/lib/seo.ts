import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getDictionary, locales, localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const OG_LOCALE: Record<Locale, string> = { en: "en_US", ar: "ar_SA" };

/** Canonical + hreflang alternates for a locale-relative path. */
function alternates(locale: Locale, path: string): Metadata["alternates"] {
  const languages = Object.fromEntries(
    locales.map((code) => [code, localePath(code, path)]),
  ) as Record<string, string>;

  return {
    canonical: localePath(locale, path),
    languages: { ...languages, "x-default": localePath("en", path) },
  };
}

export function buildMetadata({
  locale,
  path = "/",
  title,
  description,
}: {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
}): Metadata {
  const t = getDictionary(locale);
  const resolvedTitle = title ? `${title} ${t.meta.template.replace("%s ", "")}` : t.meta.title;
  const resolvedDescription = description ?? t.meta.description;

  return {
    title: title ? { absolute: resolvedTitle } : t.meta.title,
    description: resolvedDescription,
    alternates: alternates(locale, path),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((code) => code !== locale).map((code) => OG_LOCALE[code]),
      url: localePath(locale, path),
      title: resolvedTitle,
      description: resolvedDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
    },
  };
}

/** Organization schema, emitted once per page from the locale layout. */
export function organizationJsonLd(locale: Locale) {
  const t = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: `${siteConfig.url}${localePath(locale)}`,
    description: t.meta.description,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    email: siteConfig.email,
    telephone: siteConfig.phoneInternational,
    slogan: t.brand.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location[locale],
      addressCountry: "SA",
    },
    knowsAbout: [
      "Web Development",
      "Mobile Applications",
      "Custom Software",
      "Artificial Intelligence",
      "Business Automation",
      "Cybersecurity",
      "Cloud Solutions",
      "System Integrations",
      "UI/UX Design",
    ],
  };
}
