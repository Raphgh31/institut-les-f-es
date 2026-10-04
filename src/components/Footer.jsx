import { Link } from 'react-router-dom'
import { institut, horaires, formatCreneaux } from '../data/institut.js'
import { liens } from './Header.jsx'

export default function Footer() {
  return (
    <footer className="pied">
      <div className="pied__grille conteneur">
        <div className="pied__marque">
          <p className="logo__script logo__script--clair">Les Fées Beauté</p>
          <p>
            Institut de beauté tenu par {institut.prenoms},<br />
            {institut.adresse}, {institut.ville}.
          </p>
        </div>

        <div>
          <h2 className="pied__titre">Nous joindre</h2>
          <ul className="pied__liste">
            <li><a href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a></li>
            <li><a href={`mailto:${institut.email}`}>{institut.email}</a></li>
            <li><a href={institut.planity} target="_blank" rel="noreferrer">Réserver sur Planity</a></li>
          </ul>
        </div>

        <div>
          <h2 className="pied__titre">Horaires</h2>
          <dl className="pied__horaires">
            {horaires.map((h) => (
              <div key={h.jour}>
                <dt>{h.jour}</dt>
                <dd>{formatCreneaux(h.creneaux)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="pied__titre">Le site</h2>
          <ul className="pied__liste">
            <li><Link to="/">Accueil</Link></li>
            {liens.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <p className="pied__mention conteneur">© {new Date().getFullYear()} Les Fées Beauté, Baud</p>
    </footer>
  )
}
