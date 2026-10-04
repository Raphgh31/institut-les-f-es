import Bouton from './Bouton.jsx'
import { institut } from '../../data/institut.js'

// Le bouton de réservation, identique partout sur le site.
export default function BoutonRdv({ variante = 'principal', children = 'Prendre rendez-vous', ...props }) {
  return (
    <Bouton href={institut.planity} variante={variante} {...props}>
      {children}
    </Bouton>
  )
}
