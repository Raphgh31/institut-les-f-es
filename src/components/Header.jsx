import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import BoutonRdv from './ui/BoutonRdv.jsx'
import StatutOuverture from './StatutOuverture.jsx'
import { institut } from '../data/institut.js'
import { duration, ease } from '../motion/tokens.js'

export const liens = [
  { to: '/soins', label: 'Soins' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/epilation-definitive', label: 'Épilation définitive' },
  { to: '/institut', label: 'L’institut' },
  { to: '/boutique', label: 'Boutique' },
  { to: '/contact', label: 'Contact' },
]

function LienNav({ to, label }) {
  return (
    <NavLink to={to} className="nav__lien">
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <motion.span
              layoutId="indicateur-nav"
              className="nav__indicateur"
              transition={{ duration: duration.medium, ease: ease.smooth }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Header() {
  const [ouvert, setOuvert] = useState(false)
  const [compact, setCompact] = useState(false)
  const location = useLocation()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const c = v > 40
    if (c !== compact) setCompact(c)
  })

  useEffect(() => setOuvert(false), [location.pathname])

  useEffect(() => {
    document.documentElement.classList.toggle('sans-defilement', ouvert)
    const onKey = (e) => e.key === 'Escape' && setOuvert(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ouvert])

  return (
    <header className={`entete ${compact ? 'entete--compact' : ''} ${ouvert ? 'entete--menu' : ''}`}>
      <div className="entete__barre">
        <Link to="/" className="logo" aria-label="Les Fées Beauté, retour à l’accueil">
          <span className="logo__script">Les Fées Beauté</span>
        </Link>

        <nav className="nav" aria-label="Navigation principale">
          {liens.map((l) => (
            <LienNav key={l.to} {...l} />
          ))}
        </nav>

        <BoutonRdv className="entete__rdv" fleche={false}>
          Prendre rendez-vous
        </BoutonRdv>
        <BoutonRdv className="entete__rdv-court" fleche={false}>
          Rendez-vous
        </BoutonRdv>

        <button
          className="menu-bouton"
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOuvert((o) => !o)}
        >
          <span className="menu-bouton__traits" data-ouvert={ouvert} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {ouvert && (
          <motion.div
            id="menu-mobile"
            className="menu-mobile"
            initial={{ clipPath: 'circle(0% at 92% 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at 92% 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at 92% 2.5rem)' }}
            transition={{ duration: 0.75, ease: ease.editorial }}
          >
            <nav aria-label="Menu">
              <motion.ul
                initial="cache"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
              >
                {[{ to: '/', label: 'Accueil' }, ...liens].map((l) => (
                  <motion.li
                    key={l.to}
                    variants={{
                      cache: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: duration.medium, ease: ease.smooth } },
                    }}
                  >
                    <NavLink to={l.to} end className="menu-mobile__lien">
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
            <motion.div
              className="menu-mobile__pied"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, duration: duration.medium } }}
            >
              <BoutonRdv />
              <a className="menu-mobile__tel" href={`tel:${institut.telephoneLien}`}>
                {institut.telephone}
              </a>
              <StatutOuverture className="menu-mobile__statut" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
