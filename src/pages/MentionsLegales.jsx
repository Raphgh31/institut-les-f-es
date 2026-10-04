import Section from '../components/ui/Section.jsx'
import { institut } from '../data/institut.js'

// Les champs « à compléter » doivent être renseignés par l'institut avant la mise en ligne.
const ACOMPLETER = <span className="a-completer">à compléter</span>

export default function MentionsLegales() {
  return (
    <Section ton="ivoire" className="legal">
      <div className="conteneur legal__contenu">
        <h1>Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          {institut.nom}, institut de beauté
          <br />
          {institut.adresse}, {institut.ville}
          <br />
          Téléphone : {institut.telephone}, e-mail : <a href={`mailto:${institut.email}`}>{institut.email}</a>
        </p>
        <p>
          Raison sociale et forme juridique : {ACOMPLETER}
          <br />
          SIRET : {ACOMPLETER}
          <br />
          Responsable de la publication : {ACOMPLETER}
        </p>

        <h2>Hébergement</h2>
        <p>
          GitHub Pages, service de GitHub, Inc.
          <br />
          88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes et photographies de ce site appartiennent à {institut.nom}. Toute reproduction sans
          autorisation est interdite. Les noms de marques cités (Eskalia, Noham, Sensa, Nakupenda, puroBIO,
          MyLaser, Apilus, Planity) appartiennent à leurs propriétaires respectifs.
        </p>
      </div>
    </Section>
  )
}
