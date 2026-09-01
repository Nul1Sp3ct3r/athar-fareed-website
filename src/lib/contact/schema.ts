/** Shape of a project inquiry, shared by the form and the API route. */
export interface Inquiry {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  details: string;
  /** Locale the inquiry was submitted from, for routing the reply. */
  locale: string;
}

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  projectType: 80,
  budget: 80,
  details: 4000,
} as const;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validates and normalises an inquiry. Runs on both sides — the client uses
 * it for inline errors, the route uses it as the trust boundary.
 */
export function parseInquiry(input: unknown): {
  data: Inquiry;
  errors: InquiryErrors;
  valid: boolean;
} {
  const raw = (input ?? {}) as Record<string, unknown>;

  const data: Inquiry = {
    name: text(raw.name).slice(0, MAX.name),
    company: text(raw.company).slice(0, MAX.company),
    email: text(raw.email).slice(0, MAX.email),
    phone: text(raw.phone).slice(0, MAX.phone),
    projectType: text(raw.projectType).slice(0, MAX.projectType),
    budget: text(raw.budget).slice(0, MAX.budget),
    details: text(raw.details).slice(0, MAX.details),
    locale: text(raw.locale) || "en",
  };

  const errors: InquiryErrors = {};
  if (!data.name) errors.name = "required";
  if (!data.email) errors.email = "required";
  else if (!EMAIL.test(data.email)) errors.email = "email";
  if (!data.projectType) errors.projectType = "required";
  if (!data.details) errors.details = "required";

  return { data, errors, valid: Object.keys(errors).length === 0 };
}
