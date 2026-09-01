import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-only marquee — no JS, no layout reads, pauses under
 * prefers-reduced-motion (handled in globals.css).
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
  trackClassName,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
}) {
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)} aria-hidden>
      <div
        className={cn(
          "marquee-track flex w-max shrink-0 items-center",
          reverse && "[animation-direction:reverse]",
          trackClassName,
        )}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
