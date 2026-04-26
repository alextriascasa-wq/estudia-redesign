import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full rounded-[var(--radius-md)] border bg-background px-4 py-2 text-base",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-[color:var(--brand-500)]/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
