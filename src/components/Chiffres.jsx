import { motion } from 'framer-motion'
import { nombrePrestations, marques } from '../data/tarifs.js'
import { horaires } from '../data/institut.js'
import { apparition, cascade } from '../motion/tokens.js'

// Chiffres clés, calculés à partir des données du site (ils restent justes si la carte change).
const joursOuverts = horaires.filter((h) => h.creneaux.length).length

const chiffres = [
  { valeur: '2', libelle: 'fées à votre écoute' },
  { valeur: String(nombrePrestations), libelle: 'prestations à la carte' },
  { valeur: String(marques.length), libelle: 'marques en boutique' },
  { valeur: `${joursOuverts}/7`, libelle: 'jours d’ouverture' },
]

export default function Chiffres() {
  return (
    <motion.dl
      className="chiffres"
      initial="cache"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={cascade(0.08)}
    >
      {chiffres.map((c) => (
        <motion.div key={c.libelle} variants={apparition(16)}>
          <dt>{c.libelle}</dt>
          <dd>{c.valeur}</dd>
        </motion.div>
      ))}
    </motion.dl>
  )
}
