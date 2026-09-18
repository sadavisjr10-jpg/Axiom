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

- **Learn** — catalog, module outlines, lessons with revealable worked-example steps and quizzes
- **Drill** — deterministic daily 5-question set, mixed quizzes, flashcards
- **Labs** — Statics 2D resultant, Mechanics constant-acceleration, Circuits voltage divider, Thermo ideal-gas
- **Formulas** — ~48 searchable identities with course filters
- **Progress** — streak, mastery %, lessons done, per-course bars; `localStorage` schema `axiom-progress-v1`

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

- Progress is stored only in the browser (`localStorage`); use Progress → Reset to clear.
- Daily drills are seeded from the calendar date so the set is stable for a given day.
