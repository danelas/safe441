import type { Metadata } from "next";
import ProblemForm from "@/components/ProblemForm";

export const metadata: Metadata = {
  title: "Share an Idea or Concern",
  description:
    "Share an idea or concern from anywhere in Broward County. Tell us what you would improve, what is working, or what deserves a closer look — submissions are reviewed before appearing publicly.",
};

export default function ReportPage() {
  return (
    <main className="section">
      <div className="container-content max-w-3xl">
        <p className="eyebrow">Share an Idea or Concern</p>
        <h1 className="h2">
          What is one realistic improvement that would make life in Broward
          better?
        </h1>
        <p className="lede mt-4">
          An idea, a concern, or something that deserves a closer look — traffic,
          housing, parks, small businesses, safety, shade, youth activities,
          anything. Submissions are reviewed before appearing publicly. Broward
          Forward is not an emergency service and cannot guarantee that an idea
          will be selected or pursued.
        </p>
        <div className="mt-10">
          <ProblemForm />
        </div>
        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          Sharing something about 441 / State Road 7? You can also use the
          dedicated{" "}
          <a href="/441-safe#report" className="text-safety hover:underline">
            A Safer 441 form
          </a>
          .
        </p>
      </div>
    </main>
  );
}
