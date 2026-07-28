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

  const location = str(body.location);
  const concern_type = str(body.concern_type);
  const description = str(body.description);

  if (!location || !concern_type || !description) {
    return NextResponse.json(
      { ok: false, error: "Location, concern type, and description are required." },
      { status: 400 }
    );
  }

  const email = str(body.email);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const record = {
    location,
    direction: str(body.direction) || null,
    concern_type,
    observed_at: str(body.observed_at) || null,
    repeats: str(body.repeats) || null,
    travel_mode: str(body.travel_mode) || null,
    description,
    media_url: str(body.media_url) || null,
    reported_to_agency: str(body.reported_to_agency) || null,
    agency_case_number: str(body.agency_case_number) || null,
    reporter_name: str(body.name) || null,
    reporter_email: email || null,
    permission_contact: body.permission_contact === true,
    permission_media: body.permission_media === true,
    public_display: str(body.public_display) || null,
    status: "new",
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("danger_reports").insert(record);
    if (error) {
      console.error("[safe441] report insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "We couldn't save your report. Please try again." },
        { status: 500 }
      );
    }
  }

  await sendSubmissionEmails({
    kind: "report",
    toEmail: email || null,
    toName: record.reporter_name,
    summaryRows: [
      ["Location", location],
      ["Direction", record.direction || ""],
      ["Concern", concern_type],
      ["Observed", record.observed_at || ""],
      ["Repeats?", record.repeats || ""],
      ["Travel mode", record.travel_mode || ""],
      ["Description", description],
      ["Media", record.media_url || ""],
      ["Reported to agency?", record.reported_to_agency || ""],
      ["Case number", record.agency_case_number || ""],
      ["Reporter", record.reporter_name || ""],
      ["Reporter email", record.reporter_email || ""],
      ["May contact", record.permission_contact ? "Yes" : "No"],
      ["May use media", record.permission_media ? "Yes" : "No"],
      ["Public display", record.public_display || ""],
    ],
  });

  return NextResponse.json({ ok: true });
}
