"use client";
// Top bar. On wide screens it shows the GitHub link and the Colab button.
// On phones it shows a Menu button that opens the navigation.

import { useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import NavLinks from "./NavLinks";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-line">
      <div className="flex items-center justify-between gap-3 px-4 py-2 lg:gap-6 lg:px-8 lg:py-3.5">
        <Link href="/" className="flex min-h-11 items-center gap-2.5 text-ink">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-[13px] font-semibold text-on-accent">
            LA
          </span>
          <span className="text-[15px] font-semibold">
            <span className="lg:hidden">{site.shortName}</span>
            <span className="hidden lg:inline">{site.name}</span>
          </span>
        </Link>

        {/* Wide screens */}
        <div className="hidden items-center gap-5 text-sm lg:flex">
          <a href={site.githubUrl} className="inline-flex min-h-11 items-center text-ink hover:text-accent-hover">
            GitHub
          </a>
          <Link
            href="/run/"
            className="inline-flex min-h-10 items-center rounded-md bg-accent px-4 font-semibold text-on-accent hover:bg-accent-hover"
          >
            Open in Colab
          </Link>
        </div>

        {/* Phones */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
          className={[
            "inline-flex h-11 w-11 flex-none cursor-pointer items-center justify-center rounded-lg border bg-surface lg:hidden",
            menuOpen ? "border-accent text-accent" : "border-line text-ink",
          ].join(" ")}
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d={menuOpen ? "M4 4l10 10M14 4L4 14" : "M2 5h14M2 9h14M2 13h14"} />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Site" className="border-t border-line bg-surface px-4 pb-5 pt-3 text-[15px] lg:hidden">
          <NavLinks variant="menu" onNavigate={() => setMenuOpen(false)} />
          <a href={site.githubUrl} className="mt-3 flex min-h-11 items-center px-2.5 text-ink">
            GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
