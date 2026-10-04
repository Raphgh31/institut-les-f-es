import EnTetePage from '../components/EnTetePage.jsx'
import Reveal from '../components/Reveal.jsx'
import { marques } from '../data/tarifs.js'
import { institut } from '../data/institut.js'
import bijoux from '../assets/photos/coin-bijoux.webp'
import etageres from '../assets/photos/etageres.webp'

export default function Boutique() {
  return (
    <>
      <EnTetePage titre="La boutique et les bons cadeaux" image={bijoux} alt="Présentoirs de bijoux Nakupenda et sacs Eskalia dans la boutique de l’institut.">
        <p>
          Les produits que nous utilisons en cabine, des parfums et des bijoux, à découvrir sur place
          aux horaires d’ouverture.
        </p>
      </EnTetePage>

      <section className="section conteneur cadeau">
        <Reveal className="cadeau__carte">
          <p className="logo__script">Bon cadeau</p>
          <p className="cadeau__ligne">Valable sur toute la carte</p>
        </Reveal>
        <Reveal delay={0.1} className="cadeau__texte">
          <h2>Offrir un moment aux Fées Beauté</h2>
          <p>
            Un soin du visage, un modelage, une beauté des mains… Le bon cadeau s’adapte à toutes
            les envies. Passez à l’institut ou appelez-nous pour le préparer.
          </p>
          <p className="cadeau__tel">
            <a href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a>
          </p>
        </Reveal>
      </section>

      <section className="section conteneur marques">
        <Reveal className="marques__tete">
          <h2>Les marques de l’institut</h2>
          <img src={etageres} alt="Étagères de produits de beauté dans l’institut." loading="lazy" />
        </Reveal>
        <ul className="marques__liste">
          {marques.map((m, i) => (
            <Reveal as="li" key={m.nom} delay={(i % 2) * 0.06} className="marque">
              <h3>{m.nom}</h3>
              <p className="marque__type">{m.type}</p>
              <p>{m.texte}</p>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  )
}
