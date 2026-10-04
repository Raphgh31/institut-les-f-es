import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { institut } from '../data/institut.js'

export const liens = [
  { to: '/soins', label: 'Soins' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/epilation-definitive', label: 'Épilation définitive' },
  { to: '/boutique', label: 'Boutique' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [ouvert, setOuvert] = useState(false)
  const location = useLocation()

  useEffect(() => setOuvert(false), [location.pathname])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOuvert(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="entete">
      <div className="entete__barre">
        <Link to="/" className="logo" aria-label="Les Fées Beauté, accueil">
          <span className="logo__script">Les Fées Beauté</span>
          <span className="logo__sous">Institut de beauté à Baud</span>
        </Link>

        <nav className="nav" aria-label="Navigation principale">
          {liens.map((l) => (
            <NavLink key={l.to} to={l.to} className="nav__lien">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <a className="bouton bouton--prune entete__rdv" href={institut.planity} target="_blank" rel="noreferrer">
          Prendre rendez-vous
        </a>

        <button
          className="menu-bouton"
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          onClick={() => setOuvert((o) => !o)}
        >
          <span className="menu-bouton__traits" aria-hidden="true" data-ouvert={ouvert} />
          {ouvert ? 'Fermer' : 'Menu'}
        </button>
      </div>

      <AnimatePresence>
        {ouvert && (
          <motion.nav
            id="menu-mobile"
            className="menu-mobile"
            aria-label="Navigation"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <motion.ul
              initial="cache"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            >
              {[{ to: '/', label: 'Accueil' }, ...liens].map((l) => (
                <motion.li
                  key={l.to}
                  variants={{ cache: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                >
                  <NavLink to={l.to} end className="menu-mobile__lien">
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
            <div className="menu-mobile__pied">
              <a className="bouton bouton--clair" href={institut.planity} target="_blank" rel="noreferrer">
                Prendre rendez-vous
              </a>
              <a className="menu-mobile__tel" href={`tel:${institut.telephoneLien}`}>
                {institut.telephone}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
