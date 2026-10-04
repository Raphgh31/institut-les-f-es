import { Link } from 'react-router-dom'
import EnTetePage from '../components/EnTetePage.jsx'
import Reveal from '../components/Reveal.jsx'
import { categories } from '../data/tarifs.js'
import { institut } from '../data/institut.js'
import etageres from '../assets/photos/etageres.webp'

export default function Soins() {
  const soins = categories.filter((c) => c.soin)

  return (
    <>
      <EnTetePage titre="Les soins du visage et du corps" image={etageres} alt="Produits Noham, Eskalia et parfums Sensa sur les étagères de l’institut.">
        <p>
          Des soins d’une demi-heure à une heure et demie, réalisés avec des produits naturels,
          notamment ceux de la marque française Eskalia.
        </p>
      </EnTetePage>

      {soins.map((cat) => (
        <section key={cat.id} id={cat.id} className="section conteneur soins">
          <Reveal className="soins__tete">
            <h2>{cat.titre}</h2>
            <p>{cat.intro}</p>
          </Reveal>
          <ul className="soins__liste">
            {cat.prestations
              .filter((p) => p.description)
              .map((p, i) => (
                <Reveal as="li" key={p.nom} delay={(i % 2) * 0.06} className="soin">
                  <div className="soin__haut">
                    <h3>{p.nom}</h3>
                    <p className="soin__prix">{p.prix}</p>
                  </div>
                  {p.duree && <p className="soin__duree">{p.duree}</p>}
                  <p>{p.description}</p>
                </Reveal>
              ))}
          </ul>
        </section>
      ))}

      <section className="section conteneur bandeau-rdv">
        <Reveal>
          <h2>Vous hésitez entre deux soins ?</h2>
          <p>
            Appelez-nous au <a href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a>, nous vous
            conseillerons. Les autres prestations (épilations, ongles, regard, maquillage) sont sur la{' '}
            <Link to="/tarifs">page des tarifs</Link>.
          </p>
          <a className="bouton bouton--prune" href={institut.planity} target="_blank" rel="noreferrer">
            Réserver un soin
          </a>
        </Reveal>
      </section>
    </>
  )
}
