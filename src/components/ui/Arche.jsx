import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Photo encadrée en arche, la forme « fenêtre » du site.
 * L'image glisse légèrement à l'intérieur du cadre pendant le défilement (profondeur).
 */
export default function Arche({ src, alt, largeur, hauteur, className = '', priorite = false, parallaxe = 8, cadrage, curseur, children }) {
  const ref = useRef(null)
  const reduit = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallaxe}%`, `${parallaxe}%`])

  return (
    <figure ref={ref} className={`arche ${className}`} data-curseur={curseur}>
      <div className="arche__cadre">
        <motion.img
          src={src}
          alt={alt}
          width={largeur}
          height={hauteur}
          loading={priorite ? 'eager' : 'lazy'}
          fetchpriority={priorite ? 'high' : undefined}
          decoding="async"
          style={reduit ? { objectPosition: cadrage } : { y, scale: 1 + parallaxe / 50, objectPosition: cadrage }}
        />
      </div>
      {children}
    </figure>
  )
}
