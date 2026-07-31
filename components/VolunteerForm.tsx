"use client";

import { useState } from "react";
import { useSubmit } from "./useSubmit";
import { projects } from "@/lib/projects";

const skillOptions = [
  "Photography / video",
  "Research",
  "Data / spreadsheets",
  "Writing / editing",
  "Web / tech",
  "Design",
  "Translation",
  "Outreach / door-to-door",
  "Legal review",
  "Engineering / traffic",
  "Animal care",
  "Other",
];

export default function VolunteerForm() {
  const { status, message, submit } = useSubmit("/api/volunteer");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    availability: "",
    languages: "",
    message: "",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [prefs, setPrefs] = useState<string[]>([]);
  const [permContact, setPermContact] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggle(list: string[], setList: (v: string[]) => void, v: string) {
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-safety/40 bg-navy-light p-8 text-center">
        <p className="text-xl font-bold text-white">Thanks for stepping up.</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
          Your volunteer sign-up has been received. We&apos;ll contact you as
          projects that match your skills and interests get moving.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit({
          ...form,
          skills,
          project_preferences: prefs,
          permission_contact: permContact,
        });
      }}
      className="space-y-5 rounded-lg border border-white/10 bg-navy-light p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="v-name">
            Name <span className="text-safety">*</span>
          </label>
          <input
            id="v-name"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="v-email">
            Email <span className="text-safety">*</span>
          </label>
          <input
            id="v-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="v-phone">
            Phone (optional)
          </label>
          <input
            id="v-phone"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="v-city">
            City
          </label>
          <input
            id="v-city"
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            className="field-input"
          />
        </div>
      </div>

      <div>
        <p className="field-label">Skills</p>
        <div className="flex flex-wrap gap-2">
          {skillOptions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(skills, setSkills, s)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                skills.includes(s)
                  ? "border-safety bg-safety text-navy"
                  : "border-slate-600 text-slate-300 hover:border-safety hover:text-safety"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="field-label">Projects you&apos;re interested in</p>
        <div className="flex flex-wrap gap-2">
          {projects.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => toggle(prefs, setPrefs, p.name)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                prefs.includes(p.name)
                  ? "border-safety bg-safety text-navy"
                  : "border-slate-600 text-slate-300 hover:border-safety hover:text-safety"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="v-avail">
            Availability
          </label>
          <input
            id="v-avail"
            value={form.availability}
            onChange={(e) => set("availability", e.target.value)}
            className="field-input"
            placeholder="Evenings, weekends…"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="v-lang">
            Languages
          </label>
          <input
            id="v-lang"
            value={form.languages}
            onChange={(e) => set("languages", e.target.value)}
            className="field-input"
            placeholder="English, Spanish, Creole…"
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="v-message">
          Anything else you&apos;d like to share?
        </label>
        <textarea
          id="v-message"
          rows={3}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className="field-input"
        />
      </div>

      <label className="check-row border-t border-white/10 pt-5">
        <input
          type="checkbox"
          required
          checked={permContact}
          onChange={(e) => setPermContact(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          You may contact me about volunteering. <span className="text-safety">*</span>
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm font-semibold text-alert">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Sign Up to Volunteer"}
      </button>
    </form>
  );
}
