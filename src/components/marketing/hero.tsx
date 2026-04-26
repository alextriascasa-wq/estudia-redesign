"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/shared/container";
import { Mascot } from "@/components/shared/mascot";

export function Hero() {
  return (
    <section className="relative overflow-hidden" id="contenido">
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -top-24 -left-24 h-[36rem] w-[36rem] rounded-full bg-[color:var(--brand-500)]/20 blur-3xl" />
        <div className="blob absolute -top-10 right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[color:var(--accent-500)]/25 blur-3xl [animation-delay:-6s]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.white/70)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,theme(colors.black/40)_0%,transparent_60%)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 pt-12 sm:pt-20 pb-20 sm:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-6"
          >
            <Eyebrow>
              <Sparkles className="size-3.5" />
              Copiloto de estudio con IA
            </Eyebrow>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
              Estudia menos.
              <br />
              Aprende <span className="gradient-text">mucho m&aacute;s.</span>
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
              EstudIA convierte tus apuntes en un plan personalizado, tarjetas adaptativas y
              ex&aacute;menes de pr&aacute;ctica. Hecho para estudiantes de la ESO y Bachillerato.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button asChild variant="gradient" size="xl" className="group">
                <Link href="/registro">
                  Empieza gratis
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/como-funciona">C&oacute;mo funciona</Link>
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {["#5B5BF7", "#FFD166", "#22C55E", "#F87171"].map((c, i) => (
                    <span
                      key={i}
                      className="grid size-7 place-items-center rounded-full border-2 border-background text-[10px] font-bold text-white"
                      style={{ background: c }}
                    >
                      {"ABMR"[i]}
                    </span>
                  ))}
                </div>
                <span className="font-medium">+8.200 estudiantes</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-[color:var(--accent-500)] text-[color:var(--accent-500)]" />
                ))}
                <span className="ml-1 font-medium">4,9 / 5</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="size-4 text-[color:var(--accent-600)]" />
                <span className="font-medium">Racha media: 11 d&iacute;as</span>
              </div>
            </div>
          </motion.div>

          {/* Right: mascot + floating preview cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[440px] sm:h-[520px]"
          >
            <div className="absolute inset-0 grid place-items-center">
              <Mascot size={300} className="drop-shadow-[0_20px_40px_rgba(91,91,247,0.25)]" />
            </div>

            {/* Floating flashcard */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute left-[-8px] top-6 sm:left-0 sm:top-4 w-56 rounded-2xl border bg-card p-4 shadow-[var(--shadow-hover)]"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                Tarjeta del d&iacute;a
              </div>
              <div className="mt-2 font-display text-lg font-semibold leading-snug">
                &iquest;Qu&eacute; es una derivada?
              </div>
              <div className="mt-3 text-xs text-muted-foreground">Toca para ver la respuesta \u2192</div>
            </motion.div>

            {/* Floating streak */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute right-[-8px] top-24 sm:right-0 w-48 rounded-2xl border bg-card p-4 shadow-[var(--shadow-hover)]"
            >
              <div className="flex items-center gap-2">
                <div className="grid size-9 place-items-center rounded-xl bg-[color:var(--accent-500)]/20">
                  <Flame className="size-5 text-[color:var(--accent-600)]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Tu racha</div>
                  <div className="font-display text-xl font-bold tabular-nums">12 d&iacute;as</div>
                </div>
              </div>
            </motion.div>

            {/* Floating progress */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-4 left-6 sm:left-10 w-64 rounded-2xl border bg-card p-4 shadow-[var(--shadow-hover)]"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Plan de la semana</span>
                <span className="font-semibold text-success">78%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg,#5B5BF7,#8A5BF7,#FFD166)" }}
                />
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-foreground">
                <span className="grid size-2 place-items-center rounded-full bg-success" /> Vas mejor que el 82% de tu clase
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
