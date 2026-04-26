import type { Metadata } from "next";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Features } from "@/components/marketing/features";
import { FinalCTA } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Así funciona EstudIA en tres pasos: sube tus apuntes, la IA genera tu plan y estudias con tarjetas y exámenes adaptativos.",
};

export default function ComoFuncionaPage() {
  return (
    <>
      <HowItWorks />
      <Features />
      <FinalCTA />
    </>
  );
}
