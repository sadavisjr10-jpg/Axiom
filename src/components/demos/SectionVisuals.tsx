import type { SectionVisualId } from '../../types'

interface Props {
  id: SectionVisualId
}

/** Compact inline diagrams for instruction sections. */
export function SectionVisual({ id }: Props) {
  const label = id.replace(/-/g, ' ')
  return (
    <div className="section-visual" role="img" aria-label={`Diagram: ${label}`}>
      <SectionSvg id={id} />
    </div>
  )
}

function SectionSvg({ id }: { id: SectionVisualId }) {
  const common = { viewBox: '0 0 320 120', className: 'section-visual__svg' as const }

  switch (id) {
    case 'limit-zoom':
      return (
        <svg {...common}>
          <path d="M20 90 C80 80 120 30 160 45 C200 60 240 25 300 30" className="sv-curve" fill="none" />
          <circle cx="160" cy="45" r="5" className="sv-dot" />
          <rect x="130" y="25" width="60" height="50" rx="4" className="sv-zoom" />
          <text x="20" y="20" className="sv-label">
            zoom → L
          </text>
        </svg>
      )
    case 'one-sided-graph':
      return (
        <svg {...common}>
          <path d="M20 80 L155 40" className="sv-curve" fill="none" />
          <path d="M165 75 L300 35" className="sv-curve sv-curve--alt" fill="none" />
          <line x1="160" y1="15" x2="160" y2="100" className="sv-guide" />
          <text x="30" y="30" className="sv-label">
            left ≠ right → DNE
          </text>
        </svg>
      )
    case 'indeterminate':
      return (
        <svg {...common}>
          <text x="40" y="55" className="sv-eq">
            0/0
          </text>
          <path d="M110 50 H150" className="sv-curve" />
          <text x="160" y="55" className="sv-eq">
            factor → limit
          </text>
        </svg>
      )
    case 'continuity':
      return (
        <svg {...common}>
          <path d="M30 80 C80 70 120 40 160 50 C200 60 250 40 290 45" className="sv-curve" fill="none" />
          <circle cx="160" cy="50" r="5" className="sv-dot" />
          <text x="20" y="25" className="sv-label">
            lim = f(a)
          </text>
        </svg>
      )
    case 'trig-limit':
      return (
        <svg {...common}>
          <path d="M30 70 C70 25 120 20 160 25 C200 20 250 25 290 70" className="sv-curve" fill="none" />
          <line x1="30" y1="25" x2="290" y2="25" className="sv-guide" />
          <text x="200" y="20" className="sv-label">
            → 1
          </text>
        </svg>
      )
    case 'avg-rate':
      return (
        <svg {...common}>
          <path d="M30 90 C100 85 140 30 220 40" className="sv-curve" fill="none" />
          <line x1="70" y1="88" x2="180" y2="45" className="sv-secant" />
          <text x="20" y="25" className="sv-label">
            Δy / Δx
          </text>
        </svg>
      )
    case 'difference-quotient':
      return (
        <svg {...common}>
          <path d="M30 90 C100 80 140 35 240 50" className="sv-curve" fill="none" />
          <line x1="120" y1="55" x2="210" y2="30" className="sv-tangent" />
          <text x="20" y="25" className="sv-label">
            h → 0
          </text>
        </svg>
      )
    case 'power-slope':
      return (
        <svg {...common}>
          <path d="M40 100 Q160 95 250 25" className="sv-curve" fill="none" />
          <line x1="160" y1="60" x2="230" y2="20" className="sv-tangent" />
          <text x="20" y="30" className="sv-eq">
            n xⁿ⁻¹
          </text>
        </svg>
      )
    case 'product-uv':
      return (
        <svg {...common}>
          <rect x="40" y="35" width="70" height="45" rx="6" className="sv-box" />
          <text x="65" y="62" className="sv-label">
            u
          </text>
          <text x="125" y="62" className="sv-label">
            ×
          </text>
          <rect x="150" y="35" width="70" height="45" rx="6" className="sv-box" />
          <text x="175" y="62" className="sv-label">
            v
          </text>
          <text x="40" y="105" className="sv-eq">
            u′v + uv′
          </text>
        </svg>
      )
    case 'antiderivative':
    case 'ftc-eval':
      return (
        <svg {...common}>
          <path d="M50 85 C100 30 160 25 220 55 L220 100 L50 100 Z" className="sv-fill" />
          <path d="M50 85 C100 30 160 25 220 55" className="sv-curve" fill="none" />
          <text x="100" y="30" className="sv-label">
            ∫ₐᵇ f = F(b)−F(a)
          </text>
        </svg>
      )
    case 'kinematic-axes':
      return (
        <svg {...common}>
          <line x1="30" y1="90" x2="290" y2="90" className="sv-axis" />
          <rect x="60" y="60" width="40" height="30" rx="3" className="sv-box" />
          <path d="M110 75 H250" className="sv-curve" />
          <text x="30" y="30" className="sv-eq">
            v² = v₀² + 2aΔx
          </text>
        </svg>
      )
    case 'signs-motion':
      return (
        <svg {...common}>
          <line x1="40" y1="60" x2="280" y2="60" className="sv-axis" />
          <polygon points="200,60 180,50 180,70" className="sv-arrow" />
          <text x="40" y="40" className="sv-label">
            + direction
          </text>
          <text x="40" y="100" className="sv-label">
            slowing: v and a opposite signs
          </text>
        </svg>
      )
    case 'net-force':
    case 'fbd-block':
      return (
        <svg {...common}>
          <rect x="130" y="40" width="60" height="40" rx="4" className="sv-box" />
          <line x1="160" y1="40" x2="160" y2="15" className="sv-force" />
          <line x1="160" y1="80" x2="160" y2="105" className="sv-force" />
          <line x1="190" y1="60" x2="250" y2="60" className="sv-force" />
          <text x="30" y="30" className="sv-eq">
            ΣF = ma
          </text>
        </svg>
      )
    case 'weight-mass':
      return (
        <svg {...common}>
          <text x="40" y="50" className="sv-eq">
            W = mg
          </text>
          <text x="40" y="85" className="sv-label">
            mass m (kg) · weight is a force (N)
          </text>
        </svg>
      )
    case 'vector-resolve':
    case 'resultant':
      return (
        <svg {...common}>
          <line x1="40" y1="100" x2="200" y2="30" className="sv-force" />
          <line x1="40" y1="100" x2="200" y2="100" className="sv-guide" />
          <line x1="200" y1="100" x2="200" y2="30" className="sv-guide" />
          <text x="100" y="115" className="sv-label">
            Fₓ
          </text>
          <text x="210" y="70" className="sv-label">
            Fᵧ
          </text>
        </svg>
      )
    case 'particle-knot':
      return (
        <svg {...common}>
          <line x1="40" y1="25" x2="160" y2="60" className="sv-force" />
          <line x1="280" y1="25" x2="160" y2="60" className="sv-force" />
          <line x1="160" y1="60" x2="160" y2="100" className="sv-force" />
          <circle cx="160" cy="60" r="6" className="sv-dot" />
          <rect x="145" y="100" width="30" height="16" className="sv-box" />
        </svg>
      )
    case 'series-resistors':
    case 'divider-formula':
      return (
        <svg {...common}>
          <line x1="40" y1="30" x2="40" y2="100" className="sv-wire" />
          <line x1="40" y1="30" x2="140" y2="30" className="sv-wire" />
          <path d="M140 30 l10 8 l-20 8 l20 8 l-20 8 l10 6" className="sv-res" />
          <line x1="140" y1="68" x2="200" y2="68" className="sv-wire" />
          <text x="210" y="72" className="sv-label">
            Vout
          </text>
          <path d="M140 68 l10 8 l-20 8 l20 8 l-10 6" className="sv-res" />
          <line x1="140" y1="106" x2="40" y2="106" className="sv-wire" />
          <text x="40" y="20" className="sv-eq">
            R₂/(R₁+R₂)
          </text>
        </svg>
      )
    case 'loading':
      return (
        <svg {...common}>
          <text x="30" y="45" className="sv-label">
            unloaded divider
          </text>
          <path d="M160 40 H200" className="sv-curve" />
          <text x="210" y="45" className="sv-label">
            + R_load changes Vout
          </text>
          <text x="30" y="90" className="sv-eq">
            R₂ ∥ R_load
          </text>
        </svg>
      )
    case 'kcl-node':
      return (
        <svg {...common}>
          <circle cx="160" cy="60" r="8" className="sv-dot" />
          <line x1="60" y1="60" x2="152" y2="60" className="sv-wire" />
          <line x1="168" y1="60" x2="260" y2="40" className="sv-wire" />
          <line x1="168" y1="60" x2="260" y2="80" className="sv-wire" />
          <text x="30" y="30" className="sv-eq">
            Σ i_in = Σ i_out
          </text>
        </svg>
      )
    case 'kvl-loop-viz':
      return (
        <svg {...common}>
          <rect x="70" y="30" width="180" height="60" rx="4" className="sv-loop" fill="none" />
          <text x="90" y="110" className="sv-eq">
            Σ ΔV around loop = 0
          </text>
        </svg>
      )
    case 'pvt-state':
      return (
        <svg {...common}>
          <rect x="120" y="25" width="80" height="80" rx="4" className="sv-box" fill="none" />
          <rect x="124" y="40" width="72" height="12" className="sv-box" />
          <text x="30" y="40" className="sv-eq">
            PV = nRT
          </text>
        </svg>
      )
    case 'named-process':
      return (
        <svg {...common}>
          <text x="30" y="40" className="sv-label">
            isothermal: PV = const
          </text>
          <text x="30" y="65" className="sv-label">
            isochoric: P/T = const
          </text>
          <text x="30" y="90" className="sv-label">
            isobaric: V/T = const
          </text>
        </svg>
      )
    case 'energy-balance':
      return (
        <svg {...common}>
          <rect x="120" y="35" width="80" height="50" rx="6" className="sv-box" />
          <text x="140" y="65" className="sv-label">
            ΔU
          </text>
          <text x="30" y="60" className="sv-label">
            Q →
          </text>
          <text x="220" y="60" className="sv-label">
            → W
          </text>
        </svg>
      )
    case 'carnot':
      return (
        <svg {...common}>
          <text x="40" y="55" className="sv-eq">
            η_C = 1 − T_C/T_H
          </text>
          <text x="40" y="90" className="sv-label">
            T in kelvin only
          </text>
        </svg>
      )
    case 'stress-def':
    case 'hooke':
      return (
        <svg {...common}>
          <line x1="40" y1="100" x2="280" y2="100" className="sv-axis" />
          <line x1="50" y1="20" x2="50" y2="105" className="sv-axis" />
          <path d="M50 100 L140 45 L200 40 L250 80" className="sv-curve" fill="none" />
          <text x="60" y="30" className="sv-label">
            σ
          </text>
          <text x="260" y="115" className="sv-label">
            ε
          </text>
        </svg>
      )
    case 'poisson':
      return (
        <svg {...common}>
          <rect x="100" y="35" width="50" height="60" className="sv-box" />
          <rect x="180" y="45" width="70" height="40" className="sv-box sv-box--alt" />
          <text x="30" y="30" className="sv-label">
            axial stretch → lateral shrink
          </text>
        </svg>
      )
    case 'grain-boundary':
      return (
        <svg {...common}>
          <path d="M40 30 L100 60 L40 90 Z" className="sv-grain" />
          <path d="M100 60 L180 30 L180 90 Z" className="sv-grain" />
          <path d="M180 30 L280 50 L280 90 L180 90 Z" className="sv-grain" />
          <text x="40" y="115" className="sv-label">
            boundaries block slip
          </text>
        </svg>
      )
    case 'arrhenius':
      return (
        <svg {...common}>
          <text x="40" y="55" className="sv-eq">
            rate ∝ e⁻Q/(RT)
          </text>
          <text x="40" y="90" className="sv-label">
            small ΔT → large rate change
          </text>
        </svg>
      )
    default:
      return null
  }
}
