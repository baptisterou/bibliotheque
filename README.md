# 📚 Ma Bibliothèque Personnelle

Une application web moderne de gestion de bibliothèque personnelle développée avec React et Vite.

## 🚀 Fonctionnalités

### 📖 Gestion des Livres
- **Ajout de livres** avec suggestions automatiques via l'API Google Books
- **Modification** des informations d'un livre existant
- **Suppression** avec confirmation de sécurité
- **Visualisation** en cartes avec couvertures

### 🔍 Recherche et Filtrage
- **Recherche textuelle** dans le titre, auteur et résumé
- **Filtrage par genre** avec options dynamiques
- **Filtrage par année** de publication
- **Filtre favoris** pour afficher uniquement les livres préférés

### ⭐ Système de Favoris
- **Marquage rapide** des livres favoris d'un simple clic
- **Mise à jour optimiste** pour une expérience fluide
- **Persistance** des favoris en base de données

### 🎨 Interface Utilisateur
- **Mode sombre/clair** avec basculement instantané
- **Design responsive** avec Bootstrap 5
- **Pagination** pour une navigation facile
- **Animations** et transitions fluides

### 🔄 Fonctionnalités Avancées
- **Auto-complétion** avec l'API Google Books lors de l'ajout
- **Gestion d'erreurs** robuste
- **Sauvegarde automatique** des préférences de thème
- **Navigation** avec React Router

## 🛠️ Technologies Utilisées

### Frontend
- **React 19.1.0** - Framework JavaScript
- **Vite 7.0.4** - Bundler et serveur de développement
- **React Router DOM 7.7.0** - Gestion de la navigation
- **Bootstrap 5.3.7** - Framework CSS
- **React Transition Group 4.4.5** - Animations

### Développement
- **ESLint** - Linting et qualité de code
- **Google Fonts** - Typographies (Inter & Playfair Display)

### APIs
- **Google Books API** - Suggestions de livres
- **JSON Server** (recommandé) - Base de données locale

## 📦 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation des dépendances
```bash
npm install
```

### Configuration de la base de données
L'application utilise `db.json` comme base de données locale. Pour un serveur JSON :

```bash
# Installation globale de json-server (optionnel)
npm install -g json-server

# Démarrage du serveur sur le port 3001
json-server --watch db.json --port 3001
```

## 🚀 Démarrage

### Mode développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`

### Build de production
```bash
npm run build
```

### Prévisualisation de la build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📂 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── BookCard.jsx    # Carte d'affichage d'un livre
│   ├── FilterBar.jsx   # Barre de filtres
│   ├── Header.jsx      # En-tête avec navigation
│   └── ThemeToggle.jsx # Bouton de changement de thème
├── contexts/           # Contextes React
│   └── ThemeContext.jsx # Gestion du thème global
├── pages/              # Pages principales
│   ├── AddBook.jsx     # Page d'ajout de livre
│   ├── BookList.jsx    # Liste paginée des livres
│   └── EditBook.jsx    # Page de modification
├── App.jsx             # Composant principal
├── main.jsx           # Point d'entrée
├── App.css            # Styles principaux
└── index.css          # Styles globaux et typographie
```

## 🎨 Fonctionnalités Détaillées

### Ajout de Livres avec Auto-complétion
- Tapez le titre d'un livre pour obtenir des suggestions de l'API Google Books
- Sélectionnez une suggestion pour remplir automatiquement tous les champs
- Possibilité d'ajout manuel pour les livres non référencés

### Système de Thème
- **Mode clair** : Design épuré avec couleurs douces
- **Mode sombre** : Interface sombre pour réduire la fatigue oculaire
- **Sauvegarde automatique** de la préféférence utilisateur
- **Détection automatique** de la préférence système

### Filtrage Intelligent
- Les options de filtres s'adaptent dynamiquement aux autres filtres actifs
- Combinaison possible de tous les filtres simultanément
- Bouton de réinitialisation pour effacer tous les filtres

### Gestion des Favoris
- Mise à jour optimiste pour une réactivité immédiate
- Rollback automatique en cas d'erreur réseau
- Indicateurs visuels distinctifs

## 🔧 Configuration

### Variables d'Environnement
Le projet utilise l'API Google Books. Aucune clé API n'est requise pour les requêtes de base.

### Personnalisation des Styles
Les thèmes sont définis dans `src/App.css` :
- Variables CSS pour les couleurs
- Classes `.light-theme` et `.dark-theme`
- Animations et transitions personnalisables

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints Bootstrap :
- **Mobile** : 1 livre par ligne
- **Tablette** : 2 livres par ligne  
- **Desktop** : 3-4 livres par ligne selon la taille

## 🛡️ Gestion des Erreurs

- **Validation des formulaires** avec messages d'erreur
- **Gestion des erreurs réseau** avec rollback automatique
- **États de chargement** pour les opérations asynchrones
- **Confirmation de suppression** pour éviter les erreurs

## 🔮 Améliorations Futures

- [ ] Système de notes et avis/commentaires de lecture
- [ ] Recherche avancée avec opérateurs
- [ ] Export/Import de la bibliothèque
- [ ] Statistiques de lecture
- [ ] Recommandations basées sur les goûts
- [ ] MoSysteme de livres lus/ non lus

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Baptiste** - Développeur passionné de React

---

⭐ N'hésitez pas à donner une étoile si ce projet vous plaît !