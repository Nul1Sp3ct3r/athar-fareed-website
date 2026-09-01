import type { Localized } from "@/lib/i18n";

/**
 * Social proof. Deliberately empty: nothing here is invented, and the
 * section renders nothing until real, approved material is added.
 *
 * To publish, add entries below — the component handles the rest.
 */
export interface Testimonial {
  id: string;
  quote: Localized;
  author: string;
  role: Localized;
}

export interface Partner {
  id: string;
  name: string;
  /** Path under /public once a real asset is supplied. */
  logo?: string;
}

export const testimonials: Testimonial[] = [];
export const partners: Partner[] = [];

export const hasProof = testimonials.length > 0 || partners.length > 0;
