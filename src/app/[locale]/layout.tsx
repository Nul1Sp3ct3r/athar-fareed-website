import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CursorBubble } from "@/components/layout/CursorBubble";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import { getDictionary, getDirection, isLocale, locales } from "@/lib/i18n";
import { I18nProvider } from "@/lib/i18n-client";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    ...buildMetadata({ locale }),
    title: { default: t.meta.title, template: t.meta.template },
    keywords: t.meta.keywords.split(", "),
    applicationName: siteConfig.name,
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);

  return (
    <html lang={locale} dir={getDirection(locale)} className={fontVariables}>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          // Static, locally-authored JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }}
        />

        <I18nProvider locale={locale} dictionary={dictionary}>
          <SmoothScroll />
          <CursorBubble />

          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
          >
            {locale === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
          </a>

          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter locale={locale} />

          <div aria-hidden className="grain" />
        </I18nProvider>
      </body>
    </html>
  );
}
