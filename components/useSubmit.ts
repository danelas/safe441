"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function useSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function submit(payload: Record<string, unknown>) {
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return false;
      }
      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
      return false;
    }
  }

  return { status, message, submit };
}
