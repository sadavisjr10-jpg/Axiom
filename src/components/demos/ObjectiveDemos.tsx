import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { ObjectiveDemoId } from '../../types'
import {
  BodyRect,
  FigLabel,
  FigurePlate,
  GraphFrame,
  GroundSymbol,
  LabelClear,
  PlotPoint,
  ResistorPath,
  SharedMarkers,
  TrackAxis,
  VectorArrow,
} from './diagramPrimitives'
import {
  SS_EY,
  SS_SY,
  clamp,
  elasticChordLabel,
  makeStressStrainMap,
  sigma,
  stressStrainPath,
} from '../../lib/materialsCurve'

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
  figureId,
  figureTitle,
}: {
  label: string
  className?: string
  children: ReactNode
  caption?: string
  figureId?: string
  figureTitle?: string
}) {
  return (
    <div className={`obj-demo ${className ?? ''}`.trim()} role="group" aria-label={label}>
      {children}
      {figureId && figureTitle ? (
        <FigurePlate figureId={figureId} title={figureTitle} caption={caption} />
      ) : (
        caption && <p className="obj-demo__caption">{caption}</p>
      )}
    </div>
  )
}

function useNarrowViewport(maxPx = 640): boolean {
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxPx}px)`)
    setNarrow(mq.matches)
    const onChange = () => setNarrow(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [maxPx])
  return narrow
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
    }, 55)
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
        <GraphFrame />
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
        <GraphFrame showY={false} />
        <line x1="140" y1="20" x2="140" y2="110" className="fig-guide" />
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
    }, 55)
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
        <GraphFrame ox={140} />
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
        <GraphFrame showY={false} />
        <line x1="140" y1="20" x2="140" y2="110" className="fig-guide" />
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
    }, 55)
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
        <GraphFrame showY={false} />
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
        <GraphFrame showY={false} />
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
        <GraphFrame showY={false} />
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
    const id = window.setInterval(() => setT((x) => (x >= 3 ? 0 : x + 0.05)), 55)
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
        <TrackAxis />
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

function sharedIds() {
  return {
    arrow: SharedMarkers.arrow,
    arrowAccent: SharedMarkers.arrow,
    arrowWarn: SharedMarkers.arrowWarn,
    arrowWarm: SharedMarkers.arrowWarm,
    arrowCool: SharedMarkers.arrowCool,
    grid: 'axiom-unused-grid',
  }
}

function FreeBody({ className, reduced }: { className?: string; reduced: boolean }) {
  const [F, setF] = useState(12)
  const narrow = useNarrowViewport()
  const ids = useMemo(() => sharedIds(), [])
  const m = 2
  const a = F / m
  const fMax = 30
  const fLenMax = narrow ? 72 : 88
  // Map scrub 0…fMax onto drawn length so caption N matches arrow length
  const fLen = 36 + (F / fMax) * (fLenMax - 36)

  return (
    <DemoShell
      className={className}
      label="Free-body with live net force"
      figureId="2-4"
      figureTitle="Free-body diagram of a block"
      caption={`Horizontal ΣF = F = ${F.toFixed(0)} N → a = F/m = ${a.toFixed(1)} m/s². Vertical forces cancel (N = mg). ΣFₓ = ma.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1={72} y1={108} x2={248} y2={108} className="fig-wire" />
        {[96, 128, 160, 192].map((x) => (
          <line key={x} x1={x} y1={108} x2={x - 6} y2={116} className="fig-tick" />
        ))}
        <BodyRect x={122} y={46} w={56} h={36} rx={3} />
        <VectorArrow x1={150} y1={46} x2={150} y2={18} variant="ink" ids={ids} />
        <VectorArrow x1={150} y1={82} x2={150} y2={118} variant="ink" ids={ids} />
        <VectorArrow x1={178} y1={64} x2={178 + fLen} y2={64} variant="warm" ids={ids} />
        <FigLabel x={160} y={26} variant="ink">
          N
        </FigLabel>
        <FigLabel x={168} y={98} variant="ink">
          mg
        </FigLabel>
        <FigLabel x={178 + fLen * 0.4} y={56} variant="ink">
          F
        </FigLabel>
        {!reduced && !narrow && (
          <FigLabel x={16} y={28} variant="eq" className="fig-eq--collapsible">
            ΣFₓ = ma
          </FigLabel>
        )}
        {!narrow && (
          <text x={72} y={122} className="fig-label fig-label--axis fig-hide-mobile">
            surface
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
    const id = window.setInterval(() => setDeg((d) => (d >= 80 ? 10 : d + 0.8)), 55)
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
        <GraphFrame ox={60} oy={110} labelX="x" labelY="y" />
        <line x1={ox} y1={oy} x2={ox + fx} y2={oy - fy} className="demo-force demo-force--pull" markerEnd={`url(#${SharedMarkers.arrowWarm})`} />
        <line x1={ox} y1={oy} x2={ox + fx} y2={oy} className="fig-guide" markerEnd={`url(#${SharedMarkers.arrow})`} />
        <line x1={ox + fx} y1={oy} x2={ox + fx} y2={oy - fy} className="fig-guide" markerEnd={`url(#${SharedMarkers.arrow})`} />
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
  const ids = useMemo(() => sharedIds(), [])
  const narrow = useNarrowViewport()
  // Phone: park labels further off shafts (≥ LabelClear.stroke from force lines)
  const t1 = narrow ? { x: 28, y: 56 } : { x: 34, y: 48 }
  const t2 = narrow ? { x: 246, y: 56 } : { x: 238, y: 48 }
  const wLab = narrow ? { x: 162, y: 98 } : { x: 158, y: 102 }
  return (
    <DemoShell
      className={className}
      label="Particle equilibrium at a knot"
      figureId="3-2"
      figureTitle="Particle equilibrium at a knot"
      caption="Two cables and a weight meet at a pin; ΣFₓ = 0 and ΣFᵧ = 0 close the system for the two unknown tensions."
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1={52} y1={22} x2={76} y2={22} className="fig-wire" />
        <line x1={204} y1={22} x2={228} y2={22} className="fig-wire" />
        <VectorArrow x1={140} y1={72} x2={56} y2={28} variant="cool" ids={ids} />
        <VectorArrow x1={140} y1={72} x2={224} y2={28} variant="cool" ids={ids} />
        {/* Tip ends ≥4uu above mass body (optical tip–body gap) */}
        <VectorArrow x1={140} y1={72} x2={140} y2={116} variant="warm" ids={ids} />
        <PlotPoint cx={140} cy={72} r={4} />
        <BodyRect x={125} y={122} w={30} h={14} rx={2} />
        <FigLabel x={t1.x} y={t1.y} variant="ink">
          T₁
        </FigLabel>
        <FigLabel x={t2.x} y={t2.y} variant="ink">
          T₂
        </FigLabel>
        <FigLabel x={wLab.x} y={wLab.y} variant="ink">
          W
        </FigLabel>
        {!narrow && (
          <FigLabel x={16} y={128} variant="eq" className="fig-eq--collapsible">
            ΣFₓ = 0,  ΣFᵧ = 0
          </FigLabel>
        )}
      </svg>
    </DemoShell>
  )
}

function VoltageDivider({ className, reduced }: { className?: string; reduced: boolean }) {
  const Vin = 12
  const [r2frac, setR2frac] = useState(0.4)
  const narrow = useNarrowViewport()
  const Rtot = 10
  const R2 = r2frac * Rtot
  const R1 = Rtot - R2
  const Vout = Vin * (R2 / Rtot)
  const midY = 30 + (1 - r2frac) * 70
  const r1Y = 28
  const r2Y = midY + 6

  return (
    <DemoShell
      className={className}
      label="Interactive voltage divider"
      caption={`Vin=${Vin} V · R₁=${R1.toFixed(1)} kΩ · R₂=${R2.toFixed(1)} kΩ → Vout=${Vout.toFixed(2)} V. Ratio sets the fraction.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1={50} y1={25} x2={50} y2={118} className="fig-wire" />
        <line x1={50} y1={25} x2={140} y2={25} className="fig-wire" />
        <line x1={140} y1={25} x2={140} y2={r1Y} className="fig-wire" />
        <ResistorPath x={140} y={r1Y} vertical segments={5} amp={7} pitch={Math.max(5, (midY - r1Y - 8) / 5)} />
        <FigLabel x={168} y={25 + (midY - 25) * 0.35} variant="ink">
          R₁
        </FigLabel>
        <PlotPoint cx={140} cy={midY} r={4} variant="sample" className="fig-point--good" />
        <line x1={140} y1={midY} x2={210} y2={midY} className="fig-wire fig-wire--accent" />
        <FigLabel x={215} y={midY + 4} variant="ink">
          Vout
        </FigLabel>
        <line x1={140} y1={midY} x2={140} y2={r2Y} className="fig-wire" />
        <ResistorPath x={140} y={r2Y} vertical segments={5} amp={7} pitch={Math.max(5, (118 - r2Y) / 5)} />
        <FigLabel x={168} y={midY + 28} variant="ink">
          R₂
        </FigLabel>
        <line x1={140} y1={118} x2={50} y2={118} className="fig-wire" />
        <GroundSymbol x={50} y={118} />
        <FigLabel x={20} y={80}>
          Vin
        </FigLabel>
        {!reduced && !narrow && (
          <FigLabel x={40} y={18} variant="eq" className="fig-eq--collapsible">
            Vout = Vin · R₂/(R₁+R₂)
          </FigLabel>
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
    const id = window.setInterval(() => setT((x) => (x + 0.02) % 1), 55)
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
    }, 55)
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
        <line x1="40" y1="70" x2="95" y2="70" className="demo-force demo-qin" markerEnd={`url(#${SharedMarkers.arrowWarn})`} />
        <text x="45" y="60" className="demo-label">
          Q={Q}
        </text>
        <line x1="185" y1="70" x2="245" y2="70" className="demo-force demo-wout" markerEnd={`url(#${SharedMarkers.arrowCool})`} />
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
  const narrow = useNarrowViewport()
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => setEps((e) => (e >= 0.22 ? 0.005 : e + 0.003)), 50)
    return () => clearInterval(id)
  }, [playing, reduced])

  const map = useMemo(() => makeStressStrainMap(48, 118, 920, 1.05), [])
  const stress = sigma(eps)
  const d = useMemo(() => stressStrainPath(eps, map), [eps, map])
  const showYield = eps >= SS_EY || !reduced
  const yx = map.mapX(SS_EY)
  const yy = map.mapY(SS_SY)
  const eLab = useMemo(() => elasticChordLabel(map, LabelClear.stroke), [map])
  const px = clamp(map.mapX(eps), map.ox, 250)
  const py = clamp(map.mapY(stress), 24, map.oy)
  // Keep σᵧ off the axis tip (σ) — especially at 375px
  const syLabel = narrow
    ? { x: yx - 14, y: yy - 8 }
    : { x: Math.max(map.ox + 22, yx - 22), y: yy - 6 }

  return (
    <DemoShell
      className={className}
      label="Live stress–strain curve"
      figureId="6-1"
      figureTitle="Engineering stress–strain curve"
      caption={`ε=${eps.toFixed(3)} → σ≈${stress.toFixed(0)} (arb.). Elastic slope is E; yield at σᵧ when ε≥εᵧ.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <GraphFrame ox={48} oy={118} labelX="ε" labelY="σ" />
        <path d={d} className="fig-curve" fill="none" />
        <line x1={map.ox} y1={map.oy} x2={yx} y2={yy} className="fig-tangent" />
        {showYield && (
          <>
            <line x1={map.ox} y1={yy} x2={yx} y2={yy} className="fig-guide" />
            <line x1={yx} y1={map.oy} x2={yx} y2={yy} className="fig-guide" />
            <PlotPoint cx={yx} cy={yy} r={3.5} variant="ring" />
            <FigLabel x={syLabel.x} y={syLabel.y}>
              σᵧ
            </FigLabel>
            <FigLabel x={eLab.x} y={eLab.y} variant="ink">
              E
            </FigLabel>
            {!narrow && (
              <FigLabel x={yx + 6} y={map.oy - 6} className="fig-hide-mobile">
                εᵧ
              </FigLabel>
            )}
          </>
        )}
        <PlotPoint cx={px} cy={py} r={4} variant="sample" />
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
