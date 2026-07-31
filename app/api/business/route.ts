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

  const business_name = str(body.business_name);
  const owner_name = str(body.owner_name);
  const category = str(body.category);
  const address = str(body.address);
  const main_challenge = str(body.main_challenge);
  const requested_help = str(body.requested_help);
  const email = str(body.email);

  if (!business_name || !owner_name || !category || !address || !main_challenge || !requested_help || !email) {
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

  const record = {
    business_name,
    owner_name,
    category,
    address,
    website: str(body.website) || null,
    social_links: str(body.social_links) || null,
    years_in_business: str(body.years_in_business) || null,
    employee_count: str(body.employee_count) || null,
    main_challenge,
    requested_help,
    selection_reason: str(body.selection_reason) || null,
    availability: str(body.availability) || null,
    contact_email: email,
    contact_phone: str(body.phone) || null,
    filming_permission: body.filming_permission === true,
    metrics_permission: body.metrics_permission === true,
    status: "new",
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("business_applications").insert(record);
    if (error) {
      console.error("[fixbroward] business insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "We couldn't save your application. Please try again." },
        { status: 500 }
      );
    }
  }

  await sendSubmissionEmails({
    kind: "business",
    toEmail: email,
    toName: owner_name,
    summaryRows: [
      ["Business", business_name],
      ["Owner", owner_name],
      ["Category", category],
      ["Address", address],
      ["Website", record.website || ""],
      ["Social", record.social_links || ""],
      ["Years in business", record.years_in_business || ""],
      ["Employees", record.employee_count || ""],
      ["Main challenge", main_challenge],
      ["Requested help", requested_help],
      ["Why selected", record.selection_reason || ""],
      ["Availability", record.availability || ""],
      ["Email", email],
      ["Phone", record.contact_phone || ""],
      ["Filming OK", record.filming_permission ? "Yes" : "No"],
      ["Metrics OK", record.metrics_permission ? "Yes" : "No"],
    ],
  });

  return NextResponse.json({ ok: true });
}
