"use client";

import { motion } from "framer-motion";
import { BookOpen, FileUp, ListChecks, Brain, Sparkles, Trophy } from "lucide-react";
import { Section, Container, Eyebrow } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";

const items = [
  {
    span: "md:col-span-2 md:row-span-2",
    icon: BookOpen,
    title: "Tarjetas adaptativas",
    body: "Repetici\u00f3n espaciada con IA. Repasa solo lo que se te olvida, cuando se te olvida.",
    visual: (
      <div className="relative mt-6 h-56 rounded-2xl border bg-background p-5 shadow-[var(--shadow-card)]">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">Tarjeta 3 / 48</div>
        <div className="mt-3 font-display text-2xl font-semibold leading-snug">
          Derivada de sin(x)
        </div>
        <div className="absolute inset-x-5 bottom-5 flex gap-2">
          {[
            { l: "Otra vez", c: "bg-destructive/10 text-destructive" },
            { l: "Dif\u00edcil", c: "bg-[color:var(--accent-500)]/20 text-[color:var(--accent-600)]" },
            { l: "Bien", c: "bg-primary/10 text-primary" },
            { l: "F\u00e1cil", c: "bg-success/15 text-success" },
          ].map((b) => (
            <span key={b.l} className={`flex-1 rounded-lg px-2 py-1.5 text-center text-xs font-semibold ${b.c}`}>
              {b.l}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    span: "",
    icon: FileUp,
    title: "Sube tus apuntes",
    body: "PDF, foto de pizarra o apuntes escritos a mano. EstudIA los entiende.",
    badge: "OCR + IA",
  },
  {
    span: "",
    icon: ListChecks,
    title: "Plan diario",
    body: "Te dice qu\u00e9 estudiar cada d\u00eda seg\u00fan tu examen y tu tiempo real.",
    badge: "Adaptativo",
  },
  {
    span: "md:col-span-2",
    icon: Brain,
    title: "Ex\u00e1menes de pr\u00e1ctica",
    body: "Genera simulacros con el nivel exacto de tu curso y corrige al instante con explicaciones.",
    visual: (
      <div className="mt-5 rounded-2xl border bg-background p-4 shadow-[var(--shadow-card)]">
        <div className="text-xs text-muted-foreground">Pregunta 4 / 15</div>
        <p className="mt-2 font-medium">
          &iquest;Qu&eacute; a&ntilde;o cay&oacute; el Muro de Berl&iacute;n?
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {["1987", "1989", "1991", "1993"].map((y, i) => (
            <button
              key={y}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors hover:border-primary ${
                i === 1 ? "border-success/60 bg-success/10 text-success font-semibold" : ""
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    span: "",
    icon: Sparkles,
    title: "Res&uacute;menes claros",
    body: "De 20 p&aacute;ginas a los conceptos clave. Con esquemas visuales.",
    badge: "Al instante",
  },
  {
    span: "",
    icon: Trophy,
    title: "Rachas y logros",
    body: "Mantener el h&aacute;bito es la mitad del camino.",
    badge: "Motivaci\u00f3n real",
  },
];

export function Features() {
  return (
    <Section id="caracteristicas">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Qu&eacute; hace EstudIA</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Todo lo que necesitas para aprobar con nota.
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Sin apps separadas. Sin apuntes perdidos. Todo conectado por una IA que entiende c&oacute;mo estudias.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:auto-rows-[minmax(0,1fr)]">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className={`group relative overflow-hidden rounded-[var(--radius-xl)] border bg-card p-6 transition-all hover:shadow-[var(--shadow-hover)] ${it.span}`}
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  {it.badge && <Badge variant="accent">{it.badge}</Badge>}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{it.title}</h3>
                <p className="mt-1.5 text-muted-foreground">{it.body}</p>
                {it.visual}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
