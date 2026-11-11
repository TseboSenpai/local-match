// One row of lime bars with a count printed beside each.
// Bar length = value ÷ the largest value.

export type CountBar = { label: string; value: number };

export default function CountChart({ title, caption, bars }: { title: string; caption: string; bars: CountBar[] }) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <figure className="rounded-xl border border-border bg-surface p-4 lg:p-6">
      <figcaption className="mb-[18px]">
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5 text-[13px] text-muted">{caption}</p>
      </figcaption>
      <div className="flex flex-col gap-2.5 text-sm">
        {bars.map((bar, i) => (
          <div key={bar.label} className="grid items-center gap-x-3.5 gap-y-1 sm:grid-cols-[190px_minmax(0,1fr)]">
            <span>{bar.label}</span>
            <div className="flex items-center gap-2">
              {/* 3rem is kept free on the right so the number always fits */}
              <div
                className="h-5 min-w-0.5 rounded-r-[3px] bg-accent"
                style={{ width: `calc((100% - 3rem) * ${bar.value / max})` }}
              />
              <span className={`font-mono text-[13px] ${i === 0 ? "font-semibold" : ""}`}>{bar.value.toLocaleString("en")}</span>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
