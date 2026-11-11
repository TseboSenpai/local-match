// The list of notebook pages that exist. To add one, create its file
// (for example 02.ts) and add it to this list.

import type { NotebookPage } from "./types";
import notebook01 from "./01";
import notebook02 from "./02";
import notebook03 from "./03";
import notebook04 from "./04";
import notebook05 from "./05";

export const notebookPages: NotebookPage[] = [notebook01, notebook02, notebook03, notebook04, notebook05];

export function getNotebookPage(id: string) {
  return notebookPages.find((n) => n.id === id);
}
