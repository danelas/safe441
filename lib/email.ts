import { Resend } from "resend";

const CAMPAIGN_EMAIL = process.env.CAMPAIGN_EMAIL || "hello@safe441.org";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Broward Forward <hello@safe441.org>";

let resend: Resend | null | undefined;

function getResend(): Resend | null {
  if (resend !== undefined) return resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[safe441] RESEND_API_KEY not set — emails are disabled.");
    resend = null;
    return resend;
  }
  resend = new Resend(key);
  return resend;
}

function shell(title: string, bodyHtml: string) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#0e1726;padding:28px;color:#e2e8f0">
    <div style="max-width:560px;margin:0 auto;background:#16223a;border-radius:12px;overflow:hidden;border:1px solid #24344f">
      <div style="background:#ffcc00;color:#0e1726;padding:16px 24px;font-weight:800;font-size:18px;letter-spacing:0.02em">Broward Forward</div>
      <div style="padding:24px">
        <h1 style="margin:0 0 12px;font-size:20px;color:#ffffff">${title}</h1>
        ${bodyHtml}
      </div>
      <div style="padding:16px 24px;border-top:1px solid #24344f;font-size:12px;color:#94a3b8">
        Broward Forward is an independent community initiative. Not affiliated with or operated by
        FDOT, Broward County, any city, or any public-safety agency. Not an emergency service.
      </div>
    </div>
  </div>`;
}

/** Confirmation to the person who submitted, plus a private notification to the campaign. */
export async function sendSubmissionEmails(opts: {
  kind:
    | "coalition"
    | "report"
    | "memorial"
    | "problem"
    | "business"
    | "volunteer"
    | "newsletter";
  toEmail?: string | null;
  toName?: string | null;
  summaryRows: Array<[string, string]>;
}) {
  const client = getResend();
  if (!client) return;

  const isCoalition = opts.kind === "coalition";
  const isMemorial = opts.kind === "memorial";
  const labels: Record<typeof opts.kind, string> = {
    coalition: "coalition sign-up",
    report: "danger-location report",
    memorial: "memorial submission",
    problem: "problem report",
    business: "Business Rescue application",
    volunteer: "volunteer sign-up",
    newsletter: "newsletter subscription",
  };
  const label = labels[opts.kind];

  const rowsHtml = opts.summaryRows
    .filter(([, v]) => v && v.trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;color:#94a3b8;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 10px;color:#e2e8f0">${escapeHtml(
          v
        )}</td></tr>`
    )
    .join("");

  const table = `<table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:8px">${rowsHtml}</table>`;

  const tasks: Promise<unknown>[] = [];

  // Confirmation to submitter
  if (opts.toEmail) {
    let confirmTitle: string;
    let confirmSubject: string;
    let confirmBody: string;

    if (isCoalition) {
      confirmTitle = "You're on the list";
      confirmSubject = "Thanks for joining the A Safer 441 coalition";
      confirmBody = `<p style="color:#cbd5e1;line-height:1.6">Thank you${
        opts.toName ? `, ${escapeHtml(opts.toName)}` : ""
      }. Your interest in joining the A Safer 441 coalition has been received. We'll be in touch as the founding coalition forms.</p>
         <p style="color:#94a3b8;font-size:13px;line-height:1.6">A Safer 441 is nonpartisan and currently an independent community initiative.</p>`;
    } else if (isMemorial) {
      confirmTitle = "Thank you for sharing";
      confirmSubject = "We received your message — A Safer 441";
      confirmBody = `<p style="color:#cbd5e1;line-height:1.6">Thank you${
        opts.toName ? `, ${escapeHtml(opts.toName)}` : ""
      }. We are grateful you reached out. Someone from the A Safer 441 team will contact you privately and gently.</p>
         <p style="color:#94a3b8;font-size:13px;line-height:1.6">Nothing you shared — no name, photograph, or story — will ever be published without your clear, specific permission. Sharing with us does not commit you to anything public.</p>`;
    } else if (opts.kind === "business") {
      confirmTitle = "Application received";
      confirmSubject = "Your Business Rescue application was received — Broward Forward";
      confirmBody = `<p style="color:#cbd5e1;line-height:1.6">Thank you${
        opts.toName ? `, ${escapeHtml(opts.toName)}` : ""
      }. Your Business Rescue application has been received. We review every application and will reach out if your business is selected for an upcoming round.</p>
         <p style="color:#94a3b8;font-size:13px;line-height:1.6">Applying does not guarantee selection, and there is no cost to apply.</p>`;
    } else if (opts.kind === "volunteer") {
      confirmTitle = "Thanks for stepping up";
      confirmSubject = "Your volunteer sign-up was received — Broward Forward";
      confirmBody = `<p style="color:#cbd5e1;line-height:1.6">Thank you${
        opts.toName ? `, ${escapeHtml(opts.toName)}` : ""
      }. Your volunteer sign-up has been received. We'll contact you as projects that match your skills and interests get moving.</p>`;
    } else if (opts.kind === "newsletter") {
      confirmTitle = "You're subscribed";
      confirmSubject = "You're subscribed to Broward Forward updates";
      confirmBody = `<p style="color:#cbd5e1;line-height:1.6">Thanks for subscribing. We send updates when there is something real to report — verified issues, official responses, and resolved problems.</p>
         <p style="color:#94a3b8;font-size:13px;line-height:1.6">You can unsubscribe any time by replying to any update.</p>`;
    } else {
      confirmTitle = "Report received";
      confirmSubject =
        opts.kind === "problem"
          ? "Your Broward Forward report was received"
          : "Your A Safer 441 location report was received";
      confirmBody = `<p style="color:#cbd5e1;line-height:1.6">Thank you${
        opts.toName ? `, ${escapeHtml(opts.toName)}` : ""
      }. Your report has been received and has entered the review queue. Nothing publishes automatically — the team reviews every submission first.</p>
         <p style="color:#e02424;font-size:13px;line-height:1.6"><strong>Reminder:</strong> Do not use this site to report an emergency. Call 911 for immediate police, fire, or medical assistance.</p>`;
    }

    tasks.push(
      client.emails.send({
        from: FROM_EMAIL,
        to: opts.toEmail,
        subject: confirmSubject,
        html: shell(confirmTitle, confirmBody),
      })
    );
  }

  // Private notification to campaign
  tasks.push(
    client.emails.send({
      from: FROM_EMAIL,
      to: CAMPAIGN_EMAIL,
      subject: `New ${label}${opts.toName ? ` — ${opts.toName}` : ""}`,
      html: shell(`New ${label}`, table),
    })
  );

  const results = await Promise.allSettled(tasks);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("[safe441] email send failed:", r.reason);
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
