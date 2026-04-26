import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/shared/mascot";

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div
          className="relative overflow-hidden rounded-[var(--radius-xl)] p-8 sm:p-14"
          style={{ background: "linear-gradient(135deg,#5B5BF7 0%,#8A5BF7 50%,#FFD166 120%)" }}
        >
          <div className="relative z-10 max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="size-3.5" /> Empieza hoy
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Tu pr&oacute;ximo examen pide a gritos un plan.
            </h2>
            <p className="mt-4 text-lg text-white/85 max-w-xl">
              Crea tu cuenta gratis en 30 segundos. Sube unos apuntes. Mira c&oacute;mo la IA te monta el plan.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="xl"
                className="bg-white text-foreground hover:bg-white/90"
              >
                <Link href="/registro">
                  Empieza gratis <ArrowRight className="ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="ghost"
                className="text-white hover:bg-white/15"
              >
                <Link href="/precios">Ver precios</Link>
              </Button>
            </div>
          </div>

          <div className="pointer-events-none absolute right-[-2rem] top-[-2rem] opacity-95 drop-shadow-2xl hidden sm:block">
            <Mascot size={340} />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
