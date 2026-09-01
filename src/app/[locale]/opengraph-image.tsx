import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { getDictionary, locales } from "@/lib/i18n";

export const alt = `${siteConfig.name} — Technology & Digital Solutions`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Share card. Deliberately Latin-only: the default OG font has no Arabic
 * coverage, so the Arabic wordmark would render as tofu.
 */
export default function OpengraphImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#bda6ff" }} />
            <div style={{ width: 13, height: 13, borderRadius: 13, background: "#ff6a4d" }} />
            <div style={{ width: 18, height: 18, borderRadius: 18, background: "#2f52f0" }} />
          </div>
          <div style={{ fontSize: 26, letterSpacing: 6, fontWeight: 700 }}>
            {siteConfig.name.toUpperCase()}
          </div>
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
