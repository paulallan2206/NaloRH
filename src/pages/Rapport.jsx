import { useNavigate } from 'react-router-dom'
import './Rapport.css'

const RECOS = [
  {
    level: 'URGENT', cls: 'badge-red',
    text: 'Département Sales : entretiens individuels immédiats pour les 5 employés à score < 0.25. Risque de vague de démissions dans les 3 mois.',
  },
  {
    level: 'ACTION', cls: 'badge-amber',
    text: 'Management identifié dans 42% des feedbacks négatifs. Formation managers intermédiaires recommandée sous 30 jours.',
  },
  {
    level: 'SUIVI', cls: 'badge-green',
    text: 'R&D à 0.68 — maintenir les conditions actuelles. Partager les bonnes pratiques avec les autres départements.',
  },
]

const INSIGHTS = [
  'Sales concentre 68% des signaux churn élevés alors qu\'il représente 30% des effectifs.',
  'Les employés avec OverTime=Yes ont un score NaloRH 23% inférieur à la moyenne.',
  'Corrélation r=0.16 entre score NLP et rétention — base solide pour le modèle ML S2.',
]

function downloadCSV() {
  const rows = [
    ['employe_id', 'departement', 'sentiment_label', 'sentiment_score', 'churn_risk_pct', 'churn_risk_level', 'themes'],
    ['EMP042', 'Sales',   'Négatif', '0.18', '74', 'CRITIQUE', 'Management|Reconnaissance'],
    ['EMP007', 'Tech',    'Positif', '0.89', '8',  'FAIBLE',   'Évolution'],
    ['EMP118', 'Sales',   'Négatif', '0.22', '68', 'CRITIQUE', 'Management|Salaire'],
    ['EMP077', 'R&D',     'Neutre',  '0.31', '52', 'ÉLEVÉ',    'Charge travail'],
    ['EMP091', 'HR',      'Neutre',  '0.35', '45', 'ÉLEVÉ',    'Évolution|Salaire'],
    ['EMP203', 'Sales',   'Négatif', '0.33', '48', 'ÉLEVÉ',    'Management'],
  ]
  const csv = rows.map(r => r.join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'NaloRH_resultats_enrichis.csv'
  a.click()
}

function copyLink(e) {
  navigator.clipboard.writeText('nalorh.pages.dev/r/xK9mP2')
  const btn = e.currentTarget
  btn.textContent = 'Copié !'
  setTimeout(() => btn.textContent = 'Copier', 2000)
}

export default function Rapport() {
  const navigate = useNavigate()

  return (
    <main className="rapport-page">
      <div className="page-wrap" style={{ paddingTop: 92 }}>
        <div className="page-header anim-fade-up">
          <h1 className="section-title">Rapport & Export</h1>
          <p className="page-sub">Téléchargez le rapport ou partagez un lien de lecture</p>
        </div>

        <div className="rapport-grid anim-fade-up-1">
          {/* ── Aperçu rapport ── */}
          <div className="report-preview">
            {/* En-tête sombre */}
            <div className="rp-header">
              <div className="rp-header-top">
                <div>
                  <div className="rp-logo">NaloRH</div>
                  <div className="rp-slogan">"Vos feedbacks parlent. NaloRH traduit."</div>
                </div>
                <div className="rp-meta">
                  <div>HR_Analytics.csv</div>
                  <div>1 480 employés · 3 depts</div>
                  <div>Rapport — Avril 2026</div>
                </div>
              </div>
              <div className="rp-kpis">
                {[
                  { val: '0.598', label: 'Score moyen', col: 'white' },
                  { val: '12.4%', label: 'Churn signal', col: '#D85A30' },
                  { val: '2',     label: 'Alertes depts', col: '#D85A30' },
                  { val: '87%',   label: 'Précision NLP', col: 'white' },
                ].map(k => (
                  <div className="rp-kpi" key={k.label}>
                    <div className="rp-kpi-val" style={{ color: k.col }}>{k.val}</div>
                    <div className="rp-kpi-label">{k.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Corps */}
            <div className="rp-body">
              <div className="rp-section-label">Recommandations prioritaires</div>
              {RECOS.map(r => (
                <div className="rp-reco-item" key={r.level}>
                  <span className={`badge ${r.cls}`}>{r.level}</span>
                  <p>{r.text}</p>
                </div>
              ))}

              <div className="divider" />
              <div className="rp-section-label">Insights clés</div>
              {INSIGHTS.map((ins, i) => (
                <div className="rp-insight" key={i}>
                  <span className="rp-arrow">→</span>
                  <p>{ins}</p>
                </div>
              ))}

              <div className="divider" />
              <div className="rp-section-label">Modèle utilisé</div>
              <div className="rp-model-row">
                <div className="rp-model-item">
                  <span className="rp-model-label">NLP</span>
                  <span>CamemBERT multilingue · 87% accuracy</span>
                </div>
                <div className="rp-model-item">
                  <span className="rp-model-label">Churn</span>
                  <span>RandomForest 300 arbres · F1=0.78 · AUC=0.82</span>
                </div>
                <div className="rp-model-item">
                  <span className="rp-model-label">Features</span>
                  <span>35 features · seuil optimal 0.42</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Options export ── */}
          <div className="export-sidebar">
            {/* PDF */}
            <div className="export-card export-featured">
              <div className="export-card-header">
                <span className="export-card-title">Rapport PDF complet</span>
                <span className="badge badge-green">Recommandé</span>
              </div>
              <p className="export-card-sub">Graphiques + recommandations + top risques + thèmes · ~8 pages</p>
              <button
                className="btn btn-primary btn-block"
                onClick={() => alert('Dans le projet complet, ReportLab génère le PDF côté FastAPI.\n\nEndpoint : GET /export/pdf')}
              >
                Télécharger PDF →
              </button>
            </div>

            {/* CSV */}
            <div className="export-card">
              <div className="export-card-header">
                <span className="export-card-title">Export CSV enrichi</span>
              </div>
              <p className="export-card-sub">Données + sentiment_score, churn_risk_pct, themes</p>
              <button className="btn btn-outline btn-block" onClick={downloadCSV}>
                Télécharger CSV
              </button>
            </div>

            {/* Share */}
            <div className="export-card">
              <div className="export-card-header">
                <span className="export-card-title">Partager le rapport</span>
              </div>
              <p className="export-card-sub">Lien lecture seule · expire dans 7 jours</p>
              <div className="share-row">
                <input
                  className="share-input"
                  value="nalorh.pages.dev/r/xK9mP2"
                  readOnly
                />
                <button className="btn btn-primary btn-sm" onClick={copyLink}>Copier</button>
              </div>
            </div>

            {/* API */}
            <div className="export-card">
              <div className="export-card-header">
                <span className="export-card-title">API Swagger</span>
              </div>
              <p className="export-card-sub">Documentation interactive des endpoints FastAPI</p>
              <div className="share-row">
                <input className="share-input" value="…trycloudflare.com/docs" readOnly />
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => window.open('https://replacing-careful-physics-bent.trycloudflare.com/docs', '_blank')}
                >
                  Ouvrir ↗
                </button>
              </div>
            </div>

            {/* Schedule */}
            <div className="schedule-card">
              <div className="schedule-title">Rapport automatique</div>
              <p>Prochain envoi : lundi 06/05/2026</p>
              <p>Fréquence : hebdomadaire</p>
              <p>Destinataire : DRH</p>
            </div>

            <button
              className="btn btn-outline btn-sm"
              style={{ width: '100%', marginTop: 4 }}
              onClick={() => navigate('/dashboard')}
            >
              ← Retour au dashboard
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
