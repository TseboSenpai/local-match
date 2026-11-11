import type { NotebookPage } from "./types";

// Notebook 05 has no saved outputs, so the numbers below were read from the tables it writes:
//   results/05_main_results.csv       NDCG@10 0.243 → 0.348 (difference +0.106, 95% CI 0.081 to 0.131, n = 480)
//                                     family only: 0.293 → 0.314 (difference +0.022, CI −0.001 to 0.047, p = 0.08)
//   results/05_by_scenario.csv        the chart
//   results/05_training_pathways.csv  1,440 rows (480 × top 3): 1,305 no credential gap, 21 closable → 92%
//   data/raw/local/training_options.csv  35 options, 18 with verified = 0
const notebook05: NotebookPage = {
  id: "05",
  file: "notebooks/05_evaluation.ipynb",
  whyItMatters:
    "This is where the two modes are compared. It measures how good each mode’s recommendations are, checks that the difference is not down to chance, looks at who gains and who doesn’t, and tests whether the gaps in a recommended job can be closed with training available in Limpopo.",
  reads: [
    "data/processed/match_scores.npz",
    "data/processed/matcher_config.json",
    "data/processed/candidates.csv",
    "data/processed/candidate_split.csv",
    "data/processed/ground_truth.csv",
    "data/processed/job_requirements.csv",
    "data/processed/skills_gap.csv",
    "data/raw/local/local_vocabulary.csv",
    "data/raw/local/equivalences.csv",
    "data/raw/local/training_options.csv",
  ],
  writes: [
    "results/05_main_results.csv",
    "results/05_by_scenario.csv",
    "results/05_sensitivity.csv",
    "results/05_fairness_by_group.csv",
    "results/05_fairness_parity.csv",
    "results/05_fairness_with_mitigation.csv",
    "results/05_district_exposure.csv",
    "results/05_training_pathways.csv",
    "figures/05_ndcg_by_scenario.png",
  ],
  steps: [
    {
      title: "Compare the two modes",
      text: "NDCG, precision and recall for the top 5 and top 10, on the 480 test job seekers. Each difference comes with a 95% confidence interval and a paired Wilcoxon test, because the same job seeker is scored in both modes.",
    },
    {
      title: "Break the result down by scenario",
      text: "The same comparison for exact, equivalent and under-qualified job seekers.",
    },
    {
      title: "Test how sensitive the result is",
      text: "Repeats the comparison counting only job family as relevant, and with 16 different settings for the location penalty and the credential floor. This shows which local ingredient drives the gain.",
    },
    {
      title: "Check fairness",
      text: "Compares recommendation quality across gender, age band, education level and home district, and reports the gap between the best and worst group. Also checks whether jobs in each district get a fair share of the top-10 slots.",
    },
    {
      title: "Try a simple fix",
      text: "Re-ranks each top 20 so that jobs the job seeker fully qualifies for come first, then measures fairness again.",
    },
    {
      title: "Build training pathways",
      text: "For each job seeker’s top 3 local-aware recommendations, matches every missing credential to a training option that is reachable, within their budget and weekly hours, open to job seekers, and whose entry requirements they meet.",
    },
  ],
  stats: [
    { value: "+43%", text: "recommendation quality in local-aware mode — NDCG@10 0.243 → 0.348, a significant difference" },
    { value: "+0.022", text: "NDCG@10 gain when only job family counts (0.293 → 0.314), which is not statistically significant" },
    { value: "92%", text: "of top-three recommendations usable now or after feasible local training" },
  ],
  chart: {
    title: "Results by qualification scenario",
    caption: "NDCG@10 on the test set. Higher is better.",
    axisMax: 0.5,
    groups: [
      { label: "Exact match", generic: 0.25, local: 0.413 },
      { label: "Equivalent", generic: 0.255, local: 0.313 },
      { label: "Under-qualified", generic: 0.221, local: 0.265 },
    ],
  },
  goodToKnow:
    "The main ground truth shares its ideas of eligibility and reach with the local-aware mode, which is why the family-only result is reported next to it: there the two modes perform about the same, so the local layer does not cost occupational relevance. Many of the training costs are estimates (18 of the 35 options are not yet verified), so the training pathway shares are indicative.",
};

export default notebook05;
