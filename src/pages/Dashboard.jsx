import { useNavigate } from 'react-router-dom'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Legend,
} from 'recharts'
import './Dashboard.css'

// ── Données de démo (issues de la S1 réelle) ──
const SENTIMENT_DATA = [
  { name: 'Positif', value: 885, color: '#1D9E75' },
  { name: 'Neutre',  value: 417, color: '#7A9482' },
  { name: 'Négatif', value: 178, color: '#D85A30' },
]

const DEPT_DATA = [
  { dept: 'R&D',   score: 0.68, pct_neg: 18, employees: 967 },
  { dept: 'HR',    score: 0.57, pct_neg: 22, employees: 63  },
  { dept: 'Sales', score: 0.38, pct_neg: 32, employees: 450 },
]

const TIMELINE_DATA = [
  { mois: 'Jan', score: 0.61 },
  { mois: 'Fév', score: 0.58 },
  { mois: 'Mar', score: 0.55 },
  { mois: 'Avr', score: 0.52 },
  { mois: 'Mai', score: 0.54 },
  { mois: 'Jun', score: 0.57 },
  { mois: 'Jul', score: 0.60 },
  { mois: 'Aoû', score: 0.59 },
  { mois: 'Sep', score: 0.56 },
  { mois: 'Oct', score: 0.58 },
  { mois: 'Nov', score: 0.60 },
  { mois: 'Déc', score: 0.62 },
]

const RISK_EMPLOYEES = [
  { id: 'EMP042', dept: 'Sales', score: 0.18, churn: 74, level: 'CRITIQUE' },
  { id: 'EMP118', dept: 'Sales', score: 0.22, churn: 68, level: 'CRITIQUE' },
  { id: 'EMP077', dept: 'R&D',   score: 0.31, churn: 52, level: 'ÉLEVÉ' },
  { id: 'EMP203', dept: 'Sales', score: 0.33, churn: 48, level: 'ÉLEVÉ' },
  { id: 'EMP091', dept: 'HR',    score: 0.35, churn: 45, level: 'ÉLEVÉ' },
]

const THEMES = [
  { name: 'Management',    pct: 42, color: '#1D9E75' },
  { name: 'Salaire',       pct: 29, color: '#1D9E75' },
  { name: 'Évolution',     pct: 23, color: '#7A9482' },
  { name: 'Charge travail',pct: 17, color: '#D85A30' },
  { name: 'Reconnaissance',pct: 13, color: '#EF9F27' },
  { name: 'Ambiance',      pct: 11, color: '#7A9482' },
]

const KPIS = [
  { val: '1 480', label: 'Employés analysés', delta: 'Dataset complet', col: 'var(--charcoal)' },
  { val: '0.598', label: 'Score NaloRH moyen', delta: 'Zone neutre-positive', col: 'var(--green)' },
  { val: '12.4%', label: 'Signal churn élevé',  delta: '184 employés à risque', col: 'var(--red)' },
  { val: '16.1%', label: 'Attrition réelle',    delta: '238 départs confirmés', col: 'var(--amber)' },
]

function LevelBadge({ level }) {
  const cls = level === 'CRITIQUE' ? 'badge-red' : level === 'ÉLEVÉ' ? 'badge-amber' : 'badge-green'
  return <span className={`badge ${cls}`}>{level}</span>
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <main className="dashboard-page">
      <div className="page-wrap" style={{ paddingTop: 92 }}>

        {/* ── Header ── */}
        <div className="dash-header anim-fade-up">
          <div>
            <h1 className="section-title">Dashboard analytique</h1>
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>
              HR_Analytics.csv · 1 480 employés · 29/04/2026
            </p>
          </div>
          <div className="dash-filters">
            <select className="input" style={{ width: 160, fontSize: 12 }}>
              <option>Tous les depts</option>
              <option>Sales</option>
              <option>Research & Dev</option>
              <option>HR</option>
            </select>
            <select className="input" style={{ width: 160, fontSize: 12 }}>
              <option>Toutes périodes</option>
              <option>Dernier mois</option>
              <option>Dernier trimestre</option>
            </select>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/rapport')}>
              Exporter PDF
            </button>
          </div>
        </div>

        {/* ── Alert ── */}
        <div className="alert-bar anim-fade-up-1">
          <span>⚠️</span>
          <span>
            <strong>2 alertes actives</strong> — Sales : 32% négatifs · R&D : 29% négatifs
            — Action recommandée sous 7 jours
          </span>
        </div>

        {/* ── KPIs ── */}
        <div className="kpi-grid anim-fade-up-2">
          {KPIS.map(k => (
            <div className="kpi-card" key={k.label}>
              <div className="kpi-val" style={{ color: k.col }}>{k.val}</div>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-delta">{k.delta}</div>
            </div>
          ))}
        </div>

        {/* ── Charts row 1 ── */}
        <div className="charts-row anim-fade-up-3">

          {/* Donut */}
          <div className="chart-panel">
            <h3 className="chart-title">Répartition des sentiments</h3>
            <div className="donut-wrap">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie
                    data={SENTIMENT_DATA}
                    cx="50%" cy="50%"
                    innerRadius={44} outerRadius={62}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {SENTIMENT_DATA.map(d => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v} feedbacks`]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-legend">
                {SENTIMENT_DATA.map(d => (
                  <div className="legend-row" key={d.name}>
                    <div className="legend-dot" style={{ background: d.color }} />
                    <span className="legend-label">{d.name}</span>
                    <div className="legend-bar">
                      <div style={{ width: `${d.value / 14.8}%`, height: '100%', background: d.color, borderRadius: 2 }} />
                    </div>
                    <span className="legend-pct" style={{ color: d.color }}>
                      {(d.value / 14.8).toFixed(1)}%
                    </span>
                  </div>
                ))}
                <div className="corr-box">
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Corrélation NLP ↔ churn</span>
                  <span className="mono" style={{ fontSize: 15, fontWeight: 600, color: 'var(--green)' }}>r = 0.1625</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dept bar chart */}
          <div className="chart-panel">
            <h3 className="chart-title">Score NaloRH par département</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={DEPT_DATA} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" domain={[0, 1]} tick={{ fontSize: 11, fill: 'var(--text-3)' }} />
                <YAxis type="category" dataKey="dept" tick={{ fontSize: 12, fill: 'var(--text-2)' }} width={42} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" name="Score NaloRH" radius={[0, 6, 6, 0]}>
                  {DEPT_DATA.map(d => (
                    <Cell key={d.dept} fill={d.score < 0.45 ? '#D85A30' : '#1D9E75'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="dept-alert-note">
              ⚠️ Sales en zone alerte — score {'<'} seuil 0.40
            </div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="chart-panel anim-fade-up-4" style={{ marginBottom: 14 }}>
          <h3 className="chart-title">Évolution de la satisfaction · 2025</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={TIMELINE_DATA} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mois" tick={{ fontSize: 11, fill: 'var(--text-3)' }} />
              <YAxis domain={[0.3, 0.8]} tick={{ fontSize: 11, fill: 'var(--text-3)' }} width={36} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                name="Score NaloRH"
                stroke="#1D9E75"
                strokeWidth={2.5}
                dot={{ fill: '#085041', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ── Bottom row ── */}
        <div className="bottom-row">

          {/* Risk table */}
          <div className="chart-panel">
            <h3 className="chart-title">Top employés à risque</h3>
            <table className="risk-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Département</th>
                  <th>Score</th>
                  <th>Churn</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {RISK_EMPLOYEES.map(e => (
                  <tr key={e.id}>
                    <td className="mono">{e.id}</td>
                    <td>{e.dept}</td>
                    <td className="mono" style={{ color: e.score < 0.3 ? 'var(--red)' : 'var(--amber)' }}>
                      {e.score}
                    </td>
                    <td className="mono" style={{ color: 'var(--red)' }}>{e.churn}%</td>
                    <td><LevelBadge level={e.level} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: 12 }} onClick={() => navigate('/rapport')}>
              Voir rapport complet →
            </button>
          </div>

          {/* Themes */}
          <div className="chart-panel">
            <h3 className="chart-title">Thèmes récurrents</h3>
            {THEMES.map(t => (
              <div className="theme-row" key={t.name}>
                <span className="theme-label">{t.name}</span>
                <div className="theme-bar-wrap">
                  <div className="theme-track">
                    <div className="theme-fill" style={{ width: `${t.pct * 2}%`, background: t.color }} />
                  </div>
                  <span className="theme-pct">{t.pct}%</span>
                </div>
              </div>
            ))}
            <div className="divider" />
            <p style={{ fontSize: 11, color: 'var(--text-3)' }}>
              Sur 1 480 feedbacks · 29/04/2026
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}
