import { Link } from 'react-router-dom'

const Fleche = () => (
  <svg className="bouton__fleche" viewBox="0 0 20 10" aria-hidden="true">
    <path d="M0 5h18M14 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

/**
 * Bouton en capsule.
 * variante : 'principal' (prune) | 'contour' | 'clair' (sur fond sombre)
 * `to` pour un lien interne, `href` pour un lien externe (ouvert dans un nouvel onglet).
 */
export default function Bouton({ to, href, variante = 'principal', fleche = true, className = '', children, ...props }) {
  const classes = `bouton bouton--${variante} ${className}`
  const contenu = (
    <>
      <span className="bouton__texte">{children}</span>
      {fleche && <Fleche />}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {contenu}
      </Link>
    )
  }
  if (href) {
    const externe = /^https?:/.test(href)
    return (
      <a href={href} className={classes} {...(externe ? { target: '_blank', rel: 'noreferrer' } : {})} {...props}>
        {contenu}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {contenu}
    </button>
  )
}
