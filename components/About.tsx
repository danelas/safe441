export default function About() {
  return (
    <section id="about" className="section border-y border-white/10 bg-navy-light">
      <div className="container-content max-w-3xl">
        <p className="eyebrow">About Safe 441</p>
        <h2 className="h2">An independent community initiative.</h2>
        <p className="lede mt-5">
          Safe 441 is an independent community initiative focused on improving
          safety along US&nbsp;441 in central Broward County.
        </p>
        <div className="mt-6 rounded-xl border border-safety/30 bg-navy p-6">
          <p className="leading-relaxed text-slate-200">
            The initiative is <strong className="text-white">not</strong> currently
            an official program of FDOT, Broward County, the Broward Metropolitan
            Planning Organization, the City of Hollywood, the Town of Davie, or any
            law-enforcement agency.
          </p>
          <p className="mt-4 leading-relaxed text-slate-300">
            References to public agencies describe the organizations whose
            participation would be necessary to formally study, fund, approve, or
            implement corridor improvements.
          </p>
        </div>
      </div>
    </section>
  );
}
