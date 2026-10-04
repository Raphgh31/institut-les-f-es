import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { duration, ease } from '../motion/tokens.js'

/** Visionneuse plein écran : flèches, clavier (← → Échap), glisser du doigt sur mobile. */
export default function Lightbox({ photos, index, onFermer, onChanger }) {
  const fermer = useRef(null)
  const [sens, setSens] = useState(0)
  const ouvert = index !== null
  const photo = ouvert ? photos[index] : null

  const aller = (pas) => {
    setSens(pas)
    onChanger((index + pas + photos.length) % photos.length)
  }

  useEffect(() => {
    if (!ouvert) return undefined
    const precedent = document.activeElement
    const racine = document.documentElement
    racine.classList.add('sans-defilement')
    fermer.current?.focus()
    const clavier = (e) => {
      if (e.key === 'Escape') onFermer()
      if (e.key === 'ArrowRight') aller(1)
      if (e.key === 'ArrowLeft') aller(-1)
      if (e.key === 'Tab') {
        // Garde le focus dans la visionneuse.
        const focusables = [...document.querySelectorAll('.lightbox button')]
        const i = focusables.indexOf(document.activeElement)
        if (e.shiftKey && i <= 0) {
          e.preventDefault()
          focusables.at(-1)?.focus()
        } else if (!e.shiftKey && i === focusables.length - 1) {
          e.preventDefault()
          focusables[0]?.focus()
        }
      }
    }
    window.addEventListener('keydown', clavier)
    return () => {
      window.removeEventListener('keydown', clavier)
      racine.classList.remove('sans-defilement')
      precedent?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ouvert, index])

  return (
    <AnimatePresence>
      {ouvert && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} sur ${photos.length} : ${photo.titre}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.medium, ease: ease.soft }}
          onClick={(e) => e.target === e.currentTarget && onFermer()}
        >
          <button ref={fermer} className="lightbox__fermer" onClick={onFermer}>
            Fermer
          </button>

          <div className="lightbox__scene" onClick={(e) => e.target === e.currentTarget && onFermer()}>
            <AnimatePresence initial={false} custom={sens} mode="popLayout">
              <motion.figure
                key={photo.id}
                className="lightbox__figure"
                custom={sens}
                initial={{ opacity: 0, x: sens * 60, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: sens * -60, scale: 0.97 }}
                transition={{ duration: duration.medium, ease: ease.smooth }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) aller(1)
                  else if (info.offset.x > 70) aller(-1)
                }}
              >
                <img src={photo.src} alt={photo.alt} width={photo.l} height={photo.h} draggable="false" />
                <figcaption>
                  <span className="micro">{photo.categorie}</span>
                  {photo.titre}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="lightbox__nav">
            <button onClick={() => aller(-1)} aria-label="Photo précédente">
              <svg viewBox="0 0 24 12" aria-hidden="true"><path d="M23 6H2M6 1 1 6l5 5" /></svg>
            </button>
            <span className="lightbox__compteur" aria-hidden="true">
              {index + 1} / {photos.length}
            </span>
            <button onClick={() => aller(1)} aria-label="Photo suivante">
              <svg viewBox="0 0 24 12" aria-hidden="true"><path d="M1 6h21M18 1l5 5-5 5" /></svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
