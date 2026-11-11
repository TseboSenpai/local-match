import type { NotebookPage } from "./types";

// Notebook 04 has no saved outputs, so the numbers below were read from the files it writes:
//   data/processed/match_scores.npz     score tables of 600 job seekers × 427 jobs
//   data/processed/candidate_split.csv  480 test, 120 validation
//   data/processed/tuning_results.csv   validation NDCG@10 for each weight (the chart)
//   data/processed/matcher_config.json  best weight 0.25 in both modes; model all-MiniLM-L6-v2
//   data/processed/rankings.csv         24,000 rows = 600 job seekers × 2 modes × top 20
//   data/processed/skills_gap.csv       1,800 rows = 600 job seekers × top 3 jobs
const notebook04: NotebookPage = {
  id: "04",
  file: "notebooks/04_matching.ipynb",
  whyItMatters:
    "This is the matcher itself. It scores every job seeker against every job twice, once in generic mode and once in local-aware mode, using the same algorithm. Because only the local layer differs, any gap in the results can be traced to that layer.",
  reads: [
    "data/processed/jobs_clean.csv",
    "data/processed/job_requirements.csv",
    "data/processed/candidates.csv",
    "data/processed/ground_truth.csv",
    "data/processed/vocab_generic.csv",
    "data/raw/local/local_vocabulary.csv",
    "data/raw/local/equivalences.csv",
  ],
  writes: [
    "data/processed/match_scores.npz",
    "data/processed/rankings.csv",
    "data/processed/skills_gap.csv",
    "data/processed/candidate_split.csv",
    "data/processed/tuning_results.csv",
    "data/processed/matcher_config.json",
  ],
  steps: [
    {
      title: "Find ESCO skills in the adverts",
      text: "Every ESCO skill label becomes a phrase to look for in each advert, ignoring upper and lower case (spaCy PhraseMatcher). Job seekers already have their ESCO skills from notebook 03.",
    },
    {
      title: "Build skill sets for both modes",
      text: "Generic mode compares ESCO skills only. Local-aware mode compares ESCO skills plus the local vocabulary found in the advert and in the job seeker’s profile text.",
    },
    {
      title: "Work out credential fit and reach",
      text: "Local-aware mode only. Credential fit is the share of a job’s mandatory requirements the job seeker meets, after applying the equivalence rules. Reach is whether the job is in a district they can work in.",
    },
    {
      title: "Measure text similarity",
      text: "A sentence-transformer model (all-MiniLM-L6-v2) turns each advert and each profile into a list of 384 numbers. The closer two lists are, the more similar the texts. Both modes use the same similarity.",
    },
    {
      title: "Combine into one score per mode",
      text: "The base score mixes text similarity and skill overlap. Generic mode stops there. Local-aware mode lowers the base when mandatory credentials are missing (down to half when none are met), and halves it for jobs the seeker cannot reach.",
    },
    {
      title: "Tune the mix on a validation set",
      text: "120 job seekers (20%) are set aside to choose the weight between text similarity and skill overlap, separately for each mode. The other 480 are kept for the evaluation in notebook 05.",
    },
    {
      title: "Rank the jobs and list the gaps",
      text: "Saves the top 20 jobs for each job seeker in each mode. For the top 3 local-aware recommendations it also lists the credentials and skills the job seeker is missing, which notebook 05 turns into training pathways.",
    },
  ],
  stats: [
    { value: "256,200", text: "job seeker–job pairs scored in each mode (600 × 427)" },
    { value: "0.25", text: "the weight on text similarity that worked best in both modes; skill overlap gets the other 0.75" },
    { value: "480", text: "job seekers kept as the test set, after 120 were used for tuning" },
  ],
  chart: {
    title: "Choosing the weight",
    caption: "NDCG@10 on the 120 validation job seekers, for each weight w on text similarity. Higher is better.",
    axisMax: 0.4,
    groups: [
      { label: "w = 0", generic: 0.096, local: 0.327 },
      { label: "w = 0.25", generic: 0.222, local: 0.352 },
      { label: "w = 0.5", generic: 0.208, local: 0.314 },
      { label: "w = 0.75", generic: 0.203, local: 0.295 },
      { label: "w = 1", generic: 0.203, local: 0.281 },
    ],
  },
  goodToKnow:
    "The local-aware matcher reads credentials from the job seeker’s profile text and applies every equivalence rule, including ones not yet verified. The ground truth in notebook 03 uses verified rules only, so the matcher is not simply handed the answers. The chart shows tuning scores on the validation set; the headline results come from the separate test set in notebook 05.",
};

export default notebook04;
