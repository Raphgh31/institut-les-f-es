import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Section from '../components/ui/Section.jsx'
import TitreRevele from '../components/ui/TitreRevele.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Arche from '../components/ui/Arche.jsx'
import Galet from '../components/ui/Galet.jsx'
import BoutonRdv from '../components/ui/BoutonRdv.jsx'
import Bouton from '../components/ui/Bouton.jsx'
import Perle from '../components/Perle.jsx'
import RecitSoins from '../components/RecitSoins.jsx'
import Lookbook from '../components/Lookbook.jsx'
import StatutOuverture from '../components/StatutOuverture.jsx'
import Chiffres from '../components/Chiffres.jsx'
import { institut } from '../data/institut.js'
import { photos } from '../data/galerie.js'
import { apparition, cascade, ease } from '../motion/tokens.js'
import murBijoux from '../assets/photos/mur-bijoux.webp'
import interieur from '../assets/photos/interieur.webp'
import perleNacre from '../assets/perles/perle-nacre.webp'
import perlePoudre from '../assets/perles/perle-poudre.webp'

const extraitLookbook = ['accueil', 'coin', 'manucure', 'maquillage', 'etageres'].map((id) => photos.find((p) => p.id === id))

function Hero() {
  const ref = useRef(null)
  const reduit = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Trois plans qui ne bougent pas à la même vitesse : halo (fond), photo (milieu), perle (devant).
  const yHalo = useTransform(scrollYProgress, [0, 1], [0, reduit ? 0 : 60])
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, reduit ? 0 : -50])
  const yPerle = useTransform(scrollYProgress, [0, 1], [0, reduit ? 0 : -190])
  const echellePerle = useTransform(scrollYProgress, [0, 1], [1, reduit ? 1 : 0.82])

  return (
    <Section ref={ref} ton="ivoire" className="hero">
      <div className="hero__grille conteneur">
        <motion.div className="hero__texte" initial="cache" animate="visible" variants={cascade(0.12, 0.35)}>
          <TitreRevele as="h1" lignes={['Le temps', 'd’un soin.']} auChargement delai={0.55} className="hero__titre">
            <motion.span className="hero__lieu micro" variants={apparition(10)}>
              Institut de beauté à Baud
            </motion.span>
          </TitreRevele>
          <motion.p className="hero__chapo" variants={apparition(16, 0.75)}>
            {institut.prenoms} vous accueillent pour les soins du visage et du corps, les épilations, les ongles et
            le maquillage, avec des produits naturels choisis avec soin.
          </motion.p>
          <motion.div className="hero__actions" variants={apparition(16, 0.9)}>
            <BoutonRdv />
            <a className="lien hero__decouvrir" href="#/#soins" onClick={(e) => {
              e.preventDefault()
              document.getElementById('soins')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Découvrir nos soins
            </a>
          </motion.div>
          <motion.div className="hero__statut" variants={apparition(8, 1.05)}>
            <StatutOuverture />
            <span>{institut.adresse}, {institut.ville}</span>
          </motion.div>
        </motion.div>

        <div className="hero__visuel">
          <motion.div
            className="hero__halo"
            style={{ y: yHalo }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: ease.soft }}
          >
            <Galet variante={1} />
          </motion.div>
          <motion.div
            className="hero__contour"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: ease.soft }}
          />
          <motion.div
            className="hero__photo"
            style={{ y: yPhoto }}
            initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0% round 50% 50% 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 50% 50% 0 0)' }}
            transition={{ duration: 1.2, ease: ease.editorial, delay: 0.1 }}
          >
            <Arche
              src={murBijoux}
              alt="Le mur en tasseaux de chêne de l’institut, avec les bijoux, les plantes et les sacs Eskalia."
              largeur={1000}
              hauteur={1314}
              priorite
              parallaxe={5}
            />
          </motion.div>
          <motion.div
            className="hero__perle"
            style={{ y: yPerle, scale: echellePerle }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: ease.smooth, delay: 0.35 }}
          >
            <Perle image={perleNacre} vivante progression={scrollYProgress} />
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default function Accueil() {
  return (
    <>
      <Hero />

      <Section ton="ivoire" className="manifeste" id="soins">
        <div className="conteneur manifeste__grille">
          <TitreRevele
            as="p"
            className="manifeste__texte"
            lignes={['Un soin réussi commence', 'par une écoute.', 'Viennent ensuite les gestes,', 'les textures, et le temps', 'qu’il faut.']}
          />
        </div>
      </Section>

      <RecitSoins />

      <Section ton="nude" className="relance">
        <Reveal className="conteneur relance__contenu">
          <p className="relance__texte">Envie d’un soin en particulier ? Toute la carte est en ligne, avec les prix.</p>
          <div className="relance__actions">
            <BoutonRdv />
            <Bouton to="/tarifs" variante="contour">Voir tous les tarifs</Bouton>
          </div>
        </Reveal>
      </Section>

      <Section ton="poudre" className="apropos">
        <div className="conteneur apropos__grille">
          <div className="apropos__images">
            <Arche
              src={interieur}
              alt="L’accueil de l’institut, avec le présentoir de maquillage bio et la porte de la cabine Zen."
              largeur={1600}
              hauteur={1200}
              className="apropos__arche"
              curseur="Découvrir"
            />
            <Reveal className="apropos__perle" delay={0.2}>
              <Perle image={perlePoudre} />
            </Reveal>
          </div>
          <div className="apropos__texte">
            <p className="micro">L’institut</p>
            <TitreRevele lignes={['Mélody, Cécile', 'et une cabine', 'qui s’appelle Zen.']} />
            <Reveal delay={0.1}>
              <p>
                L’institut a été pensé comme une parenthèse : du bois clair, des plantes, une lumière douce. À
                l’accueil, la boutique. Au fond, la cabine de soins.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Nous travaillons avec des marques naturelles, souvent françaises, que vous retrouvez en boutique
                pour continuer les soins à la maison.
              </p>
            </Reveal>
            <Chiffres />
            <Reveal delay={0.2}>
              <Link className="lien" to="/institut">Découvrir l’institut</Link>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section ton="ivoire" className="galerie-accueil">
        <div className="conteneur">
          <div className="galerie-accueil__tete">
            <TitreRevele lignes={['Entrez,', 'c’est ouvert.']} />
            <Reveal className="galerie-accueil__chapo" delay={0.1}>
              <p>Quelques images de l’institut, de la vitrine à la cabine.</p>
              <Link className="lien" to="/institut">Toute la galerie</Link>
            </Reveal>
          </div>
          <Lookbook photos={extraitLookbook} className="lookbook--extrait" />
        </div>
      </Section>
    </>
  )
}

