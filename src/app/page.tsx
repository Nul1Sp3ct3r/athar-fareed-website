import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { defaultLocale, locales, localePath } from "@/lib/i18n";

/**
 * Real route for `/`, which otherwise has no page because every screen lives
 * under `/[locale]`.
 *
 * The site is a static export, so there is no server to read Accept-Language.
 * Instead this prerenders a tiny document that picks the locale in the
 * browser from `navigator.languages` (the same preference list the header
 * carries) and falls back to the default locale via meta refresh when
 * scripts are off.
 */
export const metadata: Metadata = {
  title: siteConfig.name,
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${siteConfig.url}${localePath(defaultLocale)}`,
  },
};

const fallback = localePath(defaultLocale);

// Static, locally-authored values only — no user input reaches this string.
const detectLocale = `(function(){var s=${JSON.stringify(locales)},d=${JSON.stringify(defaultLocale)},l=navigator.languages||[navigator.language||""];for(var i=0;i<l.length;i++){var b=String(l[i]).toLowerCase().split("-")[0];if(s.indexOf(b)>-1){d=b;break}}location.replace("/"+d)})();`;

export default function RootPage() {
  return (
    <html lang={defaultLocale}>
      <head>
        <noscript>
          <meta httpEquiv="refresh" content={`0;url=${fallback}`} />
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: detectLocale }} />
      </head>
      <body>
        <a href={fallback}>{siteConfig.name}</a>
      </body>
    </html>
  );
}
