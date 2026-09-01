import { Underline } from "@/components/illustration/Marks";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { HeroCollage } from "@/components/sections/HeroCollage";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  // The closing word carries the drawn underline, so it is split out here
  // rather than duplicated as a separate dictionary key.
  const words = t.hero.titleLineTwo.split(" ");
  const lastWord = words.pop() ?? "";
  const leadWords = words.join(" ");

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="rule-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_70%_at_50%_25%,black,transparent)]" />
        <div className="absolute -start-24 top-10 size-[28rem] rounded-full bg-lilac/25 blur-3xl" />
        <div className="absolute -end-20 top-40 size-[24rem] rounded-full bg-sun/25 blur-3xl" />
      </div>

      <Container className="relative">
        <Reveal pattern="fade">
          <Eyebrow tone="bg-sun">{t.hero.eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="font-display mt-7 text-hero text-ink lg:mt-9">
          <span className="block">
            <TextReveal text={t.hero.titleLineOne} animateOnMount delay={0.1} />
          </span>
          <span className="block">
            {leadWords ? (
              <>
                <TextReveal text={leadWords} animateOnMount delay={0.2} />{" "}
              </>
            ) : null}
            <span className="relative inline-block text-cobalt">
              <TextReveal text={lastWord} animateOnMount delay={0.3} />
              <Underline className="text-coral" />
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal delay={0.35} className="lg:col-span-5">
            <p className="max-w-md text-lead text-ink-soft">{t.hero.lead}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton className="w-full sm:w-auto">
                <ButtonLink
                  href={localePath(locale, "/contact")}
                  size="lg"
                  withArrow
                  className="w-full sm:w-auto"
                >
                  {t.hero.primaryCta}
                </ButtonLink>
              </MagneticButton>

              <ButtonLink
                href={localePath(locale, "/work")}
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                {t.hero.secondaryCta}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:flex lg:justify-end">
            <HeroCollage />
          </div>
        </div>
      </Container>
    </section>
  );
}
