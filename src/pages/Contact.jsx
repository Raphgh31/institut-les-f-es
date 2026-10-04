import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Arche from '../components/ui/Arche.jsx'
import BoutonRdv from '../components/ui/BoutonRdv.jsx'
import EnTetePage from '../components/EnTetePage.jsx'
import StatutOuverture from '../components/StatutOuverture.jsx'
import Perle from '../components/Perle.jsx'
import { institut, horaires, formatCreneaux, statutOuverture } from '../data/institut.js'
import perlePoudre from '../assets/perles/perle-poudre.webp'
import facade from '../assets/photos/facade.webp'

export default function Contact() {
  const jour = statutOuverture().jour

  return (
    <>
      <EnTetePage surtitre="Contact" lignes={['Venir', 'à l’institut']} visuel={<Perle image={perlePoudre} />} galet={0} tourne>
        <p>Sur rendez-vous, en ligne ou par téléphone. Vous pouvez aussi passer nous voir.</p>
      </EnTetePage>

      <Section ton="nude" className="contact">
        <div className="conteneur contact__grille">
          <Reveal className="contact__horaires">
            <h2>Horaires d’ouverture</h2>
            <StatutOuverture />
            <table className="horaires">
              <caption className="visuellement-cache">Horaires d’ouverture de la semaine</caption>
              <tbody>
                {horaires.map((h) => (
                  <tr key={h.jour} className={h.index === jour ? 'horaires__jour' : undefined}>
                    <th scope="row">
                      {h.jour}
                      {h.index === jour && <span className="horaires__auj">aujourd’hui</span>}
                    </th>
                    <td>{formatCreneaux(h.creneaux)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="contact__infos" delay={0.1}>
            <div className="contact__bloc">
              <h2>Prendre rendez-vous</h2>
              <p>La réservation en ligne est ouverte à toute heure.</p>
              <BoutonRdv />
            </div>
            <div className="contact__bloc">
              <h3>Par téléphone</h3>
              <a className="contact__grand" href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a>
            </div>
            <div className="contact__bloc">
              <h3>Par e-mail</h3>
              <a href={`mailto:${institut.email}`}>{institut.email}</a>
            </div>
            <div className="contact__bloc">
              <h3>À l’institut</h3>
              <address>
                {institut.adresse}
                <br />
                {institut.ville}
              </address>
              <a className="lien" href={institut.carte} target="_blank" rel="noreferrer">Ouvrir l’itinéraire</a>
            </div>
          </Reveal>
        </div>
        <Reveal className="conteneur contact__vitrine">
          <Arche src={facade} alt="La vitrine de l’institut Les Fées Beauté, avec le numéro de téléphone et la liste des prestations." largeur={556} hauteur={218} className="arche--large" />
        </Reveal>
      </Section>
    </>
  )
}
