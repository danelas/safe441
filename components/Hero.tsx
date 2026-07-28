export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background: swap this gradient for a real muted photo/video of the 441 corridor.
          Drop an image at /public/corridor.jpg and set it as the background of .hero-bg. */}
      <div className="hero-bg absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-soft via-navy to-charcoal" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #ffcc00 0 2px, transparent 2px 90px)",
          }}
        />
      </div>

      <div className="container-content py-20 sm:py-28">
        <p className="eyebrow">Nonpartisan community initiative · Central Broward</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl">
          A safer 441 starts with{" "}
          <span className="text-safety">one coordinated plan.</span>
        </h1>
        <p className="lede mt-6 max-w-2xl">
          Safe 441 is a nonpartisan community effort seeking practical, measurable
          safety improvements along US&nbsp;441 between Sheridan Street and Griffin
          Road.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#coalition" className="btn-primary">
            Join the Coalition
          </a>
          <a href="#report" className="btn-secondary">
            Report a Dangerous Location
          </a>
          <a href="#proposal" className="btn-secondary">
            Read the Proposal
          </a>
        </div>

        <p className="mt-6 max-w-2xl text-sm text-slate-400">
          Residents, businesses, transit riders, parents, professionals, and
          community organizations are invited to participate.
        </p>
      </div>
    </section>
  );
}
