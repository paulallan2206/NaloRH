import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSingleAnalysis, useBatchAnalysis } from '../hooks/useAnalyze'
import './Analyser.css'

const EXAMPLES = [
  { emoji: '😊', text: 'Excellent manager, projets stimulants, je me sens vraiment épanoui ici et je ne compte vraiment pas partir.' },
  { emoji: '😐', text: 'Travail correct, ni satisfait ni insatisfait, dans la moyenne du secteur pour ce genre de poste.' },
  { emoji: '😟', text: 'Surcharge de travail chronique, burn-out imminent, management toxique, je cherche activement ailleurs.' },
]

const DEPTS = ['Sales', 'Tech', 'RH', 'Finance', 'Research & Dev', 'Direction']

function SentimentColor(score) {
  if (score < 0.38) return 'var(--red)'
  if (score < 0.62) return 'var(--amber)'
  return 'var(--green)'
}

function RiskBadgeClass(level) {
  if (!level) return 'badge-gray'
  if (level === 'CRITIQUE' || level === 'ÉLEVÉ' || level === 'ELEVE') return 'badge-red'
  if (level === 'MOYEN') return 'badge-amber'
  return 'badge-green'
}

export default function Analyser() {
  const navigate = useNavigate()
  const [text, setText]   = useState('')
  const [dept, setDept]   = useState('Sales')
  const fileRef = useRef()

  const { result, loading: sLoading, error: sError, analyze } = useSingleAnalysis()
  const { results: bResults, progress, loading: bLoading, error: bError, filename, analyzeFile } = useBatchAnalysis()

  const handleAnalyze = () => {
    if (!text.trim()) return
    analyze({ texte: text, employe_id: 'TEST-001', departement: dept })
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (file) analyzeFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) analyzeFile(file)
  }

  return (
    <main className="analyser-page">
      <div className="page-wrap" style={{ paddingTop: 92 }}>
        <div className="page-header anim-fade-up">
          <h1 className="section-title">Analyser mes feedbacks</h1>
          <p className="page-sub">Importez un fichier CSV ou testez avec un feedback individuel</p>
        </div>

        <div className="analyser-grid anim-fade-up-1">
          {/* ── Col 1 : Upload CSV ── */}
          <div className="panel">
            <div className="panel-title">
              <span className="panel-num">1</span>
              Importer un fichier CSV
            </div>

            <div
              className={`drop-zone ${bLoading ? 'loading' : ''}`}
              onClick={() => !bLoading && fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('dragover') }}
              onDragLeave={(e) => e.currentTarget.classList.remove('dragover')}
              onDrop={(e) => { e.currentTarget.classList.remove('dragover'); handleDrop(e) }}
            >
              <div className="drop-icon">
                {bLoading ? <div className="spinner" /> : '↑'}
              </div>
              <p className="drop-title">
                {bLoading ? `Analyse en cours...` : 'Glissez votre CSV ici'}
              </p>
              <p className="drop-sub">
                {bLoading ? filename : 'ou cliquez pour sélectionner · Max 200 lignes'}
              </p>
              {!bLoading && (
                <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); fileRef.current?.click() }}>
                  Choisir un fichier
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFile} />

            <div className="cols-tags">
              <span className="eyebrow" style={{ fontSize: 10, marginRight: 6 }}>Colonnes :</span>
              {['texte', 'employe_id', 'date', 'departement'].map(c => (
                <span key={c} className="badge badge-green">{c}</span>
              ))}
            </div>

            {/* Progress */}
            {(bLoading || bResults) && (
              <div className="progress-block">
                <div className="progress-header">
                  <span className="progress-file">{filename}</span>
                  <span className="badge badge-green">
                    {bResults
                      ? `${bResults.total} analysés`
                      : `${Math.round(progress * (bResults?.total || 200) / 100)} / 200`}
                  </span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: bLoading ? `${progress}%` : '100%' }} />
                </div>
                <div className="progress-meta">
                  <span>{bLoading ? `${Math.round(progress)}%` : '✅ Terminé'}</span>
                  <span>CamemBERT + RandomForest v1.0</span>
                </div>
                {bResults && (
                  <div className="batch-summary">
                    <div className="bs-item">
                      <span className="bs-val">{bResults.total}</span>
                      <span className="bs-label">analysés</span>
                    </div>
                    <div className="bs-item">
                      <span className="bs-val" style={{ color: 'var(--green)' }}>{bResults.score_moyen}</span>
                      <span className="bs-label">score moyen</span>
                    </div>
                    <div className="bs-item">
                      <span className="bs-val" style={{ color: 'var(--red)' }}>{bResults.pct_a_risque}%</span>
                      <span className="bs-label">churn élevé</span>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard')}>
                      Dashboard →
                    </button>
                  </div>
                )}
              </div>
            )}

            {bError && (
              <div className="error-box">⚠️ {bError}</div>
            )}
          </div>

          {/* ── Col 2 : Feedback individuel ── */}
          <div className="panel">
            <div className="panel-title">
              <span className="panel-num">2</span>
              Tester un feedback individuel
            </div>

            <textarea
              className="input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Écrivez ou collez un feedback employé ici..."
              rows={4}
            />

            <div className="analyze-row">
              <select className="input" value={dept} onChange={(e) => setDept(e.target.value)} style={{ flex: 'none', width: 140 }}>
                {DEPTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <button
                className="btn btn-primary btn-block"
                onClick={handleAnalyze}
                disabled={sLoading || !text.trim()}
              >
                {sLoading ? <><span className="spinner" style={{ width: 14, height: 14 }} /> Analyse...</> : 'Analyser →'}
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="result-panel anim-fade-in">
                <div className="result-label-row">
                  <span className="eyebrow" style={{ fontSize: 10 }}>Résultat NaloRH</span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{result.processing_ms}ms</span>
                </div>
                <div className="result-row">
                  <span className="rl">Sentiment</span>
                  <span className={`badge ${result.sentiment_score < 0.38 ? 'badge-red' : result.sentiment_score < 0.62 ? 'badge-amber' : 'badge-green'}`}>
                    {result.sentiment_label} — {result.sentiment_score}
                  </span>
                </div>
                <div className="result-row">
                  <span className="rl">Churn risk</span>
                  <span className={`badge ${RiskBadgeClass(result.churn_risk_level)}`}>
                    {result.churn_risk_pct}% — {result.churn_risk_level}
                  </span>
                </div>
                <div className="result-row">
                  <span className="rl">Thèmes</span>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {result.themes?.map(t => <span key={t} className="badge badge-amber">{t}</span>)}
                  </div>
                </div>
                <div className={`reco-box ${result.churn_risk_pct > 45 ? 'reco-red' : result.churn_risk_pct > 25 ? 'reco-amber' : 'reco-green'}`}>
                  {result.recommandation}
                </div>

                {/* Churn bar visual */}
                <div className="churn-bar-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Risque de churn</span>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, color: SentimentColor(1 - result.churn_risk_pct / 100) }}>
                      {result.churn_risk_pct}%
                    </span>
                  </div>
                  <div className="churn-track">
                    <div
                      className="churn-fill"
                      style={{
                        width: `${result.churn_risk_pct}%`,
                        background: result.churn_risk_pct > 65 ? 'var(--red)' : result.churn_risk_pct > 40 ? 'var(--amber)' : 'var(--green)',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {sError && <div className="error-box">⚠️ API non disponible — vérifie que ton serveur Colab tourne. <br /><code>{sError}</code></div>}

            {/* Exemples */}
            <div className="examples-block">
              <span className="eyebrow" style={{ fontSize: 10 }}>Exemples rapides</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                {EXAMPLES.map((ex, i) => (
                  <div
                    key={i}
                    className="example-item"
                    onClick={() => setText(ex.text)}
                  >
                    <span>{ex.emoji}</span>
                    <span>{ex.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
