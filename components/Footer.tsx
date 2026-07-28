const nav = [
  { href: "#request", label: "The Request" },
  { href: "#report", label: "Report a Location" },
  { href: "#coalition", label: "Join the Coalition" },
  { href: "#progress", label: "Progress" },
  { href: "#proposal", label: "Proposal" },
  { href: "#about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal">
      <div className="container-content py-14">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-safety font-extrabold text-navy">
                441
              </span>
              <span className="text-lg font-extrabold text-white">Safe 441</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              A nonpartisan community effort for practical, measurable safety
              improvements along US&nbsp;441 between Sheridan Street and Griffin Road.
            </p>
            <a
              href="mailto:hello@safe441.org"
              className="mt-3 inline-block text-sm font-semibold text-safety hover:underline"
            >
              hello@safe441.org
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-slate-400 hover:text-safety">
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-slate-500">
            Independent community initiative. Not affiliated with or operated by
            FDOT, Broward County, Hollywood, Davie, or any public-safety agency.
          </p>
          <p className="mt-2 text-xs text-slate-600">
            © {new Date().getFullYear()} Safe 441. For an active emergency, call 911.
          </p>
        </div>
      </div>
    </footer>
  );
}
