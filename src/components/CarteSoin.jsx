import { institut } from '../data/institut.js'
import Prix from './Prix.jsx'

/** Carte d'un soin : la réservation apparaît au survol (toujours visible au clavier et sur mobile). */
export default function CarteSoin({ soin, orne }) {
  return (
    <article className="carte-soin">
      {orne && (
        <span className="carte-soin__orne" aria-hidden="true">
          <img src={orne} alt="" width="1000" height="1000" loading="lazy" decoding="async" />
        </span>
      )}
      {soin.duree && <p className="carte-soin__duree">{soin.duree}</p>}
      <h3 className="carte-soin__nom">{soin.nom}</h3>
      {soin.description && <p className="carte-soin__desc">{soin.description}</p>}
      <div className="carte-soin__pied">
        <p className="carte-soin__prix"><Prix valeur={soin.prix} /></p>
        <a className="carte-soin__cta" href={institut.planity} target="_blank" rel="noreferrer">
          Réserver<span className="visuellement-cache"> : {soin.nom}</span>
        </a>
      </div>
    </article>
  )
}
