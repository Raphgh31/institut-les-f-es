import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Section from './ui/Section.jsx'
import TitreRevele from './ui/TitreRevele.jsx'
import Galet from './ui/Galet.jsx'
import { apparition } from '../motion/tokens.js'

/**
 * En-tête des pages intérieures : grand titre éditorial, chapeau,
 * et un visuel (photo en arche ou perle) qui dérive au défilement.
 */
export default function EnTetePage({ surtitre, lignes, children, visuel, galet = 0, tourne = false }) {
  const ref = useRef(null)
  const reduit = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduit ? 0 : -60])
  const rotation = useTransform(scrollYProgress, [0, 1], [0, reduit ? 0 : 14])

  return (
    <Section ref={ref} ton="ivoire" className="entete-page">
      <div className="conteneur entete-page__grille">
        <div className="entete-page__texte">
          {surtitre && (
            <motion.p className="micro" initial="cache" animate="visible" variants={apparition(12)}>
              {surtitre}
            </motion.p>
          )}
          <TitreRevele as="h1" lignes={lignes} auChargement delai={0.1} />
          {children && (
            <motion.div className="entete-page__chapo" initial="cache" animate="visible" variants={apparition(16, 0.45)}>
              {children}
            </motion.div>
          )}
        </div>
        {visuel && (
          <motion.div
            className="entete-page__visuel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            <Galet variante={galet} className="entete-page__halo" />
            <motion.div style={{ y, rotate: tourne ? rotation : 0 }} className="entete-page__objet">
              {visuel}
            </motion.div>
          </motion.div>
        )}
      </div>
    </Section>
  )
}
