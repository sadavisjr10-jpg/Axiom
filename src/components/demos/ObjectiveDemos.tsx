import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { ObjectiveDemoId } from '../../types'

interface DemoProps {
  id: ObjectiveDemoId
  className?: string
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function DemoShell({
  label,
  className,
  children,
  caption,
}: {
  label: string
  className?: string
  children: ReactNode
  caption?: string
}) {
  return (
    <div className={`obj-demo ${className ?? ''}`.trim()} role="group" aria-label={label}>
      {children}
      {caption && <p className="obj-demo__caption">{caption}</p>}
    </div>
  )
}

function Scrub({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  display?: string
}) {
  return (
    <label className="obj-demo__scrub">
      <span className="obj-demo__scrub-label">
        {label}
        <strong>{display ?? value.toFixed(2)}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? (max - min) / 100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

function PlayToggle({
  playing,
  onToggle,
  disabled,
}: {
  playing: boolean
  onToggle: () => void
  disabled?: boolean
}) {
  return (
    <button type="button" className="obj-demo__play" onClick={onToggle} disabled={disabled}>
      {playing ? 'Pause' : 'Play'}
    </button>
  )
}

/** Interactive SVG/CSS demos that teach — scrub/play where it helps. */
export function ObjectiveDemo({ id, className = '' }: DemoProps) {
  const reduced = usePrefersReducedMotion()

  switch (id) {
    case 'limit-approach':
      return <LimitApproach className={className} reduced={reduced} />
    case 'one-sided':
      return <OneSided className={className} reduced={reduced} />
    case 'sinx-x':
      return <SinxOverX className={className} reduced={reduced} />
    case 'limit-fail':
      return <LimitFail className={className} />
    case 'secant-tangent':
      return <SecantTangent className={className} reduced={reduced} />
    case 'power-rule':
      return <PowerRule className={className} reduced={reduced} />
    case 'product-rule':
      return <ProductRule className={className} />
    case 'ftc-area':
      return <FtcArea className={className} reduced={reduced} />
    case 'const-accel':
      return <ConstAccel className={className} reduced={reduced} />
    case 'free-body':
      return <FreeBody className={className} reduced={reduced} />
    case 'force-components':
      return <ForceComponents className={className} reduced={reduced} />
    case 'particle-eq':
      return <ParticleEq className={className} />
    case 'voltage-divider':
      return <VoltageDivider className={className} reduced={reduced} />
    case 'kvl-loop':
      return <KvlLoop className={className} reduced={reduced} />
    case 'ideal-gas':
      return <IdealGas className={className} reduced={reduced} />
    case 'first-law':
      return <FirstLaw className={className} />
    case 'stress-strain':
      return <StressStrain className={className} reduced={reduced} />
    case 'hall-petch':
      return <HallPetch className={className} reduced={reduced} />
    default:
      return null
  }
}

function LimitApproach({ className, reduced }: { className?: string; reduced: boolean }) {
  const [t, setT] = useState(reduced ? 0.92 : 0.2)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => {
      setT((x) => {
        const n = x + 0.012
        return n >= 0.98 ? 0.15 : n
      })
    }, 40)
    return () => clearInterval(id)
  }, [playing, reduced])

  // f(x) = 0.002*(x-150)^2 + 55 style path; approach x→150
  const x = 70 + t * (150 - 70)
  const y = 88 - t * (88 - 55)

  return (
    <DemoShell
      className={className}
      label="Limit as x approaches a"
      caption="Scrub (or play): as x → a, the sample point’s height settles on L — even if the hole at a is empty."
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="24" y1="110" x2="260" y2="110" className="demo-axis" />
        <line x1="40" y1="20" x2="40" y2="120" className="demo-axis" />
        <path d="M50 95 C90 90 110 40 150 55 C190 70 210 30 250 35" className="demo-curve" fill="none" />
        <line x1="150" y1="20" x2="150" y2="110" className="demo-guide" strokeDasharray="4 3" />
        <circle cx="150" cy="55" r="5" className="demo-target" fill="none" strokeWidth="2" />
        <text x="158" y="48" className="demo-label">
          L
        </text>
        <circle cx={x} cy={y} r="5" className="demo-dot" />
        <text x="100" y="128" className="demo-label">
          x → a · f(x) → L
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub label="Closer to a" value={t} min={0.05} max={0.98} onChange={(v) => { setPlaying(false); setT(v) }} display={`${Math.round(t * 100)}%`} />
      </div>
    </DemoShell>
  )
}

function OneSided({ className, reduced }: { className?: string; reduced: boolean }) {
  const [side, setSide] = useState<'left' | 'right'>('left')
  const [t, setT] = useState(0.3)
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setT((x) => (x >= 0.95 ? 0.15 : x + 0.02)), 50)
    return () => clearInterval(id)
  }, [reduced, side])

  const leftX = 60 + t * (138 - 60)
  const leftY = 85 - t * (85 - 50)
  const rightX = 240 - t * (240 - 142)
  const rightY = 38 + t * (80 - 38)

  return (
    <DemoShell
      className={className}
      label="One-sided limits"
      caption="Left and right can settle on different heights. Two-sided limit exists only when they agree."
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="24" y1="110" x2="260" y2="110" className="demo-axis" />
        <line x1="140" y1="20" x2="140" y2="120" className="demo-guide" strokeDasharray="4 3" />
        <path d="M40 90 C80 85 110 70 138 50" className="demo-curve" fill="none" />
        <path d="M142 80 C170 75 210 40 250 35" className="demo-curve demo-curve--alt" fill="none" />
        <circle cx="138" cy="50" r="4" className="demo-target" />
        <circle cx="142" cy="80" r="4" className="demo-target demo-target--right" />
        {side === 'left' ? (
          <circle cx={leftX} cy={leftY} r="5" className="demo-dot" />
        ) : (
          <circle cx={rightX} cy={rightY} r="5" className="demo-dot demo-dot--alt" />
        )}
      </svg>
      <div className="obj-demo__controls">
        <button type="button" className={`obj-demo__chip ${side === 'left' ? 'is-on' : ''}`} onClick={() => { setSide('left'); setT(0.2) }}>
          Approach from left
        </button>
        <button type="button" className={`obj-demo__chip ${side === 'right' ? 'is-on' : ''}`} onClick={() => { setSide('right'); setT(0.2) }}>
          Approach from right
        </button>
      </div>
    </DemoShell>
  )
}

function SinxOverX({ className, reduced }: { className?: string; reduced: boolean }) {
  const [x, setX] = useState(1.2)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => {
      setX((v) => {
        const n = v - 0.025
        return n < 0.05 ? 1.4 : n
      })
    }, 40)
    return () => clearInterval(id)
  }, [playing, reduced])
  const ratio = Math.abs(x) < 1e-6 ? 1 : Math.sin(x) / x
  const px = 140 + x * 55
  const py = 110 - ratio * 80

  return (
    <DemoShell
      className={className}
      label="sin(x)/x as x→0"
      caption={`sin(x)/x ≈ ${ratio.toFixed(3)} (radians). Watch it climb toward 1 as x → 0.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="24" y1="110" x2="260" y2="110" className="demo-axis" />
        <line x1="140" y1="20" x2="140" y2="120" className="demo-axis" />
        <line x1="40" y1="30" x2="240" y2="30" className="demo-guide" strokeDasharray="3 3" />
        <path d="M40 70 C70 30 110 25 140 30 C170 25 210 30 240 70" className="demo-curve" fill="none" />
        <circle cx={px} cy={py} r="5" className="demo-dot" />
        <text x="200" y="24" className="demo-label">
          y = 1
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub label="x (rad)" value={x} min={0.05} max={1.5} onChange={(v) => { setPlaying(false); setX(v) }} />
      </div>
    </DemoShell>
  )
}

function LimitFail({ className }: { className?: string }) {
  return (
    <DemoShell
      className={className}
      label="Jump discontinuity"
      caption="Left limit ≠ right limit → two-sided limit DNE. Model each side separately (relay snap, shock)."
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="24" y1="110" x2="260" y2="110" className="demo-axis" />
        <line x1="140" y1="20" x2="140" y2="120" className="demo-guide" strokeDasharray="4 3" />
        <path d="M40 85 L138 85" className="demo-curve" fill="none" />
        <path d="M142 45 L250 45" className="demo-curve demo-curve--alt" fill="none" />
        <circle cx="138" cy="85" r="4" className="demo-target" />
        <circle cx="142" cy="45" r="4" className="demo-target" />
        <text x="50" y="75" className="demo-label">
          jump → DNE
        </text>
      </svg>
    </DemoShell>
  )
}

function SecantTangent({ className, reduced }: { className?: string; reduced: boolean }) {
  const [h, setH] = useState(reduced ? 0.15 : 1.2)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => {
      setH((v) => {
        const n = v - 0.02
        return n < 0.08 ? 1.4 : n
      })
    }, 40)
    return () => clearInterval(id)
  }, [playing, reduced])

  // curve y = 100 - 0.35*(x-40)^1.1-ish; point a at x=120
  const a = 120
  const fa = 55
  const x2 = a + h * 55
  const f2 = 55 - h * 28
  const slope = (f2 - fa) / (x2 - a)
  // tangent/secant line through (a,fa)
  const xL = 50
  const yL = fa - slope * (a - xL)
  const xR = 240
  const yR = fa + slope * (xR - a)

  return (
    <DemoShell
      className={className}
      label="Secant → tangent"
      caption={`h = ${h.toFixed(2)}. Average slope ${( -slope).toFixed(2)} → instantaneous slope as h → 0.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="24" y1="110" x2="260" y2="110" className="demo-axis" />
        <path d="M40 95 C90 90 120 30 180 40 C220 46 250 70 260 90" className="demo-curve" fill="none" />
        <line x1={xL} y1={yL} x2={xR} y2={yR} className="demo-secant" />
        <circle cx={a} cy={fa} r="4" className="demo-target" />
        <circle cx={x2} cy={f2} r="4" className="demo-dot" />
        <text x="40" y="128" className="demo-label">
          shrink h → tangent = f′(a)
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub label="Step h" value={h} min={0.08} max={1.5} onChange={(v) => { setPlaying(false); setH(v) }} />
      </div>
    </DemoShell>
  )
}

function PowerRule({ className, reduced }: { className?: string; reduced: boolean }) {
  const [x, setX] = useState(1.6)
  const y = 110 - Math.pow(x, 2) * 18
  const slope = 2 * x
  const x0 = 40 + x * 70
  const y0 = y
  const x1 = x0 + 40
  const y1 = y0 - slope * 12

  return (
    <DemoShell
      className={className}
      label="Power rule slope"
      caption={`For f(x)=x², f′(x)=2x = ${slope.toFixed(2)} at x=${x.toFixed(2)}. Scrub to feel the slope change.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="24" y1="110" x2="260" y2="110" className="demo-axis" />
        <path d="M50 105 Q140 100 200 30" className="demo-curve" fill="none" />
        <line x1={x0 - 30} y1={y0 + slope * 9} x2={x1} y2={y1} className="demo-tangent" />
        <circle cx={x0} cy={y0} r="5" className="demo-dot" />
        {!reduced && (
          <text x="40" y="40" className="demo-label">
            (xⁿ)′ = n xⁿ⁻¹
          </text>
        )}
      </svg>
      <div className="obj-demo__controls">
        <Scrub label="x" value={x} min={0.6} max={2.2} onChange={setX} />
      </div>
    </DemoShell>
  )
}

function ProductRule({ className }: { className?: string }) {
  return (
    <DemoShell
      className={className}
      label="Product rule"
      caption="When both factors change, the total change is u′v + uv′ — each edge of the “area” contributes."
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="50" y="30" width="90" height="70" rx="6" className="demo-box" />
        <text x="85" y="70" className="demo-label">
          u · v
        </text>
        <path d="M50 30 H160" className="demo-force demo-qin" />
        <text x="165" y="34" className="demo-label">
          + du · v
        </text>
        <path d="M140 30 V100" className="demo-force demo-wout" />
        <text x="145" y="115" className="demo-label">
          + u · dv
        </text>
        <text x="40" y="128" className="demo-label">
          (uv)′ = u′v + uv′
        </text>
      </svg>
    </DemoShell>
  )
}

function FtcArea({ className, reduced }: { className?: string; reduced: boolean }) {
  const [b, setB] = useState(0.55)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => setB((v) => (v >= 0.95 ? 0.25 : v + 0.01)), 50)
    return () => clearInterval(id)
  }, [playing, reduced])
  const bx = 50 + b * 150

  return (
    <DemoShell
      className={className}
      label="Area as definite integral"
      caption="Grow the right endpoint b: accumulated area is F(b)−F(a) when F′=f."
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="24" y1="110" x2="260" y2="110" className="demo-axis" />
        <path d={`M50 90 C90 40 140 30 ${bx} ${60 - b * 10} L${bx} 110 L50 110 Z`} className="demo-fill" />
        <path d="M50 90 C90 40 140 30 200 55" className="demo-curve" fill="none" />
        <line x1="50" y1="20" x2="50" y2="110" className="demo-guide" />
        <line x1={bx} y1="20" x2={bx} y2="110" className="demo-guide" />
        <text x="45" y="128" className="demo-label">
          a
        </text>
        <text x={bx - 4} y="128" className="demo-label">
          b
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub label="Endpoint b" value={b} min={0.2} max={0.98} onChange={(v) => { setPlaying(false); setB(v) }} display={`${(aLabel(b))}`} />
      </div>
    </DemoShell>
  )
}

function aLabel(b: number) {
  return (1 + b * 3).toFixed(1)
}

function ConstAccel({ className, reduced }: { className?: string; reduced: boolean }) {
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(!reduced)
  const v0 = 8
  const a = 4
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => setT((x) => (x >= 3 ? 0 : x + 0.05)), 40)
    return () => clearInterval(id)
  }, [playing, reduced])
  const x = v0 * t + 0.5 * a * t * t
  const v = v0 + a * t
  const px = 40 + Math.min(x * 4.5, 200)

  return (
    <DemoShell
      className={className}
      label="Constant acceleration motion"
      caption={`t=${t.toFixed(2)}s · v=${v.toFixed(1)} · Δx≈${x.toFixed(1)} (v₀=${v0}, a=${a})`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="30" y1="100" x2="250" y2="100" className="demo-axis" />
        <rect x={px} y="72" width="36" height="28" rx="4" className="demo-box" />
        <text x="40" y="40" className="demo-label">
          a = const → v = v₀ + a t
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub label="Time t" value={t} min={0} max={3} step={0.05} onChange={(v) => { setPlaying(false); setT(v) }} display={`${t.toFixed(2)} s`} />
      </div>
    </DemoShell>
  )
}

function FreeBody({ className, reduced }: { className?: string; reduced: boolean }) {
  const [F, setF] = useState(12)
  const m = 2
  const a = F / m
  const fLen = 40 + F * 4

  return (
    <DemoShell
      className={className}
      label="Free-body with live net force"
      caption={`Horizontal ΣF = F = ${F.toFixed(0)} N → a = F/m = ${a.toFixed(1)} m/s². Vertical forces cancel (N = mg).`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="110" y="50" width="60" height="40" rx="4" className="demo-box" />
        <line x1="140" y1="50" x2="140" y2="22" className="demo-force" />
        <polygon points="140,18 134,28 146,28" className="demo-arrowhead" />
        <text x="148" y="28" className="demo-label">
          N
        </text>
        <line x1="140" y1="90" x2="140" y2="118" className="demo-force" />
        <polygon points="140,122 134,112 146,112" className="demo-arrowhead" />
        <text x="148" y="118" className="demo-label">
          mg
        </text>
        <line x1="170" y1="70" x2={170 + fLen} y2="70" className="demo-force demo-force--pull" />
        <polygon points={`${174 + fLen},70 ${164 + fLen},64 ${164 + fLen},76`} className="demo-arrowhead" />
        <text x={180 + fLen * 0.3} y="62" className="demo-label">
          F
        </text>
        {!reduced && (
          <text x="40" y="40" className="demo-label">
            ΣFₓ = m aₓ
          </text>
        )}
      </svg>
      <div className="obj-demo__controls">
        <Scrub label="Applied F" value={F} min={0} max={30} step={1} onChange={setF} display={`${F.toFixed(0)} N`} />
      </div>
    </DemoShell>
  )
}

function ForceComponents({ className, reduced }: { className?: string; reduced: boolean }) {
  const [deg, setDeg] = useState(35)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => setDeg((d) => (d >= 80 ? 10 : d + 0.8)), 40)
    return () => clearInterval(id)
  }, [playing, reduced])
  const rad = (deg * Math.PI) / 180
  const mag = 120
  const fx = mag * Math.cos(rad)
  const fy = mag * Math.sin(rad)
  const ox = 60
  const oy = 110

  return (
    <DemoShell
      className={className}
      label="Resolve force into components"
      caption={`θ=${deg.toFixed(0)}° · Fₓ=${(Math.cos(rad)).toFixed(2)}|F| · Fᵧ=${(Math.sin(rad)).toFixed(2)}|F|`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="40" y1="110" x2="240" y2="110" className="demo-axis" />
        <line x1="60" y1="120" x2="60" y2="20" className="demo-axis" />
        <line x1={ox} y1={oy} x2={ox + fx} y2={oy - fy} className="demo-force demo-force--pull" />
        <line x1={ox} y1={oy} x2={ox + fx} y2={oy} className="demo-guide" />
        <line x1={ox + fx} y1={oy} x2={ox + fx} y2={oy - fy} className="demo-guide" />
        <text x={ox + fx / 2} y={oy + 14} className="demo-label">
          Fₓ
        </text>
        <text x={ox + fx + 8} y={oy - fy / 2} className="demo-label">
          Fᵧ
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub label="Angle θ" value={deg} min={5} max={85} step={1} onChange={(v) => { setPlaying(false); setDeg(v) }} display={`${deg.toFixed(0)}°`} />
      </div>
    </DemoShell>
  )
}

function ParticleEq({ className }: { className?: string }) {
  return (
    <DemoShell
      className={className}
      label="Particle equilibrium at a knot"
      caption="Two cables + weight at a knot: ΣFₓ=0 and ΣFᵧ=0 close the system for the two unknown tensions."
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="40" y1="30" x2="140" y2="70" className="demo-force" />
        <line x1="240" y1="30" x2="140" y2="70" className="demo-force" />
        <line x1="140" y1="70" x2="140" y2="115" className="demo-force" />
        <circle cx="140" cy="70" r="7" className="demo-target" />
        <rect x="125" y="115" width="30" height="18" rx="2" className="demo-box" />
        <text x="48" y="50" className="demo-label">
          T₁
        </text>
        <text x="210" y="50" className="demo-label">
          T₂
        </text>
        <text x="148" y="110" className="demo-label">
          W
        </text>
      </svg>
    </DemoShell>
  )
}

function VoltageDivider({ className, reduced }: { className?: string; reduced: boolean }) {
  const Vin = 12
  const [r2frac, setR2frac] = useState(0.4)
  const Rtot = 10
  const R2 = r2frac * Rtot
  const R1 = Rtot - R2
  const Vout = Vin * (R2 / Rtot)
  const midY = 30 + (1 - r2frac) * 70

  return (
    <DemoShell
      className={className}
      label="Interactive voltage divider"
      caption={`Vin=${Vin} V · R₁=${R1.toFixed(1)} kΩ · R₂=${R2.toFixed(1)} kΩ → Vout=${Vout.toFixed(2)} V. Ratio sets the fraction.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="50" y1="25" x2="50" y2="125" className="demo-wire" />
        <line x1="50" y1="25" x2="140" y2="25" className="demo-wire" />
        <line x1="140" y1="25" x2="140" y2={midY} className="demo-wire" />
        <path d={`M140 25 l8 6 l-16 6 l16 6 l-16 6 l8 4`} className="demo-resistor" transform={`translate(0, ${(midY - 25) * 0.15})`} />
        <text x="168" y={25 + (midY - 25) * 0.4} className="demo-label">
          R₁
        </text>
        <circle cx="140" cy={midY} r="4" className="demo-target" />
        <line x1="140" y1={midY} x2="210" y2={midY} className="demo-wire demo-vout" />
        <text x="215" y={midY + 4} className="demo-label">
          Vout
        </text>
        <line x1="140" y1={midY} x2="140" y2="125" className="demo-wire" />
        <text x="168" y={midY + 30} className="demo-label">
          R₂
        </text>
        <line x1="140" y1="125" x2="50" y2="125" className="demo-wire" />
        <text x="20" y="80" className="demo-label">
          Vin
        </text>
        {!reduced && (
          <text x="40" y="18" className="demo-label">
            Vout = Vin · R₂/(R₁+R₂)
          </text>
        )}
      </svg>
      <div className="obj-demo__controls">
        <Scrub
          label="R₂ share"
          value={r2frac}
          min={0.1}
          max={0.9}
          step={0.01}
          onChange={setR2frac}
          display={`${(r2frac * 100).toFixed(0)}%`}
        />
      </div>
    </DemoShell>
  )
}

function KvlLoop({ className, reduced }: { className?: string; reduced: boolean }) {
  const [t, setT] = useState(0)
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setT((x) => (x + 0.02) % 1), 40)
    return () => clearInterval(id)
  }, [reduced])
  // animate a dot around the rectangle
  const pathLen = 2 * (160 + 70)
  const d = t * pathLen
  let cx = 60
  let cy = 35
  if (d < 160) {
    cx = 60 + d
    cy = 35
  } else if (d < 160 + 70) {
    cx = 220
    cy = 35 + (d - 160)
  } else if (d < 160 + 70 + 160) {
    cx = 220 - (d - 160 - 70)
    cy = 105
  } else {
    cx = 60
    cy = 105 - (d - 160 - 70 - 160)
  }

  return (
    <DemoShell
      className={className}
      label="KVL around a loop"
      caption="Walk the loop: source rise minus ohmic drops sums to zero. The moving marker is the accounting walk."
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="60" y="35" width="160" height="70" rx="4" className="demo-loop" fill="none" />
        <circle cx="60" cy="70" r="10" className="demo-source" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="54" y="74" className="demo-label">
          V
        </text>
        <text x="130" y="28" className="demo-label">
          IR drop
        </text>
        <circle cx={cx} cy={cy} r="5" className="demo-dot" />
        <text x="90" y="128" className="demo-label">
          Σ ΔV = 0
        </text>
      </svg>
    </DemoShell>
  )
}

function IdealGas({ className, reduced }: { className?: string; reduced: boolean }) {
  const [V, setV] = useState(1.2)
  const [playing, setPlaying] = useState(!reduced)
  const nRT = 1 // normalized
  const P = nRT / V
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => {
      setV((v) => {
        const n = v + 0.015
        return n > 2.2 ? 0.7 : n
      })
    }, 40)
    return () => clearInterval(id)
  }, [playing, reduced])
  const pistonY = 30 + (V - 0.7) * 28
  const h = 120 - pistonY - 8

  return (
    <DemoShell
      className={className}
      label="Ideal gas isothermal squeeze"
      caption={`Isothermal: PV=const. V=${V.toFixed(2)} → P∝1/V ≈ ${P.toFixed(2)} (normalized).`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="90" y="25" width="100" height="100" rx="4" className="demo-box" fill="none" />
        <rect x="94" y={pistonY} width="92" height="12" rx="2" className="demo-box" />
        <rect x="100" y={pistonY + 14} width="80" height={Math.max(h, 10)} className="demo-fill" opacity={0.35 + 0.3 * (1 / V)} />
        <text x="40" y="40" className="demo-label">
          PV = nRT
        </text>
        <text x="200" y="80" className="demo-label">
          P↑ as V↓
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub label="Volume V" value={V} min={0.7} max={2.2} step={0.02} onChange={(v) => { setPlaying(false); setV(v) }} />
      </div>
    </DemoShell>
  )
}

function FirstLaw({ className }: { className?: string }) {
  const [Q, setQ] = useState(20)
  const [W, setW] = useState(8)
  const dU = Q - W

  return (
    <DemoShell
      className={className}
      label="First-law ledger"
      caption={`ΔU = Q − W = ${dU.toFixed(0)} (this sign convention: heat in positive, work out positive).`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="100" y="40" width="80" height="60" rx="8" className="demo-box" />
        <text x="118" y="75" className="demo-label">
          ΔU={dU.toFixed(0)}
        </text>
        <path d="M40 70 H95" className="demo-force demo-qin" />
        <text x="45" y="60" className="demo-label">
          Q={Q}
        </text>
        <path d="M185 70 H240" className="demo-force demo-wout" />
        <text x="200" y="60" className="demo-label">
          W={W}
        </text>
      </svg>
      <div className="obj-demo__controls">
        <Scrub label="Heat in Q" value={Q} min={0} max={40} step={1} onChange={setQ} display={`${Q}`} />
        <Scrub label="Work out W" value={W} min={0} max={40} step={1} onChange={setW} display={`${W}`} />
      </div>
    </DemoShell>
  )
}

function StressStrain({ className, reduced }: { className?: string; reduced: boolean }) {
  const [eps, setEps] = useState(0.02)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => setEps((e) => (e >= 0.22 ? 0.005 : e + 0.003)), 50)
    return () => clearInterval(id)
  }, [playing, reduced])

  // Piecewise: elastic to 0.08, then yield plateau-ish, then rise
  const E = 800
  const stress = useMemo(() => {
    if (eps < 0.08) return E * eps
    if (eps < 0.14) return E * 0.08 + (eps - 0.08) * 80
    return E * 0.08 + 0.06 * 80 + (eps - 0.14) * 200
  }, [eps])

  const px = 50 + eps * 900
  const py = 110 - stress * 0.12

  // build path up to current eps
  const samples: string[] = []
  for (let e = 0; e <= eps; e += 0.005) {
    const s = e < 0.08 ? E * e : e < 0.14 ? E * 0.08 + (e - 0.08) * 80 : E * 0.08 + 0.06 * 80 + (e - 0.14) * 200
    samples.push(`${50 + e * 900},${110 - s * 0.12}`)
  }
  const d = samples.length ? `M50 110 L${samples.join(' L')}` : 'M50 110'

  return (
    <DemoShell
      className={className}
      label="Live stress–strain curve"
      caption={`ε=${eps.toFixed(3)} → σ≈${stress.toFixed(0)} (arb.). Elastic slope is E; beyond yield the curve bends.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="40" y1="110" x2="250" y2="110" className="demo-axis" />
        <line x1="50" y1="20" x2="50" y2="115" className="demo-axis" />
        <path d={d} className="demo-curve" fill="none" />
        <circle cx={Math.min(px, 245)} cy={Math.max(py, 25)} r="5" className="demo-dot" />
        <text x="55" y="30" className="demo-label">
          σ
        </text>
        <text x="240" y="128" className="demo-label">
          ε
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub label="Strain ε" value={eps} min={0.005} max={0.22} step={0.001} onChange={(v) => { setPlaying(false); setEps(v) }} />
      </div>
    </DemoShell>
  )
}

function HallPetch({ className, reduced }: { className?: string; reduced: boolean }) {
  const [d, setD] = useState(1.2)
  const sigma0 = 100
  const k = 50
  const sy = sigma0 + k / Math.sqrt(d)

  return (
    <DemoShell
      className={className}
      label="Hall–Petch vs grain size"
      caption={`d=${d.toFixed(2)} → σ_y = σ₀ + k/√d ≈ ${sy.toFixed(0)}. Smaller grains (to a point) raise yield strength.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <path d="M40 40 L90 70 L40 100 Z" className="demo-grain" />
        <path d="M90 70 L160 40 L160 100 Z" className="demo-grain demo-grain--2" />
        <path d="M160 40 L240 55 L240 100 L160 100 Z" className="demo-grain demo-grain--3" />
        <path
          d="M55 85 L120 75"
          className="demo-dislocation"
          strokeDashoffset={reduced ? 0 : d * 10}
        />
        <circle cx="120" cy="75" r="4" className="demo-target" />
        <text x="40" y="128" className="demo-label">
          σ_y = σ₀ + k/√d
        </text>
      </svg>
      <div className="obj-demo__controls">
        <Scrub label="Grain size d" value={d} min={0.25} max={2.5} step={0.05} onChange={setD} />
      </div>
    </DemoShell>
  )
}
