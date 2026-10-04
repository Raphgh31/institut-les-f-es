// Une ligne de carte : nom … prix, avec la durée et la description en dessous.
export default function ListePrix({ prestations, details = true }) {
  return (
    <ul className="prix">
      {prestations.map((p) => (
        <li key={p.nom} className="prix__ligne">
          <div className="prix__haut">
            <span className="prix__nom">
              {p.nom}
              {p.duree && <span className="prix__duree">{p.duree}</span>}
            </span>
            <span className="prix__points" aria-hidden="true" />
            <span className="prix__montant">{p.prix}</span>
          </div>
          {details && p.description && <p className="prix__desc">{p.description}</p>}
        </li>
      ))}
    </ul>
  )
}
