import { motion } from 'framer-motion'

// Apparition douce au défilement. Le contenu reste lisible si l'animation ne se lance pas.
export default function Reveal({ as = 'div', delay = 0, children, ...props }) {
  const Comp = motion[as]
  return (
    <Comp
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
      {...props}
    >
      {children}
    </Comp>
  )
}
