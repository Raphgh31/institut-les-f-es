import { motion } from 'framer-motion'
import { duration, ease } from '../../motion/tokens.js'

// Trois variantes d'une même forme organique (mêmes commandes, pour pouvoir passer de l'une à l'autre).
export const GALETS = [
  'M50 4C72 4 94 18 96 44C98 70 80 96 52 96C24 96 4 78 4 52C4 26 28 4 50 4Z',
  'M54 6C78 8 96 26 94 50C92 76 74 94 48 94C22 94 6 74 8 48C10 22 30 4 54 6Z',
  'M46 5C70 2 92 22 95 47C98 72 78 97 50 95C22 93 3 73 5 47C7 21 22 8 46 5Z',
  'M52 3C76 6 97 24 95 52C93 78 70 97 46 95C20 93 2 72 6 46C10 22 28 1 52 3Z',
]

/** Forme organique décorative. `variante` choisit le tracé ; changer de variante l'anime en douceur. */
export default function Galet({ variante = 0, className = '', couleur = 'var(--poudre)', trait = false }) {
  return (
    <svg className={`galet ${className}`} viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none">
      <motion.path
        initial={false}
        animate={{ d: GALETS[variante % GALETS.length] }}
        transition={{ duration: duration.slow * 1.2, ease: ease.editorial }}
        fill={trait ? 'none' : couleur}
        stroke={trait ? couleur : 'none'}
        strokeWidth={trait ? 0.4 : 0}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
