import type { Metadata } from "next";
import Link from "next/link";
import PageFrame from "@/components/PageFrame";
import { notebooks } from "@/content/site";

export const metadata: Metadata = { title: "Pipeline" };

const inputs = [
  { name: "Job adverts", text: "427 Limpopo adverts from DPSA circulars and PNet" },
  { name: "ESCO v1.2.1", text: "European skills and occupations taxonomy" },
  { name: "Local layer", text: "SA credentials, equivalence rules, locations" },
  // 35 rows in data/raw/local/training_options.csv
  { name: "Training options", text: "35 Limpopo training options, compiled from official sources" },
];

const outputs = [
  { name: "Ranked jobs", text: "Top 10 per job seeker, in both modes" },
  { name: "Quality metrics", text: "NDCG@10, Precision@10, Recall@10" },
  { name: "Fairness", text: "Results by gender, age, education level and district" },
  { name: "Training pathways", text: "Local training that closes a job’s gaps" },
];

const columnLabel = "mb-1 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-muted";

// Points right on wide screens, down on phones (where the columns stack).
function Arrow() {
  return (
    <div aria-hidden="true" className="flex flex-none items-center justify-center py-1 text-generic-bar lg:w-8 lg:py-0">
      <svg className="rotate-90 lg:rotate-0" width="32" height="16" viewBox="0 0 32 16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 8h26M22 2l6 6-6 6" />
      </svg>
    </div>
  );
}

export default function PipelinePage() {
  return (
    <PageFrame>
      <div className="max-w-[1040px]">
        <p className="mb-2.5 text-[13px] text-muted lg:mb-3">Docs / Pipeline</p>
        <h1 className="mb-3 text-[34px] font-extrabold leading-[1.1] tracking-[-0.025em] lg:text-[44px]">Pipeline</h1>
        <p className="mb-8 max-w-[760px] text-[17px] leading-normal text-text-2 lg:mb-10 lg:text-[19px]">
          Four inputs go in, five notebooks run in order, and four outputs come out. Each notebook reads the files the
          one before it writes, so you can run them one by one.
        </p>

        {/* The diagram: three columns on wide screens, stacked on phones */}
        <div className="mb-12 flex flex-col gap-3 lg:mb-16 lg:flex-row lg:items-stretch lg:gap-4">
          <section aria-labelledby="inputs-h" className="flex min-w-0 flex-1 flex-col gap-2.5">
            <p id="inputs-h" className={columnLabel}>Inputs</p>
            {inputs.map((item) => (
              <div key={item.name} className="rounded-[10px] border border-border bg-surface px-4 py-3.5">
                <p className="text-[15px] font-semibold">{item.name}</p>
                <p className="mt-0.5 text-[13px] leading-[1.45] text-muted">{item.text}</p>
              </div>
            ))}
          </section>

          <Arrow />

          <section aria-labelledby="notebooks-h" className="flex min-w-0 flex-[1.3] flex-col">
            <p id="notebooks-h" className={`${columnLabel} mb-2.5`}>Notebooks</p>
            {notebooks.map((nb, i) => (
              <div key={nb.id}>
                {/* short line joining one notebook to the next */}
                {i > 0 && <div aria-hidden="true" className="my-1.5 ml-6 h-2.5 w-0.5 bg-border-strong" />}
                <Link
                  href={`/notebooks/${nb.id}/`}
                  className="flex min-h-12 items-center gap-3 rounded-[10px] border border-border bg-surface px-3.5 py-3 text-text hover:border-border-strong"
                >
                  <span className="font-mono text-[13px] font-semibold text-accent">{nb.id}</span>
                  <span className="text-[15px] font-semibold">{nb.title}</span>
                </Link>
              </div>
            ))}
          </section>

          <Arrow />

          <section aria-labelledby="outputs-h" className="flex min-w-0 flex-1 flex-col gap-2.5">
            <p id="outputs-h" className={columnLabel}>Outputs</p>
            {outputs.map((item) => (
              <div
                key={item.name}
                className="rounded-[10px] border border-border bg-surface px-4 py-3.5"
              >
                <p className="text-[15px] font-semibold">{item.name}</p>
                <p className="mt-0.5 text-[13px] leading-[1.45] text-muted">{item.text}</p>
              </div>
            ))}
          </section>
        </div>

        <h2 className="mb-4 text-[22px] font-bold tracking-[-0.015em] lg:text-[26px]">Stage by stage</h2>
        <div className="mb-12 border-t border-border">
          {notebooks.map((nb) => (
            <Link
              key={nb.id}
              href={`/notebooks/${nb.id}/`}
              className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-border py-[18px] text-text"
            >
              <span className="w-12 flex-none font-mono font-semibold text-accent">{nb.id}</span>
              <span className="flex-[1_1_220px] font-semibold group-hover:text-accent-hover">{nb.title}</span>
              <span className="flex-[2_1_320px] text-[15px] text-muted">{nb.summary}</span>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-3">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-lg border border-border px-[18px] text-text hover:border-border-strong">
            ← Overview
          </Link>
          <Link
            href="/notebooks/01/"
            className="inline-flex min-h-11 items-center rounded-lg bg-accent px-[18px] font-semibold text-on-accent hover:bg-accent-hover"
          >
            Start with notebook 01 →
          </Link>
        </div>
      </div>
    </PageFrame>
  );
}
