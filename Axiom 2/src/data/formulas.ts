import type { Formula } from '../types'

export const formulas: Formula[] = [
  // Calculus — MATH 141
  { id: 'f-lim-def', name: 'Limit definition', expression: 'limₓ→ₐ f(x) = L', courseId: 'calculus', description: 'f(x) approaches L as x approaches a.', tags: ['limits'] },
  { id: 'f-deriv-def', name: 'Derivative definition', expression: "f'(a) = limₕ→₀ [f(a+h) − f(a)] / h", courseId: 'calculus', description: 'Instantaneous rate of change at x = a.', tags: ['derivatives'] },
  { id: 'f-power-rule', name: 'Power rule', expression: 'd/dx [xⁿ] = n xⁿ⁻¹', courseId: 'calculus', description: 'Differentiate a power of x.', tags: ['derivatives'] },
  { id: 'f-product', name: 'Product rule', expression: '(uv)′ = u′v + uv′', courseId: 'calculus', description: 'Derivative of a product.', tags: ['derivatives'] },
  { id: 'f-quotient', name: 'Quotient rule', expression: '(u/v)′ = (u′v − uv′) / v²', courseId: 'calculus', description: 'Derivative of a quotient.', tags: ['derivatives'] },
  { id: 'f-chain', name: 'Chain rule', expression: '(f∘g)′ = (f′∘g) · g′', courseId: 'calculus', description: 'Derivative of a composition.', tags: ['derivatives'] },
  { id: 'f-ftc', name: 'Fundamental theorem', expression: '∫ₐᵇ f′(x) dx = f(b) − f(a)', courseId: 'calculus', description: 'Net change equals definite integral of derivative.', tags: ['integrals'] },
  { id: 'f-sin-lim', name: 'Standard trig limit', expression: 'limₓ→₀ sin(x)/x = 1', courseId: 'calculus', description: 'Foundational limit for trig derivatives.', tags: ['limits', 'trig'] },

  // Mechanics — PHYS 211
  { id: 'f-kin-v', name: 'Velocity (const a)', expression: 'v = v₀ + a t', courseId: 'mechanics', description: 'Linear velocity under constant acceleration.', tags: ['kinematics'] },
  { id: 'f-kin-x', name: 'Position (const a)', expression: 'x = x₀ + v₀ t + ½ a t²', courseId: 'mechanics', description: 'Displacement under constant acceleration.', tags: ['kinematics'] },
  { id: 'f-kin-v2', name: 'Timeless kinematics', expression: 'v² = v₀² + 2 a Δx', courseId: 'mechanics', description: 'Relate speeds without time.', tags: ['kinematics'] },
  { id: 'f-newton2', name: "Newton's 2nd law", expression: 'ΣF = m a', courseId: 'mechanics', description: 'Net force equals mass times acceleration.', tags: ['dynamics'] },
  { id: 'f-weight', name: 'Weight', expression: 'W = m g', courseId: 'mechanics', description: 'Gravitational force near Earth.', tags: ['dynamics'] },
  { id: 'f-friction', name: 'Kinetic friction', expression: 'fₖ = μₖ N', courseId: 'mechanics', description: 'Friction opposing sliding.', tags: ['dynamics'] },
  { id: 'f-work', name: 'Work (const force)', expression: 'W = F · d = F d cos θ', courseId: 'mechanics', description: 'Energy transferred by a force.', tags: ['energy'] },
  { id: 'f-ke', name: 'Kinetic energy', expression: 'K = ½ m v²', courseId: 'mechanics', description: 'Energy of motion.', tags: ['energy'] },
  { id: 'f-pe', name: 'Gravitational PE', expression: 'U = m g h', courseId: 'mechanics', description: 'Potential energy near Earth.', tags: ['energy'] },
  { id: 'f-momentum', name: 'Linear momentum', expression: 'p = m v', courseId: 'mechanics', description: 'Momentum of a particle.', tags: ['momentum'] },

  // Statics — ENGR 201
  { id: 'f-eq-force', name: 'Force equilibrium', expression: 'ΣFₓ = 0,  ΣFᵧ = 0', courseId: 'statics', description: 'Particle (or planar) force balance.', tags: ['equilibrium'] },
  { id: 'f-eq-moment', name: 'Moment equilibrium', expression: 'ΣM = 0', courseId: 'statics', description: 'Rotational balance about a point/axis.', tags: ['equilibrium'] },
  { id: 'f-moment', name: 'Moment of a force', expression: 'M = r × F = r F sin θ', courseId: 'statics', description: 'Torque about a point.', tags: ['moments'] },
  { id: 'f-resultant', name: '2D resultant', expression: 'Rₓ = Σ F cos θ,  Rᵧ = Σ F sin θ', courseId: 'statics', description: 'Cartesian components of a force system.', tags: ['resultants'] },
  { id: 'f-mag-angle', name: 'Magnitude & direction', expression: '|R| = √(Rₓ² + Rᵧ²),  θ = atan2(Rᵧ, Rₓ)', courseId: 'statics', description: 'Polar form of a resultant.', tags: ['resultants'] },
  { id: 'f-distributed', name: 'Distributed load (rect.)', expression: 'F = w · L  (at center)', courseId: 'statics', description: 'Equivalent point load for uniform intensity.', tags: ['loads'] },
  { id: 'f-centroid-tri', name: 'Triangle centroid', expression: 'ȳ = h/3 from base', courseId: 'statics', description: 'Centroid of a triangular area.', tags: ['centroids'] },
  { id: 'f-friction-static', name: 'Static friction max', expression: 'fₛ ≤ μₛ N', courseId: 'statics', description: 'No-slip limit before impending motion.', tags: ['friction'] },

  // Circuits — ECE 201
  { id: 'f-ohm', name: "Ohm's law", expression: 'V = I R', courseId: 'circuits', description: 'Voltage across a resistor.', tags: ['resistive'] },
  { id: 'f-kcl', name: 'KCL', expression: 'Σ I_in = Σ I_out', courseId: 'circuits', description: 'Current conservation at a node.', tags: ['laws'] },
  { id: 'f-kvl', name: 'KVL', expression: 'Σ V_loop = 0', courseId: 'circuits', description: 'Voltage sum around a closed loop.', tags: ['laws'] },
  { id: 'f-series-r', name: 'Series resistors', expression: 'R_eq = R₁ + R₂ + …', courseId: 'circuits', description: 'Equivalent series resistance.', tags: ['resistive'] },
  { id: 'f-parallel-r', name: 'Parallel resistors', expression: '1/R_eq = 1/R₁ + 1/R₂ + …', courseId: 'circuits', description: 'Equivalent parallel resistance.', tags: ['resistive'] },
  { id: 'f-divider', name: 'Voltage divider', expression: 'V_out = V_in · R₂ / (R₁ + R₂)', courseId: 'circuits', description: 'Output across R₂ in series chain.', tags: ['resistive'] },
  { id: 'f-power', name: 'Electrical power', expression: 'P = V I = I² R = V² / R', courseId: 'circuits', description: 'Instantaneous power in a resistor.', tags: ['power'] },
  { id: 'f-cap-i', name: 'Capacitor current', expression: 'i = C dv/dt', courseId: 'circuits', description: 'Current through a capacitor.', tags: ['transient'] },

  // Thermodynamics — ME 231
  { id: 'f-ideal-gas', name: 'Ideal gas law', expression: 'P V = n R T', courseId: 'thermo', description: 'Equation of state for ideal gas.', tags: ['properties'] },
  { id: 'f-1st-law', name: 'First law (closed)', expression: 'ΔU = Q − W', courseId: 'thermo', description: 'Energy balance; sign convention: W out positive.', tags: ['laws'] },
  { id: 'f-enthalpy', name: 'Enthalpy', expression: 'H = U + P V', courseId: 'thermo', description: 'Convenient energy property for open systems.', tags: ['properties'] },
  { id: 'f-cp-cv', name: 'Specific heats (ideal)', expression: 'cₚ − cᵥ = R', courseId: 'thermo', description: 'Relation for ideal gas specific heats.', tags: ['properties'] },
  { id: 'f-isentropic', name: 'Isentropic ideal gas', expression: 'P V^γ = const', courseId: 'thermo', description: 'Reversible adiabatic process.', tags: ['processes'] },
  { id: 'f-efficiency', name: 'Thermal efficiency', expression: 'η = W_net / Q_in', courseId: 'thermo', description: 'Heat engine efficiency.', tags: ['cycles'] },
  { id: 'f-carnot', name: 'Carnot efficiency', expression: 'η_C = 1 − T_C / T_H', courseId: 'thermo', description: 'Maximum efficiency between two reservoirs.', tags: ['cycles'] },
  { id: 'f-quality', name: 'Vapor quality', expression: 'x = m_g / (m_f + m_g)', courseId: 'thermo', description: 'Mass fraction of vapor in two-phase mixture.', tags: ['properties'] },

  // Materials — MSE 200
  { id: 'f-stress', name: 'Engineering stress', expression: 'σ = F / A₀', courseId: 'materials', description: 'Load over original cross-section.', tags: ['mechanics'] },
  { id: 'f-strain', name: 'Engineering strain', expression: 'ε = ΔL / L₀', courseId: 'materials', description: 'Relative elongation.', tags: ['mechanics'] },
  { id: 'f-hooke', name: "Hooke's law", expression: 'σ = E ε', courseId: 'materials', description: 'Linear elastic constitutive relation.', tags: ['elasticity'] },
  { id: 'f-poisson', name: "Poisson's ratio", expression: 'ν = −ε_lat / ε_axial', courseId: 'materials', description: 'Lateral vs axial strain ratio.', tags: ['elasticity'] },
  { id: 'f-shear', name: 'Shear modulus', expression: 'τ = G γ', courseId: 'materials', description: 'Shear stress–strain in elastic range.', tags: ['elasticity'] },
  { id: 'f-hardness', name: 'Hall–Petch', expression: 'σ_y = σ₀ + k / √d', courseId: 'materials', description: 'Yield strength vs grain size.', tags: ['strengthening'] },
  { id: 'f-diffusion', name: 'Fick’s 1st law', expression: 'J = −D ∇c', courseId: 'materials', description: 'Diffusive flux proportional to concentration gradient.', tags: ['diffusion'] },
  { id: 'f-arrhenius', name: 'Arrhenius rate', expression: 'rate ∝ exp(−Q / R T)', courseId: 'materials', description: 'Thermally activated processes.', tags: ['kinetics'] },
]
