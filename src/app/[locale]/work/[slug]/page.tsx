import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { CtaSection } from "@/components/sections/CtaSection";
import { Arrow } from "@/components/ui/Arrow";
import { Container } from "@/components/ui/Container";
import { CaseBlock } from "@/components/work/CaseBlock";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { getNextProject, getProject, projects } from "@/data/projects";
import { getDictionary, isLocale, localePath, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { cn, pad } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};

  return buildMetadata({
    locale,
    path: `/work/${project.slug}`,
    title: project.title[locale],
    description: project.overview[locale],
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  const t = getDictionary(locale);
  const next = getNextProject(project.slug);
  const index = projects.findIndex((entry) => entry.slug === project.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="rule-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_70%_at_50%_0%,black,transparent)]" />
          <div className="absolute -end-[8%] -top-[24%] size-[32rem] rounded-full bg-sun/25 blur-3xl" />
        </div>

        <Container className="relative pb-12 pt-32 sm:pt-40 lg:pt-52">
          <Reveal y={12} duration={0.6}>
            <Link
              href={localePath(locale, "/work")}
              className="group inline-flex items-center gap-2 text-micro uppercase text-ink-faint transition-colors duration-300 hover:text-ink"
            >
              <Arrow
                variant="right"
                className="size-3.5 rotate-180 transition-transform duration-500 ease-out-expo group-hover:-translate-x-0.5"
              />
              {t.caseStudy.backToWork}
            </Link>
          </Reveal>

          <div className="mt-8 flex items-center gap-3 text-micro uppercase text-ink-faint lg:mt-10">
            <span className="index-label text-cobalt">{pad(index + 1)}</span>
            <span aria-hidden className="h-px w-6 bg-ink/25" />
            <span>{project.category[locale]}</span>
          </div>

          <h1 className="font-display mt-5 text-display text-ink lg:mt-7">
            <TextReveal text={project.title[locale]} animateOnMount delay={0.1} />
          </h1>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lead text-ink-soft">
              {project.excerpt[locale]}
            </p>
          </Reveal>
        </Container>

        <Container className="relative">
          <Reveal delay={0.24}>
            <div
              className={cn(
                "relative aspect-[5/6] overflow-hidden rounded-card-lg border-2 border-ink sm:aspect-[16/9]",
                project.tone,
              )}
            >
              <div aria-hidden className="dot-grid absolute inset-0 opacity-25" />
              <Parallax distance={22} className="absolute inset-0">
                <ProjectVisual visual={project.visual} accent={project.accent} />
              </Parallax>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="pt-16 lg:pt-24">
        <dl className="grid gap-6 border-t border-ink/15 py-8 sm:grid-cols-3 lg:py-10">
          <div>
            <dt className="text-micro font-medium uppercase text-ink-faint">
              {t.caseStudy.client}
            </dt>
            <dd className="mt-2 text-base text-ink">{project.title[locale]}</dd>
          </div>
          <div>
            <dt className="text-micro font-medium uppercase text-ink-faint">
              {t.caseStudy.year}
            </dt>
            <dd className="index-label mt-2 text-base text-ink">{project.year}</dd>
          </div>
          <div>
            <dt className="text-micro font-medium uppercase text-ink-faint">
              {t.caseStudy.services}
            </dt>
            <dd className="mt-2 text-base text-ink">
              {project.tags[locale].join(" · ")}
            </dd>
          </div>
        </dl>

        <CaseBlock label={t.caseStudy.overview}>
          <p className="font-display text-subtitle leading-snug text-ink">
            {project.overview[locale]}
          </p>
        </CaseBlock>

        <CaseBlock label={t.caseStudy.challenge}>
          <p className="text-base text-ink-soft sm:text-lead">
            {project.challenge[locale]}
          </p>
        </CaseBlock>

        <CaseBlock label={t.caseStudy.solution}>
          <p className="text-base text-ink-soft sm:text-lead">
            {project.solution[locale]}
          </p>
        </CaseBlock>

        <CaseBlock label={t.caseStudy.technology}>
          <ul className="flex flex-wrap gap-2" dir="ltr">
            {project.technology.map((tech) => (
              <li
                key={tech}
                className="rounded-full border-2 border-ink/20 px-4 py-2 text-sm font-semibold text-ink-soft"
              >
                {tech}
              </li>
            ))}
          </ul>
        </CaseBlock>

        <CaseBlock label={t.caseStudy.features}>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {project.features.map((feature, featureIndex) => (
              <li key={feature.title.en} className="border-2 border-ink bg-paper-raised rounded-card p-6">
                <span className="index-label text-micro text-cobalt">
                  {pad(featureIndex + 1)}
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">
                  {feature.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{feature.text[locale]}</p>
              </li>
            ))}
          </ul>
        </CaseBlock>

        <CaseBlock label={t.caseStudy.screenshots}>
          <div className="grid gap-3 sm:gap-4">
            <div
              className={cn(
                "relative aspect-[16/10] overflow-hidden rounded-card border-2 border-ink",
                project.tone,
              )}
            >
              <ProjectVisual visual={project.visual} accent={project.accent} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {(["platform", "agent"] as const).map((variant) => (
                <div
                  key={variant}
                  className="relative aspect-[4/3] overflow-hidden rounded-card border-2 border-ink bg-paper-raised"
                >
                  <div aria-hidden className="dot-grid absolute inset-0 opacity-30" />
                  <ProjectVisual
                    visual={variant}
                    accent={project.accent}
                    className="px-4 pt-5 sm:px-6 sm:pt-7"
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-ink-faint">{t.work.placeholderNote}</p>
        </CaseBlock>

        <CaseBlock label={t.caseStudy.results}>
          {project.results.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {project.results.map((result) => (
                <li key={result.title.en} className="border-2 border-ink bg-paper-raised rounded-card p-6">
                  <h3 className="font-display text-subtitle text-ink">
                    {result.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{result.text[locale]}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-card border-2 border-dashed border-ink/30 p-6 text-sm text-ink-faint">
              {t.caseStudy.resultsPlaceholder}
            </p>
          )}
        </CaseBlock>
      </Container>

      <Container className="pb-8">
        <Reveal>
          <Link
            href={localePath(locale, `/work/${next.slug}`)}
            className="group block border-t border-ink/15 pt-10 lg:pt-14"
          >
            <span className="text-micro font-medium uppercase text-ink-faint">
              {t.caseStudy.next}
            </span>
            <div className="mt-5 flex items-center justify-between gap-6">
              <h2 className="font-display text-display text-ink transition-[padding] duration-500 ease-out-expo group-hover:ps-3">
                {next.title[locale]}
              </h2>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-paper lg:size-16">
                <Arrow className="size-5" />
              </span>
            </div>
          </Link>
        </Reveal>
      </Container>

      <CtaSection locale={locale} />
    </>
  );
}
