export type StudyPlanDay = {
  date: string;
  subject: string;
  minutes: number;
  done: boolean;
  topic: string;
};

export const MOCK_USER = {
  name: "Alex",
  initials: "AL",
  streak: 12,
  level: 8,
  xp: 1820,
  xpToNext: 2400,
  plan: "pro" as const,
};

export const MOCK_TODAY: StudyPlanDay[] = [
  { date: "hoy", subject: "Matem\u00e1ticas", minutes: 25, done: true, topic: "Derivadas" },
  { date: "hoy", subject: "Historia", minutes: 20, done: false, topic: "Guerra Fr\u00eda" },
  { date: "hoy", subject: "Ingl\u00e9s", minutes: 15, done: false, topic: "Present Perfect" },
];

export const MOCK_WEEK = [
  { day: "Lun", minutes: 45 },
  { day: "Mar", minutes: 60 },
  { day: "Mi\u00e9", minutes: 30 },
  { day: "Jue", minutes: 75 },
  { day: "Vie", minutes: 50 },
  { day: "S\u00e1b", minutes: 20 },
  { day: "Dom", minutes: 40 },
];

export type Deck = {
  id: string;
  title: string;
  subject: string;
  cards: number;
  due: number;
  progress: number;
  color: string;
};

export const MOCK_DECKS: Deck[] = [
  { id: "1", title: "Derivadas y l\u00edmites", subject: "Matem\u00e1ticas", cards: 48, due: 12, progress: 62, color: "#5B5BF7" },
  { id: "2", title: "Revoluci\u00f3n Francesa", subject: "Historia", cards: 32, due: 8, progress: 44, color: "#F59E0B" },
  { id: "3", title: "Irregular verbs", subject: "Ingl\u00e9s", cards: 72, due: 0, progress: 95, color: "#22C55E" },
  { id: "4", title: "Tabla peri\u00f3dica", subject: "Qu\u00edmica", cards: 56, due: 24, progress: 15, color: "#EF4444" },
];

export type FlashCard = { id: string; front: string; back: string };

export const MOCK_CARDS: FlashCard[] = [
  { id: "c1", front: "\u00bfQu\u00e9 es una derivada?", back: "La pendiente de la recta tangente a la funci\u00f3n en un punto. Mide c\u00f3mo cambia la funci\u00f3n." },
  { id: "c2", front: "Derivada de sin(x)", back: "cos(x)" },
  { id: "c3", front: "Regla de la cadena", back: "(f \u2218 g)'(x) = f'(g(x)) \u00b7 g'(x)" },
  { id: "c4", front: "Derivada de e^x", back: "e^x" },
  { id: "c5", front: "Derivada de ln(x)", back: "1 / x" },
];

export type DocItem = {
  id: string;
  title: string;
  subject: string;
  uploadedAt: string;
  pages: number;
  status: "procesado" | "procesando";
};

export const MOCK_DOCS: DocItem[] = [
  { id: "d1", title: "Tema 6 - Derivadas.pdf", subject: "Matem\u00e1ticas", uploadedAt: "Hace 2 d\u00edas", pages: 14, status: "procesado" },
  { id: "d2", title: "Apuntes Guerra Fr\u00eda.pdf", subject: "Historia", uploadedAt: "Hace 4 d\u00edas", pages: 22, status: "procesado" },
  { id: "d3", title: "Foto pizarra Qu\u00edmica.jpg", subject: "Qu\u00edmica", uploadedAt: "Hoy", pages: 1, status: "procesando" },
];

export type ExamItem = {
  id: string;
  title: string;
  subject: string;
  questions: number;
  estimatedMinutes: number;
  difficulty: "F\u00e1cil" | "Medio" | "Dif\u00edcil";
};

export const MOCK_EXAMS: ExamItem[] = [
  { id: "e1", title: "Simulacro derivadas", subject: "Matem\u00e1ticas", questions: 15, estimatedMinutes: 30, difficulty: "Medio" },
  { id: "e2", title: "Europa 1945-1989", subject: "Historia", questions: 20, estimatedMinutes: 35, difficulty: "F\u00e1cil" },
  { id: "e3", title: "Est\u00e9quiometr\u00eda", subject: "Qu\u00edmica", questions: 12, estimatedMinutes: 40, difficulty: "Dif\u00edcil" },
];
