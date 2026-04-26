import type { Metadata } from "next";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Planes de EstudIA: gratis para empezar, Pro individual y Familiar para hasta 4 cuentas. Facturación mensual o anual con 2 meses gratis.",
};

export default function PreciosPage() {
  return (
    <>
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
