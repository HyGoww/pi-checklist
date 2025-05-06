# ✅ Pi-Checklist

Une application de checklist interactive déployée sur Raspberry Pi avec un écran tactile. Elle permet d’ajouter, consulter et valider des tâches en temps réel, via une API Flask et une interface React minimaliste.

## 🖥️ Présentation

Pi-Checklist est une solution légère pensée pour tourner sur Raspberry Pi OS Lite, tout en offrant une interface utilisateur accessible sur un petit écran 7 pouces. C’est un outil pratique pour suivre des routines, des procédures, ou des listes de contrôle dans un atelier, un bureau, ou à la maison.

---

## 🚀 Fonctionnalités

- 📋 **Liste de tâches** dynamique avec mise à jour immédiate de l'état.
- ➕ **Ajout de tâches** depuis une interface web.
- ✅ **Validation instantanée** avec mise à jour côté API et interface.
- 🔄 **Synchronisation en temps réel** (WebSocket possible pour amélioration future).
- 🌐 **Déploiement headless** sur Raspberry Pi, avec affichage sur écran local.
- 🧾 **API REST sécurisée** avec token Bearer simple.

---

## ⚙️ Stack technique

- **Frontend** : React + TypeScript + Tailwind CSS
- **Backend** : Flask (Python) + JSON file as DB
- **API Auth** : Token Bearer simplifié
- **Déploiement** : Raspberry Pi OS Lite + `pm2` ou `systemd` pour maintenir l’API
- **Versioning** : GitHub

---

## 🧱 Structure du projet

```bash
pi-checklist/
├── backend/
│   └── app.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Tasks.tsx
│   │   ├── api/
│   │   │   └── api.ts
│   │   └── App.tsx
│   └── .env
├── .gitignore
└── README.md
```
