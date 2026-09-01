import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

export interface NavItem {
  href: string;
  label: string;
}

/** One definition of the primary nav, shared by header, mobile menu and footer. */
export function getNavItems(locale: Locale, t: Dictionary): NavItem[] {
  return [
    { href: localePath(locale, "/work"), label: t.nav.work },
    { href: localePath(locale, "/services"), label: t.nav.services },
    { href: localePath(locale, "/about"), label: t.nav.about },
    { href: localePath(locale, "/contact"), label: t.nav.contact },
  ];
}
