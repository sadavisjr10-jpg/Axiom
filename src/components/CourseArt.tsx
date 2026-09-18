import type { CourseId } from '../types'

interface Props {
  courseId: CourseId
  className?: string
  size?: number
}

/** Distinctive geometric SVG motifs per course — no external assets. */
export function CourseArt({ courseId, className = '', size = 64 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className: `course-art ${className}`.trim(),
    'aria-hidden': true as const,
  }

  switch (courseId) {
    case 'calculus':
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="calc-g" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#6ee7b7" stopOpacity="0.9" />
              <stop offset="1" stopColor="#34d399" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="56" height="56" rx="14" stroke="url(#calc-g)" strokeWidth="1.5" opacity="0.5" />
          <path d="M18 44 C22 20 30 16 34 32 C38 48 46 44 48 22" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 48 H50" stroke="#6ee7b7" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="34" cy="32" r="3" fill="#6ee7b7" />
        </svg>
      )
    case 'mechanics':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="56" height="56" rx="14" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M16 40 L32 16 L48 40 Z" stroke="#38bdf8" strokeWidth="2" fill="rgba(56,189,248,0.12)" />
          <path d="M32 16 V48" stroke="#7dd3fc" strokeWidth="1.5" strokeDasharray="2 3" />
          <circle cx="32" cy="16" r="3.5" fill="#38bdf8" />
          <path d="M22 40 H42" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'statics':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="56" height="56" rx="14" stroke="#a78bfa" strokeOpacity="0.4" strokeWidth="1.5" />
          <polygon points="32,14 50,46 14,46" stroke="#a78bfa" strokeWidth="2" fill="rgba(167,139,250,0.1)" />
          <line x1="32" y1="14" x2="32" y2="46" stroke="#c4b5fd" strokeWidth="1.5" />
          <circle cx="32" cy="36" r="3" fill="#a78bfa" />
          <path d="M20 46 H44" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    case 'circuits':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="56" height="56" rx="14" stroke="#fbbf24" strokeOpacity="0.4" strokeWidth="1.5" />
          <path
            d="M12 32 H22 L26 22 L30 42 L34 28 L38 36 H52"
            stroke="#fbbf24"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="40" y="28" width="10" height="8" rx="1.5" stroke="#fcd34d" strokeWidth="1.5" fill="rgba(251,191,36,0.15)" />
          <circle cx="14" cy="32" r="2.5" fill="#fbbf24" />
        </svg>
      )
    case 'thermo':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="56" height="56" rx="14" stroke="#fb7185" strokeOpacity="0.4" strokeWidth="1.5" />
          <rect x="26" y="12" width="12" height="28" rx="6" stroke="#fb7185" strokeWidth="2" fill="rgba(251,113,133,0.12)" />
          <circle cx="32" cy="46" r="8" stroke="#fb7185" strokeWidth="2" fill="rgba(251,113,133,0.2)" />
          <path d="M32 20 V40" stroke="#fda4af" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="46" r="3.5" fill="#fb7185" />
        </svg>
      )
    case 'materials':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="56" height="56" rx="14" stroke="#2dd4bf" strokeOpacity="0.4" strokeWidth="1.5" />
          <path
            d="M32 12 L48 22 V42 L32 52 L16 42 V22 Z"
            stroke="#2dd4bf"
            strokeWidth="2"
            fill="rgba(45,212,191,0.1)"
          />
          <path d="M32 12 V52 M16 22 L48 42 M48 22 L16 42" stroke="#5eead4" strokeWidth="1" strokeOpacity="0.55" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <rect x="8" y="8" width="48" height="48" rx="12" stroke="currentColor" strokeOpacity="0.4" />
        </svg>
      )
  }
}

/** Full-bleed hero backdrop geometry for the landing page. */
export function HeroGeometry({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`hero-geometry ${className}`.trim()}
      viewBox="0 0 800 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMaxYMid slice"
    >
      <defs>
        <linearGradient id="hg-a" x1="400" y1="0" x2="800" y2="420">
          <stop stopColor="#6ee7b7" stopOpacity="0.35" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="hg-b" x1="500" y1="40" x2="760" y2="360">
          <stop stopColor="#38bdf8" stopOpacity="0.45" />
          <stop offset="1" stopColor="#6ee7b7" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g opacity="0.9">
        <circle cx="620" cy="120" r="90" stroke="url(#hg-a)" strokeWidth="1.25" />
        <circle cx="620" cy="120" r="54" stroke="url(#hg-b)" strokeWidth="1" />
        <circle cx="620" cy="120" r="18" fill="#6ee7b7" fillOpacity="0.25" />
        <path d="M480 320 L620 120 L760 320 Z" stroke="url(#hg-a)" strokeWidth="1.5" fill="url(#hg-a)" fillOpacity="0.08" />
        <path d="M520 80 L700 200 L540 340" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="1" />
        <path d="M560 60 C640 100 700 180 720 280" stroke="#6ee7b7" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="450" y1="60" x2="780" y2="60" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="4 6" />
        <line x1="450" y1="200" x2="780" y2="200" stroke="#94a3b8" strokeOpacity="0.12" strokeDasharray="4 6" />
        <line x1="450" y1="340" x2="780" y2="340" stroke="#94a3b8" strokeOpacity="0.1" strokeDasharray="4 6" />
        <rect x="500" y="250" width="44" height="44" rx="8" stroke="#6ee7b7" strokeOpacity="0.35" transform="rotate(-12 522 272)" />
        <rect x="680" y="280" width="36" height="36" rx="6" stroke="#38bdf8" strokeOpacity="0.3" transform="rotate(18 698 298)" />
      </g>
    </svg>
  )
}
