/**
 * Cloudflare Worker for the static site.
 *
 * Everything in `out/` (the Next.js static export) is served by the assets
 * binding. `wrangler.jsonc` routes only `/api/*` through this script, and the
 * one endpoint it handles is `POST /api/contact` — the contract the contact
 * form already uses.
 */
import { arselTransport, deliverInquiry } from "../src/lib/contact/delivery";
import { isHoneypotFilled, parseInquiry } from "../src/lib/contact/schema";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  /** Secret `be_…` Arsel API key. */
  ARSEL_API_KEY?: string;
  /** Bare sender address on a domain verified in Arsel. */
  CONTACT_FROM_EMAIL?: string;
  /** Sender display name. */
  CONTACT_FROM_NAME?: string;
  /** Inbox that receives inquiries. Comma-separate for several. */
  CONTACT_TO_EMAIL?: string;
}

function json(body: unknown, status = 200, headers?: HeadersInit): Response {
  return Response.json(body, { status, headers });
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Answer bots exactly like a success so they learn nothing, but send nothing.
  if (isHoneypotFilled(payload)) {
    return json({ ok: true });
  }

  const { data, errors, valid } = parseInquiry(payload);
  if (!valid) {
    return json({ ok: false, errors }, 422);
  }

  const result = await deliverInquiry(data, [
    arselTransport({
      apiKey: env.ARSEL_API_KEY,
      from: env.CONTACT_FROM_EMAIL,
      fromName: env.CONTACT_FROM_NAME,
      to: env.CONTACT_TO_EMAIL,
    }),
  ]);
  if (result.delivered.length === 0) {
    return json({ ok: false, error: "delivery_failed" }, 502);
  }

  return json({ ok: true });
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/contact") {
      if (request.method !== "POST") {
        return json({ ok: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
      }
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
