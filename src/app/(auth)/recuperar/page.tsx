"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RecuperarPage() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const validate = (value: string): string | undefined => {
    const v = value.trim();
    if (!v) return "Introduce tu correo.";
    if (!emailRe.test(v)) return "Correo no válido.";
    return undefined;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const err = validate(email);
    setError(err);
    if (err) {
      document.getElementById("email")?.focus();
      return;
    }
    setSubmitting(true);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset`,
      }
    );
    setSubmitting(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="grid size-16 place-items-center rounded-full bg-[color:var(--brand-500)]/10">
          <Mail className="size-8 text-[color:var(--brand-500)]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold">Revisa tu correo</h2>
          <p className="text-muted-foreground">
            Si <strong>{email}</strong> está registrado, te hemos enviado un enlace para recuperar la contraseña.
          </p>
        </div>
        <div className="w-full rounded-[var(--radius-lg)] border bg-muted/50 p-4 text-left text-sm text-muted-foreground">
          <p className="font-medium text-foreground">¿No lo ves?</p>
          <p className="mt-1">
            Comprueba la carpeta de spam. Los enlaces caducan a los 30 minutos por seguridad.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => { setSent(false); setEmail(""); }}
          >
            Enviar a otro correo
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/entrar">
              <ArrowLeft className="size-4" /> Volver a iniciar sesión
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Recupera tu contraseña
        </h1>
        <p className="text-muted-foreground">
          Escribe el correo con el que te registraste. Te mandaremos un enlace para elegir una nueva contraseña.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={!!error}
            aria-describedby={error ? "email-error" : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setError(validate(e.target.value))}
            placeholder="tu@correo.com"
          />
          {error && (
            <p id="email-error" role="alert" className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={submitting}>
          {submitting
            ? <><Loader2 className="size-4 animate-spin" /> Enviando…</>
            : "Enviar enlace"
          }
        </Button>
      </form>

      <div className="flex items-center justify-between text-sm">
        <Link href="/entrar" className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Volver
        </Link>
        <Link href="/registro" className="font-semibold text-primary hover:underline">
          Crear cuenta
        </Link>
      </div>
    </div>
  );
}
