import { motion } from 'framer-motion'
import { apparition } from '../../motion/tokens.js'

// Apparition douce à l'entrée dans l'écran (IntersectionObserver via whileInView).
export default function Reveal({ as = 'div', delay = 0, distance, children, ...props }) {
  const Comp = motion[as]
  return (
    <Comp
      initial="cache"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={apparition(distance, delay)}
      {...props}
    >
      {children}
    </Comp>
  )
}
