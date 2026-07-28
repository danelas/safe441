export default function FoundingCoalition() {
  return (
    <section id="coalition-members" className="section">
      <div className="container-content">
        <p className="eyebrow">Founding coalition</p>
        <h2 className="h2 max-w-3xl">Founding coalition currently forming.</h2>
        <p className="lede mt-5 max-w-3xl">
          We do not list imaginary supporters. As people and organizations give
          permission, their names, logos, or titles will appear here.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex h-28 items-center justify-center rounded-xl border border-dashed border-white/15 bg-navy-light text-sm text-slate-500"
            >
              Your name or organization here
            </div>
          ))}
        </div>

        <div className="mt-6">
          <a href="#coalition" className="btn-primary">
            Become a founding member
          </a>
        </div>
      </div>
    </section>
  );
}
