type Doc = { title: string; note: string; href?: string };

const docs: Doc[] = [
  {
    title: "One-page proposal",
    note: "Broward Safety Demonstration Corridor Proposal",
    href: "/docs/safe441-corridor-proposal.pdf",
  },
  { title: "Full corridor concept", note: "Detailed corridor safety concept" },
  { title: "Supporting safety research", note: "Data and references" },
  { title: "Government correspondence", note: "Letters and responses" },
  { title: "Meeting notes", note: "Public process record" },
  { title: "Crash & near-miss findings", note: "Evidence summary" },
  { title: "Before-and-after results", note: "Published after improvements" },
];

export default function Proposal() {
  return (
    <section id="proposal" className="section border-y border-white/10 bg-navy-light">
      <div className="container-content">
        <p className="eyebrow">Research and proposal</p>
        <h2 className="h2 max-w-3xl">Read the plan. Everything is public.</h2>
        <p className="lede mt-5 max-w-3xl">
          Documents will be published here as they are finalized, so officials,
          journalists, and coalition members can review the same evidence.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {docs.map((d) => {
            const inner = (
              <>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded bg-white/5 text-safety">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
                      <path d="M14 2v6h6" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-white">{d.title}</p>
                    <p className="text-xs text-slate-400">{d.note}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    d.href ? "bg-safety text-navy" : "bg-white/5 text-slate-400"
                  }`}
                >
                  {d.href ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Download
                    </>
                  ) : (
                    "Coming soon"
                  )}
                </span>
              </>
            );

            const base =
              "flex items-center justify-between gap-4 rounded-lg border p-4 transition";

            return d.href ? (
              <a
                key={d.title}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${base} border-safety/40 bg-navy hover:border-safety hover:bg-navy-light`}
              >
                {inner}
              </a>
            ) : (
              <div key={d.title} className={`${base} border-white/10 bg-navy`}>
                {inner}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Add news, maps, documents, and detailed technology pages as the coalition
          begins producing real activity.
        </p>
      </div>
    </section>
  );
}
