import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Broward Forward is a local media and community project exploring practical ways to improve life across Broward County — with curiosity, fairness, evidence, and honest follow-through.",
};

const questions = [
  "What is happening now?",
  "What is already working?",
  "What could be improved?",
  "Who understands the issue?",
  "What solutions are realistically available?",
  "Can one of those ideas be tested?",
  "What happened after the idea was presented?",
];

const principles = [
  "Be accurate",
  "Be fair",
  "Protect people",
  "Show evidence",
  "Correct mistakes",
  "Start with curiosity, not accusation",
  "Highlight what already works",
  "Propose realistic actions",
  "Follow up publicly",
  "Do not exploit tragedy",
];

const isNot = [
  "A 911 or emergency service",
  "A replacement for city, county, or state complaint systems",
  "A legal service or law-enforcement tip line",
  "A place for unverified accusations",
  "A political campaign or partisan advocacy site",
  "A promise that every idea will be pursued",
];

export default function AboutPage() {
  return (
    <main className="section">
      <div className="container-content max-w-3xl">
        <p className="eyebrow">About</p>
        <h1 className="h2">What Broward Forward is.</h1>
        <p className="lede mt-4">
          Broward Forward is a local media and community project exploring
          practical ways to improve life across Broward County. We highlight
          people and organizations already doing valuable work, investigate
          areas where improvement is possible, introduce useful ideas from
          Broward and other communities, and test realistic solutions on a
          local scale.
        </p>

        <blockquote className="mt-8 border-l-4 border-safety bg-navy-light p-6 text-slate-200">
          The goal is not to search for failures or attack public officials,
          businesses, or institutions. The goal is to understand how Broward
          works, listen to the people affected, identify opportunities, and
          help good ideas move forward.
        </blockquote>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">
            Seven questions every project asks
          </h2>
          <ol className="mt-4 space-y-2.5">
            {questions.map((q, i) => (
              <li key={q} className="flex items-start gap-3 text-sm text-slate-200">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded bg-safety text-xs font-extrabold text-navy">
                  {i + 1}
                </span>
                <span className="pt-0.5">{q}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 leading-relaxed text-slate-300">
            Some stories will be positive from beginning to end. Others will
            involve serious safety concerns, delayed projects, confusing
            systems, or decisions that deserve public scrutiny. Broward Forward
            approaches both with curiosity, fairness, evidence, and honest
            follow-through. This is about progress — without pretending every
            problem has an easy answer.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">How it started</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            The project began with{" "}
            <Link href="/441-safe" className="text-safety hover:underline">
              A Safer 441
            </Link>
            , an effort to understand and improve one of Broward&apos;s most
            important roads. Spending time on one corridor made the bigger idea
            obvious: all over Broward there are people doing valuable work,
            systems that confuse everyone, and realistic improvements waiting
            for someone to follow through. Broward Forward is the broader
            project — meet Broward, imagine better, test ideas, follow the
            progress.
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
          <h2 className="text-xl font-bold text-white">
            What Broward Forward is not
          </h2>
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
            Broward Forward is not an emergency-response service.
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
