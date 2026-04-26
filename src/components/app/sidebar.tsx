"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { NAV_ITEMS, SETTINGS_ITEM } from "@/components/app/nav-items";
import { MOCK_USER } from "@/lib/mock/dashboard";

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/panel" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside
      className="sticky top-0 hidden h-dvh w-[248px] shrink-0 flex-col border-r bg-card md:flex"
      aria-label="Navegación principal"
    >
      <div className="px-5 py-5">
        <Link
          href="/panel"
          className="inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 px-3" aria-label="Secciones">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-[color:var(--brand-50)] text-[color:var(--brand-600)] dark:bg-[color:var(--brand-500)]/15 dark:text-[color:var(--brand-400)]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-[18px]" aria-hidden />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto flex flex-col gap-3 border-t p-3">
        <Link
          href={SETTINGS_ITEM.href}
          aria-current={isActive(SETTINGS_ITEM.href) ? "page" : undefined}
          className={cn(
            "flex h-11 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm font-medium transition-colors",
            isActive(SETTINGS_ITEM.href)
              ? "bg-[color:var(--brand-50)] text-[color:var(--brand-600)] dark:bg-[color:var(--brand-500)]/15 dark:text-[color:var(--brand-400)]"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <SETTINGS_ITEM.icon className="size-[18px]" aria-hidden />
          <span>{SETTINGS_ITEM.label}</span>
        </Link>

        <div className="flex items-center gap-3 rounded-[var(--radius-md)] border bg-muted/40 p-2.5">
          <div
            className="grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
            style={{ background: "var(--gradient-brand)" }}
            aria-hidden
          >
            {MOCK_USER.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{MOCK_USER.name}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Flame className="size-3 text-[color:var(--accent-600)]" aria-hidden />
              <span className="tabular-nums">{MOCK_USER.streak}</span> días · Plan {MOCK_USER.plan}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
