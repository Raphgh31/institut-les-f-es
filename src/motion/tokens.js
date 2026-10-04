// Langage de mouvement du site : toutes les animations s'appuient sur ces valeurs.
// Les mêmes jetons existent en CSS (--ease-*, --duration-*, --motion-distance-*) dans styles.css.

export const ease = {
  soft: [0.25, 0.1, 0.25, 1], // apparitions courantes
  smooth: [0.22, 0.61, 0.36, 1], // survols, entrées de texte
  editorial: [0.65, 0, 0.35, 1], // grands mouvements : rideau, masques, menu
}

export const duration = {
  fast: 0.3,
  medium: 0.6,
  slow: 1,
}

export const distance = {
  small: 12,
  medium: 28,
}

export const stagger = {
  tight: 0.06,
  soft: 0.12,
}

// Variantes réutilisables
export const apparition = (d = distance.medium, delay = 0) => ({
  cache: { opacity: 0, y: d },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow * 0.9, ease: ease.smooth, delay },
  },
})

export const fondu = {
  cache: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.medium, ease: ease.soft } },
}

export const cascade = (pas = stagger.soft, depart = 0) => ({
  visible: { transition: { staggerChildren: pas, delayChildren: depart } },
})

// Ligne de texte révélée par un masque (le texte monte dans sa propre ligne).
export const ligneMasquee = {
  cache: { y: '105%' },
  visible: { y: '0%', transition: { duration: duration.slow, ease: ease.smooth } },
}
