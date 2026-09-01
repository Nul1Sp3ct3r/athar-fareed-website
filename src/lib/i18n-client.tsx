"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

interface I18nValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  t: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

/**
 * The dictionary is resolved on the server and handed down once, so no
 * client bundle ever ships both languages.
 */
export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      isRtl: locale === "ar",
      t: dictionary,
    }),
    [locale, dictionary],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside <I18nProvider>");
  }
  return context;
}
