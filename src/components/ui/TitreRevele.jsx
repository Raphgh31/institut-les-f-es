import { motion } from 'framer-motion'
import { cascade, ligneMasquee, stagger } from '../../motion/tokens.js'

/**
 * Titre dont chaque ligne monte dans son propre masque.
 * `lignes` : tableau de chaînes, une par ligne visuelle.
 * `auChargement` : anime dès l'affichage (hero) au lieu d'attendre le défilement.
 */
export default function TitreRevele({ as = 'h2', lignes, className = '', auChargement = false, delai = 0, children }) {
  const Comp = motion[as]
  const declencheur = auChargement
    ? { initial: 'cache', animate: 'visible' }
    : { initial: 'cache', whileInView: 'visible', viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <Comp className={`titre-revele ${className}`} variants={cascade(stagger.soft, delai)} {...declencheur}>
      {children}
      {lignes.map((l, i) => (
        <span key={i} className="titre-revele__masque">
          <motion.span className="titre-revele__ligne" variants={ligneMasquee}>
            {l}
          </motion.span>
        </span>
      ))}
    </Comp>
  )
}
