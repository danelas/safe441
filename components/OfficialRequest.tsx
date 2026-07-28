const requests = [
  "Conduct a formal Road Safety Audit of US 441 between Sheridan Street and Griffin Road.",
  "Publish relevant crash, speed, pedestrian, transit, lighting, signal, and near-miss findings within 90 days.",
  "Identify at least ten practical safety improvements that can be installed or initiated within 12 months.",
  "Develop focused safety concepts for the Sheridan Street, Stirling Road, and Griffin Road intersections.",
  "Test modern near-miss and pedestrian-detection technology at one demonstration location.",
  "Assign a responsible project manager and publish a funding and implementation schedule.",
  "Measure and publicly report the results before and after improvements are installed.",
];

export default function OfficialRequest() {
  return (
    <section id="request" className="section border-y border-white/10 bg-navy-light">
      <div className="container-content">
        <p className="eyebrow">What we are requesting</p>
        <h2 className="h2 max-w-3xl">
          One coordinated corridor plan — studied, funded, and publicly accountable.
        </h2>
        <p className="lede mt-5 max-w-3xl">
          Safe 441 is asking FDOT District 4, Broward County, the Broward
          Metropolitan Planning Organization, Hollywood, Davie, transit officials,
          public-safety agencies, businesses, and residents to work through one
          coordinated corridor plan.
        </p>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2">
          {requests.map((r, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-lg border border-white/10 bg-navy p-4"
            >
              <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded bg-safety text-sm font-extrabold text-navy">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-slate-200">{r}</span>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-3xl rounded-lg border-l-4 border-safety bg-navy p-5 text-slate-300">
          This is not a request to immediately reconstruct the entire corridor or
          approve one untested technology. It is a request to formally study the
          danger, begin practical improvements, and establish public accountability.
        </p>
      </div>
    </section>
  );
}
