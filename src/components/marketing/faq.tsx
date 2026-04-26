import { Section, Container, Eyebrow } from "@/components/shared/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    q: "\u00bfEstudIA hace los deberes por m\u00ed?",
    a: "No. EstudIA te ense\u00f1a a estudiar mejor: explica conceptos, genera tarjetas y ex\u00e1menes de pr\u00e1ctica. Nada de hacer trampas, nada de copiar y pegar en una redacci\u00f3n.",
  },
  {
    q: "\u00bfSirve para mi curso?",
    a: "S\u00ed. Funciona para toda la ESO, Bachillerato y tambi\u00e9n para oposiciones b\u00e1sicas. Se adapta al nivel detectado autom\u00e1ticamente.",
  },
  {
    q: "\u00bfC\u00f3mo puedo cancelar la suscripci\u00f3n?",
    a: "Desde Ajustes > Suscripci\u00f3n con un solo clic. Sin llamadas ni formularios raros. Tienes 14 d\u00edas de devoluci\u00f3n si algo no encaja.",
  },
  {
    q: "\u00bfQu\u00e9 pasa con mis apuntes y datos?",
    a: "Son tuyos. Cumplimos RGPD, cifrado en tr\u00e1nsito y en reposo, y no entrenamos modelos con tus datos. Puedes borrar todo cuando quieras.",
  },
  {
    q: "\u00bfFunciona en m\u00f3vil?",
    a: "S\u00ed. EstudIA es una aplicaci\u00f3n web instalable en iOS y Android. Funciona tambi\u00e9n en ordenador y tablet.",
  },
  {
    q: "\u00bfPuedo compartir cuenta con mi hermano/a?",
    a: "No recomendamos compartir una cuenta porque la IA se adapta a c\u00f3mo estudias. Para eso tenemos el plan Familiar con hasta 4 cuentas.",
  },
  {
    q: "\u00bfNecesito ser mayor de edad?",
    a: "No. A partir de 14 a\u00f1os puedes usar EstudIA por tu cuenta. Si tienes menos, necesitamos el consentimiento de tus padres/tutores.",
  },
  {
    q: "\u00bfHay opci\u00f3n para colegios?",
    a: "S\u00ed, estamos hablando con varios centros. Escr\u00edbenos a colegios@estudia.app.",
  },
];

export function FAQ() {
  return (
    <Section className="bg-muted/40" id="faq">
      <Container size="md">
        <div className="max-w-2xl">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Lo que te estar&aacute;s preguntando.
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 rounded-[var(--radius-xl)] border bg-background px-6">
          {items.map((it, i) => (
            <AccordionItem value={`q-${i}`} key={it.q}>
              <AccordionTrigger>{it.q}</AccordionTrigger>
              <AccordionContent>{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
