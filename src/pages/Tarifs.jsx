import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import EnTetePage from '../components/EnTetePage.jsx'
import ListePrix from '../components/ListePrix.jsx'
import { categories } from '../data/tarifs.js'
import { institut } from '../data/institut.js'

export default function Tarifs() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }, [hash])

  const allerA = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <EnTetePage titre="La carte et les tarifs">
        <p>
          Tous nos prix sont indiqués TTC. Pour l’épilation définitive, un premier rendez-vous permet
          d’établir un devis selon les zones.
        </p>
      </EnTetePage>

      <div className="conteneur carte">
        <nav className="carte__index" aria-label="Catégories de la carte">
          <ul>
            {categories.map((c) => (
              <li key={c.id}>
                <a href={`#/tarifs#${c.id}`} onClick={(e) => allerA(e, c.id)}>{c.titre}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="carte__contenu">
          {categories.map((c) => (
            <section key={c.id} id={c.id} className="carte__categorie">
              <h2>{c.titre}</h2>
              <ListePrix prestations={c.prestations} />
            </section>
          ))}
          <p className="carte__note">
            Réservation en ligne sur <a href={institut.planity} target="_blank" rel="noreferrer">Planity</a> ou
            par téléphone au <a href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a>.
          </p>
        </div>
      </div>
    </>
  )
}
