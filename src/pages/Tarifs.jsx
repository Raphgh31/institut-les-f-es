import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Section from '../components/ui/Section.jsx'
import EnTetePage from '../components/EnTetePage.jsx'
import ListePrix from '../components/ListePrix.jsx'
import Perle from '../components/Perle.jsx'
import { categories } from '../data/tarifs.js'
import { institut } from '../data/institut.js'
import { duration, ease } from '../motion/tokens.js'
import perleChampagne from '../assets/perles/perle-champagne.webp'

export default function Tarifs() {
  const { hash } = useLocation()
  const [actif, setActif] = useState(categories[0].id)

  useEffect(() => {
    if (!hash) return undefined
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 700)
    return () => clearTimeout(t)
  }, [hash])

  // Repère la catégorie lue pour l'indiquer dans le sommaire.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActif(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    )
    categories.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const allerA = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <EnTetePage
        surtitre="La carte"
        lignes={['Tous nos', 'tarifs']}
        visuel={<Perle image={perleChampagne} />}
        galet={2}
        tourne
      >
        <p>
          Prix TTC. Pour l’épilation définitive, un premier rendez-vous permet d’établir un devis selon les zones.
        </p>
      </EnTetePage>

      <Section className="carte">
        <div className="conteneur carte__grille">
          <nav className="carte__sommaire" aria-label="Catégories de la carte">
            <ul>
              {categories.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#/tarifs#${c.id}`}
                    onClick={(e) => allerA(e, c.id)}
                    aria-current={actif === c.id ? 'true' : undefined}
                    className={actif === c.id ? 'est-actif' : ''}
                  >
                    {actif === c.id && (
                      <motion.span
                        layoutId="sommaire-tarifs"
                        className="carte__repere"
                        transition={{ duration: duration.medium, ease: ease.smooth }}
                      />
                    )}
                    {c.titre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="carte__contenu">
            {categories.map((c) => (
              <section key={c.id} id={c.id} className="carte__categorie" aria-labelledby={`titre-${c.id}`}>
                <h2 id={`titre-${c.id}`}>{c.titre}</h2>
                <ListePrix prestations={c.prestations} />
              </section>
            ))}
            <p className="carte__note">
              Réservation en ligne sur <a href={institut.planity} target="_blank" rel="noreferrer">Planity</a> ou
              par téléphone au <a href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a>.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
