import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Curseur discret pour souris : un point qui s'ouvre en anneau sur les liens,
// et en pastille « Voir » sur les photos. Absent sur écran tactile et si les animations sont réduites.
export default function Curseur() {
  const [actif, setActif] = useState(false)
  const [visible, setVisible] = useState(false)
  const [etat, setEtat] = useState({ mode: 'point', label: '' })
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 })

  useEffect(() => {
    const souris = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!souris.matches || reduit.matches) return undefined

    setActif(true)
    const racine = document.documentElement
    racine.classList.add('curseur-perso')

    const bouger = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const survol = (e) => {
      const cible = e.target.closest?.('[data-curseur], a, button, summary, label, [role="button"]')
      if (!cible) setEtat((p) => (p.mode === 'point' ? p : { mode: 'point', label: '' }))
      else if (cible.dataset.curseur) setEtat({ mode: 'label', label: cible.dataset.curseur })
      else setEtat((p) => (p.mode === 'lien' ? p : { mode: 'lien', label: '' }))
    }
    const sortir = () => setVisible(false)
    const appuyer = () => racine.classList.add('curseur-appui')
    const relacher = () => racine.classList.remove('curseur-appui')

    window.addEventListener('pointermove', bouger, { passive: true })
    document.addEventListener('pointerover', survol, { passive: true })
    racine.addEventListener('pointerleave', sortir)
    window.addEventListener('blur', sortir)
    window.addEventListener('pointerdown', appuyer)
    window.addEventListener('pointerup', relacher)
    return () => {
      racine.classList.remove('curseur-perso')
      window.removeEventListener('pointermove', bouger)
      document.removeEventListener('pointerover', survol)
      racine.removeEventListener('pointerleave', sortir)
      window.removeEventListener('blur', sortir)
      window.removeEventListener('pointerdown', appuyer)
      window.removeEventListener('pointerup', relacher)
    }
  }, [x, y])

  if (!actif) return null
  return (
    <motion.div
      className={`curseur curseur--${etat.mode}`}
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <span className="curseur__disque" />
      <span className="curseur__label">{etat.label}</span>
    </motion.div>
  )
}
