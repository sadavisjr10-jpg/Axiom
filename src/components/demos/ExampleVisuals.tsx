import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { ExampleVisualKind, ExampleVisualSpec } from '../../types'
import { GraphFrame, TrackAxis, SharedMarkers } from './diagramPrimitives'

/** Shared reduced-motion hook (mirrors objective demos). */
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

function Shell({
  label,
  caption,
  children,
}: {
  label: string
  caption?: string
  children: ReactNode
}) {
  return (
    <div className="obj-demo example-visual" role="group" aria-label={label}>
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

type P = Record<string, number | string | boolean | undefined>

function num(p: P | undefined, key: string, fallback: number): number {
  const v = p?.[key]
  return typeof v === 'number' ? v : fallback
}

function str(p: P | undefined, key: string, fallback: string): string {
  const v = p?.[key]
  return typeof v === 'string' ? v : fallback
}

/* ── Calculus ─────────────────────────────────────────────── */

function PolyLimit({ params, reduced }: { params?: P; reduced: boolean }) {
  const a = num(params, 'a', 3)
  const [x, setX] = useState(a - 1.2)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => {
      setX((v) => {
        const n = v + 0.04
        return n >= a - 0.05 ? a - 1.4 : n
      })
    }, 55)
    return () => clearInterval(id)
  }, [playing, reduced, a])
  // f(x) = 2x² − 5x + 1 → f(3)=4
  const f = (t: number) => 2 * t * t - 5 * t + 1
  const L = f(a)
  const mapX = (t: number) => 40 + ((t - (a - 2)) / 4) * 200
  const mapY = (y: number) => 100 - ((y - (-2)) / 12) * 70
  const path = useMemo(() => {
    const pts: string[] = []
    for (let t = a - 2; t <= a + 2; t += 0.1) {
      pts.push(`${mapX(t)},${mapY(f(t))}`)
    }
    return 'M' + pts.join(' L')
  }, [a])

  return (
    <Shell
      label={`Limit as x → ${a}`}
      caption={`f(x)=2x²−5x+1. As x→${a}, f(x)→${L}. Continuous → plug in.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <GraphFrame />
        <path d={path} className="demo-curve" fill="none" />
        <line x1={mapX(a)} y1="20" x2={mapX(a)} y2="110" className="demo-guide" strokeDasharray="4 3" />
        <circle cx={mapX(a)} cy={mapY(L)} r="5" className="demo-target" />
        <text x={mapX(a) + 8} y={mapY(L) - 6} className="demo-label">
          L={L}
        </text>
        <circle cx={mapX(x)} cy={mapY(f(x))} r="5" className="demo-dot" />
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub
          label="x"
          value={x}
          min={a - 1.5}
          max={a - 0.05}
          onChange={(v) => {
            setPlaying(false)
            setX(v)
          }}
          display={x.toFixed(2)}
        />
      </div>
    </Shell>
  )
}

function RemovableHole({ params, reduced }: { params?: P; reduced: boolean }) {
  const a = num(params, 'a', 2)
  const [side, setSide] = useState(0.6)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => setSide((s) => (s <= 0.08 ? 0.9 : s - 0.02)), 55)
    return () => clearInterval(id)
  }, [playing, reduced])
  // after cancel: y = x+2, hole at x=2, L=4
  const mapX = (t: number) => 40 + ((t - 0) / 4) * 200
  const mapY = (y: number) => 105 - ((y - 0) / 6) * 80
  const xL = a - side
  const xR = a + side

  return (
    <Shell
      label="Removable discontinuity"
      caption={`(x²−4)/(x−2) = x+2 for x≠${a}. Hole at x=${a}; limit is ${a + 2}.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <GraphFrame showY={false} />
        <path d={`M${mapX(0)},${mapY(2)} L${mapX(4)},${mapY(6)}`} className="demo-curve" fill="none" />
        <circle cx={mapX(a)} cy={mapY(a + 2)} r="6" className="demo-target" fill="none" strokeWidth="2" />
        <circle cx={mapX(xL)} cy={mapY(xL + 2)} r="4" className="demo-dot" />
        <circle cx={mapX(xR)} cy={mapY(xR + 2)} r="4" className="demo-dot demo-dot--alt" />
        <text x="40" y="28" className="demo-label">
          hole · lim = {a + 2}
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub
          label="|x − a|"
          value={side}
          min={0.05}
          max={1}
          onChange={(v) => {
            setPlaying(false)
            setSide(v)
          }}
        />
      </div>
    </Shell>
  )
}

function ScaledSinc({ params, reduced }: { params?: P; reduced: boolean }) {
  const k = num(params, 'k', 3)
  const [x, setX] = useState(0.9)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => setX((v) => (v < 0.06 ? 1.1 : v - 0.02)), 55)
    return () => clearInterval(id)
  }, [playing, reduced])
  const ratio = Math.abs(x) < 1e-8 ? k : Math.sin(k * x) / x
  const px = 140 + x * 90
  const py = 110 - (ratio / (k + 0.5)) * 85

  return (
    <Shell
      label={`sin(${k}x)/x → ${k}`}
      caption={`Rewrite as ${k}·sin(${k}x)/(${k}x). As x→0, ratio ≈ ${ratio.toFixed(2)} → ${k}.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <GraphFrame ox={140} />
        <line x1="40" y1={110 - (k / (k + 0.5)) * 85} x2="240" y2={110 - (k / (k + 0.5)) * 85} className="demo-guide" strokeDasharray="3 3" />
        <path d="M40 95 C70 40 110 25 140 30 C170 25 210 40 240 95" className="demo-curve" fill="none" />
        <circle cx={px} cy={py} r="5" className="demo-dot" />
        <text x="200" y="24" className="demo-label">
          y = {k}
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub
          label="x"
          value={x}
          min={0.05}
          max={1.2}
          onChange={(v) => {
            setPlaying(false)
            setX(v)
          }}
        />
      </div>
    </Shell>
  )
}

function SignumJump({ reduced }: { reduced: boolean }) {
  const [side, setSide] = useState<'left' | 'right'>('left')
  const [t, setT] = useState(0.4)
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setT((x) => (x >= 0.95 ? 0.15 : x + 0.025)), 50)
    return () => clearInterval(id)
  }, [reduced, side])
  const x = side === 'left' ? 140 - (1 - t) * 80 : 140 + (1 - t) * 80
  const y = side === 'left' ? 85 : 40

  return (
    <Shell
      label="|x|/x jump"
      caption="Left → −1, right → +1. Sides disagree → two-sided limit DNE."
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <GraphFrame showY={false} />
        <line x1="140" y1="20" x2="140" y2="110" className="fig-guide" />
        <path d="M40 85 L138 85" className="demo-curve" fill="none" />
        <path d="M142 40 L250 40" className="demo-curve demo-curve--alt" fill="none" />
        <circle cx="138" cy="85" r="4" className="demo-target" fill="none" strokeWidth="2" />
        <circle cx="142" cy="40" r="4" className="demo-target" fill="none" strokeWidth="2" />
        <circle cx={x} cy={y} r="5" className="demo-dot" />
        <text x="50" y="75" className="demo-label">
          −1
        </text>
        <text x="200" y="32" className="demo-label">
          +1
        </text>
      </svg>
      <div className="obj-demo__controls">
        <button
          type="button"
          className={`obj-demo__chip ${side === 'left' ? 'is-on' : ''}`}
          onClick={() => {
            setSide('left')
            setT(0.2)
          }}
        >
          From left
        </button>
        <button
          type="button"
          className={`obj-demo__chip ${side === 'right' ? 'is-on' : ''}`}
          onClick={() => {
            setSide('right')
            setT(0.2)
          }}
        >
          From right
        </button>
      </div>
    </Shell>
  )
}

function SecantAtPoint({ params, reduced }: { params?: P; reduced: boolean }) {
  const a = num(params, 'a', 3)
  const [h, setH] = useState(reduced ? 0.2 : 1.2)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => setH((v) => (v < 0.08 ? 1.4 : v - 0.025)), 55)
    return () => clearInterval(id)
  }, [playing, reduced])
  // f(x)=x², f'(3)=6
  const mapX = (t: number) => 50 + ((t - 1) / 4) * 180
  const mapY = (y: number) => 110 - (y / 25) * 85
  const fa = a * a
  const f2 = (a + h) * (a + h)
  const slope = (f2 - fa) / h
  const x0 = mapX(a)
  const y0 = mapY(fa)
  const x1 = mapX(a + h)
  const y1 = mapY(f2)
  const extend = 50
  const dx = x1 - x0
  const dy = y1 - y0

  return (
    <Shell
      label={`f′(${a}) for f(x)=x²`}
      caption={`h=${h.toFixed(2)} · secant slope ${(slope).toFixed(2)} → 2·${a}=${2 * a} as h→0.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <GraphFrame showY={false} />
        <path d="M50 105 Q120 100 200 30" className="demo-curve" fill="none" />
        <line
          x1={x0 - extend}
          y1={y0 - (dy / dx) * extend}
          x2={x1 + extend}
          y2={y1 + (dy / dx) * extend}
          className="demo-secant"
        />
        <circle cx={x0} cy={y0} r="5" className="demo-target" />
        <circle cx={x1} cy={y1} r="5" className="demo-dot" />
        <text x="40" y="28" className="demo-label">
          x={a}, f′→{2 * a}
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub
          label="h"
          value={h}
          min={0.05}
          max={1.5}
          onChange={(v) => {
            setPlaying(false)
            setH(v)
          }}
        />
      </div>
    </Shell>
  )
}

function LineSlope({ params }: { params?: P }) {
  const m = num(params, 'm', 4)
  const b = num(params, 'b', -1)

  return (
    <Shell
      label={`Slope of y = ${m}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}`}
      caption={`Difference quotient collapses to ${m} for every h ≠ 0 — constant slope.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <GraphFrame />
        <line x1="50" y1="100" x2="245" y2="28" className="demo-curve" markerEnd={`url(#${SharedMarkers.arrowGood})`} />
        <text x="150" y="55" className="demo-eq">
          m = {m}
        </text>
      </svg>
    </Shell>
  )
}

function ProductUv({ params }: { params?: P }) {
  const caption = str(params, 'caption', 'y = x²(3x+1) → y′ = 2x(3x+1) + x²·3')
  return (
    <Shell label="Product rule" caption={caption}>
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="40" y="35" width="80" height="55" rx="6" className="demo-box" />
        <text x="62" y="68" className="demo-label">
          u = x²
        </text>
        <text x="130" y="68" className="demo-label">
          ×
        </text>
        <rect x="150" y="35" width="90" height="55" rx="6" className="demo-box" />
        <text x="162" y="68" className="demo-label">
          v = 3x+1
        </text>
        <text x="40" y="120" className="demo-eq">
          u′v + uv′
        </text>
      </svg>
    </Shell>
  )
}

function PowerRecip({ reduced }: { params?: P; reduced: boolean }) {
  const [x, setX] = useState(1.4)
  const y = 1 / (x * x)
  const yp = -2 / (x * x * x)
  const px = 50 + x * 70
  const py = 110 - y * 70

  return (
    <Shell
      label="y = x⁻²"
      caption={`At x=${x.toFixed(2)}, y=${y.toFixed(2)}, y′=${yp.toFixed(2)} (= −2x⁻³).`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <GraphFrame showY={false} />
        <path d="M55 30 C70 50 90 85 130 100 C170 110 210 112 250 112" className="demo-curve" fill="none" />
        <line
          x1={px - 30}
          y1={py - yp * 12}
          x2={px + 40}
          y2={py + yp * 16}
          className="demo-tangent"
        />
        <circle cx={px} cy={py} r="5" className="demo-dot" />
        {!reduced && (
          <text x="140" y="40" className="demo-label">
            (xⁿ)′ = n xⁿ⁻¹
          </text>
        )}
      </svg>
      <div className="obj-demo__controls">
        <Scrub label="x" value={x} min={0.7} max={2.2} onChange={setX} />
      </div>
    </Shell>
  )
}

function AreaIntegral({ params, reduced }: { params?: P; reduced: boolean }) {
  const a = num(params, 'a', 0)
  const bMax = num(params, 'b', 2)
  const kind = str(params, 'fn', '3x2') // 3x2 | 2x-1
  const [b, setB] = useState(reduced ? bMax : a + 0.4)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => setB((v) => (v >= bMax - 0.02 ? a + 0.3 : v + 0.03)), 55)
    return () => clearInterval(id)
  }, [playing, reduced, a, bMax])

  const f = (x: number) => (kind === '2x-1' ? 2 * x - 1 : 3 * x * x)
  const F = (x: number) => (kind === '2x-1' ? x * x - x : x * x * x)
  const area = F(b) - F(a)
  const mapX = (x: number) => 40 + ((x - a) / (bMax - a || 1)) * 200
  const mapY = (y: number) => {
    const ymax = kind === '2x-1' ? 8 : 14
    return 110 - (Math.max(0, y) / ymax) * 85
  }
  const samples: string[] = []
  for (let x = a; x <= b + 1e-9; x += 0.05) {
    samples.push(`${mapX(x)},${mapY(f(x))}`)
  }
  const fillPath =
    samples.length > 0
      ? `M${mapX(a)},110 L${samples.join(' L')} L${mapX(b)},110 Z`
      : ''

  return (
    <Shell
      label={`∫ from ${a} to ${bMax}`}
      caption={`Right endpoint b=${b.toFixed(2)} · shaded area ≈ ${area.toFixed(2)} → F(${bMax})−F(${a})=${(F(bMax) - F(a)).toFixed(0)}.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <GraphFrame showY={false} />
        {fillPath && <path d={fillPath} className="demo-fill" />}
        <path
          d={(() => {
            const pts: string[] = []
            for (let x = a; x <= bMax; x += 0.08) pts.push(`${mapX(x)},${mapY(f(x))}`)
            return 'M' + pts.join(' L')
          })()}
          className="demo-curve"
          fill="none"
        />
        <line x1={mapX(a)} y1="20" x2={mapX(a)} y2="110" className="demo-guide" />
        <line x1={mapX(b)} y1="20" x2={mapX(b)} y2="110" className="demo-guide" />
        <text x={mapX(a) - 4} y="128" className="demo-label">
          {a}
        </text>
        <text x={mapX(bMax) - 4} y="128" className="demo-label">
          {bMax}
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub
          label="b"
          value={b}
          min={a + 0.1}
          max={bMax}
          onChange={(v) => {
            setPlaying(false)
            setB(v)
          }}
        />
      </div>
    </Shell>
  )
}

/* ── Mechanics ────────────────────────────────────────────── */

function KinematicsMotion({ params, reduced }: { params?: P; reduced: boolean }) {
  const mode = str(params, 'mode', 'brake') // brake | boost | freefall
  const v0 = num(params, 'v0', mode === 'brake' ? 20 : 0)
  const a = num(params, 'a', mode === 'brake' ? -4 : mode === 'freefall' ? 10 : 2)
  const tMax = num(params, 'tMax', mode === 'brake' ? 5 : mode === 'freefall' ? 2 : 5)
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(!reduced)
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => setT((x) => (x >= tMax ? 0 : x + 0.05)), 55)
    return () => clearInterval(id)
  }, [playing, reduced, tMax])
  const v = v0 + a * t
  const x = v0 * t + 0.5 * a * t * t
  const xStop = mode === 'brake' ? (0 - v0 * v0) / (2 * a) : mode === 'freefall' ? 20 : 0.5 * a * tMax * tMax
  const px = 40 + Math.min(Math.max(x, 0) / Math.max(xStop, 1), 1) * 190
  const py = mode === 'freefall' ? 30 + Math.min(x / 20, 1) * 70 : 72

  const caption =
    mode === 'brake'
      ? `v₀=${v0} m/s, a=${a} m/s² · stop distance = v₀²/(2|a|) = ${xStop.toFixed(0)} m`
      : mode === 'freefall'
        ? `Drop 20 m, g=${a} · t=${t.toFixed(2)} s · y≈${x.toFixed(1)} m (hit at √(2h/g)=2 s)`
        : `From rest, a=${a} · t=${t.toFixed(2)} s → v=${v.toFixed(1)} m/s, x=${x.toFixed(1)} m`

  return (
    <Shell label="Constant-acceleration motion" caption={caption}>
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        {mode === 'freefall' ? (
          <>
            <line x1="40" y1="20" x2="40" y2="120" className="fig-axis" markerEnd={`url(#${SharedMarkers.arrow})`} />
            <rect x="100" y={py} width="28" height="28" rx="14" className="demo-box" />
            <line x1="80" y1="120" x2="210" y2="120" className="fig-axis" markerEnd={`url(#${SharedMarkers.arrow})`} />
            <text x="160" y="40" className="demo-label">
              ↓ +g
            </text>
          </>
        ) : (
          <>
            <TrackAxis />
            <rect x={px} y={py} width="40" height="28" rx="4" className="demo-box" />
            <text x="40" y="40" className="demo-label">
              v = {v.toFixed(1)} · x = {Math.max(x, 0).toFixed(1)}
            </text>
          </>
        )}
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub
          label="t"
          value={t}
          min={0}
          max={tMax}
          step={0.05}
          onChange={(v) => {
            setPlaying(false)
            setT(v)
          }}
          display={`${t.toFixed(2)} s`}
        />
      </div>
    </Shell>
  )
}

function FbdPush({ params }: { params?: P }) {
  const m = num(params, 'm', 5)
  const F = num(params, 'F', 15)
  const a = F / m
  const fLen = 50 + F * 2

  return (
    <Shell
      label="Horizontal free-body"
      caption={`m=${m} kg, F=${F} N (frictionless) → a = F/m = ${a} m/s². N cancels mg.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="110" y="50" width="60" height="40" rx="4" className="demo-box" />
        <line x1="140" y1="50" x2="140" y2="18" className="demo-force" markerEnd={`url(#${SharedMarkers.arrow})`} />
        <text x="148" y="28" className="demo-label">
          N
        </text>
        <line x1="140" y1="90" x2="140" y2="122" className="demo-force" markerEnd={`url(#${SharedMarkers.arrow})`} />
        <text x="148" y="118" className="demo-label">
          mg
        </text>
        <line x1="170" y1="70" x2={170 + fLen} y2="70" className="demo-force demo-force--pull" markerEnd={`url(#${SharedMarkers.arrowWarm})`} />
        <text x={180 + fLen * 0.25} y="62" className="demo-label">
          F={F} N
        </text>
      </svg>
    </Shell>
  )
}

function FbdElevator({ params }: { params?: P }) {
  const m = num(params, 'm', 10)
  const accel = num(params, 'a', 2)
  const g = num(params, 'g', 10)
  const T = m * (g + accel) // up positive; if a negative (down), T = m(g+a)
  const dir = accel >= 0 ? 'up' : 'down'

  return (
    <Shell
      label={`Elevator accelerating ${dir}`}
      caption={`ΣF = T − mg = ma → T = m(g+a) = ${m}(${g}${accel >= 0 ? '+' : ''}${accel}) = ${T} N.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="140" y1="45" x2="140" y2="12" className="demo-force" markerEnd={`url(#${SharedMarkers.arrow})`} />
        <text x="150" y="28" className="demo-label">
          T={T} N
        </text>
        <rect x="115" y="45" width="50" height="40" rx="4" className="demo-box" />
        <line x1="140" y1="85" x2="140" y2="122" className="demo-force" markerEnd={`url(#${SharedMarkers.arrow})`} />
        <text x="150" y="112" className="demo-label">
          mg={m * g}
        </text>
        <text x="40" y="70" className="demo-label">
          a = {accel} m/s² {dir}
        </text>
      </svg>
    </Shell>
  )
}

/* ── Statics ──────────────────────────────────────────────── */

function VectorSum({ params, reduced }: { params?: P; reduced: boolean }) {
  const mode = str(params, 'mode', 'two') // two | three | resolve
  const [t, setT] = useState(reduced ? 1 : 0.2)
  const [playing, setPlaying] = useState(!reduced && mode !== 'resolve')
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => setT((x) => (x >= 1 ? 0.15 : x + 0.02)), 55)
    return () => clearInterval(id)
  }, [playing, reduced])

  if (mode === 'resolve') {
    const F = num(params, 'F', 50)
    const deg = num(params, 'deg', 30)
    const rad = (deg * Math.PI) / 180
    const fx = F * Math.cos(rad)
    const fy = F * Math.sin(rad)
    const ox = 60
    const oy = 110
    const scale = 2.2
    return (
      <Shell
        label={`${F} N at ${deg}°`}
        caption={`Fₓ = ${F} cos ${deg}° ≈ ${fx.toFixed(1)} N · Fᵧ = ${F} sin ${deg}° ≈ ${fy.toFixed(1)} N`}
      >
        <svg viewBox="0 0 280 140" className="obj-demo__svg">
          <GraphFrame ox={60} oy={110} labelX="x" labelY="y" />
          <line x1={ox} y1={oy} x2={ox + fx * scale} y2={oy - fy * scale} className="demo-force demo-force--pull" />
          <line x1={ox} y1={oy} x2={ox + fx * scale} y2={oy} className="demo-guide" />
          <line x1={ox + fx * scale} y1={oy} x2={ox + fx * scale} y2={oy - fy * scale} className="demo-guide" />
          <text x={ox + fx} y={oy + 14} className="demo-label">
            Fₓ
          </text>
          <text x={ox + fx * scale + 6} y={oy - fy} className="demo-label">
            Fᵧ
          </text>
        </svg>
      </Shell>
    )
  }

  if (mode === 'three') {
    // 30@0, 40@90, 50@180 → Rx=-20, Ry=40, |R|=√2000≈44.7
    const rx = -20 * t
    const ry = 40 * t
    return (
      <Shell
        label="Three-force resultant"
        caption={`Rₓ=30−50=−20 · Rᵧ=40 · |R|=√(400+1600)≈44.7 N`}
      >
        <svg viewBox="0 0 280 140" className="obj-demo__svg">
          <line x1="40" y1="70" x2="250" y2="70" className="fig-axis" markerEnd={`url(#${SharedMarkers.arrow})`} />
          <line x1="140" y1="120" x2="140" y2="18" className="fig-axis" markerEnd={`url(#${SharedMarkers.arrow})`} />
          <line x1="140" y1="70" x2={140 + 30} y2="70" className="demo-force" markerEnd={`url(#${SharedMarkers.arrowWarm})`} />
          <line x1="140" y1="70" x2="140" y2={70 - 40} className="demo-force" markerEnd={`url(#${SharedMarkers.arrowCool})`} />
          <line x1="140" y1="70" x2={140 - 50} y2="70" className="demo-force demo-curve--alt" markerEnd={`url(#${SharedMarkers.arrowWarn})`} />
          <line x1="140" y1="70" x2={140 + rx} y2={70 - ry} className="demo-force demo-force--pull" markerEnd={`url(#${SharedMarkers.arrowGood})`} />
          <text x="40" y="30" className="demo-label">
            R
          </text>
        </svg>
        <div className="obj-demo__controls">
          <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
          <Scrub label="Build R" value={t} min={0} max={1} onChange={(v) => { setPlaying(false); setT(v) }} />
        </div>
      </Shell>
    )
  }

  // two equal perpendicular → 100√2 at 45°
  const r = 100 * Math.SQRT2 * t
  const ang = Math.PI / 4
  return (
    <Shell
      label="Two perpendicular forces"
      caption={`F₁=F₂=100 N → |R|=100√2≈141 N at 45°.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="80" y1="110" x2={80 + 90} y2="110" className="demo-force" />
        <line x1="80" y1="110" x2="80" y2={110 - 90} className="demo-force" />
        <line
          x1="80"
          y1="110"
          x2={80 + r * Math.cos(ang) * 0.9}
          y2={110 - r * Math.sin(ang) * 0.9}
          className="demo-force demo-force--pull"
          strokeWidth="3"
        />
        <text x="180" y="105" className="demo-label">
          F₁
        </text>
        <text x="88" y="30" className="demo-label">
          F₂
        </text>
        <text x="160" y="50" className="demo-label">
          R
        </text>
      </svg>
      <div className="obj-demo__controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying((p) => !p)} disabled={reduced} />
        <Scrub label="Build R" value={t} min={0} max={1} onChange={(v) => { setPlaying(false); setT(v) }} />
      </div>
    </Shell>
  )
}

function ParticleCables({ params }: { params?: P }) {
  const W = num(params, 'W', 100)
  const th1 = num(params, 'th1', 30)
  const th2 = num(params, 'th2', 60)
  const sym = th1 === th2
  // For 30/60: T1=50, T2=50√3≈86.6; for 45/45: T=W/(2sin45)=W/√2
  const T1 = sym ? W / Math.SQRT2 : W / 2
  const T2 = sym ? W / Math.SQRT2 : (W * Math.sqrt(3)) / 2

  return (
    <Shell
      label="Hanging mass, two cables"
      caption={
        sym
          ? `Symmetric ${th1}°: each T = W/√2 ≈ ${T1.toFixed(0)} N for W=${W} N.`
          : `${th1}°/${th2}° with W=${W}: T₁≈${T1.toFixed(0)} N, T₂≈${T2.toFixed(0)} N.`
      }
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="40" y1="25" x2="140" y2="70" className="demo-force" />
        <line x1="240" y1="25" x2="140" y2="70" className="demo-force" />
        <line x1="140" y1="70" x2="140" y2="115" className="demo-force" />
        <circle cx="140" cy="70" r="7" className="demo-target" />
        <rect x="122" y="115" width="36" height="18" rx="2" className="demo-box" />
        <text x="48" y="55" className="demo-label">
          T₁ ({th1}°)
        </text>
        <text x="200" y="55" className="demo-label">
          T₂ ({th2}°)
        </text>
        <text x="148" y="108" className="demo-label">
          W={W}
        </text>
      </svg>
    </Shell>
  )
}

/* ── Circuits ─────────────────────────────────────────────── */

function DividerViz({ params }: { params?: P }) {
  const Vin = num(params, 'Vin', 10)
  const R1 = num(params, 'R1', 2)
  const R2 = num(params, 'R2', 2)
  const loaded = Boolean(params?.loaded)
  const RL = num(params, 'RL', 2)
  const R2eq = loaded ? (R2 * RL) / (R2 + RL) : R2
  const Vout = Vin * (R2eq / (R1 + R2eq))
  const I = Vin / (R1 + R2eq)
  const midY = 35 + (R1 / (R1 + R2eq)) * 60

  return (
    <Shell
      label={loaded ? 'Loaded voltage divider' : 'Voltage divider'}
      caption={
        loaded
          ? `R₂∥R_L=${R2eq.toFixed(2)} kΩ → Vout≈${Vout.toFixed(2)} V (was ${Vin * (R2 / (R1 + R2))} V open).`
          : `Vout = Vin·R₂/(R₁+R₂) = ${Vin}·${R2}/(${R1}+${R2}) = ${Vout.toFixed(2)} V · I=${(I * 1000).toFixed(1)} mA`
      }
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="120" y1="20" x2="120" y2="120" className="demo-wire" />
        <rect x="105" y="35" width="30" height="18" className="demo-box" />
        <text x="140" y="48" className="demo-label">
          R₁={R1}k
        </text>
        <rect x="105" y="75" width="30" height="18" className="demo-box" />
        <text x="140" y="88" className="demo-label">
          R₂={R2}k
        </text>
        {loaded && (
          <>
            <line x1="120" y1="84" x2="200" y2="84" className="demo-wire" />
            <rect x="200" y="75" width="30" height="18" className="demo-box sv-box--alt" />
            <text x="200" y="110" className="demo-label">
              R_L={RL}k
            </text>
          </>
        )}
        <circle cx="120" cy={midY} r="4" className="demo-dot" />
        <text x="40" y="28" className="demo-label">
          Vin={Vin}V
        </text>
        <text x="40" y="100" className="demo-eq">
          Vout≈{Vout.toFixed(1)}V
        </text>
      </svg>
    </Shell>
  )
}

function SeriesKvl({ params }: { params?: P }) {
  const V = num(params, 'V', 12)
  const R1 = num(params, 'R1', 3)
  const R2 = num(params, 'R2', 1)
  const I = V / (R1 + R2)
  const V1 = I * R1

  return (
    <Shell
      label="Single-loop KVL"
      caption={`I = ${V}/(${R1}+${R2}) = ${I} A · V₃Ω = ${V1} V. Around loop: ${V} − ${V1} − ${I * R2} = 0.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="50" y="40" width="180" height="70" rx="8" className="demo-box" fill="none" />
        <text x="60" y="35" className="demo-label">
          {V} V
        </text>
        <text x="120" y="35" className="demo-label">
          {R1} Ω
        </text>
        <text x="190" y="35" className="demo-label">
          {R2} Ω
        </text>
        <path d="M70 75 A8 8 0 1 1 70 74" className="demo-loop" />
        <text x="100" y="80" className="demo-eq">
          I={I} A
        </text>
      </svg>
    </Shell>
  )
}

function KclNode({ params }: { params?: P }) {
  const i1 = num(params, 'i1', 2)
  const i2 = num(params, 'i2', 3)
  const iOut = i1 + i2

  return (
    <Shell
      label="KCL at a node"
      caption={`Σ in = Σ out → ${i1}+${i2} = I_out = ${iOut} A.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <line x1="40" y1="40" x2="140" y2="70" className="demo-wire" />
        <line x1="40" y1="100" x2="140" y2="70" className="demo-wire" />
        <line x1="140" y1="70" x2="240" y2="70" className="demo-wire" />
        <circle cx="140" cy="70" r="8" className="demo-target" />
        <text x="50" y="35" className="demo-label">
          {i1} A →
        </text>
        <text x="50" y="115" className="demo-label">
          {i2} A →
        </text>
        <text x="180" y="60" className="demo-label">
          I_out={iOut} A
        </text>
      </svg>
    </Shell>
  )
}

/* ── Thermo ───────────────────────────────────────────────── */

function PvtState({ params }: { params?: P }) {
  const mode = str(params, 'mode', 'pressure') // pressure | isotherm | isochor
  const P1 = num(params, 'P1', 100)
  const V1 = num(params, 'V1', 2)
  const V2 = num(params, 'V2', 1)
  const T1 = num(params, 'T1', 300)
  const T2 = num(params, 'T2', 600)

  if (mode === 'isotherm') {
    const P2 = (P1 * V1) / V2
    const k = P1 * V1
    const ox = 40
    const oy = 110
    const vMin = Math.min(V1, V2) * 0.55
    const vMax = Math.max(V1, V2) * 1.35
    const mapV = (V: number) => ox + ((V - vMin) / (vMax - vMin)) * 200
    const mapP = (P: number) => {
      const pMax = k / vMin
      const pMin = k / vMax
      return oy - ((P - pMin) / (pMax - pMin || 1)) * 80
    }
    const pts: string[] = []
    for (let i = 0; i <= 40; i++) {
      const V = vMin + (i / 40) * (vMax - vMin)
      pts.push(`${mapV(V)} ${mapP(k / V)}`)
    }
    const d = `M${pts[0]} L${pts.slice(1).join(' L')}`
    const x1 = mapV(V1)
    const y1 = mapP(P1)
    const x2 = mapV(V2)
    const y2 = mapP(P2)
    return (
      <Shell
        label="Isothermal compression"
        caption={`T fixed · P₁V₁=P₂V₂ → P₂=${P1}·${V1}/${V2}=${P2} kPa.`}
      >
        <svg viewBox="0 0 280 140" className="obj-demo__svg">
          <GraphFrame ox={40} oy={110} labelX="V" labelY="P" />
          <path d={d} className="fig-curve" fill="none" />
          <circle cx={x1} cy={y1} r={5} className="demo-dot" />
          <circle cx={x2} cy={y2} r={5} className="demo-target" />
          <text x={x1 - 10} y={y1 - 8} className="demo-label">
            1
          </text>
          <text x={x2 + 8} y={y2 + 4} className="demo-label">
            2
          </text>
          <text x="160" y="30" className="demo-label">
            PV=const
          </text>
        </svg>
      </Shell>
    )
  }

  if (mode === 'isochor') {
    const P2 = P1 * (T2 / T1)
    return (
      <Shell
        label="Isochoric heat-up"
        caption={`V fixed · P/T=const → P₂=${P1}·(${T2}/${T1})=${P2} kPa.`}
      >
        <svg viewBox="0 0 280 140" className="obj-demo__svg">
          <rect x="100" y="30" width="80" height="80" rx="4" className="demo-box" />
          <text x="115" y="75" className="demo-label">
            V fixed
          </text>
          <text x="40" y="50" className="demo-label">
            T: {T1}→{T2} K
          </text>
          <text x="40" y="100" className="demo-eq">
            P→{P2} kPa
          </text>
        </svg>
      </Shell>
    )
  }

  // find P from nRT/V
  const n = num(params, 'n', 1)
  const V = num(params, 'V', 0.0821)
  const T = num(params, 'T', 300)
  const R = num(params, 'R', 8.314)
  const P = (n * R * T) / V

  return (
    <Shell
      label="Ideal-gas state"
      caption={`P = nRT/V = ${n}·${R}·${T}/${V} ≈ ${P.toFixed(0)} Pa.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="90" y="35" width="100" height="70" rx="6" className="demo-box" />
        <circle cx="120" cy="55" r="3" className="demo-dot" />
        <circle cx="150" cy="70" r="3" className="demo-dot" />
        <circle cx="165" cy="50" r="3" className="demo-dot demo-dot--alt" />
        <text x="105" y="120" className="demo-eq">
          PV=nRT
        </text>
        <text x="40" y="30" className="demo-label">
          T={T} K
        </text>
      </svg>
    </Shell>
  )
}

function EnergyBalance({ params }: { params?: P }) {
  const mode = str(params, 'mode', 'firstlaw') // firstlaw | carnot | cycle
  if (mode === 'carnot') {
    const TH = num(params, 'TH', 600)
    const TC = num(params, 'TC', 300)
    const eta = 1 - TC / TH
    return (
      <Shell
        label="Carnot efficiency"
        caption={`η_max = 1 − T_C/T_H = 1 − ${TC}/${TH} = ${(eta * 100).toFixed(0)}%.`}
      >
        <svg viewBox="0 0 280 140" className="obj-demo__svg">
          <rect x="40" y="25" width="80" height="30" rx="4" className="demo-box" />
          <text x="55" y="45" className="demo-label">
            T_H={TH}K
          </text>
          <path d="M80 55 V85" className="demo-force demo-qin" />
          <rect x="100" y="55" width="80" height="40" rx="4" className="demo-box" />
          <text x="115" y="80" className="demo-label">
            engine
          </text>
          <path d="M140 95 V115" className="demo-force" />
          <rect x="160" y="100" width="80" height="28" rx="4" className="demo-box" />
          <text x="175" y="118" className="demo-label">
            T_C={TC}K
          </text>
          <text x="200" y="50" className="demo-eq">
            η={(eta * 100).toFixed(0)}%
          </text>
        </svg>
      </Shell>
    )
  }
  if (mode === 'cycle') {
    const QH = num(params, 'QH', 100)
    const QC = num(params, 'QC', 60)
    const W = QH - QC
    return (
      <Shell
        label="Cycle energy"
        caption={`ΔU_cycle=0 → W_net = Q_H − Q_C = ${QH}−${QC}=${W} kJ.`}
      >
        <svg viewBox="0 0 280 140" className="obj-demo__svg">
          <ellipse cx="140" cy="70" rx="70" ry="40" className="demo-box" fill="none" />
          <text x="115" y="75" className="demo-label">
            cycle
          </text>
          <text x="40" y="40" className="demo-label">
            Q_H={QH}
          </text>
          <text x="200" y="110" className="demo-label">
            Q_C={QC}
          </text>
          <text x="200" y="50" className="demo-eq">
            W={W}
          </text>
        </svg>
      </Shell>
    )
  }
  const Q = num(params, 'Q', 20)
  const W = num(params, 'W', 5)
  const dU = Q - W
  return (
    <Shell
      label="First law"
      caption={`ΔU = Q − W = ${Q} − ${W} = ${dU} kJ (heat in, work out).`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="100" y="40" width="80" height="60" rx="6" className="demo-box" />
        <text x="120" y="75" className="demo-label">
          system
        </text>
        <path d="M40 70 H95" className="demo-force demo-qin" />
        <text x="45" y="60" className="demo-label">
          Q={Q}
        </text>
        <path d="M185 70 H240" className="demo-force demo-wout" />
        <text x="195" y="60" className="demo-label">
          W={W}
        </text>
        <text x="100" y="125" className="demo-eq">
          ΔU={dU} kJ
        </text>
      </svg>
    </Shell>
  )
}

/* ── Materials ────────────────────────────────────────────── */

function HookeRod({ params }: { params?: P }) {
  const E = num(params, 'E', 200) // GPa
  const L0 = num(params, 'L0', 1)
  const sigma = num(params, 'sigma', 100) // MPa
  const dL = (sigma / (E * 1000)) * L0 // m, since E in GPa=10^3 MPa
  const stretch = 1 + Math.min(dL * 80, 0.35)

  return (
    <Shell
      label="Elastic elongation"
      caption={`ΔL = (σ/E) L₀ = (${sigma} MPa)/(${E} GPa)·${L0} m = ${dL.toFixed(4)} m = ${(dL * 1000).toFixed(1)} mm.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="40" y="55" width={160 * stretch} height="30" rx="4" className="demo-box demo-specimen--stretch" />
        <text x="50" y="45" className="demo-label">
          L₀={L0} m → +ΔL
        </text>
        <text x="40" y="115" className="demo-eq">
          σ = E ε
        </text>
      </svg>
    </Shell>
  )
}

function PoissonLateral({ params }: { params?: P }) {
  const eps = num(params, 'eps', 0.001)
  const nu = num(params, 'nu', 0.3)
  const lat = -nu * eps

  return (
    <Shell
      label="Poisson effect"
      caption={`ε_lat = −ν ε_axial = −${nu}·${eps} = ${lat}. Axial stretch → lateral shrink.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="100" y="35" width="50" height="70" rx="4" className="demo-box" />
        <path d="M100 40 H85 M150 40 H165" className="demo-force" />
        <path d="M100 100 H85 M150 100 H165" className="demo-force" />
        <path d="M125 30 V20 M125 110 V120" className="demo-force demo-force--pull" />
        <text x="180" y="70" className="demo-label">
          ν={nu}
        </text>
      </svg>
    </Shell>
  )
}

function StressBar({ params }: { params?: P }) {
  const A = num(params, 'A', 100) // mm²
  const F = num(params, 'F', 20) // kN
  const sigma = (F * 1000) / A // N/mm² = MPa

  return (
    <Shell
      label="Engineering stress"
      caption={`σ = F/A₀ = ${F * 1000} N / ${A} mm² = ${sigma} MPa.`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <rect x="90" y="50" width="100" height="40" rx="4" className="demo-box" />
        <line x1="85" y1="70" x2="48" y2="70" className="demo-force demo-force--pull" markerEnd={`url(#${SharedMarkers.arrowWarm})`} />
        <line x1="195" y1="70" x2="245" y2="70" className="demo-force demo-force--pull" markerEnd={`url(#${SharedMarkers.arrowWarm})`} />
        <text x="100" y="40" className="demo-label">
          F={F} kN
        </text>
        <text x="100" y="115" className="demo-eq">
          σ={sigma} MPa
        </text>
      </svg>
    </Shell>
  )
}

function HallPetchViz({ params, reduced }: { params?: P; reduced: boolean }) {
  const mode = str(params, 'mode', 'qual') // qual | num
  const [d, setD] = useState(mode === 'num' ? 25 : 50)
  const sigma0 = num(params, 'sigma0', 100)
  const k = num(params, 'k', 0.5)
  const d_m = mode === 'num' ? 25e-6 : d * 1e-6
  const sy = sigma0 + k / Math.sqrt(d_m)

  return (
    <Shell
      label="Hall–Petch"
      caption={
        mode === 'num'
          ? `σ_y = σ₀ + k/√d = ${sigma0} + ${k}/√(${(25e-6).toExponential(0)}) ≈ ${sy.toFixed(0)} MPa.`
          : `Halving d raises 1/√d by √2 → higher yield. Scrub grain size.`
      }
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={50 + c * (40 + (80 - d) * 0.15)}
              y={30 + r * (22 + (80 - d) * 0.08)}
              width={28 + d * 0.15}
              height={16 + d * 0.08}
              rx="2"
              className="demo-box"
            />
          )),
        )}
        <text x="40" y="125" className="demo-label">
          {reduced ? 'grain map' : `d↓ → σ_y↑`}
        </text>
      </svg>
      {mode === 'qual' && (
        <div className="obj-demo__controls">
          <Scrub label="Relative d" value={d} min={15} max={80} step={1} onChange={setD} display={`${d}`} />
        </div>
      )}
    </Shell>
  )
}

function ArrheniusViz({ reduced }: { reduced: boolean }) {
  const [T, setT] = useState(900)
  // schematic rate ~ exp(-Q/RT); show steepness
  const rate = Math.exp(-8000 / T)

  return (
    <Shell
      label="Arrhenius sensitivity"
      caption={`Rate ∝ e^{−Q/RT}. At higher T, a small ΔT multiplies the rate sharply (here relative ≈ ${rate.toExponential(2)}).`}
    >
      <svg viewBox="0 0 280 140" className="obj-demo__svg">
        <GraphFrame ox={40} oy={110} labelX="T" labelY="rate" />
        <path d="M50 105 C90 100 140 90 180 60 C210 35 230 25 250 22" className="demo-curve" fill="none" />
        <circle cx={50 + ((T - 700) / 500) * 180} cy={110 - rate * 2000} r="5" className="demo-dot" />
        <text x="160" y="50" className="demo-label">
          {reduced ? 'rate vs T' : 'steep rise'}
        </text>
      </svg>
      <div className="obj-demo__controls">
        <Scrub label="T (K)" value={T} min={700} max={1200} step={10} onChange={setT} display={`${T} K`} />
      </div>
    </Shell>
  )
}

/* ── Registry ─────────────────────────────────────────────── */

export const EXAMPLE_VISUAL_BY_ID: Record<string, ExampleVisualSpec> = {
  'we-lim-eval': { kind: 'poly-limit', params: { a: 3 } },
  'we-factor-cancel': { kind: 'removable-hole', params: { a: 2 } },
  'we-sin3x': { kind: 'scaled-sinc', params: { k: 3 } },
  'we-onesided': { kind: 'signum-jump' },
  'we-deriv-x2': { kind: 'secant-at', params: { a: 3 } },
  'we-deriv-linear': { kind: 'line-slope', params: { m: 4, b: -1 } },
  'we-product': { kind: 'product-uv', params: { caption: 'y = x²(3x+1) → y′ = 2x(3x+1) + 3x² = 9x²+2x' } },
  'we-power-neg': { kind: 'power-recip' },
  'we-ftc': { kind: 'area-integral', params: { a: 0, b: 2, fn: '3x2' } },
  'we-ftc-linear': { kind: 'area-integral', params: { a: 1, b: 4, fn: '2x-1' } },
  'we-brake': { kind: 'kinematics', params: { mode: 'brake', v0: 20, a: -4, tMax: 5 } },
  'we-from-rest': { kind: 'kinematics', params: { mode: 'boost', v0: 0, a: 2, tMax: 5 } },
  'we-freefall': { kind: 'kinematics', params: { mode: 'freefall', v0: 0, a: 10, tMax: 2 } },
  'we-n2': { kind: 'fbd-push', params: { m: 5, F: 15 } },
  'we-n2-weight': { kind: 'fbd-elevator', params: { m: 10, a: 2, g: 10 } },
  'we-n2-down': { kind: 'fbd-elevator', params: { m: 10, a: -2, g: 10 } },
  'we-res': { kind: 'vector-sum', params: { mode: 'two' } },
  'we-res-3': { kind: 'vector-sum', params: { mode: 'three' } },
  'we-res-angle': { kind: 'vector-sum', params: { mode: 'resolve', F: 50, deg: 30 } },
  'we-particle': { kind: 'particle-cables', params: { W: 100, th1: 30, th2: 60 } },
  'we-particle-sym': { kind: 'particle-cables', params: { W: 200, th1: 45, th2: 45 } },
  'we-div': { kind: 'divider', params: { Vin: 10, R1: 2, R2: 2 } },
  'we-div-unequal': { kind: 'divider', params: { Vin: 12, R1: 1, R2: 3 } },
  'we-div-load': { kind: 'divider', params: { Vin: 10, R1: 2, R2: 2, loaded: true, RL: 2 } },
  'we-kvl': { kind: 'series-kvl', params: { V: 12, R1: 3, R2: 1 } },
  'we-kcl': { kind: 'kcl-node', params: { i1: 2, i2: 3 } },
  'we-ig': { kind: 'pvt-state', params: { mode: 'pressure', n: 1, V: 0.0821, T: 300, R: 8.314 } },
  'we-ig-isothermal': { kind: 'pvt-state', params: { mode: 'isotherm', P1: 100, V1: 2, V2: 1 } },
  'we-ig-temp': { kind: 'pvt-state', params: { mode: 'isochor', P1: 200, T1: 300, T2: 600 } },
  'we-carnot': { kind: 'energy-balance', params: { mode: 'carnot', TH: 600, TC: 300 } },
  'we-firstlaw': { kind: 'energy-balance', params: { mode: 'firstlaw', Q: 20, W: 5 } },
  'we-cycle': { kind: 'energy-balance', params: { mode: 'cycle', QH: 100, QC: 60 } },
  'we-hooke': { kind: 'hooke-rod', params: { E: 200, L0: 1, sigma: 100 } },
  'we-poisson': { kind: 'poisson-lateral', params: { eps: 0.001, nu: 0.3 } },
  'we-stress': { kind: 'stress-bar', params: { A: 100, F: 20 } },
  'we-hp': { kind: 'hall-petch', params: { mode: 'qual' } },
  'we-hp-num': { kind: 'hall-petch', params: { mode: 'num', sigma0: 100, k: 0.5 } },
  'we-arrhenius': { kind: 'arrhenius' },
}

function renderKind(kind: ExampleVisualKind, params: P | undefined, reduced: boolean): ReactNode {
  switch (kind) {
    case 'poly-limit':
      return <PolyLimit params={params} reduced={reduced} />
    case 'removable-hole':
      return <RemovableHole params={params} reduced={reduced} />
    case 'scaled-sinc':
      return <ScaledSinc params={params} reduced={reduced} />
    case 'signum-jump':
      return <SignumJump reduced={reduced} />
    case 'secant-at':
      return <SecantAtPoint params={params} reduced={reduced} />
    case 'line-slope':
      return <LineSlope params={params} />
    case 'product-uv':
      return <ProductUv params={params} />
    case 'power-recip':
      return <PowerRecip params={params} reduced={reduced} />
    case 'area-integral':
      return <AreaIntegral params={params} reduced={reduced} />
    case 'kinematics':
      return <KinematicsMotion params={params} reduced={reduced} />
    case 'fbd-push':
      return <FbdPush params={params} />
    case 'fbd-elevator':
      return <FbdElevator params={params} />
    case 'vector-sum':
      return <VectorSum params={params} reduced={reduced} />
    case 'particle-cables':
      return <ParticleCables params={params} />
    case 'divider':
      return <DividerViz params={params} />
    case 'series-kvl':
      return <SeriesKvl params={params} />
    case 'kcl-node':
      return <KclNode params={params} />
    case 'pvt-state':
      return <PvtState params={params} />
    case 'energy-balance':
      return <EnergyBalance params={params} />
    case 'hooke-rod':
      return <HookeRod params={params} />
    case 'poisson-lateral':
      return <PoissonLateral params={params} />
    case 'stress-bar':
      return <StressBar params={params} />
    case 'hall-petch':
      return <HallPetchViz params={params} reduced={reduced} />
    case 'arrhenius':
      return <ArrheniusViz reduced={reduced} />
    default:
      return null
  }
}

export function ExampleVisual({
  exampleId,
  visual,
}: {
  exampleId: string
  visual?: ExampleVisualSpec
}) {
  const reduced = usePrefersReducedMotion()
  const spec = visual ?? EXAMPLE_VISUAL_BY_ID[exampleId]
  if (!spec) return null
  return (
    <div className="worked-example__visual">{renderKind(spec.kind, spec.params, reduced)}</div>
  )
}

export function hasExampleVisual(exampleId: string, visual?: ExampleVisualSpec): boolean {
  return Boolean(visual ?? EXAMPLE_VISUAL_BY_ID[exampleId])
}
