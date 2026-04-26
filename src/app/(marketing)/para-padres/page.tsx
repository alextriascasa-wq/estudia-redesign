import type { Metadata } from "next";
import { Parents } from "@/components/marketing/parents";
import { Pricing } from "@/components/marketing/pricing";
import { Testimonials } from "@/components/marketing/testimonials";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Para padres",
  description:
    "EstudIA para familias: progreso real, entorno cerrado sin publicidad, plan familiar de hasta 4 cuentas y resúmenes semanales por email.",
};

export default function ParaPadresPage() {
  return (
    <>
      <Parents />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
