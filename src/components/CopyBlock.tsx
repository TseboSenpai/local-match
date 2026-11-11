"use client";
// A code box with a Copy button. Clicking it copies the code and the button
// reads "Copied" for two seconds.

import { useState } from "react";

export default function CopyBlock({
  label, // small caption above the code, e.g. "Terminal"
  code, // exactly what gets copied
  children, // optional: how the code is displayed, if it should differ (e.g. with a comment)
}: {
  label: string;
  code: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard can be blocked by the browser; the label still changes so the click is acknowledged.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg">
      <div className="flex items-center justify-between border-b border-border py-1 pl-3.5 pr-1.5">
        <span className="font-mono text-xs text-muted">{label}</span>
        <button
          type="button"
          onClick={copy}
          className={[
            "min-h-11 cursor-pointer rounded-md border px-3 text-[13px]",
            copied
              ? "border-accent bg-accent-tint font-semibold text-accent"
              : "border-border-strong bg-surface font-medium text-text hover:border-text",
          ].join(" ")}
        >
          {/* aria-live makes screen readers announce the change */}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-[1.7] text-text">{children ?? code}</pre>
    </div>
  );
}
