import { useEffect, useState } from 'react'
import { statutOuverture } from '../data/institut.js'

export default function StatutOuverture({ className = '' }) {
  const [statut, setStatut] = useState(() => statutOuverture())

  useEffect(() => {
    const t = setInterval(() => setStatut(statutOuverture()), 60_000)
    return () => clearInterval(t)
  }, [])

  return (
    <p className={`statut ${statut.ouvert ? 'statut--ouvert' : ''} ${className}`}>
      <span className="statut__point" aria-hidden="true" />
      {statut.texte}
    </p>
  )
}
