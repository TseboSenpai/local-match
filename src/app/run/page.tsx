import type { Metadata } from "next";
import Link from "next/link";
import CopyBlock from "@/components/CopyBlock";
import PageFrame from "@/components/PageFrame";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Run it" };

// The folder that `git clone` creates is the last part of "owner/name".
const folder = site.repo.split("/")[1];
const cloneUrl = `${site.githubUrl}.git`;

const colabSetup = `!git clone ${cloneUrl}
%cd ${folder}
!pip install -q -r requirements.txt`;

const localSetup = `git clone ${cloneUrl}
cd ${folder}
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
jupyter lab`;

const card = "rounded-xl border bg-surface p-5 lg:p-6";
const h2 = "text-[22px] font-bold tracking-[-0.01em] lg:text-2xl";
const steps = "mb-[18px] flex list-decimal flex-col gap-1.5 pl-[22px] text-text-2";
const navCard = "block rounded-[10px] border border-border px-[18px] py-4 text-text hover:border-border-strong";

export default function RunItPage() {
  return (
    <PageFrame>
      <div className="max-w-[860px]">
        <p className="mb-2.5 text-[13px] text-muted lg:mb-3">Docs / Run it</p>
        <h1 className="mb-3 text-[34px] font-extrabold leading-[1.1] tracking-[-0.025em] lg:text-[44px]">Run it</h1>
        <p className="mb-8 text-[17px] leading-normal text-text-2 lg:mb-10 lg:text-[19px]">
          Two ways to run the notebooks. Colab is the quickest — nothing to install. Run the notebooks in order, 01 to
          05.
        </p>

        <section id="colab" className={`${card} mb-5 scroll-mt-6 border-accent`}>
          <div className="mb-3.5 flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
            <h2 className={h2}>Google Colab</h2>
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-on-accent">Recommended</span>
          </div>
          <p className="mb-4 text-text-2">Runs in your browser on Google’s computers. You need a Google account.</p>
          <ol className={steps}>
            <li>
              Open any notebook page and click <strong className="text-text">Open in Colab</strong>.
            </li>
            <li>Add a new cell at the top, paste the setup below, and run it to get the data and libraries.</li>
            <li>
              Choose <strong className="text-text">Runtime → Run all</strong>.
            </li>
          </ol>
          <CopyBlock label="Colab cell" code={colabSetup} />
          <p className="mt-4 text-sm text-muted">
            Start here:{" "}
            <Link href="/notebooks/01/" className="text-accent hover:text-accent-hover">
              notebook 01
            </Link>
            . The first run of notebook 04 downloads a language model of about 90 MB.
          </p>
        </section>

        <section id="local" className={`${card} mb-12 scroll-mt-6 border-border`}>
          <h2 className={`mb-3.5 ${h2}`}>Your own computer</h2>
          <p className="mb-4 text-text-2">
            For working offline or changing the code. You need Python 3.11 or newer and Git.
          </p>
          <ol className={steps}>
            <li>Clone the repository and create a virtual environment.</li>
            <li>Install the libraries.</li>
            <li>Start JupyterLab, open the <span className="font-mono text-sm">notebooks/</span> folder and run them in order.</li>
          </ol>
          <CopyBlock label="Terminal" code={localSetup}>
            {`git clone ${cloneUrl}
cd ${folder}
python -m venv .venv
source .venv/bin/activate      `}
            <span className="text-muted"># Windows: .venv\Scripts\activate</span>
            {`
pip install -r requirements.txt
jupyter lab`}
          </CopyBlock>
        </section>

        <nav aria-label="Pages" className="grid gap-3 sm:grid-cols-2">
          <Link href="/results/" className={navCard}>
            <span className="block text-[13px] text-muted">← Previous</span>
            <span className="font-semibold">Results</span>
          </Link>
          <Link href="/about/" className={`${navCard} sm:text-right`}>
            <span className="block text-[13px] text-muted">Next →</span>
            <span className="font-semibold text-accent">About</span>
          </Link>
        </nav>
      </div>
    </PageFrame>
  );
}
