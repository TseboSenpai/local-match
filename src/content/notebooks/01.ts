import type { NotebookPage } from "./types";

// Numbers below were checked against the notebook's output files:
//   data/processed/jobs_clean.csv     427 rows; source, district and desc_words columns
//   data/processed/vocab_generic.csv  100,350 labels for 13,939 skills
const notebook01: NotebookPage = {
  id: "01",
  file: "notebooks/01_data_collection.ipynb",
  whyItMatters:
    "Every later step depends on clean inputs. This notebook turns the ESCO download and the collected job adverts into tidy tables, so that both matching modes start from exactly the same data.",
  reads: [
    "data/raw/esco/skills_en.csv",
    "data/raw/esco/occupations_en.csv",
    "data/raw/esco/occupationSkillRelations_en.csv",
    "data/raw/jobs/limpopo_jobs.csv",
  ],
  writes: [
    "data/processed/jobs_clean.csv",
    "data/processed/vocab_generic.csv",
    "data/processed/esco_occupations.csv",
    "data/processed/esco_occupation_skills.csv",
  ],
  steps: [
    {
      title: "Load ESCO",
      text: "Reads the ESCO v1.2.1 skills, occupations and the links between them. This is the generic layer.",
    },
    {
      title: "Build the generic skills vocabulary",
      text: "Each skill has a preferred label and often several alternatives. They become one row per label, so any wording of a skill can be matched later.",
    },
    {
      title: "Load the Limpopo job adverts",
      text: "Reads the adverts collected from DPSA vacancy circulars and PNet, and checks that the required columns are present.",
    },
    {
      title: "Clean the text and remove duplicates",
      text: "Strips HTML, bullet symbols and extra spaces, drops adverts with almost no description, and removes the same job posted twice.",
    },
    {
      title: "Tag each advert with its district",
      text: "Looks up the advert’s town in a list of towns for Limpopo’s five districts. Towns not on the list are marked Unknown.",
    },
    {
      title: "Summarise and save",
      text: "Prints the balance by source and district, then saves the clean tables for notebook 02.",
    },
  ],
  stats: [
    { value: "427", text: "Limpopo job adverts after cleaning — 350 from DPSA and 77 from PNet" },
    { value: "13,939", text: "ESCO skills in the generic vocabulary, under 100,350 different labels" },
    { value: "417", text: "of the 427 adverts tagged with one of Limpopo’s five districts" },
  ],
  chart: {
    title: "Adverts by district",
    caption: "Number of adverts in each district, out of 427",
    bars: [
      { label: "Capricorn", value: 201 },
      { label: "Sekhukhune", value: 69 },
      { label: "Waterberg", value: 55 },
      { label: "Vhembe", value: 52 },
      { label: "Mopani", value: 40 },
      { label: "Unknown", value: 10 },
    ],
  },
  goodToKnow:
    "The advert descriptions are structured summaries of each advert, not the full text; a typical one is about 65 words. Ten adverts name a town that is not in the district list, so they are marked Unknown.",
};

export default notebook01;
