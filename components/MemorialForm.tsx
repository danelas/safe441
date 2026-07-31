"use client";

import { FormEvent, useState } from "react";
import { useSubmit } from "./useSubmit";
import { ErrorNote, SuccessCard } from "./CoalitionForm";

const PARTICIPATION = [
  "Private conversation only",
  "Written statement",
  "Audio interview",
  "On-camera interview",
];

export default function MemorialForm() {
  const { status, message, submit } = useSubmit("/api/memorial");
  const [participation, setParticipation] = useState<string[]>([]);

  function toggle(item: string) {
    setParticipation((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      your_name: fd.get("your_name"),
      contact: fd.get("contact"),
      person_name: fd.get("person_name"),
      crash_date_location: fd.get("crash_date_location"),
      relationship: fd.get("relationship"),
      share: fd.get("share"),
      safety_change: fd.get("safety_change"),
      participation,
      permission_display_name: fd.get("permission_display_name") === "on",
      permission_display_photos: fd.get("permission_display_photos") === "on",
      permission_identify: fd.get("permission_identify") === "on",
    };
    await submit(payload);
  }

  if (status === "success") {
    return (
      <section id="remember" className="section border-y border-white/10 bg-navy-light">
        <div className="container-content">
          <SuccessCard
            title="Thank you for sharing."
            body="We are grateful you reached out. Someone from the A Safer 441 team will contact you privately and gently. Nothing you shared will be published without your clear, specific permission."
          />
        </div>
      </section>
    );
  }

  return (
    <section id="remember" className="section border-y border-white/10 bg-navy-light">
      <div className="container-content">
        <div className="max-w-3xl">
          <p className="eyebrow">In memoriam</p>
          <h2 className="h2">Remembering Lives Lost on 441</h2>
          <p className="lede mt-5">
            Have you lost a family member or loved one on US 441 / SR 7? A Safer 441
            Broward is gathering voluntary stories from families who want the public
            and decision-makers to understand the human cost of roadway danger. You
            may contact us privately without agreeing to publication or an interview.
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-lg border-l-4 border-safety/70 bg-safety/5 p-4 text-sm text-slate-200">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 flex-none text-safety"
            >
              <path
                d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
                strokeLinejoin="round"
              />
            </svg>
            <p>
              No name, photograph, statement, or personal story will be published
              without your clear permission. Sharing with us does not require you to
              participate publicly, appear on camera, or allow anything to be
              published.
            </p>
          </div>

          <a
            href="/docs/remembering-those-we-lost-on-441.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-navy px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-safety hover:text-white"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-safety">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download the memorial handout (PDF)
          </a>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 rounded-xl border border-white/10 bg-navy p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="your_name">Your name</Label>
              <input id="your_name" name="your_name" className="field-input" />
            </div>
            <div>
              <Label htmlFor="contact" required>
                Email or phone
              </Label>
              <input
                id="contact"
                name="contact"
                required
                className="field-input"
                placeholder="However you'd prefer we reach you"
              />
            </div>

            <div>
              <Label htmlFor="person_name" required>
                Name of the person remembered
              </Label>
              <input id="person_name" name="person_name" required className="field-input" />
            </div>
            <div>
              <Label htmlFor="relationship">Your relationship to them</Label>
              <input
                id="relationship"
                name="relationship"
                className="field-input"
                placeholder="e.g. Parent, spouse, child, friend"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="crash_date_location">
                Approximate crash date and location
              </Label>
              <input
                id="crash_date_location"
                name="crash_date_location"
                className="field-input"
                placeholder="Only what you're comfortable sharing"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="share">What you would like to share</Label>
              <textarea
                id="share"
                name="share"
                rows={4}
                className="field-input"
                placeholder="Tell us about them — their life, what happened, or anything you'd like us to know. There is no right amount to say."
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="safety_change">
                What safety change you would most like to see
              </Label>
              <textarea
                id="safety_change"
                name="safety_change"
                rows={3}
                className="field-input"
                placeholder="The improvement you believe could prevent another loss"
              />
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="field-label">How would you like to take part?</legend>
            <div className="mt-1 grid gap-2 sm:grid-cols-2">
              {PARTICIPATION.map((item) => (
                <label key={item} className="check-row">
                  <input
                    type="checkbox"
                    className="mt-0.5 accent-safety"
                    checked={participation.includes(item)}
                    onChange={() => toggle(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="field-label">
              Permissions
              <span className="ml-2 font-normal text-slate-500">
                (all off unless you choose them)
              </span>
            </legend>
            <div className="mt-1 space-y-2.5">
              <label className="check-row">
                <input
                  type="checkbox"
                  name="permission_display_name"
                  className="mt-0.5 accent-safety"
                />
                Permission to display their name.
              </label>
              <label className="check-row">
                <input
                  type="checkbox"
                  name="permission_display_photos"
                  className="mt-0.5 accent-safety"
                />
                Permission to display photographs.
              </label>
              <label className="check-row">
                <input
                  type="checkbox"
                  name="permission_identify"
                  className="mt-0.5 accent-safety"
                />
                Permission to publicly identify the person who was lost.
              </label>
            </div>
          </fieldset>

          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            You can change or withdraw any permission at any time. If you need
            immediate help, call 988 (Suicide &amp; Crisis Lifeline) or reach out to
            someone you trust.
          </p>

          {status === "error" && <ErrorNote message={message} />}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary mt-6 w-full disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Share Their Story"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="field-label" htmlFor={htmlFor}>
      {children}
      {required && <span className="text-safety"> *</span>}
    </label>
  );
}
