import { useEffect, useId, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import type { ProgressState } from '../types'

const links = [
  { to: '/learn', label: 'Learn', icon: '◇' },
  { to: '/drill', label: 'Drill', icon: '◎' },
  { to: '/labs', label: 'Labs', icon: '⬡' },
  { to: '/formulas', label: 'Formulas', icon: '∑' },
  { to: '/progress', label: 'Progress', icon: '◉' },
]

interface Props {
  progress: ProgressState
}

export function Layout({ progress }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuId = useId()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <div className={`app-shell${menuOpen ? ' is-nav-open' : ''}`}>
      <div className="grid-motif" aria-hidden />
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden>
            △
          </span>
          <span className="brand__name">Axiom</span>
        </Link>
        <nav className="nav nav--desktop" aria-label="Primary">
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
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav-toggle__bars" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div id={menuId} className={`nav-drawer${menuOpen ? ' is-open' : ''}`} hidden={!menuOpen}>
        <nav className="nav-drawer__nav" aria-label="Mobile menu">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? 'nav-drawer__link is-active' : 'nav-drawer__link'
              }
            >
              <span className="nav-drawer__icon" aria-hidden>
                {l.icon}
              </span>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <main className="main">
        <Outlet />
      </main>

      <nav className="bottom-nav" aria-label="Mobile primary">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => (isActive ? 'bottom-nav__link is-active' : 'bottom-nav__link')}
          >
            <span className="bottom-nav__icon" aria-hidden>
              {l.icon}
            </span>
            <span className="bottom-nav__label">{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <footer className="footer">
        <p>Axiom · Undergraduate Core · First principles for engineers</p>
      </footer>
    </div>
  )
}
