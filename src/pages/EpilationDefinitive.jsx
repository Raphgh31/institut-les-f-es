import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import TitreRevele from '../components/ui/TitreRevele.jsx'
import BoutonRdv from '../components/ui/BoutonRdv.jsx'
import EnTetePage from '../components/EnTetePage.jsx'
import Arche from '../components/ui/Arche.jsx'
import { institut } from '../data/institut.js'
import epilationLaser from '../assets/photos/epilation-laser.webp'

const methodes = [
  {
    nom: 'MyLaser',
    type: 'Laser diode',
    texte:
      'Un laser diode de dernière génération, plus efficace qu’une lumière pulsée. Il traite rapidement les grandes zones comme les jambes, les aisselles ou le maillot.',
  },
  {
    nom: 'Apilus',
    type: 'Épilation électrique',
    texte:
      'Leader mondial de l’épilation définitive, l’Apilus traite chaque poil un à un. C’est une méthode 100 % définitive.',
  },
]

const etapes = [
  { titre: 'Le rendez-vous conseil', texte: 'Nous regardons ensemble les zones à traiter et nous vous indiquons la méthode la plus adaptée.' },
  { titre: 'Le devis', texte: 'Le tarif dépend des zones et du nombre de séances. Vous repartez avec un devis clair.' },
  { titre: 'Les séances', texte: 'Elles sont espacées de quelques semaines, au rythme de la repousse, et ajustées selon les résultats.' },
]

export default function EpilationDefinitive() {
  const zone = useRef(null)
  const { scrollYProgress } = useScroll({ target: zone, offset: ['start 70%', 'end 60%'] })
  const trait = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <>
      <EnTetePage
        surtitre="Nouveau à l’institut"
        lignes={['L’épilation', 'définitive']}
        visuel={<Arche src={epilationLaser} alt="Une séance d’épilation au laser sur la jambe, réalisée avec une pièce à main." largeur={1224} hauteur={816} className="arche--large" priorite />}
        galet={3}
      >
        <p>Deux techniques complémentaires pour en finir avec le rasoir et la cire : le laser diode MyLaser et l’Apilus.</p>
      </EnTetePage>

      <Section ton="ivoire" className="methodes">
        <div className="conteneur methodes__grille">
          {methodes.map((m, i) => (
            <Reveal as="article" key={m.nom} className="methode" delay={i * 0.1}>
              <p className="micro">{m.type}</p>
              <h2 className="methode__nom">{m.nom}</h2>
              <p>{m.texte}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section ton="nude" className="etapes">
        <div className="conteneur">
          <TitreRevele lignes={['Comment', 'ça se passe']} />
          <ol className="etapes__liste" ref={zone}>
            <span className="etapes__rail" aria-hidden="true">
              <motion.span style={{ scaleX: trait }} />
            </span>
            {etapes.map((e, i) => (
              <Reveal as="li" key={e.titre} delay={i * 0.12} className="etape">
                <span className="etape__num" aria-hidden="true">{i + 1}</span>
                <h3>{e.titre}</h3>
                <p>{e.texte}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section ton="nude" className="bandeau">
        <Reveal className="conteneur bandeau__contenu">
          <h2 className="bandeau__titre">Tarifs sur demande</h2>
          <p>
            Pour un devis, appelez-nous au <a href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a> ou
            réservez un rendez-vous conseil.
          </p>
          <BoutonRdv>Réserver un rendez-vous conseil</BoutonRdv>
        </Reveal>
      </Section>
    </>
  )
}
