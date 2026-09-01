import { cn } from "@/lib/utils";

/**
 * Direction-aware arrow. Mirrors itself in RTL so "forward" always
 * points the way the language reads.
 */
export function Arrow({
  className,
  variant = "up-right",
}: {
  className?: string;
  variant?: "up-right" | "right";
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("size-4 shrink-0 rtl:-scale-x-100", className)}
    >
      {variant === "up-right" ? (
        <path
          d="M4.5 11.5 11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M2.5 8h11M9.5 4 13.5 8l-4 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
