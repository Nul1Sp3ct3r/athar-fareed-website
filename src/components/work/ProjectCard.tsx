import Link from "next/link";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { Arrow } from "@/components/ui/Arrow";
import type { Project } from "@/data/projects";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/**
 * The single project presentation used by the homepage, the work index and
 * the "next project" footer of a case study.
 */
export function ProjectCard({
  project,
  index,
  locale,
  mediaClassName,
  titleClassName,
  className,
}: {
  project: Project;
  index: number;
  locale: Locale;
  mediaClassName?: string;
  titleClassName?: string;
  className?: string;
}) {
  const t = getDictionary(locale);

  return (
    <article className={cn("group", className)}>
      <Link
        href={localePath(locale, `/work/${project.slug}`)}
        data-cursor={t.work.view}
        aria-label={`${project.title[locale]} — ${t.work.viewCase}`}
        className="block lg:cursor-none"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-card-lg border-2 border-ink",
            "transition-transform duration-500 ease-spring group-hover:-translate-y-2 group-hover:rotate-[-0.6deg]",
            project.tone,
            mediaClassName ?? "aspect-[4/3]",
          )}
        >
          <div aria-hidden className="dot-grid absolute inset-0 opacity-25" />

          <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.02]">
            <ProjectVisual visual={project.visual} accent={project.accent} />
          </div>

          <span
            aria-hidden
            className={cn(
              "absolute end-4 top-4 flex size-12 items-center justify-center rounded-full border-2 border-ink bg-paper-raised text-ink",
              "translate-y-2 opacity-0 transition-all duration-400 ease-spring",
              "group-hover:translate-y-0 group-hover:opacity-100",
            )}
          >
            <Arrow className="size-4" />
          </span>
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-6 text-micro font-bold uppercase">
          <span className="flex items-center gap-3 truncate">
            <span className="index-label text-cobalt">{pad(index + 1)}</span>
            <span className="text-ink-soft">{project.category[locale]}</span>
          </span>
          <span className="index-label shrink-0 text-ink-faint">{project.year}</span>
        </div>

        <h3 className={cn("font-display mt-3 text-ink", titleClassName ?? "text-title")}>
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_3px] bg-[position:0_100%] bg-no-repeat transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_3px] rtl:bg-[position:100%_100%]">
            {project.title[locale]}
          </span>
        </h3>

        <p className="mt-3 max-w-md text-base text-ink-soft">{project.excerpt[locale]}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags[locale].map((tag) => (
            <li
              key={tag}
              className="rounded-full border-2 border-ink/20 px-3 py-1 text-xs font-semibold text-ink-soft transition-colors duration-400 group-hover:border-ink group-hover:text-ink"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}
