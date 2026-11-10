"use client";
// Top bar. It has no background of its own, so on the Overview page the 3D
// hero shows through behind it.
// Wide screens: logo, page links, GitHub and Colab buttons.
// Phones: logo and a Menu button that opens the navigation.

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import NavLinks from "./NavLinks";

// `match` is the start of the URL that makes the link "active".
const topLinks = [
  { href: "/", label: "Overview", match: "/" },
  { href: "/pipeline/", label: "Pipeline", match: "/pipeline" },
  { href: "/notebooks/01/", label: "Notebooks", match: "/notebooks" },
  { href: "/results/", label: "Results", match: "/results" },
  { href: "/run/", label: "Run it", match: "/run" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (match: string) => (match === "/" ? pathname === "/" : pathname.startsWith(match));

  return (
    <header className="relative z-20 border-b border-border">
      <div className="flex items-center justify-between gap-3 px-4 py-2 lg:gap-6 lg:px-8 lg:py-3.5">
        <div className="flex items-center gap-7">
          <Link href="/" className="flex min-h-11 items-center gap-2.5 text-text">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-[13px] font-semibold text-on-accent">
              LA
            </span>
            <span className="text-[15px] font-semibold">
              <span className="lg:hidden">{site.shortName}</span>
              <span className="hidden lg:inline">{site.name}</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 text-sm lg:flex">
            {topLinks.map((l) => {
              const active = isActive(l.match);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "inline-flex min-h-11 items-center",
                    active ? "" : "px-3 text-text hover:text-accent-hover",
                  ].join(" ")}
                >
                  {active ? (
                    <span className="rounded-full bg-accent-tint px-3 py-1 font-semibold text-accent">{l.label}</span>
                  ) : (
                    l.label
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Wide screens */}
        <div className="hidden items-center gap-3 text-sm lg:flex">
          <a
            href={site.githubUrl}
            className="inline-flex min-h-10 items-center rounded-md border border-border-strong px-4 text-text hover:border-text"
          >
            GitHub
          </a>
          <Link
            href="/run/#colab"
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
            menuOpen ? "border-accent text-accent" : "border-border text-text",
          ].join(" ")}
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d={menuOpen ? "M4 4l10 10M14 4L4 14" : "M2 5h14M2 9h14M2 13h14"} />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Site" className="border-t border-border bg-surface px-4 pb-5 pt-3 text-[15px] lg:hidden">
          <NavLinks variant="menu" onNavigate={() => setMenuOpen(false)} />
          <a href={site.githubUrl} className="mt-3 flex min-h-11 items-center px-2.5 text-text">
            GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
