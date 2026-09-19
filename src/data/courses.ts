import type { Course, Lesson } from '../types'
import { plainEnglishFor } from './plainEnglish'
import { courseBigIdeas } from './courseBigIdeas'

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
    bigIdea: courseBigIdeas.calculus,
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
            objectives: [
              {
                id: 'lim-meaning',
                title: 'Explain a limit',
                summary:
                  'Say what limₓ→ₐ f(x) = L means in plain language, including when the function itself is undefined at a.',
                sectionHint: 'What a limit means',
                demo: 'limit-approach',
              },
              {
                id: 'lim-onesided',
                title: 'Use one-sided limits',
                summary:
                  'Compare left- and right-hand limits and decide when the two-sided limit exists.',
                sectionHint: 'One-sided limits',
                demo: 'one-sided',
              },
              {
                id: 'lim-eval',
                title: 'Evaluate by algebra',
                summary:
                  'Substitute for polynomials and factor or cancel when you hit a 0/0 indeterminate form.',
                sectionHint: 'Indeterminate forms',
              },
              {
                id: 'lim-sinx',
                title: 'Use sin(x)/x',
                summary:
                  'Apply limₓ→₀ sin(x)/x = 1 (radians) and scale the argument correctly.',
                sectionHint: 'A standard trig limit',
                demo: 'sinx-x',
              },
              {
                id: 'lim-fail',
                title: 'Spot failure modes',
                summary:
                  'Recognize jumps, vertical asymptotes, and mismatched one-sided limits.',
                sectionHint: 'Common mistakes',
                demo: 'limit-fail',
              },
            ],
            sections: [
              {
                heading: 'What a limit means',
                body:
                  'Start with a picture, not a symbol. Walk toward a doorway: you can get arbitrarily close without standing on the threshold. A limit is that idea for graphs — as x nudges toward a, the y-values settle on one height L even if the function has a hole or is undefined at a. Only after that intuition do we write limₓ→ₐ f(x) = L: the outputs approach L as the input approaches a. Zoom in near x = a; if y crowds around one height, that height is the limit.',
                visual: 'limit-zoom',
              },
              {
                heading: 'One-sided limits',
                body:
                  'Sometimes the story from the left differs from the story from the right — think of a curb or a one-way clutch. Approaching only through smaller x (left) or only through larger x (right) gives one-sided limits. We write limₓ→ₐ⁻ and limₓ→ₐ⁺ for those. The two-sided limit exists only when both sides exist and agree. A jump discontinuity is the classic failure: left and right settle on different heights.',
                visual: 'one-sided-graph',
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
                visual: 'indeterminate',
              },
              {
                heading: 'Continuity in one line',
                body:
                  'f is continuous at a when limₓ→ₐ f(x) = f(a). That packs three requirements: f(a) exists, the limit exists, and they match. Removable discontinuities are exactly the 0/0 cases where algebra fills the hole; jumps and infinite blow-ups do not.',
                visual: 'continuity',
              },
              {
                heading: 'A standard trig limit',
                body:
                  'limₓ→₀ sin(x)/x = 1 (x in radians). Scaling: limₓ→₀ sin(kx)/x = k, because sin(kx)/x = k · sin(kx)/(kx) and kx → 0 with x. Never leave the argument of sine mismatched with the denominator.',
                visual: 'trig-limit',
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
            objectives: [
              {
                id: 'deriv-def',
                title: 'State the definition',
                summary:
                  'Write f′(a) as the limit of the difference quotient and connect it to instantaneous rate of change.',
                sectionHint: 'Difference quotient → derivative',
                demo: 'secant-tangent',
              },
              {
                id: 'deriv-avg',
                title: 'Average → instantaneous',
                summary:
                  'Start from average rate of change on [a, a+h] and shrink h to recover the tangent slope.',
                sectionHint: 'Average rate first',
                demo: 'secant-tangent',
              },
              {
                id: 'deriv-eval',
                title: 'Compute from the definition',
                summary:
                  'Evaluate a simple derivative using only the limit definition — no shortcut rules yet.',
                sectionHint: 'Difference quotient → derivative',
              },
              {
                id: 'deriv-fail',
                title: 'Know when it fails',
                summary:
                  'Identify corners, cusps, and jumps where the derivative does not exist.',
                sectionHint: 'When the derivative fails',
              },
            ],
            sections: [
              {
                heading: 'Average rate first',
                body:
                  'Before “instantaneous,” own the everyday idea of average. On a road trip, miles ÷ hours is exact for the whole stretch — and hides the spike at minute 47. On a graph, that average is rise over run for the secant that cuts the curve at two points. On an interval [a, a+h], write [f(a+h) − f(a)] / h. That quotient describes the whole window; it is not yet a rate at one instant.',
                visual: 'avg-rate',
              },
              {
                heading: 'Difference quotient → derivative',
                body:
                  'Shrink the averaging window. As h gets tiny, those secants tip toward a single tangent line, and the average rates settle on one number — the instantaneous rate at a. When that shrinking-window limit exists, we call it the derivative and write f′(a) = limₕ→₀ [f(a+h) − f(a)] / h. Geometry: secants → tangent. Physics: average → instantaneous.',
                visual: 'difference-quotient',
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
            objectives: [
              {
                id: 'power-rule',
                title: 'Apply the power rule',
                summary:
                  'Differentiate xⁿ for integer, negative, and fractional exponents that appear in problems.',
                sectionHint: 'Power rule',
                demo: 'power-rule',
              },
              {
                id: 'product-rule',
                title: 'Use the product rule',
                summary:
                  'Differentiate a product with clear u/v bookkeeping: (uv)′ = u′v + uv′.',
                sectionHint: 'Product rule',
                demo: 'product-rule',
              },
              {
                id: 'sanity-expand',
                title: 'Sanity-check by expanding',
                summary:
                  'Expand a simple polynomial product and confirm the product rule matches term-by-term differentiation.',
                sectionHint: 'Product rule',
              },
            ],
            sections: [
              {
                heading: 'Why shortcut rules exist',
                body:
                  'You already know how to build a derivative from a shrinking window. Doing that by hand for every power of x would be like measuring every board with a micrometer when you own a tape measure. Once you trust the definition for xⁿ and for sums/products, the power and product rules are compressed theorems — not magic. Use them freely after you have seen where they come from.',
              },
              {
                heading: 'Power rule',
                body:
                  'Pattern first: differentiating x³ should feel like “bring the 3 down and drop the power by one.” That is the power rule. For any real n where xⁿ is differentiable, d/dx [xⁿ] = n xⁿ⁻¹. Constants factor out: (c f)′ = c f′. Sums differentiate termwise: (f + g)′ = f′ + g′. Sanity-check a simple case when something looks weird.',
                visual: 'power-slope',
              },
              {
                heading: 'Product rule',
                body:
                  '(uv)′ = u′v + uv′. Say it as “derivative of the first times second, plus first times derivative of the second.” Each factor is differentiated once while the other is held fixed — never differentiate both in the same term.',
                visual: 'product-uv',
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
            objectives: [
              {
                id: 'antideriv',
                title: 'Find antiderivatives',
                summary:
                  'Reverse the power rule for simple power functions and include +C for indefinite integrals.',
                sectionHint: 'Antiderivative idea',
                demo: 'ftc-area',
              },
              {
                id: 'indefinite',
                title: 'Write indefinite integrals',
                summary:
                  'State ∫ f(x) dx = F(x) + C and check by differentiating F.',
                sectionHint: 'Indefinite integral',
              },
              {
                id: 'ftc-eval',
                title: 'Evaluate definite integrals',
                summary:
                  'Use the Fundamental Theorem: ∫ₐᵇ f = F(b) − F(a) for an antiderivative F.',
                sectionHint: 'Fundamental theorem (evaluation form)',
                demo: 'ftc-area',
              },
            ],
            sections: [
              {
                heading: 'Antiderivative idea',
                body:
                  'Differentiation asks “how fast is this changing?” The reverse question is just as practical: “which quantity has this rate?” If water pours into a tank at a known rate, you want the water level (up to a starting amount). F is an antiderivative of f when F′ = f. Many answers differ by a constant: if F′ = f then (F+C)′ = f too — same rate, different starting level.',
                visual: 'antiderivative',
              },
              {
                heading: 'Indefinite integral',
                body:
                  'The family of all antiderivatives is the indefinite integral. We write ∫ f(x) dx = F(x) + C. The +C is not decoration: it remembers that rates do not fix an absolute level. Definite integrals (net change from a to b) cancel the constant; indefinite ones must keep it.',
              },
              {
                heading: 'Fundamental theorem (evaluation form)',
                body:
                  'If F′ = f on [a,b] (with mild hypotheses), then ∫ₐᵇ f(x) dx = F(b) − F(a). The definite integral equals net change of any antiderivative. Signed area under y = f is the usual geometric reading when f ≥ 0.',
                visual: 'ftc-eval',
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
    bigIdea: courseBigIdeas.mechanics,
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
            objectives: [
              {
                id: 'when-const-a',
                title: 'Know when they apply',
                summary:
                  'Use the constant-acceleration equations only when a is truly constant on the interval.',
                sectionHint: 'When these equations apply',
                demo: 'const-accel',
              },
              {
                id: 'sign-convention',
                title: 'Pick a sign convention',
                summary:
                  'Choose a positive direction once, then assign consistent signs to v₀, v, a, and Δx.',
                sectionHint: 'Signs and “slowing down”',
                demo: 'const-accel',
              },
              {
                id: 'pick-equation',
                title: 'Choose the right equation',
                summary:
                  'Pick among v = v₀ + at, Δx = v₀t + ½at², and v² = v₀² + 2aΔx by which quantity is missing.',
                sectionHint: 'The three workhorses',
              },
              {
                id: 'solve-1d',
                title: 'Solve a 1-D problem',
                summary:
                  'Solve a single-axis kinematics problem and sanity-check sign and magnitude.',
                sectionHint: 'The three workhorses',
                demo: 'const-accel',
              },
            ],
            sections: [
              {
                heading: 'Why kinematics before forces',
                body:
                  'Before asking why a car brakes, describe the stop: how speed and position change with time. Kinematics is that description — motion without yet naming the causes. The separation is deliberate: once you can narrate the trip, Newton’s laws later explain why acceleration has the value it does. Free fall, braking, and runway takeoff are everyday cases where a is nearly constant, so the algebra is exact enough for first-pass design.',
              },
              {
                heading: 'When these equations apply',
                body:
                  'They assume acceleration is constant in magnitude and direction along one axis (or a single line of motion). If a changes continuously, you need calculus or you break the trip into piecewise-constant segments. Near Earth’s surface, free-fall magnitude is g ≈ 9.8 m/s²; the sign of a is ±g only after you choose which way is positive.',
              },
              {
                heading: 'The three workhorses',
                body:
                  'v = v₀ + a t drops displacement — use it when you care about speed after a known time. Δx = v₀ t + ½ a t² (with x = x₀ + Δx) drops final velocity — use it for “how far in time t?” v² = v₀² + 2 a Δx drops time — use it for stopping distance and any problem where the clock is unknown. Each equation is a rearrangement of the same a = constant story; they are not independent physics laws.',
                visual: 'kinematic-axes',
              },
              {
                heading: 'Signs and “slowing down”',
                body:
                  'Pick a positive direction once and stick to it for every signed quantity. Acceleration opposite velocity means the speed is decreasing; same sign means speeding up. A negative Δx is not “impossible” — it means net displacement toward the negative axis. The v² equation uses signed a and Δx even though v² and v₀² are squares.',
                visual: 'signs-motion',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Mixing frames mid-problem (flipping “up positive” halfway). Using v = v₀ + a t when a is not constant. Dropping the ½ in ½ a t². Treating the v² equation as direction-free and then assigning a random sign to Δx. Forgetting that “from rest” means v₀ = 0, not a = 0.',
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
                      'v₀ = 20 m/s, v = 0 (stopped), a = −4 m/s². Unknown: Δx. Time is unknown and unneeded.',
                  },
                  {
                    label: 'Choose the no-time equation',
                    content:
                      'Use v² = v₀² + 2 a Δx. (If you only remembered Δx = v₀ t + ½ a t² you would first need t = (v − v₀)/a.)',
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
                    label: 'Sanity check',
                    content:
                      'Time to stop: t = (0 − 20)/(−4) = 5 s. Average speed while braking ≈ (20+0)/2 = 10 m/s, so distance ≈ 10·5 = 50 m. Consistent.',
                  },
                ],
                answer: '50 m',
              },
              {
                id: 'we-from-rest',
                title: 'Speed after constant boost',
                problem: 'From rest, a = 2 m/s² for 5 s. Find final speed and distance traveled.',
                steps: [
                  {
                    label: 'Translate words',
                    content: '“From rest” ⇒ v₀ = 0. Given a = 2 m/s², t = 5 s. Find v and Δx.',
                  },
                  {
                    label: 'Final speed',
                    content: 'v = v₀ + a t = 0 + 2·5 = 10 m/s.',
                  },
                  {
                    label: 'Distance',
                    content:
                      'Δx = v₀ t + ½ a t² = 0 + ½·2·25 = 25 m. (Check: v² = v₀² + 2 a Δx ⇒ 100 = 0 + 4 Δx ⇒ Δx = 25 m.)',
                  },
                ],
                answer: '10 m/s after 25 m',
              },
              {
                id: 'we-freefall',
                title: 'Drop time (free fall)',
                problem:
                  'A ball is dropped from rest from a height of 20 m. Take down as positive and g = 10 m/s². How long to hit the ground?',
                steps: [
                  {
                    label: 'Set signs',
                    content:
                      'Down positive ⇒ a = +10 m/s², v₀ = 0, Δx = +20 m. Unknown: t.',
                  },
                  {
                    label: 'Choose equation',
                    content:
                      'Δx = v₀ t + ½ a t² → 20 = 0 + ½·10·t² = 5 t².',
                  },
                  {
                    label: 'Solve',
                    content: 't² = 4 → t = 2 s (take the positive root for elapsed time).',
                  },
                  {
                    label: 'Check with speed',
                    content:
                      'Impact speed v = 0 + 10·2 = 20 m/s. Then v² = 400 and 2 a Δx = 2·10·20 = 400 — matches.',
                  },
                ],
                answer: '2 s',
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
              {
                id: 'q-kin-4',
                prompt: 'Dropped from rest, down positive, Δx = ½ g t². If g = 10 m/s² and Δx = 45 m, t is…',
                choices: ['1.5 s', '3 s', '4.5 s', '9 s'],
                correctIndex: 1,
                explanation: '45 = 5 t² ⇒ t² = 9 ⇒ t = 3 s.',
              },
              {
                id: 'q-kin-5',
                prompt: 'You know v₀, v, and a, but not t or Δx. Fastest path to Δx?',
                choices: [
                  'Only Δx = v₀ t + ½ a t² (must find t first)',
                  'v² = v₀² + 2 a Δx',
                  'Average speed is always v₀',
                  'You cannot find Δx without t',
                ],
                correctIndex: 1,
                explanation: 'The v² equation gives Δx directly when time is missing.',
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
            objectives: [
              {
                id: 'net-force',
                title: 'State ΣF = ma',
                summary:
                  'Treat Newton’s second law as a vector statement about the net force, not a single “the force.”',
                sectionHint: 'Net force, not “the” force',
                demo: 'free-body',
              },
              {
                id: 'draw-fbd',
                title: 'Draw a clean FBD',
                summary:
                  'Sketch only forces acting on the chosen body — no velocity arrows disguised as forces.',
                sectionHint: 'FBD discipline',
                demo: 'free-body',
              },
              {
                id: 'component-eqs',
                title: 'Write component equations',
                summary:
                  'Write ΣFₓ = maₓ and ΣFᵧ = maᵧ with a consistent axis choice.',
                sectionHint: 'Why FBDs before algebra',
              },
              {
                id: 'solve-body',
                title: 'Solve a single-body case',
                summary:
                  'Solve a horizontal or vertical problem, including a simple elevator/cable tension case.',
                sectionHint: 'Weight vs mass',
                demo: 'free-body',
              },
            ],
            sections: [
              {
                heading: 'Net force, not “the” force',
                body:
                  'Picture a tug-of-war: many ropes, one net effect. Newton’s second law is about that total, not a single celebrity force. Individual agents (push, weight, normal, tension, friction) each contribute an arrow on the FBD; acceleration responds only to the sum. We write ΣF = m a for that idea. Mass m measures inertia — how stubborn velocity is against change — and is not itself a force.',
                visual: 'net-force',
              },
              {
                heading: 'Why FBDs before algebra',
                body:
                  'Most mistakes are missing or double-counted forces, not arithmetic. Isolating one body and drawing every force that touches it forces you to name the interactions. Only after the diagram do you resolve into components and write ΣF = ma. If you skip the picture, you are guessing which terms belong in the sum.',
              },
              {
                heading: 'FBD discipline',
                body:
                  'Isolate one body. Draw every force as an arrow on that body (not on neighbors). Resolve into components along axes you choose. Then write ΣFₓ = m aₓ and ΣFᵧ = m aᵧ. If the body does not accelerate vertically, ΣFᵧ = 0 is still an equation — it often finds a normal force. Never draw “ma” as an extra force on the FBD; ma is what ΣF equals.',
                visual: 'fbd-block',
              },
              {
                heading: 'Weight vs mass',
                body:
                  'Weight is the gravitational force mg (near Earth), directed toward the ground. Mass is the scalar in ΣF = m a. In an elevator, your weight mg still points down; the scale reading is the normal force, which equals mg only when a = 0.',
                visual: 'weight-mass',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Putting ma on the FBD as if it were a force. Omitting weight or the normal. Using ΣF = m a with F as a single contact force while ignoring friction or other contributors. Mixing “up positive” for forces with a different convention for a.',
              },
            ],
            workedExamples: [
              {
                id: 'we-n2',
                title: 'Horizontal push',
                problem: 'A 5 kg block on a frictionless surface is pushed by 15 N. Find a.',
                steps: [
                  {
                    label: 'FBD',
                    content:
                      'Horizontal: only the 15 N push (frictionless). Vertical: weight mg down and normal N up, with aᵧ = 0 so N = mg.',
                  },
                  {
                    label: 'Net force',
                    content:
                      'ΣFₓ = 15 N, ΣFᵧ = 0. No other horizontal forces appear on a frictionless surface.',
                  },
                  {
                    label: 'Apply ΣFₓ = m aₓ',
                    content: '15 N = (5 kg) a → a = 3 m/s² in the direction of the push.',
                  },
                  {
                    label: 'Check units',
                    content: 'N = kg·m/s², so 15/5 = 3 m/s² — units consistent.',
                  },
                ],
                answer: '3 m/s²',
              },
              {
                id: 'we-n2-weight',
                title: 'Elevator cable tension',
                problem:
                  'A 10 kg mass accelerates upward at 2 m/s². Find tension T in the supporting cable (use g = 10 m/s² for easy numbers).',
                steps: [
                  {
                    label: 'FBD and axis',
                    content: 'Up: T. Down: mg = 100 N. Take up as positive so a = +2 m/s².',
                  },
                  {
                    label: 'Write ΣF = ma',
                    content: 'ΣFᵧ = T − mg = m a → T − 100 = 10·2.',
                  },
                  {
                    label: 'Solve',
                    content: 'T − 100 = 20 → T = 120 N.',
                  },
                  {
                    label: 'Interpret',
                    content:
                      'T > mg when accelerating up — matches the “heavier in an elevating elevator” feeling. If a were zero, T would equal mg = 100 N.',
                  },
                ],
                answer: '120 N',
              },
              {
                id: 'we-n2-down',
                title: 'Elevator accelerating down',
                problem:
                  'Same 10 kg mass, now accelerating downward at 2 m/s². Find T (g = 10 m/s², up positive).',
                steps: [
                  {
                    label: 'Same FBD, new a',
                    content: 'Up positive ⇒ a = −2 m/s². Forces unchanged: T up, mg = 100 N down.',
                  },
                  {
                    label: 'ΣF = ma',
                    content: 'T − 100 = 10·(−2) = −20 → T = 80 N.',
                  },
                  {
                    label: 'Interpret',
                    content:
                      'T < mg when accelerating down — you feel “lighter.” Free fall (a = −g) would make T = 0.',
                  },
                ],
                answer: '80 N',
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
              {
                id: 'q-n2-3',
                prompt: 'Elevator cable, mass m accelerating upward at a. Tension is…',
                choices: ['mg', 'm a', 'm(g + a)', 'm(g − a)'],
                correctIndex: 2,
                explanation: 'Up positive: T − mg = m a ⇒ T = m(g + a).',
              },
              {
                id: 'q-n2-4',
                prompt: 'If ΣF = 0 on a particle, then…',
                choices: [
                  'Velocity must be zero',
                  'Acceleration is zero (constant velocity, including rest)',
                  'Mass must be zero',
                  'The particle must be on the ground',
                ],
                correctIndex: 1,
                explanation: 'ΣF = 0 ⇒ a = 0; velocity can be any constant, including zero.',
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
    bigIdea: courseBigIdeas.statics,
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
            objectives: [
              {
                id: 'resolve-force',
                title: 'Resolve into components',
                summary:
                  'Convert magnitude and angle into Fₓ, Fᵧ with a clear angle reference.',
                sectionHint: 'Angle reference first',
                demo: 'force-components',
              },
              {
                id: 'sum-components',
                title: 'Sum concurrent forces',
                summary:
                  'Add planar forces by components: Rₓ = ΣFₓ, Rᵧ = ΣFᵧ.',
                sectionHint: 'Components and resultant',
                demo: 'force-components',
              },
              {
                id: 'rebuild-resultant',
                title: 'Rebuild |R| and θ',
                summary:
                  'Recover magnitude and direction with the correct quadrant for θ.',
                sectionHint: 'Components and resultant',
              },
              {
                id: 'no-add-mags',
                title: 'Avoid adding magnitudes',
                summary:
                  'Never add force magnitudes unless the forces are collinear and same-sense.',
                sectionHint: 'Common mistakes',
              },
            ],
            sections: [
              {
                heading: 'Why components',
                body:
                  'Tip-to-tail arrows work for two forces; with three or more the sketch turns into spaghetti. A cleaner habit: break every force into east–west and north–south pieces, add those ordinary numbers, then rebuild one arrow that tells the same story. That rebuilt arrow is the resultant. Components are the everyday language of statics software and hand calculations alike.',
              },
              {
                heading: 'Angle reference first',
                body:
                  'Cos and sin only mean what you think if the angle is measured from the axis you claimed. The usual formulas Fₓ = F cos θ and Fᵧ = F sin θ assume θ from +x, counterclockwise positive. If a problem says “30° above the −x axis,” sketch before plugging in — the reference is not the default. Wrong reference is the #1 source of sign errors.',
                visual: 'vector-resolve',
              },
              {
                heading: 'Components and resultant',
                body:
                  'With a consistent θ: Fₓ = F cos θ, Fᵧ = F sin θ. Then Rₓ = Σ Fₓ, Rᵧ = Σ Fᵧ; |R| = √(Rₓ² + Rᵧ²); θ_R = atan2(Rᵧ, Rₓ) so the quadrant is correct. Concurrent forces (lines of action through one point) need no moment bookkeeping for the resultant force alone.',
                visual: 'resultant',
              },
              {
                heading: 'Special cases worth memorizing',
                body:
                  'Two equal perpendicular forces of magnitude F give |R| = F√2 at 45° between them. Equal-and-opposite collinear forces cancel. Three forces at 120° of equal magnitude sum to zero — a quick check for “balanced” planar sets.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Using degrees in a calculator set to radians (or vice versa). Taking atan(Rᵧ/Rₓ) and ignoring quadrant (e.g. both components negative). Adding magnitudes instead of components. Forgetting that a force at 180° has Fₓ = −F, not +F.',
              },
            ],
            workedExamples: [
              {
                id: 'we-res',
                title: 'Two-force resultant',
                problem: 'F₁ = 100 N at 0°, F₂ = 100 N at 90°. Find R.',
                steps: [
                  {
                    label: 'Resolve each force',
                    content:
                      'F₁ along +x: (100, 0) N. F₂ along +y: (0, 100) N.',
                  },
                  {
                    label: 'Sum components',
                    content: 'Rₓ = 100 + 0 = 100 N, Rᵧ = 0 + 100 = 100 N.',
                  },
                  {
                    label: 'Magnitude',
                    content:
                      '|R| = √(100² + 100²) = 100√2 N ≈ 141.4 N.',
                  },
                  {
                    label: 'Direction',
                    content:
                      'θ = atan2(100, 100) = 45° from +x. Both components positive ⇒ first quadrant — no ambiguity.',
                  },
                ],
                answer: '100√2 N at 45°',
              },
              {
                id: 'we-res-3',
                title: 'Three concurrent forces (components)',
                problem:
                  'Forces 30 N at 0°, 40 N at 90°, and 50 N at 180°. Find Rₓ, Rᵧ, and |R|.',
                steps: [
                  {
                    label: 'List components',
                    content:
                      '(30, 0) + (0, 40) + (−50, 0). Note 180° ⇒ cos 180° = −1.',
                  },
                  {
                    label: 'Sum',
                    content: 'Rₓ = 30 − 50 = −20 N, Rᵧ = 40 N.',
                  },
                  {
                    label: 'Magnitude',
                    content:
                      '|R| = √((−20)² + 40²) = √(400 + 1600) = √2000 = 20√5 N ≈ 44.7 N.',
                  },
                  {
                    label: 'Interpret',
                    content:
                      'Resultant points left and up (second quadrant). Rough angle: atan(40/20) = atan(2) above the −x axis.',
                  },
                ],
                answer: 'Rₓ = −20 N, Rᵧ = 40 N (|R| = 20√5 N)',
              },
              {
                id: 'we-res-angle',
                title: 'Force not on an axis',
                problem: 'A 50 N force acts at 30° above +x. Find Fₓ and Fᵧ.',
                steps: [
                  {
                    label: 'Confirm reference',
                    content: 'θ = 30° from +x — standard convention applies.',
                  },
                  {
                    label: 'Compute',
                    content:
                      'Fₓ = 50 cos 30° = 50·(√3/2) = 25√3 N ≈ 43.3 N. Fᵧ = 50 sin 30° = 50·(1/2) = 25 N.',
                  },
                  {
                    label: 'Check',
                    content:
                      '√(Fₓ² + Fᵧ²) should recover 50: √(1875 + 625) = √2500 = 50 N.',
                  },
                ],
                answer: 'Fₓ = 25√3 N, Fᵧ = 25 N',
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
              {
                id: 'q-res-3',
                prompt: 'Rₓ = −3 N, Rᵧ = −3 N. The resultant lies in quadrant…',
                choices: ['I', 'II', 'III', 'IV'],
                correctIndex: 2,
                explanation: 'Both components negative ⇒ third quadrant.',
              },
              {
                id: 'q-res-4',
                prompt: 'Best first step when combining many planar forces?',
                choices: [
                  'Add all magnitudes',
                  'Resolve each into components, then sum',
                  'Ignore angles under 45°',
                  'Only keep the largest force',
                ],
                correctIndex: 1,
                explanation: 'Component method scales cleanly; magnitudes alone do not add as vectors.',
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
            objectives: [
              {
                id: 'why-particle',
                title: 'Why only ΣF = 0',
                summary:
                  'Explain why a particle needs only ΣFₓ = 0 and ΣFᵧ = 0 (no moments).',
                sectionHint: 'Particle vs rigid body',
                demo: 'particle-eq',
              },
              {
                id: 'fbd-knot',
                title: 'Draw the particle FBD',
                summary:
                  'Draw an FBD at a knot or pin treated as a particle with correct tension directions.',
                sectionHint: 'Setup strategy',
                demo: 'particle-eq',
              },
              {
                id: 'eq-eqs',
                title: 'Write equilibrium equations',
                summary:
                  'Write component equilibrium equations from the FBD.',
                sectionHint: 'Why equilibrium means zero net force',
              },
              {
                id: 'two-cable',
                title: 'Solve two-cable support',
                summary:
                  'Solve a hanging-mass two-cable problem for both tensions.',
                sectionHint: 'Setup strategy',
                demo: 'particle-eq',
              },
            ],
            sections: [
              {
                heading: 'Particle vs rigid body',
                body:
                  'A small ring or cable knot often does not need its physical size for the first analysis — only which forces pull on it. We call that idealization a particle: force balance matters; moments wait. A rigid body in 2D also needs ΣM = 0 — three equations total. This lesson stays with particles so you master force equations before moments enter.',
              },
              {
                heading: 'Why equilibrium means zero net force',
                body:
                  'If something sits still, the pushes and pulls on it cancel — otherwise it would start moving. That is equilibrium: net force zero. From Newton’s second law with a = 0 we write ΣF = 0. Statics is dynamics in that special case. Two planar components give two scalar equations — enough for two unknown magnitudes when directions are known (cables along known lines).',
                visual: 'particle-knot',
              },
              {
                heading: 'Setup strategy',
                body:
                  '(1) Cut free the particle/knot. (2) Draw every force: known loads plus unknown support magnitudes along known directions. (3) Pick axes. (4) Write ΣFₓ = 0 and ΣFᵧ = 0. (5) Solve the linear system. Count unknowns: two independent equations support two unknowns in a well-posed planar particle problem.',
                visual: 'particle-knot',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Resolving tensions with the wrong angle reference (using the complement by accident). Writing only one equilibrium equation when two unknowns remain. Drawing both cable tensions with the same x-sign when they pull opposite ways. Treating a continuous cable over a frictionless pulley as two independent directions without a free-body cut.',
              },
            ],
            workedExamples: [
              {
                id: 'we-particle',
                title: 'Hanging mass, two cables',
                problem:
                  'A 100 N weight hangs from two cables at 30° and 60° to the horizontal. Find tensions T₁ (30° side) and T₂ (60° side).',
                steps: [
                  {
                    label: 'FBD at the knot',
                    content:
                      'Three forces: T₁ at 30° to horizontal, T₂ at 60°, and weight 100 N downward. Take T₁ on the shallow side pulling up-and-out one way, T₂ the other.',
                  },
                  {
                    label: 'Resolve into components',
                    content:
                      'T₁ₓ = T₁ cos 30°, T₁ᵧ = T₁ sin 30°; T₂ₓ = T₂ cos 60°, T₂ᵧ = T₂ sin 60°. Weight: (0, −100). Opposing horizontal components cancel in equilibrium.',
                  },
                  {
                    label: 'Equilibrium equations',
                    content:
                      'ΣFₓ: T₁ cos 30° − T₂ cos 60° = 0. ΣFᵧ: T₁ sin 30° + T₂ sin 60° − 100 = 0.',
                  },
                  {
                    label: 'Relate T₁ and T₂',
                    content:
                      'From ΣFₓ: T₁ (√3/2) = T₂ (1/2) → T₂ = T₁ √3.',
                  },
                  {
                    label: 'Solve ΣFᵧ',
                    content:
                      'T₁ (1/2) + (T₁ √3)(√3/2) − 100 = 0 → T₁/2 + 3 T₁/2 = 100 → 2 T₁ = 100 → T₁ = 50 N, T₂ = 50√3 N.',
                  },
                  {
                    label: 'Check',
                    content:
                      'Steeper cable (60°) carries larger tension. Vertical: 50·0.5 + 50√3·(√3/2) = 25 + 75 = 100 N.',
                  },
                ],
                answer: 'T₁ = 50 N, T₂ = 50√3 N',
              },
              {
                id: 'we-particle-sym',
                title: 'Symmetric cables',
                problem:
                  'A 200 N weight hangs from two cables, each at 45° to the horizontal (symmetric). Find each tension T.',
                steps: [
                  {
                    label: 'Symmetry',
                    content:
                      'Identical angles and shared load ⇒ the two tensions are equal. Call each T.',
                  },
                  {
                    label: 'Vertical balance',
                    content:
                      'ΣFᵧ: 2 · T sin 45° − 200 = 0 → 2 T (√2/2) = 200 → T√2 = 200.',
                  },
                  {
                    label: 'Solve',
                    content: 'T = 200/√2 = 100√2 N ≈ 141 N.',
                  },
                  {
                    label: 'Horizontal check',
                    content:
                      'ΣFₓ: T cos 45° − T cos 45° = 0 automatically — symmetry already satisfied horizontal balance.',
                  },
                ],
                answer: 'T = 100√2 N each',
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
              {
                id: 'q-eq-3',
                prompt: 'For a hanging mass on two cables, the steeper cable generally…',
                choices: [
                  'Carries less tension',
                  'Carries more tension',
                  'Carries zero tension',
                  'Must be vertical',
                ],
                correctIndex: 1,
                explanation:
                  'The steeper cable contributes more vertical support per unit tension and usually a larger share of the load.',
              },
              {
                id: 'q-eq-4',
                prompt: 'If ΣFₓ = 0 and ΣFᵧ = 0 for a particle, then…',
                choices: [
                  'It must be moving',
                  'Net force is zero',
                  'Each individual force is zero',
                  'Moments about every point are automatically nonzero',
                ],
                correctIndex: 1,
                explanation: 'Zero net force is the particle equilibrium condition.',
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
    bigIdea: courseBigIdeas.circuits,
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
            objectives: [
              {
                id: 'derive-divider',
                title: 'Derive the divider',
                summary:
                  'Derive the unloaded divider from Ohm’s law and KVL: Vout = Vin · R₂/(R₁+R₂).',
                sectionHint: 'Derive the formula',
                demo: 'voltage-divider',
              },
              {
                id: 'compute-vout',
                title: 'Compute Vout',
                summary:
                  'Plug in Vin, R₁, R₂ and get the unloaded output voltage.',
                sectionHint: 'Derive the formula',
                demo: 'voltage-divider',
              },
              {
                id: 'ratio-vs-scale',
                title: 'Ratio vs absolute scale',
                summary:
                  'Explain why the ratio sets the fraction while absolute R values set current and stiffness.',
                sectionHint: 'Ratio vs scale',
              },
              {
                id: 'loading',
                title: 'Spot loading effects',
                summary:
                  'Recognize when a load on Vout invalidates the unloaded divider formula.',
                sectionHint: 'Loading in one line',
                demo: 'voltage-divider',
              },
            ],
            sections: [
              {
                heading: 'Series intuition',
                body:
                  'The same current flows through series resistors (one path). Larger resistance drops a larger share of Vin — voltage divides in proportion to resistance. Think of a height drop along a chain of steps: the taller step takes more of the total drop.',
                visual: 'series-resistors',
              },
              {
                heading: 'Derive the formula',
                body:
                  'Vin across R₁ then R₂ to ground. KVL: Vin = I R₁ + I R₂ = I(R₁+R₂), so I = Vin/(R₁+R₂). Vout across R₂ is I·R₂ = Vin · R₂/(R₁+R₂). Swap the numerator if you measure across R₁ instead. The unloaded assumption means nothing else is attached at the Vout node.',
                visual: 'divider-formula',
              },
              {
                heading: 'Ratio vs scale',
                body:
                  'The fraction R₂/(R₁+R₂) sets Vout/Vin. Absolute values set current I = Vin/(R₁+R₂) and therefore power burn I²R. A “stiff” divider uses smaller resistors (more current) so a moderate load in parallel with R₂ does not drag Vout down as much — at the cost of battery drain and heat.',
              },
              {
                heading: 'Loading in one line',
                body:
                  'A load R_L from Vout to ground sits in parallel with R₂. The bottom resistance becomes R₂∥R_L < R₂, so Vout falls. Rule of thumb: if R_L ≫ R₂ (say 10× or more), the unloaded formula is a decent approximation; if not, recompute with the parallel combination.',
                visual: 'loading',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Putting the wrong resistor in the numerator. Assuming the formula still holds exactly with a heavy load on Vout. Mixing kΩ and Ω mid-equation. Thinking equal resistors always give Vin/2 even after a load attaches.',
              },
            ],
            workedExamples: [
              {
                id: 'we-div',
                title: 'Half-rail divider',
                problem: 'Vin = 10 V, R₁ = 2 kΩ, R₂ = 2 kΩ. Find Vout across R₂ and the series current.',
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
                    label: 'Current',
                    content: 'I = Vin/(R₁+R₂) = 10/(4000 Ω) = 2.5 mA.',
                  },
                  {
                    label: 'Power check (optional)',
                    content:
                      'Each resistor dissipates I²R = (0.0025)²·2000 = 12.5 mW; total 25 mW = Vin·I.',
                  },
                ],
                answer: '5 V (I = 2.5 mA)',
              },
              {
                id: 'we-div-unequal',
                title: 'Unequal divider',
                problem: 'Vin = 12 V, R₁ = 1 kΩ, R₂ = 3 kΩ. Vout across R₂?',
                steps: [
                  {
                    label: 'Write the fraction',
                    content: 'R₂/(R₁+R₂) = 3/(1+3) = 3/4.',
                  },
                  {
                    label: 'Compute Vout',
                    content: 'Vout = 12 · 3/4 = 9 V.',
                  },
                  {
                    label: 'Cross-check with current',
                    content:
                      'I = 12/4000 = 3 mA; V₂ = I R₂ = 0.003·3000 = 9 V. Same answer.',
                  },
                ],
                answer: '9 V',
              },
              {
                id: 'we-div-load',
                title: 'Loaded divider (idea)',
                problem:
                  'Vin = 10 V, R₁ = R₂ = 2 kΩ, and a load R_L = 2 kΩ attaches across R₂. Approximate new Vout.',
                steps: [
                  {
                    label: 'Parallel bottom',
                    content:
                      'R₂∥R_L = (2k∥2k) = 1 kΩ. Top still R₁ = 2 kΩ.',
                  },
                  {
                    label: 'New divider',
                    content:
                      'Vout = 10 · (1k)/(2k+1k) = 10/3 ≈ 3.33 V — down from the unloaded 5 V.',
                  },
                  {
                    label: 'Takeaway',
                    content:
                      'A load comparable to R₂ significantly pulls Vout down. Design with R_L ≫ R₂ or buffer with an op-amp.',
                  },
                ],
                answer: '≈ 3.33 V',
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
              {
                id: 'q-div-3',
                prompt: 'Vin = 10 V, R₁ = 3 kΩ, R₂ = 1 kΩ. Unloaded Vout across R₂?',
                choices: ['1 V', '2.5 V', '7.5 V', '10 V'],
                correctIndex: 1,
                explanation: 'Vout = 10 · 1/(3+1) = 2.5 V.',
              },
              {
                id: 'q-div-4',
                prompt: 'A heavy load on Vout (small R_L across R₂) tends to…',
                choices: [
                  'Raise Vout',
                  'Lower Vout versus the unloaded prediction',
                  'Leave Vout exactly Vin/2 always',
                  'Violate Ohm’s law',
                ],
                correctIndex: 1,
                explanation: 'R₂∥R_L < R₂ shrinks the bottom fraction, so Vout drops.',
              },
            ],
          },
          {
            id: 'circuits:kcl-kvl',
            title: 'KCL and KVL',
            summary:
              'Charge and energy conservation as circuit laws — KCL at nodes, KVL around loops — with a first single-loop solve.',
            objectives: [
              {
                id: 'state-laws',
                title: 'State KCL and KVL',
                summary:
                  'Phrase KCL and KVL as conservation of charge and energy around a node or loop.',
                sectionHint: 'KCL — charge conservation',
                demo: 'kvl-loop',
              },
              {
                id: 'write-eqs',
                title: 'Write node and loop equations',
                summary:
                  'Write KCL at a simple node and KVL around a loop with a consistent sign convention.',
                sectionHint: 'KVL — energy conservation',
                demo: 'kvl-loop',
              },
              {
                id: 'solve-loop',
                title: 'Solve a single-loop circuit',
                summary:
                  'Combine Ohm’s law with KVL to find current and drops in a resistive loop.',
                sectionHint: 'How they work together',
              },
              {
                id: 'kvl-check',
                title: 'Check with KVL',
                summary:
                  'After solving, verify that the sum of drops equals the source.',
                sectionHint: 'Sign conventions worth locking in',
                demo: 'kvl-loop',
              },
            ],
            sections: [
              {
                heading: 'KCL — charge conservation',
                body:
                  'Think plumbing: at a pipe junction, what flows in must flow out — ideal wires do not store charge. That is Kirchhoff’s Current Law (KCL). At a node, current in equals current out (equivalently: the algebraic sum of currents leaving the node is zero). Pick “leaving positive” or “entering positive” and stay consistent for every term.',
                visual: 'kcl-node',
              },
              {
                heading: 'KVL — energy conservation',
                body:
                  'Think hiking: walk a closed trail and your net altitude change is zero — you end where you began. Kirchhoff’s Voltage Law (KVL) is that idea for electric potential. Around any closed loop, the signed sum of voltage rises and drops is zero. Traverse once; add rises and drops with one rule (e.g. + when going from − to + through a source, − when going with the current through a resistor).',
                visual: 'kvl-loop-viz',
              },
              {
                heading: 'How they work together',
                body:
                  'Ohm’s law relates V and I on each resistor (V = IR with passive sign convention). KCL/KVL supply the topology constraints from how elements are wired. A single series loop often needs only one KVL equation to find the loop current; then V = IR on each element. Nodes with multiple branches need KCL to relate branch currents.',
              },
              {
                heading: 'Sign conventions worth locking in',
                body:
                  'For resistors, the voltage drop is in the direction of assumed current. If your computed I comes out negative, the actual current is opposite your assumed arrow — the math is fine; flip the arrow in your mental picture. Inconsistent signs around a loop are the usual reason KVL “doesn’t close.”',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Inconsistent voltage signs around a loop. Writing KCL with mixed “into” and “out of” without converting. Applying KVL to an open path. Forgetting that series elements share one current while parallel elements share one voltage.',
              },
            ],
            workedExamples: [
              {
                id: 'we-kvl',
                title: 'Single-loop circuit',
                problem: '12 V source in series with 3 Ω and 1 Ω. Find loop current and voltage on the 3 Ω resistor.',
                steps: [
                  {
                    label: 'Assume a current direction',
                    content:
                      'Let I flow out of the source + terminal through the 3 Ω then the 1 Ω and back.',
                  },
                  {
                    label: 'Write KVL',
                    content:
                      'Starting at the source − terminal and going with the current: +12 − 3I − 1I = 0.',
                  },
                  {
                    label: 'Solve for I',
                    content: '12 = 4I → I = 3 A.',
                  },
                  {
                    label: 'Element voltages',
                    content: 'V₃Ω = 3I = 9 V; V₁Ω = 1·I = 3 V.',
                  },
                  {
                    label: 'KVL check',
                    content: '9 + 3 = 12 V — drops sum to the source. Good.',
                  },
                ],
                answer: 'I = 3 A (9 V on the 3 Ω)',
              },
              {
                id: 'we-kcl',
                title: 'Simple node (KCL)',
                problem:
                  'Three wires meet at a node. Currents into the node: 2 A and 3 A. One wire leaves with unknown I_out. Find I_out.',
                steps: [
                  {
                    label: 'State KCL',
                    content:
                      'Sum of currents into the node equals sum leaving (steady state).',
                  },
                  {
                    label: 'Apply',
                    content: '2 + 3 = I_out → I_out = 5 A.',
                  },
                  {
                    label: 'Algebraic form',
                    content:
                      'If “leaving positive”: −2 − 3 + I_out = 0 → same result. Convention choice does not change physics.',
                  },
                ],
                answer: '5 A',
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
              {
                id: 'q-kvl-3',
                prompt: '12 V series with 4 Ω total resistance. Loop current?',
                choices: ['0.3 A', '3 A', '12 A', '48 A'],
                correctIndex: 1,
                explanation: 'I = V/R = 12/4 = 3 A.',
              },
              {
                id: 'q-kvl-4',
                prompt: 'Two currents of 1 A and 4 A enter a node; one wire leaves. Leaving current is…',
                choices: ['3 A', '5 A', '4 A', '0'],
                correctIndex: 1,
                explanation: 'KCL: 1 + 4 = 5 A leaving.',
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
    bigIdea: courseBigIdeas.thermo,
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
            objectives: [
              {
                id: 'pvnrt',
                title: 'Use PV = nRT',
                summary:
                  'Apply the ideal-gas law with consistent units and absolute temperature.',
                sectionHint: 'Equation of state',
                demo: 'ideal-gas',
              },
              {
                id: 'abs-temp',
                title: 'Convert to kelvin',
                summary:
                  'Always convert °C → K before substituting into PV = nRT or process ratios.',
                sectionHint: 'Why absolute temperature',
                demo: 'ideal-gas',
              },
              {
                id: 'named-proc',
                title: 'Specialize processes',
                summary:
                  'Use PV = const (isothermal), P/T = const (isochoric), V/T = const (isobaric).',
                sectionHint: 'Named processes',
                demo: 'ideal-gas',
              },
              {
                id: 'unit-r',
                title: 'Match R to units',
                summary:
                  'Catch mismatches between the gas constant R and the units of P and V.',
                sectionHint: 'Common mistakes',
              },
            ],
            sections: [
              {
                heading: 'Model idea',
                body:
                  'Pretend gas molecules are tiny billiard balls that ignore each other’s attractions and take up no volume. That fiction — the ideal gas — is surprisingly accurate for many dilute gases far from liquefaction. An equation of state then ties four bookkeeping quantities (P, V, n, T) so any three determine the fourth. It is a constitutive model for design estimates, not a claim that all matter behaves this way.',
              },
              {
                heading: 'Equation of state',
                body:
                  'Once the model is acceptable, the bookkeeping relation is PV = nRT with T on an absolute scale (Kelvin). Common R ≈ 8.314 J/(mol·K) when P·V is in joules (Pa·m³). Other unit systems need a matching R (e.g. 0.0821 L·atm/(mol·K)). Intensive forms use per-mole or per-mass constants — do not mix those bases in one equation.',
                visual: 'pvt-state',
              },
              {
                heading: 'Why absolute temperature',
                body:
                  'T = 0 in PV = nRT is absolute zero, not 0 °C. Using Celsius would claim zero pressure at the ice point, which is false. Always convert: T(K) = T(°C) + 273.15 (or +273 for rough work).',
              },
              {
                heading: 'Named processes',
                body:
                  'Isothermal (T fixed): PV = const for fixed n. Isochoric (V fixed): P/T = const. Isobaric (P fixed): V/T = const. Name the constraint first, then cancel the fixed symbols in PV = nRT. Real devices only approximate these ideals, but the limits organize problem solving.',
                visual: 'named-process',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Using Celsius in PV = nRT. Mixing R = 8.314 with pressure in atm and volume in liters without the matching R. Treating “constant pressure” as constant volume. Forgetting n (or mass) when comparing two states.',
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
                    label: 'Substitute',
                    content:
                      'P = (1)(8.314)(300)/0.0821 = 2494.2 / 0.0821.',
                  },
                  {
                    label: 'Compute',
                    content: 'P ≈ 30,380 Pa ≈ 30.4 kPa.',
                  },
                  {
                    label: 'Units check',
                    content:
                      'J = N·m, so J/m³ = N/m² = Pa. The units hang together with this R.',
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
                    label: 'Identify process',
                    content: 'Isothermal ⇒ T fixed ⇒ for fixed n, P₁V₁ = P₂V₂.',
                  },
                  {
                    label: 'Solve',
                    content: 'P₂ = P₁ V₁/V₂ = 100 · (2/1) = 200 kPa.',
                  },
                  {
                    label: 'Intuition',
                    content:
                      'Halving volume at fixed T doubles pressure — Boyle’s law special case of the ideal gas law.',
                  },
                ],
                answer: '200 kPa',
              },
              {
                id: 'we-ig-temp',
                title: 'Isochoric heat-up',
                problem:
                  'Gas in a rigid tank (V fixed) at 300 K and 200 kPa is heated to 600 K. Find P₂.',
                steps: [
                  {
                    label: 'Constraint',
                    content: 'Rigid tank ⇒ V fixed, n fixed ⇒ P/T = const ⇒ P₂/P₁ = T₂/T₁.',
                  },
                  {
                    label: 'Compute',
                    content: 'P₂ = 200 · (600/300) = 400 kPa.',
                  },
                  {
                    label: 'Note',
                    content:
                      'Temperatures were already absolute. If they had been 27 °C and 327 °C, you would convert first — the ratio (327+273)/(27+273) is the same 600/300 here.',
                  },
                ],
                answer: '400 kPa',
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
              {
                id: 'q-ig-3',
                prompt: 'Isothermal compression of an ideal gas to half volume…',
                choices: [
                  'Halves pressure',
                  'Doubles pressure',
                  'Leaves pressure unchanged',
                  'Zeros pressure',
                ],
                correctIndex: 1,
                explanation: 'PV = const ⇒ P₂ = P₁ (V₁/V₂) = 2 P₁.',
              },
              {
                id: 'q-ig-4',
                prompt: '25 °C in an ideal-gas calculation should be entered as…',
                choices: ['25 K', '298 K (approx)', '0 K', '77 K'],
                correctIndex: 1,
                explanation: 'T(K) ≈ 25 + 273 = 298 K.',
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
            objectives: [
              {
                id: 'energy-bal',
                title: 'Apply energy balance',
                summary:
                  'Write a closed-system energy balance with a stated sign convention for Q and W.',
                sectionHint: 'Energy balance',
                demo: 'first-law',
              },
              {
                id: 'read-signs',
                title: 'Interpret Q, W, ΔU',
                summary:
                  'Read Q in, W out, and ΔU in words under your chosen convention.',
                sectionHint: 'Reading the signs',
                demo: 'first-law',
              },
              {
                id: 'cycle-du',
                title: 'Use ΔU_cycle = 0',
                summary:
                  'Relate net heat and net work over a cycle because state functions return to start.',
                sectionHint: 'Energy balance',
              },
              {
                id: 'carnot',
                title: 'Compute Carnot efficiency',
                summary:
                  'Evaluate η_C = 1 − T_C/T_H with absolute temperatures only.',
                sectionHint: 'Why Carnot is a ceiling',
                demo: 'first-law',
              },
            ],
            sections: [
              {
                heading: 'Energy balance',
                body:
                  'Treat energy like a bank account for a closed system (no mass in or out). Heat in is a deposit; work out is a withdrawal; the balance is internal energy U. This course writes ΔU = Q − W with that story: Q positive when heat enters, W positive when the system does work on the surroundings. Other books flip the work sign — always check the local convention before copying a formula.',
                visual: 'energy-balance',
              },
              {
                heading: 'Reading the signs',
                body:
                  'Heat in tends to raise stored energy U or pay for work out. Work out without heat in depletes U. If both Q and W are 10 kJ with our convention, ΔU = 0 — energy throughput with no storage change. Cycles return to the same state, so ΔU_cycle = 0 and therefore W_net = Q_net over a full cycle.',
              },
              {
                heading: 'Why Carnot is a ceiling',
                body:
                  'Between a hot reservoir at T_H and a cold reservoir at T_C (absolute), no heat engine is more efficient than η_C = 1 − T_C/T_H. The result follows from the second law; treat it as a hard upper bound set by the two temperatures. Real engines fall short because of friction, heat leaks, and finite-temperature-difference transfers.',
                visual: 'carnot',
              },
              {
                heading: 'Closed vs open systems',
                body:
                  'Closed-system ΔU = Q − W is not the whole story for turbines and nozzles, where mass flows and enthalpy appears. If mass crosses the boundary, you need an open-system (control volume) balance — flagged here so you do not force ΔU = Q − W onto a steady-flow device.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Mixing °C into η_C. Using η = T_C/T_H instead of 1 − T_C/T_H. Flipping the work sign relative to the stated convention. Applying ΔU = Q − W to an open device without enthalpy/flow work terms.',
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
                    content: 'Both given in kelvin — good to use directly.',
                  },
                  {
                    label: 'Apply Carnot formula',
                    content: 'η_C = 1 − T_C/T_H = 1 − 300/600 = 0.5.',
                  },
                  {
                    label: 'Report',
                    content: 'Maximum efficiency is 50%. Any real engine between these reservoirs is strictly less.',
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
                    label: 'Recall convention',
                    content: 'ΔU = Q − W with W out positive.',
                  },
                  {
                    label: 'Substitute',
                    content: 'ΔU = 20 − 5 = 15 kJ.',
                  },
                  {
                    label: 'Interpret',
                    content:
                      'Of the 20 kJ heat in, 5 kJ left as work and 15 kJ stayed as increased internal energy.',
                  },
                ],
                answer: '15 kJ',
              },
              {
                id: 'we-cycle',
                title: 'Cycle energy',
                problem:
                  'A heat engine cycle absorbs Q_H = 100 kJ and rejects Q_C = 60 kJ per cycle. Find W_net.',
                steps: [
                  {
                    label: 'Cycle fact',
                    content: 'ΔU_cycle = 0 ⇒ W_net = Q_net = Q_H − Q_C for a standard engine accounting.',
                  },
                  {
                    label: 'Compute',
                    content: 'W_net = 100 − 60 = 40 kJ per cycle.',
                  },
                  {
                    label: 'Efficiency',
                    content: 'η = W_net/Q_H = 40/100 = 40% (compare to Carnot only if T_H, T_C are known).',
                  },
                ],
                answer: '40 kJ/cycle',
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
              {
                id: 'q-carnot-3',
                prompt: 'Raising T_H while holding T_C fixed…',
                choices: [
                  'Lowers Carnot efficiency',
                  'Raises Carnot efficiency',
                  'Leaves η_C unchanged',
                  'Makes η_C negative',
                ],
                correctIndex: 1,
                explanation: 'η_C = 1 − T_C/T_H increases as T_H increases.',
              },
              {
                id: 'q-carnot-4',
                prompt: 'Over a full thermodynamic cycle, ΔU is…',
                choices: ['Equal to Q_H', 'Zero', 'Equal to W_net always numerically without signs', 'Undefined'],
                correctIndex: 1,
                explanation: 'State function U returns to the start ⇒ ΔU_cycle = 0.',
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
    bigIdea: courseBigIdeas.materials,
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
            objectives: [
              {
                id: 'stress-strain-def',
                title: 'Compute σ and ε',
                summary:
                  'Calculate engineering stress σ = F/A₀ and strain ε = ΔL/L₀ from measured force and elongation.',
                sectionHint: 'Definitions',
                demo: 'stress-strain',
              },
              {
                id: 'hooke',
                title: 'Use Hooke’s law',
                summary:
                  'Apply σ = Eε in the linear elastic range with consistent units for E.',
                sectionHint: 'Hooke’s law and Young’s modulus',
                demo: 'stress-strain',
              },
              {
                id: 'poisson',
                title: 'Estimate lateral strain',
                summary:
                  'Use Poisson’s ratio to relate axial and lateral strain in the elastic range.',
                sectionHint: 'Poisson’s ratio',
              },
              {
                id: 'why-normalize',
                title: 'Why we normalize',
                summary:
                  'Explain why force and elongation are normalized before comparing materials.',
                sectionHint: 'Why normalize force and stretch',
                demo: 'stress-strain',
              },
            ],
            sections: [
              {
                heading: 'Why normalize force and stretch',
                body:
                  'A thick bar and a thin wire can carry very different forces while “feeling” the same intensity inside the material. Raw force depends on cross section; raw elongation depends on gauge length. Stress and strain strip out geometry so you can compare steel to aluminum and feed constitutive laws that are (approximately) size-independent. Design later multiplies stress by area to recover force for a real part.',
              },
              {
                heading: 'Definitions',
                body:
                  'Stress is force per unit area — intensity of loading. Strain is stretch per unit length — fractional change in size. Engineering stress σ = F/A₀ uses the original cross section; engineering strain ε = ΔL/L₀ uses the original length. True stress/strain use instantaneous geometry — important in plasticity; most intro elastic work stays with engineering measures.',
                visual: 'stress-def',
              },
              {
                heading: 'Hooke’s law and Young’s modulus',
                body:
                  'In the linear elastic regime, σ = E ε. Young’s modulus E is the slope of the σ–ε line — a material stiffness, not a strength. Strength (yield, ultimate) is a stress level; E is how steeply stress rises with strain before yield.',
                visual: 'hooke',
              },
              {
                heading: 'Poisson’s ratio',
                body:
                  'Axial stretch usually comes with lateral contraction: ν = −ε_lateral / ε_axial. The minus sign makes ν positive when lateral strain is opposite in sign to axial strain. Metals often ν ≈ 0.3; rubber can approach 0.5 (nearly incompressible).',
                visual: 'poisson',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Using instantaneous area when the problem asks for engineering stress. Mixing MPa and GPa when computing ε = σ/E (100 MPa / 200 GPa = 5×10⁻⁴, not 0.5). Forgetting the minus in Poisson’s definition while still reporting ν > 0. Treating E as a failure stress.',
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
                      '100 MPa = 100×10⁶ Pa; 200 GPa = 200×10⁹ Pa. Same base units required before dividing.',
                  },
                  {
                    label: 'Strain from Hooke',
                    content: 'ε = σ/E = 100×10⁶ / 200×10⁹ = 5×10⁻⁴ (dimensionless).',
                  },
                  {
                    label: 'Elongation',
                    content: 'ΔL = ε L₀ = 5×10⁻⁴ · 1 m = 5×10⁻⁴ m = 0.5 mm.',
                  },
                  {
                    label: 'Feel check',
                    content:
                      'Half a millimeter on a meter rod under 100 MPa is typical for steel — stiff, small strain.',
                  },
                ],
                answer: '0.5 mm',
              },
              {
                id: 'we-poisson',
                title: 'Lateral strain',
                problem:
                  'Axial strain ε_z = 0.001, ν = 0.3. Find lateral strain.',
                steps: [
                  {
                    label: 'Poisson definition',
                    content: 'ε_lateral = −ν ε_axial = −0.3 · 0.001 = −3×10⁻⁴.',
                  },
                  {
                    label: 'Interpret sign',
                    content:
                      'Negative means contraction when the axis is in tension. Magnitude 3×10⁻⁴.',
                  },
                  {
                    label: 'Diameter change idea',
                    content:
                      'If original diameter is D₀, ΔD ≈ ε_lateral D₀ = −3×10⁻⁴ D₀ (slight thinning).',
                  },
                ],
                answer: '−3×10⁻⁴ (contraction)',
              },
              {
                id: 'we-stress',
                title: 'Stress from load',
                problem:
                  'A rod with A₀ = 100 mm² carries F = 20 kN. Find engineering stress in MPa.',
                steps: [
                  {
                    label: 'Convert area',
                    content: '100 mm² = 100×10⁻⁶ m² = 1×10⁻⁴ m².',
                  },
                  {
                    label: 'σ = F/A₀',
                    content: 'σ = 20,000 N / 1×10⁻⁴ m² = 2×10⁸ Pa = 200 MPa.',
                  },
                  {
                    label: 'Shortcut',
                    content:
                      'In convenient units: MPa = N/mm², so 20,000 N / 100 mm² = 200 MPa — same result.',
                  },
                ],
                answer: '200 MPa',
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
              {
                id: 'q-ss-3',
                prompt: 'Poisson’s ratio ν is…',
                choices: [
                  'ε_lateral / ε_axial without a minus (always negative)',
                  '−ε_lateral / ε_axial (reported positive for usual contraction)',
                  'Equal to E',
                  'A stress unit',
                ],
                correctIndex: 1,
                explanation: 'ν = −ε_lateral/ε_axial so ordinary materials have ν > 0.',
              },
              {
                id: 'q-ss-4',
                prompt: '100 MPa on a material with E = 200 GPa gives strain…',
                choices: ['0.5', '0.05', '5×10⁻⁴', '200'],
                correctIndex: 2,
                explanation: 'ε = 100×10⁶/200×10⁹ = 5×10⁻⁴.',
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
            objectives: [
              {
                id: 'grain-obstacle',
                title: 'Grain boundaries impede slip',
                summary:
                  'Explain why grain boundaries block dislocation motion and raise yield strength.',
                sectionHint: 'Grain boundaries as obstacles',
                demo: 'hall-petch',
              },
              {
                id: 'hp-formula',
                title: 'Use Hall–Petch',
                summary:
                  'Apply σ_y = σ₀ + k/√d qualitatively and in a simple numerical plug-in.',
                sectionHint: 'Hall–Petch relation',
                demo: 'hall-petch',
              },
              {
                id: 'arrhenius',
                title: 'Respect Arrhenius sensitivity',
                summary:
                  'State why thermally activated rates depend so strongly on absolute temperature.',
                sectionHint: 'Arrhenius rates',
              },
              {
                id: 'limits',
                title: 'Know the limits',
                summary:
                  'Avoid extrapolating Hall–Petch to arbitrarily small d or putting °C into Q/RT.',
                sectionHint: 'Common mistakes',
              },
            ],
            sections: [
              {
                heading: 'Grain boundaries as obstacles',
                body:
                  'Plastic deformation in metals is carried by dislocations — line defects that glide under shear. Grain boundaries are interfaces between differently oriented crystals; they impede dislocation motion. Smaller grains mean more boundary area per volume, so a higher applied stress is needed to yield — the microstructural idea behind Hall–Petch strengthening.',
                visual: 'grain-boundary',
              },
              {
                heading: 'Hall–Petch relation',
                body:
                  'Smaller grains → more boundary area → higher yield strength, within a valid range. The classic bookkeeping is σ_y = σ₀ + k / √d, where d is mean grain diameter, σ₀ a lattice friction stress, and k a strengthening coefficient. Halving d multiplies the k/√d term by √2 ≈ 1.41. The boost is real but not infinite: at nanocrystalline sizes other mechanisms can dominate and the classic form may fail.',
              },
              {
                heading: 'Arrhenius rates',
                body:
                  'Diffusion, creep, and many activated chemical processes scale as rate ∝ exp(−Q/RT), with activation energy Q, gas constant R, and absolute temperature T. Because the exponent contains 1/T, a modest temperature rise can change rates by orders of magnitude — process windows care about tens of degrees.',
                visual: 'arrhenius',
              },
              {
                heading: 'Two ideas, one materials mindset',
                body:
                  'Hall–Petch is about structure controlling strength at a fixed temperature. Arrhenius is about temperature controlling how fast structure can change (diffusion, recovery, grain growth). Raising T can accelerate diffusion that coarsens grains — which then lowers the Hall–Petch contribution. Strength and kinetics are coupled in heat treatment.',
              },
              {
                heading: 'Common mistakes',
                body:
                  'Assuming Hall–Petch continues forever as d → 0. Putting T in °C inside Q/RT. Confusing “higher T raises rate” with “higher T always raises yield strength” (creep and recovery soften materials at high T). Mixing up σ₀ (friction stress) with E (modulus).',
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
                      'σ_y = σ₀ + k/√d. If d → d/2, √d shrinks by √2, so k/√d grows by √2.',
                  },
                  {
                    label: 'Conclude',
                    content:
                      'Yield strength increases. How much depends on whether k/√d is large compared with σ₀.',
                  },
                  {
                    label: 'Caveat',
                    content:
                      'At extremely fine grain sizes the simple Hall–Petch form may not hold — do not extrapolate blindly.',
                  },
                ],
                answer: 'Increase yield strength',
              },
              {
                id: 'we-hp-num',
                title: 'Numeric Hall–Petch',
                problem:
                  'σ₀ = 100 MPa, k = 0.5 MPa·m¹/², d = 25×10⁻⁶ m. Estimate σ_y.',
                steps: [
                  {
                    label: 'Compute √d',
                    content: 'd = 2.5×10⁻⁵ m ⇒ √d = √(2.5×10⁻⁵) ≈ 5.0×10⁻³ m¹/².',
                  },
                  {
                    label: 'Grain-boundary term',
                    content: 'k/√d = 0.5 / 0.005 = 100 MPa.',
                  },
                  {
                    label: 'Yield strength',
                    content: 'σ_y = 100 + 100 = 200 MPa.',
                  },
                ],
                answer: '200 MPa',
              },
              {
                id: 'we-arrhenius',
                title: 'Arrhenius temperature sensitivity',
                problem:
                  'Why can a diffusion rate change sharply from a relatively small temperature increase at fixed Q?',
                steps: [
                  {
                    label: 'Look at the form',
                    content:
                      'rate ∝ exp(−Q/RT). The exponent depends on 1/T, so ΔT changes the exponent by about (Q/R) Δ(1/T).',
                  },
                  {
                    label: 'Exponential amplification',
                    content:
                      'A linear change in the exponent becomes a multiplicative change in the rate — that is why kinetics are steep in T.',
                  },
                  {
                    label: 'Practical takeaway',
                    content:
                      'Heat-treatment and diffusion schedules specify temperatures tightly; “about 500 °C” is not the same as 520 °C when Q is large.',
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
              {
                id: 'q-hp-3',
                prompt: 'In σ_y = σ₀ + k/√d, decreasing d by 4× multiplies k/√d by…',
                choices: ['1/2', '2', '4', '16'],
                correctIndex: 1,
                explanation: '√d shrinks by 2, so k/√d doubles.',
              },
              {
                id: 'q-hp-4',
                prompt: 'Activation energy Q in Arrhenius expressions should be paired with T in…',
                choices: ['°C', '°F', 'Kelvin (absolute)', 'Any convenient scale'],
                correctIndex: 2,
                explanation: 'Q/RT uses absolute temperature.',
              },
            ],
          },
        ],
      },
    ],
  },
]

function withPlainEnglish(lesson: Lesson): Lesson {
  if (lesson.plainEnglish) return lesson
  const pe = plainEnglishFor(lesson.id)
  return pe ? { ...lesson, plainEnglish: pe } : lesson
}

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id)
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId)
  if (!course) return undefined
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId)
    if (lesson) return { course, module: mod, lesson: withPlainEnglish(lesson) }
  }
  return undefined
}

export function allLessons() {
  return courses.flatMap((c) =>
    c.modules.flatMap((m) =>
      m.lessons.map((l) => ({ course: c, module: m, lesson: withPlainEnglish(l) })),
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
