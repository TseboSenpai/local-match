// Paired horizontal bars (generic vs local-aware), drawn with plain HTML and CSS.
// Bar length = value ÷ axisMax. The number is printed next to each bar.

export type BarGroup = { label: string; generic: number; local: number };

function Bar({ value, axisMax, kind }: { value: number; axisMax: number; kind: "generic" | "local" }) {
  // 3.5rem is kept free on the right so the number always fits beside the bar.
  const width = `calc((100% - 3.5rem) * ${Math.min(value / axisMax, 1)})`;
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-3.5 rounded-r-[3px] lg:h-[18px] ${kind === "local" ? "bg-accent" : "bg-generic-bar"}`}
        style={{ width }}
      />
      <span className={`font-mono text-xs lg:text-[13px] ${kind === "local" ? "font-semibold text-accent" : "text-muted"}`}>
        {value.toFixed(3)}
      </span>
    </div>
  );
}

export default function BarChart({ groups, axisMax }: { groups: BarGroup[]; axisMax: number }) {
  return (
    <figure className="rounded-xl border border-border bg-surface p-4 lg:p-6">
      <figcaption className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-text-2 lg:mb-5 lg:text-[13px]">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-generic-bar" />
          Generic
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-accent" />
          Local-aware
        </span>
      </figcaption>
      <div className="flex flex-col gap-[18px] lg:gap-[22px]">
        {groups.map((g) => (
          <div key={g.label} className="grid items-center gap-x-4 gap-y-1.5 lg:grid-cols-[130px_minmax(0,1fr)]">
            <p className="text-[13px] font-semibold lg:text-sm">{g.label}</p>
            <div className="flex flex-col gap-1">
              <Bar value={g.generic} axisMax={axisMax} kind="generic" />
              <Bar value={g.local} axisMax={axisMax} kind="local" />
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
