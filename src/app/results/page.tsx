import type { Metadata } from "next";
import Link from "next/link";
import BarChart from "@/components/BarChart";
import PageFrame from "@/components/PageFrame";
import { notebooks } from "@/content/site";

export const metadata: Metadata = { title: "Results" };

const sections = [
  { id: "overall", label: "Overall" },
  { id: "scenario", label: "By qualification scenario" },
  { id: "education", label: "By education level" },
  { id: "fairness", label: "Fairness" },
  { id: "training", label: "Training pathways" },
  { id: "limits", label: "Limitations" },
];

// ---- Data. Every number is from the research repo's results/ folder. ----

// results/05_main_results.csv, rows "full (family + eligible + reachable)".
// n = 480 test job seekers (Recall: the 386 who have at least one fully relevant job).
const overall = [
  { metric: "NDCG@10", generic: "0.243", local: "0.348", difference: "+0.106", ci: "0.081 to 0.131", change: "+43%" },
  { metric: "Precision@10", generic: "0.104", local: "0.193", difference: "+0.089", ci: "0.074 to 0.103", change: "+86%" },
  { metric: "Recall@10", generic: "0.221", local: "0.489", difference: "+0.268", ci: "0.232 to 0.306", change: "+121%" },
];

// results/05_by_scenario.csv (NDCG@10)
const byScenario = [
  { label: "Exact match", generic: 0.25, local: 0.413 },
  { label: "Equivalent", generic: 0.255, local: 0.313 },
  { label: "Under-qualified", generic: 0.221, local: 0.265 },
];

// results/05_fairness_by_group.csv, attribute = education_level (NDCG@10)
const byEducation = [
  { label: "Below matric", generic: 0.163, local: 0.495 },
  { label: "Matric / NC(V) L4", generic: 0.212, local: 0.34 },
  { label: "TVET or trade", generic: 0.231, local: 0.471 },
  { label: "Diploma", generic: 0.249, local: 0.313 },
  { label: "Degree or higher", generic: 0.303, local: 0.327 },
];

// results/05_fairness_with_mitigation.csv: "difference" (best − worst group) and "ratio" (worst ÷ best), NDCG@10
const fairnessGaps = [
  { attribute: "Gender", generic: "0.001 (0.99)", local: "0.019 (0.95)", reranked: "0.029 (0.92)" },
  { attribute: "Age band", generic: "0.021 (0.92)", local: "0.058 (0.84)", reranked: "0.077 (0.79)" },
  { attribute: "Education level", generic: "0.141 (0.54)", local: "0.182 (0.63)", reranked: "0.170 (0.65)" },
  { attribute: "Home district", generic: "0.088 (0.69)", local: "0.111 (0.72)", reranked: "0.085 (0.77)" },
];

// results/05_training_pathways.csv: 1,440 rows = 480 test job seekers × their top 3 local-aware recommendations
const pathways = [
  { count: "1,305", share: "90.6%", text: "have no credential gap: the job seeker can apply now" },
  { count: "21", share: "1.5%", text: "have a gap that feasible local training can close" },
  { count: "114", share: "7.9%", text: "have a gap with no feasible training option" },
];

const limitations = [
  {
    title: "Synthetic job seekers.",
    text: "The 600 profiles are generated, not real people, so results describe system behaviour, not hiring outcomes.",
  },
  {
    title: "One province.",
    text: "The 427 adverts come from Limpopo only (DPSA vacancy circulars and PNet), and their descriptions are structured summaries, not the full advert text.",
  },
  {
    title: "The answer key shares assumptions with the local-aware mode.",
    text: "A good match is defined as same job family, formally eligible and reachable, which are the ideas the local-aware mode is built on. When only job family counts, the two modes score about the same (NDCG@10 0.293 vs 0.314, not a significant difference).",
  },
  {
    title: "Job families are hand-defined.",
    text: "The 23 families come from rules on job titles written by the author. Seniority and years of experience are not modelled.",
  },
  {
    title: "Training costs are partly estimates.",
    text: "18 of the 35 training options have details that are not yet verified, and free options assume NSFAS funding or free provision. The training pathway shares are indicative.",
  },
];

const h2 = "scroll-mt-6 text-[22px] font-bold tracking-[-0.015em] lg:text-[26px]";
const section = "mb-12 lg:mb-16";
const th = "px-[18px] py-3 font-semibold";
const td = "px-[18px] py-3.5";
const navCard = "block rounded-[10px] border border-border px-[18px] py-4 text-text hover:border-border-strong";

export default function ResultsPage() {
  const last = notebooks[notebooks.length - 1];
  return (
    <PageFrame onThisPage={sections}>
      <div className="max-w-[860px]">
        <p className="mb-2.5 text-[13px] text-muted lg:mb-3">Docs / Results</p>
        <h1 className="mb-3 text-[34px] font-extrabold leading-[1.1] tracking-[-0.025em] lg:text-[44px]">Results</h1>
        <p className="mb-10 text-[17px] leading-normal text-text-2 lg:mb-12 lg:text-[19px]">
          How the two modes compare on 427 Limpopo job adverts and 600 synthetic job seekers, 480 of whom were held
          back as the test set. Higher scores are better throughout.
        </p>

        <section className={section}>
          <h2 id="overall" className={`mb-2 ${h2}`}>Overall</h2>
          <p className="mb-[18px] text-text-2">
            Mean scores for the 480 test job seekers. The difference is local-aware minus generic, with its 95%
            confidence interval. None of the intervals includes zero, and all three differences are statistically
            significant (paired Wilcoxon test, p &lt; 0.001).
          </p>
          {/* On narrow screens the table scrolls sideways inside its box */}
          <div className="mb-3.5 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-surface text-left">
                  <th scope="col" className={th}>Metric</th>
                  <th scope="col" className={`${th} text-muted`}>Generic</th>
                  <th scope="col" className={`${th} text-accent`}>Local-aware</th>
                  <th scope="col" className={th}>Difference (95% CI)</th>
                  <th scope="col" className={`${th} text-right`}>Change</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {overall.map((row) => (
                  <tr key={row.metric} className="border-t border-border-subtle">
                    <th scope="row" className={`${td} text-left font-sans font-semibold`}>{row.metric}</th>
                    <td className={td}>{row.generic}</td>
                    <td className={`${td} font-semibold text-accent`}>{row.local}</td>
                    <td className={td}>
                      {row.difference} <span className="text-muted">({row.ci})</span>
                    </td>
                    <td className={`${td} text-right font-semibold`}>{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[13px] text-muted">
            <strong className="text-text-2">NDCG@10</strong>: best jobs near the top ·{" "}
            <strong className="text-text-2">Precision@10</strong>: share of the 10 that suit ·{" "}
            <strong className="text-text-2">Recall@10</strong>: share of all suitable jobs that reach the top 10
            (measured on the 386 job seekers who have at least one suitable job)
          </p>
        </section>

        <section className={section}>
          <h2 id="scenario" className={`mb-2 ${h2}`}>By qualification scenario</h2>
          <p className="mb-[18px] text-text-2">
            Job seekers whose qualification exactly matches the advert, matches through an equivalence rule, or falls
            short of it. NDCG@10.
          </p>
          <BarChart groups={byScenario} axisMax={0.5} />
        </section>

        <section className={section}>
          <h2 id="education" className={`mb-2 ${h2}`}>By education level</h2>
          <p className="mb-[18px] text-text-2">
            Every group gains. The biggest gains go to job seekers below matric and with TVET or trade
            qualifications. NDCG@10.
          </p>
          <BarChart groups={byEducation} axisMax={0.5} />
        </section>

        <section className={section}>
          <h2 id="fairness" className={`mb-3 ${h2}`}>Fairness</h2>
          <div className="mb-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-[10px] border border-border bg-surface p-[18px]">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.06em] text-muted">Generic mode</p>
              <p className="text-text-2">
                Served degree holders best (0.303) and job seekers below matric worst (0.163).
              </p>
            </div>
            <div className="rounded-[10px] border border-accent bg-surface p-[18px]">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.06em] text-accent">Local-aware mode</p>
              <p className="text-text-2">
                Below-matric (0.495) and TVET / trade (0.471) seekers now get the strongest recommendations.
              </p>
            </div>
          </div>
          <p className="mb-4 text-text-2">
            Fairness is measured as the gap in NDCG@10 between the best-served and worst-served group, for four
            attributes. The number in brackets is the ratio of worst to best, where 1.00 would mean every group is
            served equally.
          </p>
          <div className="mb-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="bg-surface text-left">
                  <th scope="col" className={th}>Groups compared</th>
                  <th scope="col" className={`${th} text-muted`}>Generic</th>
                  <th scope="col" className={`${th} text-accent`}>Local-aware</th>
                  <th scope="col" className={th}>Local-aware + re-ranking</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {fairnessGaps.map((row) => (
                  <tr key={row.attribute} className="border-t border-border-subtle">
                    <th scope="row" className={`${td} text-left font-sans font-semibold`}>{row.attribute}</th>
                    <td className={td}>{row.generic}</td>
                    <td className={td}>{row.local}</td>
                    <td className={td}>{row.reranked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-text-2">
            Local-aware mode raises the score of every group, but not by the same amount, so the gap between the best
            and worst group grows on all four attributes. For education level and home district the worst group still
            ends up closer to the best in relative terms (the ratio rises). For gender and age band, which were
            assigned at random, small gaps appear that the generic mode did not have.
          </p>
          <p className="text-text-2">
            Re-ranking is a simple fix that was tested: within each top 20, jobs the job seeker fully qualifies for
            are moved to the front. It narrows the gap for education level and home district, and widens it slightly
            for gender and age band.
          </p>
        </section>

        <section className={section}>
          <h2 id="training" className={`mb-3 ${h2}`}>Training pathways</h2>
          <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-xl border border-border bg-surface p-[22px]">
            <p className="text-5xl font-extrabold leading-none tracking-[-0.02em] text-accent">92%</p>
            <p className="flex-[1_1_300px] text-text-2">
              of top-three recommendations are jobs the seeker can take now, or after local training that closes the
              gap.
            </p>
          </div>
          <p className="mb-4 text-text-2">
            For each test job seeker’s top three local-aware recommendations (1,440 in all), every missing mandatory
            credential is matched against 35 Limpopo training options. An option counts only if it leads to the
            missing credential, is offered somewhere the job seeker can reach (or by distance), fits their budget and
            weekly hours, is open to job seekers, and has entry requirements they meet.
          </p>
          <ul className="mb-4 border-t border-border">
            {pathways.map((p) => (
              <li key={p.count} className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5 border-b border-border py-3.5">
                <span className="w-16 font-mono font-semibold text-text">{p.count}</span>
                <span className="w-14 font-mono text-[13px] text-muted">{p.share}</span>
                <span className="flex-[1_1_240px] text-text-2">{p.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-text-2">
            Where no option is feasible, the most common reasons are that the training costs more than the job
            seeker’s budget (49 recommendations) or needs more hours a week than they have (30). Only credential gaps
            are turned into pathways; missing skills are listed but not matched to courses.
          </p>
        </section>

        <section className="mb-12">
          <h2 id="limits" className={`mb-3 ${h2}`}>Limitations</h2>
          <ul className="border-t border-border">
            {limitations.map((l) => (
              <li key={l.title} className="border-b border-border py-3.5 text-text-2">
                <strong className="text-text">{l.title}</strong> {l.text}
              </li>
            ))}
          </ul>
        </section>

        <nav aria-label="Pages" className="grid gap-3 sm:grid-cols-2">
          <Link href={`/notebooks/${last.id}/`} className={navCard}>
            <span className="block text-[13px] text-muted">← Previous</span>
            <span className="font-semibold">{last.id} · {last.title}</span>
          </Link>
          <Link href="/run/" className={`${navCard} sm:text-right`}>
            <span className="block text-[13px] text-muted">Next →</span>
            <span className="font-semibold text-accent">Run it</span>
          </Link>
        </nav>
      </div>
    </PageFrame>
  );
}
