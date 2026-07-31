import type { Metadata } from "next";
import BusinessForm from "@/components/BusinessForm";

export const metadata: Metadata = {
  title: "Business Rescue — Ten Businesses in Thirty Days",
  description:
    "Apply for Broward Forward's Business Rescue project: practical marketing, web, and presentation help for Broward businesses, with measurable before-and-after results.",
};

const services = [
  "Short promotional video",
  "Photography",
  "Website refresh or landing page",
  "Google Business Profile review",
  "Branding cleanup and offer design",
  "Social content",
  "Customer-feedback system",
  "Basic marketing plan",
];

export default function BusinessRescuePage() {
  return (
    <main className="section">
      <div className="container-content max-w-3xl">
        <p className="eyebrow">Ten Businesses in Thirty Days</p>
        <h1 className="h2">Real help for real Broward businesses.</h1>
        <p className="lede mt-4">
          Business Rescue helps Broward businesses improve their visibility,
          marketing, content, websites, and customer presentation — while
          documenting measurable before-and-after results. There is no cost to
          apply.
        </p>

        <div className="mt-8 rounded-lg border border-white/10 bg-navy-light p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-safety">
            What selected businesses can receive
          </h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s} className="flex items-start gap-2.5 text-sm text-slate-200">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-safety" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <BusinessForm />
        </div>

        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          Applying does not guarantee selection. Selected businesses agree on the
          scope of work and what gets published before anything is filmed or
          shared.
        </p>
      </div>
    </main>
  );
}
