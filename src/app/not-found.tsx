import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import { defaultLocale, getDictionary, localePath } from "@/lib/i18n";

/** Root-level 404 — owns its own document because the root layout does not. */
export default function NotFound() {
  const t = getDictionary(defaultLocale);

  return (
    <html lang={defaultLocale} dir="ltr" className={fontVariables}>
      <body className="flex min-h-dvh items-center justify-center bg-paper px-6 text-ink antialiased">
        <div className="text-center">
          <p className="index-label text-micro font-bold uppercase text-cobalt">404</p>
          <h1 className="font-display mt-6 text-display">{t.pages.notFound.heading}</h1>
          <p className="mt-5 text-base text-ink-soft">{t.pages.notFound.lead}</p>
          <Link
            href={localePath(defaultLocale)}
            className="mt-10 inline-flex rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper"
          >
            {t.pages.notFound.cta}
          </Link>
        </div>
      </body>
    </html>
  );
}
