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
              'Build the idea of a limit from nearby values, then evaluate by substitution, algebra, and standard trig forms — and know when a limit fails.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'By the end of this lesson you should be able to: (1) explain limₓ→ₐ f(x) = L in plain language and with one-sided limits; (2) evaluate polynomial and rational limits by substitution or factoring; (3) use limₓ→₀ sin(x)/x = 1 after a scaling rewrite; (4) spot common failure modes (jump, vertical asymptote, mismatched sides).',
              },
              {
                heading: 'What a limit means',
                body:
                  'We write limₓ→ₐ f(x) = L when the values of f get arbitrarily close to L as x approaches a. The function need not equal L at a — or even be defined there. Think of zooming in on the graph near x = a: if the y-values settle on a single height L, the limit is L.',
              },
              {
                heading: 'One-sided limits',
                body:
                  'limₓ→ₐ⁻ f(x) uses only x < a; limₓ→ₐ⁺ uses only x > a. The two-sided limit exists only when both one-sided limits exist and agree. A classic failure is a jump discontinuity: left and right settle on different heights.',
              },
              {
                heading: 'Direct evaluation',
                body:
                  'If f is a polynomial, or a rational function whose denominator is nonzero at a, then limₓ→ₐ f(x) = f(a). Always try substitution first. If you get a finite number, you are done — no special technique required.',
              },
              {
                heading: 'Indeterminate forms',
                body:
                  'A 0/0 form after substitution is not “undefined forever.” It means the same algebraic cause is canceling in numerator and denominator. Factor, expand, rationalize, or use a known identity, then take the limit of the simplified expression (valid for x ≠ a).',
              },
              {
                heading: 'Continuity in one line',
                body:
                  'f is continuous at a when limₓ→ₐ f(x) = f(a). That packs three requirements: f(a) exists, the limit exists, and they match. Removable discontinuities are exactly the 0/0 cases where algebra fills the hole; jumps and infinite blow-ups do not.',
              },
              {
                heading: 'A standard trig limit',
                body:
                  'limₓ→₀ sin(x)/x = 1 (x in radians). Scaling: limₓ→₀ sin(kx)/x = k, because sin(kx)/x = k · sin(kx)/(kx) and kx → 0 with x. Never leave the argument of sine mismatched with the denominator.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Treating 0/0 as “the limit is 0” or “DNE” without simplifying. Mixing degrees with the sin(x)/x identity. Canceling factors that are zero at a and then forgetting the simplified function is what nearby values follow. Claiming a two-sided limit when left and right disagree.',
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
                      'The expression is a polynomial. Polynomials are continuous on all of ℝ, so the limit equals the function value at the target point.',
                  },
                  {
                    label: 'Substitute x = 3',
                    content: '2(3)² − 5(3) + 1 = 2·9 − 15 + 1 = 18 − 15 + 1.',
                  },
                  {
                    label: 'Arithmetic check',
                    content: '18 − 15 = 3, then 3 + 1 = 4.',
                  },
                  {
                    label: 'Conclude',
                    content: 'limₓ→₃ (2x² − 5x + 1) = 4. No indeterminate form appeared, so no extra algebra was needed.',
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
                      'Plugging in x = 2 gives (4 − 4)/(2 − 2) = 0/0 — indeterminate. The limit may still exist; algebra is required.',
                  },
                  {
                    label: 'Factor the numerator',
                    content:
                      'x² − 4 is a difference of squares: (x − 2)(x + 2). The quotient is (x − 2)(x + 2)/(x − 2).',
                  },
                  {
                    label: 'Cancel for x ≠ 2',
                    content:
                      'For every x ≠ 2 the (x − 2) factors cancel, leaving x + 2. Limits only care about nearby values, not the missing point itself.',
                  },
                  {
                    label: 'Take the limit of the simplified expression',
                    content: 'limₓ→2 (x + 2) = 2 + 2 = 4. (Graphically: a hole at x = 2 on the line y = x + 2.)',
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
                    label: 'Diagnose',
                    content:
                      'Substitution gives sin(0)/0 = 0/0. We want the standard form sin(u)/u with matching argument and denominator.',
                  },
                  {
                    label: 'Rewrite to match sin(u)/u',
                    content:
                      'Multiply and divide by 3: sin(3x)/x = 3 · [sin(3x)/(3x)].',
                  },
                  {
                    label: 'Change of variable',
                    content:
                      'Let u = 3x. As x → 0, u → 0. So the limit becomes 3 · limᵤ→₀ sin(u)/u.',
                  },
                  {
                    label: 'Apply the standard limit',
                    content: 'lim sin(u)/u = 1, hence 3 · 1 = 3. Check: lim sin(3x)/(3x) alone would be 1; the extra factor of 3 supplies the answer.',
                  },
                ],
                answer: '3',
              },
              {
                id: 'we-onesided',
                title: 'One-sided disagreement',
                problem: 'Does limₓ→₀ |x|/x exist?',
                steps: [
                  {
                    label: 'Split by sign',
                    content:
                      'For x > 0, |x|/x = x/x = 1. For x < 0, |x|/x = (−x)/x = −1.',
                  },
                  {
                    label: 'One-sided limits',
                    content:
                      'limₓ→₀⁺ |x|/x = 1 and limₓ→₀⁻ |x|/x = −1.',
                  },
                  {
                    label: 'Conclude',
                    content:
                      'Left and right disagree, so the two-sided limit does not exist. (Each one-sided limit still exists.)',
                  },
                ],
                answer: 'Does not exist (two-sided)',
              },
            ],
            quiz: [
              {
                id: 'q-lim-1',
                prompt: 'limₓ→₀ sin(3x)/x equals…',
                choices: ['0', '1', '3', 'Does not exist'],
                correctIndex: 2,
                explanation:
                  'Rewrite as 3 · sin(3x)/(3x). As x → 0 the fraction → 1, so the product → 3.',
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
                explanation:
                  '0/0 is indeterminate — simplify algebraically (or use a justified rule) before deciding.',
              },
              {
                id: 'q-lim-3',
                prompt: 'limₓ→3 (2x² − 5x + 1) equals…',
                choices: ['4', '0', '3', 'Undefined'],
                correctIndex: 0,
                explanation: 'Polynomials are continuous everywhere: plug in x = 3 to get 4.',
              },
              {
                id: 'q-lim-4',
                prompt: 'limₓ→₀ |x|/x …',
                choices: [
                  'Equals 0',
                  'Equals 1',
                  'Equals −1',
                  'Does not exist (two-sided)',
                ],
                correctIndex: 3,
                explanation:
                  'Right-hand limit is 1, left-hand limit is −1, so the two-sided limit fails.',
              },
              {
                id: 'q-lim-5',
                prompt: 'f is continuous at a precisely when…',
                choices: [
                  'f(a) is defined',
                  'limₓ→ₐ f(x) exists',
                  'limₓ→ₐ f(x) = f(a)',
                  'f has no vertical asymptote anywhere',
                ],
                correctIndex: 2,
                explanation:
                  'Continuity at a requires the limit to exist and equal the function value at a.',
              },
            ],
          },
          {
            id: 'calculus:derivative-intro',
            title: 'The derivative as a limit',
            summary:
              'Define f′(a) via the difference quotient, interpret it as slope and instantaneous rate, and compute a first example from scratch.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'State the limit definition of f′(a), connect it to average rate of change and tangent slope, and evaluate a simple derivative from the definition without shortcut rules.',
              },
              {
                heading: 'Average rate first',
                body:
                  'On an interval [a, a+h], the average rate of change of f is [f(a+h) − f(a)] / h — rise over run for the secant line. That quotient is exact for the interval; it is not yet “instantaneous.”',
              },
              {
                heading: 'Difference quotient → derivative',
                body:
                  'The derivative is the limit of that average rate as the window shrinks: f′(a) = limₕ→₀ [f(a+h) − f(a)] / h, when the limit exists. Geometrically, secants approach the tangent; physically, average rates approach an instantaneous rate.',
              },
              {
                heading: 'When the derivative fails',
                body:
                  'Corners (like |x| at 0), jumps, and vertical tangents block the limit of the difference quotient. Differentiability at a is stricter than continuity at a: if f′(a) exists, then f is continuous at a, but not conversely.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Forgetting to expand f(a+h) carefully before canceling h. Dividing only part of the numerator by h. Confusing “average rate on [a,b]” with f′(a).',
              },
            ],
            workedExamples: [
              {
                id: 'we-deriv-x2',
                title: 'Derivative of x² at a point',
                problem: "Find f′(3) for f(x) = x² using the definition.",
                steps: [
                  {
                    label: 'Write the difference quotient',
                    content:
                      '[f(3+h) − f(3)] / h = [(3+h)² − 9] / h.',
                  },
                  {
                    label: 'Expand the square',
                    content:
                      '(3+h)² = 9 + 6h + h², so the numerator is 9 + 6h + h² − 9 = 6h + h².',
                  },
                  {
                    label: 'Cancel h (h ≠ 0)',
                    content:
                      '(6h + h²)/h = 6 + h for h ≠ 0. The limit never needs the h = 0 case.',
                  },
                  {
                    label: 'Take limₕ→₀',
                    content: 'limₕ→₀ (6 + h) = 6. Therefore f′(3) = 6. (Matches 2x at x = 3 from the power rule, once you know it.)',
                  },
                ],
                answer: '6',
              },
              {
                id: 'we-deriv-linear',
                title: 'Derivative of a linear function',
                problem: "Using the definition, find f′(a) for f(x) = 4x − 1.",
                steps: [
                  {
                    label: 'Form the quotient',
                    content:
                      '[f(a+h) − f(a)] / h = [(4(a+h) − 1) − (4a − 1)] / h = (4a + 4h − 1 − 4a + 1)/h = 4h/h.',
                  },
                  {
                    label: 'Simplify and limit',
                    content:
                      '4h/h = 4 for h ≠ 0, so limₕ→₀ = 4. The slope is constant — as expected for a line.',
                  },
                ],
                answer: '4',
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
                explanation: 'The limit of average rates is the instantaneous rate (tangent slope).',
              },
              {
                id: 'q-deriv-2',
                prompt: 'If f′(a) exists, then f must be…',
                choices: [
                  'Discontinuous at a',
                  'Continuous at a',
                  'Equal to zero at a',
                  'A polynomial',
                ],
                correctIndex: 1,
                explanation:
                  'Differentiability implies continuity; continuity alone does not imply differentiability.',
              },
              {
                id: 'q-deriv-3',
                prompt: 'For f(x) = x², the difference quotient at a = 3 simplifies (h ≠ 0) to…',
                choices: ['3 + h', '6 + h', '9 + h', '6h'],
                correctIndex: 1,
                explanation: '[(3+h)² − 9]/h = (6h + h²)/h = 6 + h.',
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
            summary:
              'Differentiate powers and products efficiently — and know when expanding first is smarter than the product rule.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'Apply the power rule to monomials (including negative and fractional exponents when they appear), use the product rule with clear u/v bookkeeping, and sanity-check by expanding simple polynomials.',
              },
              {
                heading: 'Why shortcut rules exist',
                body:
                  'The limit definition always works but is slow. Once you trust the definition for xⁿ and for sums/products, the power and product rules are compressed theorems — not magic. Use them freely after you have seen where they come from.',
              },
              {
                heading: 'Power rule',
                body:
                  'For any real n where xⁿ is differentiable, d/dx [xⁿ] = n xⁿ⁻¹. Constants factor out: (c f)′ = c f′. Sums differentiate termwise: (f + g)′ = f′ + g′.',
              },
              {
                heading: 'Product rule',
                body:
                  '(uv)′ = u′v + uv′. Say it as “derivative of the first times second, plus first times derivative of the second.” Each factor is differentiated once while the other is held fixed — never differentiate both in the same term.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Writing (uv)′ = u′v′ (forgetting the cross terms). Dropping the constant multiplier. Applying power rule to (3x+1)ⁿ without the chain rule when n ≠ 1.',
              },
            ],
            workedExamples: [
              {
                id: 'we-product',
                title: 'Product of polynomial and linear factor',
                problem: 'Differentiate y = x² (3x + 1).',
                steps: [
                  {
                    label: 'Identify u and v',
                    content: 'Let u = x² and v = 3x + 1. Then u′ = 2x and v′ = 3.',
                  },
                  {
                    label: 'Apply product rule',
                    content: "y′ = u′v + uv′ = 2x(3x+1) + x²·3.",
                  },
                  {
                    label: 'Expand carefully',
                    content: '2x(3x+1) = 6x² + 2x, and x²·3 = 3x². Sum: 6x² + 2x + 3x² = 9x² + 2x.',
                  },
                  {
                    label: 'Optional check',
                    content:
                      'Expand first: y = 3x³ + x², so y′ = 9x² + 2x. Same answer — good sign.',
                  },
                ],
                answer: '9x² + 2x',
              },
              {
                id: 'we-power-neg',
                title: 'Power rule with a reciprocal',
                problem: 'Differentiate y = 1/x² (= x⁻²).',
                steps: [
                  {
                    label: 'Rewrite as a power',
                    content: 'y = x⁻².',
                  },
                  {
                    label: 'Apply power rule',
                    content: "y′ = −2 x⁻³ = −2/x³.",
                  },
                ],
                answer: '−2/x³',
              },
            ],
            quiz: [
              {
                id: 'q-pow-1',
                prompt: 'd/dx [x⁵] equals…',
                choices: ['x⁴', '5x⁴', '5x⁵', 'x⁶'],
                correctIndex: 1,
                explanation: 'Power rule: bring down 5, reduce exponent by 1 → 5x⁴.',
              },
              {
                id: 'q-pow-2',
                prompt: '(uv)′ equals…',
                choices: ['u′v′', 'u′v + uv′', 'u′ + v′', 'uv'],
                correctIndex: 1,
                explanation: 'Product rule is the sum of two mixed terms, not the product of derivatives.',
              },
              {
                id: 'q-pow-3',
                prompt: 'd/dx [x²(3x+1)] equals…',
                choices: ['6x + 1', '9x² + 2x', '6x² + 2x', '3x² + 2x'],
                correctIndex: 1,
                explanation: 'From the worked example (or expand then differentiate): 9x² + 2x.',
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
            summary:
              'Connect derivatives and definite integrals: undo a derivative, then evaluate net change with the fundamental theorem.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'Find simple antiderivatives of power functions, state the indefinite integral with +C, and evaluate a definite integral via F(b) − F(a).',
              },
              {
                heading: 'Antiderivative idea',
                body:
                  'F is an antiderivative of f when F′ = f. Differentiation asks “how fast does F change?”; antidifferentiation asks “which F has this rate?” Many answers differ by a constant: if F′ = f then (F+C)′ = f too.',
              },
              {
                heading: 'Indefinite integral',
                body:
                  'We write ∫ f(x) dx = F(x) + C for the family of antiderivatives. The +C is not decoration — definite integrals cancel it, but indefinite integrals must keep it.',
              },
              {
                heading: 'Fundamental theorem (evaluation form)',
                body:
                  'If F′ = f on [a,b] (with mild hypotheses), then ∫ₐᵇ f(x) dx = F(b) − F(a). The definite integral equals net change of any antiderivative. Signed area under y = f is the usual geometric reading when f ≥ 0.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Forgetting +C on indefinite integrals. Evaluating F(a) − F(b) instead of F(b) − F(a). Antidifferentiating xⁿ as xⁿ⁺¹ without dividing by n+1 (n ≠ −1).',
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
                    content:
                      '∫ 3x² dx = 3 · (x³/3) + C = x³ + C. Use F(x) = x³ for the definite integral.',
                  },
                  {
                    label: 'Apply FTC',
                    content: '∫₀² 3x² dx = F(2) − F(0) = 2³ − 0³ = 8 − 0 = 8.',
                  },
                  {
                    label: 'Sanity check',
                    content:
                      'On [0,2], 3x² ≥ 0, so the integral is an area and must be positive — 8 fits.',
                  },
                ],
                answer: '8',
              },
              {
                id: 'we-ftc-linear',
                title: 'Another FTC evaluation',
                problem: 'Compute ∫₁⁴ (2x − 1) dx.',
                steps: [
                  {
                    label: 'Antiderivative',
                    content: 'F(x) = x² − x works, since F′ = 2x − 1.',
                  },
                  {
                    label: 'Evaluate',
                    content: 'F(4) − F(1) = (16 − 4) − (1 − 1) = 12 − 0 = 12.',
                  },
                ],
                answer: '12',
              },
            ],
            quiz: [
              {
                id: 'q-ftc-1',
                prompt: '∫₀¹ 2x dx equals…',
                choices: ['0', '1', '2', '½'],
                correctIndex: 1,
                explanation: 'Antiderivative x²: [x²]₀¹ = 1 − 0 = 1.',
              },
              {
                id: 'q-ftc-2',
                prompt: 'An antiderivative of 3x² is…',
                choices: ['6x', 'x³', 'x³ + C (family)', '3x³'],
                correctIndex: 2,
                explanation:
                  'Any x³ + C works; the indefinite integral is a family. (x³ alone is one antiderivative.)',
              },
              {
                id: 'q-ftc-3',
                prompt: 'FTC says ∫ₐᵇ f = … when F′ = f.',
                choices: ['F(a) − F(b)', 'F(b) − F(a)', 'F(a) + F(b)', 'F′(b) − F′(a)'],
                correctIndex: 1,
                explanation: 'Net change: upper minus lower — F(b) − F(a).',
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
            summary:
              'Use the three kinematic equations for 1D motion with constant a — choosing the equation that drops the unknown you do not have.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'List the constant-acceleration equations, assign a consistent sign convention, and solve for displacement, velocity, or time in a single-axis problem.',
              },
              {
                heading: 'When these equations apply',
                body:
                  'They assume acceleration is constant in magnitude and direction along the line of motion (or a single axis). Variable a needs calculus or piecewise constants. Free fall near Earth is the usual a = −g example once you pick “up” as positive.',
              },
              {
                heading: 'The three workhorses',
                body:
                  'v = v₀ + a t (no displacement).  x = x₀ + v₀ t + ½ a t² (no final v).  v² = v₀² + 2 a Δx (no time). Choose the equation that omits the quantity you were not given and do not need.',
              },
              {
                heading: 'Signs matter',
                body:
                  'Pick a positive direction and stick to it for v₀, v, a, and Δx. Acceleration opposite velocity means slowing down; same sign means speeding up. A negative Δx only means net motion toward the negative axis — not “impossible.”',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Mixing frames mid-problem. Using v = v₀ + a t when a is not constant. Dropping the ½ in ½ a t². Squaring velocities and losing track of direction (v² equation is scalar in 1D but still uses signed a and Δx).',
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
                    label: 'Identify knowns and unknown',
                    content:
                      'v₀ = 20 m/s, v = 0, a = −4 m/s². Unknown: Δx. Time is unknown and unneeded → use v² = v₀² + 2 a Δx.',
                  },
                  {
                    label: 'Substitute',
                    content: '0 = (20)² + 2(−4)Δx → 0 = 400 − 8 Δx.',
                  },
                  {
                    label: 'Solve',
                    content: '8 Δx = 400 → Δx = 50 m. Positive: the car travels forward 50 m while slowing.',
                  },
                  {
                    label: 'Check',
                    content:
                      'Rough feel: average speed while braking is ~10 m/s; time to stop is v₀/|a| = 5 s; distance ≈ 10·5 = 50 m. Consistent.',
                  },
                ],
                answer: '50 m',
              },
              {
                id: 'we-from-rest',
                title: 'Speed after constant boost',
                problem: 'From rest, a = 2 m/s² for 5 s. Find final speed.',
                steps: [
                  {
                    label: 'Pick equation',
                    content: 'v₀ = 0, a = 2, t = 5. Use v = v₀ + a t.',
                  },
                  {
                    label: 'Compute',
                    content: 'v = 0 + 2·5 = 10 m/s.',
                  },
                ],
                answer: '10 m/s',
              },
            ],
            quiz: [
              {
                id: 'q-kin-1',
                prompt: 'From rest, a = 2 m/s² for 5 s. Speed?',
                choices: ['5 m/s', '10 m/s', '20 m/s', '2 m/s'],
                correctIndex: 1,
                explanation: 'v = v₀ + a t = 10 m/s.',
              },
              {
                id: 'q-kin-2',
                prompt: 'Which equation has no time in it?',
                choices: [
                  'v = v₀ + a t',
                  'Δx = v₀ t + ½ a t²',
                  'v² = v₀² + 2 a Δx',
                  'None of these',
                ],
                correctIndex: 2,
                explanation: 'The no-clock equation is v² = v₀² + 2aΔx.',
              },
              {
                id: 'q-kin-3',
                prompt: 'Braking with a opposite v₀ means…',
                choices: [
                  'Speeding up',
                  'Slowing down (if it does not reverse yet)',
                  'a must be zero',
                  'Δx must be negative',
                ],
                correctIndex: 1,
                explanation: 'Opposite signs of a and v reduce speed until a stop or reversal.',
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
            summary:
              'Relate net force to acceleration with free-body diagrams and component equations ΣF = ma.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'Draw a clean FBD, write ΣFₓ = m aₓ and ΣFᵧ = m aᵧ with a consistent axis choice, and solve a single-body horizontal or vertical problem.',
              },
              {
                heading: 'Net force, not “the” force',
                body:
                  'Newton’s second law is about the vector sum of forces: ΣF = m a. Individual forces (push, weight, normal, tension) appear on the FBD; acceleration responds only to the total.',
              },
              {
                heading: 'FBD discipline',
                body:
                  'Isolate one body. Draw every force as an arrow on that body (not on neighbors). Resolve into components. Only then write ΣFₓ = m aₓ and ΣFᵧ = m aᵧ. If the body does not accelerate vertically, ΣFᵧ = 0 is still an equation — it often finds a normal force.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Putting ma on the FBD as if it were a force. Omitting weight or the normal. Using ΣF = m a with F as a single contact force while ignoring friction or other contributors.',
              },
            ],
            workedExamples: [
              {
                id: 'we-n2',
                title: 'Horizontal push',
                problem: 'A 5 kg block on a frictionless surface is pushed by 15 N. Find a.',
                steps: [
                  {
                    label: 'FBD and net force',
                    content:
                      'Horizontal: only the 15 N push (frictionless). Vertical: weight and normal cancel, aᵧ = 0.',
                  },
                  {
                    label: 'Apply ΣFₓ = m aₓ',
                    content: '15 N = (5 kg) a → a = 3 m/s² in the direction of the push.',
                  },
                ],
                answer: '3 m/s²',
              },
              {
                id: 'we-n2-weight',
                title: 'Elevator cable tension (intro)',
                problem:
                  'A 10 kg mass accelerates upward at 2 m/s². Find tension T in the supporting cable (g = 10 m/s² for easy numbers).',
                steps: [
                  {
                    label: 'FBD',
                    content: 'Up: T. Down: mg = 100 N. Take up as positive.',
                  },
                  {
                    label: 'ΣF = ma',
                    content: 'T − 100 = 10·2 → T − 100 = 20 → T = 120 N.',
                  },
                  {
                    label: 'Check',
                    content:
                      'T > mg when accelerating up — matches the “heavier in an elevating elevator” intuition.',
                  },
                ],
                answer: '120 N',
              },
            ],
            quiz: [
              {
                id: 'q-n2-1',
                prompt: 'Net force on 2 kg with a = 4 m/s²?',
                choices: ['2 N', '6 N', '8 N', '0.5 N'],
                correctIndex: 2,
                explanation: 'ΣF = m a = 8 N.',
              },
              {
                id: 'q-n2-2',
                prompt: 'On a free-body diagram you should…',
                choices: [
                  'Draw ma as a force arrow',
                  'Draw only forces from other objects on the body',
                  'Include forces the body exerts on others',
                  'Omit weight if the body is moving',
                ],
                correctIndex: 1,
                explanation:
                  'FBDs show forces on the chosen body; ma is the result, not an extra force.',
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
            summary:
              'Resolve planar forces into Cartesian components, sum them, and recover magnitude and direction of the resultant.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'Convert a force given by magnitude and angle into Fₓ, Fᵧ; sum concurrent forces; and report the resultant as magnitude plus angle (or as components).',
              },
              {
                heading: 'Why components',
                body:
                  'Vector addition by parallelogram is fine for two forces; for many forces, components scale cleanly: add all x-pieces, add all y-pieces, then rebuild one vector.',
              },
              {
                heading: 'Components',
                body:
                  'With θ measured from +x, counterclockwise positive: Fₓ = F cos θ, Fᵧ = F sin θ. If a problem states “30° above −x,” sketch first — do not force a formula that assumes a different reference.',
              },
              {
                heading: 'Resultant',
                body:
                  'Rₓ = Σ Fₓ, Rᵧ = Σ Fᵧ; |R| = √(Rₓ² + Rᵧ²); θ = atan2(Rᵧ, Rₓ) so the quadrant is correct. Concurrent forces (lines of action through one point) need no moment bookkeeping for the resultant force alone.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Using degrees in a calculator set to radians (or vice versa). Taking atan(Rᵧ/Rₓ) and ignoring quadrant. Adding magnitudes instead of components.',
              },
            ],
            workedExamples: [
              {
                id: 'we-res',
                title: 'Two-force resultant',
                problem: 'F₁ = 100 N at 0°, F₂ = 100 N at 90°. Find R.',
                steps: [
                  {
                    label: 'Resolve',
                    content:
                      'F₁: (100, 0) N. F₂: (0, 100) N.',
                  },
                  {
                    label: 'Sum components',
                    content: 'Rₓ = 100, Rᵧ = 100.',
                  },
                  {
                    label: 'Magnitude and angle',
                    content:
                      '|R| = √(100²+100²) = 100√2 N ≈ 141 N. θ = 45° from +x.',
                  },
                ],
                answer: '100√2 N at 45°',
              },
              {
                id: 'we-res-3',
                title: 'Three concurrent forces (components)',
                problem:
                  'Forces 30 N at 0°, 40 N at 90°, and 50 N at 180°. Find Rₓ and Rᵧ.',
                steps: [
                  {
                    label: 'List components',
                    content:
                      '(30, 0) + (0, 40) + (−50, 0) → Rₓ = 30 − 50 = −20 N, Rᵧ = 40 N.',
                  },
                  {
                    label: 'Interpret',
                    content:
                      'Resultant points left and up; |R| = √(400+1600) = √2000 = 20√5 N if needed.',
                  },
                ],
                answer: 'Rₓ = −20 N, Rᵧ = 40 N',
              },
            ],
            quiz: [
              {
                id: 'q-res-1',
                prompt: 'Equal forces F at 90° — |R|?',
                choices: ['F', 'F√2', '2F', '0'],
                correctIndex: 1,
                explanation: 'Perpendicular equal forces: |R| = F√2.',
              },
              {
                id: 'q-res-2',
                prompt: 'F = 10 N at 180° has Fₓ = …',
                choices: ['10 N', '0', '−10 N', '10√2 N'],
                correctIndex: 2,
                explanation: 'cos 180° = −1 → Fₓ = −10 N, Fᵧ = 0.',
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
            summary:
              'For a particle in a plane, ΣFₓ = 0 and ΣFᵧ = 0 — two equations for the unknown support forces.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'Write planar particle equilibrium equations from an FBD and set up (and for simple cases solve) cable or link tension problems.',
              },
              {
                heading: 'Particle vs rigid body',
                body:
                  'A particle (or a knot treated as a particle) has no size for moment purposes: only force balance matters. A rigid body in 2D also needs ΣM = 0 — three equations total. This lesson stays with particles.',
              },
              {
                heading: 'Two equations',
                body:
                  'ΣFₓ = 0 and ΣFᵧ = 0. Supports and cables contribute unknown magnitudes along known lines of action. Count unknowns: two independent scalar equations support two unknowns in a well-posed planar particle problem.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Resolving tensions with the wrong angle reference. Writing only one equilibrium equation when two unknowns remain. Treating a continuous cable over a pulley as two independent directions without a free-body cut.',
              },
            ],
            workedExamples: [
              {
                id: 'we-particle',
                title: 'Hanging mass, two cables',
                problem:
                  'A 100 N weight hangs from two cables at 30° and 60° to the horizontal. Set up equations for tensions T₁ (30° side) and T₂ (60° side).',
                steps: [
                  {
                    label: 'FBD at the knot',
                    content:
                      'Three forces: T₁ along 30°, T₂ along 60°, and weight 100 N downward.',
                  },
                  {
                    label: 'Resolve',
                    content:
                      'T₁ₓ = T₁ cos 30°, T₁ᵧ = T₁ sin 30°; T₂ₓ = T₂ cos 60°, T₂ᵧ = T₂ sin 60°.',
                  },
                  {
                    label: 'Equilibrium equations',
                    content:
                      'ΣFₓ: T₁ cos 30° − T₂ cos 60° = 0. ΣFᵧ: T₁ sin 30° + T₂ sin 60° − 100 = 0.',
                  },
                  {
                    label: 'Solve (optional numbers)',
                    content:
                      'From ΣFₓ: T₁ (√3/2) = T₂ (1/2) → T₁ √3 = T₂. Substitute into ΣFᵧ to get T₁ = 50 N, T₂ = 50√3 N.',
                  },
                ],
                answer: 'T₁ = 50 N, T₂ = 50√3 N',
              },
            ],
            quiz: [
              {
                id: 'q-eq-1',
                prompt: 'Planar particle equilibrium needs how many independent force equations?',
                choices: ['1', '2', '3', '6'],
                correctIndex: 1,
                explanation: 'ΣFₓ and ΣFᵧ — two scalar equations.',
              },
              {
                id: 'q-eq-2',
                prompt: 'A planar rigid body (not a particle) typically needs…',
                choices: [
                  'Only ΣFₓ = 0',
                  'ΣFₓ = ΣFᵧ = ΣM = 0',
                  'Six force equations',
                  'No moment equation',
                ],
                correctIndex: 1,
                explanation: 'Three planar equilibrium equations: two force, one moment.',
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
            summary:
              'Predict Vout across one resistor in a series chain, and see how absolute values set current and loading.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'Derive the unloaded voltage-divider formula from Ohm’s law and KVL, compute Vout for given Vin and resistors, and explain why resistor scale matters even when the ratio is fixed.',
              },
              {
                heading: 'Series intuition',
                body:
                  'Same current flows through series resistors. Larger resistance drops a larger share of Vin — voltage divides in proportion to resistance.',
              },
              {
                heading: 'Divider formula',
                body:
                  'For Vin across R₁ then R₂ to ground: current I = Vin/(R₁+R₂), and Vout across R₂ is I·R₂ = Vin · R₂/(R₁+R₂). Swap labels if you measure across R₁ instead.',
              },
              {
                heading: 'Design tip',
                body:
                  'The ratio R₂/(R₁+R₂) sets the fraction. Absolute values set current (power burn) and how stiff the divider is when a load attaches in parallel with R₂ — a light load needs much larger load resistance than R₂.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Putting the wrong resistor in the numerator. Assuming the formula still holds exactly with a heavy load on Vout. Mixing kΩ and Ω mid-equation.',
              },
            ],
            workedExamples: [
              {
                id: 'we-div',
                title: 'Half-rail divider',
                problem: 'Vin = 10 V, R₁ = 2 kΩ, R₂ = 2 kΩ. Find Vout across R₂.',
                steps: [
                  {
                    label: 'Recognize equal resistors',
                    content: 'R₁ = R₂ ⇒ the fraction R₂/(R₁+R₂) = 1/2.',
                  },
                  {
                    label: 'Apply formula',
                    content: 'Vout = 10 · 1/2 = 5 V.',
                  },
                  {
                    label: 'Current (optional)',
                    content: 'I = 10/(4000 Ω) = 2.5 mA — useful if you care about power.',
                  },
                ],
                answer: '5 V',
              },
              {
                id: 'we-div-unequal',
                title: 'Unequal divider',
                problem: 'Vin = 12 V, R₁ = 1 kΩ, R₂ = 3 kΩ. Vout across R₂?',
                steps: [
                  {
                    label: 'Fraction',
                    content: 'R₂/(R₁+R₂) = 3/(1+3) = 3/4.',
                  },
                  {
                    label: 'Vout',
                    content: 'Vout = 12 · 3/4 = 9 V.',
                  },
                ],
                answer: '9 V',
              },
            ],
            quiz: [
              {
                id: 'q-div-1',
                prompt: 'Vin=12 V, R1=R2. Vout across R2?',
                choices: ['0', '6 V', '12 V', '24 V'],
                correctIndex: 1,
                explanation: 'Equal resistors → half of Vin = 6 V.',
              },
              {
                id: 'q-div-2',
                prompt: 'To raise Vout across R₂ without changing Vin…',
                choices: [
                  'Decrease R₂ relative to R₁',
                  'Increase R₂ relative to R₁',
                  'Only change wire thickness',
                  'Short R₂',
                ],
                correctIndex: 1,
                explanation: 'Vout/Vin = R₂/(R₁+R₂) grows as R₂ grows relative to R₁.',
              },
            ],
          },
          {
            id: 'circuits:kcl-kvl',
            title: 'KCL and KVL',
            summary:
              'Charge and energy conservation as circuit laws — KCL at nodes, KVL around loops — with a first single-loop solve.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'State KCL and KVL in words, write them for a simple node and loop, and solve a single-loop resistive circuit for current and element voltages.',
              },
              {
                heading: 'KCL — charge conservation',
                body:
                  'At a node, current in equals current out (algebraic sum of currents leaving is zero). Charge does not pile up at an ideal node. Pick a sign convention and stay consistent.',
              },
              {
                heading: 'KVL — energy conservation',
                body:
                  'Around any closed loop, the signed sum of voltage drops is zero. Traverse the loop: add rises and drops with a consistent rule (e.g. + when going from − to + through a source).',
              },
              {
                heading: 'How they work together',
                body:
                  'Ohm’s law relates V and I on each resistor; KCL/KVL supply the topology constraints. Series loop: one KVL equation often finds the single current; then V = IR on each element.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Inconsistent voltage signs around a loop. Writing KCL with mixed “into” and “out of” without converting. Applying KVL to an open path.',
              },
            ],
            workedExamples: [
              {
                id: 'we-kvl',
                title: 'Single-loop circuit',
                problem: '12 V source in series with 3 Ω and 1 Ω. Find loop current and voltage on the 3 Ω resistor.',
                steps: [
                  {
                    label: 'KVL',
                    content:
                      'Starting at the source − terminal and going with the current: +12 − 3I − 1I = 0.',
                  },
                  {
                    label: 'Solve for I',
                    content: '12 = 4I → I = 3 A.',
                  },
                  {
                    label: 'Element voltage',
                    content: 'V₃Ω = 3I = 9 V; V₁Ω = 3 V; 9 + 3 = 12 checks KVL.',
                  },
                ],
                answer: 'I = 3 A (9 V on the 3 Ω)',
              },
            ],
            quiz: [
              {
                id: 'q-kvl-1',
                prompt: 'KCL is fundamentally about…',
                choices: ['Energy', 'Charge conservation', 'Power gain', 'Magnetic flux'],
                correctIndex: 1,
                explanation: 'Current continuity at a node is charge conservation.',
              },
              {
                id: 'q-kvl-2',
                prompt: 'KVL says that around a closed loop…',
                choices: [
                  'Currents all equal zero',
                  'Signed voltage drops sum to zero',
                  'Power is maximized',
                  'Resistance is minimized',
                ],
                correctIndex: 1,
                explanation: 'Algebraic sum of signed voltages around a loop is zero.',
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
            summary:
              'Relate P, V, n, and T for an ideal gas, keep temperature absolute, and recognize the three common simple processes.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'Use PV = nRT with consistent units, convert °C to K, and reason about isothermal, isobaric, and isochoric changes.',
              },
              {
                heading: 'Model idea',
                body:
                  'An ideal gas ignores intermolecular forces and molecule size — excellent for many dilute gases. The equation of state ties four quantities so three determine the fourth for a fixed mass/mole amount.',
              },
              {
                heading: 'Equation of state',
                body:
                  'PV = nRT with T absolute (Kelvin). R ≈ 8.314 J/(mol·K) when P·V is in joules. Intensive form for specific volume v: Pv = RT (per mole) or use mass-based R̃ carefully — do not mix molar and mass bases.',
              },
              {
                heading: 'Processes',
                body:
                  'Isothermal (T fixed): PV = const. Isochoric (V fixed): P/T = const. Isobaric (P fixed): V/T = const. Name the constraint first, then simplify PV = nRT.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Using Celsius in PV = nRT. Mixing R = 8.314 with pressure in atm and volume in liters without the matching R. Treating “constant pressure” as constant volume.',
              },
            ],
            workedExamples: [
              {
                id: 'we-ig',
                title: 'Find pressure',
                problem: 'n = 1 mol, V = 0.0821 m³, T = 300 K, R = 8.314 J/(mol·K). Find P.',
                steps: [
                  {
                    label: 'Rearrange',
                    content: 'P = nRT / V.',
                  },
                  {
                    label: 'Compute',
                    content:
                      'P = (1)(8.314)(300)/0.0821 = 2494.2 / 0.0821 ≈ 30,380 Pa ≈ 30.4 kPa.',
                  },
                  {
                    label: 'Units check',
                    content:
                      'J = N·m, so J/m³ = N/m² = Pa. The units hang together.',
                  },
                ],
                answer: '≈ 30.4 kPa',
              },
              {
                id: 'we-ig-isothermal',
                title: 'Isothermal compression',
                problem:
                  'Ideal gas at P₁ = 100 kPa, V₁ = 2 L is compressed isothermally to V₂ = 1 L. Find P₂.',
                steps: [
                  {
                    label: 'Use PV = const',
                    content: 'T fixed ⇒ P₁V₁ = P₂V₂.',
                  },
                  {
                    label: 'Solve',
                    content: 'P₂ = P₁ V₁/V₂ = 100 · 2/1 = 200 kPa.',
                  },
                ],
                answer: '200 kPa',
              },
            ],
            quiz: [
              {
                id: 'q-ig-1',
                prompt: 'At fixed V and n, doubling T does what to P?',
                choices: ['Halves', 'Unchanged', 'Doubles', 'Squares'],
                correctIndex: 2,
                explanation: 'From PV = nRT, P ∝ T at fixed V, n.',
              },
              {
                id: 'q-ig-2',
                prompt: 'Temperature in PV = nRT must be…',
                choices: ['°C', '°F', 'Kelvin (absolute)', 'Any scale'],
                correctIndex: 2,
                explanation: 'Absolute temperature — Kelvin (or Rankine with a matched R).',
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
            summary:
              'Track energy with ΔU = Q − W (W out positive here), and use Carnot efficiency as the ceiling between two reservoirs.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'Apply a closed-system energy balance with a stated sign convention, and compute Carnot efficiency from T_H and T_C.',
              },
              {
                heading: 'Energy balance',
                body:
                  'For a closed system (no mass crossing the boundary), ΔU = Q − W with this course’s convention: Q positive when heat enters, W positive when the system does work on the surroundings. Other textbooks flip the work sign — always check the local convention before copying a formula.',
              },
              {
                heading: 'Reading the signs',
                body:
                  'Heat in tends to raise U or pay for work out. Work out without heat in depletes U. Cycles return to the same state so ΔU_cycle = 0, which forces W_net = Q_net over a cycle.',
              },
              {
                heading: 'Carnot limit',
                body:
                  'Between hot reservoir T_H and cold T_C (absolute), no engine is more efficient than η_C = 1 − T_C/T_H. Real engines fall short due to irreversibilities; Carnot is the thermometer-scale ceiling, not a promise.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Mixing °C into η_C. Using η = T_C/T_H instead of 1 − T_C/T_H. Applying ΔU = Q − W to an open device without enthalpy/flow work terms.',
              },
            ],
            workedExamples: [
              {
                id: 'we-carnot',
                title: 'Carnot efficiency',
                problem: 'T_H = 600 K, T_C = 300 K. Max η?',
                steps: [
                  {
                    label: 'Confirm absolute temperatures',
                    content: 'Both given in K — good.',
                  },
                  {
                    label: 'Apply formula',
                    content: 'η_C = 1 − T_C/T_H = 1 − 300/600 = 0.5 = 50%.',
                  },
                ],
                answer: '50%',
              },
              {
                id: 'we-firstlaw',
                title: 'Closed-system balance',
                problem:
                  'A closed system takes in Q = 20 kJ and does W = 5 kJ of work. Find ΔU.',
                steps: [
                  {
                    label: 'Convention',
                    content: 'ΔU = Q − W with W out positive.',
                  },
                  {
                    label: 'Compute',
                    content: 'ΔU = 20 − 5 = 15 kJ.',
                  },
                ],
                answer: '15 kJ',
              },
            ],
            quiz: [
              {
                id: 'q-carnot-1',
                prompt: 'Carnot η between 400 K and 300 K?',
                choices: ['25%', '33%', '75%', '100%'],
                correctIndex: 0,
                explanation: '1 − 300/400 = 0.25 = 25%.',
              },
              {
                id: 'q-carnot-2',
                prompt: 'With ΔU = Q − W (W out +), heat in 10 kJ and work out 10 kJ means ΔU…',
                choices: ['20 kJ', '0', '−10 kJ', '10 kJ'],
                correctIndex: 1,
                explanation: 'ΔU = 10 − 10 = 0.',
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
            summary:
              'Define engineering stress and strain, connect them with Hooke’s law, and use Poisson’s ratio for lateral strain.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'Compute engineering stress and strain from load and geometry, use σ = E ε in the linear elastic range, and estimate lateral strain from Poisson’s ratio.',
              },
              {
                heading: 'Why normalize force and stretch',
                body:
                  'Raw force depends on specimen size; raw elongation depends on length. Stress and strain let you compare materials and feed constitutive laws that are (approximately) size-independent.',
              },
              {
                heading: 'Definitions',
                body:
                  'Engineering stress σ = F/A₀ (original cross section). Engineering strain ε = ΔL/L₀ (original length). Young’s modulus E is the slope of the linear elastic σ–ε line: σ = E ε.',
              },
              {
                heading: 'Poisson',
                body:
                  'Stretching axially usually shrinks the cross section: ν = −ε_lateral / ε_axial. Metals often ν ≈ 0.3; rubber can approach 0.5 (nearly incompressible).',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Using instantaneous area when the problem asks for engineering stress. Mixing MPa and GPa when computing ε = σ/E. Forgetting the minus sign in Poisson’s definition (ν is reported positive).',
              },
            ],
            workedExamples: [
              {
                id: 'we-hooke',
                title: 'Elastic elongation',
                problem: 'Steel rod, E = 200 GPa, L₀ = 1 m, σ = 100 MPa. Find ΔL.',
                steps: [
                  {
                    label: 'Align units',
                    content:
                      '100 MPa = 100×10⁶ Pa; 200 GPa = 200×10⁹ Pa.',
                  },
                  {
                    label: 'Strain',
                    content: 'ε = σ/E = 100e6 / 200e9 = 5×10⁻⁴ (dimensionless).',
                  },
                  {
                    label: 'Elongation',
                    content: 'ΔL = ε L₀ = 5×10⁻⁴ · 1 m = 5×10⁻⁴ m = 0.5 mm.',
                  },
                ],
                answer: '0.5 mm',
              },
              {
                id: 'we-poisson',
                title: 'Lateral strain',
                problem:
                  'Axial strain ε_z = 0.001, ν = 0.3. Find lateral strain magnitude.',
                steps: [
                  {
                    label: 'Poisson definition',
                    content: 'ε_lateral = −ν ε_axial = −0.3 · 0.001 = −3×10⁻⁴.',
                  },
                  {
                    label: 'Interpret',
                    content:
                      'Negative means contraction when the axis is in tension — magnitude 3×10⁻⁴.',
                  },
                ],
                answer: '3×10⁻⁴ (contraction)',
              },
            ],
            quiz: [
              {
                id: 'q-ss-1',
                prompt: 'Engineering stress divides force by…',
                choices: ['Instant area', 'Original area A₀', 'Volume', 'Length'],
                correctIndex: 1,
                explanation: 'σ = F/A₀ by definition of engineering stress.',
              },
              {
                id: 'q-ss-2',
                prompt: 'In the linear elastic range, ε = …',
                choices: ['σ E', 'σ / E', 'E / σ', 'σ² / E'],
                correctIndex: 1,
                explanation: 'Hooke’s law: σ = E ε ⇒ ε = σ/E.',
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
            summary:
              'See how finer grains raise yield strength, and how thermally activated rates follow an Arrhenius exponential in 1/T.',
            sections: [
              {
                heading: 'Learning objectives',
                body:
                  'Interpret the Hall–Petch relation qualitatively and quantitatively, and explain why many diffusion/reaction rates rise sharply with temperature.',
              },
              {
                heading: 'Grain boundaries as obstacles',
                body:
                  'Dislocations carry plastic deformation. Grain boundaries impede dislocation motion; smaller grains mean more boundary area per volume, so higher stress is needed to yield — until other mechanisms intervene at extreme sizes.',
              },
              {
                heading: 'Hall–Petch',
                body:
                  'σ_y = σ₀ + k / √d, where d is grain diameter, σ₀ is a friction stress, and k is a material strengthening coefficient. Halving d multiplies the k/√d term by √2 ≈ 1.41 — a real but not infinite boost.',
              },
              {
                heading: 'Arrhenius rates',
                body:
                  'Diffusion and many activated processes scale as rate ∝ exp(−Q/RT), with activation energy Q and gas constant R. A modest rise in T can change rates by orders of magnitude because of the exponential.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Assuming Hall–Petch continues forever as d → 0 (nanocrystalline regimes can deviate). Putting T in °C inside Q/RT. Confusing “higher T raises rate” with “higher T always raises yield strength” (creep softens materials at high T).',
              },
            ],
            workedExamples: [
              {
                id: 'we-hp',
                title: 'Qualitative Hall–Petch',
                problem: 'Halving grain diameter d (same material) tends to…',
                steps: [
                  {
                    label: 'Inspect the formula',
                    content:
                      'σ_y = σ₀ + k/√d. If d → d/2, √d → √d/√2, so k/√d increases by √2.',
                  },
                  {
                    label: 'Conclude',
                    content:
                      'Yield strength increases (how much depends on how large k/√d is compared with σ₀).',
                  },
                ],
                answer: 'Increase yield strength',
              },
              {
                id: 'we-arrhenius',
                title: 'Arrhenius temperature sensitivity',
                problem:
                  'If a diffusion rate doubles when T increases at fixed Q, what feature of the law explains the strong T dependence?',
                steps: [
                  {
                    label: 'Look at the form',
                    content:
                      'rate ∝ exp(−Q/RT). The exponent contains 1/T, so small fractional changes in T change the exponent linearly and the rate exponentially.',
                  },
                  {
                    label: 'Takeaway',
                    content:
                      'Thermally activated kinetics are steep in T — tables and process windows care about tens of degrees, not only hundreds.',
                  },
                ],
                answer: 'Exponential dependence on −1/T',
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
                explanation: 'σ_y increases as d decreases via k/√d.',
              },
              {
                id: 'q-hp-2',
                prompt: 'Arrhenius rates depend on temperature mainly through…',
                choices: [
                  'exp(−Q/RT)',
                  'Q · T',
                  '√T only',
                  'T − T₀ only',
                ],
                correctIndex: 0,
                explanation: 'The classic factor is exp(−Q/RT).',
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
