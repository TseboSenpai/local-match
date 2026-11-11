// Site-wide facts used by the header, sidebar and footer.
// Edit this file to change the navigation or the repository link.

export const site = {
  name: "Local-Aware AI Job Matching",
  shortName: "Local-Aware Job Matching",
  author: "Tsebo Molope",
  // GitHub "owner/name". The Colab, Binder and GitHub links are built from this.
  repo: "TseboSenpai/ai-job-matching-skills-za",
  githubUrl: "https://github.com/TseboSenpai/ai-job-matching-skills-za",
  footerNote:
    "The 600 job seekers are synthetic. Results describe how the system behaves, not real hiring outcomes.",
};

// Titles come from the heading of each notebook in notebooks/.
// Summaries come from the repository README.
export const notebooks = [
  { id: "01", title: "Data collection and cleaning", summary: "Loads ESCO and the Limpopo job adverts, cleans the text and tags each advert with its district." },
  { id: "02", title: "Local vocabulary layer", summary: "Finds the South African credentials and terms that Limpopo adverts use." },
  { id: "03", title: "Synthetic candidates and ground truth", summary: "Groups jobs into families, reads their requirements, and generates job seekers whose correct matches are known." },
  { id: "04", title: "Matching: generic vs local-aware", summary: "Extracts skills, builds embeddings and scores every job seeker against every job in both modes." },
  { id: "05", title: "Evaluation", summary: "Measures quality, significance, sensitivity and fairness, and builds the training pathways." },
];

export type NavItem = { href: string; label: string; mono?: boolean };
export type NavGroup = { heading: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    heading: "Project",
    items: [
      { href: "/", label: "Overview" },
      { href: "/pipeline/", label: "Pipeline" },
    ],
  },
  {
    heading: "Notebooks",
    items: notebooks.map((n) => ({
      href: `/notebooks/${n.id}/`,
      label: `${n.id} · ${n.title}`,
      mono: true,
    })),
  },
  {
    heading: "Outcomes",
    items: [
      { href: "/results/", label: "Results" },
      { href: "/run/", label: "Run it" },
      { href: "/about/", label: "About" },
    ],
  },
];
