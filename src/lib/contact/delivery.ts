import type { Inquiry } from "@/lib/contact/schema";

/**
 * A destination for an inquiry. Add CRM, WhatsApp or other transports here —
 * the endpoint never needs to change.
 */
export interface InquiryTransport {
  name: string;
  send(inquiry: Inquiry): Promise<void>;
}

export interface ResendConfig {
  apiKey?: string;
  /** Verified sender, e.g. `Athar Fareed <contact@your-domain>`. */
  from?: string;
  /** Inbox that receives inquiries. Comma-separate for several. */
  to?: string;
}

/** Collapses line breaks so user input cannot reshape the subject line. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Emails the inquiry through Resend's HTTP API (no SDK). */
export function resendTransport(config: ResendConfig): InquiryTransport {
  return {
    name: "resend",
    async send(inquiry) {
      const { apiKey, from, to } = config;
      if (!apiKey || !from || !to) {
        throw new Error("Resend is not configured (RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL)");
      }

      const text = [
        `Name: ${inquiry.name}`,
        `Company: ${inquiry.company || "-"}`,
        `Email: ${inquiry.email}`,
        `Phone: ${inquiry.phone || "-"}`,
        `Project type: ${inquiry.projectType}`,
        `Budget: ${inquiry.budget || "-"}`,
        `Locale: ${inquiry.locale}`,
        "",
        inquiry.details,
      ].join("\n");

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: to.split(",").map((address) => address.trim()).filter(Boolean),
          reply_to: inquiry.email,
          subject: oneLine(`New inquiry: ${inquiry.name} — ${inquiry.projectType}`),
          text,
        }),
      });

      if (!response.ok) {
        throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
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
