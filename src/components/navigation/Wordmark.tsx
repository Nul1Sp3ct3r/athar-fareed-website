import Image from "next/image";
import Link from "next/link";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * The official bilingual logo, shown as-is for both locales.
 *
 * The file has generous transparent padding around the artwork, so it is
 * framed to the artwork's bounds instead of shrunk along with its padding.
 * The image keeps its intrinsic aspect ratio; the frame only hides padding.
 */
const LOGO = { src: "/brand/unique-impact-logo.png", width: 2172, height: 724 };
/** Artwork bounds inside the file, measured from its alpha channel. */
const ART = { x: 274, y: 164, width: 1642, height: 409 };

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
        size === "lg" ? "h-12 sm:h-14" : "h-9 lg:h-11",
      )}
      style={{ aspectRatio: `${ART.width} / ${ART.height}` }}
    >
      <Image
        src={LOGO.src}
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
