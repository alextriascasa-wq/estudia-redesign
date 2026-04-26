"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { NAV_ITEMS, SETTINGS_ITEM } from "@/components/app/nav-items";

function currentLabel(pathname: string): string {
  const all = [...NAV_ITEMS, SETTINGS_ITEM];
  const match = all.find(
    (i) => pathname === i.href || pathname.startsWith(`${i.href}/`)
  );
  return match?.label ?? "Panel";
}

export function Topbar() {
  const pathname = usePathname();
  const label = currentLabel(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <Link
        href="/panel"
        className="inline-flex items-center gap-2 rounded-md md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Ir al panel"
      >
        <Logo />
      </Link>

      <h1 className="hidden font-display text-lg font-semibold md:block">{label}</h1>

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hidden sm:inline-flex"
          aria-label="Buscar"
        >
          <Search className="size-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Notificaciones"
          className="relative"
        >
          <Bell className="size-5" />
          <span
            aria-hidden
            className="absolute right-2 top-2 size-2 rounded-full bg-[color:var(--accent-500)]"
          />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
