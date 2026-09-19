import { useMemo, useState } from 'react'
import { round, voltageDivider } from '../lib/labMath'
import { PredictCommitReveal } from '../components/PredictCommitReveal'
import { GroundSymbol, ResistorPath, SharedMarkers } from '../components/demos/diagramPrimitives'

export function CircuitsLab() {
  const [vin, setVin] = useState(12)
  const [r1, setR1] = useState(1000)
  const [r2, setR2] = useState(1000)

  const vout = useMemo(() => voltageDivider(vin, r1, r2), [vin, r1, r2])
  const i = r1 + r2 === 0 ? NaN : vin / (r1 + r2)
  const frac = r1 + r2 === 0 ? 0 : r2 / (r1 + r2)


  const mid = 130
  const r1End = mid - 8
  const r2Start = mid + 8
  const gnd = 230

  const results = (
    <>
      <dl className="lab__results">
        <div>
          <dt>V_out</dt>
          <dd>{round(vout, 3)} V</dd>
        </div>
        <div>
          <dt>I</dt>
          <dd>{round(i * 1000, 3)} mA</dd>
        </div>
      </dl>
      <svg className="lab__canvas" viewBox="0 0 280 270" role="img" aria-label="Voltage divider schematic">
        {/* Vin source */}
        <rect x="108" y="22" width="64" height="26" rx="4" className="fig-body" fill="none" />
        <text x="140" y="40" textAnchor="middle" className="fig-label fig-label--ink">
          V_in {vin} V
        </text>
        <line x1="140" y1="48" x2="140" y2="62" className="fig-wire" />
        {/* R1 zigzag */}
        <ResistorPath x={140} y={62} vertical segments={6} amp={8} pitch={Math.max(6, (r1End - 62) / 6)} />
        <text x="162" y={(62 + r1End) / 2 + 4} className="fig-label">
          R₁ {r1} Ω
        </text>
        {/* Tap node */}
        <circle cx="140" cy={mid} r="4.5" className="fig-point fig-point--good" />
        <line
          x1="140"
          y1={mid}
          x2="220"
          y2={mid}
          className="fig-wire fig-wire--accent"
          markerEnd={`url(#${SharedMarkers.arrowGood})`}
        />
        <text x="226" y={mid + 4} className="fig-label fig-label--ink">
          V_out
        </text>
        {/* R2 — height encodes share */}
        <ResistorPath x={140} y={r2Start} vertical segments={6} amp={8} pitch={Math.max(6, (gnd - 16 - r2Start) / 6)} />
        <text x="162" y={(r2Start + gnd - 16) / 2 + 4} className="fig-label">
          R₂ {r2} Ω
        </text>
        <line x1="140" y1={gnd - 16} x2="140" y2={gnd} className="fig-wire" />
        <GroundSymbol x={140} y={gnd} />
        <text x="140" y={gnd + 30} textAnchor="middle" className="fig-label">
          GND
        </text>
        <text x="24" y={mid - 20} className="fig-eq" style={{ fontSize: 11 }}>
          {`V_out / V_in = ${(frac * 100).toFixed(1)}%`}
        </text>
      </svg>
    </>
  )

  return (
    <div className="lab">
      <div className="lab__controls">
        <h2>Voltage divider</h2>
        <p className="muted">V_out = V_in · R₂ / (R₁ + R₂) — predict before reveal</p>
        <label>
          V_in (V)
          <input type="range" min={0} max={24} step={0.1} value={vin} onChange={(e) => setVin(+e.target.value)} />
          <input type="number" step={0.1} value={vin} onChange={(e) => setVin(+e.target.value)} />
        </label>
        <label>
          R₁ (Ω)
          <input type="range" min={10} max={10000} step={10} value={r1} onChange={(e) => setR1(+e.target.value)} />
          <input type="number" value={r1} onChange={(e) => setR1(+e.target.value)} />
        </label>
        <label>
          R₂ (Ω)
          <input type="range" min={10} max={10000} step={10} value={r2} onChange={(e) => setR2(+e.target.value)} />
          <input type="number" value={r2} onChange={(e) => setR2(+e.target.value)} />
        </label>
      </div>
      <div className="lab__reveal-col">
        <PredictCommitReveal
          key={`${vin}-${r1}-${r2}`}
          mode="estimate"
          estimateLabel="Predict Vout (V)"
          actualDisplay={`${round(vout, 3)} V`}
          spec={{
            prompt: 'Commit Vout across R₂ before the schematic updates.',
            choices: [],
            revealNote: 'Check numerator: Vout uses R₂/(R₁+R₂).',
          }}
        >
          {results}
        </PredictCommitReveal>
      </div>
    </div>
  )
}
