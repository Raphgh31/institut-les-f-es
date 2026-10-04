import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { institut, horaires, formatCreneaux } from '../data/institut.js'
import { liens } from './Header.jsx'

export default function Footer() {
  return (
    <footer className="pied">
      <div className="conteneur pied__grille">
        <div className="pied__marque">
          <Link to="/" className="logo__script logo__script--clair" aria-label="Les Fées Beauté, accueil">
            Les Fées Beauté
          </Link>
          <p>
            Institut de beauté tenu par {institut.prenoms}.
            <br />
            {institut.adresse}, {institut.ville}.
          </p>
          <a className="pied__rdv" href={institut.planity} target="_blank" rel="noreferrer">
            Réserver en ligne sur Planity
          </a>
        </div>

        <div>
          <h2 className="pied__titre">Nous joindre</h2>
          <ul className="pied__liste">
            <li><a href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a></li>
            <li><a href={`mailto:${institut.email}`}>{institut.email}</a></li>
            <li><a href={institut.carte} target="_blank" rel="noreferrer">Itinéraire</a></li>
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

      <div className="conteneur pied__bas">
        <p>© {new Date().getFullYear()} Les Fées Beauté, Baud</p>
        <ul>
          <li><Link to="/mentions-legales">Mentions légales</Link></li>
          <li><Link to="/confidentialite">Confidentialité</Link></li>
        </ul>
      </div>

      {/* Dernier trait : une arche fine qui se dessine une fois, comme une signature. */}
      <svg className="pied__signature" viewBox="0 0 200 120" aria-hidden="true">
        <motion.path
          d="M20 120V70a80 80 0 0 1 160 0v50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </footer>
  )
}
