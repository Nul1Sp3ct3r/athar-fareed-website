import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

/**
 * Real route for `/`, which otherwise has no page because every screen lives
 * under `/[locale]`.
 *
 * This deliberately does not lean on `src/proxy.ts`: in Next 16 the proxy runs
 * on the Node runtime behind the CDN cache, so a host can answer `/` from the
 * edge before the proxy ever runs and return its own 404. A route always
 * exists, so `/` resolves wherever the app is deployed.
 */
export const dynamic = "force-dynamic";

export default async function RootPage() {
  const acceptLanguage = (await headers()).get("accept-language") ?? "";
  const prefersArabic = acceptLanguage.trim().toLowerCase().startsWith("ar");

  redirect(prefersArabic ? "/ar" : `/${defaultLocale}`);
}
