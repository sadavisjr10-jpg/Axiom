# Axiom

Pocket undergraduate engineering academy — the first two years of a bachelor’s from first principles.

**Undergraduate Core:** six courses with outlines, worked examples, quizzes, daily drills, interactive labs, searchable formulas, and local progress tracking.

## Courses

| Code | Title |
|------|--------|
| MATH 141 | Engineering Calculus |
| PHYS 211 | Physics: Mechanics |
| ENGR 201 | Engineering Statics |
| ECE 201 | Electric Circuits |
| ME 231 | Thermodynamics |
| MSE 200 | Materials Science |

## Features

- **Learn** — catalog, module outlines, lessons with revealable worked-example steps, fading practice, mistake clinics, and mastery-gated quizzes
- **Drill** — daily 5, mixed quizzes, spaced retrieval of weak objectives, flashcards
- **Labs** — predict–commit–reveal on Statics / Mechanics / Circuits / Thermo labs
- **Formulas** — ~48 searchable identities with course filters
- **Progress** — streak, mastery %, lessons done, review schedule, unlocked modules; `localStorage` schema v2 (migrates from v1)

## Stack

Vite + React + TypeScript · React Router · Vitest

## Setup

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build to dist/
npm test         # unit tests (lab math + progress helpers)
npm run preview  # serve the production build
```

## Project structure

```
src/
  components/   # Layout, CourseCard, WorkedExample, Quiz, ProgressRing
  data/         # courses, formulas, drills/flashcards
  hooks/        # useProgress
  labs/         # interactive lab UIs
  lib/          # labMath, progress (localStorage)
  pages/        # Landing, Learn, Drill, Labs, Formulas, Progress
  types/        # shared TypeScript models
  __tests__/    # vitest suites
```

## Notes

- Progress is stored only in the browser (`localStorage`, versioned schema v2); use Progress → Reset to clear.
- Next modules unlock after prior module lesson checks pass (≥ 80%, e.g. 4/5).
- Daily drills are seeded from the calendar date so the set is stable for a given day.
