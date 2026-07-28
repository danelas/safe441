const principles = [
  {
    title: "Safety before politics",
    body: "Safe 441 is nonpartisan. Preventing serious injuries and deaths should not depend on political affiliation.",
  },
  {
    title: "Evidence before assumptions",
    body: "Proposals should be supported by crash data, speed information, community experience, engineering review, and measurable before-and-after results.",
  },
  {
    title: "Practical improvements",
    body: "The campaign will pursue both quick safety improvements and larger long-term changes.",
  },
  {
    title: "Public accountability",
    body: "Residents should be able to see which agency controls each decision, what has been requested, who responded, what was approved, and what remains incomplete.",
  },
  {
    title: "Privacy-conscious technology",
    body: "Safety technology should focus on preventing dangerous conflicts and measuring roadway conditions — not unnecessary facial recognition or indefinite retention of personal movement data.",
  },
  {
    title: "Working with businesses",
    body: "Safety improvements should be planned with businesses and property owners so that access, visibility, deliveries, and construction impacts are properly considered.",
  },
];

export default function Principles() {
  return (
    <section id="principles" className="section">
      <div className="container-content">
        <p className="eyebrow">Our principles</p>
        <h2 className="h2 max-w-3xl">How Safe 441 makes decisions.</h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-white/10 bg-navy-light p-6"
            >
              <div className="mb-3 h-1 w-10 rounded bg-safety" />
              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
