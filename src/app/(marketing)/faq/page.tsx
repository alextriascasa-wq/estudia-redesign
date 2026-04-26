import type { Metadata } from "next";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas a las dudas más comunes sobre EstudIA: privacidad, cancelación, compatibilidad, uso en móvil y plan familiar.",
};

export default function FAQPage() {
  return (
    <>
      <FAQ />
      <FinalCTA />
    </>
  );
}
