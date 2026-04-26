"use client";

import { motion } from "framer-motion";
import { Upload, Wand2, Rocket } from "lucide-react";
import { Section, Container, Eyebrow } from "@/components/shared/container";

const steps = [
  {
    icon: Upload,
    title: "Sube tus apuntes",
    body: "PDF, fotos de la pizarra o apuntes a mano. En 10 segundos EstudIA los entiende.",
  },
  {
    icon: Wand2,
    title: "La IA organiza todo",
    body: "Genera resumen, tarjetas y un plan de estudio a tu medida.",
  },
  {
    icon: Rocket,
    title: "Estudia 20 min al d\u00eda",
    body: "Siguiendo el plan, llegas al examen con todo repasado sin empanadas.",
  },
];

export function HowItWorks() {
  return (
    <Section className="bg-muted/40" id="como-funciona">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>C&oacute;mo funciona</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Tres pasos. Ya est&aacute;.
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative rounded-[var(--radius-xl)] border bg-background p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl font-bold text-primary/30 tabular-nums">
                    0{i + 1}
                  </span>
                  <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.body}</p>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
