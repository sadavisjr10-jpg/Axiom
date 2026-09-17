import { useState } from 'react'
import { StaticsLab } from '../labs/StaticsLab'
import { MechanicsLab } from '../labs/MechanicsLab'
import { CircuitsLab } from '../labs/CircuitsLab'
import { ThermoLab } from '../labs/ThermoLab'

const labs = [
  { id: 'statics', label: 'Statics · 2D resultant', el: <StaticsLab /> },
  { id: 'mechanics', label: 'Mechanics · Const. accel', el: <MechanicsLab /> },
  { id: 'circuits', label: 'Circuits · Voltage divider', el: <CircuitsLab /> },
  { id: 'thermo', label: 'Thermo · Ideal gas', el: <ThermoLab /> },
] as const

export function Labs() {
  const [active, setActive] = useState<(typeof labs)[number]['id']>('statics')
  const current = labs.find((l) => l.id === active)!

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Labs</p>
        <h1>Interactive labs</h1>
        <p className="lede">
          Live calculators with visual feedback — explore resultants, kinematics, dividers,
          and the ideal-gas law.
        </p>
      </header>

      <div className="tabs" role="tablist">
        {labs.map((l) => (
          <button
            key={l.id}
            type="button"
            role="tab"
            className={active === l.id ? 'tab is-active' : 'tab'}
            aria-selected={active === l.id}
            onClick={() => setActive(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="lab-stage">{current.el}</div>
    </div>
  )
}
