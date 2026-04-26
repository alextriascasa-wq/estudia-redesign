import Link from "next/link";
import {
  Flame,
  Play,
  Upload,
  Layers as LayersIcon,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MOCK_USER, MOCK_TODAY, MOCK_WEEK } from "@/lib/mock/dashboard";

function StreakRing({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = Math.min(1, value / max);
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);
  return (
    <div className="relative grid size-[104px] place-items-center">
      <svg className="size-[104px] -rotate-90" viewBox="0 0 100 100" aria-hidden>
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-[color:var(--muted)] dark:text-[color:var(--border)]"
        />
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="url(#streak-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="streak-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5B5BF7" />
            <stop offset="60%" stopColor="#8A5BF7" />
            <stop offset="100%" stopColor="#FFD166" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 font-display text-2xl font-bold leading-none tabular-nums">
            <Flame className="size-5 text-[color:var(--accent-600)]" aria-hidden />
            {value}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

function WeekChart({ data }: { data: { day: string; minutes: number }[] }) {
  const max = Math.max(...data.map((d) => d.minutes), 1);
  const total = data.reduce((sum, d) => sum + d.minutes, 0);
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Esta semana</p>
          <p className="font-display text-2xl font-bold tabular-nums">
            {Math.round((total / 60) * 10) / 10} h
          </p>
        </div>
        <p className="text-sm text-muted-foreground">Objetivo: 6 h</p>
      </div>
      <div className="flex h-32 items-end gap-2">
        {data.map((d) => {
          const h = Math.max(6, Math.round((d.minutes / max) * 100));
          return (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-[linear-gradient(180deg,#7E7EFF_0%,#5B5BF7_100%)] transition-all"
                style={{ height: `${h}%` }}
                role="img"
                aria-label={`${d.day}: ${d.minutes} minutos`}
              />
              <span className="text-[11px] font-medium text-muted-foreground">{d.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const QUICK_ACTIONS = [
  {
    href: "/documentos",
    title: "Subir apuntes",
    desc: "Resúmenes + tarjetas al instante",
    icon: Upload,
    tone: "from-[#5B5BF7] to-[#8A5BF7]",
  },
  {
    href: "/tarjetas",
    title: "Estudiar tarjetas",
    desc: "20 tarjetas te esperan hoy",
    icon: LayersIcon,
    tone: "from-[#F59E0B] to-[#FFD166]",
  },
  {
    href: "/examenes",
    title: "Examen rápido",
    desc: "10 preguntas · 15 min",
    icon: GraduationCap,
    tone: "from-[#22C55E] to-[#4ADE80]",
  },
] as const;

export default function PanelPage() {
  const totalToday = MOCK_TODAY.length;
  const doneToday = MOCK_TODAY.filter((t) => t.done).length;
  const pendingToday = totalToday - doneToday;
  const progressPct = Math.round((doneToday / totalToday) * 100);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <section className="flex flex-col gap-6 rounded-[var(--radius-xl)] border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[color:var(--brand-600)] dark:text-[color:var(--brand-400)]">
            ¡Hola de nuevo, {MOCK_USER.name}! 👋
          </p>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Tienes {pendingToday} {pendingToday === 1 ? "bloque" : "bloques"} de estudio hoy.
          </h2>
          <p className="text-muted-foreground">
            Sigue tu racha. Cada minuto cuenta.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild variant="gradient" size="md">
              <Link href="/plan">
                <Play className="size-4" /> Empezar ahora
              </Link>
            </Button>
            <Button asChild variant="outline" size="md">
              <Link href="/plan">Ver plan completo <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
        <StreakRing value={MOCK_USER.streak} max={30} label="días" />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold">Plan de hoy</h3>
                <p className="text-sm text-muted-foreground">
                  {doneToday} de {totalToday} completados
                </p>
              </div>
              <div className="hidden w-40 sm:block">
                <Progress value={progressPct} />
              </div>
            </div>
            <ul className="divide-y">
              {MOCK_TODAY.map((t, i) => (
                <li key={i} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                  <span
                    className={t.done ? "text-[color:var(--success)]" : "text-muted-foreground"}
                    aria-hidden
                  >
                    {t.done ? <CheckCircle2 className="size-6" /> : <Circle className="size-6" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={
                        t.done
                          ? "truncate text-sm font-medium text-muted-foreground line-through"
                          : "truncate text-sm font-semibold"
                      }
                    >
                      {t.subject} · {t.topic}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" aria-hidden />
                      <span className="tabular-nums">{t.minutes}</span> min
                    </p>
                  </div>
                  {!t.done && (
                    <Button asChild size="sm" variant="outline">
                      <Link href="/plan" aria-label={`Empezar ${t.subject}: ${t.topic}`}>
                        Empezar
                      </Link>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <WeekChart data={MOCK_WEEK} />
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-lg font-semibold">Continúa donde lo dejaste</h3>
          <Link href="/tarjetas" className="text-sm font-medium text-primary hover:underline">
            Ver todo
          </Link>
        </div>
        <Card>
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
            <div
              className="grid size-14 shrink-0 place-items-center rounded-[var(--radius-md)] text-white"
              style={{ background: "var(--gradient-brand)" }}
              aria-hidden
            >
              <LayersIcon className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">Derivadas y límites</p>
              <p className="text-sm text-muted-foreground">
                Matemáticas · 12 tarjetas por repasar · llevas 62%
              </p>
              <div className="mt-3 w-full">
                <Progress value={62} />
              </div>
            </div>
            <Button asChild variant="gradient" className="sm:ml-4">
              <Link href="/tarjetas">
                <Play className="size-4" /> Continuar
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="size-4 text-[color:var(--brand-500)]" aria-hidden />
          <h3 className="font-display text-lg font-semibold">Accesos rápidos</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {QUICK_ACTIONS.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.href}
                href={a.href}
                className="group relative overflow-hidden rounded-[var(--radius-lg)] border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div
                  className={`mb-4 grid size-11 place-items-center rounded-[var(--radius-md)] bg-gradient-to-br ${a.tone} text-white`}
                  aria-hidden
                >
                  <Icon className="size-5" />
                </div>
                <p className="font-semibold">{a.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
                <ArrowRight
                  className="absolute right-4 top-5 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <Card>
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold">Nivel {MOCK_USER.level}</p>
                <p className="text-sm text-muted-foreground tabular-nums">
                  {MOCK_USER.xp} / {MOCK_USER.xpToNext} XP
                </p>
              </div>
              <div className="mt-2">
                <Progress value={Math.round((MOCK_USER.xp / MOCK_USER.xpToNext) * 100)} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Solo {MOCK_USER.xpToNext - MOCK_USER.xp} XP para el próximo nivel.
              </p>
            </div>
            <Button asChild variant="outline" className="sm:w-auto">
              <Link href="/ajustes">Ver logros</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
