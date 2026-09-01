import type { ReactNode } from "react";
import type { Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#f6f3ec",
  colorScheme: "light",
};

/**
 * The real <html>/<body> live in app/[locale]/layout.tsx, which is the only
 * place `lang` and `dir` are known. This root simply passes through.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
