import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendSubmissionEmails } from "@/lib/email";

export const runtime = "nodejs";

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function arr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const contact = str(body.contact);
  const person_name = str(body.person_name);

  if (!contact || !person_name) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Please include a way to reach you and the name of the person you're remembering.",
      },
      { status: 400 }
    );
  }

  // The contact field accepts an email OR a phone number. Only send a
  // confirmation email when it looks like an email address.
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

  const record = {
    your_name: str(body.your_name) || null,
    contact,
    person_name,
    crash_date_location: str(body.crash_date_location) || null,
    relationship: str(body.relationship) || null,
    share: str(body.share) || null,
    safety_change: str(body.safety_change) || null,
    participation: arr(body.participation),
    permission_display_name: body.permission_display_name === true,
    permission_display_photos: body.permission_display_photos === true,
    permission_identify: body.permission_identify === true,
    status: "new",
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("memorial_stories").insert(record);
    if (error) {
      console.error("[safe441] memorial insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "We couldn't save your message. Please try again." },
        { status: 500 }
      );
    }
  }

  await sendSubmissionEmails({
    kind: "memorial",
    toEmail: looksLikeEmail ? contact : null,
    toName: record.your_name,
    summaryRows: [
      ["From", record.your_name || ""],
      ["Contact", contact],
      ["Person remembered", person_name],
      ["Crash date & location", record.crash_date_location || ""],
      ["Relationship", record.relationship || ""],
      ["What they shared", record.share || ""],
      ["Safety change wanted", record.safety_change || ""],
      ["How to take part", record.participation.join(", ")],
      ["May display their name", record.permission_display_name ? "Yes" : "No"],
      ["May display photographs", record.permission_display_photos ? "Yes" : "No"],
      [
        "May publicly identify the person",
        record.permission_identify ? "Yes" : "No",
      ],
    ],
  });

  return NextResponse.json({ ok: true });
}
