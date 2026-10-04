import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, localePath } from "@/lib/i18n";

export const dynamic = "force-static";

const PATHS = ["/", "/services", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${siteConfig.url}${localePath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [
            code,
            `${siteConfig.url}${localePath(code, path)}`,
          ]),
        ),
      },
    })),
  );
}
