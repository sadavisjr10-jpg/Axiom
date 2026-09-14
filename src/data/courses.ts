import type { Course } from '../types'

export const courses: Course[] = [
  {
    id: 'calculus',
    code: 'MATH 141',
    title: 'Engineering Calculus',
    shortTitle: 'Calculus',
    description:
      'Limits, derivatives, and integrals from first principles — the language of change for every engineering model.',
    color: '#6ee7b7',
    accent: '#064e3b',
    icon: '∫',
    modules: [
      {
        id: 'calc-m1',
        title: 'Limits and continuity',
        description: 'Intuitive and algebraic limits; continuity and standard forms.',
        lessons: [
          {
            id: 'calculus:limits-continuity',
            title: 'Limits and continuity',
            summary:
              'Evaluate limits by direct substitution, algebraic simplification, and standard trig forms.',
            sections: [
              {
                heading: 'What a limit means',
                body:
                  'We write limₓ→ₐ f(x) = L when values of f get arbitrarily close to L as x approaches a (from both sides, if two-sided). The function need not equal L at a — or even be defined there.',
              },
              {
                heading: 'Direct evaluation',
                body:
                  'If f is a polynomial or rational function and the denominator is nonzero at a, then limₓ→ₐ f(x) = f(a). Always try substitution first.',
              },
              {
                heading: 'Indeterminate forms',
                body:
                  'A 0/0 form after substitution is not “undefined forever” — it means algebra may cancel a common factor. Factor, expand, or use a known limit identity.',
              },
              {
                heading: 'A standard trig limit',
                body:
                  'limₓ→₀ sin(x)/x = 1. Scaling: limₓ→₀ sin(kx)/x = k · lim sin(kx)/(kx) = k.',
              },
            ],
            workedExamples: [
              {
                id: 'we-lim-eval',
                title: 'Direct limit evaluation',
                problem: 'Evaluate limₓ→₃ (2x² − 5x + 1).',
                steps: [
                  {
                    label: 'Recognize the form',
                    content:
                      'The expression is a polynomial — continuous everywhere — so the limit equals the function value at x = 3.',
                  },
                  {
                    label: 'Substitute',
                    content: '2(3)² − 5(3) + 1 = 2·9 − 15 + 1 = 18 − 15 + 1 = 4.',
                  },
                  {
                    label: 'Conclude',
                    content: 'limₓ→₃ (2x² − 5x + 1) = 4.',
                  },
                ],
                answer: '4',
              },
              {
                id: 'we-factor-cancel',
                title: 'Factor and cancel',
                problem: 'Evaluate limₓ→2 (x² − 4)/(x − 2).',
                steps: [
                  {
                    label: 'Try substitution',
                    content:
                      'Plugging in x = 2 gives (4 − 4)/(2 − 2) = 0/0 — indeterminate. Algebra is needed.',
                  },
                  {
                    label: 'Factor the numerator',
                    content: 'x² − 4 = (x − 2)(x + 2). So the quotient is (x − 2)(x + 2)/(x − 2).',
                  },
                  {
                    label: 'Cancel for x ≠ 2',
                    content:
                      'For all x ≠ 2 the expression simplifies to x + 2. Limits care about nearby values, not the point itself.',
                  },
                  {
                    label: 'Take the limit',
                    content: 'limₓ→2 (x + 2) = 4.',
                  },
                ],
                answer: '4',
              },
              {
                id: 'we-sin3x',
                title: 'Scaled sine limit',
                problem: 'Evaluate limₓ→₀ sin(3x)/x.',
                steps: [
                  {
                    label: 'Rewrite to match sin(u)/u',
                    content:
                      'Multiply and divide by 3: sin(3x)/x = 3 · [sin(3x)/(3x)].',
                  },
                  {
                    label: 'Let u = 3x',
                    content:
                      'As x → 0, u → 0. So lim 3 · sin(u)/u = 3 · lim sin(u)/u = 3 · 1.',
                  },
                  {
                    label: 'Conclude',
                    content: 'limₓ→₀ sin(3x)/x = 3.',
                  },
                ],
                answer: '3',
              },
            ],
            quiz: [
              {
                id: 'q-lim-1',
                prompt: 'limₓ→₀ sin(3x)/x equals…',
                choices: ['0', '1', '3', 'Does not exist'],
                correctIndex: 2,
                explanation: 'Rewrite as 3 · sin(3x)/(3x) → 3 · 1 = 3.',
              },
              {
                id: 'q-lim-2',
                prompt: 'After substituting x = 2 into (x²−4)/(x−2) you get 0/0. Next step?',
                choices: [
                  'Conclude the limit is 0',
                  'Conclude DNE',
                  'Factor and cancel, then re-evaluate',
                  'Apply L’Hôpital without thought',
                ],
                correctIndex: 2,
                explanation: '0/0 is indeterminate — simplify algebraically first.',
              },
              {
                id: 'q-lim-3',
                prompt: 'limₓ→3 (2x² − 5x + 1) equals…',
                choices: ['4', '0', '3', 'Undefined'],
                correctIndex: 0,
                explanation: 'Polynomials are continuous: plug in x = 3 to get 4.',
              },
            ],
          },
          {
            id: 'calculus:derivative-intro',
            title: 'The derivative as a limit',
            summary: 'Define f′(a) via the difference quotient and interpret slope and rate.',
            sections: [
              {
                heading: 'Difference quotient',
                body:
                  'The average rate of change of f on [a, a+h] is [f(a+h) − f(a)] / h. The derivative is the limit of this quotient as h → 0.',
              },
              {
                heading: 'Geometric meaning',
                body:
                  'f′(a) is the slope of the tangent line to y = f(x) at x = a, when the limit exists.',
              },
            ],
            workedExamples: [
              {
                id: 'we-deriv-x2',
                title: 'Derivative of x² at a point',
                problem: "Find f′(3) for f(x) = x² using the definition.",
                steps: [
                  {
                    label: 'Write the quotient',
                    content: '[f(3+h) − f(3)] / h = [(3+h)² − 9] / h = [9 + 6h + h² − 9]/h = 6 + h.',
                  },
                  {
                    label: 'Take the limit',
                    content: 'limₕ→₀ (6 + h) = 6. So f′(3) = 6.',
                  },
                ],
                answer: '6',
              },
            ],
            quiz: [
              {
                id: 'q-deriv-1',
                prompt: "The definition f′(a) = limₕ→₀ [f(a+h)−f(a)]/h measures…",
                choices: [
                  'Average value of f',
                  'Instantaneous rate of change',
                  'Area under f',
                  'Maximum of f',
                ],
                correctIndex: 1,
                explanation: 'The limit of average rates is the instantaneous rate.',
              },
            ],
          },
        ],
      },
      {
        id: 'calc-m2',
        title: 'Differentiation techniques',
        description: 'Power, product, quotient, and chain rules.',
        lessons: [
          {
            id: 'calculus:power-product',
            title: 'Power and product rules',
            summary: 'Differentiate powers and products efficiently.',
            sections: [
              {
                heading: 'Power rule',
                body: 'For n ≠ 0, d/dx [xⁿ] = n xⁿ⁻¹. Constants factor out: (c f)′ = c f′.',
              },
              {
                heading: 'Product rule',
                body: '(uv)′ = u′v + uv′. Differentiate each factor once while holding the other.',
              },
            ],
            workedExamples: [
              {
                id: 'we-product',
                title: 'Product of polynomial and power',
                problem: 'Differentiate y = x² (3x + 1).',
                steps: [
                  {
                    label: 'Identify u and v',
                    content: 'u = x², v = 3x + 1 → u′ = 2x, v′ = 3.',
                  },
                  {
                    label: 'Apply product rule',
                    content: "y′ = 2x(3x+1) + x²·3 = 6x² + 2x + 3x² = 9x² + 2x.",
                  },
                ],
                answer: '9x² + 2x',
              },
            ],
            quiz: [
              {
                id: 'q-pow-1',
                prompt: 'd/dx [x⁵] equals…',
                choices: ['x⁴', '5x⁴', '5x⁵', 'x⁶'],
                correctIndex: 1,
                explanation: 'Power rule: 5 x⁴.',
              },
            ],
          },
        ],
      },
      {
        id: 'calc-m3',
        title: 'Integration essentials',
        description: 'Antiderivatives and the fundamental theorem.',
        lessons: [
          {
            id: 'calculus:ftc-intro',
            title: 'Antiderivatives and FTC',
            summary: 'Connect derivatives and definite integrals.',
            sections: [
              {
                heading: 'Antiderivative',
                body: 'F is an antiderivative of f if F′ = f. The indefinite integral ∫ f(x) dx = F(x) + C.',
              },
              {
                heading: 'Fundamental theorem',
                body: 'If F′ = f on [a,b], then ∫ₐᵇ f(x) dx = F(b) − F(a).',
              },
            ],
            workedExamples: [
              {
                id: 'we-ftc',
                title: 'Evaluate a definite integral',
                problem: 'Compute ∫₀² 3x² dx.',
                steps: [
                  {
                    label: 'Find an antiderivative',
                    content: '∫ 3x² dx = x³ + C. Use F(x) = x³.',
                  },
                  {
                    label: 'Apply FTC',
                    content: 'F(2) − F(0) = 8 − 0 = 8.',
                  },
                ],
                answer: '8',
              },
            ],
            quiz: [
              {
                id: 'q-ftc-1',
                prompt: '∫₀¹ 2x dx equals…',
                choices: ['0', '1', '2', '½'],
                correctIndex: 1,
                explanation: '[x²]₀¹ = 1.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'mechanics',
    code: 'PHYS 211',
    title: 'Physics: Mechanics',
    shortTitle: 'Mechanics',
    description:
      'Kinematics, Newton’s laws, energy, and momentum — the core of classical particle mechanics.',
    color: '#38bdf8',
    accent: '#0c4a6e',
    icon: '↯',
    modules: [
      {
        id: 'mech-m1',
        title: 'Kinematics',
        description: 'Describe motion with constant acceleration.',
        lessons: [
          {
            id: 'mechanics:const-accel',
            title: 'Constant acceleration',
            summary: 'Use the kinematic equations for 1D motion with constant a.',
            sections: [
              {
                heading: 'The three workhorses',
                body:
                  'v = v₀ + a t;  x = x₀ + v₀ t + ½ a t²;  v² = v₀² + 2 a Δx. Choose the equation that omits the unknown you do not have.',
              },
              {
                heading: 'Signs matter',
                body:
                  'Pick a positive direction and stick to it. Acceleration opposite velocity means speeding down (or reversing).',
              },
            ],
            workedExamples: [
              {
                id: 'we-brake',
                title: 'Braking distance',
                problem:
                  'A car at 20 m/s brakes at a = −4 m/s². How far to stop?',
                steps: [
                  {
                    label: 'Identify knowns',
                    content: 'v₀ = 20, v = 0, a = −4. Unknown: Δx. Use v² = v₀² + 2aΔx.',
                  },
                  {
                    label: 'Solve',
                    content: '0 = 400 + 2(−4)Δx → 8 Δx = 400 → Δx = 50 m.',
                  },
                ],
                answer: '50 m',
              },
            ],
            quiz: [
              {
                id: 'q-kin-1',
                prompt: 'From rest, a = 2 m/s² for 5 s. Speed?',
                choices: ['5 m/s', '10 m/s', '20 m/s', '2 m/s'],
                correctIndex: 1,
                explanation: 'v = a t = 10 m/s.',
              },
            ],
          },
        ],
      },
      {
        id: 'mech-m2',
        title: 'Dynamics',
        description: "Newton's laws and free-body diagrams.",
        lessons: [
          {
            id: 'mechanics:newton2',
            title: "Newton's second law",
            summary: 'Relate net force to acceleration.',
            sections: [
              {
                heading: 'ΣF = ma',
                body:
                  'Draw a free-body diagram, resolve components, and write ΣFₓ = m aₓ, ΣFᵧ = m aᵧ.',
              },
            ],
            workedExamples: [
              {
                id: 'we-n2',
                title: 'Horizontal push',
                problem: 'A 5 kg block on a frictionless surface is pushed by 15 N. Find a.',
                steps: [
                  {
                    label: 'Apply ΣF = ma',
                    content: '15 = 5 a → a = 3 m/s².',
                  },
                ],
                answer: '3 m/s²',
              },
            ],
            quiz: [
              {
                id: 'q-n2-1',
                prompt: 'Net force on 2 kg with a = 4 m/s²?',
                choices: ['2 N', '6 N', '8 N', '0.5 N'],
                correctIndex: 2,
                explanation: 'F = 8 N.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'statics',
    code: 'ENGR 201',
    title: 'Engineering Statics',
    shortTitle: 'Statics',
    description:
      'Force systems, equilibrium, centroids, and internal loads for rigid bodies at rest.',
    color: '#fbbf24',
    accent: '#78350f',
    icon: '⬡',
    modules: [
      {
        id: 'stat-m1',
        title: 'Force resultants',
        description: 'Resolve and combine planar forces.',
        lessons: [
          {
            id: 'statics:resultant-2d',
            title: '2D force resultants',
            summary: 'Compute Cartesian components and polar resultant of concurrent forces.',
            sections: [
              {
                heading: 'Components',
                body:
                  'Fₓ = F cos θ, Fᵧ = F sin θ with θ measured from +x (CCW positive by convention).',
              },
              {
                heading: 'Resultant',
                body:
                  'Rₓ = Σ Fₓ, Rᵧ = Σ Fᵧ; |R| = √(Rₓ² + Rᵧ²); θ = atan2(Rᵧ, Rₓ).',
              },
            ],
            workedExamples: [
              {
                id: 'we-res',
                title: 'Two-force resultant',
                problem: 'F₁ = 100 N at 0°, F₂ = 100 N at 90°. Find R.',
                steps: [
                  {
                    label: 'Components',
                    content: 'Rₓ = 100, Rᵧ = 100.',
                  },
                  {
                    label: 'Magnitude and angle',
                    content: '|R| = 100√2 N, θ = 45°.',
                  },
                ],
                answer: '100√2 N at 45°',
              },
            ],
            quiz: [
              {
                id: 'q-res-1',
                prompt: 'Equal forces F at 90° — |R|?',
                choices: ['F', 'F√2', '2F', '0'],
                correctIndex: 1,
                explanation: '|R| = F√2.',
              },
            ],
          },
        ],
      },
      {
        id: 'stat-m2',
        title: 'Equilibrium',
        description: 'Particles and rigid bodies in planar equilibrium.',
        lessons: [
          {
            id: 'statics:particle-eq',
            title: 'Particle equilibrium',
            summary: 'ΣFₓ = 0 and ΣFᵧ = 0 for a particle.',
            sections: [
              {
                heading: 'Two equations',
                body:
                  'A particle in 2D has two scalar equilibrium equations. Supports and cables contribute unknown magnitudes along known lines of action.',
              },
            ],
            workedExamples: [
              {
                id: 'we-particle',
                title: 'Hanging mass, two cables',
                problem:
                  'A 100 N weight hangs from two cables at 30° and 60° to the horizontal. Find cable tensions (qualitative setup).',
                steps: [
                  {
                    label: 'FBD',
                    content: 'Three forces at the knot: T₁, T₂, and weight 100 N down.',
                  },
                  {
                    label: 'Equations',
                    content:
                      'ΣFₓ: T₁ cos 30° − T₂ cos 60° = 0; ΣFᵧ: T₁ sin 30° + T₂ sin 60° − 100 = 0.',
                  },
                ],
                answer: 'Solve the 2×2 linear system for T₁, T₂',
              },
            ],
            quiz: [
              {
                id: 'q-eq-1',
                prompt: 'Planar particle equilibrium needs how many independent force equations?',
                choices: ['1', '2', '3', '6'],
                correctIndex: 1,
                explanation: 'ΣFx and ΣFy.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'circuits',
    code: 'ECE 201',
    title: 'Electric Circuits',
    shortTitle: 'Circuits',
    description:
      'Resistive networks, KCL/KVL, dividers, and the beginnings of energy storage elements.',
    color: '#a78bfa',
    accent: '#4c1d95',
    icon: '⚡',
    modules: [
      {
        id: 'circ-m1',
        title: 'Resistive circuits',
        description: "Ohm's law, series/parallel, dividers.",
        lessons: [
          {
            id: 'circuits:voltage-divider',
            title: 'Voltage dividers',
            summary: 'Predict Vout across one resistor in a series chain.',
            sections: [
              {
                heading: 'Divider formula',
                body:
                  'For Vin across R₁ then R₂ to ground: Vout (across R₂) = Vin · R₂/(R₁+R₂). Current is Vin/(R₁+R₂).',
              },
              {
                heading: 'Design tip',
                body:
                  'Ratio of resistors sets the fraction; absolute values set loading and power dissipation.',
              },
            ],
            workedExamples: [
              {
                id: 'we-div',
                title: 'Half-rail divider',
                problem: 'Vin = 10 V, R₁ = 2 kΩ, R₂ = 2 kΩ. Find Vout across R₂.',
                steps: [
                  {
                    label: 'Apply formula',
                    content: 'Vout = 10 · 2/(2+2) = 5 V.',
                  },
                ],
                answer: '5 V',
              },
            ],
            quiz: [
              {
                id: 'q-div-1',
                prompt: 'Vin=12 V, R1=R2. Vout across R2?',
                choices: ['0', '6 V', '12 V', '24 V'],
                correctIndex: 1,
                explanation: 'Equal resistors → half.',
              },
            ],
          },
          {
            id: 'circuits:kcl-kvl',
            title: 'KCL and KVL',
            summary: 'Conservation laws that close every circuit analysis.',
            sections: [
              {
                heading: 'KCL',
                body: 'Sum of currents into a node equals sum leaving (or algebraic sum is zero).',
              },
              {
                heading: 'KVL',
                body: 'Sum of signed voltage drops around any closed loop is zero.',
              },
            ],
            workedExamples: [
              {
                id: 'we-kvl',
                title: 'Single-loop circuit',
                problem: '12 V source in series with 3 Ω and 1 Ω. Find loop current.',
                steps: [
                  {
                    label: 'KVL',
                    content: '12 − 3I − 1I = 0 → I = 3 A.',
                  },
                ],
                answer: '3 A',
              },
            ],
            quiz: [
              {
                id: 'q-kvl-1',
                prompt: 'KCL is fundamentally about…',
                choices: ['Energy', 'Charge conservation', 'Power gain', 'Magnetic flux'],
                correctIndex: 1,
                explanation: 'Current continuity = charge conservation.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'thermo',
    code: 'ME 231',
    title: 'Thermodynamics',
    shortTitle: 'Thermo',
    description:
      'Properties, ideal gases, the first law, and efficiency of heat engines.',
    color: '#fb7185',
    accent: '#881337',
    icon: 'Δ',
    modules: [
      {
        id: 'th-m1',
        title: 'Properties & ideal gas',
        description: 'State postulate and PV = nRT.',
        lessons: [
          {
            id: 'thermo:ideal-gas',
            title: 'Ideal gas law',
            summary: 'Relate P, V, n, and T for an ideal gas.',
            sections: [
              {
                heading: 'Equation of state',
                body:
                  'PV = nRT with T absolute (K). R ≈ 8.314 J/(mol·K). Intensive form: Pv = RT.',
              },
              {
                heading: 'Processes',
                body:
                  'Isothermal: PV = const. Isochoric: P/T = const. Isobaric: V/T = const.',
              },
            ],
            workedExamples: [
              {
                id: 'we-ig',
                title: 'Find pressure',
                problem: 'n = 1 mol, V = 0.0821 m³, T = 300 K, R = 8.314. Find P.',
                steps: [
                  {
                    label: 'Rearrange',
                    content: 'P = nRT / V.',
                  },
                  {
                    label: 'Compute',
                    content: 'P = (1)(8.314)(300)/0.0821 ≈ 30,380 Pa ≈ 30.4 kPa.',
                  },
                ],
                answer: '≈ 30.4 kPa',
              },
            ],
            quiz: [
              {
                id: 'q-ig-1',
                prompt: 'At fixed V and n, doubling T does what to P?',
                choices: ['Halves', 'Unchanged', 'Doubles', 'Squares'],
                correctIndex: 2,
                explanation: 'P ∝ T.',
              },
            ],
          },
        ],
      },
      {
        id: 'th-m2',
        title: 'First law & cycles',
        description: 'Energy balance and Carnot limit.',
        lessons: [
          {
            id: 'thermo:first-law',
            title: 'First law (closed system)',
            summary: 'ΔU = Q − W with W positive out.',
            sections: [
              {
                heading: 'Energy balance',
                body:
                  'Heat in raises internal energy or does work; sign conventions vary — this course uses W out positive.',
              },
              {
                heading: 'Carnot',
                body: 'η_C = 1 − T_C/T_H is the ceiling for engines between two reservoirs.',
              },
            ],
            workedExamples: [
              {
                id: 'we-carnot',
                title: 'Carnot efficiency',
                problem: 'T_H = 600 K, T_C = 300 K. Max η?',
                steps: [
                  {
                    label: 'Apply formula',
                    content: 'η = 1 − 300/600 = 0.5 = 50%.',
                  },
                ],
                answer: '50%',
              },
            ],
            quiz: [
              {
                id: 'q-carnot-1',
                prompt: 'Carnot η between 400 K and 300 K?',
                choices: ['25%', '33%', '75%', '100%'],
                correctIndex: 0,
                explanation: '1 − 300/400 = 0.25.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'materials',
    code: 'MSE 200',
    title: 'Materials Science',
    shortTitle: 'Materials',
    description:
      'Structure–property links: stress–strain, elasticity, strengthening, and diffusion.',
    color: '#94a3b8',
    accent: '#1e293b',
    icon: '⬢',
    modules: [
      {
        id: 'mat-m1',
        title: 'Stress, strain, elasticity',
        description: 'Mechanical response in the elastic regime.',
        lessons: [
          {
            id: 'materials:stress-strain',
            title: 'Stress and strain',
            summary: 'Define engineering stress/strain and Hooke’s law.',
            sections: [
              {
                heading: 'Definitions',
                body: 'σ = F/A₀, ε = ΔL/L₀. Young’s modulus E links them linearly: σ = E ε.',
              },
              {
                heading: 'Poisson',
                body: 'ν = −ε_lateral / ε_axial. Metals often ν ≈ 0.3.',
              },
            ],
            workedExamples: [
              {
                id: 'we-hooke',
                title: 'Elastic elongation',
                problem: 'Steel rod, E = 200 GPa, L₀ = 1 m, σ = 100 MPa. Find ΔL.',
                steps: [
                  {
                    label: 'Strain',
                    content: 'ε = σ/E = 100e6 / 200e9 = 5×10⁻⁴.',
                  },
                  {
                    label: 'Elongation',
                    content: 'ΔL = ε L₀ = 0.5 mm.',
                  },
                ],
                answer: '0.5 mm',
              },
            ],
            quiz: [
              {
                id: 'q-ss-1',
                prompt: 'Engineering stress divides force by…',
                choices: ['Instant area', 'Original area A₀', 'Volume', 'Length'],
                correctIndex: 1,
                explanation: 'σ = F/A₀.',
              },
            ],
          },
        ],
      },
      {
        id: 'mat-m2',
        title: 'Strengthening & kinetics',
        description: 'Grain size and thermally activated rates.',
        lessons: [
          {
            id: 'materials:hall-petch',
            title: 'Hall–Petch and Arrhenius',
            summary: 'Grain-boundary strengthening and temperature-sensitive rates.',
            sections: [
              {
                heading: 'Hall–Petch',
                body: 'σ_y = σ₀ + k / √d — finer grains raise yield strength.',
              },
              {
                heading: 'Arrhenius',
                body: 'Diffusion and many reaction rates scale as exp(−Q/RT).',
              },
            ],
            workedExamples: [
              {
                id: 'we-hp',
                title: 'Qualitative Hall–Petch',
                problem: 'Halving grain diameter d (same material) tends to…',
                steps: [
                  {
                    label: 'Inspect formula',
                    content: 'k/√d grows as d shrinks → higher σ_y.',
                  },
                ],
                answer: 'Increase yield strength',
              },
            ],
            quiz: [
              {
                id: 'q-hp-1',
                prompt: 'Finer grains (Hall–Petch) typically…',
                choices: [
                  'Lower yield strength',
                  'Raise yield strength',
                  'Eliminate elasticity',
                  'Set ν = 0',
                ],
                correctIndex: 1,
                explanation: 'σ_y increases as d decreases.',
              },
            ],
          },
        ],
      },
    ],
  },
]

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id)
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId)
  if (!course) return undefined
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId)
    if (lesson) return { course, module: mod, lesson }
  }
  return undefined
}

export function allLessons() {
  return courses.flatMap((c) =>
    c.modules.flatMap((m) =>
      m.lessons.map((l) => ({ course: c, module: m, lesson: l })),
    ),
  )
}

export function lessonCountForCourse(courseId: string): number {
  const c = getCourse(courseId)
  if (!c) return 0
  return c.modules.reduce((n, m) => n + m.lessons.length, 0)
}

export function totalLessonCount(): number {
  return courses.reduce((n, c) => n + lessonCountForCourse(c.id), 0)
}
