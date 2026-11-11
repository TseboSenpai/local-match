// The notebook page template. One file builds every notebook page:
// the content comes from src/content/notebooks/<id>.ts.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BarChart from "@/components/BarChart";
import CountChart from "@/components/CountChart";
import NotebookEmbed from "@/components/NotebookEmbed";
import PageFrame from "@/components/PageFrame";
import { getNotebookPage, notebookPages } from "@/content/notebooks";
import { notebooks, site } from "@/content/site";

// Tells the static build which notebook pages to create.
export function generateStaticParams() {
  return notebookPages.map((n) => ({ id: n.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/notebooks/[id]">): Promise<Metadata> {
  const { id } = await params;
  const info = notebooks.find((n) => n.id === id);
  return { title: info ? `${info.id} · ${info.title}` : "Notebook" };
}

const h2 = "text-[22px] font-bold tracking-[-0.01em]";
const label = "mb-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-muted";
const outlineButton =
  "inline-flex min-h-11 items-center rounded-lg border border-border-strong px-[18px] font-medium text-text hover:border-text";
const navCard = "block rounded-[10px] border border-border px-[18px] py-4 text-text hover:border-border-strong";

export default async function NotebookPage({ params }: PageProps<"/notebooks/[id]">) {
  const { id } = await params;
  const page = getNotebookPage(id);
  const index = notebooks.findIndex((n) => n.id === id);
  if (!page || index === -1) notFound();

  const info = notebooks[index];
  const previous = index > 0 ? notebooks[index - 1] : null;
  const next = index < notebooks.length - 1 ? notebooks[index + 1] : null;

  const colabUrl = `https://colab.research.google.com/github/${site.repo}/blob/main/${page.file}`;
  const githubUrl = `${site.githubUrl}/blob/main/${page.file}`;

  return (
    <PageFrame>
      <div className="max-w-[860px]">
        <p className="mb-2.5 text-[13px] text-muted lg:mb-3">Docs / Notebooks / {info.id}</p>
        <p className="mb-2.5 inline-block max-w-full break-all rounded-md border border-border bg-surface px-2.5 py-0.5 font-mono text-[13px] text-text-2">
          {page.file}
        </p>
        <h1 className="mb-3 text-[32px] font-extrabold leading-[1.1] tracking-[-0.025em] lg:text-[44px]">
          <span className="text-accent">{info.id}</span> · {info.title}
        </h1>
        <p className="mb-6 text-[17px] leading-normal text-text-2 lg:text-[19px]">{info.summary}</p>

        <div className="mb-12 flex flex-wrap gap-2.5">
          <a
            href={colabUrl}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-[18px] font-semibold text-on-accent hover:bg-accent-hover"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 3l8 5-8 5z" />
            </svg>
            Open in Colab
          </a>
          <a href={githubUrl} className={outlineButton}>View on GitHub</a>
        </div>

        <div className="mb-12 flex flex-wrap gap-4">
          <section className="min-w-0 flex-[3_1_340px]">
            <h2 className={`mb-2.5 ${h2}`}>Why it matters</h2>
            <p className="text-text-2">{page.whyItMatters}</p>
          </section>
          <section aria-label="Files" className="min-w-0 flex-[2_1_260px] rounded-[10px] border border-border bg-surface px-[18px] py-4 text-sm">
            <p className={label}>Reads</p>
            <ul className="mb-3.5 break-all font-mono text-[13px] text-text-2">
              {page.reads.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <p className={label}>Writes</p>
            <ul className="break-all font-mono text-[13px] text-accent">
              {page.writes.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </section>
        </div>

        <h2 className={`mb-4 ${h2}`}>What it does</h2>
        <ol className="mb-12 border-t border-border">
          {page.steps.map((step, i) => (
            <li key={step.title} className="flex gap-[18px] border-b border-border py-4">
              <span className="inline-flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-accent font-mono text-[13px] font-semibold text-on-accent">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{step.title}</p>
                <p className="mt-0.5 text-[15px] text-text-2">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className={`mb-4 ${h2}`}>What it found</h2>
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          {page.stats.map((stat, i) => (
            <div key={stat.value} className={`rounded-[10px] p-[18px] ${i === 0 ? "bg-accent text-on-accent" : "border border-border bg-surface"}`}>
              <p className="text-[32px] font-extrabold leading-[1.1]">{stat.value}</p>
              <p className={`mt-1.5 text-sm leading-[1.4] ${i === 0 ? "font-medium" : "text-text-2"}`}>{stat.text}</p>
            </div>
          ))}
        </div>
        {"groups" in page.chart ? <BarChart {...page.chart} /> : <CountChart {...page.chart} />}

        <aside className="mb-12 mt-8 flex gap-3.5 rounded-[10px] border border-border-strong px-[18px] py-4">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#D4FF3A" strokeWidth="1.8" className="mt-0.5 flex-none">
            <circle cx="10" cy="10" r="8" />
            <path d="M10 9v5M10 6v.5" />
          </svg>
          <div>
            <p className="mb-1 font-semibold">Good to know</p>
            <p className="text-[15px] text-text-2">{page.goodToKnow}</p>
          </div>
        </aside>

        <NotebookEmbed id={info.id} title={info.title} />

        <nav aria-label="Notebook pages" className="grid gap-3 sm:grid-cols-2">
          <Link href={previous ? `/notebooks/${previous.id}/` : "/pipeline/"} className={navCard}>
            <span className="block text-[13px] text-muted">← Previous</span>
            <span className="font-semibold">{previous ? `${previous.id} · ${previous.title}` : "Pipeline"}</span>
          </Link>
          <Link href={next ? `/notebooks/${next.id}/` : "/results/"} className={`${navCard} sm:text-right`}>
            <span className="block text-[13px] text-muted">Next →</span>
            <span className="font-semibold text-accent">{next ? `${next.id} · ${next.title}` : "Results"}</span>
          </Link>
        </nav>
      </div>
    </PageFrame>
  );
}
