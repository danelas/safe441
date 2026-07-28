"use client";

import { useState } from "react";

const links = [
  { href: "#request", label: "The Request" },
  { href: "#map", label: "Corridor Map" },
  { href: "#report", label: "Report a Location" },
  { href: "#remember", label: "Remembering" },
  { href: "#progress", label: "Progress" },
  { href: "#proposal", label: "Proposal" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur">
      <nav className="container-content flex h-[68px] items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-safety font-extrabold text-navy">
            441
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Safe&nbsp;441
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-300 transition hover:text-safety"
            >
              {l.label}
            </a>
          ))}
          <a href="#coalition" className="btn-primary !px-5 !py-2 text-sm">
            Join the Coalition
          </a>
        </div>

        <button
          className="lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy px-5 pb-4 lg:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-safety"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#coalition"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full text-sm"
            >
              Join the Coalition
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
