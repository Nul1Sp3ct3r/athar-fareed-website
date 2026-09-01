import Link from "next/link";
import { BackToTop } from "@/components/layout/BackToTop";
import { Wordmark } from "@/components/navigation/Wordmark";
import { Container } from "@/components/ui/Container";
import { Arrow } from "@/components/ui/Arrow";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getNavItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const items = getNavItems(locale, t);
  const isArabic = locale === "ar";

  return (
    <footer className="relative overflow-hidden bg-paper pt-20 lg:pt-28">
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Wordmark locale={locale} size="lg" />
            <p className="font-display mt-6 max-w-sm text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.05] text-ink">
              {t.footer.tagline}
            </p>
            {/* The other language keeps its own bidi order but stays flush
                with the column's reading edge. */}
            <p
              className={cn(
                "mt-3 max-w-sm text-base text-ink-faint",
                isArabic ? "text-right" : "text-left",
              )}
              lang={isArabic ? "en" : "ar"}
              dir={isArabic ? "ltr" : "rtl"}
            >
              {isArabic ? "Technology that leaves an impact." : "تقنية تترك أثرًا."}
            </p>
          </div>

          <nav aria-label={t.footer.navLabel} className="lg:col-span-2">
            <h2 className="text-micro font-bold uppercase text-ink-faint">
              {t.footer.navLabel}
            </h2>
            <ul className="mt-5 space-y-3">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-semibold text-ink-soft transition-colors duration-300 hover:text-cobalt"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="text-micro font-bold uppercase text-ink-faint">
              {t.footer.socialLabel}
            </h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 text-base font-semibold text-ink-soft transition-colors duration-300 hover:text-cobalt"
                  >
                    {social.label}
                    <Arrow className="size-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-micro font-bold uppercase text-ink-faint">
              {t.footer.contactLabel}
            </h2>
            <ul className="mt-5 space-y-3 text-base text-ink-soft">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  dir="ltr"
                  className="inline-block font-semibold transition-colors duration-300 hover:text-cobalt"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  dir="ltr"
                  className="inline-block transition-colors duration-300 hover:text-cobalt"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="text-ink-faint">{siteConfig.location[locale]}</li>
            </ul>
          </div>
        </div>

        {/* Oversized signature, sized to fill the measure exactly. */}
        <div aria-hidden className="mt-16 select-none lg:mt-24">
          <span
            className={cn(
              "font-display block whitespace-nowrap leading-[0.8] text-ink/12",
              isArabic
                ? "text-[clamp(3.5rem,21vw,20rem)]"
                : "text-[clamp(3rem,18vw,16.5rem)] uppercase",
            )}
          >
            {isArabic ? siteConfig.nameAr : siteConfig.name}
          </span>
        </div>

        <div className="flex flex-col gap-4 border-t-2 border-ink/15 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {isArabic ? siteConfig.nameAr : siteConfig.name}.{" "}
            {t.footer.rights}
          </p>
          <BackToTop label={t.footer.backToTop} />
        </div>
      </Container>
    </footer>
  );
}
