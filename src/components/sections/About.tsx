import { Doodle } from "@/components/illustration/Doodle";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { AboutStickers } from "@/components/sections/AboutStickers";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/**
 * One large rounded surface rather than a two-column description.
 *
 * The upper half carries the statement, the paragraph and the CTA; the lower
 * half is left clear for the principles, which drop in from above the panel
 * and settle as a loose collage.
 */
export function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <Section id="about" size="lg">
      <Container>
        <Reveal pattern="scale">
          <div
            data-about-panel
            className="relative overflow-hidden rounded-blob border-2 border-ink bg-paper-raised px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
          >
            <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

            {/* Upper right only — the lower half belongs to the stickers. */}
            <Doodle
              name="loop"
              tone="fill-acid"
              className="pointer-events-none absolute end-8 top-10 hidden w-28 rotate-12 lg:block xl:w-36"
            />
            <Doodle
              name="nodes"
              tone="fill-lilac"
              className="pointer-events-none absolute end-40 top-40 hidden w-24 -rotate-6 lg:block xl:w-28"
            />

            <div className="relative">
              <Eyebrow tone="bg-cobalt" className="border-ink text-paper">
                {t.about.eyebrow}
              </Eyebrow>

              <h2 className="font-display relative mt-7 max-w-[15ch] text-display text-ink">
                <TextReveal text={t.about.heading} />
              </h2>

              <Reveal delay={0.12}>
                <p className="mt-7 max-w-xl text-lead text-ink-soft">{t.about.body}</p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9">
                  <ButtonLink href={localePath(locale, "/about")} withArrow>
                    {t.about.more}
                  </ButtonLink>
                </div>
              </Reveal>

              {/* The gap above is the runway the labels fall through. */}
              <div className="mt-20 sm:mt-24 lg:mt-28">
                <AboutStickers statements={t.about.stickers} locale={locale} />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
