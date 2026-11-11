// Shows the full rendered notebook (code and saved outputs) in a scrolling box.
// The HTML files are made by scripts/build_notebooks.py and live in public/rendered/.

import { existsSync } from "node:fs";
import path from "node:path";

// Set when the site is hosted under a sub-path, e.g. "/my-repo" on GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function NotebookEmbed({ id, title }: { id: string; title: string }) {
  // Checked while the site is being built: has this notebook been rendered?
  const rendered = existsSync(path.join(process.cwd(), "public", "rendered", `${id}.html`));
  const src = `${basePath}/rendered/${id}.html`;

  return (
    <section className="mb-12">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h2 className="text-[22px] font-bold tracking-[-0.01em]">The full notebook</h2>
          <p className="mt-1 text-[15px] text-text-2">Every cell of code, with the output it produced when it was last run.</p>
        </div>
        {rendered && (
          <a
            href={src}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center rounded-lg border border-border-strong px-[18px] text-sm font-medium text-text hover:border-text"
          >
            Open in a new tab ↗
          </a>
        )}
      </div>
      {rendered ? (
        <iframe
          src={src}
          title={`Notebook ${id}: ${title}, with code and outputs`}
          loading="lazy"
          className="h-[80vh] min-h-[480px] w-full rounded-xl border border-border bg-bg"
        />
      ) : (
        <p className="rounded-xl border border-border bg-surface p-5 text-text-2">
          This notebook has not been rendered yet. Run <span className="font-mono text-sm">scripts/build_notebooks.py</span>{" "}
          and rebuild the site.
        </p>
      )}
    </section>
  );
}
