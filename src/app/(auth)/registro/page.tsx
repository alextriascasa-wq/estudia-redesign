"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, GraduationCap, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";

type Persona = "estudiante" | "padre";
type Field = "name" | "email" | "password" | "birthdate" | "terms" | "root";
type Errors = Partial<Record<Field, string>>;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function yearsBetween(from: Date, to: Date): number {
  let age = to.getFullYear() - from.getFullYear();
  const m = to.getMonth() - from.getMonth();
  if (m < 0 || (m === 0 && to.getDate() < from.getDate())) age -= 1;
  return age;
}

function RegistroForm() {
  const params = useSearchParams();
  const planHint = params.get("plan");
  const [persona, setPersona] = React.useState<Persona>("estudiante");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [birthdate, setBirthdate] = React.useState("");
  const [terms, setTerms] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const validate = (field: Field, value: string | boolean): string | undefined => {
    if (field === "name") {
      const v = String(value).trim();
      if (!v) return persona === "estudiante" ? "¿Cómo te llamas?" : "Introduce tu nombre.";
      if (v.length < 2) return "Mínimo 2 caracteres.";
    }
    if (field === "email") {
      const v = String(value).trim();
      if (!v) return "Introduce tu correo.";
      if (!emailRe.test(v)) return "Correo no válido.";
    }
    if (field === "password") {
      const v = String(value);
      if (!v) return "Elige una contraseña.";
      if (v.length < 8) return "Mínimo 8 caracteres.";
    }
    if (field === "birthdate" && persona === "estudiante") {
      const v = String(value);
      if (!v) return "Introduce tu fecha de nacimiento.";
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return "Fecha no válida.";
      const age = yearsBetween(d, new Date());
      if (age < 13) return "Necesitas 13 años o más (o el consentimiento de un adulto).";
      if (age > 100) return "Revisa la fecha.";
    }
    if (field === "terms" && !value) return "Debes aceptar los términos para continuar.";
    return undefined;
  };

  const onBlur = (field: Field, value: string | boolean) =>
    setErrors((e) => ({ ...e, [field]: validate(field, value) }));

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const next: Errors = {
      name: validate("name", name),
      email: validate("email", email),
      password: validate("password", password),
      terms: validate("terms", terms),
    };
    if (persona === "estudiante") next.birthdate = validate("birthdate", birthdate);
    setErrors(next);
    const firstInvalid = (Object.keys(next) as Field[]).find((k) => next[k]);
    if (firstInvalid) { document.getElementById(firstInvalid)?.focus(); return; }
    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/panel`,
        data: {
          full_name: name.trim(),
          persona,
          ...(persona === "estudiante" ? { birthdate } : {}),
        },
      },
    });
    setSubmitting(false);
    if (error) {
      setErrors((e) => ({ ...e, root: error.message }));
      return;
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="grid size-16 place-items-center rounded-full bg-[color:var(--brand-500)]/10">
          <CheckCircle2 className="size-8 text-[color:var(--brand-500)]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold">¡Ya casi estás!</h2>
          <p className="text-muted-foreground">Hemos apuntado tu cuenta. Te avisaremos cuando la beta esté lista.</p>
        </div>
        <div className="w-full rounded-[var(--radius-lg)] border bg-muted/50 p-4 text-left text-sm">
          <p className="font-medium text-foreground">📬 Revisa tu correo</p>
          <p className="mt-1 text-muted-foreground">
            Enviaremos la confirmación a <strong>{email}</strong>. Comprueba también la carpeta de spam.
          </p>
        </div>
        <Button asChild variant="gradient" className="w-full">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Empieza gratis</h1>
        <p className="text-muted-foreground">
          {planHint
            ? `Estás creando una cuenta para el plan ${planHint}. Cancela cuando quieras.`
            : "30 segundos. Sin tarjeta. Cancela cuando quieras."}
        </p>
      </header>

      <Tabs value={persona} onValueChange={(v) => setPersona(v as Persona)}>
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="estudiante" className="gap-2">
            <GraduationCap className="size-4" /> Soy estudiante
          </TabsTrigger>
          <TabsTrigger value="padre" className="gap-2">
            <Users className="size-4" /> Soy padre/madre
          </TabsTrigger>
        </TabsList>
        <TabsContent value="estudiante" className="mt-6">
          <p className="mb-4 text-sm text-muted-foreground">
            Te montaremos un plan desde tu primer apunte. Acceso gratis a las herramientas básicas.
          </p>
        </TabsContent>
        <TabsContent value="padre" className="mt-6">
          <p className="mb-4 text-sm text-muted-foreground">
            Crea la cuenta de tu familia. Añadirás a tus hijos en el siguiente paso.
          </p>
        </TabsContent>
      </Tabs>

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
          <Label htmlFor="name">{persona === "estudiante" ? "Tu nombre" : "Tu nombre completo"}</Label>
          <Input
            id="name" name="name" autoComplete="given-name" required
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}
            value={name} onChange={(e) => setName(e.target.value)} onBlur={(e) => onBlur("name", e.target.value)}
            placeholder={persona === "estudiante" ? "María" : "Ana García"}
          />
          {errors.name && <p id="name-error" role="alert" className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email" name="email" type="email" autoComplete="email" inputMode="email" required
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}
            value={email} onChange={(e) => setEmail(e.target.value)} onBlur={(e) => onBlur("email", e.target.value)}
            placeholder="tu@correo.com"
          />
          {errors.email && <p id="email-error" role="alert" className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password" name="password" type={showPw ? "text" : "password"}
              autoComplete="new-password" required
              aria-invalid={!!errors.password}
              aria-describedby={`password-help${errors.password ? " password-error" : ""}`}
              value={password} onChange={(e) => setPassword(e.target.value)} onBlur={(e) => onBlur("password", e.target.value)}
              className="pr-12" placeholder="Mínimo 8 caracteres"
            />
            <button
              type="button" onClick={() => setShowPw((v) => !v)}
              className="absolute right-1 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <p id="password-help" className="text-xs text-muted-foreground">
            Al menos 8 caracteres. Usa mayúsculas, minúsculas y un número.
          </p>
          {errors.password && <p id="password-error" role="alert" className="text-sm text-destructive">{errors.password}</p>}
        </div>

        {persona === "estudiante" && (
          <div className="space-y-2">
            <Label htmlFor="birthdate">Fecha de nacimiento</Label>
            <Input
              id="birthdate" name="birthdate" type="date" required
              aria-invalid={!!errors.birthdate}
              aria-describedby={`birthdate-help${errors.birthdate ? " birthdate-error" : ""}`}
              value={birthdate} onChange={(e) => setBirthdate(e.target.value)} onBlur={(e) => onBlur("birthdate", e.target.value)}
            />
            <p id="birthdate-help" className="text-xs text-muted-foreground">
              A partir de los 14 años puedes usar EstudIA tú solo/a.
            </p>
            {errors.birthdate && <p id="birthdate-error" role="alert" className="text-sm text-destructive">{errors.birthdate}</p>}
          </div>
        )}

        <label className="flex items-start gap-2 text-sm select-none">
          <input
            id="terms" type="checkbox" checked={terms}
            onChange={(e) => { setTerms(e.target.checked); setErrors((err) => ({ ...err, terms: validate("terms", e.target.checked) })); }}
            className="mt-0.5 size-4 shrink-0 rounded border-[color:var(--border)] text-primary focus-visible:ring-2 focus-visible:ring-ring"
            aria-invalid={!!errors.terms} aria-describedby={errors.terms ? "terms-error" : undefined}
          />
          <span className="text-muted-foreground">
            Acepto los{" "}
            <Link href="#" className="font-medium text-foreground underline-offset-2 hover:underline">términos</Link>{" "}
            y la{" "}
            <Link href="#" className="font-medium text-foreground underline-offset-2 hover:underline">política de privacidad</Link>.
          </span>
        </label>
        {errors.terms && <p id="terms-error" role="alert" className="text-sm text-destructive">{errors.terms}</p>}

        <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={submitting}>
          {submitting ? <><Loader2 className="size-4 animate-spin" /> Creando cuenta…</> : "Crear cuenta gratis"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link href="/entrar" className="font-semibold text-primary hover:underline">Entra aquí</Link>
      </p>
    </div>
  );
}

export default function RegistroPage() {
  return (
    <React.Suspense fallback={
      <div className="space-y-4 animate-pulse">
        <div className="h-10 rounded bg-muted" />
        <div className="h-10 rounded bg-muted" />
        <div className="h-10 rounded bg-muted" />
      </div>
    }>
      <RegistroForm />
    </React.Suspense>
  );
}
