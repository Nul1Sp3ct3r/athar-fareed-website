import Link from "next/link";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * Text wordmark plus a three-dot "trace" mark — a literal read on أثر, now
 * carrying three palette colours so the brand mark is itself colourful.
 */
export function Wordmark({
  locale,
  className,
  size = "sm",
  asLink = true,
}: {
  locale: Locale;
  className?: string;
  size?: "sm" | "lg";
  asLink?: boolean;
}) {
  const isArabic = locale === "ar";

  const inner = (
    <>
      <span aria-hidden className="flex items-center gap-[3px] pb-px rtl:flex-row-reverse">
        <span className="size-[5px] rounded-full bg-lilac transition-transform duration-500 group-hover:-translate-y-0.5" />
        <span className="size-[6px] rounded-full bg-coral transition-transform duration-500 group-hover:translate-y-0.5" />
        <span className="size-[8px] rounded-full bg-cobalt" />
      </span>
      <span
        className={cn(
          "whitespace-nowrap leading-none",
          isArabic
            ? size === "lg"
              ? "font-display text-3xl"
              : "font-display text-xl"
            : size === "lg"
              ? "font-display text-2xl uppercase tracking-[0.02em]"
              : "font-display text-lg uppercase tracking-[0.02em]",
        )}
      >
        {isArabic ? siteConfig.nameAr : siteConfig.name}
      </span>
    </>
  );

  const classes = cn("group inline-flex items-center gap-2.5 text-ink", className);

  if (!asLink) return <span className={classes}>{inner}</span>;

  return (
    <Link href={localePath(locale)} className={classes} aria-label={siteConfig.name}>
      {inner}
    </Link>
  );
}
