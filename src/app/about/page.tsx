import type { Metadata } from "next";
import Link from "next/link";
import PageFrame from "@/components/PageFrame";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About" };

// Where the data comes from. Taken from the "Data sources" section of the repository README.
const sources = [
  {
    name: "Job adverts",
    text: "Limpopo posts from the DPSA Public Service Vacancy Circulars 28 to 32, 34, 36 and 38 of 2026, and Limpopo adverts from PNet. The descriptions are structured summaries of the adverts, not the full text.",
    link: { href: "https://www.dpsa.gov.za/newsroom/psvc/", label: "DPSA vacancy circulars" },
  },
  {
    name: "ESCO v1.2.1",
    text: "The European Commission’s classification of skills, competences and occupations. This project uses the ESCO classification of the European Commission.",
    link: { href: "https://esco.ec.europa.eu", label: "esco.ec.europa.eu" },
  },
  {
    name: "Local layer",
    text: "The local vocabulary, equivalence rules and training options were compiled by the author from the job adverts and official sources. Each entry records its source, and entries that are still assumptions or estimates are marked as not verified.",
  },
];

// From requirements.txt in the research repository.
const tools = [
  { name: "pandas, NumPy, SciPy", text: "tables, numbers and the significance tests" },
  { name: "spaCy", text: "finding ESCO skill phrases in the adverts" },
  { name: "sentence-transformers", text: "text similarity, with the all-MiniLM-L6-v2 model" },
  { name: "scikit-learn", text: "fallback text similarity and helper functions" },
  { name: "Fairlearn", text: "fairness measures across groups" },
  { name: "Matplotlib", text: "the charts saved by the notebooks" },
  { name: "Jupyter", text: "the five notebooks themselves" },
];

const h2 = "mb-3 text-[22px] font-bold tracking-[-0.015em] lg:text-[26px]";
const section = "mb-12 lg:mb-16";
const row = "border-b border-border py-3.5 text-text-2";

export default function AboutPage() {
  return (
    <PageFrame>
      <div className="max-w-[860px]">
        <p className="mb-2.5 text-[13px] text-muted lg:mb-3">Docs / About</p>
        <h1 className="mb-3 text-[34px] font-extrabold leading-[1.1] tracking-[-0.025em] lg:text-[44px]">About</h1>
        <p className="mb-10 text-[17px] leading-normal text-text-2 lg:mb-12 lg:text-[19px]">
          Local-Aware AI Job Matching tests one question: do job recommendations get better and fairer when the
          matcher understands local qualifications, local workplace terms and where people can actually work?
        </p>

        <section className={section}>
          <h2 className={h2}>The project</h2>
          <p className="mb-4 text-text-2">
            Most job-matching systems are built on national or global data. They do not recognise local
            qualifications, ignore how far people can travel, and suggest training that is not available nearby. This
            project builds one matcher that runs in two modes, generic and local-aware, and compares them on 427 real
            Limpopo job adverts and 600 synthetic job seekers whose correct matches are known.
          </p>
          <p className="text-text-2">
            The whole pipeline is public to read and run: five notebooks, a small shared Python module, the local
            vocabulary and rules, and every table of results. Start with the{" "}
            <Link href="/pipeline/" className="text-accent hover:text-accent-hover">pipeline</Link> or go straight to
            the <Link href="/results/" className="text-accent hover:text-accent-hover">results</Link>.
          </p>
        </section>

        <section className={section}>
          <h2 className={h2}>Author</h2>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5">
            <div>
              <p className="text-lg font-bold">{site.author}</p>
              <p className="text-sm text-muted">Designed and built the pipeline, the local layer and this site.</p>
            </div>
            <a
              href={site.githubUrl}
              className="inline-flex min-h-11 items-center rounded-lg border border-border-strong px-[18px] font-medium text-text hover:border-text"
            >
              View the code on GitHub
            </a>
          </div>
        </section>

        <section className={section}>
          <h2 className={h2}>Data sources</h2>
          <ul className="border-t border-border">
            {sources.map((s) => (
              <li key={s.name} className={row}>
                <strong className="text-text">{s.name}.</strong> {s.text}{" "}
                {s.link && (
                  <a href={s.link.href} className="text-accent hover:text-accent-hover">
                    {s.link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-text-2">No personal data is used. All job seekers are synthetic.</p>
        </section>

        <section className={section}>
          <h2 className={h2}>Built with</h2>
          <p className="mb-4 text-text-2">The pipeline is written in Python and uses these open-source libraries:</p>
          <ul className="border-t border-border">
            {tools.map((t) => (
              <li key={t.name} className={`${row} flex flex-wrap gap-x-6 gap-y-0.5`}>
                <span className="flex-[0_0_220px] font-mono text-sm text-text">{t.name}</span>
                <span className="flex-[1_1_260px]">{t.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className={h2}>Licence</h2>
          <p className="text-text-2">
            Copyright © 2026 {site.author}. All rights reserved. The code is shared for viewing; it may not be copied,
            modified or reused without the author’s written permission. The full wording is in the repository’s
            README.
          </p>
        </section>

        <nav aria-label="Pages" className="grid gap-3 sm:grid-cols-2">
          <Link href="/run/" className="block rounded-[10px] border border-border px-[18px] py-4 text-text hover:border-border-strong">
            <span className="block text-[13px] text-muted">← Previous</span>
            <span className="font-semibold">Run it</span>
          </Link>
          <Link href="/" className="block rounded-[10px] border border-border px-[18px] py-4 text-text hover:border-border-strong sm:text-right">
            <span className="block text-[13px] text-muted">Back to →</span>
            <span className="font-semibold text-accent">Overview</span>
          </Link>
        </nav>
      </div>
    </PageFrame>
  );
}
