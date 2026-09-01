import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { locales, localePath } from "@/lib/i18n";

const STATIC_PATHS = ["/", "/work", "/services", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...projects.map((project) => `/work/${project.slug}`),
  ];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteConfig.url}${localePath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [code, `${siteConfig.url}${localePath(code, path)}`]),
        ),
      },
    })),
  );
}
