import type { Metadata } from "next";
import VolunteerForm from "@/components/VolunteerForm";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer with Broward Forward — help with video, research, data, outreach, translation, or professional expertise across any of our Broward projects.",
};

const ways = [
  "Volunteer on a project",
  "Offer professional expertise (engineering, legal, medical, data)",
  "Help with photography or video",
  "Help with research and public records",
  "Translate for neighbors",
  "Help with outreach",
  "Sponsor a project or donate equipment",
  "Offer meeting space",
];

export default function GetInvolvedPage() {
  return (
    <main className="section">
      <div className="container-content max-w-3xl">
        <p className="eyebrow">Get Involved</p>
        <h1 className="h2">
          Every project on this site runs on neighbors who show up.
        </h1>
        <p className="lede mt-4">
          You don&apos;t need special credentials — useful skills range from
          holding a camera to reading a traffic study. Tell us what you can do
          and which projects interest you.
        </p>

        <div className="mt-8 rounded-lg border border-white/10 bg-navy-light p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-safety">
            Ways to participate
          </h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {ways.map((w) => (
              <li key={w} className="flex items-start gap-2.5 text-sm text-slate-200">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-safety" />
                {w}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <VolunteerForm />
        </div>
      </div>
    </main>
  );
}
