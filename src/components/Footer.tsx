import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-x-8 gap-y-2 px-4 py-5 text-[13px] text-muted lg:px-8 lg:py-6">
        <p className="max-w-[720px]">{site.footerNote}</p>
        <p>© 2026 {site.author} · UNISA</p>
      </div>
    </footer>
  );
}
