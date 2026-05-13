import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/analyser',  label: 'Analyser' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/rapport',   label: 'Rapport' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => { navigate('/'); setOpen(false) }}>
          Nalo
        </div>
        <div className="navbar-links">
          {links.map(l => (
            <NavLink
              key={l.to} to={l.to}
              className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
          <a href="https://github.com/paulallan2206/NaloRH"
            target="_blank" rel="noopener noreferrer" className="navbar-link">
            GitHub ↗
          </a>
        </div>
        <div className="navbar-cta">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')}>Démo</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/analyser')}>Commencer</button>
        </div>
        <button className="navbar-burger" onClick={() => setOpen(!open)}>
          <span style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar-mobile ${open ? 'open' : ''}`}>
        {links.map(l => (
          <NavLink
            key={l.to} to={l.to}
            className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        <a href="https://github.com/paulallanmeyesika/nalorh"
          target="_blank" rel="noopener noreferrer"
          className="navbar-link" onClick={() => setOpen(false)}>
          GitHub ↗
        </a>
        <div className="navbar-mobile-cta">
          <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}
            onClick={() => { navigate('/dashboard'); setOpen(false) }}>Démo</button>
          <button className="btn btn-primary btn-sm" style={{ flex: 1 }}
            onClick={() => { navigate('/analyser'); setOpen(false) }}>Commencer</button>
        </div>
      </div>
    </>
  )
}
