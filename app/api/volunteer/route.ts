import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendSubmissionEmails } from "@/lib/email";

export const runtime = "nodejs";

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function strArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = str(body.name);
  const email = str(body.email);

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const record = {
    full_name: name,
    email,
    phone: str(body.phone) || null,
    city: str(body.city) || null,
    skills: strArray(body.skills),
    project_preferences: strArray(body.project_preferences),
    availability: str(body.availability) || null,
    languages: str(body.languages) || null,
    message: str(body.message) || null,
    permission_contact: body.permission_contact === true,
    status: "new",
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("volunteers").insert(record);
    if (error) {
      console.error("[fixbroward] volunteer insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "We couldn't save your sign-up. Please try again." },
        { status: 500 }
      );
    }
  }

  await sendSubmissionEmails({
    kind: "volunteer",
    toEmail: email,
    toName: name,
    summaryRows: [
      ["Name", name],
      ["Email", email],
      ["Phone", record.phone || ""],
      ["City", record.city || ""],
      ["Skills", record.skills.join(", ")],
      ["Projects", record.project_preferences.join(", ")],
      ["Availability", record.availability || ""],
      ["Languages", record.languages || ""],
      ["Message", record.message || ""],
      ["May contact", record.permission_contact ? "Yes" : "No"],
    ],
  });

  return NextResponse.json({ ok: true });
}
