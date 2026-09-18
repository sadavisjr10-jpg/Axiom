import { NavLink, Outlet, Link } from 'react-router-dom'
import type { ProgressState } from '../types'

const links = [
  { to: '/learn', label: 'Learn' },
  { to: '/drill', label: 'Drill' },
  { to: '/labs', label: 'Labs' },
  { to: '/formulas', label: 'Formulas' },
  { to: '/progress', label: 'Progress' },
]

interface Props {
  progress: ProgressState
}

export function Layout({ progress }: Props) {
  return (
    <div className="app-shell">
      <div className="grid-motif" aria-hidden />
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden>
            △
          </span>
          <span className="brand__name">Axiom</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="topbar__meta" title="Study streak">
          <span className="streak" aria-label={`${progress.streak} day streak`}>
            🔥 {progress.streak}
          </span>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Axiom · Undergraduate Core · First principles for engineers</p>
      </footer>
    </div>
  )
}
