import { NextResponse } from "next/server";
import { deliverInquiry } from "@/lib/contact/delivery";
import { parseInquiry } from "@/lib/contact/schema";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { data, errors, valid } = parseInquiry(payload);
  if (!valid) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const result = await deliverInquiry(data);
  if (result.delivered.length === 0) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
