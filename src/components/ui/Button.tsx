import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full border-2 font-semibold " +
  "transition-[background-color,border-color,color,transform] duration-300 ease-out-expo " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "border-ink bg-ink text-paper hover:bg-cobalt hover:border-cobalt",
  secondary: "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
  accent: "border-ink bg-acid text-ink hover:bg-sun",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm sm:px-6 sm:py-3",
  lg: "px-6 py-3.5 text-base sm:px-8 sm:py-4",
};

/** Label that swaps for a copy of itself on hover. */
function SlidingLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden whitespace-nowrap">
      <span className="block transition-transform duration-400 ease-out-expo group-hover/btn:-translate-y-[115%]">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-[115%] transition-transform duration-400 ease-out-expo group-hover/btn:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

function Inner({ withArrow, children }: { withArrow?: boolean; children: ReactNode }) {
  return (
    <>
      <SlidingLabel>{children}</SlidingLabel>
      {withArrow ? (
        <Arrow className="transition-transform duration-400 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      ) : null}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...props
}: CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children"> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <Inner withArrow={withArrow}>{children}</Inner>
    </Link>
  );
}
