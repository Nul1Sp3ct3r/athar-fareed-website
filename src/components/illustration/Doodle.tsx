import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The house illustration language.
 *
 * Every drawing shares one set of rules so the set reads as a family:
 *   • one 120×120 stage, so scale is consistent wherever a doodle lands
 *   • thick ink outlines, round caps and joins
 *   • flat fills only — no gradients, no shading
 *   • geometry rotated a degree or two off true, so nothing looks
 *     machine-drawn
 *
 * `tone` is the flat fill (a Tailwind fill-* class), which lets each
 * service or project drive its own colour through the same drawing.
 */
export type DoodleName =
  | "browser"
  | "phone"
  | "spark"
  | "shield"
  | "stack"
  | "cloud"
  | "terminal"
  | "database"
  | "nodes"
  | "loop"
  | "cursor";

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 5.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function shapes(name: DoodleName, tone: string): ReactNode {
  switch (name) {
    case "browser":
      return (
        <g transform="rotate(-2 60 60)">
          <rect x="10" y="20" width="100" height="80" rx="12" className={tone} />
          <rect x="10" y="20" width="100" height="80" rx="12" {...STROKE} />
          <path d="M11 42h98" {...STROKE} />
          <circle cx="25" cy="31" r="3.4" fill="currentColor" />
          <circle cx="37" cy="31" r="3.4" fill="currentColor" />
          <rect x="24" y="54" width="34" height="32" rx="7" {...STROKE} />
          <path d="M70 56h22M70 70h18M70 84h24" {...STROKE} />
        </g>
      );

    case "phone":
      return (
        <g transform="rotate(4 60 60)">
          <rect x="34" y="8" width="52" height="104" rx="14" className={tone} />
          <rect x="34" y="8" width="52" height="104" rx="14" {...STROKE} />
          <path d="M52 20h16" {...STROKE} />
          <rect x="46" y="36" width="28" height="26" rx="6" {...STROKE} />
          <path d="M46 76h28M46 88h18" {...STROKE} />
        </g>
      );

    case "spark":
      return (
        <g>
          <path
            d="M62 8c4 28 18 42 46 46-28 4-42 18-46 46-4-28-18-42-46-46 28-4 42-18 46-46Z"
            className={tone}
          />
          <path
            d="M62 8c4 28 18 42 46 46-28 4-42 18-46 46-4-28-18-42-46-46 28-4 42-18 46-46Z"
            {...STROKE}
          />
          <path d="M22 16c1.5 8 5 11 13 12-8 1.5-11.5 5-13 13-1.5-8-5-11.5-13-13 8-1 11.5-4.5 13-12Z" fill="currentColor" />
          <circle cx="100" cy="100" r="5" fill="currentColor" />
        </g>
      );

    case "shield":
      return (
        <g transform="rotate(-3 60 60)">
          <path d="M60 8 16 26v34c0 28 20 44 44 52 24-8 44-24 44-52V26L60 8Z" className={tone} />
          <path d="M60 8 16 26v34c0 28 20 44 44 52 24-8 44-24 44-52V26L60 8Z" {...STROKE} />
          <path d="M42 60l13 14 25-28" {...STROKE} />
        </g>
      );

    case "stack":
      return (
        <g>
          <rect x="14" y="60" width="86" height="30" rx="10" className={tone} transform="rotate(-5 57 75)" />
          <rect x="14" y="60" width="86" height="30" rx="10" {...STROKE} transform="rotate(-5 57 75)" />
          <rect x="22" y="34" width="86" height="30" rx="10" className={tone} transform="rotate(3 65 49)" />
          <rect x="22" y="34" width="86" height="30" rx="10" {...STROKE} transform="rotate(3 65 49)" />
          <rect x="16" y="8" width="86" height="30" rx="10" className={tone} transform="rotate(-2 59 23)" />
          <rect x="16" y="8" width="86" height="30" rx="10" {...STROKE} transform="rotate(-2 59 23)" />
        </g>
      );

    case "cloud":
      return (
        <g transform="rotate(2 60 60)">
          <path
            d="M36 92a22 22 0 0 1 2-43 30 30 0 0 1 57-4 21 21 0 0 1 1 47H36Z"
            className={tone}
          />
          <path
            d="M36 92a22 22 0 0 1 2-43 30 30 0 0 1 57-4 21 21 0 0 1 1 47H36Z"
            {...STROKE}
          />
          <path d="M46 106h8M64 106h10M84 106h6" {...STROKE} />
        </g>
      );

    case "terminal":
      return (
        <g transform="rotate(-1 60 60)">
          <rect x="10" y="22" width="100" height="76" rx="12" className={tone} />
          <rect x="10" y="22" width="100" height="76" rx="12" {...STROKE} />
          <path d="M30 46l14 12-14 12" {...STROKE} />
          <path d="M56 70h30" {...STROKE} />
        </g>
      );

    case "database":
      return (
        <g transform="rotate(2 60 60)">
          <path d="M22 28c0-9 17-16 38-16s38 7 38 16v64c0 9-17 16-38 16s-38-7-38-16V28Z" className={tone} />
          <ellipse cx="60" cy="28" rx="38" ry="16" {...STROKE} />
          <path d="M22 28v64c0 9 17 16 38 16s38-7 38-16V28" {...STROKE} />
          <path d="M22 60c0 9 17 16 38 16s38-7 38-16" {...STROKE} />
        </g>
      );

    case "nodes":
      return (
        <g>
          <path d="M60 34v26M60 60 30 88M60 60l30 28" {...STROKE} />
          <circle cx="60" cy="22" r="14" className={tone} />
          <circle cx="60" cy="22" r="14" {...STROKE} />
          <circle cx="26" cy="94" r="12" className={tone} />
          <circle cx="26" cy="94" r="12" {...STROKE} />
          <circle cx="94" cy="94" r="12" className={tone} />
          <circle cx="94" cy="94" r="12" {...STROKE} />
        </g>
      );

    case "loop":
      return (
        <g transform="rotate(-4 60 60)">
          <circle cx="60" cy="60" r="40" className={tone} />
          <path d="M100 60a40 40 0 1 1-16-32" {...STROKE} />
          <path d="M70 12l16 14-18 12" {...STROKE} />
          <path d="M52 46l18 14-18 14" {...STROKE} />
        </g>
      );

    case "cursor":
      return (
        <g transform="rotate(6 60 60)">
          <path d="M34 18l50 34-22 6-4 24-24-64Z" className={tone} />
          <path d="M34 18l50 34-22 6-4 24-24-64Z" {...STROKE} />
          <path d="M84 22l14-8M92 44l16-2M74 8l2-6" {...STROKE} />
        </g>
      );
  }
}

export function Doodle({
  name,
  tone = "fill-paper-raised",
  className,
}: {
  name: DoodleName;
  /** Flat fill for the drawing's solid areas, e.g. "fill-sun". */
  tone?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={cn("text-ink", className)}>
      {shapes(name, tone)}
    </svg>
  );
}
