import { useEffect, useRef, useState } from 'react'
import type { SubmitEvent } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Icon } from './Illustrations'

export function RsvpDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [attendance, setAttendance] = useState('yes')
  const [response, setResponse] = useState<{ name: string; attending: boolean } | null>(null)
  useEffect(() => {
    if (response) dialog.current?.querySelector<HTMLElement>('.rsvp-success')?.focus()
  }, [response])
  useEffect(() => {
    const element = dialog.current
    element?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { element?.close(); document.body.style.overflow = previous }
  }, [])
  useGSAP(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.from(dialog.current, { y: 25, opacity: 0, duration: .5, ease: 'power2.out' })
    }
  }, { scope: dialog })
  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    if (!name) { event.currentTarget.querySelector<HTMLInputElement>('[name="name"]')?.focus(); return }
    setResponse({ name, attending: attendance === 'yes' })
  }
  return <dialog ref={dialog} className="rsvp-dialog paper" onCancel={onClose} aria-labelledby="rsvp-title">
    <button className="dialog-close" type="button" aria-label="Cerrar confirmación" onClick={onClose}><Icon name="close"/></button>
    {response ? <div className="rsvp-success" role="status" tabIndex={-1}>
      <Icon name="heart"/><p className="eyebrow">Gracias por responder</p>
      <h2 id="rsvp-title">{response.attending ? '¡Nos vemos en la pista!' : 'Te llevamos en el corazón.'}</h2>
      <p>{response.name}, {response.attending ? 'qué alegría contar contigo en esta historia.' : 'gracias por acompañarnos de corazón, aunque sea a la distancia.'}</p>
      <p className="demo-note">Esto es una demostración. No se ha enviado ni guardado tu respuesta.</p>
      <button className="button dark" onClick={onClose}>Volver a la invitación <Icon name="arrow"/></button>
    </div> : <>
      <p className="eyebrow">Nos haría muy felices</p><h2 id="rsvp-title">¿Nos acompañas?</h2>
      <p className="dialog-description">Confirma antes del 1 de marzo de 2027.</p>
      <form onSubmit={submit}>
        <label htmlFor="guest-name">Tu nombre completo</label><input id="guest-name" name="name" autoComplete="name" required maxLength={100} placeholder="Escribe tu nombre"/>
        <fieldset><legend>¿Podrás venir?</legend><div className="attendance-options">
          <label><input type="radio" name="attendance" value="yes" checked={attendance === 'yes'} onChange={()=>setAttendance('yes')}/><span>¡Sí, allí estaré!</span></label>
          <label><input type="radio" name="attendance" value="no" checked={attendance === 'no'} onChange={()=>setAttendance('no')}/><span>No podré asistir</span></label>
        </div></fieldset>
        {attendance === 'yes' && <><label htmlFor="guest-count">Personas que asistirán</label><select id="guest-count" name="guests"><option value="1">Solo yo</option><option value="2">Yo y mi acompañante</option></select>
        <label htmlFor="guest-song">Una canción que no puede faltar <span>(opcional)</span></label><input id="guest-song" name="song" maxLength={150} placeholder="Esa que te hace salir a bailar…"/></>}
        <label htmlFor="guest-message">Unas palabras para nosotros <span>(opcional)</span></label><textarea id="guest-message" name="message" rows={2} maxLength={500} placeholder="Con mucho cariño…"/>
        <p className="demo-note">Formulario de muestra: tu respuesta no se envía ni se guarda.</p>
        <button className="button dark" type="submit">Confirmar respuesta <Icon name="arrow"/></button>
      </form>
    </>}
  </dialog>
}

