import { Anton, Manrope, Tajawal } from "next/font/google";

/**
 * Display face — condensed, heavy, poster-like. Used only for headlines and
 * numerals, never for running text.
 */
export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

/** Text face — clean modern grotesque for everything readable. */
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Arabic counterpart. Tajawal carries both roles: 800 stands in for the
 * condensed display weight, 400–500 for body.
 */
export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-arabic",
  display: "swap",
});

export const fontVariables = `${anton.variable} ${manrope.variable} ${tajawal.variable}`;
