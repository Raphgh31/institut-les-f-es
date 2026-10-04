# CLAUDE.md : site de l'institut Les Fées Beauté

Site vitrine d'un institut de beauté à Baud (56). Toujours répondre et écrire en français.

## Pile
- Vite 5 + React 18 + React Router 6 (`HashRouter`, nécessaire sur GitHub Pages) + Framer Motion.
- `vite.config.js` : `base: './'`. Le mode `single` (`npm run build:single`) produit un fichier HTML
  autonome via `vite-plugin-singlefile` (utilisé pour les aperçus en artefact).
- Déploiement : `.github/workflows/deploy.yml` publie `dist/` sur GitHub Pages à chaque push sur `main`
  (Settings → Pages → Source : « GitHub Actions »).

## Structure
- `src/data/institut.js` : coordonnées, horaires, calcul « ouvert / fermé » (heure de Paris).
- `src/data/tarifs.js` : catégories et prestations (source unique pour les pages Soins et Tarifs), marques.
- `src/pages/` : Accueil, Soins, Tarifs, EpilationDefinitive, Boutique, Contact, Introuvable.
- `src/components/` : Header (navigation + menu mobile), Footer, Reveal (apparition au défilement),
  ListePrix (lignes avec points de conduite), EnTetePage, StatutOuverture.
- `src/styles.css` : jetons de couleur et de typographie en tête de fichier, puis styles par section.

## Identité visuelle
- Couleurs tirées de la vitrine et de l'intérieur : ardoise (enseigne), blanc (murs), chêne clair
  (tasseaux), prune (chaises), vert (points de la vitrine, utilisé en touches uniquement).
- Polices : Allura (logo uniquement), Marcellus (titres, prix), Figtree (texte).
- À éviter : dégradés violets, verre dépoli, émojis, tout centrer, coins arrondis et ombres partout,
  étiquettes en majuscules au-dessus des titres. Coins quasi droits (2px max sur les boutons).

## Règles
- Ne jamais inventer d'information sur l'institut (prix, prestations, horaires, parking…) : demander.
- Animations : `MotionConfig reducedMotion="user"` ; pas d'`initial={false}` sur l'`AnimatePresence`
  des pages ; un élément avec son propre `whileHover` n'hérite plus des variantes du parent.
- Avant de pousser : `npm run build` sans erreur, puis vérification navigateur à 1440 px et à 390 px.
