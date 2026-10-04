import Section from '../components/ui/Section.jsx'
import { institut } from '../data/institut.js'

export default function Confidentialite() {
  return (
    <Section ton="ivoire" className="legal">
      <div className="conteneur legal__contenu">
        <h1>Confidentialité</h1>

        <h2>Ce que ce site collecte</h2>
        <p>
          Rien. Ce site ne dépose aucun cookie, n’utilise aucun outil de mesure d’audience et ne contient aucun
          formulaire. Les polices de caractères sont hébergées avec le site : aucune donnée n’est transmise à un
          service tiers lors de votre visite.
        </p>

        <h2>Prise de rendez-vous</h2>
        <p>
          La réservation en ligne se fait sur Planity, un service externe. Les informations que vous y saisissez
          sont traitées par Planity selon sa propre politique de confidentialité. Le lien « Itinéraire » ouvre
          Google Maps, soumis à la politique de Google.
        </p>

        <h2>Vos messages</h2>
        <p>
          Si vous nous écrivez à <a href={`mailto:${institut.email}`}>{institut.email}</a> ou nous appelez, vos
          coordonnées servent uniquement à vous répondre et à gérer vos rendez-vous. Vous pouvez demander à tout
          moment leur consultation, leur modification ou leur suppression à la même adresse.
        </p>
      </div>
    </Section>
  )
}
