"""Turn the five executed notebooks into web pages for the site.

What it does
    Reads notebooks/01…05 from the research repository and writes
    public/rendered/01.html … 05.html, showing the code and the saved outputs.
    It does NOT run the notebooks; it only displays what is already saved in them.

How to run it (from the site folder)
    python scripts/build_notebooks.py /path/to/research-repo

    You can also set the RESEARCH_REPO environment variable instead of passing
    the path. Python needs the `nbconvert` package (it comes with `jupyter`).
"""

import os
import re
import sys
from pathlib import Path

from nbconvert import HTMLExporter

SITE = Path(__file__).resolve().parent.parent
OUT = SITE / "public" / "rendered"

# Colours that make the notebook match the site (see src/app/globals.css).
SITE_STYLE = """
<style>
  :root {
    --jp-layout-color0: #0B0B0C;
    --jp-layout-color1: #141416;
    --jp-layout-color2: #1A1A1C;
    --jp-cell-editor-background: #141416;
    --jp-cell-editor-border-color: #2A2A2C;
    --jp-border-color1: #2A2A2C;
    --jp-border-color2: #2A2A2C;
    --jp-rendermime-table-row-background: #141416;
    --jp-rendermime-table-row-hover-background: #1A1A1C;
    --jp-content-link-color: #D4FF3A;
    --jp-brand-color1: #D4FF3A;
    --jp-ui-font-color1: #F5F5F2;
    --jp-content-font-color1: #F5F5F2;
  }
  body { background: #0B0B0C; margin: 0; padding: 16px; }
  /* wide tables and long lines scroll inside their own box */
  .jp-RenderedHTMLCommon, .jp-OutputArea-output { overflow-x: auto; }
</style>
"""

# Saved outputs can contain a folder path from the computer the notebook ran on
# (for example "/Users/name/Documents/.../project"). Only the last part is kept.
LOCAL_PATH = re.compile(r"(?:/Users|/home)/[^\s<>\"']+")


def hide_local_paths(html: str) -> str:
    return LOCAL_PATH.sub(lambda m: m.group(0).rstrip("/").split("/")[-1], html)


def main() -> None:
    repo = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("RESEARCH_REPO", "research")
    notebooks = sorted((Path(repo) / "notebooks").glob("0[1-5]_*.ipynb"))
    if len(notebooks) != 5:
        sys.exit(f"Expected 5 notebooks in {Path(repo) / 'notebooks'}, found {len(notebooks)}.")

    OUT.mkdir(parents=True, exist_ok=True)
    exporter = HTMLExporter(template_name="lab", theme="dark")

    for path in notebooks:
        number = path.name[:2]  # "01" from "01_data_collection.ipynb"
        html, _ = exporter.from_filename(str(path))
        html = hide_local_paths(html).replace("</head>", SITE_STYLE + "</head>", 1)
        target = OUT / f"{number}.html"
        target.write_text(html, encoding="utf-8")
        print(f"{path.name} -> public/rendered/{target.name} ({len(html) // 1024} KB)")


if __name__ == "__main__":
    main()
