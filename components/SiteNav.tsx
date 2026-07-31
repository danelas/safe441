"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/report", label: "Share an Idea" },
  { href: "/tracker", label: "Project Tracker" },
  { href: "/projects", label: "Projects" },
  { href: "/441-safe", label: "A Safer 441" },
  { href: "/business-rescue", label: "Business Rescue" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/about", label: "About" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur">
      <nav className="container-content flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-safety text-sm font-extrabold text-navy">
            BF
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Broward&nbsp;Forward
          </span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {links.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-300 transition hover:text-safety"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/report" className="btn-primary !px-5 !py-2 text-sm">
            Share an Idea
          </Link>
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
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-safety"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
