"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const current = mounted ? (theme === "system" ? resolvedTheme : theme) : "light";
  const next = current === "dark" ? "light" : "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Cambiar a modo ${next === "dark" ? "oscuro" : "claro"}`}
      onClick={() => setTheme(next)}
      className="relative"
    >
      <Sun className={`transition-all ${current === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"}`} />
      <Moon className={`absolute transition-all ${current === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`} />
    </Button>
  );
}
