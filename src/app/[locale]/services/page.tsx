import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CtaSection";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
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
    path: "/services",
    title: t.pages.services.title,
    description: t.pages.services.lead,
  });
}

export default async function ServicesPage({
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
        eyebrow={t.pages.services.eyebrow}
        title={t.pages.services.heading}
        lead={t.pages.services.lead}
      />

      <Services locale={locale} />

      <Section className="border-t border-ink/15">
        <Container>
          <Reveal y={14} duration={0.6}>
            <h2 className="text-micro font-medium uppercase text-ink-faint">
              {t.pages.services.listLabel}
            </h2>
          </Reveal>

          <ul className="mt-8 grid gap-x-8 border-t border-ink/15 sm:grid-cols-2 lg:mt-12">
            {t.pages.services.capabilities.map((capability, index) => (
              <Reveal key={capability} delay={Math.min(index, 5) * 0.04} y={16}>
                <li className="group flex items-baseline gap-5 border-b border-ink/15 py-5 transition-[padding] duration-500 ease-out-expo hover:ps-3 lg:py-6">
                  <span className="index-label text-micro text-ink-faint transition-colors duration-500 group-hover:text-cobalt">
                    {pad(index + 1)}
                  </span>
                  <span className="text-subtitle font-medium text-ink">{capability}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Process locale={locale} />
      <CtaSection locale={locale} />
    </>
  );
}
