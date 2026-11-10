// Site-wide facts used by the header, sidebar and footer.
// Edit this file to change the navigation or the repository link.

export const site = {
  name: "Local-Aware AI Job Matching",
  shortName: "Local-Aware Job Matching",
  author: "Tsebo Molope",
  githubUrl: "https://github.com/TseboSenpai/ai-job-matching-skills-za",
  footerNote:
    "The 600 job seekers are synthetic. Results describe how the system behaves, not real hiring outcomes.",
};

// Titles come from the heading of each notebook in notebooks/.
export const notebooks = [
  { id: "01", title: "Data collection and cleaning" },
  { id: "02", title: "Local vocabulary layer" },
  { id: "03", title: "Synthetic candidates and ground truth" },
  { id: "04", title: "Matching: generic vs local-aware" },
  { id: "05", title: "Evaluation" },
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
