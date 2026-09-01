import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Label-left / content-right editorial block used through a case study. */
export function CaseBlock({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "grid gap-5 border-t-2 border-ink/15 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16",
        className,
      )}
    >
      <h2 className="text-micro font-bold uppercase text-ink-faint lg:col-span-3">
        {label}
      </h2>
      <div className="lg:col-span-8 lg:col-start-5">
        <Reveal y={18}>{children}</Reveal>
      </div>
    </section>
  );
}
