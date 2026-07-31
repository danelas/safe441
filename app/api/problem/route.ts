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

  const title = str(body.title);
  const category = str(body.category);
  const location = str(body.location);
  const city = str(body.city);
  const description = str(body.description);
  const why_it_matters = str(body.why_it_matters);
  const name = str(body.name);
  const email = str(body.email);

  if (!title || !category || !location || !city || !description || !why_it_matters || !name || !email) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (body.agree_terms !== true || body.truth_confirmation !== true) {
    return NextResponse.json(
      { ok: false, error: "Please confirm the terms and truthfulness checkboxes." },
      { status: 400 }
    );
  }

  const record = {
    title,
    category,
    location,
    city,
    zip_code: str(body.zip) || null,
    description,
    why_it_matters,
    first_noticed: str(body.first_noticed) || null,
    ongoing: str(body.ongoing) || null,
    prior_reported: str(body.prior_reported) || null,
    prior_agency: str(body.prior_agency) || null,
    case_number: str(body.case_number) || null,
    media_url: str(body.media_url) || null,
    submitter_name: name,
    submitter_email: email,
    submitter_phone: str(body.phone) || null,
    permission_contact: body.permission_contact === true,
    permission_publish_name: body.permission_publish_name === true,
    agree_terms: true,
    truth_confirmation: true,
    status: "new",
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("problem_reports").insert(record);
    if (error) {
      console.error("[fixbroward] problem insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "We couldn't save your report. Please try again." },
        { status: 500 }
      );
    }
  }

  await sendSubmissionEmails({
    kind: "problem",
    toEmail: email,
    toName: name,
    summaryRows: [
      ["Title", title],
      ["Category", category],
      ["Location", location],
      ["City", city],
      ["ZIP", record.zip_code || ""],
      ["Description", description],
      ["Why it matters", why_it_matters],
      ["First noticed", record.first_noticed || ""],
      ["Ongoing?", record.ongoing || ""],
      ["Previously reported?", record.prior_reported || ""],
      ["Agency", record.prior_agency || ""],
      ["Case number", record.case_number || ""],
      ["Media", record.media_url || ""],
      ["Submitter", name],
      ["Email", email],
      ["Phone", record.submitter_phone || ""],
      ["May contact", record.permission_contact ? "Yes" : "No"],
      ["May publish name", record.permission_publish_name ? "Yes" : "No"],
    ],
  });

  return NextResponse.json({ ok: true });
}
