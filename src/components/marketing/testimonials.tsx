import { Quote, Star } from "lucide-react";
import { Section, Container, Eyebrow } from "@/components/shared/container";

const items = [
  {
    quote:
      "Saqu&eacute; un 9 en selectividad de Historia. Nunca hab&iacute;a estudiado tan poco ni tan tranquilo.",
    name: "Luc\u00eda M.",
    role: "2\u00ba Bachillerato \u00b7 Madrid",
    rating: 5,
    color: "#5B5BF7",
  },
  {
    quote:
      "Mis apuntes de clase son un desastre. EstudIA los convierte en tarjetas que de verdad me sirven.",
    name: "Mart\u00edn R.",
    role: "4\u00ba ESO \u00b7 Valencia",
    rating: 5,
    color: "#FFD166",
  },
  {
    quote:
      "Por fin una app que no me trata como a un cr\u00edo. Parece hecha por alguien que estudi\u00f3 selectividad.",
    name: "Andrea V.",
    role: "1\u00ba Bachillerato \u00b7 Sevilla",
    rating: 5,
    color: "#22C55E",
  },
];

export function Testimonials() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Lo que dicen</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            8.200 estudiantes ya no estudian solos.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-[var(--radius-xl)] border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div>
                <Quote className="size-8 opacity-70" style={{ color: t.color }} />
                <blockquote className="mt-4 text-lg font-medium leading-relaxed text-foreground">
                  &laquo;{t.quote}&raquo;
                </blockquote>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-[color:var(--accent-500)] text-[color:var(--accent-500)]" />
                  ))}
                </div>
              </div>
              <figcaption className="mt-6 flex items-center gap-3 border-t pt-4">
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full text-sm font-bold text-white"
                  style={{ background: t.color }}
                >
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
