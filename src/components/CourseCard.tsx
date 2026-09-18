import { Link } from 'react-router-dom'
import type { Course } from '../types'
import { ProgressRing } from './ProgressRing'
import { CourseArt } from './CourseArt'
import type { CSSProperties } from 'react'

interface Props {
  course: Course
  mastery: number
}

export function CourseCard({ course, mastery }: Props) {
  const lessonCount = course.modules.reduce((n, m) => n + m.lessons.length, 0)
  return (
    <Link
      to={`/learn/${course.id}`}
      className="course-card"
      style={{ '--course-color': course.color, '--course-accent': course.accent } as CSSProperties}
    >
      <div className="course-card__glow" aria-hidden />
      <div className="course-card__motif" aria-hidden />
      <div className="course-card__top">
        <span className="course-card__icon" aria-hidden>
          <CourseArt courseId={course.id} size={40} />
        </span>
        <ProgressRing value={mastery} size={56} stroke={5} color={course.color} />
      </div>
      <p className="course-card__code">{course.code}</p>
      <h3 className="course-card__title">{course.title}</h3>
      <p className="course-card__desc">{course.description}</p>
      <div className="course-card__meta">
        <span>
          {course.modules.length} modules · {lessonCount} lessons
        </span>
        <span className="course-card__arrow" aria-hidden>
          →
        </span>
      </div>
    </Link>
  )
}
