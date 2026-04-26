import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  size = "lg",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: "sm" | "md" | "lg" | "xl" }) {
  const maxW = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  }[size];
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", maxW, className)} {...props}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section id={id} className={cn("py-20 sm:py-28 scroll-mt-20", className)} {...props}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
