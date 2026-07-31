import type { Metadata } from "next";
import Link from "next/link";
import { projects, STATUS_LABEL } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Broward Forward projects: What Would Make Broward Better?, A Safer 441, the Project Tracker, Business Rescue, Broward Response Lab, Flood & Heat Watch, Youth Creator Lab, Street Cat Network, and Home Rescue Broward.",
};

export default function ProjectsPage() {
  const active = projects.filter((p) => p.status === "active");
  const launching = projects.filter((p) => p.status === "launching");
  const planned = projects.filter((p) => p.status === "planned");

  const groups: Array<[string, typeof projects]> = [
    ["Active", active],
    ["Launching", launching],
    ["Planned", planned],
  ];

  return (
    <main className="section">
      <div className="container-content">
        <p className="eyebrow">Projects</p>
        <h1 className="h2">One platform. Many Broward projects.</h1>
        <p className="lede mt-4 max-w-2xl">
          Each project has its own mission, timeline, and measurable goals — and
          all of them feed the same public tracker. New projects are added based
          on evidence and community response, not guesses.
        </p>

        {groups.map(
          ([label, group]) =>
            group.length > 0 && (
              <section key={label} className="mt-12">
                <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-safety">
                  {label}
                </h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((p) => (
                    <Link
                      key={p.slug}
                      href={p.href ?? `/projects/${p.slug}`}
                      className="group flex flex-col rounded-lg border border-white/10 bg-navy-light p-6 transition hover:border-safety/60"
                    >
                      <span
                        className={`self-start rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                          p.status === "active"
                            ? "bg-safety text-navy"
                            : p.status === "launching"
                              ? "bg-safety/20 text-safety"
                              : "bg-white/10 text-slate-400"
                        }`}
                      >
                        {STATUS_LABEL[p.status]}
                      </span>
                      <h3 className="mt-4 text-lg font-bold text-white group-hover:text-safety">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-slate-400">
                        {p.tagline}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {p.summary}
                      </p>
                      <p className="mt-4 text-xs text-slate-500">
                        Phase: {p.phase}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )
        )}
      </div>
    </main>
  );
}
