import type { NotebookPage } from "./types";

// Numbers below are from the saved outputs of notebooks/03_synthetic_candidates.ipynb:
//   "427 jobs, 85 local vocabulary entries, 29 family rules, 23 families"
//   "Jobs with at least one mandatory credential: 97%" / "Average number of requirement groups per job: 2.0"
//   "Generated 600 candidates"; scenario table: exact 297, equivalent 128, under 175
//   "Average fully relevant jobs (rel = 2): 6.1" / "Candidates with at least one rel = 2 job: 80%"
//   family table: ENGINEERING 50, FINANCE 46, HR 45, SCM 29, SOCIAL 26, EDUCATION 23, ADMIN 23, TRANSPORT_REG 22
const notebook03: NotebookPage = {
  id: "03",
  file: "notebooks/03_synthetic_candidates.ipynb",
  whyItMatters:
    "Real job-seeker data, shared with consent, was not available. So this notebook generates job seekers whose correct matches are known in advance. That gives the evaluation an answer key: for every job seeker, which jobs are a good match.",
  reads: [
    "data/raw/local/job_families.csv",
    "data/raw/local/job_family_rules.csv",
    "data/raw/local/local_vocabulary.csv",
    "data/raw/local/equivalences.csv",
    "data/raw/esco/skills_en.csv",
    "data/processed/jobs_clean.csv",
    "data/processed/esco_occupations.csv",
    "data/processed/esco_occupation_skills.csv",
  ],
  writes: [
    "data/processed/candidates.csv",
    "data/processed/ground_truth.csv",
    "data/processed/job_requirements.csv",
    "data/processed/candidates_config.json",
  ],
  steps: [
    {
      title: "Group the jobs into families",
      text: "Rules on the job title place each of the 427 adverts in one of 23 families, such as Finance, Nursing, Mining or Trades. No advert is left unassigned.",
    },
    {
      title: "Read each job’s mandatory credentials",
      text: "Anything marked “advantage”, “preferred” or “desirable” is ignored, and “A or B” is kept as a choice. 97% of adverts have at least one mandatory credential, with two requirement groups on average.",
    },
    {
      title: "Link each family to ESCO occupations",
      text: "Job seekers take their skills from the ESCO occupations that belong to their family.",
    },
    {
      title: "Generate 600 job seekers",
      text: "Each one starts from a seed job and gets skills, credentials, a home town, how far they can travel, a gender, age band and education level, and a weekly time and budget limit for training.",
    },
    {
      title: "Give each one a qualification scenario",
      text: "Exact: holds the seed job’s credentials in the standard wording. Equivalent: holds credentials that count under a verified equivalence rule, in local wording, such as NC(V) Level 4 instead of Grade 12. Under-qualified: lacks one requirement, or holds a lower version of it.",
    },
    {
      title: "Build the ground truth",
      text: "A job is fully relevant to a job seeker when it is in their family, they are formally eligible, and it is in a district they can reach. Same family only counts as partly relevant. This is decided without either matching mode.",
    },
  ],
  stats: [
    { value: "600", text: "synthetic job seekers — 297 exact, 128 equivalent and 175 under-qualified" },
    { value: "23", text: "job families across the 427 adverts" },
    { value: "80%", text: "of job seekers have at least one fully relevant job; the average is 6.1" },
  ],
  chart: {
    title: "Largest job families",
    caption: "Number of adverts in the eight largest of the 23 families",
    bars: [
      { label: "Engineering", value: 50 },
      { label: "Finance", value: 46 },
      { label: "Human resources", value: 45 },
      { label: "Supply chain", value: 29 },
      { label: "Social services", value: 26 },
      { label: "Education", value: 23 },
      { label: "Administration", value: 23 },
      { label: "Transport regulation", value: 22 },
    ],
  },
  goodToKnow:
    "No real job seekers were used. The ground truth uses only equivalence rules marked as verified. It shares its ideas of eligibility and reach with the local-aware mode, so notebook 05 also reports results on a simpler measure: same job family only. The job families are defined by the author from job titles; seniority and years of experience are not modelled.",
};

export default notebook03;
