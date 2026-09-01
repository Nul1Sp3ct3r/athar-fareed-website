"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { swapLocaleInPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  label,
  ariaLabel,
  className,
  onNavigate,
}: {
  locale: Locale;
  label: string;
  ariaLabel: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const next: Locale = locale === "en" ? "ar" : "en";

  return (
    <Link
      href={swapLocaleInPath(pathname, next)}
      hrefLang={next}
      lang={next}
      aria-label={`${ariaLabel}: ${label}`}
      onClick={onNavigate}
      className={cn(
        "rounded-full border-2 border-ink px-3.5 py-2 text-xs font-semibold text-ink transition-colors duration-300 hover:bg-ink hover:text-paper",
        className,
      )}
    >
      {label}
    </Link>
  );
}
