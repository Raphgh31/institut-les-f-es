// Petite légende posée sur une photo, pour désigner un détail réel du lieu.
export default function Annotation({ x, y, children, cote = 'droite' }) {
  return (
    <span className={`annotation annotation--${cote}`} style={{ '--x': x, '--y': y }}>
      <span className="annotation__point" aria-hidden="true" />
      <span className="annotation__texte">{children}</span>
    </span>
  )
}
