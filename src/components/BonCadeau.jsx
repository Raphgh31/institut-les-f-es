import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/** Le bon cadeau, qui s'incline légèrement sous la souris comme une carte qu'on tient en main. */
export default function BonCadeau() {
  const ref = useRef(null)
  const reduit = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 })
  const reflet = useTransform(px, [-0.5, 0.5], ['20%', '80%'])

  const bouger = (e) => {
    if (reduit || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const quitter = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div className="bon-cadeau__scene" onPointerMove={bouger} onPointerLeave={quitter}>
      <motion.div ref={ref} className="bon-cadeau" style={{ rotateX: rx, rotateY: ry, '--reflet': reflet }}>
        <p className="logo__script">Bon cadeau</p>
        <p className="bon-cadeau__ligne">Valable sur toute la carte</p>
        <p className="bon-cadeau__institut">Les Fées Beauté, Baud</p>
      </motion.div>
    </div>
  )
}
