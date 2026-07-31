import Link from "next/link";

const nav = [
  { href: "/report", label: "Share an Idea or Concern" },
  { href: "/tracker", label: "Project Tracker" },
  { href: "/projects", label: "Projects" },
  { href: "/441-safe", label: "A Safer 441" },
  { href: "/business-rescue", label: "Business Rescue" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/about", label: "About" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-charcoal">
      <div className="container-content py-14">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-safety text-sm font-extrabold text-navy">
                BF
              </span>
              <span className="text-lg font-extrabold text-white">Broward Forward</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Meet Broward. Imagine better. Test ideas. Follow the progress.
              Broward Forward is a local media and community project exploring
              practical ways to improve life across Broward County.
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
              <Link key={n.href} href={n.href} className="text-slate-400 hover:text-safety">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-slate-500">
            Broward Forward is an independent community media project. It is not
            a government service, an emergency-response service, or a legal
            service, and it is not affiliated with FDOT, Broward County, any
            city, or any public-safety agency. Sharing an idea or concern here
            does not guarantee it will be selected or pursued.
          </p>
          <p className="mt-2 text-xs text-slate-600">
            © {new Date().getFullYear()} Broward Forward. If someone is in
            immediate danger, call 911.
          </p>
        </div>
      </div>
    </footer>
  );
}
