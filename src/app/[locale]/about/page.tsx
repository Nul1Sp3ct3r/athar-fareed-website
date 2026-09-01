import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CtaSection";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { pad } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return buildMetadata({
    locale,
    path: "/about",
    title: t.pages.about.title,
    description: t.pages.about.lead,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.pages.about.eyebrow}
        title={t.pages.about.heading}
        lead={t.pages.about.lead}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal y={14} duration={0.6}>
                <Eyebrow>{t.about.eyebrow}</Eyebrow>
              </Reveal>
              <h2 className="mt-5 text-title font-semibold text-ink lg:mt-7">
                <TextReveal text={t.about.heading} />
              </h2>
            </div>

            <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
              <p className="text-lead text-ink">{t.about.body}</p>
              <p className="mt-5 text-base text-ink-soft">{t.about.secondary}</p>
              <p className="mt-8 border-t border-ink/15 pt-5 text-sm text-ink-faint">
                {t.pages.about.statsNote}
              </p>
            </Reveal>
          </div>

          <div className="mt-20 lg:mt-28">
            <Reveal y={14} duration={0.6}>
              <h2 className="text-micro font-medium uppercase text-ink-faint">
                {t.pages.about.manifestoLabel}
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-3 sm:gap-4 lg:mt-12 lg:grid-cols-3">
              {t.pages.about.manifesto.map((entry, index) => (
                <Reveal key={entry.title} delay={index * 0.08}>
                  <article className="border-2 border-ink bg-paper-raised h-full rounded-card p-6 sm:p-8">
                    <span className="index-label text-micro text-cobalt">
                      {pad(index + 1)}
                    </span>
                    <h3 className="mt-8 text-subtitle font-semibold text-ink">
                      {entry.title}
                    </h3>
                    <p className="mt-3 text-sm text-ink-soft sm:text-base">{entry.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-20 lg:mt-28">
            <Reveal y={14} duration={0.6}>
              <h2 className="text-micro font-medium uppercase text-ink-faint">
                {t.about.pillarsLabel}
              </h2>
            </Reveal>

            <ul className="mt-8 grid gap-x-10 border-t border-ink/15 lg:mt-10 lg:grid-cols-2">
              {t.about.pillars.map((pillar, index) => (
                <Reveal key={pillar.title} delay={Math.min(index, 4) * 0.05} y={16}>
                  <li className="flex gap-5 border-b border-ink/15 py-6">
                    <span className="index-label pt-1.5 text-micro text-cobalt">
                      {pad(index + 1)}
                    </span>
                    <div>
                      <h3 className="text-subtitle font-semibold text-ink">{pillar.title}</h3>
                      <p className="mt-2 max-w-md text-sm text-ink-soft sm:text-base">
                        {pillar.text}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <WhyUs locale={locale} />
      <Process locale={locale} />
      <CtaSection locale={locale} />
    </>
  );
}
