# Frontend Outil de Mailing

Interface utilisateur pour l'outil de mailing, built avec Vue 3 et Vite.

## Pages

- **/** (homepage.vue) : Page d'accueil avec gestion des entreprises, contacts et campagnes.
- **/campagne/:id** (data_campagne.vue) : Détails d'une campagne avec graphiques de statistiques.

## Composants

### Homepage
- **entreprise.vue** : Gestion des entreprises.
- **list_contact.vue** : Affichage et gestion des listes de contacts.
- **campagne.vue** : Création et gestion des campagnes.

### Upload
- **uploader_csv.vue** : Upload de fichiers CSV.
- **zone_dropped.vue** : Zone de drop pour les fichiers.

### Graphiques
- **donuts.vue** : Graphiques en donuts pour les statistiques.
- **HorizontaleGraphique.vue** : Graphiques horizontaux.
- **compare.vue** : Comparaisons graphiques.
- **carousel_link.vue** : Carousel de liens.

## Dépendances

- vue : Framework principal.
- vue-router : Routage.
- pinia : Gestion d'état.
- axios : Requêtes HTTP.
- vue-data-ui : Composants de graphiques.

## Organisation

L'application est organisée en vues, composants réutilisables, un store Pinia pour l'état global, et un router pour la navigation. Les composants sont groupés par fonctionnalité (homepage, graphique, uploader).

## Démarrage

```bash
npm install
npm run dev
```
ou alors click sur start.bat

Le serveur de développement écoute sur http://localhost:5173.
