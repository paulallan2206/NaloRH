/**
 * NaloRH API Client
 * Tous les appels vers l'API FastAPI (Render.com en prod, Colab/Cloudflare en dev)
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`API ${res.status}: ${err}`)
  }
  return res.json()
}

/** GET /health — statut de l'API */
export const getHealth = () => request('/health')

/** GET /model/info — métriques du modèle ML */
export const getModelInfo = () => request('/model/info')

/**
 * POST /analyze — analyse un feedback individuel
 * @param {object} payload - { texte, employe_id, departement, monthly_income, ... }
 */
export const analyzeFeedback = (payload) =>
  request('/analyze', { method: 'POST', body: JSON.stringify(payload) })

/**
 * POST /analyze/batch — analyse un batch de feedbacks
 * @param {Array} feedbacks - tableau de FeedbackInput
 */
export const analyzeBatch = (feedbacks) =>
  request('/analyze/batch', {
    method: 'POST',
    body: JSON.stringify({ feedbacks }),
  })

/** Parse un fichier CSV en tableau d'objets */
export function parseCSV(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) throw new Error('CSV vide ou mal formaté')
  const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''))
  return lines.slice(1).map((line) => {
    const vals = line.split(',').map((v) => v.trim().replace(/"/g, ''))
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] || '']))
  })
}

/** Colonnes requises pour l'analyse batch */
export const REQUIRED_COLS = ['texte', 'employe_id', 'date', 'departement']

/** Vérifie que le CSV a les bonnes colonnes */
export function validateCSVHeaders(rows) {
  if (!rows.length) return { valid: false, missing: REQUIRED_COLS }
  const cols = Object.keys(rows[0])
  const missing = REQUIRED_COLS.filter((c) => !cols.includes(c))
  return { valid: missing.length === 0, missing }
}
