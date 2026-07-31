import Link from "next/link";
import { projects, STATUS_LABEL } from "@/lib/projects";
import NewsletterForm from "@/components/NewsletterForm";

const questions = [
  "What is happening now?",
  "What is already working?",
  "What could be improved?",
  "Who understands the issue?",
  "What solutions are realistically available?",
  "Can one of those ideas be tested?",
  "What happened after the idea was presented?",
];

const betterTopics = [
  "Traffic",
  "Housing",
  "Nightlife",
  "Small businesses",
  "Parks",
  "Safety",
  "Shade",
  "Youth activities",
  "Public transportation",
  "Cleanliness",
  "Government services",
  "Community connection",
];

export default function Home() {
  const safer441 = projects.find((p) => p.slug === "a-safer-441");

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
          <p className="eyebrow">Local media & community project · Broward County</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Meet Broward.{" "}
            <span className="text-safety">Imagine better.</span>
          </h1>
          <p className="lede mt-6 max-w-2xl">
            Broward Forward explores practical ways to improve life across
            Broward County — highlighting people already doing valuable work,
            listening to the people affected, and testing realistic ideas on a
            local scale.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Meet Broward · Imagine better · Test ideas · Follow the progress
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/report" className="btn-primary">
              Share an Idea or Concern
            </Link>
            <Link href="/tracker" className="btn-secondary">
              Follow the Progress
            </Link>
            <Link href="/441-safe" className="btn-secondary">
              Explore A Safer 441
            </Link>
          </div>
        </div>
      </section>

      {/* First series */}
      <section className="section bg-navy">
        <div className="container-content">
          <p className="eyebrow">The first series</p>
          <h2 className="h2 max-w-3xl">What would make Broward better?</h2>
          <p className="lede mt-4 max-w-2xl">
            We are going around Broward asking people one question:{" "}
            <span className="font-semibold text-white">
              &ldquo;What is one realistic improvement that would make life in
              Broward better?&rdquo;
            </span>{" "}
            Some answers will be funny. Some will be brilliant. Some will be
            unrealistic. The strongest ideas become the projects we explore
            next.
          </p>

          <ul className="mt-8 flex max-w-3xl flex-wrap gap-2.5">
            {betterTopics.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/10 bg-navy-light px-4 py-1.5 text-sm font-medium text-slate-200"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link href="/report" className="btn-primary">
              Add Your Answer
            </Link>
          </div>
        </div>
      </section>

      {/* How every project works */}
      <section className="section bg-navy-light/40">
        <div className="container-content">
          <p className="eyebrow">How every project works</p>
          <h2 className="h2 max-w-3xl">
            Seven questions, asked honestly, every time.
          </h2>
          <p className="lede mt-4 max-w-2xl">
            The goal is not to search for failures or attack anyone. The goal is
            to understand how Broward works, listen to the people affected,
            identify opportunities, and help good ideas move forward.
          </p>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {questions.map((q, i) => (
              <li
                key={q}
                className="flex gap-3.5 rounded-lg border border-white/10 bg-navy p-5"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded bg-safety font-extrabold text-navy">
                  {i + 1}
                </span>
                <span className="self-center text-sm font-medium leading-relaxed text-slate-200">
                  {q}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-slate-400">
            Some stories will be positive from beginning to end. Others will
            involve serious safety concerns, delayed projects, or decisions that
            deserve public scrutiny. We approach both with curiosity, fairness,
            evidence, and honest follow-through.
          </p>
        </div>
      </section>

      {/* Featured project: A Safer 441 */}
      {safer441 && (
        <section className="section bg-navy">
          <div className="container-content">
            <p className="eyebrow">Featured project</p>
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="h2">{safer441.name}</h2>
                <p className="lede mt-4">{safer441.tagline}</p>
                <p className="mt-4 leading-relaxed text-slate-300">
                  US&nbsp;441 connects thousands of Broward residents to work,
                  school, and transit every day. We are speaking with the people
                  who use it, learning why the road operates the way it does,
                  and exploring what practical improvements are feasible.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/441-safe" className="btn-primary">
                    Explore A Safer 441
                  </Link>
                  <Link href="/441-safe#report" className="btn-secondary">
                    Share a 441 Experience
                  </Link>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-navy-light p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-safety">
                  What the project explores
                </h3>
                <ul className="mt-4 space-y-3">
                  {safer441.focusAreas.map((f) => (
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
      )}

      {/* Projects grid */}
      <section className="section bg-navy-light/40">
        <div className="container-content">
          <p className="eyebrow">Projects</p>
          <h2 className="h2">One county. Many stories worth following.</h2>
          <p className="lede mt-4 max-w-2xl">
            Broward Forward runs multiple public projects — each with its own
            questions, timeline, and honest follow-through.
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
      <section className="section bg-navy">
        <div className="container-content text-center">
          <h2 className="h2 mx-auto max-w-2xl">
            You do not need to be an expert to have a good idea.
          </h2>
          <p className="lede mx-auto mt-4 max-w-2xl">
            Broward residents already know what is working and what could be
            better. The missing piece is listening carefully, exploring what is
            realistic, and following through in public.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/report" className="btn-primary">
              Share an Idea or Concern
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
      <section className="section bg-navy-light/40">
        <div className="container-content max-w-3xl">
          <p className="eyebrow">Stay in the loop</p>
          <h2 className="h2">Follow the progress.</h2>
          <p className="lede mt-4">
            Get updates when new stories publish, ideas get explored, and
            projects move forward.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
