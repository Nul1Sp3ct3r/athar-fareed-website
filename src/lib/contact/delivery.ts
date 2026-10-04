import type { Inquiry } from "@/lib/contact/schema";

/**
 * A destination for an inquiry. Add CRM, WhatsApp or other transports here —
 * the endpoint never needs to change.
 */
export interface InquiryTransport {
  name: string;
  send(inquiry: Inquiry): Promise<void>;
}

/**
 * Arsel transactional email API.
 * Docs: https://docs.arsel.sa/api/email/send-email
 */
const ARSEL_SEND_URL = "https://api.arsel.sa/v1/email/send";

export interface ArselConfig {
  /** Secret `be_…` API key. */
  apiKey?: string;
  /** Bare sender address on a domain verified in Arsel, e.g. `noreply@your-domain`. */
  from?: string;
  /** Display name shown with the sender address (required by Arsel). */
  fromName?: string;
  /** Inbox that receives inquiries. Comma-separate for several. */
  to?: string;
}

/** Collapses line breaks so user input cannot reshape the subject line. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Emails the inquiry through Arsel's HTTP API (no SDK). */
export function arselTransport(config: ArselConfig): InquiryTransport {
  return {
    name: "arsel",
    async send(inquiry) {
      const { apiKey, from, fromName, to } = config;
      if (!apiKey || !from || !fromName || !to) {
        throw new Error(
          "Arsel is not configured (ARSEL_API_KEY, CONTACT_FROM_EMAIL, CONTACT_FROM_NAME, CONTACT_TO_EMAIL)",
        );
      }

      const text = [
        `Name: ${inquiry.name}`,
        `Company: ${inquiry.company || "-"}`,
        `Email: ${inquiry.email}`,
        `Phone: ${inquiry.phone || "-"}`,
        `Project type: ${inquiry.projectType}`,
        `Locale: ${inquiry.locale}`,
        "",
        inquiry.details,
      ].join("\n");

      const response = await fetch(ARSEL_SEND_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          from_name: fromName,
          to: to.split(",").map((address) => address.trim()).filter(Boolean),
          reply_to: inquiry.email,
          subject: oneLine(`New inquiry: ${inquiry.name} — ${inquiry.projectType}`),
          text,
          category: "contact-form",
        }),
      });

      // 202 Accepted means queued. Errors use { status_code, name, message }.
      if (!response.ok) {
        const error = (await response.json().catch(() => null)) as
          | { name?: string; message?: string }
          | null;
        throw new Error(
          `Arsel responded ${response.status} ${error?.name ?? ""}: ${error?.message ?? ""}`.trim(),
        );
      }
    },
  };
}

export interface DeliveryResult {
  delivered: string[];
  failed: string[];
}

/** Fans the inquiry out to every transport; one failure never blocks another. */
export async function deliverInquiry(
  inquiry: Inquiry,
  transports: InquiryTransport[],
): Promise<DeliveryResult> {
  const results = await Promise.allSettled(
    transports.map((transport) => transport.send(inquiry)),
  );

  const delivered: string[] = [];
  const failed: string[] = [];

  results.forEach((result, index) => {
    const name = transports[index].name;
    if (result.status === "fulfilled") {
      delivered.push(name);
    } else {
      failed.push(name);
      console.error(`[inquiry] transport "${name}" failed`, result.reason);
    }
  });

  return { delivered, failed };
}
