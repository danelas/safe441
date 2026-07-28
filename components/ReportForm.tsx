"use client";

import { FormEvent } from "react";
import { useSubmit } from "./useSubmit";
import { ErrorNote, SuccessCard } from "./CoalitionForm";

const CONCERNS = [
  "Speeding",
  "Dangerous crossing",
  "Turning conflict",
  "Poor lighting",
  "Bus-stop access",
  "Sidewalk problem",
  "Bicycle danger",
  "Crash",
  "Near miss",
  "Signal timing",
  "Driveway or parking-lot access",
  "Visibility obstruction",
  "Other",
];

const MODES = ["Walking", "Driving", "Cycling", "Riding transit", "Working nearby"];

export default function ReportForm() {
  const { status, message, submit } = useSubmit("/api/report");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      location: fd.get("location"),
      direction: fd.get("direction"),
      concern_type: fd.get("concern_type"),
      observed_at: fd.get("observed_at"),
      repeats: fd.get("repeats"),
      travel_mode: fd.get("travel_mode"),
      description: fd.get("description"),
      media_url: fd.get("media_url"),
      reported_to_agency: fd.get("reported_to_agency"),
      agency_case_number: fd.get("agency_case_number"),
      name: fd.get("name"),
      email: fd.get("email"),
      permission_contact: fd.get("permission_contact") === "on",
      permission_media: fd.get("permission_media") === "on",
      public_display: fd.get("public_display"),
    };
    await submit(payload);
  }

  if (status === "success") {
    return (
      <section id="report" className="section border-y border-white/10 bg-navy-light">
        <div className="container-content">
          <SuccessCard
            title="Report received."
            body="Thank you. Your report will be reviewed as evidence for the campaign. Remember: for an active emergency, always call 911."
          />
        </div>
      </section>
    );
  }

  return (
    <section id="report" className="section">
      <div className="container-content">
        <p className="eyebrow">Help identify dangerous locations</p>
        <h2 className="h2 max-w-3xl">
          People who use 441 every day often know where the danger is first.
        </h2>
        <p className="lede mt-5 max-w-3xl">
          Tell us about a dangerous crossing, a bus stop without safe access,
          speeding, poor lighting, a difficult turn, a blocked sidewalk, or any
          place where crashes or near misses repeatedly occur.
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-lg border-l-4 border-alert bg-alert/10 p-4 text-sm text-red-100">
          <span className="font-extrabold text-alert">!</span>
          <p>
            <strong>Do not use this website to report an emergency</strong> or an
            active dangerous situation. Call 911 when immediate police, fire, or
            medical assistance is needed.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 rounded-xl border border-white/10 bg-navy-light p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="location" required>
                Intersection or nearest address
              </Label>
              <input id="location" name="location" required className="field-input" />
            </div>

            <div>
              <Label htmlFor="direction">Direction of travel</Label>
              <input
                id="direction"
                name="direction"
                className="field-input"
                placeholder="e.g. Southbound"
              />
            </div>

            <div>
              <Label htmlFor="concern_type" required>
                Type of concern
              </Label>
              <select id="concern_type" name="concern_type" required className="field-input">
                <option value="">Select a category…</option>
                {CONCERNS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="observed_at">Date and approximate time observed</Label>
              <input id="observed_at" name="observed_at" className="field-input" placeholder="e.g. Weekday evenings, ~6pm" />
            </div>

            <div>
              <Label htmlFor="repeats">Does this happen repeatedly?</Label>
              <select id="repeats" name="repeats" className="field-input">
                <option value="">Select…</option>
                <option>Yes, repeatedly</option>
                <option>Occasionally</option>
                <option>Once</option>
                <option>Not sure</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="travel_mode">
                Were you walking, driving, cycling, riding transit, or working nearby?
              </Label>
              <select id="travel_mode" name="travel_mode" className="field-input">
                <option value="">Select…</option>
                {MODES.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="description" required>
                Description
              </Label>
              <textarea id="description" name="description" rows={4} required className="field-input" />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="media_url">Photo or video (link)</Label>
              <input
                id="media_url"
                name="media_url"
                type="url"
                className="field-input"
                placeholder="Paste a link to a photo or video, if any"
              />
              <p className="mt-1 text-xs text-slate-500">
                Direct file upload will be enabled as the evidence system is built.
                For now, share a link (e.g. cloud storage).
              </p>
            </div>

            <div>
              <Label htmlFor="reported_to_agency">Has this been reported to an agency?</Label>
              <select id="reported_to_agency" name="reported_to_agency" className="field-input">
                <option value="">Select…</option>
                <option>No</option>
                <option>Yes</option>
                <option>Not sure</option>
              </select>
            </div>

            <div>
              <Label htmlFor="agency_case_number">Agency report or case number</Label>
              <input id="agency_case_number" name="agency_case_number" className="field-input" />
            </div>

            <div>
              <Label htmlFor="name">Your name</Label>
              <input id="name" name="name" className="field-input" />
            </div>

            <div>
              <Label htmlFor="r_email">Your email</Label>
              <input id="r_email" name="email" type="email" className="field-input" />
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            <label className="check-row">
              <input type="checkbox" name="permission_contact" defaultChecked className="mt-0.5 accent-safety" />
              You may contact me about this report.
            </label>
            <label className="check-row">
              <input type="checkbox" name="permission_media" className="mt-0.5 accent-safety" />
              You may use the submitted media publicly (with sensitive details removed).
            </label>
          </div>

          <div className="mt-4">
            <Label htmlFor="public_display">Public display preference</Label>
            <select id="public_display" name="public_display" className="field-input sm:max-w-sm">
              <option value="">Select…</option>
              <option>Show the location only, not my identity</option>
              <option>Do not display this report publicly</option>
              <option>You may display this report and my first name</option>
            </select>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            We do not publicly display names, phone numbers, license plates, faces,
            medical details, or accusations against specific drivers.
          </p>

          {status === "error" && <ErrorNote message={message} />}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary mt-6 w-full disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Report a Location"}
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
