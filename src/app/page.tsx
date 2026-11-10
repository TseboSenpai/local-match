import Link from "next/link";
import BarChart from "@/components/BarChart";
import ModeToggle from "@/components/ModeToggle";

// Headline numbers. Sources in the research repo:
//   results/05_main_results.csv      NDCG@10, P@10, R@10 (test set, 480 job seekers)
//   notebooks/02_local_vocabulary    81% of adverts use SA-specific credentials or terms
//   results/05_training_pathways.csv 92% of top-three recommendations
const stats = [
  { value: "+43%", text: "recommendation quality", detail: "NDCG@10 0.243 → 0.348", highlight: true },
  { value: "1.9×", text: "suitable, reachable jobs in each top 10" },
  { value: "81%", text: "of Limpopo adverts use South African credentials or terms" },
  { value: "92%", text: "of top-three recommendations usable now or after local training" },
];

const mainResults = [
  { label: "NDCG@10", generic: 0.243, local: 0.348 },
  { label: "Precision@10", generic: 0.104, local: 0.193 },
  { label: "Recall@10", generic: 0.221, local: 0.489 },
];

const ingredients = [
  { name: "ESCO v1.2.1 skills taxonomy", generic: true },
  { name: "Text similarity between advert and profile", generic: true },
  { name: "South African credentials — matric, NC(V), N-levels, licence codes, professional registrations", generic: false },
  { name: "Equivalence rules — e.g. NC(V) Level 4 = Grade 12; Code 10 covers Code 08", generic: false },
  { name: "The job seeker’s location and where they can work", generic: false },
];

const nextLinks = [
  { href: "/pipeline/", title: "See the pipeline →", text: "How data flows through the five notebooks." },
  { href: "/notebooks/01/", title: "Start with notebook 01 →", text: "Walk through the work step by step." },
  { href: "/run/", title: "How to run it →", text: "Colab, Binder or your own computer." },
];

const h2 = "text-[22px] font-bold tracking-[-0.015em] lg:text-[26px]";
const section = "mb-12 lg:mb-16";

export default function OverviewPage() {
  return (
    <div className="max-w-[860px]">
      <p className="mb-2.5 text-[13px] text-muted lg:mb-3">Docs / Overview</p>
      <h1 className="mb-3 text-[34px] font-extrabold leading-[1.1] tracking-[-0.025em] lg:mb-3.5 lg:text-5xl lg:leading-[1.08]">
        Local-Aware AI Job Matching
      </h1>
      <p className="mb-3.5 text-[17px] leading-normal text-ink-2 lg:mb-5 lg:text-xl">
        An AI job-matching system that uses local knowledge — South African credentials, equivalence rules and
        location — to recommend fairer, more relevant jobs and training to job seekers in Limpopo.
      </p>
      <p className="mb-5 text-[13px] leading-normal text-muted lg:mb-10 lg:text-sm">
        Tsebo Molatelo Molope · Honours in Computer Science (HRCOS82) · University of South Africa · 2026
      </p>
      <Link
        href="/run/"
        className="mb-8 flex min-h-12 items-center justify-center rounded-lg bg-accent font-semibold text-on-accent lg:hidden"
      >
        Open in Colab
      </Link>

      <div className={`grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3 ${section}`}>
        {stats.map((s) => (
          <div
            key={s.value}
            className={`rounded-[10px] p-4 lg:p-5 ${s.highlight ? "bg-accent text-on-accent" : "border border-line bg-surface"}`}
          >
            <p className="text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] lg:text-4xl">{s.value}</p>
            <p className={`mt-1.5 text-[13px] leading-[1.45] lg:mt-2 lg:text-sm ${s.highlight ? "font-medium" : "text-ink-2"}`}>
              {s.text}
            </p>
            {s.detail && <p className="mt-1.5 font-mono text-[11px] lg:text-xs">{s.detail}</p>}
          </div>
        ))}
      </div>

      <section className={section}>
        <h2 className={`mb-3 ${h2}`}>The problem</h2>
        <p className="mb-4 text-ink-2">
          Most job platforms match people to jobs using international skills lists and how similar the words in a CV
          are to the words in an advert. That misses how hiring works in Limpopo. Adverts ask for Grade 12, NC(V)
          levels, N-levels, driver’s licence codes and professional registrations, and they expect candidates who can
          reach the workplace.
        </p>
        <p className="text-ink-2">
          A system that can’t read these signals can rank a qualified local job seeker below someone who simply used
          the same words as the advert. This project tests what changes when the matcher understands them. It was
          tested on <strong className="text-ink">427 real Limpopo job adverts</strong> (DPSA vacancy circulars and
          PNet) and <strong className="text-ink">600 synthetic job seekers</strong>.
        </p>
      </section>

      <section className={section}>
        <h2 className={`mb-2 ${h2}`}>What local knowledge changes</h2>
        <p className="mb-5 text-ink-2">One advert, one job seeker. Switch modes to see what each one recognises.</p>
        <ModeToggle />
      </section>

      <section className={section}>
        <h2 className={`mb-2 ${h2}`}>Two modes, one algorithm</h2>
        <p className="mb-5 text-ink-2">
          Both modes run the same matching algorithm. The local-aware mode adds a layer of South African knowledge on
          top, so any difference in results comes from that layer alone.
        </p>
        {/* overflow-x-auto: on narrow screens the table scrolls sideways inside its box */}
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="bg-surface text-left">
                <th scope="col" className="px-5 py-3 font-semibold">Ingredient</th>
                <th scope="col" className="w-[130px] px-5 py-3 font-semibold text-muted">Generic</th>
                <th scope="col" className="w-[130px] px-5 py-3 font-semibold text-accent">Local-aware</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((row) => (
                <tr key={row.name} className="border-t border-line-subtle">
                  <td className="px-5 py-3">{row.name}</td>
                  <td className={`px-5 py-3 ${row.generic ? "" : "text-muted"}`}>{row.generic ? "Yes" : "No"}</td>
                  <td className={`px-5 py-3 ${row.generic ? "" : "font-bold text-accent"}`}>Yes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={section}>
        <h2 className={`mb-2 ${h2}`}>Generic vs local-aware</h2>
        <p className="mb-5 text-ink-2">
          Average scores across the 480 synthetic job seekers in the test set. Higher is better on all three.
        </p>
        <BarChart groups={mainResults} axisMax={0.5} />
        <div className="mt-3 rounded-[10px] border border-line px-4 py-3.5 text-[13px] leading-[1.55] text-ink-2 lg:mt-4 lg:px-5 lg:py-4 lg:text-sm">
          <p className="mb-1.5">
            <strong className="text-ink">NDCG@10</strong> — how well the best-fitting jobs are placed near the top of
            the 10 recommendations.
          </p>
          <p className="mb-1.5">
            <strong className="text-ink">Precision@10</strong> — the share of the 10 recommended jobs that are
            suitable.
          </p>
          <p>
            <strong className="text-ink">Recall@10</strong> — the share of all suitable jobs that make it into the top
            10.
          </p>
        </div>
      </section>

      <section>
        <h2 className={`mb-4 ${h2}`}>Where to next</h2>
        <div className="grid gap-2.5 md:grid-cols-3 lg:gap-3">
          {nextLinks.map((l) => (
            <Link key={l.href} href={l.href} className="block rounded-[10px] border border-line bg-surface p-4 hover:border-line-strong lg:p-5">
              <span className="mb-1 block font-bold text-accent">{l.title}</span>
              <span className="text-sm text-muted">{l.text}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
