import { cn } from "@/lib/utils";

/**
 * Friendly study-owl mascot — SVG only, no external deps.
 * Keeps a subtle idle breathing animation that respects prefers-reduced-motion via globals.css.
 */
export function Mascot({ className, size = 180 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Bu\u00edta, la mascota de EstudIA"
      role="img"
      className={cn("select-none", className)}
    >
      <defs>
        <radialGradient id="mascotBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#FFD166" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mascotBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7E7EFF" />
          <stop offset="100%" stopColor="#5B5BF7" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#mascotBg)" />
      {/* Body */}
      <ellipse cx="100" cy="120" rx="58" ry="60" fill="url(#mascotBody)" />
      {/* Belly */}
      <ellipse cx="100" cy="130" rx="38" ry="42" fill="#EFEFFE" />
      {/* Eyes base */}
      <circle cx="82" cy="98" r="18" fill="white" />
      <circle cx="118" cy="98" r="18" fill="white" />
      {/* Glasses */}
      <circle cx="82" cy="98" r="16" stroke="#0E0E23" strokeWidth="3" fill="none" />
      <circle cx="118" cy="98" r="16" stroke="#0E0E23" strokeWidth="3" fill="none" />
      <path d="M98 98h4" stroke="#0E0E23" strokeWidth="3" strokeLinecap="round" />
      {/* Pupils */}
      <circle cx="84" cy="100" r="5" fill="#0E0E23" />
      <circle cx="120" cy="100" r="5" fill="#0E0E23" />
      <circle cx="86" cy="98" r="1.6" fill="white" />
      <circle cx="122" cy="98" r="1.6" fill="white" />
      {/* Beak */}
      <path d="M94 116 L100 124 L106 116 Z" fill="#FFD166" stroke="#F4B942" strokeWidth="1" />
      {/* Cheeks */}
      <circle cx="68" cy="118" r="4" fill="#FFB7C5" opacity="0.7" />
      <circle cx="132" cy="118" r="4" fill="#FFB7C5" opacity="0.7" />
      {/* Wing holding a book */}
      <path d="M150 130 q12 6 10 24 q-20 4 -28 -12 Z" fill="#4848E0" />
      <rect x="140" y="138" width="22" height="16" rx="2" fill="#FFD166" stroke="#F4B942" strokeWidth="1.2" />
      <path d="M144 142h14M144 146h10" stroke="#4848E0" strokeWidth="1.2" strokeLinecap="round" />
      {/* Feet */}
      <path d="M82 176 q0 6 8 6 M90 176 q0 6 8 6" stroke="#F4B942" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M112 176 q0 6 8 6 M120 176 q0 6 8 6" stroke="#F4B942" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Sparkle */}
      <g>
        <path d="M160 60 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 z" fill="#FFD166" />
      </g>
    </svg>
  );
}
