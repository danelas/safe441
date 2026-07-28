"use client";

import { FormEvent, useState } from "react";
import { useSubmit } from "./useSubmit";

const PARTICIPATION = [
  "Attend an introductory meeting",
  "Share my experience",
  "Represent a neighborhood",
  "Represent a business",
  "Represent an organization",
  "Help with outreach",
  "Review technical proposals",
  "Help with public meetings",
  "Volunteer photography or video",
  "Receive campaign updates",
  "Other",
];

export default function CoalitionForm() {
  const { status, message, submit } = useSubmit("/api/coalition");
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
      full_name: fd.get("full_name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      city: fd.get("city"),
      organization: fd.get("organization"),
      connection: fd.get("connection"),
      participation,
      skills: fd.get("skills"),
      availability: fd.get("availability"),
      message: fd.get("message"),
      permission_contact: fd.get("permission_contact") === "on",
      permission_public: fd.get("permission_public") === "on",
    };
    await submit(payload);
  }

  if (status === "success") {
    return (
      <section id="coalition" className="section">
        <div className="container-content">
          <SuccessCard
            title="Thank you — you're on the list."
            body="Your interest in joining the Safe 441 coalition has been received. We'll be in touch as the founding coalition forms. A confirmation has been sent to your email."
          />
        </div>
      </section>
    );
  }

  return (
    <section id="coalition" className="section border-y border-white/10 bg-navy-light">
      <div className="container-content grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <p className="eyebrow">Join the coalition</p>
          <h2 className="h2">Safe 441 is forming its founding coalition.</h2>
          <p className="lede mt-5">
            You do not need to become a full-time volunteer. You can participate by
            sharing your experience, attending one meeting, reviewing a proposal,
            introducing us to an organization, or supporting the official request.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            We are seeking
          </p>
          <ul className="mt-2 grid grid-cols-1 gap-1.5 text-sm text-slate-300 sm:grid-cols-2">
            {[
              "Residents near the corridor",
              "Business & property owners",
              "Regular transit riders",
              "Parents & senior citizens",
              "Neighborhood associations",
              "Medical & emergency professionals",
              "Transportation & engineering pros",
              "Accessibility advocates",
              "Schools & community institutions",
              "People affected by a serious crash",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="text-safety">·</span>
                {x}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-white/10 bg-navy p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="full_name" label="Full name" required />
            <Field name="email" label="Email" type="email" required />
            <Field name="phone" label="Phone number" optional />
            <Field name="city" label="City or neighborhood" />
            <div className="sm:col-span-2">
              <Field name="organization" label="Organization or business" optional />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="connection">
                Your connection to 441
              </label>
              <textarea
                id="connection"
                name="connection"
                rows={2}
                className="field-input"
                placeholder="How do you use or relate to the corridor?"
              />
            </div>
          </div>

          <fieldset className="mt-5">
            <legend className="field-label">How would you like to participate?</legend>
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

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field name="skills" label="Professional skills or experience" optional />
            <Field name="availability" label="Meeting availability" />
          </div>

          <div className="mt-4">
            <label className="field-label" htmlFor="c_message">
              Short message
            </label>
            <textarea id="c_message" name="message" rows={3} className="field-input" />
          </div>

          <div className="mt-5 space-y-2.5">
            <label className="check-row">
              <input type="checkbox" name="permission_contact" defaultChecked className="mt-0.5 accent-safety" />
              You may contact me about Safe 441.
            </label>
            <label className="check-row">
              <input type="checkbox" name="permission_public" className="mt-0.5 accent-safety" />
              You may publicly list my name or organization as a supporter.
            </label>
          </div>

          {status === "error" && <ErrorNote message={message} />}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary mt-6 w-full disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Join the Coalition"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  optional,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={name}>
        {label}
        {required && <span className="text-safety"> *</span>}
        {optional && <span className="font-normal text-slate-500"> (optional)</span>}
      </label>
      <input id={name} name={name} type={type} required={required} className="field-input" />
    </div>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <p className="mt-5 rounded-md border border-alert/40 bg-alert/10 px-4 py-3 text-sm text-red-200">
      {message}
    </p>
  );
}

export function SuccessCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-safety/40 bg-navy-light p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-safety text-navy">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-2xl font-extrabold text-white">{title}</h3>
      <p className="mt-3 leading-relaxed text-slate-300">{body}</p>
    </div>
  );
}
