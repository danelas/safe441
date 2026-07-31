"use client";

import { useState } from "react";
import { useSubmit } from "./useSubmit";

const interests = [
  "Road safety",
  "Small businesses",
  "Flooding and heat",
  "Public safety",
  "Youth programs",
  "Housing resources",
  "Animal welfare",
  "General updates",
];

export default function NewsletterForm() {
  const { status, message, submit } = useSubmit("/api/newsletter");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  function toggle(v: string) {
    setPicked((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-safety/40 bg-navy-light p-6 text-center">
        <p className="text-lg font-bold text-white">You&apos;re subscribed.</p>
        <p className="mt-2 text-sm text-slate-300">
          We&apos;ll send updates when there is something real to report — no filler.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit({ email, city, interests: picked });
      }}
      className="rounded-lg border border-white/10 bg-navy-light p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label className="field-label" htmlFor="nl-email">
            Email <span className="text-safety">*</span>
          </label>
          <input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-input"
            placeholder="you@example.com"
          />
        </div>
        <div className="flex-1">
          <label className="field-label" htmlFor="nl-city">
            City (optional)
          </label>
          <input
            id="nl-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="field-input"
            placeholder="Hollywood, Davie, …"
          />
        </div>
      </div>

      <p className="field-label mt-4">Interests (optional)</p>
      <div className="flex flex-wrap gap-2">
        {interests.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              picked.includes(i)
                ? "border-safety bg-safety text-navy"
                : "border-slate-600 text-slate-300 hover:border-safety hover:text-safety"
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm font-semibold text-alert">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-5 w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Subscribing…" : "Get Updates"}
      </button>
    </form>
  );
}
