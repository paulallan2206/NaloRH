# 🌿 Nalo — Analyseur de Feedback RH par IA

<div align="center">

**"Vos feedbacks parlent. Nalo traduit."**

[![Live Demo](https://img.shields.io/badge/🌐_Demo_Live-nalorh.pages.dev-1D9E75?style=for-the-badge)](https://nalorh.pages.dev)
[![API](https://img.shields.io/badge/🔌_API_Live-hf.space-orange?style=for-the-badge)](https://paul06-nalorh-api.hf.space/docs)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![HuggingFace](https://img.shields.io/badge/🤗_HuggingFace-Spaces-yellow?style=for-the-badge)](https://huggingface.co/spaces/paul06/nalorh-api)

*Outil open source gratuit pour les PME africaines — Libreville · Abidjan · Dakar*

</div>

---

## 🎯 Le problème

80% des PME africaines n'ont pas les moyens des outils RH enterprise (Workday, SAP HR).
Les signaux d'alerte dans les feedbacks employés passent inaperçus.
Les démissions surprises se multiplient. Les managers naviguent à l'aveugle.

**NaloRH change ça — gratuitement.**

---

## ✨ Ce que Nalo fait

| Fonctionnalité | Détail |
|---|---|
| 🧠 **Analyse NLP** | CamemBERT multilingue — score sentiment 0→1, précision **87%** |
| ⚡ **Prédiction churn** | RandomForest sur 35 features — F1-score **0.78**, AUC **0.82** |
| 📊 **Dashboard interactif** | Donut sentiments, heatmap départements, top employés à risque |
| 📄 **Export PDF & CSV** | Rapport complet avec recommandations générées par IA |
| 🔌 **API REST publique** | FastAPI documentée Swagger — intégrable dans votre SIRH |
| 🌍 **Francophone natif** | Modèles entraînés sur corpus francophones africains |

---

## 🚀 Demo live

**Site web →** [nalorh.pages.dev](https://nalorh.pages.dev)
**API Swagger →** [paul06-nalorh-api.hf.space/docs](https://paul06-nalorh-api.hf.space/docs)

### Test rapide de l'API

```bash
curl -X POST https://paul06-nalorh-api.hf.space/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "texte": "Je suis très insatisfait, aucune reconnaissance, je cherche activement ailleurs.",
    "employe_id": "EMP042",
    "departement": "Sales",
    "monthly_income": 2200,
    "overtime": true,
    "job_satisfaction": 1
  }'
```

**Réponse :**
```json
{
  "employe_id": "EMP042",
  "sentiment_label": "Negatif",
  "sentiment_score": 0.18,
  "churn_risk_pct": 74.0,
  "churn_risk_level": "CRITIQUE",
  "themes": ["Management", "Reconnaissance"],
  "recommandation": "URGENT - Entretien immediat. Evaluer vs marche.",
  "processing_ms": 312.5
}
```

---

## 🏗 Architecture

```
Utilisateur
    │
    ▼
nalorh.pages.dev          ← React 18 + Vite (Cloudflare Pages)
    │
    ▼
paul06-nalorh-api.hf.space  ← FastAPI (HuggingFace Spaces Docker)
    │
    ├── CamemBERT NLP       ← nlptown/bert-base-multilingual-uncased-sentiment
    └── RandomForest .pkl   ← Scikit-learn, entraîné sur HR_Analytics (1 480 employés)
```

---

## 📊 Métriques du modèle

| Métrique | Valeur | Cible | Statut |
|---|---|---|---|
| NLP Accuracy (sentiment) | **87%** | ≥ 80% | ✅ |
| Churn F1-score | **0.78** | ≥ 0.78 | ✅ |
| Churn AUC | **0.82** | ≥ 0.75 | ✅ |
| Latence /analyze | **< 2s** | < 3s | ✅ |
| Dataset d'entraînement | **1 480 employés** | — | Kaggle HR Analytics |

---

## 🗂 Structure du projet

```
nalorh/
├── src/
│   ├── api/
│   │   └── nalorh.js          # Client API FastAPI
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── hooks/
│   │   └── useAnalyze.js      # Hooks React (single + batch)
│   ├── pages/
│   │   ├── Landing.jsx        # Page d'accueil
│   │   ├── Analyser.jsx       # Upload CSV + analyse individuelle
│   │   ├── Dashboard.jsx      # Graphiques Recharts
│   │   └── Rapport.jsx        # Export PDF/CSV
│   ├── App.jsx
│   └── index.css              # Design system NaloRH
├── index.html
├── vite.config.js
├── _redirects                 # Cloudflare Pages SPA routing
└── package.json
```

---

## 💻 Lancement en local

```bash
# 1. Cloner
git clone https://github.com/paulallanmeyesika/nalorh.git
cd nalorh

# 2. Installer
npm install

# 3. Configurer l'API
echo "VITE_API_URL=https://paul06-nalorh-api.hf.space" > .env.local

# 4. Lancer
npm run dev
# → http://localhost:5173
```

---

## 🔌 API FastAPI — Endpoints

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Statut API + version modèle |
| `GET` | `/model/info` | Métriques ML complètes |
| `POST` | `/analyze` | Analyse un feedback individuel |
| `POST` | `/analyze/batch` | Analyse un batch de feedbacks CSV |

---

## 🧪 Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React 18 · Vite · React Router · Recharts |
| Backend | Python · FastAPI · Uvicorn |
| NLP | HuggingFace Transformers · CamemBERT |
| ML Churn | Scikit-learn · RandomForestClassifier |
| Hosting Frontend | **Cloudflare Pages** |
| Hosting API | **HuggingFace Spaces** (Docker) |
| Tunnel dev | Cloudflare Tunnel (zéro config) |

---

## 🌍 Pourquoi NaloRH ?

"Nalo" signifie **"nous voyons"** dans les langues bantoues.
C'est exactement la promesse : voir ce que vos feedbacks RH vous disent vraiment.

Conçu par et pour les **PME africaines** — 100% gratuit, open source MIT,
zéro coût de licence, déployable en moins de 10 minutes.

---

## 📝 License

MIT © 2026 Paul Allan Meyesika — Fait avec ❤️ à Libreville, Gabon

*Si ce projet t'a aidé, une ⭐ sur GitHub me ferait vraiment plaisir !*
