# 🌿 NaloRH — Analyseur de Feedback RH par IA

> **"Vos feedbacks parlent. NaloRH traduit."**

Analyseur de feedbacks employés propulsé par IA/NLP — open source, gratuit, francophone.
Conçu pour les PME africaines (Gabon, Côte d'Ivoire, Sénégal...).

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-green.svg)](https://fastapi.tiangolo.com)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed-Cloudflare_Pages-orange.svg)](https://pages.cloudflare.com)

---

## ✨ Fonctionnalités

- 🧠 **NLP francophone** — CamemBERT multilingue, score sentiment 0→1, précision 87%
- ⚡ **Prédiction churn** — RandomForest sur 35 features, F1=0.78, AUC=0.82
- 📊 **Dashboard interactif** — graphiques Recharts, heatmap, top risques
- 📄 **Export PDF & CSV** — rapport complet + recommandations IA
- 🌍 **Gratuit, open source MIT** — zéro coût de licence

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
│   │   ├── Landing.jsx / .css
│   │   ├── Analyser.jsx / .css
│   │   ├── Dashboard.jsx / .css
│   │   └── Rapport.jsx / .css
│   ├── App.jsx                # Router principal
│   ├── main.jsx
│   └── index.css              # Design system NaloRH
├── index.html
├── vite.config.js
├── _redirects                 # Cloudflare Pages SPA routing
├── .env.example
└── package.json
```

---

## 🚀 Lancement en local

```bash
# 1. Cloner le repo
git clone https://github.com/TON_USERNAME/nalorh.git
cd nalorh

# 2. Installer les dépendances
npm install

# 3. Configurer l'API
cp .env.example .env.local
# Édite .env.local et mets ton URL API :
# VITE_API_URL=https://ton-url.trycloudflare.com

# 4. Lancer en développement
npm run dev
# → http://localhost:5173
```

---

## ☁️ Déploiement sur Cloudflare Pages

### Étape 1 — Pousser sur GitHub

```bash
git init
git add .
git commit -m "feat: NaloRH v1.0"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/nalorh.git
git push -u origin main
```

### Étape 2 — Connecter Cloudflare Pages

1. Va sur [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Create a project** → **Connect to Git** → Sélectionne ton repo `nalorh`
3. Paramètres de build :
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
4. **Environment Variables** → Ajoute :
   ```
   VITE_API_URL = https://nalorh-api.onrender.com
   ```
5. **Save and Deploy** → URL : `nalorh.pages.dev` 🎉

### Étape 3 — Déployer l'API sur Render.com

1. Va sur [render.com](https://render.com)
2. **New Web Service** → Connect GitHub → repo `nalorh-api`
3. Paramètres :
   - **Build command** : `pip install -r requirements.txt`
   - **Start command** : `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Deploy → URL : `https://nalorh-api.onrender.com`

---

## 🔌 API FastAPI — Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Statut API + version modèle |
| GET | `/model/info` | Métriques ML (F1, AUC, threshold) |
| POST | `/analyze` | Analyse un feedback individuel |
| POST | `/analyze/batch` | Analyse un batch de feedbacks |
| GET | `/export/pdf` | Génère le rapport PDF |
| GET | `/export/csv` | Export CSV enrichi |

**Exemple curl :**
```bash
curl -X POST https://nalorh-api.onrender.com/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "texte": "Je suis très insatisfait, je cherche activement ailleurs.",
    "employe_id": "EMP042",
    "departement": "Sales",
    "monthly_income": 2200,
    "overtime": true
  }'
```

---

## 🧪 Stack technique

| Couche | Technologie |
|--------|------------|
| Frontend | React 18 + Vite + React Router |
| Charts | Recharts |
| Backend | Python / FastAPI |
| NLP | HuggingFace Transformers (CamemBERT) |
| ML Churn | Scikit-learn (RandomForest) |
| Hosting Frontend | Cloudflare Pages |
| Hosting API | Render.com |
| Tunnel dev | Cloudflare Tunnel |

---

## 📊 Métriques du modèle

| Métrique | Valeur | Cible |
|----------|--------|-------|
| NLP Accuracy | **87%** | ≥ 80% ✅ |
| Churn F1-score | **0.78** | ≥ 0.78 ✅ |
| Churn AUC | **0.82** | ≥ 0.75 ✅ |
| Latence /analyze | **< 2s** | < 3s ✅ |

---

## 📝 License

MIT © 2026 — Fait avec ❤️ pour les PME africaines
