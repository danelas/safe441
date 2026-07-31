export default function Problem() {
  return (
    <section id="problem" className="section">
      <div className="container-content grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow">Understanding the road</p>
          <h2 className="h2">US 441 is more than a road.</h2>
          <p className="lede mt-5">
            It is a major commercial corridor, transit route, workplace, and daily
            connection for thousands of Broward residents.
          </p>
          <p className="mt-4 leading-relaxed text-slate-300">
            The people who use it every day also describe real challenges:
            difficult crossings, heavy turning traffic, speeding, disconnected
            bus stops, nighttime visibility, and responsibility that is split
            across agencies in ways that confuse everyone.
          </p>
          <p className="mt-4 leading-relaxed text-slate-300">
            A Safer 441 exists to listen to those experiences, understand why
            the corridor operates the way it does, and explore what practical
            improvements are feasible.
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
