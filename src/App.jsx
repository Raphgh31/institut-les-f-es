import { lazy, Suspense, useContext, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Finale from './components/Finale.jsx'
import Curseur from './components/Curseur.jsx'
import TransitionPage from './components/TransitionPage.jsx'
import { FondTonal, FondTonalProvider, TonContext } from './components/ui/Section.jsx'
import Accueil from './pages/Accueil.jsx'

// Les pages intérieures sont chargées à la demande.
const Soins = lazy(() => import('./pages/Soins.jsx'))
const Tarifs = lazy(() => import('./pages/Tarifs.jsx'))
const EpilationDefinitive = lazy(() => import('./pages/EpilationDefinitive.jsx'))
const Institut = lazy(() => import('./pages/Institut.jsx'))
const Boutique = lazy(() => import('./pages/Boutique.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales.jsx'))
const Confidentialite = lazy(() => import('./pages/Confidentialite.jsx'))
const Introuvable = lazy(() => import('./pages/Introuvable.jsx'))

const titres = {
  '/': 'Les Fées Beauté, institut de beauté à Baud',
  '/soins': 'Soins visage et corps | Les Fées Beauté, Baud',
  '/tarifs': 'Tarifs | Les Fées Beauté, Baud',
  '/epilation-definitive': 'Épilation définitive laser et Apilus | Les Fées Beauté, Baud',
  '/institut': 'L’institut et la galerie | Les Fées Beauté, Baud',
  '/boutique': 'Boutique et bons cadeaux | Les Fées Beauté, Baud',
  '/contact': 'Contact et horaires | Les Fées Beauté, Baud',
  '/mentions-legales': 'Mentions légales | Les Fées Beauté',
  '/confidentialite': 'Confidentialité | Les Fées Beauté',
}

// Pages qui n'ont pas besoin de la section finale de réservation.
const sansFinale = ['/contact', '/mentions-legales', '/confidentialite']

function Contenu() {
  const location = useLocation()
  const { setTon } = useContext(TonContext)

  useEffect(() => {
    document.title = titres[location.pathname] ?? 'Les Fées Beauté'
    setTon('ivoire')
  }, [location.pathname, setTon])

  return (
    <>
      <a className="evitement" href="#contenu" onClick={(e) => {
        e.preventDefault()
        document.getElementById('contenu')?.focus()
      }}>
        Aller au contenu
      </a>
      <FondTonal />
      <Curseur />
      <Header />
      <main id="contenu" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <TransitionPage key={location.pathname}>
            <Suspense fallback={<div className="chargement" />}>
              <Routes location={location}>
                <Route path="/" element={<Accueil />} />
                <Route path="/soins" element={<Soins />} />
                <Route path="/tarifs" element={<Tarifs />} />
                <Route path="/epilation-definitive" element={<EpilationDefinitive />} />
                <Route path="/institut" element={<Institut />} />
                <Route path="/boutique" element={<Boutique />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/confidentialite" element={<Confidentialite />} />
                <Route path="*" element={<Introuvable />} />
              </Routes>
            </Suspense>
            {!sansFinale.includes(location.pathname) && <Finale />}
          </TransitionPage>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  // « Réduire les animations » : aucun mouvement, aucun fondu, le contenu s'affiche directement.
  const reduit = useReducedMotion()
  return (
    <MotionConfig reducedMotion="user" skipAnimations={Boolean(reduit)}>
      <FondTonalProvider>
        <Contenu />
      </FondTonalProvider>
    </MotionConfig>
  )
}
