import type { Metadata } from "next";
import ProblemForm from "@/components/ProblemForm";

export const metadata: Metadata = {
  title: "Report a Problem",
  description:
    "Report a local problem anywhere in Broward County. Tell us what is happening, where, and why it matters — submissions are reviewed before appearing publicly.",
};

export default function ReportPage() {
  return (
    <main className="section">
      <div className="container-content max-w-3xl">
        <p className="eyebrow">Report a Problem</p>
        <h1 className="h2">
          Tell us what is happening, where, and why it matters.
        </h1>
        <p className="lede mt-4">
          Any Broward problem qualifies — road safety, flooding, illegal dumping,
          a stalled government service, a struggling block. Submissions are
          reviewed before appearing publicly. Fix Broward is not an emergency
          service and cannot guarantee that an issue will be selected or
          resolved.
        </p>
        <div className="mt-10">
          <ProblemForm />
        </div>
        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          Reporting a 441 / State Road 7 safety location? You can also use the
          dedicated{" "}
          <a href="/441-safe#report" className="text-safety hover:underline">
            441 SAFE report form
          </a>
          .
        </p>
      </div>
    </main>
  );
}
