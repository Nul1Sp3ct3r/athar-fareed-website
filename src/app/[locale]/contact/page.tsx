import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Doodle } from "@/components/illustration/Doodle";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

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
    path: "/contact",
    title: t.pages.contact.title,
    description: t.pages.contact.lead,
  });
}

export default async function ContactPage({
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
        eyebrow={t.pages.contact.eyebrow}
        title={t.pages.contact.heading}
        lead={t.pages.contact.lead}
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
              <div className="sticky top-32 overflow-hidden rounded-card-lg border-2 border-ink bg-paper-raised p-6 sm:p-8">
                <Doodle
                  name="cursor"
                  tone="fill-acid"
                  className="pointer-events-none absolute -end-6 -top-4 w-28 rotate-12 opacity-70"
                />
                <h2 className="relative text-micro font-bold uppercase text-ink-faint">
                  {t.pages.contact.detailsLabel}
                </h2>

                <ul className="mt-6 space-y-5">
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      dir="ltr"
                      className="inline-block text-subtitle font-medium text-ink transition-colors duration-300 hover:text-cobalt"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${siteConfig.phoneInternational}`}
                      dir="ltr"
                      className="inline-block text-base text-ink-soft transition-colors duration-300 hover:text-ink"
                    >
                      {siteConfig.phone}
                    </a>
                  </li>
                  <li className="text-base text-ink-soft">{siteConfig.location[locale]}</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
