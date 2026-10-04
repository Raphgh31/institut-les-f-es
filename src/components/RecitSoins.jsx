import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import Section from './ui/Section.jsx'
import Arche from './ui/Arche.jsx'
import Galet from './ui/Galet.jsx'
import Perle from './Perle.jsx'
import Reveal from './ui/Reveal.jsx'
import { trouver } from '../data/tarifs.js'
import perleNacre from '../assets/perles/perle-nacre.webp'
import perleChampagne from '../assets/perles/perle-champagne.webp'
import cabineZen from '../assets/photos/cabine-zen.webp'
import manucure from '../assets/photos/manucure.webp'
import Prix from './Prix.jsx'

const chapitres = [
  {
    id: 'visage',
    titre: 'Visage',
    intro: 'Nettoyer, exfolier, hydrater. Chaque soin est adapté à votre peau, de la mise en beauté express au soin anti-âge.',
    soins: [trouver('visage', 'Soin éclat'), trouver('visage', 'Soin Les Fées Beauté'), trouver('visage', 'Soin anti-âge régénérant')],
    lien: { to: '/soins#visage', label: 'Les soins du visage' },
    visuel: { type: 'perle', image: perleNacre },
  },
  {
    id: 'corps',
    titre: 'Corps',
    intro: 'Modelages et rituels venus d’ailleurs, dans la cabine Zen : on relâche les tensions et on prend le temps.',
    soins: [trouver('corps', 'Modelage à la bougie'), trouver('corps', 'Soin californien'), trouver('corps', 'Rituel Rêve des Marquises')],
    lien: { to: '/soins#corps', label: 'Les soins du corps' },
    visuel: { type: 'photo', image: cabineZen, l: 720, h: 1571, cadrage: '50% 12%', alt: 'La porte de la cabine de soins, surmontée des lettres ZEN.' },
  },
  {
    id: 'mains',
    titre: 'Mains & regard',
    intro: 'Manucure, semi-permanent, beauté des pieds, rehaussement de cils : les détails qui changent tout.',
    soins: [trouver('mains', 'Vernis semi-permanent couleur'), trouver('pieds', 'Beauté des pieds'), trouver('regard', 'Rehaussement de cils')],
    lien: { to: '/tarifs#mains', label: 'Les tarifs ongles et regard' },
    visuel: { type: 'photo', image: manucure, l: 1300, h: 851, cadrage: '58% 50%', alt: 'La table de manucure et ses chaises prune.' },
  },
  {
    id: 'laser',
    titre: 'Épilation définitive',
    intro: 'Le laser diode MyLaser et l’Apilus, pour en finir avec le rasoir et la cire. Le tarif s’établit lors d’un rendez-vous conseil.',
    soins: [trouver('definitive', 'Laser diode MyLaser'), trouver('definitive', 'Apilus')],
    lien: { to: '/epilation-definitive', label: 'Tout savoir sur l’épilation définitive' },
    visuel: { type: 'perle', image: perleChampagne },
  },
]

function Panneau({ chapitre, index, onActif }) {
  const ref = useRef(null)
  const actif = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (actif) onActif(index)
  }, [actif, index, onActif])

  const { visuel } = chapitre
  return (
    <article ref={ref} id={`chapitre-${chapitre.id}`} className="panneau">
      <div className={`panneau__visuel panneau__visuel--${visuel.type}`}>
        {visuel.type === 'photo' ? (
          <Arche src={visuel.image} alt={visuel.alt} largeur={visuel.l} hauteur={visuel.h} cadrage={visuel.cadrage} curseur="Découvrir" />
        ) : (
          <div className="panneau__sculpture">
            <Galet variante={index} couleur="var(--poudre)" className="panneau__halo" />
            <Perle image={visuel.image} />
          </div>
        )}
      </div>
      <Reveal className="panneau__texte">
        <h3 className="panneau__titre">{chapitre.titre}</h3>
        <p>{chapitre.intro}</p>
        <ul className="panneau__soins">
          {chapitre.soins.map((s) => (
            <li key={s.nom}>
              <span className="panneau__nom">{s.nom}</span>
              <span className="panneau__detail">
                {s.duree && <span>{s.duree}</span>}
                <Prix className="panneau__prix" valeur={s.prix} />
              </span>
            </li>
          ))}
        </ul>
        <Link className="lien" to={chapitre.lien.to}>
          {chapitre.lien.label}
        </Link>
      </Reveal>
    </article>
  )
}

export default function RecitSoins() {
  const [actif, setActif] = useState(0)
  const zone = useRef(null)
  const { scrollYProgress } = useScroll({ target: zone, offset: ['start center', 'end center'] })
  const progression = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  const allerA = (id) => {
    document.getElementById(`chapitre-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <Section ton="nude" className="recit" aria-labelledby="recit-titre">
      <div className="conteneur recit__grille" ref={zone}>
        <div className="recit__fixe">
          <p className="micro">La carte des soins</p>
          <h2 id="recit-titre" className="visuellement-cache">Nos soins</h2>
          <div className="recit__sommaire">
            <Galet variante={actif} trait couleur="var(--champagne)" className="recit__forme" />
            <ol className="recit__chapitres">
              {chapitres.map((c, i) => (
                <li key={c.id}>
                  <button
                    className={`recit__chapitre ${i === actif ? 'est-actif' : ''}`}
                    aria-current={i === actif ? 'step' : undefined}
                    onClick={() => allerA(c.id)}
                  >
                    {c.titre}
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="recit__progression" aria-hidden="true">
            <motion.span style={{ scaleY: progression }} />
          </div>
        </div>

        <div className="recit__panneaux">
          {chapitres.map((c, i) => (
            <Panneau key={c.id} chapitre={c} index={i} onActif={setActif} />
          ))}
        </div>
      </div>
    </Section>
  )
}
