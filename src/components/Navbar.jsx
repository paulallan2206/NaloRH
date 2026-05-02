import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/analyser',  label: 'Analyser' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/rapport',   label: 'Rapport' },
]

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        Nalo<span>RH</span>
      </div>
      <div className="navbar-links">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
          >
            {l.label}
          </NavLink>
        ))}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-link"
        >
          GitHub ↗
        </a>
      </div>
      <div className="navbar-cta">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')}>
          Démo
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => navigate('/analyser')}>
          Commencer
        </button>
      </div>
    </nav>
  )
}
