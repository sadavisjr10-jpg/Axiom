import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { useProgress } from './hooks/useProgress'
import { Landing } from './pages/Landing'
import { Learn } from './pages/Learn'
import { CourseOutline } from './pages/CourseOutline'
import { LessonPage } from './pages/LessonPage'
import { Drill } from './pages/Drill'
import { Labs } from './pages/Labs'
import { Formulas } from './pages/Formulas'
import { ProgressPage } from './pages/ProgressPage'

export default function App() {
  const {
    progress,
    start,
    completeLesson,
    completeDrill,
    reset,
    markFlashcard,
  } = useProgress()

  return (
    <BrowserRouter basename="/Axiom">
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-shell app-shell--landing">
              <div className="grid-motif" aria-hidden />
              <Landing progress={progress} onStart={start} />
            </div>
          }
        />
        <Route element={<Layout progress={progress} />}>
          <Route path="/learn" element={<Learn progress={progress} />} />
          <Route path="/learn/:courseId" element={<CourseOutline progress={progress} />} />
          <Route
            path="/learn/:courseId/:lessonId"
            element={<LessonPage progress={progress} onComplete={completeLesson} />}
          />
          <Route
            path="/drill"
            element={
              <Drill
                progress={progress}
                onDrillComplete={completeDrill}
                onFlashcard={markFlashcard}
              />
            }
          />
          <Route path="/labs" element={<Labs />} />
          <Route path="/formulas" element={<Formulas />} />
          <Route path="/progress" element={<ProgressPage progress={progress} onReset={reset} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
