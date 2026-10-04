import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { getDictionary, locales } from "@/lib/i18n";

export const alt = `${siteConfig.name} — Technology & Digital Solutions`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const LOGO = siteConfig.logo;
const ART = siteConfig.logo.art;
const LOGO_WIDTH = 440;

/**
 * Share card. The copy is deliberately Latin-only: the default OG font has no
 * Arabic coverage, so Arabic text would render as tofu. The official logo is
 * embedded as an image, so its Arabic line is unaffected.
 */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", LOGO.file));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const scale = LOGO_WIDTH / ART.width;

  // English copy for both locales — see the note above.
  const dictionary = getDictionary("en");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(900px 520px at 82% 6%, rgba(189,166,255,0.45), transparent 60%), #f6f3ec",
          color: "#17161a",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            overflow: "hidden",
            width: LOGO_WIDTH,
            height: Math.round(ART.height * scale),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by ImageResponse, not the browser */}
          <img
            src={logoSrc}
            alt={siteConfig.name}
            width={Math.round(LOGO.width * scale)}
            height={Math.round(LOGO.height * scale)}
            style={{
              position: "absolute",
              left: Math.round(-ART.x * scale),
              top: Math.round(-ART.y * scale),
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 92, lineHeight: 1.02, fontWeight: 700, letterSpacing: -3 }}>
            Technology that
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div style={{ width: 130, height: 10, borderRadius: 6, background: "#ff6a4d" }} />
            <div style={{ fontSize: 92, lineHeight: 1.02, fontWeight: 700, letterSpacing: -3, color: "#2f52f0" }}>
              leaves an impact.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#4a4750",
            borderTop: "2px solid rgba(23,22,26,0.18)",
            paddingTop: 28,
          }}
        >
          <div>{dictionary.pages.services.capabilities.slice(0, 4).join("  ·  ")}</div>
          <div>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    size,
  );
}
