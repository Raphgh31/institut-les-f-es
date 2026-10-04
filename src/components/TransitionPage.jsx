import { useLayoutEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../motion/tokens.js'

let premierAffichage = true

/**
 * Enveloppe de page : un rideau poudré à bord arrondi couvre l'écran pendant le changement de page,
 * puis se retire vers le haut. Au premier chargement, pas de rideau : le hero joue sa propre entrée.
 */
export default function TransitionPage({ children }) {
  const reduit = useReducedMotion()
  const avecRideau = !premierAffichage && !reduit

  useLayoutEffect(() => {
    premierAffichage = false
    if (!window.location.hash.split('#')[2]) window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div
      className="page"
      initial={{ opacity: reduit ? 0 : 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: reduit ? 0 : 1, transition: { duration: reduit ? 0.2 : 0.5 } }}
    >
      {children}
      {!reduit && (
        <motion.div
          className="rideau"
          aria-hidden="true"
          initial={{ y: avecRideau ? '0%' : '-115%' }}
          animate={{ y: '-115%', transition: { duration: 0.6, ease: ease.editorial, delay: 0.05 } }}
          exit={{ y: ['115%', '0%'], transition: { duration: 0.5, ease: ease.editorial } }}
        />
      )}
    </motion.div>
  )
}
