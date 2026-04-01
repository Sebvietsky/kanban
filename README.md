# O'Kanban — Application de gestion de tâches full-stack

O'Kanban est une application de gestion de tâches inspirée des tableaux Kanban (type Trello).  
Elle permet de créer, organiser et gérer des listes, des cartes et des tags via une interface web connectée à une API REST.
## 📸 Aperçu de l'application

### Board principal
![Board](./assets/okanban-interface.png)

### Interaction (création / modification de carte)
![Create Card](./assets/crud-okanban.gif)

### Authentification
![Login](./assets/okanban-register.png)

Ce projet m’a permis de travailler sur une architecture **full-stack** avec :
- un **backend Node.js / Express**
- une **base de données PostgreSQL**
- un **frontend Svelte**
- une orchestration avec **Docker Compose**

---

## 🎯 Objectifs du projet

L’objectif principal était de concevoir une application de type Kanban avec une architecture claire côté backend et une interface fonctionnelle côté frontend, tout en intégrant plusieurs notions clés :

- création d’une API REST
- gestion d’une base de données relationnelle
- authentification utilisateur
- système de rôles
- sécurisation de l’application
- conteneurisation avec Docker

---

## ⚙️ Stack technique

### Backend
- Node.js
- Express
- Sequelize
- PostgreSQL
- Joi (validation)
- JSON Web Token (JWT)
- Argon2 (hash des mots de passe)
- express-xss-sanitizer
- CORS

### Frontend
- Svelte
- Vite
- Fetch API

### Outils
- Docker
- Docker Compose
- Nodemon

---

## 🚀 Fonctionnalités principales

- Authentification utilisateur (JWT)
- Gestion des rôles (admin / utilisateur)
- Création et gestion de listes
- Création et gestion de cartes
- Gestion des tags
- API REST structurée
- Protection contre certaines failles courantes (XSS)
- Lancement multi-services avec Docker Compose
- Correction automatique du texte via intégration d’une API d’IA (Mistral)

---

## 🤖 Intégration d’une API d’IA

L’application intègre l’API Mistral afin de corriger automatiquement les fautes d’orthographe dans les contenus saisis par l’utilisateur.

Cela m’a permis de travailler sur :
- l’appel à une API externe
- la gestion des réponses asynchrones
- l’intégration d’une fonctionnalité d’IA dans une application web

## 📂 Structure du projet

```bash
kanban-board-project/
├── api/
│   ├── controllers/
│   ├── middlewares/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```
--- 
## 🧠 Ce que j’ai travaillé dans ce projet
### 🔧 Backend (partie principale)
- Structuration d’une API REST (routes, controllers, middlewares)
- Mise en place d’une authentification sécurisée (JWT + Argon2)
- Gestion des rôles utilisateurs
- Modélisation et manipulation d’une base de données relationnelle (Sequelize / PostgreSQL)
- Validation des données avec Joi
- Sécurisation de l’application (XSS, CORS)
- Gestion des erreurs globale
- Intégration d’une API externe (Mistral) pour la correction de texte

### 🎨 Frontend

Une partie du frontend était déjà fournie.

👉 Mon travail côté frontend a consisté à :

- manipuler Svelte pour intégrer la logique applicative
- connecter le frontend à l’API via la Fetch API
- gérer les interactions avec les données (cartes, listes, etc.)

Je n’ai pas eu à travailler sur :

- le design UI
- Tailwind CSS (déjà en place)

### 🧩 Ce que ce projet m’a appris
- Structurer une application backend de manière claire et maintenable
- Concevoir une API REST complète
- Gérer une authentification sécurisée
- Manipuler une base de données relationnelle
- Comprendre les interactions front / back
- Débugger une application full-stack
  
## ⚙️ Installation et lancement
Prérequis : 
- Node.js
- npm
- PostgreSQL
- Docker / Docker Compose (option recommandé)


### 🚀 Lancement en local
1. Cloner le dépôt
```bash 
git clone https://github.com/Sebvietsky/kanban-board-project.git
cd kanban-board-project
```
2. Configurer les variables d’environnement
   
**Backend**

Créer un fichier `api/.env` :

```bash 
PORT=3000
PG_URL=postgres://user:password@localhost:5432/okanban
JWT_SECRET=your_secret_key
MISTRAL_API_KEY=you_need_to_generate_a_key_on_mistal_ai
```

**Frontend**

Créer un fichier `client/.env` :
```bash 
VITE_API_URL=http://localhost:3000
```

1. Installer les dépendances
   
**Backend**
```bash 
cd api
npm install
```
**Frontend**
```bash 
cd ../client
npm install
```
1. Initialiser la base de données
```bash 
cd api
npm run db:create
npm run db:seed
```

2. Lancer le backend
```bash 
npm run dev
```
3. Lancer le frontend
```bash 
cd ../client
npm run dev
```

🐳 Lancement avec Docker

Depuis la racine du projet :
```bash 
docker compose up --build
```

## 📈 Axes d’amélioration
- Ajouter des tests automatisés
- Améliorer l’UX/UI
- Documenter les endpoints (Swagger)
- Déployer le projet en ligne
- Ajouter des screenshots du projet
- Mettre en place une CI/CD
  
---
  
## ℹ️ Remarque

Ce projet a été réalisé dans le cadre de ma formation, puis retravaillé pour être présenté dans mon portfolio.