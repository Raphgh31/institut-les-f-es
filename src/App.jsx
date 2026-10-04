import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Accueil from './pages/Accueil.jsx'
import Soins from './pages/Soins.jsx'
import Tarifs from './pages/Tarifs.jsx'
import EpilationDefinitive from './pages/EpilationDefinitive.jsx'
import Boutique from './pages/Boutique.jsx'
import Contact from './pages/Contact.jsx'
import Introuvable from './pages/Introuvable.jsx'

const titres = {
  '/': 'Les Fées Beauté, institut de beauté à Baud',
  '/soins': 'Soins visage et corps | Les Fées Beauté',
  '/tarifs': 'Tarifs | Les Fées Beauté',
  '/epilation-definitive': 'Épilation définitive laser et Apilus | Les Fées Beauté',
  '/boutique': 'Boutique et bons cadeaux | Les Fées Beauté',
  '/contact': 'Contact et horaires | Les Fées Beauté',
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = titres[location.pathname] ?? 'Les Fées Beauté'
  }, [location.pathname])

  return (
    <MotionConfig reducedMotion="user">
      <a className="evitement" href="#contenu">Aller au contenu</a>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          id="contenu"
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Accueil />} />
            <Route path="/soins" element={<Soins />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/epilation-definitive" element={<EpilationDefinitive />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Introuvable />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  )
}
