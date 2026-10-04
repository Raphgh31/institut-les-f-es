import EnTetePage from '../components/EnTetePage.jsx'
import Reveal from '../components/Reveal.jsx'
import StatutOuverture from '../components/StatutOuverture.jsx'
import { institut, horaires, formatCreneaux, statutOuverture } from '../data/institut.js'
import facade from '../assets/photos/facade.webp'

export default function Contact() {
  const jour = statutOuverture().jour

  return (
    <>
      <EnTetePage titre="Contact et horaires" image={facade} alt="La vitrine de l’institut Les Fées Beauté à Baud.">
        <p>Sur rendez-vous, en ligne ou par téléphone. Vous pouvez aussi passer nous voir.</p>
      </EnTetePage>

      <section className="section conteneur contact">
        <Reveal className="contact__horaires">
          <h2>Horaires d’ouverture</h2>
          <StatutOuverture />
          <table className="horaires">
            <tbody>
              {horaires.map((h) => (
                <tr key={h.jour} className={h.index === jour ? 'horaires--jour' : undefined}>
                  <th scope="row">{h.jour}</th>
                  <td>{formatCreneaux(h.creneaux)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={0.1} className="contact__infos">
          <div className="contact__bloc">
            <h2>Prendre rendez-vous</h2>
            <p>La réservation en ligne est ouverte jour et nuit.</p>
            <a className="bouton bouton--prune" href={institut.planity} target="_blank" rel="noreferrer">
              Réserver sur Planity
            </a>
          </div>
          <div className="contact__bloc">
            <h3>Par téléphone</h3>
            <p className="contact__grand"><a href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a></p>
          </div>
          <div className="contact__bloc">
            <h3>Par e-mail</h3>
            <p><a href={`mailto:${institut.email}`}>{institut.email}</a></p>
          </div>
          <div className="contact__bloc">
            <h3>À l’institut</h3>
            <address>
              {institut.adresse}<br />
              {institut.ville}
            </address>
            <a className="lien-fleche" href={institut.carte} target="_blank" rel="noreferrer">
              Ouvrir l’itinéraire
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
