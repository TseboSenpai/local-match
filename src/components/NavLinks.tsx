"use client";
// The list of site links, shared by the desktop sidebar and the mobile menu.
// It is a Client Component because it reads the current URL to mark the active link.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/content/site";

// "/pipeline" and "/pipeline/" should count as the same page.
function samePage(a: string, b: string) {
  const trim = (s: string) => (s.length > 1 ? s.replace(/\/$/, "") : s);
  return trim(a) === trim(b);
}

export default function NavLinks({
  variant,
  onNavigate,
}: {
  variant: "sidebar" | "menu";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isMenu = variant === "menu";

  return (
    <>
      {navGroups.map((group) => (
        <div key={group.heading} className={isMenu ? "mb-3 last:mb-0" : "mb-6 last:mb-0"}>
          <p className="mb-2 px-2.5 text-xs font-semibold uppercase tracking-[0.06em] text-muted lg:px-0">
            {group.heading}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = samePage(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onNavigate}
                    className={[
                      "rounded-md px-2.5",
                      isMenu ? "flex min-h-11 items-center" : "block py-1.5",
                      item.mono ? "font-mono text-[13px]" : "",
                      active
                        ? "bg-accent-tint font-semibold text-accent"
                        : "text-ink hover:text-accent-hover",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}
