import { Link } from 'react-router-dom'

export default function Introuvable() {
  return (
    <section className="section conteneur introuvable">
      <h1>Cette page n’existe pas</h1>
      <p>Le lien est peut-être ancien. Retrouvez nos soins et nos tarifs depuis l’accueil.</p>
      <Link className="bouton bouton--prune" to="/">Retour à l’accueil</Link>
    </section>
  )
}
