import EnTetePage from '../components/EnTetePage.jsx'
import Reveal from '../components/Reveal.jsx'
import { institut } from '../data/institut.js'

const etapes = [
  { titre: 'Le rendez-vous conseil', texte: 'Nous regardons ensemble les zones à traiter, votre type de peau et de poils, et nous vous indiquons la méthode la plus adaptée.' },
  { titre: 'Le devis', texte: 'Le tarif dépend des zones et du nombre de séances. Vous repartez avec un devis clair.' },
  { titre: 'Les séances', texte: 'Les séances sont espacées de quelques semaines, au rythme de la repousse. Nous ajustons au fil des résultats.' },
]

export default function EpilationDefinitive() {
  return (
    <>
      <EnTetePage titre="L’épilation définitive à Baud">
        <p>
          Deux techniques complémentaires, pour en finir avec le rasoir et la cire : le laser diode
          MyLaser et l’Apilus.
        </p>
      </EnTetePage>

      <section className="section conteneur methodes">
        <Reveal as="article" className="methode">
          <p className="methode__type">Laser diode</p>
          <h2>MyLaser</h2>
          <p>
            Un laser diode de dernière génération, plus efficace qu’une lumière pulsée. Il agit sur de
            grandes zones comme les jambes, les aisselles ou le maillot, et convient à la plupart des
            carnations.
          </p>
        </Reveal>
        <Reveal as="article" className="methode" delay={0.1}>
          <p className="methode__type">Épilation électrique</p>
          <h2>Apilus</h2>
          <p>
            Leader mondial de l’épilation définitive, l’Apilus traite chaque poil un à un. Il est 100 %
            définitif et convient aussi aux poils clairs ou fins, sur lesquels le laser agit moins bien.
          </p>
        </Reveal>
      </section>

      <section className="section etapes">
        <div className="conteneur">
          <Reveal><h2>Comment ça se passe</h2></Reveal>
          <ol className="etapes__liste">
            {etapes.map((e, i) => (
              <Reveal as="li" key={e.titre} delay={i * 0.08} className="etape">
                <span className="etape__num" aria-hidden="true">{i + 1}</span>
                <h3>{e.titre}</h3>
                <p>{e.texte}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section conteneur bandeau-rdv">
        <Reveal>
          <h2>Tarifs sur demande</h2>
          <p>
            Pour un devis, appelez-nous au <a href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a>{' '}
            ou réservez un rendez-vous conseil.
          </p>
          <a className="bouton bouton--prune" href={institut.planity} target="_blank" rel="noreferrer">
            Réserver un rendez-vous conseil
          </a>
        </Reveal>
      </section>
    </>
  )
}
