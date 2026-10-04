# Institut Les Fées Beauté

Site de l'institut de beauté Les Fées Beauté, ZA de Kermestre à Baud (56).

## Mettre le site en ligne (une seule fois)

1. Sur GitHub, ouvrir **Settings → Pages**.
2. Dans **Source**, choisir **GitHub Actions**.

Ensuite, chaque modification poussée sur `main` met le site à jour automatiquement en une à deux
minutes. Pour relancer une mise en ligne à la main : onglet **Actions → Mise en ligne → Run workflow**.

Adresse du site : `https://raphgh31.github.io/institut-les-f-es/`

## Modifier le contenu

Les textes qui changent souvent sont rassemblés dans deux fichiers, modifiables directement depuis
GitHub (bouton crayon) :

| Ce que vous voulez changer | Fichier |
| --- | --- |
| Téléphone, e-mail, adresse, lien Planity, horaires | `src/data/institut.js` |
| Prestations, prix, durées, descriptions, marques | `src/data/tarifs.js` |
| Photos | `src/assets/photos/` (garder le même nom de fichier) |

Les textes des pages sont dans `src/pages/` (un fichier par page).

## Travailler en local

```bash
npm install
npm run dev      # aperçu sur http://localhost:5173
npm run build    # version de production dans dist/
```

`npm run build:single` produit une version en un seul fichier HTML (`dist-single/index.html`),
pratique pour envoyer un aperçu.
