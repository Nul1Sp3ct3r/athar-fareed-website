import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { projects } from "@/data/projects";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/**
 * Deliberately uneven placement — each project gets its own slot, with the
 * title scaled to the slot so a narrower card does not shout louder than a
 * wide one.
 */
export const WORK_SLOTS = [
  { wrap: "lg:col-span-7", media: "aspect-[5/6] sm:aspect-[4/3]", title: "text-title" },
  {
    wrap: "lg:col-span-5 lg:col-start-8 lg:mt-32",
    media: "aspect-[5/6] sm:aspect-[4/3]",
    title: "text-[clamp(2.05rem,2.6vw,2.4rem)] tracking-[-0.03em]",
  },
  { wrap: "lg:col-span-8 lg:col-start-3", media: "aspect-[5/6] sm:aspect-[16/10]", title: "text-title" },
];

export function SelectedWork({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <Section id="work" size="lg">
      <Container>
        <SectionHeading
          eyebrow={t.work.eyebrow}
          eyebrowTone="bg-lilac"
          title={t.work.heading}
          lead={t.work.lead}
          action={
            <ButtonLink href={localePath(locale, "/work")} variant="secondary" withArrow>
              {t.work.all}
            </ButtonLink>
          }
        />

        <div className="mt-14 grid gap-20 sm:gap-24 lg:mt-24 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-36">
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
  );
}
