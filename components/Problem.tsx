export default function Problem() {
  return (
    <section id="problem" className="section">
      <div className="container-content grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow">The problem</p>
          <h2 className="h2">US 441 is more than a road.</h2>
          <p className="lede mt-5">
            It is a major commercial corridor, transit route, workplace, and daily
            connection for thousands of Broward residents.
          </p>
          <p className="mt-4 leading-relaxed text-slate-300">
            Yet people traveling along the corridor regularly face dangerous
            crossings, heavy turning traffic, speeding, poorly connected bus stops,
            limited pedestrian protection, nighttime visibility concerns, and
            confusing jurisdictional responsibility.
          </p>
          <p className="mt-4 leading-relaxed text-slate-300">
            Safe 441 was created to turn those concerns into a focused and
            measurable public-safety project.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 self-center">
          {[
            "Dangerous crossings",
            "Heavy turning traffic",
            "Speeding",
            "Disconnected bus stops",
            "Limited pedestrian protection",
            "Nighttime visibility",
            "Confusing jurisdiction",
            "Repeated near misses",
          ].map((item) => (
            <li
              key={item}
              className="rounded-lg border border-white/10 bg-navy-light px-4 py-3 text-sm font-medium text-slate-200"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
