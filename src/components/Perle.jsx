import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * La perle : image fixe par défaut, remplacée en fondu par la version 3D vivante
 * quand l'appareil le permet. La 3D n'est jamais nécessaire pour lire le site.
 *
 * vivante     : active la 3D (réservée au hero d'accueil)
 * progression : MotionValue 0→1 (défilement) qui fait tourner la perle
 */
export default function Perle({ image, matiere = 'nacre', forme, vivante = false, progression, className = '' }) {
  const conteneur = useRef(null)
  const canvas = useRef(null)
  const [enDirect, setEnDirect] = useState(false)
  const reduit = useReducedMotion()

  useEffect(() => {
    if (!vivante || reduit) return undefined
    if (navigator.connection?.saveData) return undefined
    const essai = document.createElement('canvas')
    if (!(essai.getContext('webgl2') || essai.getContext('webgl'))) return undefined

    const el = conteneur.current
    const mobile = window.matchMedia('(max-width: 760px), (pointer: coarse)').matches
    let perle
    let raf = 0
    let visible = true
    let arrete = false
    let io
    let ro
    let desabonner
    const nettoyages = []

    const arreter = () => {
      arrete = true
      cancelAnimationFrame(raf)
      io?.disconnect()
      ro?.disconnect()
      desabonner?.()
      nettoyages.forEach((f) => f())
      perle?.detruire()
      perle = null
    }

    const lancer = async () => {
      const { creerPerle } = await import('../three/perle.js')
      if (arrete || !canvas.current) return
      perle = creerPerle(canvas.current, {
        matiere,
        forme,
        detail: mobile ? 28 : 72,
        dpr: Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2),
      })

      const taille = () => {
        const r = el.getBoundingClientRect()
        if (r.width) perle?.redimensionner(r.width, r.height)
      }
      taille()
      ro = new ResizeObserver(taille)
      ro.observe(el)

      // Ne calcule des images que si la perle est à l'écran et l'onglet visible.
      const debut = performance.now()
      let precedent = debut
      let n = 0
      let cumul = 0
      const boucle = (t) => {
        if (!perle || !visible || document.hidden) {
          raf = 0
          return
        }
        const dt = t - precedent
        precedent = t
        perle.rendre((t - debut) / 1000)
        if (n < 90) {
          n++
          if (n === 2) setEnDirect(true)
          if (n > 10) cumul += dt
          // Appareil trop lent : on garde l'image fixe.
          if (n === 90 && cumul / 80 > 34) {
            setEnDirect(false)
            arreter()
            return
          }
        }
        raf = requestAnimationFrame(boucle)
      }
      const relancer = () => {
        if (!raf && visible && !document.hidden) {
          precedent = performance.now()
          raf = requestAnimationFrame(boucle)
        }
      }

      io = new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting
          relancer()
        },
        { rootMargin: '80px' },
      )
      io.observe(el)
      document.addEventListener('visibilitychange', relancer)
      nettoyages.push(() => document.removeEventListener('visibilitychange', relancer))

      if (!mobile) {
        const bouger = (e) => {
          perle?.pointer(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5)
        }
        window.addEventListener('pointermove', bouger, { passive: true })
        nettoyages.push(() => window.removeEventListener('pointermove', bouger))
      }
      if (progression) {
        desabonner = progression.on('change', (v) => perle?.defilement(v))
      }
      relancer()
    }

    // Laisse la page s'afficher d'abord.
    const id =
      'requestIdleCallback' in window
        ? window.requestIdleCallback(lancer, { timeout: 1200 })
        : window.setTimeout(lancer, 300)

    return () => {
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(id)
      window.clearTimeout(id)
      arreter()
    }
  }, [vivante, reduit, matiere, forme, progression])

  return (
    <div ref={conteneur} className={`perle ${enDirect ? 'perle--direct' : ''} ${className}`} aria-hidden="true">
      <img className="perle__image" src={image} alt="" width="1000" height="1000" decoding="async" />
      {vivante && !reduit && <canvas ref={canvas} className="perle__canvas" />}
    </div>
  )
}
