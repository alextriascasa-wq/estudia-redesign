"use client";

import Link from "next/link";
import * as React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#caracteristicas", label: "Caracter\u00edsticas" },
  { href: "/como-funciona", label: "C\u00f3mo funciona" },
  { href: "/para-padres", label: "Para padres" },
  { href: "/precios", label: "Precios" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors",
        scrolled ? "border-b bg-background/80 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost">
            <Link href="/entrar">Entrar</Link>
          </Button>
          <Button asChild variant="gradient">
            <Link href="/registro">Empieza gratis</Link>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Cerrar men\u00fa" : "Abrir men\u00fa"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Principal m\u00f3vil">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button asChild variant="outline" size="lg">
                <Link href="/entrar">Entrar</Link>
              </Button>
              <Button asChild variant="gradient" size="lg">
                <Link href="/registro">Empieza gratis</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
