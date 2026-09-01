import { cn } from "@/lib/utils";

/**
 * Hand-drawn marks used to annotate type — the same ink language as the
 * doodles, at a smaller scale.
 */

/** Wobbly underline that sits beneath a highlighted word. */
export function Underline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("af-underline absolute inset-x-0 h-[0.2em] w-full", className)}
    >
      <path
        d="M3 11c34-6 68-8 102-6 33 2 62 5 92 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Short directional arrow used between process steps. */
export function ArrowMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" aria-hidden className={cn("w-16", className)}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 17c14-9 30-11 54-9" />
        <path d="M44 2l14 6-12 9" />
      </g>
    </svg>
  );
}

/** Small radiating burst, used to punctuate a CTA. */
export function Burst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("w-10", className)}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      >
        <path d="M24 4v10M24 34v10M4 24h10M34 24h10M10 10l7 7M31 31l7 7M38 10l-7 7M17 31l-7 7" />
      </g>
    </svg>
  );
}
