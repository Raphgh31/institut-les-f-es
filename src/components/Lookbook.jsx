import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox.jsx'
import { apparition } from '../motion/tokens.js'

/** Galerie éditoriale asymétrique ; un clic ouvre la visionneuse. */
export default function Lookbook({ photos, className = '' }) {
  const [index, setIndex] = useState(null)

  return (
    <>
      <ul className={`lookbook ${className}`}>
        {photos.map((p, i) => (
          <motion.li
            key={p.id}
            className={`lookbook__item lookbook__item--${i + 1} lookbook__item--${p.format}`}
            initial="cache"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            variants={apparition(40, (i % 3) * 0.08)}
          >
            <button className="lookbook__bouton" onClick={() => setIndex(i)} data-curseur="Voir">
              <span className="lookbook__cadre">
                <img src={p.src} alt={p.alt} width={p.l} height={p.h} loading="lazy" decoding="async" style={{ objectPosition: p.cadrage }} />
              </span>
              <span className="lookbook__legende">
                <span className="micro">{p.categorie}</span>
                <span className="lookbook__titre">{p.titre}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
      <Lightbox photos={photos} index={index} onFermer={() => setIndex(null)} onChanger={setIndex} />
    </>
  )
}
