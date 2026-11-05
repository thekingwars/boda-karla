import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Botanical } from './Illustrations'

export function InvitationCover({ onOpen }: { onOpen: () => void }) {
  const cover = useRef<HTMLElement>(null)
  const [opening, setOpening] = useState(false)
  const { contextSafe } = useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.cover-intro > *', { y: 18, autoAlpha: 0, stagger: .14, duration: 1.1, ease: 'power2.out' })
      gsap.from('.envelope', { y: 60, rotation: -4, autoAlpha: 0, duration: 1.5, ease: 'power3.out', delay: .2 })
      gsap.from('.cover-bottom', { autoAlpha: 0, duration: 1, delay: .9 })
      gsap.to('.seal-halo', { scale: 1.18, autoAlpha: 0, duration: 2.6, repeat: -1, ease: 'power1.out' })
    })
    return () => media.revert()
  }, { scope: cover })
  const open = () => {
    if (opening) return
    setOpening(true)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onOpen(); return }
    gsap.timeline({ defaults: { ease: 'power2.inOut' }, onComplete: onOpen })
      .to('.seal', { y: 22, rotation: 12, scale: .85, autoAlpha: 0, duration: .45 })
      .to('.envelope-flap', { rotationX: 178, duration: .85, transformOrigin: '50% 0%' }, '-=.1')
      .to('.envelope-letter', { yPercent: -50, duration: 1 }, '-=.25')
      .to('.envelope', { y: 80, scale: 1.06, duration: .9 }, '<')
      .to('.cover-intro, .cover-bottom', { autoAlpha: 0, duration: .35 }, '<')
  }
  return <section className="invitation-cover paper" ref={cover} aria-label="Abre tu invitación">
    <div className="cover-border" aria-hidden="true"/>
    <span className="cover-edition eyebrow">Una historia, un sí, para siempre</span>
    <div className="cover-intro"><p className="eyebrow">Con todo nuestro amor</p><h1>Estás invitado a<br/><em>nuestro para siempre.</em></h1></div>
    <div className="envelope">
      <div className="envelope-back"/>
      <div className="envelope-letter"><span className="script">Karla & María</span><span className="eyebrow">20 · 03 · 2027</span></div>
      <div className="envelope-front"><Botanical className="envelope-botanical"/></div>
      <div className="envelope-flap"/>
      <button className="seal" type="button" aria-label="Abrir invitación de Karla y María" onClick={() => contextSafe(open)()} disabled={opening}>
        <span className="seal-halo"/><span className="seal-edge"/><span className="seal-monogram">K<span>&</span>M</span>
      </button>
      <span className="envelope-caption">PARA TI, CON CARIÑO</span>
    </div>
    <div className="cover-bottom"><span className="fine-line"/><p>{opening ? 'Comienza nuestra historia…' : 'Toca el sello para abrir'}</p><span className="cover-date">KARLA & MARÍA · 20 MARZO 2027</span></div>
    <Botanical className="cover-leaves left"/><Botanical className="cover-leaves right"/>
  </section>
}

