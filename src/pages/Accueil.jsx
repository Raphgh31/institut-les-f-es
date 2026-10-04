import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import StatutOuverture from '../components/StatutOuverture.jsx'
import { institut, horaires, formatCreneaux, statutOuverture } from '../data/institut.js'
import { categories } from '../data/tarifs.js'
import interieur from '../assets/photos/interieur.webp'
import etageres from '../assets/photos/etageres.webp'
import bijoux from '../assets/photos/coin-bijoux.webp'
import facade from '../assets/photos/facade.webp'

// Reprend la liste peinte sur la vitrine, avec ses points verts.
const vitrine = [
  { label: 'Épilation', to: '/tarifs#epilations-femme' },
  { label: 'Soins visage et corps', to: '/soins' },
  { label: 'Manucure', to: '/tarifs#mains' },
  { label: 'Beauté des pieds', to: '/tarifs#pieds' },
  { label: 'Maquillage', to: '/tarifs#maquillage' },
  { label: 'Minceur', to: '/tarifs#minceur' },
  { label: 'Sun institute', to: '/tarifs#sun' },
]

const choix = [
  { cat: 'visage', nom: 'Soin Les Fées Beauté' },
  { cat: 'corps', nom: 'Soin californien' },
  { cat: 'corps', nom: 'Rituel Rêve des Marquises' },
]

const apparition = { cache: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } } }

export default function Accueil() {
  const aujourdhui = horaires.find((h) => h.index === statutOuverture().jour)
  const selection = choix.map(({ cat, nom }) => ({
    ...categories.find((c) => c.id === cat).prestations.find((p) => p.nom === nom),
    cat,
  }))

  return (
    <>
      <section className="hero">
        <motion.div
          className="hero__texte"
          initial="cache"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
        >
          <motion.p className="hero__lieu" variants={apparition}>ZA de Kermestre, Baud</motion.p>
          <motion.h1 variants={apparition}>Un institut de beauté où l’on prend son temps.</motion.h1>
          <motion.p className="hero__intro" variants={apparition}>
            {institut.prenoms} vous accueillent pour vos soins du visage et du corps, vos épilations,
            vos ongles et votre maquillage, avec des produits naturels choisis avec soin.
          </motion.p>
          <motion.div className="hero__actions" variants={apparition}>
            <a className="bouton bouton--clair" href={institut.planity} target="_blank" rel="noreferrer">
              Prendre rendez-vous
            </a>
            <a className="hero__tel" href={`tel:${institut.telephoneLien}`}>
              ou appeler le <strong>{institut.telephone}</strong>
            </a>
          </motion.div>
          <motion.div className="hero__statut" variants={apparition}>
            <StatutOuverture />
            {aujourdhui?.creneaux.length > 0 && <span>Aujourd’hui : {formatCreneaux(aujourdhui.creneaux)}</span>}
          </motion.div>
        </motion.div>
        <motion.div
          className="hero__photo"
          initial={{ clipPath: 'inset(0 0 0 100%)' }}
          animate={{ clipPath: 'inset(0 0 0 0%)' }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
        >
          <img src={interieur} alt="L’accueil de l’institut : présentoir de maquillage bio, mur en tasseaux de bois avec les bijoux, et la porte de la cabine « Zen »." />
        </motion.div>
      </section>

      <nav className="vitrine" aria-label="Nos prestations">
        <ul className="conteneur">
          {vitrine.map((v) => (
            <li key={v.label}>
              <Link to={v.to}>{v.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="section conteneur institut">
        <Reveal className="institut__texte">
          <h2>Mélody, Cécile et une cabine qui s’appelle Zen</h2>
          <p>
            Aux Fées Beauté, on prend le temps de regarder votre peau et d’écouter ce que vous attendez
            avant de choisir le soin et les produits qui vous conviennent.
          </p>
          <p>
            Nous travaillons avec des marques naturelles et françaises, que vous retrouvez en boutique
            pour poursuivre les soins chez vous.
          </p>
          <Link className="lien-fleche" to="/soins">Découvrir les soins</Link>
        </Reveal>
        <Reveal className="institut__photo" delay={0.1}>
          <img src={etageres} alt="Les étagères de la boutique : soins Noham, parfums Sensa et produits Eskalia." loading="lazy" />
        </Reveal>
      </section>

      <section className="laser">
        <div className="conteneur laser__grille">
          <Reveal>
            <p className="laser__badge">Nouveau à l’institut</p>
            <h2>L’épilation définitive, au laser ou à l’Apilus</h2>
          </Reveal>
          <Reveal delay={0.1} className="laser__texte">
            <p>
              Nous sommes équipées du laser diode MyLaser, plus efficace qu’une lumière pulsée, et
              de l’Apilus, une épilation électrique 100 % définitive. Le tarif dépend des zones :
              nous l’établissons ensemble lors d’un premier rendez-vous.
            </p>
            <Link className="bouton bouton--contour-clair" to="/epilation-definitive">
              En savoir plus
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section conteneur selection">
        <Reveal className="selection__tete">
          <h2>Quelques soins de la carte</h2>
          <Link className="lien-fleche" to="/tarifs">Voir tous les tarifs</Link>
        </Reveal>
        <ul className="selection__liste">
          {selection.map((s, i) => (
            <Reveal as="li" key={s.nom} delay={i * 0.08} className="selection__item">
              <p className="selection__meta">
                {s.cat === 'visage' ? 'Visage' : 'Corps'}, {s.duree}
              </p>
              <h3>{s.nom}</h3>
              <p>{s.description}</p>
              <p className="selection__prix">{s.prix}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section boutique-accueil">
        <div className="conteneur boutique-accueil__grille">
          <Reveal className="boutique-accueil__photo">
            <img src={bijoux} alt="Le coin bijoux de la boutique, avec les sacs Eskalia et les présentoirs de colliers." loading="lazy" />
          </Reveal>
          <Reveal delay={0.1} className="boutique-accueil__texte">
            <h2>Une idée de cadeau ?</h2>
            <p>
              Offrez un soin avec un bon cadeau, valable sur toute la carte. En boutique, vous trouverez
              aussi des bijoux Nakupenda, les parfums Sensa et les soins Eskalia et Noham.
            </p>
            <Link className="lien-fleche" to="/boutique">La boutique et les bons cadeaux</Link>
          </Reveal>
        </div>
      </section>

      <section className="section conteneur venir">
        <Reveal className="venir__photo">
          <img src={facade} alt="La vitrine de l’institut Les Fées Beauté, avec le numéro de téléphone et la liste des prestations." loading="lazy" />
        </Reveal>
        <Reveal delay={0.1} className="venir__texte">
          <h2>Nous trouver</h2>
          <address>
            {institut.adresse}<br />
            {institut.ville}
          </address>
          <div className="venir__actions">
            <a className="bouton bouton--prune" href={institut.carte} target="_blank" rel="noreferrer">Itinéraire</a>
            <Link className="lien-fleche" to="/contact">Horaires et contact</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
