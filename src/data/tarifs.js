// Carte des prestations et tarifs.
// Chaque prestation : nom, durée (facultative), prix, description (facultative).
// Le prix est un texte libre : '35 €', 'Sur demande', etc.
// Les catégories marquées `soin: true` apparaissent aussi sur la page « Soins ».

export const categories = [
  {
    id: 'visage',
    titre: 'Soins du visage',
    soin: true,
    intro: 'Chaque soin commence par un diagnostic de peau. Les produits sont choisis selon votre type de peau et la saison.',
    prestations: [
      { nom: 'Soin jeune', duree: 'moins de 18 ans', prix: '30 €', description: 'Un premier soin adapté aux peaux jeunes, pour apprendre les bons gestes au quotidien.' },
      { nom: 'Soin éclat', duree: '30 min', prix: '35 €', description: 'La mise en beauté rapide, pour les plus pressées : un teint éclatant en une demi-heure, à prix tout doux.' },
      { nom: 'Soin Les Fées Beauté', duree: '1 h', prix: '53 €', description: "Pour entretenir et protéger tous les types de peau : démaquillage en douceur, exfoliation, pose sous vapeur pour faciliter l'extraction des comédons, puis masque adapté." },
      { nom: 'Soin Eskalia', duree: '50 min', prix: '57 €', description: 'Embarquez à bord du vol Eskalia, qui vous emmène à chaque saison vers de nouveaux horizons. La senteur change selon l’escale.' },
      { nom: 'Soin douceur', duree: '1 h', prix: '63 €', description: 'Une bulle de douceur adaptée à toutes les peaux, un vrai cocon de bien-être et de sérénité.' },
      { nom: 'Soin anti-âge régénérant', duree: '1 h 10', prix: '67 €', description: 'Des formules haute technologie pour une réponse ciblée et efficace : la peau retrouve son éclat.' },
      { nom: 'Soin contour des yeux', duree: '35 min', prix: '33,50 €', description: "Le contour de l'œil est lissé, les rides et les cernes sont atténués." },
      { nom: 'Soin homme', duree: '1 h', prix: '55 €', description: "Des phases de modelage alternent avec l'application d'actifs hydratants, tonifiants et anti-rides." },
    ],
  },
  {
    id: 'corps',
    titre: 'Soins du corps',
    soin: true,
    intro: 'Modelages et rituels pour relâcher les tensions. Les escales Eskalia changent tous les six mois.',
    prestations: [
      { nom: 'Gommage corps', prix: '35 €' },
      { nom: 'Soin Harmony du dos', duree: '25 min', prix: '30 €', description: 'Relâche les tensions musculaires et détend le corps tout entier.' },
      { nom: 'Soin Cocoon', duree: '30 min', prix: '35 €', description: 'Un rituel-plaisir personnalisé, sur deux zones au choix.' },
      { nom: 'Soin californien', duree: '1 h', prix: '60 €', description: 'Ce modelage vous enveloppe des pieds à la tête et agit en profondeur pour apaiser les tensions nerveuses et musculaires.' },
      { nom: 'Soin Eskalia corps', duree: '50 min', prix: '60 €', description: 'Un gommage suivi d’un modelage du corps, qui vous emmène en voyage grâce aux escales proposées tous les six mois.' },
      { nom: 'Modelage à la bougie', duree: '50 min', prix: '59 €', description: "La bougie fondue devient une huile de massage chaude et parfumée, qui hydrate la peau pendant un modelage d'une grande douceur." },
      { nom: 'Rituel Rêve des Marquises', duree: '1 h 30', prix: '115 €', description: 'Gommage du lagon aux tiges de bambou, enveloppement des îles au coco et beurre de mangue, puis massage du corps à l’huile nacrée de coco.' },
      { nom: 'Rituel Secret d’Amazonie', duree: '1 h', prix: '78 €', description: "Gommage aux grains de guarana, suivi d'un modelage lent et enveloppant à l'huile d'andiroba." },
    ],
  },
  {
    id: 'minceur',
    titre: 'Minceur',
    prestations: [
      { nom: 'Cellutec, la séance', prix: '34 €' },
      { nom: 'Cellutec, 10 séances + 1 offerte', prix: '340 €' },
    ],
  },
  {
    id: 'regard',
    titre: 'Beauté du regard',
    prestations: [
      { nom: 'Rehaussement de cils', prix: '66 €' },
      { nom: 'Teinture des cils', prix: '19 €' },
      { nom: 'Teinture des sourcils', prix: '13 €' },
      { nom: 'Teinture cils et sourcils', prix: '27 €' },
    ],
  },
  {
    id: 'maquillage',
    titre: 'Maquillage',
    prestations: [
      { nom: 'Maquillage jour ou cérémonie', prix: '35 €' },
      { nom: 'Maquillage jour ou cérémonie, avec essai', prix: '60 €' },
      { nom: 'Maquillage mariée, avec essai', prix: '60 €' },
      { nom: 'Cours de maquillage', prix: '55 €' },
    ],
  },
  {
    id: 'mains',
    titre: 'Beauté des mains',
    prestations: [
      { nom: 'Manucure simple', prix: '25 €' },
      { nom: 'Pose de vernis', prix: '20 €' },
      { nom: 'Pose de vernis french', prix: '22 €' },
      { nom: 'Pose de vernis enfant', prix: '10 €' },
      { nom: 'Vernis semi-permanent couleur', prix: '29 €' },
      { nom: 'Vernis semi-permanent french', prix: '31 €' },
      { nom: 'Dépose', prix: '10 €', description: '5 € si elle est suivie d’une nouvelle pose.' },
      { nom: 'Décor ou strass, l’unité', prix: '0,50 €' },
    ],
  },
  {
    id: 'pieds',
    titre: 'Beauté des pieds',
    prestations: [
      { nom: 'Beauté des pieds', prix: '30 €' },
      { nom: 'Calluzero', prix: '37 €', description: 'Traitement des callosités.' },
    ],
  },
  {
    id: 'epilations-femme',
    titre: 'Épilations femme',
    prestations: [
      { nom: 'Sourcils, lèvres ou menton', prix: '10 €' },
      { nom: 'Lèvres et sourcils', prix: '13 €' },
      { nom: 'Lèvres, sourcils et menton', prix: '16 €' },
      { nom: 'Visage', prix: '21 €' },
      { nom: 'Aisselles ou maillot', prix: '12 €' },
      { nom: 'Maillot string', prix: '16 €' },
      { nom: 'Maillot brésilien', prix: '20 €' },
      { nom: 'Maillot intégral', prix: '23 €' },
      { nom: 'Demi-jambes', prix: '17 €' },
      { nom: 'Cuisses', prix: '19 €' },
      { nom: 'Trois-quarts jambes', prix: '22 €' },
      { nom: 'Jambes entières', prix: '25 €' },
      { nom: 'Bras', prix: '17 €' },
    ],
  },
  {
    id: 'epilations-homme',
    titre: 'Épilations homme',
    prestations: [
      { nom: 'Dos ou torse', prix: '24 €' },
      { nom: 'Dos et torse', prix: '43 €' },
      { nom: 'Jambes entières', prix: '26 €' },
      { nom: 'Aisselles', prix: '12 €' },
      { nom: 'Oreilles', prix: '10 €' },
      { nom: 'Sourcils', prix: '11 €' },
    ],
  },
  {
    id: 'decoloration',
    titre: 'Décoloration',
    prestations: [
      { nom: 'Lèvres', prix: '11 €' },
      { nom: 'Visage', prix: '16 €' },
      { nom: 'Bras', prix: '25 €' },
    ],
  },
  {
    id: 'sun',
    titre: 'Sun institute',
    prestations: [
      { nom: 'Passeport visage, 6 séances', prix: '25 €' },
      { nom: 'Passeport visage, 10 séances + 3 offertes', prix: '50 €' },
      { nom: 'Passeport corps, 6 séances', prix: '120 €' },
    ],
  },
  {
    id: 'definitive',
    titre: 'Épilation définitive',
    prestations: [
      { nom: 'Laser diode MyLaser', prix: 'Sur devis', description: 'Après un premier rendez-vous de consultation.' },
      { nom: 'Apilus', prix: 'Sur devis', description: 'Après un premier rendez-vous de consultation.' },
    ],
  },
]

// Marques présentes en boutique
export const marques = [
  {
    nom: 'Eskalia',
    type: 'Soins visage et corps',
    texte: "Une marque française, fabriquée à Agen, aux ingrédients naturels. Ses « escales » changent tous les six mois et donnent leur parfum à nos soins Eskalia.",
  },
  {
    nom: 'Noham',
    type: 'Cosmétiques bio',
    texte: 'Cosmétiques et soins lavants naturels et biologiques, avec des programmes de soins à poursuivre à la maison.',
  },
  {
    nom: 'Sensa',
    type: 'Parfums',
    texte: "Des effluves d'ici et d'ailleurs. « Des souvenirs sans senteur, c'est comme une fleur sans parfum. »",
  },
  {
    nom: 'Nakupenda',
    type: 'Bijoux',
    texte: "Née d'un voyage sur une petite île de Tanzanie. Chaque saison, une collection éphémère en acier chirurgical inoxydable et pierres naturelles.",
  },
  {
    nom: 'puroBIO',
    type: 'Maquillage bio',
    texte: 'Du maquillage certifié bio, de qualité professionnelle, à essayer sur place au présentoir.',
  },
]
