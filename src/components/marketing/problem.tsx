import { CheckCircle2, XCircle } from "lucide-react";
import { Section, Container, Eyebrow } from "@/components/shared/container";

export function Problem() {
  return (
    <Section className="bg-muted/40" id="problema">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>El problema real</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Estudias horas y sientes que no avanzas.
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            No es culpa tuya. Nadie te ense&ntilde;a a estudiar. EstudIA s&iacute;.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[var(--radius-xl)] border bg-background p-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
              <XCircle className="size-4" /> Antes
            </div>
            <ul className="mt-5 space-y-3 text-foreground/80">
              {[
                "Apuntes ca\u00f3ticos que nadie entiende",
                "Subrayas todo y no recuerdas nada",
                "Horas frente al libro, cero progreso",
                "No sabes qu\u00e9 va a entrar en el examen",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border bg-[image:var(--gradient-brand-soft)] p-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
              <CheckCircle2 className="size-4" /> Con EstudIA
            </div>
            <ul className="mt-5 space-y-3 text-foreground">
              {[
                "Tus apuntes se convierten en tarjetas y res\u00famenes claros",
                "Estudias lo justo con repetici\u00f3n espaciada",
                "Plan diario adaptado a tu tiempo real",
                "Ex\u00e1menes de pr\u00e1ctica con el nivel de tu curso",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
