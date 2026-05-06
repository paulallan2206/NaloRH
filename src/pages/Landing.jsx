import { useNavigate } from 'react-router-dom'
import './Landing.css'

const FEATURES = [
  {
    icon: '💬',
    color: '#E1F5EE',
    title: 'Analyse NLP francophone',
    desc: 'CamemBERT multilingue — score sentiment 0→1 avec confiance. 87% de précision sur feedbacks francophones.',
  },
  {
    icon: '⚡',
    color: '#FAECE7',
    title: 'Prédiction churn ML',
    desc: 'RandomForest sur 35 features. Probabilité de démission à 6 mois par employé et par département.',
  },
  {
    icon: '📊',
    color: '#FAEEDA',
    title: 'Dashboard interactif',
    desc: 'Donut sentiments, heatmap, top risques, thèmes récurrents — tout en temps réel après analyse.',
  },
  {
    icon: '📄',
    color: '#E1F5EE',
    title: 'Export PDF & CSV',
    desc: 'Rapport complet avec recommandations IA pour votre CODIR. CSV enrichi pour votre SIRH.',
  },
  {
    icon: '🌍',
    color: '#E1F5EE',
    title: 'Conçu pour l\'Afrique',
    desc: 'Gratuit, open source MIT. Adapté aux PME de Libreville, Abidjan, Dakar. Zéro coût de licence.',
  },
  {
    icon: '🔌',
    color: '#F0F4F1',
    title: 'API FastAPI publique',
    desc: 'Endpoint /analyze documenté Swagger. Intégrable dans votre SIRH ou Excel. Tunnel Cloudflare.',
  },
]

const STEPS = [
  { n: '01', title: 'Importez vos feedbacks', desc: 'CSV avec colonnes texte, employe_id, date, département — ou saisie manuelle directe.' },
  { n: '02', title: 'L\'IA analyse tout', desc: 'CamemBERT score le sentiment, RandomForest prédit le churn sur 35 features en secondes.' },
  { n: '03', title: 'Visualisez les insights', desc: 'Dashboard interactif — graphiques, alertes département, top risques, thèmes récurrents.' },
  { n: '04', title: 'Exportez & partagez', desc: 'PDF avec recommandations pour votre CODIR ou CSV enrichi pour votre SIRH.' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <main className="landing">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content anim-fade-up">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            IA · NLP · Open source · Francophone
          </div>
          <h1 className="hero-title">
            Vos feedbacks<br />
            parlent.<br />
            <em>NaloRH traduit.</em>
          </h1>
          <p className="hero-sub">
            Analysez automatiquement les feedbacks de vos employés.
            Détectez les risques de démission avant qu'ils arrivent.
            Conçu pour les PME africaines.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/analyser')}>
              Analyser mes feedbacks →
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate('/dashboard')}>
              Voir le dashboard
            </button>
          </div>
          <div className="hero-stats">
            {[
              { val: '1 480', label: 'employés analysés' },
              { val: '87%',   label: 'précision NLP' },
              { val: '0 €',   label: 'coût de licence' },
            ].map(s => (
              <div className="stat" key={s.val}>
                <div className="stat-val">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live preview card */}
        <div className="hero-visual anim-fade-up-2">
          <div className="hv-header">
            <span className="hv-title">Analyse en direct</span>
            <span className="badge badge-green">Live</span>
          </div>
          {[
            { id:'EMP042', dept:'Sales', label:'Négatif', score:'0.18', churn:'74%', risk:'CRITIQUE', cls:'badge-red', w:'74%', col:'var(--red)', txt:'"Aucune reconnaissance malgré les efforts, je cherche activement ailleurs..."' },
            { id:'EMP007', dept:'Tech',  label:'Positif', score:'0.89', churn:'8%',  risk:'FAIBLE',   cls:'badge-green', w:'8%', col:'var(--green)', txt:'"Excellent manager, projets passionnants, je me sens vraiment épanoui ici."' },
          ].map(e => (
            <div className="hv-card" key={e.id}>
              <div className="hv-card-header">
                <span className="hv-emp">{e.id} · {e.dept}</span>
                <span className={`badge ${e.cls}`}>{e.label} {e.score}</span>
              </div>
              <p className="hv-quote">{e.txt}</p>
              <div className="hv-bar-row">
                <span className="hv-bar-label">Churn</span>
                <div className="hv-bar-track">
                  <div className="hv-bar-fill" style={{ width: e.w, background: e.col }} />
                </div>
                <span className="hv-bar-val" style={{ color: e.col }}>
                  {e.churn} <span className={`badge ${e.cls}`}>{e.risk}</span>
                </span>
              </div>
            </div>
          ))}
          <div className="hv-footer">
            <div className="hv-score-label">Score NaloRH global</div>
            <div className="hv-score-val">0.598</div>
            <div className="hv-score-meta">
              <span className="badge badge-green">1 480 analysés</span>
              <span className="badge badge-red">2 alertes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="page-wrap">
          <div className="section-header anim-fade-up">
            <p className="eyebrow">Fonctionnalités</p>
            <h2 className="section-title">Tout ce dont votre RH a besoin</h2>
            <p className="section-sub">
              De l'import CSV au rapport PDF — un outil complet, gratuit, francophone.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div
                className={`feature-card card card-hover anim-fade-up-${Math.min(i, 4)}`}
                key={f.title}
              >
                <div className="feature-icon" style={{ background: f.color }}>
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section">
        <div className="page-wrap">
          <p className="eyebrow" style={{ color: 'var(--green-mid)' }}>Comment ça marche</p>
          <h2 className="section-title" style={{ color: 'white', marginBottom: 40 }}>
            De 0 à insights en 4 étapes
          </h2>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div className="step" key={s.n}>
                <div className="step-num">{s.n}</div>
                <h4 className="step-title">{s.title}</h4>
                <p className="step-desc">{s.desc}</p>
                {i < STEPS.length - 1 && <div className="step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="page-wrap">
        <div className="cta-band">
          <div>
            <h2 className="cta-title">Prêt à comprendre vos équipes ?</h2>
            <p className="cta-sub">Import CSV · Analyse IA · Export PDF — tout en moins de 2 minutes.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/analyser')}>
            Commencer gratuitement →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">NaloRH</div>
          <div className="footer-links">
            {[
  ['/analyser', 'Analyser'],
  ['/dashboard', 'Dashboard'],
  ['/rapport', 'Rapport']
].map(([to, label]) => (
  <span key={to} className="footer-link" onClick={() => navigate(to)}>{label}</span>
))}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub ↗</a>
          </div>
          <div className="footer-copy">MIT License · Fait avec ❤️ pour les PME africaines</div>
        </div>
      </footer>
    </main>
  )
}
