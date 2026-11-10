// Sidebar + content column. Every page wraps its content in this.
// (The Overview page puts the full-width hero above it.)

import NavLinks from "./NavLinks";

export default function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-start">
      <nav aria-label="Site" className="hidden w-[280px] flex-none py-8 pl-8 pr-6 text-sm lg:block">
        <NavLinks variant="sidebar" />
      </nav>
      <main className="min-w-0 flex-1 self-stretch px-4 pb-12 pt-7 lg:border-l lg:border-border lg:px-8 lg:pb-16 lg:pt-10">
        {children}
      </main>
    </div>
  );
}
