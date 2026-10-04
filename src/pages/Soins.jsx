import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import TitreRevele from '../components/ui/TitreRevele.jsx'
import BoutonRdv from '../components/ui/BoutonRdv.jsx'
import EnTetePage from '../components/EnTetePage.jsx'
import CarteSoin from '../components/CarteSoin.jsx'
import Perle from '../components/Perle.jsx'
import { categories } from '../data/tarifs.js'
import { institut } from '../data/institut.js'
import perleNacre from '../assets/perles/perle-nacre.webp'
import perlePoudre from '../assets/perles/perle-poudre.webp'

const ornes = { visage: perleNacre, corps: perlePoudre }
const tons = { visage: 'ivoire', corps: 'nude' }

export default function Soins() {
  const soins = categories.filter((c) => c.soin)

  return (
    <>
      <EnTetePage
        surtitre="Visage et corps"
        lignes={['Les soins', 'de l’institut']}
        visuel={<Perle image={perleNacre} />}
        tourne
      >
        <p>
          De la demi-heure éclat au rituel d’une heure et demie, des soins réalisés avec des produits naturels,
          dont ceux de la marque française Eskalia.
        </p>
      </EnTetePage>

      {soins.map((cat) => (
        <Section key={cat.id} id={cat.id} ton={tons[cat.id]} className="soins">
          <div className="conteneur">
            <div className="soins__tete">
              <TitreRevele lignes={[cat.titre]} />
              <Reveal delay={0.1}>
                <p>{cat.intro}</p>
              </Reveal>
            </div>
            <ul className="soins__liste">
              {cat.prestations
                .filter((p) => p.description)
                .map((p, i) => (
                  <Reveal as="li" key={p.nom} delay={(i % 2) * 0.08}>
                    <CarteSoin soin={p} orne={ornes[cat.id]} />
                  </Reveal>
                ))}
            </ul>
          </div>
        </Section>
      ))}

      <Section ton="nude" className="bandeau">
        <Reveal className="conteneur bandeau__contenu">
          <h2 className="bandeau__titre">Vous hésitez entre deux soins ?</h2>
          <p>
            Appelez-nous au <a href={`tel:${institut.telephoneLien}`}>{institut.telephone}</a>, on vous conseille
            volontiers. Épilations, ongles, regard et maquillage sont sur la page des tarifs.
          </p>
          <BoutonRdv />
        </Reveal>
      </Section>
    </>
  )
}
