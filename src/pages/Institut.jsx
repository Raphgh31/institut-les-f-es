import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import TitreRevele from '../components/ui/TitreRevele.jsx'
import Arche from '../components/ui/Arche.jsx'
import EnTetePage from '../components/EnTetePage.jsx'
import Annotation from '../components/Annotation.jsx'
import Chiffres from '../components/Chiffres.jsx'
import Lookbook from '../components/Lookbook.jsx'
import { photos } from '../data/galerie.js'
import { institut } from '../data/institut.js'
import cabineZen from '../assets/photos/cabine-zen.webp'
import murBijoux from '../assets/photos/mur-bijoux.webp'
import manucure from '../assets/photos/manucure.webp'

const lieux = [
  {
    titre: 'L’accueil et la boutique',
    texte: 'Un mur de bois clair, des bijoux, des parfums et les soins que nous utilisons en cabine.',
  },
  {
    titre: 'La cabine Zen',
    texte: 'C’est ici que se font les soins du visage, les modelages et les rituels du corps.',
  },
  {
    titre: 'Le coin manucure',
    texte: 'Manucure, vernis classique ou semi-permanent, autour de la table et de ses chaises prune.',
  },
]

export default function Institut() {
  return (
    <>
      <EnTetePage
        surtitre="L’institut"
        lignes={['Mélody, Cécile', 'et leur institut']}
        visuel={<Arche src={cabineZen} alt="La porte de la cabine de soins, surmontée des lettres ZEN." largeur={1200} hauteur={1500} priorite />}
        galet={1}
      >
        <p>
          Les Fées Beauté, c’est l’institut de {institut.prenoms}, installé dans la zone de Kermestre, à
          Baud. Un lieu calme, du bois clair, des plantes et une lumière douce.
        </p>
      </EnTetePage>

      <Section ton="nude" className="lieux">
        <div className="conteneur lieux__grille">
          <div className="lieux__photos">
            <Arche
              src={murBijoux}
              alt="Le mur de tasseaux de chêne avec les étagères de bijoux et les sacs Eskalia."
              largeur={1000}
              hauteur={1314}
              className="lieux__principale"
            >
              <Annotation x="53%" y="56%">Les bijoux Nakupenda</Annotation>
              <Annotation x="46%" y="87%" cote="gauche">Les sacs Eskalia</Annotation>
            </Arche>
            <Arche
              src={manucure}
              alt="La table de manucure et ses chaises prune."
              largeur={1300}
              hauteur={851}
              className="arche--large lieux__secondaire"
            />
          </div>
          <div className="lieux__texte">
            <TitreRevele lignes={['Un lieu,', 'trois coins']} />
            <ul className="lieux__liste">
              {lieux.map((l, i) => (
                <Reveal as="li" key={l.titre} delay={i * 0.08}>
                  <h3>{l.titre}</h3>
                  <p>{l.texte}</p>
                </Reveal>
              ))}
            </ul>
            <Chiffres />
          </div>
        </div>
      </Section>

      <Section ton="ivoire" className="galerie">
        <div className="conteneur">
          <div className="galerie__tete">
            <TitreRevele lignes={['La galerie']} />
            <Reveal delay={0.1}>
              <p>Cliquez sur une photo pour l’agrandir. Les flèches du clavier permettent de passer à la suivante.</p>
            </Reveal>
          </div>
          <Lookbook photos={photos} />
        </div>
      </Section>
    </>
  )
}
