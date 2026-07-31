"use client";

import { useState } from "react";
import { useSubmit } from "./useSubmit";

export default function BusinessForm() {
  const { status, message, submit } = useSubmit("/api/business");
  const [form, setForm] = useState({
    business_name: "",
    owner_name: "",
    category: "",
    address: "",
    website: "",
    social_links: "",
    years_in_business: "",
    employee_count: "",
    main_challenge: "",
    requested_help: "",
    selection_reason: "",
    availability: "",
    email: "",
    phone: "",
  });
  const [filmOk, setFilmOk] = useState(false);
  const [metricsOk, setMetricsOk] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-safety/40 bg-navy-light p-8 text-center">
        <p className="text-xl font-bold text-white">Application received.</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
          Thank you. We review every application and will reach out if your
          business is selected for an upcoming round. There is no cost to apply.
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
          filming_permission: filmOk,
          metrics_permission: metricsOk,
        });
      }}
      className="space-y-5 rounded-lg border border-white/10 bg-navy-light p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="b-name">
            Business name <span className="text-safety">*</span>
          </label>
          <input
            id="b-name"
            required
            value={form.business_name}
            onChange={(e) => set("business_name", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="b-owner">
            Owner name <span className="text-safety">*</span>
          </label>
          <input
            id="b-owner"
            required
            value={form.owner_name}
            onChange={(e) => set("owner_name", e.target.value)}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="b-category">
            Business category <span className="text-safety">*</span>
          </label>
          <input
            id="b-category"
            required
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="field-input"
            placeholder="Restaurant, salon, auto shop, retail…"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="b-address">
            Address (city at minimum) <span className="text-safety">*</span>
          </label>
          <input
            id="b-address"
            required
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="b-website">
            Website (if any)
          </label>
          <input
            id="b-website"
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
            className="field-input"
            placeholder="https://…"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="b-social">
            Social media links
          </label>
          <input
            id="b-social"
            value={form.social_links}
            onChange={(e) => set("social_links", e.target.value)}
            className="field-input"
            placeholder="Instagram, Facebook, TikTok…"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="b-years">
            Years in business
          </label>
          <input
            id="b-years"
            value={form.years_in_business}
            onChange={(e) => set("years_in_business", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="b-employees">
            Number of employees
          </label>
          <input
            id="b-employees"
            value={form.employee_count}
            onChange={(e) => set("employee_count", e.target.value)}
            className="field-input"
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="b-challenge">
          What is your main challenge right now? <span className="text-safety">*</span>
        </label>
        <textarea
          id="b-challenge"
          required
          rows={3}
          value={form.main_challenge}
          onChange={(e) => set("main_challenge", e.target.value)}
          className="field-input"
          placeholder="Not enough customers, outdated website, no online presence…"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="b-help">
          What help would make the biggest difference? <span className="text-safety">*</span>
        </label>
        <textarea
          id="b-help"
          required
          rows={3}
          value={form.requested_help}
          onChange={(e) => set("requested_help", e.target.value)}
          className="field-input"
          placeholder="Promo video, website refresh, Google listing cleanup, photography…"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="b-why">
          Why should your business be selected?
        </label>
        <textarea
          id="b-why"
          rows={3}
          value={form.selection_reason}
          onChange={(e) => set("selection_reason", e.target.value)}
          className="field-input"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="b-avail">
          Availability for filming / work sessions
        </label>
        <input
          id="b-avail"
          value={form.availability}
          onChange={(e) => set("availability", e.target.value)}
          className="field-input"
          placeholder="Weekday mornings, weekends…"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="b-email">
            Contact email <span className="text-safety">*</span>
          </label>
          <input
            id="b-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="b-phone">
            Contact phone
          </label>
          <input
            id="b-phone"
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
            checked={filmOk}
            onChange={(e) => setFilmOk(e.target.checked)}
            className="mt-0.5"
          />
          I give permission to film at my business if selected.
        </label>
        <label className="check-row">
          <input
            type="checkbox"
            checked={metricsOk}
            onChange={(e) => setMetricsOk(e.target.checked)}
            className="mt-0.5"
          />
          I&apos;m open to sharing before-and-after results (calls, visits,
          reviews) publicly if selected.
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
        {status === "submitting" ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
