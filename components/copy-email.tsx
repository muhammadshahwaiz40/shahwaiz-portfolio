"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 4000);
  };

  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <button type="button" className="btn btn-ghost" onClick={copy}>
        {state === "copied" ? "Copied" : "Copy email"}
      </button>
      <span role="status" aria-live="polite" className="muted text-sm">
        {state === "copied" && "Email address copied to clipboard."}
        {state === "failed" && "Couldn't copy. Select the address above instead."}
      </span>
    </span>
  );
}
