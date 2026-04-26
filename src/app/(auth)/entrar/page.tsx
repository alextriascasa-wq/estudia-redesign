"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type Errors = Partial<Record<"email" | "password" | "root", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EntrarForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/panel";
  const errParam = params.get("error");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [errors, setErrors] = React.useState<Errors>(() =>
    errParam === "auth_callback_failed"
      ? { root: "No pudimos validar tu enlace. Vuelve a iniciar sesión." }
      : {}
  );
  const [submitting, setSubmitting] = React.useState(false);

  const validate = (field: "email" | "password", value: string): string | undefined => {
    if (field === "email") {
      if (!value.trim()) return "Introduce tu correo.";
      if (!emailRe.test(value)) return "Correo no válido.";
    }
    if (field === "password") {
      if (!value) return "Introduce tu contraseña.";
      if (value.length < 8) return "Mínimo 8 caracteres.";
    }
    return undefined;
  };

  const onBlur = (field: "email" | "password", value: string) => {
    setErrors((e) => ({ ...e, [field]: validate(field, value) }));
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const nextErrs: Errors = {
      email: validate("email", email),
      password: validate("password", password),
    };
    setErrors(nextErrs);
    const firstInvalid = (Object.keys(nextErrs) as Array<keyof Errors>).find(
      (k) => nextErrs[k]
    );
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      setSubmitting(false);
      setErrors({ root: humanizeAuthError(error.message) });
      return;
    }
    router.replace(next);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Bienvenido de vuelta
        </h1>
        <p className="text-muted-foreground">Entra para seguir donde lo dejaste.</p>
      </header>

      {errors.root && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-[var(--radius-md)] border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {errors.root}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" size="lg" type="button" disabled title="Disponible pronto">
          <span className="font-bold">G</span>&nbsp;Google
        </Button>
        <Button variant="outline" size="lg" type="button" disabled title="Disponible pronto">
          Microsoft
        </Button>
      </div>

      <div className="relative text-center text-xs uppercase tracking-wider text-muted-foreground">
        <div className="absolute inset-0 top-1/2 -z-0 border-t" aria-hidden />
        <span className="relative bg-background px-3">o con tu correo</span>
      </div>

      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email" name="email" type="email" autoComplete="email" inputMode="email" required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => onBlur("email", e.target.value)}
            placeholder="tu@correo.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <Link href="/recuperar" className="text-sm font-medium text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password" name="password" type={showPw ? "text" : "password"}
              autoComplete="current-password" required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => onBlur("password", e.target.value)}
              className="pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-1 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" role="alert" className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm select-none">
          <input
            type="checkbox" checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-4 rounded border-[color:var(--border)] text-primary focus-visible:ring-2 focus-visible:ring-ring"
          />
          <span className="text-muted-foreground">Mantener sesión iniciada</span>
        </label>

        <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={submitting}>
          {submitting
            ? <><Loader2 className="size-4 animate-spin" /> Entrando…</>
            : "Entrar"
          }
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        ¿Todavía no tienes cuenta?{" "}
        <Link href="/registro" className="font-semibold text-primary hover:underline">
          Crea una gratis
        </Link>
      </p>
    </div>
  );
}

function humanizeAuthError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "Correo o contraseña incorrectos.";
  if (m.includes("email not confirmed")) return "Aún no has confirmado tu correo. Revisa tu bandeja.";
  if (m.includes("too many")) return "Demasiados intentos. Espera un momento e inténtalo de nuevo.";
  return msg;
}

export default function EntrarPage() {
  return (
    <React.Suspense
      fallback={
        <div className="space-y-4 animate-pulse">
          <div className="h-10 rounded bg-muted" />
          <div className="h-10 rounded bg-muted" />
          <div className="h-10 rounded bg-muted" />
        </div>
      }
    >
      <EntrarForm />
    </React.Suspense>
  );
}
