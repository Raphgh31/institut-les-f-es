// Coordonnées et horaires de l'institut.
// Pour modifier une information affichée sur le site, il suffit de changer la valeur ici.

export const institut = {
  nom: 'Les Fées Beauté',
  prenoms: 'Mélody et Cécile',
  telephone: '02 97 08 12 40',
  telephoneLien: '+33297081240',
  email: 'lesfeesbeaute@gmail.com',
  adresse: 'ZA de Kermestre',
  ville: '56150 Baud',
  planity: 'https://www.planity.com/les-fees-beaute-56150-baud',
  carte: 'https://www.google.com/maps/search/?api=1&query=Les+F%C3%A9es+Beaut%C3%A9+ZA+de+Kermestre+56150+Baud',
}

// Créneaux d'ouverture, du lundi (1) au dimanche (0).
// Chaque créneau : [ouverture, fermeture] au format 'HH:MM'.
export const horaires = [
  { jour: 'Lundi', index: 1, creneaux: [['09:00', '12:00'], ['14:00', '19:00']] },
  { jour: 'Mardi', index: 2, creneaux: [['09:00', '12:00'], ['14:00', '19:00']] },
  { jour: 'Mercredi', index: 3, creneaux: [['09:00', '13:00']] },
  { jour: 'Jeudi', index: 4, creneaux: [['09:00', '12:00'], ['14:00', '18:00']] },
  { jour: 'Vendredi', index: 5, creneaux: [['09:00', '12:00'], ['14:00', '19:00']] },
  { jour: 'Samedi', index: 6, creneaux: [['09:00', '12:00']] },
  { jour: 'Dimanche', index: 0, creneaux: [] },
]

export const formatHeure = (h) => {
  const [hh, mm] = h.split(':')
  return mm === '00' ? `${Number(hh)}h` : `${Number(hh)}h${mm}`
}

export const formatCreneaux = (creneaux) =>
  creneaux.length === 0
    ? 'Fermé'
    : creneaux.map(([a, b]) => `${formatHeure(a)} – ${formatHeure(b)}`).join(' / ')

// Indique si l'institut est ouvert maintenant (heure de Paris).
export function statutOuverture(date = new Date()) {
  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)
  const get = (t) => parts.find((p) => p.type === t)?.value
  const jourNom = get('weekday')
  const minutes = Number(get('hour')) * 60 + Number(get('minute'))
  const toMin = (h) => {
    const [a, b] = h.split(':').map(Number)
    return a * 60 + b
  }

  const aujourdhui = horaires.find((h) => h.jour.toLowerCase() === jourNom) ?? horaires[0]
  const enCours = aujourdhui.creneaux.find(([a, b]) => minutes >= toMin(a) && minutes < toMin(b))
  if (enCours) {
    return { ouvert: true, texte: `Ouvert jusqu'à ${formatHeure(enCours[1])}`, jour: aujourdhui.index }
  }
  const prochain = aujourdhui.creneaux.find(([a]) => minutes < toMin(a))
  if (prochain) {
    return { ouvert: false, texte: `Fermé, réouverture à ${formatHeure(prochain[0])}`, jour: aujourdhui.index }
  }
  // Cherche le prochain jour ouvert
  const ordre = horaires.map((h) => h.index)
  let i = ordre.indexOf(aujourdhui.index)
  for (let n = 0; n < 7; n++) {
    i = (i + 1) % 7
    const j = horaires[i]
    if (j.creneaux.length) {
      return {
        ouvert: false,
        texte: `Fermé, réouverture ${j.jour.toLowerCase()} à ${formatHeure(j.creneaux[0][0])}`,
        jour: aujourdhui.index,
      }
    }
  }
  return { ouvert: false, texte: 'Fermé', jour: aujourdhui.index }
}
