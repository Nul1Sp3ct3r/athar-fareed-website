import Image from "next/image";
import Link from "next/link";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { logoUrl, siteConfig } from "@/config/site";

/**
 * The official bilingual logo, shown as-is for both locales.
 *
 * The file has generous transparent padding around the artwork, so it is
 * framed to the artwork's bounds instead of shrunk along with its padding.
 * The image keeps its intrinsic aspect ratio; the frame only hides padding.
 */
const LOGO = siteConfig.logo;
const ART = siteConfig.logo.art;

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
  const inner = (
    <span
      dir="ltr"
      className={cn(
        "relative block shrink-0 overflow-hidden",
        size === "lg" ? "h-11 sm:h-12" : "h-8 lg:h-9",
      )}
      style={{ aspectRatio: `${ART.width} / ${ART.height}` }}
    >
      <Image
        src={logoUrl}
        width={LOGO.width}
        height={LOGO.height}
        alt={siteConfig.name}
        preload={asLink && size === "sm"}
        className="absolute h-auto max-w-none"
        style={{
          width: `${(LOGO.width / ART.width) * 100}%`,
          left: `${(-ART.x / ART.width) * 100}%`,
          top: `${(-ART.y / ART.height) * 100}%`,
        }}
      />
    </span>
  );

  const classes = cn("inline-flex items-center", className);

  if (!asLink) return <span className={classes}>{inner}</span>;

  return (
    <Link href={localePath(locale)} className={classes}>
      {inner}
    </Link>
  );
}
