import type { Formula } from '../types'

export const formulas: Formula[] = [
  // Calculus — MATH 141
  {
    id: 'f-lim-def',
    name: 'Limit definition',
    expression: 'limₓ→ₐ f(x) = L',
    courseId: 'calculus',
    description: 'Outputs settle on L as the input approaches a.',
    plainLanguage:
      'Not “plug in a.” It means: get as close as you like to a, and the y-values crowd around L — even if the function has a hole at a.',
    tags: ['limits'],
  },
  {
    id: 'f-deriv-def',
    name: 'Derivative definition',
    expression: "f'(a) = limₕ→₀ [f(a+h) − f(a)] / h",
    courseId: 'calculus',
    description: 'Instantaneous rate: shrink the averaging window to zero.',
    plainLanguage:
      'Average rate on a short stretch, then make the stretch vanishingly small. When that settles, you have the speedometer reading at one instant.',
    tags: ['derivatives'],
  },
  {
    id: 'f-power-rule',
    name: 'Power rule',
    expression: 'd/dx [xⁿ] = n xⁿ⁻¹',
    courseId: 'calculus',
    description: 'Bring the power down; drop the exponent by one.',
    plainLanguage:
      'A compressed theorem, not magic: once you trust the limit definition for powers, this is the pattern you reuse every day.',
    tags: ['derivatives'],
  },
  {
    id: 'f-product',
    name: 'Product rule',
    expression: '(uv)′ = u′v + uv′',
    courseId: 'calculus',
    description: 'Each factor can contribute when both change.',
    plainLanguage:
      'Not “multiply the two derivatives.” First factor’s rate times second, plus first times second’s rate — both doors matter.',
    tags: ['derivatives'],
  },
  {
    id: 'f-quotient',
    name: 'Quotient rule',
    expression: '(u/v)′ = (u′v − uv′) / v²',
    courseId: 'calculus',
    description: 'Derivative of a quotient (low d-high − high d-low) / low².',
    plainLanguage:
      'Same spirit as the product rule with a denominator: keep the order of terms straight so the sign does not flip by accident.',
    tags: ['derivatives'],
  },
  {
    id: 'f-chain',
    name: 'Chain rule',
    expression: '(f∘g)′ = (f′∘g) · g′',
    courseId: 'calculus',
    description: 'Outer rate times inner rate for composed functions.',
    plainLanguage:
      'A machine inside a machine: how fast the outer dial moves, times how fast the inner crank turns.',
    tags: ['derivatives'],
  },
  {
    id: 'f-ftc',
    name: 'Fundamental theorem',
    expression: '∫ₐᵇ f′(x) dx = f(b) − f(a)',
    courseId: 'calculus',
    description: 'Net change equals the definite integral of the rate.',
    plainLanguage:
      'Add up every little change from a to b and you recover ending value minus starting value — like a bank statement.',
    tags: ['integrals'],
  },
  {
    id: 'f-sin-lim',
    name: 'Standard trig limit',
    expression: 'limₓ→₀ sin(x)/x = 1',
    courseId: 'calculus',
    description: 'Radians: sin(x) looks like x near zero.',
    plainLanguage:
      'For small angles in radians, the sine curve hugs the line y = x. Scale the argument carefully when the denominator is not the same expression.',
    tags: ['limits', 'trig'],
  },

  // Mechanics — PHYS 211
  {
    id: 'f-kin-v',
    name: 'Velocity (const a)',
    expression: 'v = v₀ + a t',
    courseId: 'mechanics',
    description: 'Speed changes linearly when acceleration is steady.',
    plainLanguage:
      'Start at v₀; each second adds another a (with sign). Only valid while a stays constant on that line of motion.',
    tags: ['kinematics'],
  },
  {
    id: 'f-kin-x',
    name: 'Position (const a)',
    expression: 'x = x₀ + v₀ t + ½ a t²',
    courseId: 'mechanics',
    description: 'Displacement under constant acceleration.',
    plainLanguage:
      'Coast with initial speed, then add the extra distance from steady acceleration — the familiar ½ a t² term.',
    tags: ['kinematics'],
  },
  {
    id: 'f-kin-v2',
    name: 'Timeless kinematics',
    expression: 'v² = v₀² + 2 a Δx',
    courseId: 'mechanics',
    description: 'Relate speeds to distance without naming time.',
    plainLanguage:
      'Reach for this when the problem never mentions a clock — braking distance and crash reconstruction live here.',
    tags: ['kinematics'],
  },
  {
    id: 'f-newton2',
    name: "Newton's 2nd law",
    expression: 'ΣF = m a',
    courseId: 'mechanics',
    description: 'Net force (the vector sum) equals mass times acceleration.',
    plainLanguage:
      'Not “the” force — every push and pull on the free-body diagram, added as vectors. Mass is stubbornness, not a force.',
    tags: ['dynamics'],
  },
  {
    id: 'f-weight',
    name: 'Weight',
    expression: 'W = m g',
    courseId: 'mechanics',
    description: 'Gravitational force near Earth (newtons), not mass (kg).',
    plainLanguage:
      'Mass is how much stuff; weight is how hard gravity pulls that stuff once you pick g and a positive direction.',
    tags: ['dynamics'],
  },
  {
    id: 'f-friction',
    name: 'Kinetic friction',
    expression: 'fₖ = μₖ N',
    courseId: 'mechanics',
    description: 'Sliding friction proportional to normal force.',
    plainLanguage:
      'Rougher surface or harder press (larger N) → more drag while sliding. Direction always opposes the slip.',
    tags: ['dynamics'],
  },
  {
    id: 'f-work',
    name: 'Work (const force)',
    expression: 'W = F · d = F d cos θ',
    courseId: 'mechanics',
    description: 'Energy transferred by a force along a displacement.',
    plainLanguage:
      'Only the part of the force along the motion counts — perpendicular pushes do no work on that path.',
    tags: ['energy'],
  },
  {
    id: 'f-ke',
    name: 'Kinetic energy',
    expression: 'K = ½ m v²',
    courseId: 'mechanics',
    description: 'Energy of motion; sensitive to speed squared.',
    plainLanguage:
      'Twice the speed is four times the kinetic energy — why braking distances grow so fast.',
    tags: ['energy'],
  },
  {
    id: 'f-pe',
    name: 'Gravitational PE',
    expression: 'U = m g h',
    courseId: 'mechanics',
    description: 'Stored energy due to height near Earth.',
    plainLanguage:
      'Raise something and you bank energy you can spend later falling — h is relative to a reference you choose.',
    tags: ['energy'],
  },
  {
    id: 'f-momentum',
    name: 'Linear momentum',
    expression: 'p = m v',
    courseId: 'mechanics',
    description: '“Quantity of motion” — mass times velocity.',
    plainLanguage:
      'Harder to stop a heavy fast object than a light slow one. Collisions often speak momentum better than force.',
    tags: ['momentum'],
  },

  // Statics — ENGR 201
  {
    id: 'f-eq-force',
    name: 'Force equilibrium',
    expression: 'ΣFₓ = 0,  ΣFᵧ = 0',
    courseId: 'statics',
    description: 'No net push in x or y — particle (or planar force) balance.',
    plainLanguage:
      'If it is not accelerating, every push cancels. Two planar equations for two unknown magnitudes when directions are known.',
    tags: ['equilibrium'],
  },
  {
    id: 'f-eq-moment',
    name: 'Moment equilibrium',
    expression: 'ΣM = 0',
    courseId: 'statics',
    description: 'No net tendency to rotate about the chosen point/axis.',
    plainLanguage:
      'Rigid bodies need this third equation. Pick a smart moment point to kill unknown forces that pass through it.',
    tags: ['equilibrium'],
  },
  {
    id: 'f-moment',
    name: 'Moment of a force',
    expression: 'M = r × F = r F sin θ',
    courseId: 'statics',
    description: 'Torque: force times moment arm about a point.',
    plainLanguage:
      'A push far from the pivot turns harder than the same push near the hinge — sin θ is the “effective lever” factor.',
    tags: ['moments'],
  },
  {
    id: 'f-resultant',
    name: '2D resultant',
    expression: 'Rₓ = Σ F cos θ,  Rᵧ = Σ F sin θ',
    courseId: 'statics',
    description: 'Add force components, then rebuild one vector.',
    plainLanguage:
      'Break every angled force into east–west and north–south, add the numbers, then one arrow replaces the crowd.',
    tags: ['resultants'],
  },
  {
    id: 'f-mag-angle',
    name: 'Magnitude & direction',
    expression: '|R| = √(Rₓ² + Rᵧ²),  θ = atan2(Rᵧ, Rₓ)',
    courseId: 'statics',
    description: 'Polar form of the resultant for reporting and sizing.',
    plainLanguage:
      'Fabricators need length and direction, not just “there is a resultant.” atan2 keeps the quadrant honest.',
    tags: ['resultants'],
  },
  {
    id: 'f-distributed',
    name: 'Distributed load (rect.)',
    expression: 'F = w · L  (at center)',
    courseId: 'statics',
    description: 'Uniform load intensity × length → equivalent point load.',
    plainLanguage:
      'A snow load or uniform shelf weight can be replaced by one force through the rectangle’s center for equilibrium.',
    tags: ['loads'],
  },
  {
    id: 'f-centroid-tri',
    name: 'Triangle centroid',
    expression: 'ȳ = h/3 from base',
    courseId: 'statics',
    description: 'Where the area “balances” for a triangular shape.',
    plainLanguage:
      'For triangular distributed loads, the equivalent point load sits at the centroid — one-third up from the base.',
    tags: ['centroids'],
  },
  {
    id: 'f-friction-static',
    name: 'Static friction max',
    expression: 'fₛ ≤ μₛ N',
    courseId: 'statics',
    description: 'No-slip budget before impending motion.',
    plainLanguage:
      'Static friction rises as needed up to a cap. Equality is the slip-threshold case — do not assume max too early.',
    tags: ['friction'],
  },

  // Circuits — ECE 201
  {
    id: 'f-ohm',
    name: "Ohm's law",
    expression: 'V = I R',
    courseId: 'circuits',
    description: 'Voltage across a resistor equals current times resistance.',
    plainLanguage:
      'Harder resistor (larger R) needs more voltage to push the same current — or drops more voltage at a given current.',
    tags: ['resistive'],
  },
  {
    id: 'f-kcl',
    name: 'KCL',
    expression: 'Σ I_in = Σ I_out',
    courseId: 'circuits',
    description: 'Charge conservation at a node — currents balance.',
    plainLanguage:
      'Plumbing at a junction: what flows in must flow out. Ideal wires do not store charge.',
    tags: ['laws'],
  },
  {
    id: 'f-kvl',
    name: 'KVL',
    expression: 'Σ V_loop = 0',
    courseId: 'circuits',
    description: 'Signed voltage rises and drops around a loop sum to zero.',
    plainLanguage:
      'Hike a closed trail: net altitude change is zero. Pick one sign rule and keep it for the whole loop.',
    tags: ['laws'],
  },
  {
    id: 'f-series-r',
    name: 'Series resistors',
    expression: 'R_eq = R₁ + R₂ + …',
    courseId: 'circuits',
    description: 'One path: resistances add.',
    plainLanguage:
      'Same current through each; total drop is the sum of drops — so the ohms add.',
    tags: ['resistive'],
  },
  {
    id: 'f-parallel-r',
    name: 'Parallel resistors',
    expression: '1/R_eq = 1/R₁ + 1/R₂ + …',
    courseId: 'circuits',
    description: 'Shared voltage: conductances add.',
    plainLanguage:
      'More parallel paths make it easier for current overall — equivalent resistance falls below the smallest branch.',
    tags: ['resistive'],
  },
  {
    id: 'f-divider',
    name: 'Voltage divider',
    expression: 'V_out = V_in · R₂ / (R₁ + R₂)',
    courseId: 'circuits',
    description: 'Unloaded tap across R₂ in a series pair.',
    plainLanguage:
      'Taller resistor step takes a larger share of Vin. Ratio sets the fraction; absolute ohms set current and stiffness.',
    tags: ['resistive'],
  },
  {
    id: 'f-power',
    name: 'Electrical power',
    expression: 'P = V I = I² R = V² / R',
    courseId: 'circuits',
    description: 'Instantaneous power delivered to a resistor.',
    plainLanguage:
      'Three faces of the same heating rate — pick the form that matches the quantities you already know.',
    tags: ['power'],
  },
  {
    id: 'f-cap-i',
    name: 'Capacitor current',
    expression: 'i = C dv/dt',
    courseId: 'circuits',
    description: 'Current only while voltage is changing.',
    plainLanguage:
      'A capacitor is quiet at DC; it conducts when the voltage across it is in motion.',
    tags: ['transient'],
  },

  // Thermodynamics — ME 231
  {
    id: 'f-ideal-gas',
    name: 'Ideal gas law',
    expression: 'P V = n R T',
    courseId: 'thermo',
    description: 'Equation of state for the ideal-gas model (T absolute).',
    plainLanguage:
      'Four bookkeeping knobs for a dilute gas fiction that often works. Kelvin only — Celsius will wreck the arithmetic.',
    tags: ['properties'],
  },
  {
    id: 'f-1st-law',
    name: 'First law (closed)',
    expression: 'ΔU = Q − W',
    courseId: 'thermo',
    description: 'Energy balance; here W out is positive.',
    plainLanguage:
      'Bank account: heat in deposits, work out withdraws, U is the balance. Other books flip the work sign — check locally.',
    tags: ['laws'],
  },
  {
    id: 'f-enthalpy',
    name: 'Enthalpy',
    expression: 'H = U + P V',
    courseId: 'thermo',
    description: 'Convenient energy property for flow / open systems.',
    plainLanguage:
      'Bundles internal energy with the push-work of the fluid’s own volume — handy for nozzles and turbines.',
    tags: ['properties'],
  },
  {
    id: 'f-cp-cv',
    name: 'Specific heats (ideal)',
    expression: 'cₚ − cᵥ = R',
    courseId: 'thermo',
    description: 'Ideal-gas gap between constant-pressure and constant-volume heats.',
    plainLanguage:
      'Heating at constant pressure must also “pay” for expansion work — hence cₚ is larger than cᵥ by R.',
    tags: ['properties'],
  },
  {
    id: 'f-isentropic',
    name: 'Isentropic ideal gas',
    expression: 'P V^γ = const',
    courseId: 'thermo',
    description: 'Reversible adiabatic process for an ideal gas.',
    plainLanguage:
      'No heat, and reversible: pressure and volume trade off on a steeper curve than isothermal.',
    tags: ['processes'],
  },
  {
    id: 'f-efficiency',
    name: 'Thermal efficiency',
    expression: 'η = W_net / Q_in',
    courseId: 'thermo',
    description: 'What you get out as net work per heat you pay for.',
    plainLanguage:
      'A scoreboard for heat engines — never above the Carnot ceiling between the same temperatures.',
    tags: ['cycles'],
  },
  {
    id: 'f-carnot',
    name: 'Carnot efficiency',
    expression: 'η_C = 1 − T_C / T_H',
    courseId: 'thermo',
    description: 'Maximum efficiency between hot and cold reservoirs.',
    plainLanguage:
      'Not a product you buy — a theoretical ceiling. Absolute temperatures only; bigger T gap → higher ceiling.',
    tags: ['cycles'],
  },
  {
    id: 'f-quality',
    name: 'Vapor quality',
    expression: 'x = m_g / (m_f + m_g)',
    courseId: 'thermo',
    description: 'Mass fraction that is vapor in a two-phase mixture.',
    plainLanguage:
      'x = 0 is all liquid, x = 1 is all vapor — the slider between saturated liquid and saturated vapor.',
    tags: ['properties'],
  },

  // Materials — MSE 200
  {
    id: 'f-stress',
    name: 'Engineering stress',
    expression: 'σ = F / A₀',
    courseId: 'materials',
    description: 'Load intensity using original cross-section.',
    plainLanguage:
      'Fair comparison across sizes: same stress can mean very different total force on thick vs thin parts.',
    tags: ['mechanics'],
  },
  {
    id: 'f-strain',
    name: 'Engineering strain',
    expression: 'ε = ΔL / L₀',
    courseId: 'materials',
    description: 'Fractional elongation using original length.',
    plainLanguage:
      'Stretch per unit length — so a long bar and a short bar can be compared fairly.',
    tags: ['mechanics'],
  },
  {
    id: 'f-hooke',
    name: "Hooke's law",
    expression: 'σ = E ε',
    courseId: 'materials',
    description: 'Linear elastic: stress proportional to strain.',
    plainLanguage:
      'In the straight part of the curve, E is the stiffness slope — steel’s E dwarfs most plastics.',
    tags: ['elasticity'],
  },
  {
    id: 'f-poisson',
    name: "Poisson's ratio",
    expression: 'ν = −ε_lat / ε_axial',
    courseId: 'materials',
    description: 'Lateral squish vs axial stretch (dimensionless).',
    plainLanguage:
      'Pull lengthwise and most materials get thinner. Cork is famous for barely doing this.',
    tags: ['elasticity'],
  },
  {
    id: 'f-shear',
    name: 'Shear modulus',
    expression: 'τ = G γ',
    courseId: 'materials',
    description: 'Shear stress vs shear strain in the elastic range.',
    plainLanguage:
      'The sliding analogue of Hooke’s law — twisting and shearing live here.',
    tags: ['elasticity'],
  },
  {
    id: 'f-hardness',
    name: 'Hall–Petch',
    expression: 'σ_y = σ₀ + k / √d',
    courseId: 'materials',
    description: 'Finer grains raise yield strength (valid range).',
    plainLanguage:
      'More grain-boundary “walls” per volume block dislocations — smaller d, higher σ_y, until other mechanisms take over.',
    tags: ['strengthening'],
  },
  {
    id: 'f-diffusion',
    name: 'Fick’s 1st law',
    expression: 'J = −D ∇c',
    courseId: 'materials',
    description: 'Diffusive flux runs down the concentration gradient.',
    plainLanguage:
      'Stuff spreads from crowded regions toward emptier ones; D sets how eagerly.',
    tags: ['diffusion'],
  },
  {
    id: 'f-arrhenius',
    name: 'Arrhenius rate',
    expression: 'rate ∝ exp(−Q / R T)',
    courseId: 'materials',
    description: 'Thermally activated processes speed up with T.',
    plainLanguage:
      'Hotter → dramatically faster when a barrier Q must be hopped. Small temperature changes matter a lot.',
    tags: ['kinetics'],
  },
]
