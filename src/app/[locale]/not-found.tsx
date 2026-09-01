import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary, defaultLocale, localePath } from "@/lib/i18n";

/**
 * Rendered inside the locale layout. The segment params are not available to
 * a not-found boundary, so this falls back to the default locale copy.
 */
export default function LocaleNotFound() {
  const t = getDictionary(defaultLocale);

  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden">
      <div aria-hidden className="rule-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />

      <Container className="relative py-32 text-center">
        <p className="index-label text-micro font-bold uppercase text-cobalt">404</p>
        <h1 className="font-display mx-auto mt-6 max-w-3xl text-display text-ink">
          {t.pages.notFound.heading}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-ink-soft sm:text-lead">
          {t.pages.notFound.lead}
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href={localePath(defaultLocale)} size="lg" withArrow>
            {t.pages.notFound.cta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
