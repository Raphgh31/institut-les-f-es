import { createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react'

// Teinte de fond partagée : chaque section peut demander sa teinte quand elle
// passe au milieu de l'écran, et le fond du site glisse doucement vers elle.
export const TonContext = createContext({ ton: 'ivoire', setTon: () => {} })

export function FondTonalProvider({ children }) {
  const [ton, setTon] = useState('ivoire')
  return <TonContext.Provider value={{ ton, setTon }}>{children}</TonContext.Provider>
}

const TONS = ['nude', 'poudre']

export function FondTonal() {
  const { ton } = useContext(TonContext)
  useEffect(() => {
    document.documentElement.dataset.ton = ton
  }, [ton])
  return (
    <div className="fond-tonal" aria-hidden="true">
      {TONS.map((t) => (
        <span key={t} className={`fond-tonal__${t} ${ton === t ? 'est-actif' : ''}`} />
      ))}
    </div>
  )
}

const Section = forwardRef(function Section({ as: Comp = 'section', ton, className = '', children, ...props }, refExterne) {
  const refInterne = useRef(null)
  const ref = refExterne ?? refInterne
  const { setTon } = useContext(TonContext)

  useEffect(() => {
    if (!ton || !ref.current) return undefined
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setTon(ton), {
      rootMargin: '-50% 0px -50% 0px',
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ton, setTon, ref])

  return (
    <Comp ref={ref} className={`section ${className}`} {...props}>
      {children}
    </Comp>
  )
})

export default Section
