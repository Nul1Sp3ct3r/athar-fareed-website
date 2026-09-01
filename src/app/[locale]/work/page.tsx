import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { WORK_SLOTS } from "@/components/sections/SelectedWork";
import { ProjectCard } from "@/components/work/ProjectCard";
import { projects } from "@/data/projects";
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
    path: "/work",
    title: t.pages.work.title,
    description: t.pages.work.lead,
  });
}

export default async function WorkPage({
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
        eyebrow={t.pages.work.eyebrow}
        title={t.pages.work.heading}
        lead={t.pages.work.lead}
      />

      <Section>
        <Container>
          <div className="grid gap-20 sm:gap-24 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-36">
            {projects.map((project, index) => {
              const slot = WORK_SLOTS[index % WORK_SLOTS.length];

              return (
                <Reveal key={project.slug} pattern="clip" className={slot.wrap}>
                  <ProjectCard
                    project={project}
                    index={index}
                    locale={locale}
                    mediaClassName={slot.media}
                    titleClassName={slot.title}
                  />
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
