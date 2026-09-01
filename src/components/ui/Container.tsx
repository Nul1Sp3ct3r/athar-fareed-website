import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page gutter + max width. Every section uses this so the rhythm stays exact. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[96rem] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
