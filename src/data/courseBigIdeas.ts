import type { CourseId, PlainEnglish } from '../types'

/**
 * Course-level “Big idea” shown first on every subject outline page —
 * why the subject matters, in everyday/engineering language, before lesson cards.
 */
export const courseBigIdeas: Record<CourseId, PlainEnglish> = {
  calculus: {
    solves:
      'Every engineering model eventually asks how fast something is changing, or how much change piles up over time. Calculus is the shared language for those two questions across mechanics, circuits, thermo, and beyond.',
    idea:
      'Think of a dashboard: speedometers report rates (how hard a quantity is climbing right now), while odometers report accumulation (how much has piled up). Calculus formalizes both ideas. Limits ask what a quantity settles toward when you zoom in. Derivatives turn “how much did it change over a stretch?” into “how fast is it changing at this instant?” Integrals reverse the story: given a rate, recover the total. Once you can move confidently between rates and totals, the rest of engineering math starts talking the same dialect.',
    jargon: [
      {
        term: 'Limit',
        meaning:
          'The value outputs approach as inputs approach a target — even if the exact point is messy or undefined.',
      },
      {
        term: 'Derivative',
        meaning: 'Instantaneous rate of change — the speedometer reading for a mathematical quantity.',
      },
      {
        term: 'Integral',
        meaning: 'Accumulation of a rate over an interval — the odometer (or tank fill) for that quantity.',
      },
    ],
    bridge:
      'Browse the modules below when you are ready. Each lesson opens with its own plain-English stretch before formulas and practice.',
  },

  mechanics: {
    solves:
      'Designers need to predict how objects move — braking distance, launch speed, cable tension in an elevator — from a short list of physical laws, not guesswork.',
    idea:
      'Mechanics is the craft of describing motion and explaining why it happens. First you learn to talk about position, velocity, and acceleration with a consistent sign convention (kinematics). Then Newton’s laws connect forces to that motion: unbalanced forces change velocity; balanced forces keep it steady. Free-body diagrams are the engineering habit that makes the bookkeeping honest — draw every push and pull, then write ΣF = ma in components. Energy and momentum later give alternate ledgers when forces are messy but totals are conserved.',
    jargon: [
      {
        term: 'Kinematics',
        meaning: 'Describing motion (position, velocity, acceleration) without yet asking what caused it.',
      },
      {
        term: 'Dynamics',
        meaning: 'Connecting forces to motion — usually through Newton’s second law.',
      },
      {
        term: 'Free-body diagram (FBD)',
        meaning: 'A sketch of one body with every external force drawn, used before writing equations.',
      },
    ],
    bridge:
      'Start with constant-acceleration motion, then move into Newton’s laws. Lesson cards below unlock in order as you clear the mastery gates.',
  },

  statics: {
    solves:
      'Bridges, frames, cables, and bolted joints must sit still under load. Statics is how engineers prove that “still” is not luck — it is balanced forces and moments.',
    idea:
      'Imagine hanging a backpack from a hook: the hook pulls up exactly as hard as gravity pulls down, or the bag falls. Statics extends that intuition to many forces in a plane (and later in 3-D). You resolve forces into components, add them as vectors — never by blindly adding magnitudes — and demand that the net force and net moment on a body at rest are zero. Particle equilibrium is the simplest case; rigid bodies add the “where does the force act?” question through moments. The payoff is being able to size a member or find an unknown reaction before anything moves.',
    jargon: [
      {
        term: 'Resultant',
        meaning: 'A single force that replaces a system of forces for the purpose of net push or pull.',
      },
      {
        term: 'Equilibrium',
        meaning: 'Net force and net moment are zero — the body is not accelerating or starting to spin.',
      },
      {
        term: 'Moment',
        meaning: 'The turning effect of a force about a point — force times perpendicular lever arm.',
      },
    ],
    bridge:
      'Modules below build from resolving forces to particle equilibrium. Open a lesson when you want the worked examples and checks.',
  },

  circuits: {
    solves:
      'Sensors, chargers, and control boards are networks of parts. Circuits teaches how voltage, current, and resistance relate so you can predict what a node will do before you solder.',
    idea:
      'Picture water in pipes: pressure difference drives flow, and narrow sections resist that flow. In resistive circuits, voltage is the electrical “pressure difference,” current is the flow of charge, and resistance is how hard the path makes that flow. Kirchhoff’s laws are bookkeeping rules — current into a node equals current out; voltage drops around a loop sum to zero — not optional folklore. Voltage dividers, series/parallel reductions, and later energy-storage elements (capacitors, inductors) all grow from that conservation mindset.',
    jargon: [
      {
        term: 'Voltage',
        meaning: 'Electrical potential difference — the push that can drive charge between two points.',
      },
      {
        term: 'Current',
        meaning: 'Rate of charge flow through a path, measured in amperes.',
      },
      {
        term: 'KCL / KVL',
        meaning:
          'Kirchhoff’s current and voltage laws: charge is conserved at nodes; energy is conserved around loops.',
      },
    ],
    bridge:
      'Begin with resistive networks and dividers, then Kirchhoff. Each lesson card opens with intuition before the algebra.',
  },

  thermo: {
    solves:
      'Engines, refrigerators, and power plants trade heat and work. Thermodynamics sets the rules for what energy conversions are possible — and what efficiency you can honestly claim.',
    idea:
      'Thermo starts with states: pressure, volume, temperature, and related properties that pin down a substance’s condition. Processes move you from one state to another (heat, expand, compress). The first law is an energy ledger — energy is conserved, so heat in, work out, and changes in internal energy must balance. Ideal-gas models give a workable map for many gases. Efficiency stories (including heat engines) ask how much useful work you extract relative to the heat you paid for — and why no real engine is a perfect converter.',
    jargon: [
      {
        term: 'System / surroundings',
        meaning: 'The piece of the world you choose to track, and everything outside that boundary.',
      },
      {
        term: 'First law',
        meaning: 'Energy balance: heat, work, and stored energy must reconcile for a process or cycle.',
      },
      {
        term: 'Ideal gas',
        meaning: 'A useful model linking P, V, and T for many gases away from condensation.',
      },
    ],
    bridge:
      'Work through properties and the first law in the modules below. Labs and drills reinforce the same energy-balance habit.',
  },

  materials: {
    solves:
      'Choosing steel vs aluminum vs polymer is not fashion — it is predicting how a microstructure will stretch, yield, strengthen, or fail under load and temperature.',
    idea:
      'Materials science connects invisible structure to feel-it-in-your-hands properties. Pull on a bar and you get a stress–strain curve: stiffness (elastic slope), strength (where it yields or breaks), and ductility (how much it stretches). Atoms arranged in grains, with boundaries and defects, explain why finer grains can mean higher strength, and why diffusion at temperature lets atoms rearrange over time. Once you see “structure → properties → performance,” alloy choices and heat treatments stop looking like trivia and start looking like design levers.',
    jargon: [
      {
        term: 'Stress / strain',
        meaning: 'Force per area, and relative deformation — the normalized language of mechanical response.',
      },
      {
        term: 'Elastic modulus',
        meaning: 'Stiffness in the recoverable (spring-like) regime — slope of stress vs strain at small loads.',
      },
      {
        term: 'Microstructure',
        meaning: 'Grains, phases, and defects at the microscopic scale that set bulk properties.',
      },
    ],
    bridge:
      'Start with stress–strain and elasticity, then strengthening and diffusion. Lesson cards below keep the same structure-first story.',
  },
}

export function courseBigIdea(id: CourseId): PlainEnglish {
  return courseBigIdeas[id]
}
