# CLAUDE.md : site de l'institut Les Fées Beauté

Site vitrine haut de gamme d'un institut de beauté à Baud (56). Toujours répondre et écrire en français.

## Pile
- Vite 5 + React 18 + React Router 6 (`HashRouter`, nécessaire sur GitHub Pages) + Framer Motion + three.js.
- `vite.config.js` : `base: './'`. Le mode `single` (`npm run build:single`) produit un fichier HTML
  autonome via `vite-plugin-singlefile` (utilisé pour l'aperçu en artefact).
- Déploiement : `.github/workflows/deploy.yml` publie `dist/` sur GitHub Pages à chaque push sur `main`
  (Settings → Pages → Source : « GitHub Actions »).
- Polices auto-hébergées dans `src/assets/fonts/` (aucun appel à Google) : Bodoni Moda (titres, prix),
  Figtree (texte), Allura (logo uniquement).

## Structure
- `src/data/institut.js` : coordonnées, horaires, calcul « ouvert / fermé » (heure de Paris).
- `src/data/tarifs.js` : catégories et prestations (source unique pour Soins, Tarifs et le récit d'accueil),
  marques, `trouver()` et `nombrePrestations`.
- `src/data/galerie.js` : photos du lookbook (format, cadrage, légendes).
- `src/motion/tokens.js` : jetons de mouvement (ease, durées, distances, variantes). Les mêmes valeurs
  existent en CSS (`--ease-*`, `--duration-*`, `--motion-distance-*`).
- `src/components/ui/` : briques du système de design (Bouton, BoutonRdv, Section + fond tonal, Reveal,
  TitreRevele, Arche, Galet).
- `src/components/` : Header, Footer, Finale, TransitionPage, Curseur, Perle (3D), RecitSoins, CarteSoin,
  Lookbook, Lightbox, EnTetePage, Chiffres, BonCadeau, Annotation, ListePrix, Prix, StatutOuverture.
- `src/three/perle.js` : la sculpture 3D (sphère déformée par un bruit, matériau nacré, poudre ou champagne).
- `src/assets/perles/` : images fixes de la perle, produites avec `outils/atelier-perle.html`
  (lancer `npm run dev` puis ouvrir `/outils/atelier-perle.html?matiere=nacre&taille=1000`).
- `src/pages/` : Accueil, Soins, Tarifs, EpilationDefinitive, Institut, Boutique, Contact,
  MentionsLegales, Confidentialite, Introuvable. Les pages intérieures sont chargées à la demande.

## Direction artistique
- Luxe par la retenue : magazine de beauté, beaucoup d'espace, compositions asymétriques alignées à gauche.
- Couleurs : ivoire, nude, rose poudré (fonds), ardoise de l'enseigne (noir doux, section finale et pied),
  prune des chaises (boutons d'action), champagne des tasseaux (traits fins), vert (statut « ouvert » seulement).
- Le fond change de teinte selon la section lue : `<Section ton="nude">` (tons : ivoire, nude, poudre).
- Langage de formes, à respecter partout :
  - **arche** : cadre des photos (`Arche`, `.arche--large` pour les photos en largeur) ;
  - **galet** : halo et profondeur derrière un objet (`Galet`, variantes qui se transforment l'une en l'autre) ;
  - **capsule** : tout ce qui se clique (boutons, filtres) ;
  - **trait fin** champagne : séparations et liens entre éléments.
- 3D : une seule perle vivante (hero d'accueil). Ailleurs, images fixes de la perle. Jamais de 3D
  indispensable à la lecture.
- À éviter : dégradés criards, néon, verre dépoli en excès, émojis, cartes identiques arrondies avec ombres,
  animations permanentes, effets gadgets.

## Règles
- Ne jamais inventer d'information sur l'institut (prix, prestations, horaires, parking, avis, photos
  avant/après…) : demander.
- Animations : passer par les jetons de `src/motion/tokens.js`. `MotionConfig reducedMotion="user"` et
  `skipAnimations` quand l'utilisateur réduit les animations : tout doit rester lisible sans mouvement.
  Pas d'`initial={false}` sur l'`AnimatePresence` des pages ; un élément avec son propre `whileHover`
  n'hérite plus des variantes du parent.
- Défilement : `useScroll`/`useTransform` (transform et opacity uniquement) ou IntersectionObserver.
  Jamais d'écouteur `scroll` maison, jamais d'animation de `width`, `top` ou `left`.
- La perle 3D se met en pause hors écran, se simplifie sur mobile et laisse place à l'image fixe si
  l'appareil est lent, si WebGL manque ou si les animations sont réduites.
- Avant de pousser : `npm run build` sans erreur, puis vérification navigateur à 1440 px et à 390 px.
