import Link from "next/link";
import { ShieldCheck, BarChart3, Mail, Users } from "lucide-react";
import { Section, Container, Eyebrow } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

const features = [
  { icon: BarChart3, title: "Progreso real", body: "Ve qu\u00e9 estudia y cu\u00e1nto, sin espiar." },
  { icon: ShieldCheck, title: "Sin publicidad ni redes", body: "Entorno cerrado y seguro, cumplimos RGPD." },
  { icon: Mail, title: "Resumen semanal", body: "Un email los domingos con c\u00f3mo va la semana." },
  { icon: Users, title: "Hasta 4 cuentas", body: "Un plan familiar para todos los hermanos." },
];

export function Parents() {
  return (
    <Section className="bg-[image:var(--gradient-brand-soft)]" id="padres">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Para padres y madres</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Tu inversi&oacute;n en su futuro, con datos reales.
            </h2>
            <p className="mt-3 text-muted-foreground text-lg max-w-xl">
              Menos de lo que cuesta una clase particular al mes. M&aacute;s efectivo que subrayar un libro.
              Y por primera vez, pod&eacute;is ver juntos c&oacute;mo avanza.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gradient" size="lg">
                <Link href="/precios#familiar">Ver plan familiar</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/para-padres">M&aacute;s para padres</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-[var(--radius-xl)] border bg-background/80 p-5 backdrop-blur-sm"
                >
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
