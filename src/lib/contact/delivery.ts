import type { Inquiry } from "@/lib/contact/schema";

/**
 * A destination for an inquiry. Add email, CRM, WhatsApp or database
 * transports here — the route never needs to change.
 */
export interface InquiryTransport {
  name: string;
  send(inquiry: Inquiry): Promise<void>;
}

/** Default transport: records the inquiry in server logs. */
const logTransport: InquiryTransport = {
  name: "log",
  async send(inquiry) {
    console.info("[inquiry]", {
      receivedAt: new Date().toISOString(),
      locale: inquiry.locale,
      name: inquiry.name,
      company: inquiry.company,
      email: inquiry.email,
      phone: inquiry.phone,
      projectType: inquiry.projectType,
      budget: inquiry.budget,
      details: inquiry.details,
    });
  },
};

/**
 * Register additional transports here, e.g.
 *   const transports = [logTransport, resendTransport, crmTransport];
 */
const transports: InquiryTransport[] = [logTransport];

export interface DeliveryResult {
  delivered: string[];
  failed: string[];
}

/** Fans the inquiry out to every transport; one failure never blocks another. */
export async function deliverInquiry(inquiry: Inquiry): Promise<DeliveryResult> {
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
