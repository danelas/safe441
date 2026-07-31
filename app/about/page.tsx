import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fix Broward is a nonpartisan civic-action platform testing whether residents, media, technology, and public follow-through can move local problems toward real solutions.",
};

const principles = [
  "Be accurate",
  "Be fair",
  "Protect people",
  "Show evidence",
  "Correct mistakes",
  "Identify responsibility carefully",
  "Propose realistic actions",
  "Follow up publicly",
  "Do not exploit tragedy",
  "Measure outcomes",
];

const isNot = [
  "A 911 or emergency service",
  "A replacement for city, county, or state complaint systems",
  "A legal service or law-enforcement tip line",
  "A place for unverified accusations",
  "A political campaign or partisan advocacy site",
  "A promise that every issue will be fixed",
];

export default function AboutPage() {
  return (
    <main className="section">
      <div className="container-content max-w-3xl">
        <p className="eyebrow">About</p>
        <h1 className="h2">Why Fix Broward exists.</h1>
        <p className="lede mt-4">
          Fix Broward was created to test a simple idea: that residents, media,
          technology, and public follow-through — combined — can help move local
          problems toward real solutions.
        </p>

        <blockquote className="mt-8 border-l-4 border-safety bg-navy-light p-6 text-slate-200">
          Fix Broward does not begin with the assumption that every problem is
          caused by corruption or neglect. Some problems are caused by limited
          funding, divided responsibility, outdated systems, conflicting
          priorities, missing information, or slow processes. The goal is to find
          the real obstacle, explain it clearly, and keep the next step visible.
        </blockquote>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">How it started</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            The platform began as{" "}
            <Link href="/441-safe" className="text-safety hover:underline">
              441 SAFE Broward
            </Link>
            , a community effort for practical safety improvements along
            US&nbsp;441 / State Road&nbsp;7. Documenting one corridor made the
            bigger pattern obvious: all over Broward, problems get reported once,
            bounce between agencies, and quietly disappear. Fix Broward is the
            broader answer — one public place where problems are reported,
            verified, routed to the responsible organization, and tracked until
            something changes.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">Principles</h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-slate-200">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-safety" />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">What Fix Broward is not</h2>
          <ul className="mt-4 space-y-2.5">
            {isNot.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-md border border-alert/50 bg-alert/10 p-4 text-sm text-slate-200">
            <strong className="text-white">
              If someone is in immediate danger, call 911.
            </strong>{" "}
            Fix Broward is not an emergency-response service.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">Contact</h2>
          <p className="mt-3 text-slate-300">
            Questions, corrections, partnership ideas, or press inquiries:{" "}
            <a
              href="mailto:hello@safe441.org"
              className="font-semibold text-safety hover:underline"
            >
              hello@safe441.org
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
