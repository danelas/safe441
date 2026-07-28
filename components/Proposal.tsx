const docs = [
  { title: "One-page proposal", note: "A concise summary of the request", ready: false },
  { title: "Full corridor concept", note: "Detailed corridor safety concept", ready: false },
  { title: "Supporting safety research", note: "Data and references", ready: false },
  { title: "Government correspondence", note: "Letters and responses", ready: false },
  { title: "Meeting notes", note: "Public process record", ready: false },
  { title: "Crash & near-miss findings", note: "Evidence summary", ready: false },
  { title: "Before-and-after results", note: "Published after improvements", ready: false },
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
          {docs.map((d) => (
            <div
              key={d.title}
              className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-navy p-4"
            >
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
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-400">
                {d.ready ? "Download" : "Coming soon"}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Add news, maps, documents, and detailed technology pages as the coalition
          begins producing real activity.
        </p>
      </div>
    </section>
  );
}
