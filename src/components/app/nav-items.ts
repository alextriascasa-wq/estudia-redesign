import {
  LayoutDashboard,
  CalendarDays,
  Layers,
  FileText,
  GraduationCap,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/panel", label: "Panel", shortLabel: "Panel", icon: LayoutDashboard },
  { href: "/plan", label: "Plan de estudio", shortLabel: "Plan", icon: CalendarDays },
  { href: "/tarjetas", label: "Tarjetas", shortLabel: "Tarjetas", icon: Layers },
  { href: "/documentos", label: "Documentos", shortLabel: "Docs", icon: FileText },
  { href: "/examenes", label: "Exámenes", shortLabel: "Exámenes", icon: GraduationCap },
];

export const SETTINGS_ITEM: NavItem = {
  href: "/ajustes",
  label: "Ajustes",
  shortLabel: "Más",
  icon: Settings,
};
