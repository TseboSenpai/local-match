// The shape of one notebook's page content.
// Each notebook has its own file in this folder (01.ts, 02.ts, …).

export type NotebookPage = {
  id: string; // "01" … "05"
  file: string; // path of the .ipynb in the research repository
  whyItMatters: string;
  reads: string[];
  writes: string[];
  steps: { title: string; text: string }[];
  // The first stat is shown as the lime tile.
  stats: { value: string; text: string }[];
  chart: {
    title: string;
    caption: string;
    bars: { label: string; value: number }[];
  };
  goodToKnow: string;
};
