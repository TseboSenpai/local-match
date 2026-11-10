"use client";
// The "What local knowledge changes" demo: one advert, one job seeker,
// and a Generic / Local-aware switch that changes what each requirement row shows.

import { useState } from "react";

type Row = {
  ask: string; // what the advert asks for
  has: string; // what the job seeker has
  genericNote: string;
  localNote: string;
};

const rows: Row[] = [
  {
    ask: "Grade 12 or NC(V) Level 4",
    has: "NC(V) Level 4 in Office Administration",
    genericNote: "Read as plain words. NC(V) is not in ESCO, so it is not treated as a qualification.",
    localNote: "Qualification met. NC(V) Level 4 counts as Grade 12.",
  },
  {
    ask: "Valid Code 08 driver’s licence",
    has: "Code 10 licence",
    genericNote: "“Code 10” and “Code 08” look like different text, so the licence looks wrong.",
    localNote: "Licence met. A Code 10 licence covers Code 08 vehicles.",
  },
  {
    ask: "PERSAL and BAS (an advantage)",
    has: "Not listed",
    genericNote: "Unknown terms, so they are ignored.",
    localNote:
      "Recognised as government payroll and finance systems, and flagged as a gap that short local training can close.",
  },
  {
    ask: "Where the job is",
    has: "Lives in Lebowakgomo; can work in Capricorn or Sekhukhune",
    genericNote: "Location is not considered.",
    localNote: "The job’s district is checked against where the seeker can work.",
  },
];

const label = "mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-muted";
const sample = "font-mono text-[13px] leading-[1.65] lg:text-sm";
const pill = "inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold";

export default function ModeToggle() {
  const [mode, setMode] = useState<"generic" | "local">("local");
  const local = mode === "local";

  const button = (pressed: boolean, activeColours: string) =>
    [
      "min-h-11 cursor-pointer rounded-md px-4 text-sm",
      pressed ? `${activeColours} font-semibold text-on-accent` : "font-medium text-muted hover:text-text",
    ].join(" ");

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="grid border-b border-border md:grid-cols-2">
        <div className="p-4 lg:p-5">
          <p className={label}>Job advert</p>
          <p className={sample}>
            Grade 12 or NC(V) Level 4. A valid Code 08 driver’s licence. Knowledge of PERSAL and BAS will be an
            advantage.
          </p>
        </div>
        <div className="border-t border-border p-4 md:border-l md:border-t-0 lg:p-5">
          <p className={label}>Job seeker</p>
          <p className={sample}>
            NC(V) Level 4 in Office Administration, Code 10 licence, lives in Lebowakgomo, can work in Capricorn or
            Sekhukhune.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 lg:px-5 lg:py-4">
        <p className="hidden text-sm font-semibold sm:block">Matching mode</p>
        <div
          role="group"
          aria-label="Matching mode"
          className="grid w-full grid-cols-2 gap-0.5 rounded-lg border border-border bg-bg p-[3px] sm:w-auto"
        >
          <button type="button" aria-pressed={!local} onClick={() => setMode("generic")} className={button(!local, "bg-text")}>
            Generic
          </button>
          <button type="button" aria-pressed={local} onClick={() => setMode("local")} className={button(local, "bg-accent")}>
            Local-aware
          </button>
        </div>
      </div>

      {/* aria-live lets screen readers announce the rows when the mode changes */}
      <div aria-live="polite">
        {rows.map((row) => (
          <div key={row.ask} className="flex flex-wrap gap-x-5 gap-y-2 border-b border-border-subtle px-4 py-3.5 last:border-b-0 lg:px-5 lg:py-4">
            <div className="min-w-0 flex-[1_1_220px]">
              <p className="text-sm font-semibold">{row.ask}</p>
              <p className="mt-0.5 text-[13px] text-muted">Seeker: {row.has}</p>
            </div>
            <div className="flex min-w-0 flex-[2_1_320px] flex-col items-start gap-2 sm:flex-row sm:gap-3">
              {local ? (
                <span className={`${pill} bg-accent text-on-accent`}>
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 6.5l2.5 2.5L10 3" />
                  </svg>
                  Recognised
                </span>
              ) : (
                <span className={`${pill} border border-[#5A5A5C] text-muted`}>
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3l6 6M9 3l-6 6" />
                  </svg>
                  Missed
                </span>
              )}
              <p className="text-sm leading-normal text-text-2">{local ? row.localNote : row.genericNote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
