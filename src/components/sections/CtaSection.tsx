import { ConvergeScene } from "@/components/illustration/ConvergeScene";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function CtaSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-acid py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

      <Container className="relative">
        <Reveal pattern="scale">
          <ConvergeScene />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl text-center lg:mt-14">
          <h2 className="font-display text-display text-ink">
            <TextReveal text={t.cta.heading} />
          </h2>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lead text-ink/75">{t.cta.lead}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-9 flex justify-center">
              <MagneticButton strength={0.3}>
                <ButtonLink
                  href={localePath(locale, "/contact")}
                  size="lg"
                  withArrow
                  className="px-8 py-4 text-base sm:px-10 sm:py-5 sm:text-lg"
                >
                  {t.cta.button}
                </ButtonLink>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-7 text-sm text-ink/70">
              {t.cta.or}{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                dir="ltr"
                className="inline-block font-semibold text-ink underline decoration-2 underline-offset-4 transition-colors duration-300 hover:text-cobalt"
              >
                {siteConfig.email}
              </a>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
