import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import TitreRevele from '../components/ui/TitreRevele.jsx'
import Arche from '../components/ui/Arche.jsx'
import EnTetePage from '../components/EnTetePage.jsx'
import BonCadeau from '../components/BonCadeau.jsx'
import { marques } from '../data/tarifs.js'
import { institut } from '../data/institut.js'
import coinBijoux from '../assets/photos/coin-bijoux.webp'
import etageres from '../assets/photos/etageres.webp'

export default function Boutique() {
  return (
    <>
      <EnTetePage
        surtitre="Boutique et cadeaux"
        lignes={['À offrir,', 'ou à s’offrir']}
        visuel={<Arche src={coinBijoux} alt="Le coin bijoux de la boutique, avec les sacs Eskalia." largeur={848} hauteur={566} className="arche--large" priorite />}
        galet={2}
      >
        <p>Les soins que nous utilisons en cabine, des parfums et des bijoux, à découvrir sur place aux horaires d’ouverture.</p>
      </EnTetePage>

      <Section ton="poudre" className="cadeau">
        <div className="conteneur cadeau__grille">
          <Reveal>
            <BonCadeau />
          </Reveal>
          <div className="cadeau__texte">
            <TitreRevele lignes={['Le bon cadeau']} />
            <Reveal delay={0.1}>
              <p>
                Un soin du visage, un modelage, une beauté des mains… Le bon cadeau est valable sur toute la carte.
                Passez à l’institut ou appelez-nous pour le préparer.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a className="cadeau__tel" href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section ton="ivoire" className="marques">
        <div className="conteneur marques__grille">
          <div className="marques__tete">
            <TitreRevele lignes={['Les marques', 'de l’institut']} />
            <Reveal delay={0.1}>
              <Arche src={etageres} alt="Étagères de soins Noham, parfums Sensa et produits Eskalia." largeur={773} hauteur={460} className="arche--large" />
            </Reveal>
          </div>
          <ul className="marques__liste">
            {marques.map((m, i) => (
              <Reveal as="li" key={m.nom} delay={(i % 2) * 0.08} className="marque">
                <p className="micro">{m.type}</p>
                <h3>{m.nom}</h3>
                <p>{m.texte}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
