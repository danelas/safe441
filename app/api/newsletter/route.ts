import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendSubmissionEmails } from "@/lib/email";

export const runtime = "nodejs";

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = str(body.email);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const interests = Array.isArray(body.interests)
    ? body.interests.filter((x): x is string => typeof x === "string")
    : [];

  const record = {
    email,
    city: str(body.city) || null,
    interests,
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert(record, { onConflict: "email" });
    if (error) {
      console.error("[fixbroward] newsletter upsert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "We couldn't save your subscription. Please try again." },
        { status: 500 }
      );
    }
  }

  await sendSubmissionEmails({
    kind: "newsletter",
    toEmail: email,
    toName: null,
    summaryRows: [
      ["Email", email],
      ["City", record.city || ""],
      ["Interests", interests.join(", ")],
    ],
  });

  return NextResponse.json({ ok: true });
}
