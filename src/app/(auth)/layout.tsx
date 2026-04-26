import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Mascot } from "@/components/shared/mascot";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-1">
      {/* Left: form (100% mobile, 60% desktop) */}
      <div className="flex w-full flex-col md:w-[60%] lg:w-[55%]">
        <header className="flex items-center justify-between px-6 py-5 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Volver al inicio"
          >
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Volver al inicio</span>
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 py-8 sm:px-10">
          <div className="w-full max-w-md">{children}</div>
        </main>

        <footer className="px-6 py-5 text-center text-xs text-muted-foreground sm:px-10">
          © {new Date().getFullYear()} EstudIA · Hecho con ❤️ en España
        </footer>
      </div>

      {/* Right: brand panel (hidden mobile) */}
      <aside
        aria-hidden
        className="relative hidden overflow-hidden md:flex md:w-[40%] lg:w-[45%] items-center justify-center"
        style={{ background: "linear-gradient(135deg,#5B5BF7 0%,#8A5BF7 55%,#FFD166 130%)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex max-w-sm flex-col items-center gap-8 px-8 text-center text-white">
          <Mascot size={240} className="drop-shadow-[0_12px_40px_rgba(0,0,0,0.25)]" />

          <figure className="rounded-[var(--radius-xl)] border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <Quote className="size-6 opacity-80" />
            <blockquote className="mt-3 font-display text-lg font-semibold leading-snug">
              «Pasé de estudiar 4 horas y olvidarlo todo a estudiar 1 hora bien.
              EstudIA me cambió el último curso.»
            </blockquote>
            <figcaption className="mt-4 text-sm opacity-80">
              Lucía M. · 2º Bachillerato
            </figcaption>
          </figure>
        </div>
      </aside>
    </div>
  );
}
