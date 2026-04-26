import { cn } from "@/lib/utils";

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label="EstudIA">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="estudiaLogoGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5B5BF7" />
            <stop offset="60%" stopColor="#8A5BF7" />
            <stop offset="100%" stopColor="#FFD166" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="32" height="32" rx="9" fill="url(#estudiaLogoGradient)" />
        <path
          d="M9 11.5a2.5 2.5 0 0 1 2.5-2.5H21a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-9.5A2.5 2.5 0 0 1 9 21.5v-10Z"
          fill="white"
          fillOpacity="0.95"
        />
        <path
          d="M12 14h7M12 17h5"
          stroke="#5B5BF7"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="22" cy="10" r="2.5" fill="#FFD166" stroke="white" strokeWidth="1.2" />
      </svg>
      {withText && (
        <span className="font-display text-xl font-bold tracking-tight">
          Estud<span className="gradient-text">IA</span>
        </span>
      )}
    </span>
  );
}
