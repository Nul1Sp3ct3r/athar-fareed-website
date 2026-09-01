import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

/**
 * Editorial two-column header: condensed display title on the reading edge,
 * supporting copy set against it.
 */
export function SectionHeading({
  eyebrow,
  eyebrowTone,
  title,
  lead,
  action,
  className,
  titleClassName,
}: {
  eyebrow: string;
  eyebrowTone?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6", className)}>
      <div className="lg:col-span-7">
        <Reveal pattern="fade">
          <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
        </Reveal>
        <h2
          className={cn(
            "font-display mt-6 text-display text-ink lg:mt-8",
            titleClassName,
          )}
        >
          <TextReveal text={title} />
        </h2>
      </div>

      {lead || action ? (
        <div className="lg:col-span-4 lg:col-start-9">
          {lead ? (
            <Reveal delay={0.1}>
              <p className="max-w-md text-base text-ink-soft sm:text-lead">{lead}</p>
            </Reveal>
          ) : null}
          {action ? (
            <Reveal delay={0.16}>
              <div className="mt-6">{action}</div>
            </Reveal>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
