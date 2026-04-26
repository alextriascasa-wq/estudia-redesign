export type BillingInterval = "month" | "year";

export type PricingTier = {
  id: "gratis" | "pro" | "familiar";
  name: string;
  tagline: string;
  priceCentsMonthly: number;
  priceCentsYearly: number;
  highlight?: boolean;
  cta: string;
  features: string[];
  limits?: string;
  badge?: string;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "gratis",
    name: "Gratis",
    tagline: "Para probar EstudIA sin compromiso.",
    priceCentsMonthly: 0,
    priceCentsYearly: 0,
    cta: "Empieza gratis",
    features: [
      "Hasta 20 tarjetas con IA al d\u00eda",
      "1 resumen de apuntes por semana",
      "Plan de estudio semanal b\u00e1sico",
      "Acceso desde m\u00f3vil y ordenador",
    ],
    limits: "Ideal para probarlo durante una semana.",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Para estudiantes que van a por todas.",
    priceCentsMonthly: 799,
    priceCentsYearly: 6999, // ~2 meses gratis
    highlight: true,
    badge: "M\u00e1s popular",
    cta: "Hazte Pro",
    features: [
      "Tarjetas y res\u00famenes ilimitados",
      "Ex\u00e1menes de pr\u00e1ctica personalizados",
      "Plan de estudio adaptativo diario",
      "Sube PDF, apuntes y fotos de la pizarra",
      "Racha, logros y recordatorios",
      "Soporte prioritario",
    ],
  },
  {
    id: "familiar",
    name: "Familiar",
    tagline: "Un plan. Hasta 4 estudiantes. Control parental incluido.",
    priceCentsMonthly: 1499,
    priceCentsYearly: 12999,
    cta: "Elegir Familiar",
    features: [
      "Todo lo de Pro para 4 cuentas",
      "Panel para padres con progreso real",
      "Control de tiempo de estudio",
      "Resumen semanal por email",
      "Cambios de plan sin coste",
    ],
  },
];

export function yearlyMonthlyEquivalent(tier: PricingTier) {
  return Math.round(tier.priceCentsYearly / 12);
}
