import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import BoutonRdv from './ui/BoutonRdv.jsx'
import TitreRevele from './ui/TitreRevele.jsx'
import StatutOuverture from './StatutOuverture.jsx'
import Perle from './Perle.jsx'
import { institut } from '../data/institut.js'
import perleNacre from '../assets/perles/perle-nacre.webp'

/**
 * Dernière section de chaque page : une grande arche ardoise (la couleur de l'enseigne)
 * qui s'élève et se prolonge dans le pied de page.
 */
export default function Finale() {
  const ref = useRef(null)
  const reduit = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  // L'arche s'élargit en transform (scaleX) : aucun recalcul de mise en page pendant le défilement.
  const largeur = useTransform(scrollYProgress, [0, 0.7], [reduit ? 1 : 0.86, 1])
  const yPerle = useTransform(scrollYProgress, [0, 1], reduit ? [0, 0] : [80, -20])

  return (
    <section ref={ref} className="finale" aria-labelledby="finale-titre">
      <div className="finale__arche">
        <motion.div className="finale__fond" style={{ scaleX: largeur }} aria-hidden="true" />
        <motion.div className="finale__perle" style={{ y: yPerle }}>
          <Perle image={perleNacre} />
        </motion.div>
        <div className="finale__contenu">
          <p className="micro">Sur rendez-vous, du lundi au samedi</p>
          <TitreRevele as="h2" lignes={['On vous attend', 'à Baud.']} className="finale__titre" />
          <BoutonRdv variante="clair" />
          <div className="finale__infos">
            <StatutOuverture />
            <a href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a>
            <a href={institut.carte} target="_blank" rel="noreferrer">
              {institut.adresse}, {institut.ville}
            </a>
          </div>
        </div>
      </div>
      <span id="finale-titre" className="visuellement-cache">Prendre rendez-vous</span>
    </section>
  )
}
