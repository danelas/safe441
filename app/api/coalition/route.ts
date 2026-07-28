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

  const full_name = str(body.full_name);
  const email = str(body.email);

  if (!full_name || !email) {
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

  const participation = Array.isArray(body.participation)
    ? (body.participation as unknown[]).map((x) => str(x)).filter(Boolean)
    : [];

  const record = {
    full_name,
    email,
    phone: str(body.phone) || null,
    city: str(body.city) || null,
    organization: str(body.organization) || null,
    connection: str(body.connection) || null,
    participation,
    skills: str(body.skills) || null,
    availability: str(body.availability) || null,
    message: str(body.message) || null,
    permission_contact: body.permission_contact === true,
    permission_public: body.permission_public === true,
    status: "new",
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("coalition_members").insert(record);
    if (error) {
      console.error("[safe441] coalition insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "We couldn't save your submission. Please try again." },
        { status: 500 }
      );
    }
  }

  await sendSubmissionEmails({
    kind: "coalition",
    toEmail: email,
    toName: full_name,
    summaryRows: [
      ["Name", full_name],
      ["Email", email],
      ["Phone", record.phone || ""],
      ["City", record.city || ""],
      ["Organization", record.organization || ""],
      ["Connection to 441", record.connection || ""],
      ["Participation", participation.join(", ")],
      ["Skills", record.skills || ""],
      ["Availability", record.availability || ""],
      ["Message", record.message || ""],
      ["May contact", record.permission_contact ? "Yes" : "No"],
      ["May list publicly", record.permission_public ? "Yes" : "No"],
    ],
  });

  return NextResponse.json({ ok: true });
}
