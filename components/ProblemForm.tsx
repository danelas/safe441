"use client";

import { useState } from "react";
import { useSubmit } from "./useSubmit";

const categories = [
  "Road safety",
  "Pedestrian safety",
  "Traffic signal",
  "Street lighting",
  "Sidewalk or accessibility",
  "Flooding or drainage",
  "Extreme heat or lack of shade",
  "Illegal dumping",
  "Vacant or unsafe property",
  "Park or recreation",
  "Public transit",
  "Public safety",
  "Government service delay",
  "Small-business issue",
  "Housing or home repair",
  "Youth opportunity",
  "Animal welfare",
  "Other",
];

export default function ProblemForm() {
  const { status, message, submit } = useSubmit("/api/problem");
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    city: "",
    zip: "",
    description: "",
    why_it_matters: "",
    first_noticed: "",
    ongoing: "",
    prior_reported: "",
    prior_agency: "",
    case_number: "",
    media_url: "",
    name: "",
    email: "",
    phone: "",
  });
  const [permContact, setPermContact] = useState(false);
  const [permPublishName, setPermPublishName] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [truthful, setTruthful] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-safety/40 bg-navy-light p-8 text-center">
        <p className="text-xl font-bold text-white">Report received. Thank you.</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
          Your submission has entered the review queue. Nothing publishes
          automatically — the team reviews every report before it appears
          publicly. If you provided an email, you&apos;ll receive a confirmation.
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
          permission_contact: permContact,
          permission_publish_name: permPublishName,
          agree_terms: agreeTerms,
          truth_confirmation: truthful,
        });
      }}
      className="space-y-5 rounded-lg border border-white/10 bg-navy-light p-6 sm:p-8"
    >
      <div className="rounded-md border border-alert/50 bg-alert/10 p-4 text-sm text-slate-200">
        <strong className="text-white">If someone is in immediate danger, call 911.</strong>{" "}
        Broward Forward is not an emergency-response service.
      </div>

      <div>
        <label className="field-label" htmlFor="p-title">
          Problem title <span className="text-safety">*</span>
        </label>
        <input
          id="p-title"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          className="field-input"
          placeholder="Short summary, e.g. 'Missing crosswalk at busy plaza entrance'"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="p-category">
            Category <span className="text-safety">*</span>
          </label>
          <select
            id="p-category"
            required
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="field-input"
          >
            <option value="">Select a category…</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="p-city">
            City <span className="text-safety">*</span>
          </label>
          <input
            id="p-city"
            required
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            className="field-input"
            placeholder="Hollywood, Davie, Fort Lauderdale…"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
        <div>
          <label className="field-label" htmlFor="p-location">
            Street address or location description <span className="text-safety">*</span>
          </label>
          <input
            id="p-location"
            required
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            className="field-input"
            placeholder="Address, intersection, or landmark"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="p-zip">
            ZIP (if known)
          </label>
          <input
            id="p-zip"
            value={form.zip}
            onChange={(e) => set("zip", e.target.value)}
            className="field-input"
            placeholder="33024"
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="p-description">
          What is happening? <span className="text-safety">*</span>
        </label>
        <textarea
          id="p-description"
          required
          rows={4}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="field-input"
          placeholder="Describe the problem in detail."
        />
      </div>

      <div>
        <label className="field-label" htmlFor="p-why">
          Why does it matter? <span className="text-safety">*</span>
        </label>
        <textarea
          id="p-why"
          required
          rows={3}
          value={form.why_it_matters}
          onChange={(e) => set("why_it_matters", e.target.value)}
          className="field-input"
          placeholder="Who is affected — children, seniors, pedestrians, businesses, emergency access?"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="p-noticed">
            When did you first notice it?
          </label>
          <input
            id="p-noticed"
            value={form.first_noticed}
            onChange={(e) => set("first_noticed", e.target.value)}
            className="field-input"
            placeholder="e.g. March 2026, or 'for years'"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="p-ongoing">
            Is the problem ongoing?
          </label>
          <select
            id="p-ongoing"
            value={form.ongoing}
            onChange={(e) => set("ongoing", e.target.value)}
            className="field-input"
          >
            <option value="">Select…</option>
            <option>Yes, ongoing</option>
            <option>Happens repeatedly</option>
            <option>One-time event</option>
            <option>Not sure</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="field-label" htmlFor="p-prior">
            Already reported to an agency?
          </label>
          <select
            id="p-prior"
            value={form.prior_reported}
            onChange={(e) => set("prior_reported", e.target.value)}
            className="field-input"
          >
            <option value="">Select…</option>
            <option>Yes</option>
            <option>No</option>
            <option>Not sure</option>
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="p-agency">
            Which agency, if known
          </label>
          <input
            id="p-agency"
            value={form.prior_agency}
            onChange={(e) => set("prior_agency", e.target.value)}
            className="field-input"
            placeholder="City, county, FDOT…"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="p-case">
            Case number, if any
          </label>
          <input
            id="p-case"
            value={form.case_number}
            onChange={(e) => set("case_number", e.target.value)}
            className="field-input"
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="p-media">
          Link to photos or video (optional)
        </label>
        <input
          id="p-media"
          value={form.media_url}
          onChange={(e) => set("media_url", e.target.value)}
          className="field-input"
          placeholder="Google Drive, Dropbox, YouTube, or social link"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="field-label" htmlFor="p-name">
            Your name <span className="text-safety">*</span>
          </label>
          <input
            id="p-name"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="p-email">
            Email <span className="text-safety">*</span>
          </label>
          <input
            id="p-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="p-phone">
            Phone (optional)
          </label>
          <input
            id="p-phone"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="field-input"
          />
        </div>
      </div>

      <div className="space-y-3 border-t border-white/10 pt-5">
        <label className="check-row">
          <input
            type="checkbox"
            checked={permContact}
            onChange={(e) => setPermContact(e.target.checked)}
            className="mt-0.5"
          />
          You may contact me about this report.
        </label>
        <label className="check-row">
          <input
            type="checkbox"
            checked={permPublishName}
            onChange={(e) => setPermPublishName(e.target.checked)}
            className="mt-0.5"
          />
          You may publish my name with this report. (Your contact details are
          never published.)
        </label>
        <label className="check-row">
          <input
            type="checkbox"
            required
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            I understand Broward Forward is not an emergency or government service,
            submissions are reviewed before appearing publicly, and selection or
            resolution is not guaranteed. <span className="text-safety">*</span>
          </span>
        </label>
        <label className="check-row">
          <input
            type="checkbox"
            required
            checked={truthful}
            onChange={(e) => setTruthful(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            The information I&apos;m submitting is truthful to the best of my
            knowledge. <span className="text-safety">*</span>
          </span>
        </label>
      </div>

      {status === "error" && (
        <p className="text-sm font-semibold text-alert">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Submit Report"}
      </button>
    </form>
  );
}
