# PopChoice

Une application de recommandation de films utilisant l'IA pour suggérer des films personnalisés basés sur les préférences utilisateur.

## Structure du Projet

```
popChoice/
├── src/
│   ├── pages/           # Pages HTML de l'application
│   │   ├── selection.html    # Page de sélection initiale
│   │   ├── questions.html    # Page des questions
│   │   └── result.html       # Page des résultats
│   ├── js/
│   │   ├── pages/       # JavaScript spécifique aux pages
│   │   │   ├── selection.js
│   │   │   ├── questions.js
│   │   │   └── result.js
│   │   ├── config.js    # Configuration OpenAI et Supabase
│   │   └── content.js   # Données des films
│   ├── css/
│   │   ├── main.css     # Styles principaux
│   │   ├── selection.css # Styles pour la page de sélection
│   │   └── components.css # Styles pour les composants
│   └── assets/
│       └── pop_img.png  # Logo de l'application
├── data/                # Données et scripts SQL
│   ├── movies.sql
│   ├── movies.txt
│   └── filter-rules.txt
├── docs/                # Documentation
│   └── README.md
├── index.html           # Point d'entrée principal
├── package.json
├── package-lock.json
├── vite.config.js
└── config.example.js
```

## Flux de l'Application

1. **Page de Sélection** (`src/pages/selection.html`)

   - L'utilisateur saisit le nombre de personnes et le temps disponible
   - Les données sont stockées dans le localStorage

2. **Page des Questions** (`src/pages/questions.html`)

   - L'utilisateur répond à des questions sur ses préférences
   - L'application utilise OpenAI pour créer des embeddings
   - Supabase est utilisé pour trouver le film le plus approprié

3. **Page des Résultats** (`src/pages/result.html`)
   - Affichage du film recommandé
   - Options pour recommencer ou retourner à l'accueil

## Technologies Utilisées

- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **IA** : OpenAI API (embeddings)
- **Base de données** : Supabase (PostgreSQL avec pgvector)
- **Build Tool** : Vite

## Installation

1. Cloner le repository
2. Installer les dépendances : `npm install`
3. Copier `config.example.js` vers `src/js/config.js` et configurer les clés API
4. Lancer le serveur de développement : `npm run dev`

## Configuration

Créer un fichier `src/js/config.js` basé sur `config.example.js` avec vos clés API :

- OpenAI API Key
- Supabase URL et Key

## Développement

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run preview` : Prévisualise la version de production
