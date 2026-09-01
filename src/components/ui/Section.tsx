import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Vertical rhythm. Three sizes rather than one, so the page reads as a
 * composition with beats instead of a stack of equal blocks.
 */
type SectionSize = "sm" | "md" | "lg";

const sizes: Record<SectionSize, string> = {
  sm: "py-20 sm:py-24 lg:py-28",
  md: "py-24 sm:py-28 lg:py-36",
  lg: "py-28 sm:py-32 lg:py-48",
};

export function Section({
  id,
  size = "md",
  className,
  children,
}: {
  id?: string;
  size?: SectionSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative", sizes[size], className)}>
      {children}
    </section>
  );
}
