export default function CorridorMap() {
  return (
    <section id="map" className="section border-y border-white/10 bg-navy-light">
      <div className="container-content">
        <p className="eyebrow">The corridor</p>
        <h2 className="h2 max-w-3xl">
          US 441 between Sheridan Street and Griffin Road.
        </h2>
        <p className="lede mt-5 max-w-3xl">
          The initial focus area runs through central Broward, with three
          intersections highlighted for early safety concepts.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-navy p-4">
            <svg
              viewBox="0 0 720 420"
              className="h-auto w-full"
              role="img"
              aria-label="Illustrated map of US 441 from Sheridan Street to Griffin Road with three highlighted intersections."
            >
              {/* corridor road */}
              <rect x="330" y="20" width="60" height="380" rx="6" fill="#1c2b47" />
              <line
                x1="360"
                y1="30"
                x2="360"
                y2="390"
                stroke="#ffcc00"
                strokeWidth="3"
                strokeDasharray="14 12"
                opacity="0.7"
              />
              <text x="360" y="14" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="700">
                US 441 (State Rd 7)
              </text>

              {/* cross streets */}
              {[
                { y: 80, label: "Sheridan Street" },
                { y: 210, label: "Stirling Road" },
                { y: 340, label: "Griffin Road" },
              ].map((s) => (
                <g key={s.label}>
                  <rect x="40" y={s.y - 14} width="640" height="28" rx="4" fill="#16223a" />
                  <line x1="40" y1={s.y} x2="680" y2={s.y} stroke="#334155" />
                  {/* intersection highlight */}
                  <circle cx="360" cy={s.y} r="22" fill="none" stroke="#ffcc00" strokeWidth="3" />
                  <circle cx="360" cy={s.y} r="7" fill="#ffcc00" />
                  <text x="60" y={s.y - 20} fill="#e2e8f0" fontSize="14" fontWeight="700">
                    {s.label}
                  </text>
                </g>
              ))}

              {/* bus stops */}
              {[130, 165, 275, 300].map((y, i) => (
                <g key={`bus-${i}`}>
                  <rect
                    x={i % 2 === 0 ? 300 : 392}
                    y={y - 5}
                    width="18"
                    height="10"
                    rx="2"
                    fill="#60a5fa"
                  />
                </g>
              ))}

              {/* reported danger markers */}
              {[
                { x: 392, y: 110 },
                { x: 302, y: 250 },
                { x: 392, y: 310 },
              ].map((p, i) => (
                <g key={`danger-${i}`}>
                  <path
                    d={`M ${p.x} ${p.y - 11} L ${p.x + 11} ${p.y + 8} L ${p.x - 11} ${p.y + 8} Z`}
                    fill="#e02424"
                  />
                  <text x={p.x} y={p.y + 5} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800">
                    !
                  </text>
                </g>
              ))}

              {/* proposed pilot area */}
              <rect
                x="316"
                y="188"
                width="88"
                height="164"
                rx="10"
                fill="none"
                stroke="#ffcc00"
                strokeWidth="2"
                strokeDasharray="6 5"
                opacity="0.9"
              />
              <text x="410" y="270" fill="#ffd84d" fontSize="12" fontWeight="700">
                Proposed
              </text>
              <text x="410" y="286" fill="#ffd84d" fontSize="12" fontWeight="700">
                pilot area
              </text>
            </svg>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Legend
            </p>
            {[
              { c: "bg-safety", label: "Highlighted intersection" },
              { c: "bg-blue-400", label: "Bus stop", square: true },
              { c: "bg-alert", label: "Reported danger location" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-3 text-sm text-slate-200">
                <span
                  className={`h-4 w-4 flex-none ${l.c} ${l.square ? "rounded-sm" : "rounded-full"}`}
                />
                {l.label}
              </div>
            ))}
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <span className="h-4 w-4 flex-none rounded-sm border-2 border-dashed border-safety" />
              Proposed pilot area
            </div>
            <p className="pt-2 text-xs leading-relaxed text-slate-500">
              Illustrative schematic — not to scale. A detailed evidence map will be
              published as verified danger reports are collected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
