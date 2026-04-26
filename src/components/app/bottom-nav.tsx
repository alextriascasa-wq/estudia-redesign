"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SETTINGS_ITEM, type NavItem } from "@/components/app/nav-items";

// Plan §7: max 5 items on mobile bottom nav (Panel / Plan / Tarjetas / Docs / Más).
// Keep first 4 of NAV_ITEMS, then collapse Exámenes + Ajustes into "Más" via /ajustes.
const MOBILE_ITEMS: NavItem[] = [
  ...NAV_ITEMS.slice(0, 4),
  { ...SETTINGS_ITEM, label: "Más", shortLabel: "Más" },
];

export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/panel" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Navegación inferior"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur-md md:hidden pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-5">
        {MOBILE_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="contents">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[56px] flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-medium transition-colors",
                  active
                    ? "text-[color:var(--brand-600)] dark:text-[color:var(--brand-400)]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-full transition-colors",
                    active && "bg-[color:var(--brand-50)] dark:bg-[color:var(--brand-500)]/15"
                  )}
                  aria-hidden
                >
                  <Icon className="size-5" />
                </span>
                <span className="leading-none">{item.shortLabel}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
