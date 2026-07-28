const steps: { label: string; state: "done" | "active" | "todo"; note: string }[] = [
  { label: "Proposal development", state: "done", note: "Complete" },
  { label: "Founding coalition", state: "active", note: "In progress" },
  { label: "Community danger reports", state: "active", note: "Open" },
  { label: "Public-records requests", state: "todo", note: "Preparing" },
  { label: "Agency meetings", state: "todo", note: "Preparing" },
  { label: "Municipal resolutions", state: "todo", note: "Not yet introduced" },
  { label: "Road Safety Audit", state: "todo", note: "Not yet approved" },
  { label: "Demonstration project", state: "todo", note: "Not yet funded" },
  { label: "Safety improvements", state: "todo", note: "Pending" },
];

const dot: Record<string, string> = {
  done: "bg-safety border-safety",
  active: "bg-navy border-safety",
  todo: "bg-navy border-slate-600",
};

const badge: Record<string, string> = {
  done: "bg-safety/15 text-safety",
  active: "bg-safety/10 text-safety",
  todo: "bg-white/5 text-slate-400",
};

export default function Progress() {
  return (
    <section id="progress" className="section border-y border-white/10 bg-navy-light">
      <div className="container-content">
        <p className="eyebrow">Current progress</p>
        <h2 className="h2 max-w-3xl">Exactly where the initiative stands today.</h2>
        <p className="lede mt-5 max-w-3xl">
          This section will be updated as the initiative moves through the public
          process. We show real status only — nothing is marked complete before it is.
        </p>

        <ol className="mt-10 space-y-0">
          {steps.map((s, i) => (
            <li key={s.label} className="relative flex gap-4 pb-8 last:pb-0">
              {i < steps.length - 1 && (
                <span className="absolute left-[11px] top-6 h-full w-0.5 bg-white/10" />
              )}
              <span
                className={`relative z-10 mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 ${dot[s.state]}`}
              >
                {s.state === "done" && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0e1726" strokeWidth="4">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {s.state === "active" && <span className="h-2 w-2 rounded-full bg-safety" />}
              </span>
              <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-white">{s.label}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[s.state]}`}>
                  {s.note}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
