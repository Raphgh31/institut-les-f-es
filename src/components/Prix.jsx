// Affiche un prix : le chiffre dans la police de titre, le symbole « € » dans la police de texte,
// plus lisible en petite taille que le € très fin du Bodoni.
export default function Prix({ valeur, className = '' }) {
  const m = /^(.*?)\s*€$/.exec(valeur)
  if (!m) return <span className={className}>{valeur}</span>
  return (
    <span className={className}>
      {m[1]}
      <span className="devise">€</span>
    </span>
  )
}
