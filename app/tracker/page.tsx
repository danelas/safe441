import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Problem Tracker",
  description:
    "The Fix Broward Problem Tracker: verified local issues, who is responsible, what response was received, and whether anything was actually fixed.",
};

export const revalidate = 300;

type Issue = {
  id: string;
  slug: string | null;
  title: string;
  city: string | null;
  category: string | null;
  status: string;
  summary: string | null;
  agency: string | null;
  published_at: string | null;
  created_at: string;
};

const STATUS_STYLE: Record<string, string> = {
  submitted: "bg-white/10 text-slate-300",
  under_review: "bg-blue-500/20 text-blue-300",
  verified: "bg-blue-500/20 text-blue-300",
  routed: "bg-purple-500/20 text-purple-300",
  agency_contacted: "bg-orange-500/20 text-orange-300",
  official_response: "bg-orange-500/20 text-orange-300",
  action_planned: "bg-safety/20 text-safety",
  in_progress: "bg-teal-500/20 text-teal-300",
  resolved: "bg-green-500/20 text-green-300",
  closed: "bg-white/10 text-slate-400",
  monitoring: "bg-white/10 text-slate-300",
};

function statusLabel(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

async function getPublishedIssues(): Promise<Issue[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("issues")
    .select(
      "id, slug, title, city, category, status, summary, agency, published_at, created_at"
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(60);
  if (error) {
    console.error("[fixbroward] tracker fetch error:", error.message);
    return [];
  }
  return (data as Issue[]) ?? [];
}

export default async function TrackerPage() {
  const issues = await getPublishedIssues();

  return (
    <main className="section">
      <div className="container-content">
        <p className="eyebrow">Problem Tracker</p>
        <h1 className="h2">Reported. Routed. Tracked. Fixed.</h1>
        <p className="lede mt-4 max-w-2xl">
          Every verified issue gets a public record: what is happening, who is
          responsible, what response was received, and what happens next. Issues
          stay visible until they are resolved, closed, or clearly explained.
        </p>

        {issues.length === 0 ? (
          <div className="mt-12 rounded-lg border border-white/10 bg-navy-light p-10 text-center">
            <p className="text-lg font-bold text-white">
              The first verified issues are being prepared.
            </p>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
              Submissions are reviewed, verified, and researched before they
              appear here — nothing publishes automatically, and we don&apos;t
              pad the tracker with placeholders. Be one of the first reports.
            </p>
            <div className="mt-6">
              <Link href="/report" className="btn-primary">
                Report a Problem
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <article
                key={issue.id}
                className="flex flex-col rounded-lg border border-white/10 bg-navy-light p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                      STATUS_STYLE[issue.status] ?? "bg-white/10 text-slate-300"
                    }`}
                  >
                    {statusLabel(issue.status)}
                  </span>
                  {issue.category && (
                    <span className="text-xs font-medium text-slate-400">
                      {issue.category}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-lg font-bold text-white">{issue.title}</h2>
                {issue.city && (
                  <p className="mt-1 text-sm font-medium text-slate-400">{issue.city}</p>
                )}
                {issue.summary && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {issue.summary}
                  </p>
                )}
                <div className="mt-auto pt-4 text-xs text-slate-500">
                  {issue.agency && <p>Responsible: {issue.agency}</p>}
                  <p className="mt-1">
                    Published{" "}
                    {new Date(issue.published_at ?? issue.created_at).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-10 text-xs leading-relaxed text-slate-500">
          Every issue shown here has been reviewed by the team. Statuses reflect
          the last confirmed step — not a promise of resolution. If someone is in
          immediate danger, call 911.
        </p>
      </div>
    </main>
  );
}
