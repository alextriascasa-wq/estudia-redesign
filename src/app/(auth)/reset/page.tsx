"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type Errors = Partial<Record<"password" | "confirm" | "root", string>>;

export default function ResetPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!password) next.password = "Elige una contraseña.";
    else if (password.length < 8) next.password = "Mínimo 8 caracteres.";
    if (!confirm) next.confirm = "Repite la contraseña.";
    else if (password && confirm && password !== confirm)
      next.confirm = "Las contraseñas no coinciden.";
    return next;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const next = validate();
    setErrors(next);
    const firstInvalid = (Object.keys(next) as Array<keyof Errors>).find(
      (k) => next[k]
    );
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (error) {
      setErrors({ root: error.message });
      return;
    }
    setDone(true);
    setTimeout(() => router.replace("/panel"), 1500);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="grid size-16 place-items-center rounded-full bg-[color:var(--brand-500)]/10">
          <CheckCircle2 className="size-8 text-[color:var(--brand-500)]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold">Contraseña actualizada</h2>
          <p className="text-muted-foreground">Te llevamos a tu panel…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Elige tu nueva contraseña
        </h1>
        <p className="text-muted-foreground">
          Por seguridad, escríbela dos veces.
        </p>
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

      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="password">Nueva contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              autoComplete="new-password"
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : "password-help"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-12"
              placeholder="Mínimo 8 caracteres"
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
          <p id="password-help" className="text-xs text-muted-foreground">
            Al menos 8 caracteres.
          </p>
          {errors.password && (
            <p id="password-error" role="alert" className="text-sm text-destructive">
              {errors.password}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Repite la contraseña</Label>
          <Input
            id="confirm"
            name="confirm"
            type={showPw ? "text" : "password"}
            autoComplete="new-password"
            required
            aria-invalid={!!errors.confirm}
            aria-describedby={errors.confirm ? "confirm-error" : undefined}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Otra vez, por favor"
          />
          {errors.confirm && (
            <p id="confirm-error" role="alert" className="text-sm text-destructive">
              {errors.confirm}
            </p>
          )}
        </div>

        <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={submitting}>
          {submitting
            ? <><Loader2 className="size-4 animate-spin" /> Guardando…</>
            : "Guardar contraseña"
          }
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/entrar" className="font-semibold text-primary hover:underline">
          Volver a iniciar sesión
        </Link>
      </p>
    </div>
  );
}
