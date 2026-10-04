// Photos de l'institut affichées dans le lookbook.
// `format` règle la place de l'image dans la composition : 'portrait', 'paysage' ou 'panorama'.
import interieur from '../assets/photos/interieur.webp'
import murBijoux from '../assets/photos/mur-bijoux.webp'
import cabineZen from '../assets/photos/cabine-zen.webp'
import manucure from '../assets/photos/manucure.webp'
import maquillage from '../assets/photos/maquillage-bio.webp'
import etageres from '../assets/photos/etageres.webp'
import coinBijoux from '../assets/photos/coin-bijoux.webp'
import facade from '../assets/photos/facade.webp'

export const photos = [
  { id: 'accueil', src: interieur, l: 1600, h: 1200, format: 'paysage', categorie: 'L’accueil', titre: 'Le salon, côté boutique', alt: 'L’accueil de l’institut : présentoir de maquillage bio, mur en tasseaux de bois avec les bijoux, et la porte de la cabine Zen.' },
  { id: 'cabine', src: cabineZen, l: 720, h: 1571, format: 'portrait', cadrage: '50% 10%', categorie: 'Les soins', titre: 'La cabine Zen', alt: 'La porte encadrée de bois de la cabine de soins, surmontée des lettres ZEN.' },
  { id: 'bijoux', src: murBijoux, l: 1000, h: 1314, format: 'portrait', categorie: 'La boutique', titre: 'Le mur de bijoux', alt: 'Étagères noires sur un mur de tasseaux en chêne, avec bijoux Nakupenda, plantes et sacs Eskalia.' },
  { id: 'manucure', src: manucure, l: 1300, h: 851, format: 'paysage', categorie: 'Les ongles', titre: 'Le coin manucure', alt: 'La table de manucure avec ses chaises prune et une serviette pliée.' },
  { id: 'maquillage', src: maquillage, l: 560, h: 1840, format: 'portrait', categorie: 'Le maquillage', titre: 'Le présentoir puroBIO', alt: 'Le présentoir de maquillage bio puroBIO avec rouges à lèvres, fards et pinceaux.' },
  { id: 'etageres', src: etageres, l: 773, h: 460, format: 'paysage', categorie: 'La boutique', titre: 'Soins et parfums', alt: 'Étagères de soins Noham, parfums Sensa et produits Eskalia.' },
  { id: 'coin', src: coinBijoux, l: 848, h: 566, format: 'paysage', categorie: 'L’accueil', titre: 'Le coin attente', alt: 'Un fauteuil près d’un présentoir lumineux de bijoux, devant la porte de la cabine Zen.' },
  { id: 'vitrine', src: facade, l: 556, h: 218, format: 'panorama', categorie: 'La vitrine', titre: 'ZA de Kermestre, à Baud', alt: 'La vitrine de l’institut Les Fées Beauté avec le numéro de téléphone et la liste des prestations.' },
]
