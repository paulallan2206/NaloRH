import { useState, useCallback } from 'react'
import { analyzeFeedback, analyzeBatch, parseCSV, validateCSVHeaders } from '../api/nalorh'

/** Hook pour l'analyse d'un feedback individuel */
export function useSingleAnalysis() {
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const analyze = useCallback(async (payload) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzeFeedback(payload)
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { result, loading, error, analyze }
}

/** Hook pour l'analyse batch d'un CSV */
export function useBatchAnalysis() {
  const [results, setResults]   = useState(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [filename, setFilename] = useState('')

  const analyzeFile = useCallback(async (file) => {
    setLoading(true)
    setError(null)
    setResults(null)
    setProgress(0)
    setFilename(file.name)

    try {
      const text = await file.text()
      const rows = parseCSV(text)
      const { valid, missing } = validateCSVHeaders(rows)

      if (!valid) {
        throw new Error(`Colonnes manquantes : ${missing.join(', ')}`)
      }

      // Simulation de progression (l'API traite tout d'un coup)
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + Math.random() * 6, 90))
      }, 250)

      // Préparer les payloads (max 200 pour le plan gratuit Render)
      const sample = rows.slice(0, 200)
      const feedbacks = sample.map((r) => ({
        texte:        r.texte || r.text || r.feedback || '',
        employe_id:   r.employe_id || r.employee_id || r.id || 'ANON',
        departement:  r.departement || r.department || r.dept || 'Non renseigné',
      }))

      const data = await analyzeBatch(feedbacks)

      clearInterval(progressInterval)
      setProgress(100)
      setResults(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, progress, loading, error, filename, analyzeFile }
}
