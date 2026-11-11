// Sidebar + content column. Every page wraps its content in this.
// (The Overview page puts the full-width hero above it.)

import NavLinks from "./NavLinks";

export type PageSection = { id: string; label: string };

export default function PageFrame({
  children,
  onThisPage,
}: {
  children: React.ReactNode;
  onThisPage?: PageSection[]; // optional list of jump links shown under the sidebar
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-start">
      <div className="hidden w-[280px] flex-none py-8 pl-8 pr-6 text-sm lg:block">
        <nav aria-label="Site">
          <NavLinks variant="sidebar" />
        </nav>
        {onThisPage && (
          <nav aria-label="On this page" className="mt-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-muted">On this page</p>
            <ul className="flex flex-col gap-0.5 text-[13px]">
              {onThisPage.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block px-2.5 py-1 text-text-2 hover:text-accent-hover">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <main className="min-w-0 flex-1 self-stretch px-4 pb-12 pt-7 lg:border-l lg:border-border lg:px-8 lg:pb-16 lg:pt-10">
        {children}
      </main>
    </div>
  );
}
