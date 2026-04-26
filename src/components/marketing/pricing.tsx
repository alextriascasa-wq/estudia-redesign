"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { PRICING_TIERS, yearlyMonthlyEquivalent, type BillingInterval } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";
import { Section, Container, Eyebrow } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export function Pricing() {
  const [interval, setInterval] = React.useState<BillingInterval>("year");

  return (
    <Section id="precios">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Precios</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Menos que una clase particular. <span className="gradient-text">Infinitamente m&aacute;s.</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Empieza gratis. Cancela cuando quieras. Devoluci&oacute;n de 14 d&iacute;as.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <span className={`text-sm font-medium ${interval === "month" ? "text-foreground" : "text-muted-foreground"}`}>
            Mensual
          </span>
          <Switch
            checked={interval === "year"}
            onCheckedChange={(v) => setInterval(v ? "year" : "month")}
            aria-label="Cambiar entre facturaci\u00f3n mensual y anual"
          />
          <span className={`text-sm font-medium ${interval === "year" ? "text-foreground" : "text-muted-foreground"}`}>
            Anual
          </span>
          <Badge variant="success" className="ml-1">2 meses gratis</Badge>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3 md:items-stretch">
          {PRICING_TIERS.map((tier) => {
            const isYear = interval === "year";
            const price = isYear ? yearlyMonthlyEquivalent(tier) : tier.priceCentsMonthly;
            const isFree = tier.priceCentsMonthly === 0;
            return (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-[var(--radius-xl)] border p-7 transition-shadow ${
                  tier.highlight
                    ? "bg-card shadow-[var(--shadow-hover)] border-primary/40 ring-1 ring-primary/40"
                    : "bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)]"
                }`}
              >
                {tier.highlight && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#5B5BF7,#8A5BF7,#FFD166)" }}
                  >
                    <Sparkles className="mr-1 inline size-3" /> {tier.badge}
                  </span>
                )}
                <div>
                  <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>
                </div>

                <div className="mt-6">
                  {isFree ? (
                    <div className="font-display text-4xl font-bold tabular-nums">0 \u20ac</div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold tabular-nums">
                        {formatPrice(price)}
                      </span>
                      <span className="text-sm text-muted-foreground">/mes</span>
                    </div>
                  )}
                  {isYear && !isFree && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      Facturado {formatPrice(tier.priceCentsYearly)} al a&ntilde;o
                    </div>
                  )}
                </div>

                <Button
                  asChild
                  variant={tier.highlight ? "gradient" : "outline"}
                  size="lg"
                  className="mt-6"
                >
                  <Link href={`/registro?plan=${tier.id}`}>{tier.cta}</Link>
                </Button>

                <ul className="mt-6 space-y-3 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {tier.limits && (
                  <p className="mt-5 text-xs text-muted-foreground border-t pt-4">{tier.limits}</p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
