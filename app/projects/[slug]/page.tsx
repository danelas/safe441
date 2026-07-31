import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getProject, projects, STATUS_LABEL } from "@/lib/projects";

export function generateStaticParams() {
  return projects
    .filter((p) => !p.href)
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  if (project.href) redirect(project.href);

  return (
    <main>
      <section className="border-b border-white/10 bg-navy-light/40">
        <div className="container-content py-16 sm:py-20">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
              project.status === "active"
                ? "bg-safety text-navy"
                : project.status === "launching"
                  ? "bg-safety/20 text-safety"
                  : "bg-white/10 text-slate-400"
            }`}
          >
            {STATUS_LABEL[project.status]} · {project.phase}
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            {project.name}
          </h1>
          <p className="lede mt-4 max-w-2xl">{project.tagline}</p>
          <div className="mt-7">
            <Link href={project.cta.href} className="btn-primary">
              {project.cta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-safety">
                Mission
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-slate-200">
                {project.mission}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-safety">
                Why it matters
              </h2>
              <p className="mt-3 leading-relaxed text-slate-300">
                {project.whyItMatters}
              </p>
            </div>
            {project.status === "planned" && (
              <p className="rounded-md border border-white/10 bg-navy-light p-4 text-sm text-slate-400">
                This project is planned and has not started yet. No results are
                claimed until real work is documented. Want to help it launch
                sooner?{" "}
                <Link href="/get-involved" className="text-safety hover:underline">
                  Get involved
                </Link>
                .
              </p>
            )}
          </div>

          <aside className="h-fit rounded-lg border border-white/10 bg-navy-light p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-safety">
              Focus areas
            </h2>
            <ul className="mt-4 space-y-3">
              {project.focusAreas.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-safety" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-white/10 pt-5">
              <Link href="/get-involved" className="btn-secondary w-full text-sm">
                Volunteer for this project
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
