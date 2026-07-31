export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Real muted photo of the US 441 corridor. Replace /public/corridor.jpg to
          swap the image; the dark gradient overlay keeps hero text readable. */}
      <div className="hero-bg absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-charcoal bg-cover bg-center"
          style={{ backgroundImage: "url('/corridor.jpg')" }}
        />
        {/* Darkening overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/80 to-charcoal/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 to-transparent" />
      </div>

      <div className="container-content py-20 sm:py-28">
        <p className="eyebrow">A Broward Forward project · Nonpartisan · Central Broward</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl">
          A Safer <span className="text-safety">441</span>
        </h1>
        <p className="lede mt-6 max-w-2xl">
          Listening, learning, and exploring practical improvements for one of
          Broward&apos;s most important roads — US&nbsp;441 between Sheridan
          Street and Griffin Road.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#report" className="btn-primary">
            Share Your Experience
          </a>
          <a href="#coalition" className="btn-secondary">
            Join the Conversation
          </a>
          <a href="#proposal" className="btn-secondary">
            Read the Proposal
          </a>
        </div>

        <p className="mt-6 max-w-2xl text-sm text-slate-400">
          Drivers, pedestrians, transit riders, businesses, parents, planners,
          and community organizations are all invited to participate.
        </p>
      </div>

      {/* Photo attribution — required by the image's CC BY-SA 2.0 license. */}
      <p className="absolute bottom-2 right-3 text-[10px] text-slate-500">
        US 441, Broward County ·{" "}
        <a
          href="https://commons.wikimedia.org/wiki/File:US441-FL7-CopansRoadEarlyMorning-Jul2013_(26252081818).jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-400"
        >
          Photo: formulanone, CC BY-SA 2.0
        </a>
      </p>
    </section>
  );
}
