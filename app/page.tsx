import Link from "next/link";
import { projects, STATUS_LABEL } from "@/lib/projects";
import NewsletterForm from "@/components/NewsletterForm";

const steps = [
  {
    n: "1",
    title: "Report It",
    body: "Tell us what is happening and where.",
  },
  {
    n: "2",
    title: "Verify It",
    body: "The team reviews the issue, location, evidence, and responsible organization.",
  },
  {
    n: "3",
    title: "Track It",
    body: "Updates, agency responses, documents, and next steps appear publicly.",
  },
  {
    n: "4",
    title: "Follow Through",
    body: "The issue remains visible until it is resolved, closed, or clearly explained.",
  },
];

export default function Home() {
  const flagship = projects[0];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-charcoal bg-cover bg-center"
            style={{ backgroundImage: "url('/corridor.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/85 to-charcoal/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 to-transparent" />
        </div>

        <div className="container-content py-20 sm:py-28">
          <p className="eyebrow">Nonpartisan civic-action platform · Broward County</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl">
            See a problem in Broward?{" "}
            <span className="text-safety">Let&apos;s find out who can fix it.</span>
          </h1>
          <p className="lede mt-6 max-w-2xl">
            Fix Broward investigates local problems, identifies who is responsible,
            proposes practical solutions, and publicly tracks what happens next.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Reported · Routed · Tracked · Fixed
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/report" className="btn-primary">
              Report a Problem
            </Link>
            <Link href="/tracker" className="btn-secondary">
              View the Tracker
            </Link>
            <Link href="/441-safe" className="btn-secondary">
              Explore 441 SAFE
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-navy">
        <div className="container-content">
          <p className="eyebrow">How it works</p>
          <h2 className="h2">Complaints disappear when nobody follows up.</h2>
          <p className="lede mt-4 max-w-2xl">
            Fix Broward creates a public timeline for local problems. We document
            the issue, contact the responsible organization, publish the response,
            and keep the next step visible.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-lg border border-white/10 bg-navy-light p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded bg-safety font-extrabold text-navy">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship project */}
      <section className="section bg-navy-light/40">
        <div className="container-content">
          <p className="eyebrow">Current priority project</p>
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <h2 className="h2">{flagship.name}</h2>
              <p className="lede mt-4">
                We are documenting safety concerns along US&nbsp;441 and State
                Road&nbsp;7, beginning with key intersections around Sheridan
                Street, Stirling Road, and Griffin Road.
              </p>
              <p className="mt-4 text-sm text-slate-400">
                Current phase: <span className="font-semibold text-slate-200">{flagship.phase}</span>
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/441-safe" className="btn-primary">
                  Explore 441 SAFE
                </Link>
                <Link href="/441-safe#report" className="btn-secondary">
                  Submit a 441 Location
                </Link>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-navy p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-safety">
                Focus areas
              </h3>
              <ul className="mt-4 space-y-3">
                {flagship.focusAreas.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-safety" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="section bg-navy">
        <div className="container-content">
          <p className="eyebrow">Projects</p>
          <h2 className="h2">One platform. Many Broward projects.</h2>
          <p className="lede mt-4 max-w-2xl">
            Fix Broward is built to run multiple public projects — each with its
            own mission, timeline, and measurable results.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={p.href ?? `/projects/${p.slug}`}
                className="group rounded-lg border border-white/10 bg-navy-light p-6 transition hover:border-safety/60"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                      p.status === "active"
                        ? "bg-safety text-navy"
                        : p.status === "launching"
                          ? "bg-safety/20 text-safety"
                          : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-safety">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {p.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="section bg-navy-light/40">
        <div className="container-content text-center">
          <h2 className="h2 mx-auto max-w-2xl">
            You do not need to be an expert to notice something that needs fixing.
          </h2>
          <p className="lede mx-auto mt-4 max-w-2xl">
            Broward residents already know where many problems are. The missing
            piece is identifying the correct organization, verifying the facts,
            and continuing to follow up after the first complaint.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/report" className="btn-primary">
              Submit a Problem
            </Link>
            <Link href="/get-involved" className="btn-secondary">
              Volunteer
            </Link>
            <Link href="/business-rescue" className="btn-secondary">
              Apply for Business Rescue
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section bg-navy">
        <div className="container-content max-w-3xl">
          <p className="eyebrow">Stay in the loop</p>
          <h2 className="h2">Follow what gets fixed.</h2>
          <p className="lede mt-4">
            Get updates when issues are verified, agencies respond, and problems
            get resolved.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
