import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Botanical, Icon, Villa } from './components/Illustrations'
import { InvitationCover } from './components/InvitationCover'
import { RsvpDialog } from './components/RsvpDialog'
import { downloadCalendar, wedding } from './wedding'
import './App.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Countdown() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer) }, [])
  const seconds = Math.max(0, Math.floor((new Date(wedding.date).getTime() - now) / 1000))
  const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60]
  return <div className="countdown" aria-label="Tiempo restante para la boda">
    {values.map((value, i) => <div className="countdown-unit" key={i}><span className="countdown-number">{String(value).padStart(2, '0')}</span><span className="eyebrow">{['Días', 'Horas', 'Minutos', 'Segundos'][i]}</span></div>)}
  </div>
}

const itinerary = [
  { time: '4:00 PM', title: 'El sí, quiero', description: 'La ceremonia en el jardín', icon: 'rings' as const },
  { time: '5:00 PM', title: 'Un brindis por amor', description: 'Cócteles, abrazos y atardecer', icon: 'glass' as const },
  { time: '7:00 PM', title: 'A la mesa', description: 'Sabores para compartir', icon: 'dinner' as const },
  { time: '8:30 PM', title: 'Hasta que amanezca', description: 'La pista es toda nuestra', icon: 'music' as const },
]

function App() {
  const root = useRef<HTMLDivElement>(null)
  const main = useRef<HTMLElement>(null)
  const [opened, setOpened] = useState(false)
  const [coverOn, setCoverOn] = useState(true)
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [animations, setAnimations] = useState(true)
  useEffect(() => {
    if (coverOn) {
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = previous }
    }
    main.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [coverOn])

  useGSAP(() => {
    if (!opened || !animations) return
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } })
        .from('.site-header', { y: -20, autoAlpha: 0 })
        .from('.hero-copy .eyebrow, .hero-name, .hero-copy .hero-description, .hero-date, .hero-copy .text-link', { y: 35, autoAlpha: 0, stagger: .13 }, .15)
        .from('.hero-art', { y: 50, autoAlpha: 0, rotation: 3, duration: 1.8 }, .3)
        .from('.hero-foot', { autoAlpha: 0 }, .8)
      gsap.utils.toArray<HTMLElement>('[data-reveal]', root.current).forEach(element => {
        gsap.from(element, { y: 32, autoAlpha: 0, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 91%', once: true } })
      })
      gsap.utils.toArray<HTMLElement>('.parallax-photo', root.current).forEach(element => {
        gsap.fromTo(element, { yPercent: -5, scale: 1.13 }, { yPercent: 5, scale: 1.13, ease: 'none', scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } })
      })
      gsap.from('.itinerary-progress', { scaleX: 0, transformOrigin: 'left', ease: 'none', scrollTrigger: { trigger: '.itinerary', start: 'top 75%', end: 'center 40%', scrub: 1 } })
      gsap.from('.event-item', { y: 24, autoAlpha: 0, stagger: .18, duration: .8, scrollTrigger: { trigger: '.event-grid', start: 'top 85%', once: true } })
      gsap.to('.story-botanical', { rotation: 9, y: -28, ease: 'none', scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: 1.5 } })
      gsap.to('.hero-art-inner', { y: -45, ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.5 } })
      gsap.to('.reading-progress', { scaleX: 1, transformOrigin: 'left', ease: 'none', scrollTrigger: { trigger: main.current, start: 'top top', end: 'bottom bottom', scrub: .3 } })
      const art = root.current?.querySelector<SVGSVGElement>('.venue-villa')
      art?.querySelectorAll<SVGPathElement>('path').forEach(path => {
        const length = path.getTotalLength()
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 2.8, ease: 'power1.inOut', scrollTrigger: { trigger: art, start: 'top 85%', once: true } })
      })
    })
    const controller = new AbortController()
    document.fonts.ready.then(() => { if (!controller.signal.aborted) ScrollTrigger.refresh() })
    return () => { controller.abort(); media.revert() }
  }, { scope: root, dependencies: [opened, animations], revertOnUpdate: true })

  return <div className={opened ? 'wedding-app is-open' : 'wedding-app'} ref={root}>
    {coverOn && <InvitationCover onOpen={() => { setOpened(true); setCoverOn(false) }}/>}
    <main ref={main} id="invitacion" tabIndex={-1} inert={!opened} className="paper">
      <div className="reading-progress" aria-hidden="true"/>
      <header className="site-header">
        <a href="#inicio" className="monogram" aria-label="Karla y Andrés, inicio">K<span>&</span>A</a>
        <nav aria-label="Navegación principal"><a href="#historia">Nuestra historia</a><a href="#celebracion">El gran día</a><a href="#detalles">Los detalles</a></nav>
        <button className="header-rsvp" onClick={() => setRsvpOpen(true)}>Confirmar asistencia <Icon name="arrow"/></button>
      </header>

      <section className="hero-section section-shell" id="inicio" aria-labelledby="couple-names">
        <div className="hero-copy">
          <p className="eyebrow"><span className="tiny-star">✧</span> ¡Nos casamos!</p>
          <h1 id="couple-names"><span className="hero-name">Karla</span><span className="hero-name second-name"><span className="ampersand">&</span> Andrés</span></h1>
          <p className="hero-description">Hay encuentros que lo cambian todo.<br/>Y personas con las que el «para siempre»<br/>se siente como el lugar al que volver.</p>
          <div className="hero-date"><span>SÁBADO</span><strong>20 <i>/</i> 03 <i>/</i> 27</strong><span>CARACAS, VENEZUELA</span></div>
          <a href="#celebracion" className="text-link">Acompáñanos a celebrar <Icon name="arrow"/></a>
        </div>
        <div className="hero-art">
          <div className="hero-art-inner">
            <div className="art-arch"><span className="arch-caption eyebrow">Donde comienza nuestro siempre</span><Villa/><span className="art-venue">La Arboleda</span><span className="art-location eyebrow">EL HATILLO · CARACAS</span></div>
            <div className="date-stamp"><span className="script">Save</span><span className="eyebrow">OUR DATE</span><span>20.03.27</span></div>
            <Botanical className="hero-botanical"/>
          </div>
        </div>
        <div className="hero-foot"><span>Junto a nuestras familias, te esperamos.</span><a href="#historia" aria-label="Descubrir nuestra historia"><span>DESLIZA Y DESCUBRE</span><span className="scroll-arrow">↓</span></a><span className="hero-foot-number">01 — UNA NUEVA HISTORIA</span></div>
      </section>

      <section className="story section-shell" id="historia" aria-labelledby="story-title">
        <div className="story-photos" data-reveal><div className="photo-frame"><img className="parallax-photo" src="/images/couple.jpg" alt="Una pareja celebrando su boda al aire libre" loading="lazy" width="1000" height="1300" onLoad={() => ScrollTrigger.refresh()}/><span className="photo-caption script">Mi lugar favorito eres tú.</span></div><span className="photo-index eyebrow">DOS PERSONAS · UNA MISMA DIRECCIÓN</span></div>
        <div className="story-copy"><p className="eyebrow" data-reveal>01 / Nuestra historia</p><h2 id="story-title" data-reveal>De todas las<br/>casualidades,<br/><em>tú eres la más bonita.</em></h2><p data-reveal>Lo que comenzó con una conversación se convirtió en nuestro lugar favorito. Entre viajes, domingos sin prisa y mil pequeños momentos, descubrimos que la vida sabe mejor juntos.</p><p data-reveal>Hoy queremos escribir el siguiente capítulo rodeados de las personas que forman parte de nuestra historia. Y tú estás en ella.</p><span className="story-signature script" data-reveal>Karla & Andrés</span></div>
        <Botanical className="story-botanical"/>
      </section>

      <section className="countdown-section" aria-labelledby="countdown-title"><p className="eyebrow" data-reveal>El comienzo de algo infinito</p><h2 id="countdown-title" data-reveal>Cada vez más cerca del <em>sí.</em></h2><div data-reveal><Countdown/></div><button className="text-link" onClick={downloadCalendar} data-reveal><Icon name="calendar"/> Guardar la fecha <Icon name="arrow"/></button></section>

      <section className="celebration section-shell" id="celebracion" aria-labelledby="celebration-title">
        <div className="section-intro" data-reveal><p className="eyebrow">02 / El gran día</p><h2 id="celebration-title">Un lugar para recordar.<br/><em>Un día para sentir.</em></h2><p>Una tarde de marzo, un jardín y todas nuestras personas favoritas.</p></div>
        <div className="venue-layout">
          <div className="venue-photo" data-reveal><img className="parallax-photo" src="/images/celebration.jpg" alt="Una mesa de boda decorada con flores y copas" loading="lazy" width="1200" height="800" onLoad={() => ScrollTrigger.refresh()}/><span className="venue-photo-label eyebrow">EL ESCENARIO DE NUESTRO SÍ</span></div>
          <div className="venue-info" data-reveal><Villa className="venue-villa"/><p className="eyebrow">Ceremonia & celebración</p><h3>La Arboleda</h3><p>El Hatillo, Caracas<br/>Sábado, 20 de marzo de 2027 · 4:00 p. m.</p><p className="venue-note">Entre árboles, luz de atardecer y mucho amor.</p><a className="text-link" href={wedding.mapsUrl} target="_blank" rel="noreferrer"><Icon name="pin"/> Explorar la zona <Icon name="arrow"/></a></div>
        </div>
      </section>

      <section className="itinerary" aria-labelledby="itinerary-title"><div className="section-shell">
        <p className="eyebrow" data-reveal>Así se vivirá nuestra celebración</p><h2 id="itinerary-title" data-reveal>Un día. <em>Mil recuerdos.</em></h2>
        <div className="event-grid"><div className="itinerary-track" aria-hidden="true"><div className="itinerary-progress"/></div>{itinerary.map(item => <div className="event-item" key={item.title}><Icon name={item.icon}/><span className="event-dot"/><span className="event-time eyebrow">{item.time}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
        <p className="itinerary-ending script" data-reveal>Y que la noche nos encuentre bailando.</p>
      </div></section>

      <section className="details section-shell" id="detalles" aria-labelledby="details-title">
        <div className="details-heading" data-reveal><p className="eyebrow">03 / Los pequeños detalles</p><h2 id="details-title">Todo está pensado<br/><em>para disfrutar.</em></h2><Botanical className="details-botanical"/></div>
        <div className="detail-list" data-reveal>
          <details open onToggle={() => ScrollTrigger.refresh()}><summary><span>01</span> Código de vestimenta <b aria-hidden="true">+</b></summary><div><p>Formal, con un toque de ti.</p><p>Trajes y vestidos para una noche especial. La ceremonia será en el jardín: elige zapatos cómodos. Reservamos el blanco para la novia.</p><div className="color-palette" aria-label="Inspiración de colores: azul noche, verde oliva, rosa antiguo y terracota"><i/><i/><i/><i/><span>Un poco de inspiración</span></div></div></details>
          <details onToggle={() => ScrollTrigger.refresh()}><summary><span>02</span> El mejor regalo <b aria-hidden="true">+</b></summary><div><p>Tu presencia es nuestro regalo favorito.</p><p>Compartir este día contigo es lo que más ilusión nos hace. No necesitas traer nada más que tus ganas de celebrar.</p></div></details>
          <details onToggle={() => ScrollTrigger.refresh()}><summary><span>03</span> Una noche para nosotros <b aria-hidden="true">+</b></summary><div><p>Una celebración solo para adultos.</p><p>Queremos que puedas relajarte, brindar y bailar sin mirar el reloj. Gracias por organizarte para acompañarnos.</p></div></details>
          <details onToggle={() => ScrollTrigger.refresh()}><summary><span>04</span> Llegada y transporte <b aria-hidden="true">+</b></summary><div><p>Te recomendamos llegar a las 3:30 p. m.</p><p>Así tendrás tiempo para disfrutar del jardín antes de la ceremonia. La dirección exacta y los detalles de transporte se compartirán con los invitados.</p></div></details>
        </div>
      </section>

      <section className="rsvp-section" id="confirmacion" aria-labelledby="rsvp-heading">
        <Botanical className="rsvp-botanical left"/><Botanical className="rsvp-botanical right"/>
        <div className="rsvp-content"><p className="eyebrow" data-reveal>Nos falta lo más importante: tú</p><h2 id="rsvp-heading" data-reveal>Esta historia es más bonita<br/><em>si la celebramos contigo.</em></h2><p data-reveal>Guárdanos un abrazo y un baile.<br/>Confirma tu asistencia antes del 1 de marzo.</p><button className="button dark" onClick={() => setRsvpOpen(true)} data-reveal>Sí, quiero acompañarlos <Icon name="arrow"/></button><span className="rsvp-signature script" data-reveal>Con amor, K & A</span></div>
      </section>
      <footer className="site-footer"><a href="#inicio" className="monogram" aria-label="Volver al inicio">K<span>&</span>A</a><p>20 MARZO 2027 <span>·</span> EL COMIENZO DE NUESTRO SIEMPRE</p><span className="demo-footer">Invitación de muestra · Nombres, lugares y fecha ilustrativos</span><span className="photo-credit">Fotografías de <a href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a></span></footer>
      <button className="motion-toggle" type="button" aria-pressed={!animations} aria-label={animations ? 'Pausar animaciones decorativas' : 'Activar animaciones decorativas'} title={animations ? 'Pausar animaciones' : 'Activar animaciones'} onClick={() => setAnimations(v => !v)}>{animations ? <span aria-hidden="true">Ⅱ</span> : <span aria-hidden="true">▷</span>}</button>
    </main>
    {rsvpOpen && <RsvpDialog onClose={() => setRsvpOpen(false)}/>}
  </div>
}

export default App
