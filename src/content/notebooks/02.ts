import type { NotebookPage } from "./types";

// Numbers below were checked against the notebook's inputs and output files:
//   data/raw/local/local_vocabulary.csv          85 entries (58 credentials, 27 terms)
//   data/raw/local/equivalences.csv              26 rules
//   data/processed/job_local_requirements.csv    which advert mentions which entry
//   data/processed/local_coverage.csv            which entries ESCO has a label for
const notebook02: NotebookPage = {
  id: "02",
  file: "notebooks/02_local_vocabulary.ipynb",
  whyItMatters:
    "A generic matcher doesn’t know South African terms. To it, “Grade 12 or NC(V) Level 4” or “PERSAL” is just text. This notebook builds the vocabulary that lets the local-aware mode read these requirements as credentials and skills.",
  reads: [
    "data/raw/local/local_vocabulary.csv",
    "data/raw/local/equivalences.csv",
    "data/processed/jobs_clean.csv",
    "data/processed/vocab_generic.csv",
  ],
  writes: [
    "data/processed/vocab_local.csv",
    "data/processed/vocab_combined.csv",
    "data/processed/job_local_requirements.csv",
    "data/processed/local_coverage.csv",
    "figures/02_local_terms_frequency.png",
  ],
  steps: [
    {
      title: "Load the job adverts",
      text: "Reads the 427 cleaned adverts and the ESCO vocabulary from notebook 01, plus the two local files: the vocabulary and the equivalence rules.",
    },
    {
      title: "Define the local terms",
      text: "85 entries: 58 credentials (matric, NC(V), N1–N6, trade tests, licence codes, professional registrations, mining certificates) and 27 workplace terms (PERSAL, BAS, LOGIS, PFMA and others). Each entry lists the different ways adverts write it.",
    },
    {
      title: "Add equivalence rules",
      text: "26 rules say which credential satisfies which requirement. For example NC(V) Level 4 = Grade 12, and Code 10 covers Code 08. Rules chain, so a higher licence covers every lower one.",
    },
    {
      title: "Find the terms in each advert",
      text: "Each way of writing a term is matched as whole words, ignoring upper and lower case. Codes such as N6 or Code C1 use patterns, so that “Code C” is not mistaken for “Code C1”. A set of tricky test sentences checks the matching.",
    },
    {
      title: "Check what ESCO already covers",
      text: "Looks for each local entry among ESCO’s skill labels. Entries ESCO lacks can only be recognised in local-aware mode.",
    },
    {
      title: "Count and save",
      text: "Counts how many adverts mention each term, then saves the local vocabulary, the combined ESCO + local vocabulary, and the list of local terms found in each advert.",
    },
  ],
  stats: [
    { value: "81%", text: "of adverts use SA credentials or terms" },
    { value: "427", text: "Limpopo adverts scanned" },
    { value: "172", text: "adverts mention Grade 12 or Matric — the most common term" },
  ],
  chart: {
    title: "Most common local terms",
    caption: "Number of adverts that mention each term, out of 427",
    bars: [
      { label: "Grade 12 / Matric", value: 172 },
      { label: "PFMA", value: 65 },
      { label: "PERSAL", value: 33 },
      { label: "BAS", value: 25 },
      { label: "Treasury Regulations", value: 23 },
      { label: "HPCSA registration", value: 23 },
      { label: "Trade test", value: 19 },
      { label: "LOGIS", value: 18 },
    ],
  },
  goodToKnow:
    "Grade 12 and Matric are counted together because they name the same qualification. PFMA, PERSAL, BAS, LOGIS and Treasury Regulations are public-service acts and systems that ESCO does not cover. In all, 72 of the 78 local entries found in the adverts have no matching label in ESCO. General requirements such as a degree, a diploma or “a driver’s licence” are left out of the 81% and the chart, because adverts in any country ask for them.",
};

export default notebook02;
