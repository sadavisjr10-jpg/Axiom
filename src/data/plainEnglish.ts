import type { PlainEnglish } from '../types'

/**
 * Opening “In plain English / Big idea” stretch for every lesson.
 * Merged onto lessons at read time so first-time learners always see
 * motivation and everyday language before formulas and practice.
 */
export const plainEnglishByLesson: Record<string, PlainEnglish> = {
  'calculus:limits-continuity': {
    solves:
      'Engineers constantly ask: “What is this sensor, model, or design settling toward — even if the exact point is noisy, missing, or undefined?” Limits give a precise language for that settling.',
    idea:
      'Imagine walking toward a doorway. You can get as close as you like without ever needing to stand exactly on the threshold. A limit is the same idea for numbers: as you nudge the input toward a target, the output heights settle on a single value — call it L — even if the function has a hole, a glitch, or no value at that exact spot. Zoom in on a graph near that x-value; if the y-values crowd around one height, that height is the limit. If left and right approaches disagree, or the values shoot to infinity, the two-sided limit simply does not exist — and that failure is useful information, not a dead end.',
    jargon: [
      {
        term: 'Limit',
        meaning:
          'The value outputs approach as inputs approach a target — not necessarily the value at the target itself.',
      },
      {
        term: 'One-sided limit',
        meaning:
          'Approaching only from the left (smaller inputs) or only from the right (larger inputs).',
      },
      {
        term: 'Continuous',
        meaning:
          'No jump, hole, or blow-up at that point: the limit exists, the function value exists, and they match.',
      },
    ],
    bridge:
      'Next we name the notation, practice substitution and algebra when you hit a 0/0 form, and learn one famous trig limit. The formulas are shorthand for the zooming-in story you just read.',
  },

  'calculus:derivative-intro': {
    solves:
      'Designers need rates — how fast speed, temperature, voltage, or cost is changing right now — not just how much it changed over a long stretch.',
    idea:
      'Think of a road trip. Average speed is total miles divided by total hours — easy, but it hides the speeding ticket you almost got at minute 47. Instantaneous rate is what the speedometer claims at one moment. Calculus builds that idea carefully: take average rate on a short window, then shrink the window until it is vanishingly small. When that process settles on a single number, we call it the derivative. Geometrically it is the slope of the tangent line; physically it is “how hard is this quantity climbing right now?”',
    jargon: [
      {
        term: 'Average rate of change',
        meaning: 'Rise over run on an interval — exact for that whole stretch, not for one instant.',
      },
      {
        term: 'Derivative',
        meaning:
          'The instantaneous rate of change at a point, when the shrinking-window limit exists.',
      },
      {
        term: 'Secant / tangent',
        meaning:
          'A secant cuts the curve at two points; a tangent kisses it at one — the limiting position of those secants.',
      },
    ],
    bridge:
      'Below we write the difference quotient, take the limit, and note when a sharp corner or jump refuses to give a single tangent. Equations come after this intuition is solid.',
  },

  'calculus:power-product': {
    solves:
      'Once you trust derivatives from first principles, you need fast, reliable shortcuts for the polynomials and products that show up in every engineering model.',
    idea:
      'The definition of the derivative always works, but rewriting and taking limits by hand for every power of x would feel like measuring every board with a micrometer when you already own a tape measure. The power rule and product rule are compressed theorems: they package work you already understand into a one-line habit. They are not magic — they are “we did the hard limit once, here is the pattern.” Use them freely after you have seen where they come from, and sanity-check weird cases by expanding a simple example.',
    jargon: [
      {
        term: 'Power rule',
        meaning: 'How to differentiate x to a power without returning to the limit definition each time.',
      },
      {
        term: 'Product rule',
        meaning:
          'When two changing factors multiply (force × velocity, mass × speed, …), each can contribute to the rate.',
      },
    ],
    bridge:
      'We state the rules clearly, show why products are not “just multiply the derivatives,” and then practice. Formulas first appear only after this motivation.',
  },

  'calculus:ftc-intro': {
    solves:
      'Often you know a rate (current, velocity, heat flow) and need the accumulated total (charge, distance, energy) — or the reverse.',
    idea:
      'Differentiation asks “how fast is this changing?” Antidifferentiation asks the reverse: “which quantity has this rate of change?” If you know water is pouring into a tank at a known rate, the antiderivative recovers how much water is in the tank (up to a starting level). The Fundamental Theorem of Calculus is the bridge: adding up a derivative over an interval recovers the net change of the original quantity — like a bank statement that totals every deposit and withdrawal into “ending balance minus starting balance.”',
    jargon: [
      {
        term: 'Antiderivative',
        meaning: 'A function whose derivative is the one you started with.',
      },
      {
        term: 'Indefinite integral',
        meaning: 'The whole family of antiderivatives, written with +C because constants vanish when you differentiate.',
      },
      {
        term: 'Fundamental Theorem (FTC)',
        meaning:
          'Evaluating an antiderivative at the endpoints gives the definite integral — net accumulation from a to b.',
      },
    ],
    bridge:
      'Next: the +C habit, the evaluation form of the FTC, and common sign/order mistakes. Practice comes after you can say the accumulation story in words.',
  },

  'mechanics:const-accel': {
    solves:
      'Before asking why something accelerates, engineers often need a clean description of how position and velocity change with time — braking distance, elevator timing, launch profiles.',
    idea:
      'Kinematics is the language of motion without yet naming the causes. Imagine a car with cruise control stuck at a fixed throttle on a flat road: its acceleration is roughly constant, so speed climbs linearly and distance follows a smooth curve. Constant-acceleration formulas are the exact algebra for that special (and very common) case. They do not replace Newton’s laws — they let you describe the trip once you know (or assume) that a is steady. Signs matter: “slowing down” is not a third kind of motion; it is acceleration opposite to velocity.',
    jargon: [
      {
        term: 'Kinematics',
        meaning: 'Describing motion (position, velocity, acceleration vs time) without yet analyzing forces.',
      },
      {
        term: 'Constant acceleration',
        meaning:
          'Acceleration that does not change in magnitude or direction along the line of motion for the interval of interest.',
      },
    ],
    bridge:
      'We will list when the model applies, name the three workhorse equations, and practice sign discipline. Equations appear after you know what story they tell.',
  },

  'mechanics:newton2': {
    solves:
      'Everything that moves under push, pull, weight, friction, or thrust is governed by one idea: net force sets acceleration.',
    idea:
      'Newton’s second law is not “the force equals mass times a.” It is “the vector sum of every force on this body equals mass times its acceleration.” Picture a tug-of-war: many ropes, one net effect. Mass is stubbornness — how hard it is to change velocity — not a force itself. The free-body diagram (FBD) is the professional habit that prevents missing a rope: isolate one body, draw every interaction that touches it, then write the sum. Skip the picture and you are guessing which terms belong in the equation.',
    jargon: [
      {
        term: 'Net force (ΣF)',
        meaning: 'The vector sum of all forces on the chosen body — what actually causes acceleration.',
      },
      {
        term: 'Free-body diagram (FBD)',
        meaning:
          'A sketch of one isolated body with every external force drawn as an arrow at its point of action.',
      },
      {
        term: 'Weight vs mass',
        meaning: 'Mass is inertia (kg); weight is the gravitational force mg (newtons) once g is chosen.',
      },
    ],
    bridge:
      'Below: FBD discipline, weight vs mass, then algebra. Practice problems wait until the diagram habit is clear.',
  },

  'statics:resultant-2d': {
    solves:
      'Structures and mechanisms almost never feel a single tidy force along your favorite axis — wind, cables, and bolts arrive at angles. You need one equivalent push that tells the same story.',
    idea:
      'Adding arrows tip-to-tail works for two forces; with three or more it becomes a messy sketch. Components are the tidy habit: break every force into “east–west” and “north–south” pieces, add the pieces as ordinary numbers, then rebuild one arrow whose length and direction summarize the whole crowd. That rebuilt arrow is the resultant — what a single cable or a single support would have to provide to match the system. Angle reference is sacred: cos and sin only mean what you think if θ is measured from the axis you claimed.',
    jargon: [
      {
        term: 'Component',
        meaning: 'The projection of a force onto a chosen axis (how much of it points that way).',
      },
      {
        term: 'Resultant',
        meaning: 'One vector that is equivalent to the sum of several forces for translation purposes.',
      },
    ],
    bridge:
      'Next we lock the angle convention, compute components, and rebuild magnitude and direction. Formulas are bookkeeping for this picture.',
  },

  'statics:particle-eq': {
    solves:
      'Hanging signs, cable junctions, and small clevis joints often sit still. You need the tensions and support forces that keep them from accelerating.',
    idea:
      'If something is not accelerating, the net force on it is zero — every push and pull cancels. Treat a small knot or ring as a “particle” when its size does not matter for moments: only force balance counts. Draw the FBD, resolve into x and y, and set each sum to zero. Two planar equations can solve for two unknown magnitudes when directions are known (cables along known lines). This is dynamics with a = 0 — not a new universe of physics.',
    jargon: [
      {
        term: 'Particle (in statics)',
        meaning:
          'A body (or joint) treated as a point: force balance only; moments wait for rigid-body statics.',
      },
      {
        term: 'Equilibrium',
        meaning: 'No acceleration — for a particle, the vector sum of forces is zero.',
      },
    ],
    bridge:
      'We contrast particles with rigid bodies, then walk a setup strategy. Algebra comes after the equilibrium story is clear.',
  },

  'circuits:voltage-divider': {
    solves:
      'Sensors, logic thresholds, and bias networks constantly need a fraction of a supply voltage — a reliable “tap” partway down from Vin to ground.',
    idea:
      'Send the same current through two resistors in series, like water through two pipe sections in a row. The larger resistor drops a larger share of the total voltage — taller step, bigger height loss. Measure across the lower resistor and you have a fraction of Vin set by the resistance ratio. Absolute ohm values set how much current flows and how “stiff” the tap is; the ratio alone sets the fraction. Attach a hungry load at the tap and the divider sags — that is loading, and why engineers often buffer the output.',
    jargon: [
      {
        term: 'Series',
        meaning: 'One path for current: the same current through each element.',
      },
      {
        term: 'Voltage divider',
        meaning: 'Two (or more) series resistors used to produce a fraction of the input voltage.',
      },
      {
        term: 'Loading',
        meaning: 'When something attached at the output steals current and changes the intended voltage.',
      },
    ],
    bridge:
      'We derive the formula from Ohm’s law and KVL, then talk ratio vs scale and loading. Practice starts only after the step-ladder picture is clear.',
  },

  'circuits:kcl-kvl': {
    solves:
      'Every circuit analysis — hand or SPICE — rests on two conservation laws: charge does not pile up at a node, and walking a loop returns you to the same potential.',
    idea:
      'Kirchhoff’s Current Law (KCL) is plumbing: at a junction, what flows in must flow out (ideal wires do not store charge). Kirchhoff’s Voltage Law (KVL) is hiking: around any closed path, climbs and drops in “voltage altitude” sum to zero — you end where you began. Together they let you write enough equations to find unknown currents and voltages. Sign conventions are a contract with yourself: pick “leaving the node is positive” or “rise is positive” and never switch mid-problem.',
    jargon: [
      {
        term: 'Node',
        meaning: 'An electrical junction where two or more elements meet — a connection point.',
      },
      {
        term: 'KCL',
        meaning: 'Current conservation at a node: algebraic sum of currents is zero.',
      },
      {
        term: 'KVL',
        meaning: 'Voltage conservation around a loop: signed rises and drops sum to zero.',
      },
    ],
    bridge:
      'Below we write the laws carefully, show how they team up on a simple loop, and lock signs. Equations are the bookkeeping; the story is conservation.',
  },

  'thermo:ideal-gas': {
    solves:
      'Air tanks, pistons, HVAC ducts, and many lab gases need a simple link between pressure, volume, amount, and temperature for first-pass design.',
    idea:
      'An “ideal gas” is a useful fiction: pretend molecules are point masses that bounce elastically and ignore each other’s attractions and size. For dilute gases far from liquefaction, that fiction is surprisingly accurate. The ideal-gas law then ties four bookkeeping quantities so any three determine the fourth. Temperature must be absolute (Kelvin) — “zero” means no thermal motion in the model, not “freezing weather.” Named processes (isothermal, isobaric, …) are just stories where one variable is held fixed on purpose.',
    jargon: [
      {
        term: 'Equation of state',
        meaning: 'A relation among P, V, T (and amount) that describes a substance model.',
      },
      {
        term: 'Absolute temperature',
        meaning: 'Temperature measured from absolute zero (Kelvin); required by the ideal-gas model.',
      },
      {
        term: 'Ideal gas',
        meaning: 'A model gas with no intermolecular forces and negligible molecule volume.',
      },
    ],
    bridge:
      'We write PV = nRT with units, stress Kelvin, and walk named processes. Plug-and-chug waits until the model’s assumptions are clear.',
  },

  'thermo:first-law': {
    solves:
      'Engines, refrigerators, and closed tanks trade heat and work while storing energy. You need a balance sheet that never lies.',
    idea:
      'Energy is conserved: what enters a closed system as heat or work must show up as a change in stored energy (or leave by the other door). Think of a bank account: deposits (heat in), withdrawals (work out, in our sign convention), and the balance (internal energy U). Different textbooks flip the work sign — always check the local rule before copying a formula. A full cycle returns to the same state, so the account balance change is zero over the loop; net work then equals net heat. Carnot is not a real engine you buy — it is the theoretical ceiling on efficiency between two temperatures.',
    jargon: [
      {
        term: 'Closed system',
        meaning: 'No mass crosses the boundary; heat and work still may.',
      },
      {
        term: 'Internal energy (U)',
        meaning: 'Microscopic energy stored in the system — the “balance” in the energy account.',
      },
      {
        term: 'Carnot efficiency',
        meaning: 'The maximum possible heat-engine efficiency between hot and cold reservoirs.',
      },
    ],
    bridge:
      'Next: our sign convention, reading Q and W together, and why Carnot is a ceiling. Practice follows the balance-sheet intuition.',
  },

  'materials:stress-strain': {
    solves:
      'You cannot fairly compare a thick steel bar to a thin aluminum wire by raw force or raw stretch — geometry confuses the material story.',
    idea:
      'Stress and strain are normalized force and normalized stretch. Divide force by cross-sectional area and you get intensity of loading — fair across sizes. Divide elongation by original length and you get fractional stretch — fair across gauge lengths. Hooke’s law then says that in the linear elastic range, stress is proportional to strain, with Young’s modulus as the stiffness. Poisson’s ratio captures the sideways squish when you pull lengthwise — cork barely does it; rubber does a lot. Design later multiplies stress by area to recover force for a real part.',
    jargon: [
      {
        term: 'Stress',
        meaning: 'Force per unit area — how intensely the material is loaded.',
      },
      {
        term: 'Strain',
        meaning: 'Relative elongation (or compression) — stretch per unit length.',
      },
      {
        term: "Young's modulus (E)",
        meaning: 'Slope of stress vs strain in the linear elastic region — stiffness.',
      },
      {
        term: "Poisson's ratio",
        meaning: 'How much the material contracts laterally when stretched axially.',
      },
    ],
    bridge:
      'Definitions and Hooke’s law come next, with units and common mix-ups. Numbers wait until “intensity vs total force” is clear.',
  },

  'materials:hall-petch': {
    solves:
      'Metallurgists strengthen metals without always changing chemistry — grain size and temperature-driven rates are two powerful levers.',
    idea:
      'Metals often deform by moving line defects called dislocations — like wrinkles sliding through a carpet. Grain boundaries are walls between crystals of different orientation; they block those wrinkles. Smaller grains mean more wall per volume, so you need a higher stress to yield — that is Hall–Petch strengthening in one sentence. Separately, many processes (diffusion, creep, some reactions) speed up dramatically with temperature: Arrhenius behavior says rates explode as barriers become easier to hop. Two ideas, one mindset: microstructure and thermal activation both shape what a material will do.',
    jargon: [
      {
        term: 'Dislocation',
        meaning: 'A line defect whose motion carries plastic deformation in crystals.',
      },
      {
        term: 'Grain boundary',
        meaning: 'The interface between two crystals (grains) of different orientation.',
      },
      {
        term: 'Hall–Petch',
        meaning: 'Empirical relation: smaller grains → higher yield strength (within a valid range).',
      },
      {
        term: 'Arrhenius rate',
        meaning: 'Rate that depends exponentially on −(activation energy)/(temperature).',
      },
    ],
    bridge:
      'We write the Hall–Petch and Arrhenius forms after this picture, then contrast what each lever controls. Practice comes last.',
  },
}

export function plainEnglishFor(lessonId: string): PlainEnglish | undefined {
  return plainEnglishByLesson[lessonId]
}
