import Section from '../components/ui/Section.jsx'
import Bouton from '../components/ui/Bouton.jsx'

export default function Introuvable() {
  return (
    <Section ton="ivoire" className="legal">
      <div className="conteneur legal__contenu">
        <h1>Cette page n’existe pas</h1>
        <p>Le lien est peut-être ancien. Retrouvez nos soins et nos tarifs depuis l’accueil.</p>
        <Bouton to="/">Retour à l’accueil</Bouton>
      </div>
    </Section>
  )
}
