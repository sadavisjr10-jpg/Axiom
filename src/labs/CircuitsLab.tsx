import { useMemo, useState } from 'react'
import { round, voltageDivider } from '../lib/labMath'
import { PredictCommitReveal } from '../components/PredictCommitReveal'

export function CircuitsLab() {
  const [vin, setVin] = useState(12)
  const [r1, setR1] = useState(1000)
  const [r2, setR2] = useState(1000)

  const vout = useMemo(() => voltageDivider(vin, r1, r2), [vin, r1, r2])
  const i = r1 + r2 === 0 ? NaN : vin / (r1 + r2)
  const frac = r1 + r2 === 0 ? 0 : r2 / (r1 + r2)

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
      <svg className="lab__canvas" viewBox="0 0 280 260" role="img" aria-label="Voltage divider schematic">
        <rect x="110" y="30" width="60" height="28" rx="4" fill="none" stroke="#a78bfa" strokeWidth="2" />
        <text x="140" y="48" textAnchor="middle" fill="#e2e8f0" fontSize="11">
          Vin {vin}V
        </text>
        <line x1="140" y1="58" x2="140" y2="80" stroke="#94a3b8" />
        <rect x="120" y="80" width="40" height="50" rx="3" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" />
        <text x="140" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="11">
          R1
        </text>
        <line x1="140" y1="130" x2="140" y2="150" stroke="#94a3b8" />
        <circle cx="140" cy="150" r="4" fill="#6ee7b7" />
        <text x="160" y="154" fill="#6ee7b7" fontSize="11">
          Vout
        </text>
        <rect x="120" y="160" width="40" height={30 + frac * 40} rx="3" fill="rgba(110,231,183,0.2)" stroke="#6ee7b7" />
        <text x="140" y="185" textAnchor="middle" fill="#6ee7b7" fontSize="11">
          R2
        </text>
        <line x1="140" y1={190 + frac * 40} x2="140" y2="240" stroke="#94a3b8" />
        <line x1="120" y1="240" x2="160" y2="240" stroke="#94a3b8" strokeWidth="2" />
        <text x="140" y="255" textAnchor="middle" fill="#94a3b8" fontSize="10">
          GND
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
