import type { ExamplePractice } from '../types'

/** Independent "Your turn" problems keyed by worked-example id. */
export const examplePractice: Record<string, ExamplePractice> = {
  'we-lim-eval': {
    problem: 'Evaluate limₓ→1 (3x² − 2x + 4).',
    hints: [
      'Polynomials are continuous — the limit equals the value at the point.',
      'Substitute x = 1 into 3x² − 2x + 4.',
    ],
    answer: '5',
  },
  'we-factor-cancel': {
    problem: 'Evaluate limₓ→3 (x² − 9)/(x − 3).',
    hints: [
      'Substitution gives 0/0 — factor the numerator.',
      'x² − 9 = (x − 3)(x + 3); cancel for x ≠ 3.',
    ],
    answer: '6',
  },
  'we-sin3x': {
    problem: 'Evaluate limₓ→₀ sin(5x)/x.',
    hints: [
      'Rewrite to match sin(u)/u with a constant factor out front.',
      'sin(5x)/x = 5 · sin(5x)/(5x) → 5 · 1 = 5.',
    ],
    answer: '5',
  },
  'we-onesided': {
    problem: 'Does limₓ→0 x/|x| exist?',
    hints: [
      'Check left and right separately.',
      'Right → 1, left → −1 — two-sided DNE.',
    ],
    answer: 'Does not exist (two-sided)',
  },
  'we-deriv-x2': {
    problem: 'Using the definition, find f′(1) for f(x) = x².',
    hints: [
      'f′(a) = limₕ→₀ [f(a+h) − f(a)]/h.',
      'Expand (1+h)² − 1 and cancel h.',
    ],
    answer: '2',
  },
  'we-deriv-linear': {
    problem: 'f(x) = 4x − 1. What is f′(x) from the definition?',
    hints: ['[f(x+h)−f(x)]/h = 4 for all h ≠ 0.', 'The limit is the constant 4.'],
    answer: '4',
  },
  'we-product': {
    problem: 'Differentiate f(x) = (x² + 1)(x − 3).',
    hints: [
      'Product rule: (uv)′ = u′v + uv′.',
      'u′ = 2x, v′ = 1 → 2x(x−3) + (x²+1).',
    ],
    answer: '3x² − 6x + 1',
  },
  'we-power-neg': {
    problem: 'Differentiate f(x) = 1/x² = x⁻².',
    hints: ['Power rule: n xⁿ⁻¹ with n = −2.', '−2 x⁻³ = −2/x³.'],
    answer: '−2/x³',
  },
  'we-ftc': {
    problem: 'Evaluate ∫₁³ (2x) dx.',
    hints: ['Antiderivative of 2x is x².', 'F(3) − F(1) = 9 − 1 = 8.'],
    answer: '8',
  },
  'we-ftc-linear': {
    problem: 'Evaluate ∫₀² (3) dx.',
    hints: ['Antiderivative is 3x.', '3·2 − 3·0 = 6.'],
    answer: '6',
  },
  'we-brake': {
    problem: 'Car at 20 m/s brakes at a = −4 m/s². Stopping distance?',
    hints: [
      'Use v² = v₀² + 2aΔx with v = 0.',
      '0 = 400 + 2(−4)Δx → Δx = 50 m.',
    ],
    answer: '50 m',
  },
  'we-from-rest': {
    problem: 'From rest, a = 3 m/s² for 4 s. Distance traveled?',
    hints: ['x = ½ a t² when v₀ = 0.', '½ · 3 · 16 = 24 m.'],
    answer: '24 m',
  },
  'we-freefall': {
    problem: 'Drop from rest; after 2 s how fast? (take g = 9.8 m/s² down positive)',
    hints: ['v = v₀ + a t = 0 + 9.8·2.', '19.6 m/s downward.'],
    answer: '19.6 m/s down',
  },
  'we-n2': {
    problem: 'A 5 kg block on a frictionless floor is pushed with 20 N. Acceleration?',
    hints: ['ΣF = ma → a = F/m.', '20/5 = 4 m/s².'],
    answer: '4 m/s²',
  },
  'we-n2-weight': {
    problem: 'What is the weight of a 2 kg mass? (g = 9.8 m/s²)',
    hints: ['Weight W = mg.', '2 · 9.8 = 19.6 N.'],
    answer: '19.6 N',
  },
  'we-n2-down': {
    problem: 'Elevator cable tension: m = 800 kg, a = 1 m/s² up. Find T. (g = 9.8)',
    hints: ['Up positive: T − mg = ma.', 'T = m(g+a) = 800·10.8 = 8640 N.'],
    answer: '8640 N',
  },
  'we-res': {
    problem: 'F₁ = 30 N at 0°, F₂ = 40 N at 90°. |R|?',
    hints: ['Rx = 30, Ry = 40.', '|R| = √(30²+40²) = 50 N.'],
    answer: '50 N',
  },
  'we-res-3': {
    problem: 'Add F = 10 N at 180° to a resultant that was 50 N at atan(4/3). New Rx?',
    hints: ['Original Rx was 30; 180° adds −10.', 'New Rx = 20 N.'],
    answer: '20 N (among other components)',
  },
  'we-res-angle': {
    problem: 'Rx = 3 N, Ry = 3 N. θ from +x?',
    hints: ['θ = atan(Ry/Rx) in Q1.', '45°.'],
    answer: '45°',
  },
  'we-particle': {
    problem: 'Mass 10 kg hangs from two symmetric cables at 30° from vertical each. Tension in one cable?',
    hints: [
      '2 T cos 30° = mg.',
      'T = mg / (2 cos 30°) ≈ 56.6 N.',
    ],
    answer: '≈ 56.6 N',
  },
  'we-particle-sym': {
    problem: 'Why do symmetric equal-angle cables carry equal tension?',
    hints: ['Horizontal equilibrium forces T₁ sin θ = T₂ sin θ.', 'Equal angles ⇒ equal T.'],
    answer: 'Horizontal ΣF = 0 forces T₁ = T₂',
  },
  'we-div': {
    problem: 'Vin = 10 V, R1 = R2 = 2 kΩ. Vout across R2?',
    hints: ['Equal resistors → half.', 'Vout = 5 V.'],
    answer: '5 V',
  },
  'we-div-unequal': {
    problem: 'Vin = 12 V, R1 = 1 kΩ, R2 = 3 kΩ. Vout across R2?',
    hints: ['Vout = Vin · R2/(R1+R2).', '12 · 3/4 = 9 V.'],
    answer: '9 V',
  },
  'we-div-load': {
    problem: 'Unloaded divider predicts 6 V. A small RL across R2 will make Vout…',
    hints: ['Loading parallels R2 and shrinks the bottom fraction.', 'Vout drops below 6 V.'],
    answer: 'Lower than 6 V',
  },
  'we-kvl': {
    problem: '12 V source, series R1 = 2 Ω, R2 = 4 Ω. Current I?',
    hints: ['KVL: 12 = I(2+4).', 'I = 2 A.'],
    answer: '2 A',
  },
  'we-kcl': {
    problem: 'Node with I1 = 3 A in, I2 = 1 A out. What must I3 (out) be?',
    hints: ['KCL: Σ in = Σ out.', '3 = 1 + I3 → I3 = 2 A.'],
    answer: '2 A out',
  },
  'we-ig': {
    problem: 'n = 1 mol, V = 0.024 m³, T = 300 K. Find P. (R = 8.314)',
    hints: ['P = nRT/V.', 'P ≈ 1.039×10⁵ Pa.'],
    answer: '≈ 1.04×10⁵ Pa',
  },
  'we-ig-isothermal': {
    problem: 'Isothermal: P1 V1 = P2 V2. V doubles, P…',
    hints: ['T fixed ⇒ P ∝ 1/V.', 'P halves.'],
    answer: 'Halves',
  },
  'we-ig-temp': {
    problem: 'Can you use T = 25°C directly in PV = nRT?',
    hints: ['Need absolute temperature.', 'Convert to 298 K.'],
    answer: 'No — convert to kelvin first',
  },
  'we-carnot': {
    problem: 'Carnot engine TH = 600 K, TC = 300 K. η_max?',
    hints: ['η = 1 − TC/TH.', '1 − 0.5 = 0.5 = 50%.'],
    answer: '50%',
  },
  'we-firstlaw': {
    problem: 'Q = 100 J into system, W = 40 J by system. ΔU?',
    hints: ['ΔU = Q − W (W by system).', '100 − 40 = 60 J.'],
    answer: '60 J',
  },
  'we-cycle': {
    problem: 'For a cycle, net ΔU is…',
    hints: ['State function returns to start.', 'ΔU_net = 0.'],
    answer: '0',
  },
  'we-hooke': {
    problem: 'Steel rod, E = 200 GPa, ε = 0.001. Stress σ?',
    hints: ['σ = E ε.', '200 MPa.'],
    answer: '200 MPa',
  },
  'we-poisson': {
    problem: 'ν = 0.3, axial strain +0.002. Lateral strain magnitude?',
    hints: ['ε_lat = −ν ε_axial.', '0.0006 (contraction).'],
    answer: '0.0006 (sign opposite axial)',
  },
  'we-stress': {
    problem: 'Force 5000 N on area 25 mm². Stress in MPa?',
    hints: ['σ = F/A; convert mm² → m² carefully.', '200 MPa.'],
    answer: '200 MPa',
  },
  'we-hp': {
    problem: 'Hall–Petch: smaller grain size generally… yield strength.',
    hints: ['σ_y = σ₀ + k / √d.', 'Increases yield strength.'],
    answer: 'Increases',
  },
  'we-hp-num': {
    problem: 'If d decreases by 4×, the k/√d term…',
    hints: ['√d shrinks by 2×.', 'k/√d doubles.'],
    answer: 'Doubles',
  },
  'we-arrhenius': {
    problem: 'Raising T increases a thermally activated rate because…',
    hints: ['Rate ∝ e^(−Q/RT).', 'Larger T shrinks the exponent’s magnitude.'],
    answer: 'e^(−Q/RT) grows toward 1',
  },
}

export function practiceFor(exampleId: string): ExamplePractice | undefined {
  return examplePractice[exampleId]
}
