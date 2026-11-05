type ArtProps = { className?: string }

export function Botanical({ className = '' }: ArtProps) {
  return <svg className={className} viewBox="0 0 240 360" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.05" strokeLinecap="round">
      <path d="M116 348C108 277 132 245 120 187S101 78 144 18M121 222C76 205 46 178 31 135M120 191C161 159 184 134 198 91M119 269C163 250 186 225 212 198M112 122C77 108 60 82 52 58" />
      {[[138,42,-20],[119,89,15],[115,142,-20],[122,196,5],[120,248,-15],[171,130,40],[191,100,35],[69,184,-55],[39,151,-40],[177,230,50],[200,208,45],[74,92,-45]].map(([x,y,r],i)=><g key={i} transform={'translate('+x+' '+y+') rotate('+r+')'}>
        <path d="M0 16C-30 4-31-22-15-34C-3-26 3-8 0 16ZM0 16C22-4 26-27 14-38C1-27-5-8 0 16Z" />
        <path d="M-15-31L0 16L14-34" opacity=".55"/>
      </g>)}
    </g>
  </svg>
}

export function Villa({ className = '' }: ArtProps) {
  return <svg className={className} viewBox="0 0 700 530" fill="none" aria-hidden="true">
    <defs>
      <pattern id="roofLines" width="10" height="6" patternUnits="userSpaceOnUse"><path d="M0 5h10M5 0v5" stroke="currentColor" strokeWidth=".45" opacity=".4"/></pattern>
    </defs>
    <g stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M20 323Q84 206 139 235Q226 121 293 179Q354 105 418 174Q461 154 514 226Q580 202 680 310" opacity=".2"/>
      <path d="M17 340Q117 299 203 318M497 315q124-25 186 20M28 414q313 28 645 0M77 429q271 31 545 3" opacity=".5"/>
      <g fill="currentColor" fillOpacity=".035">
        <path d="M151 283h399v131H151z"/><path d="M222 224h256v190H222z"/>
        <path d="M198 226l152-74 153 74z" fill="url(#roofLines)"/>
        <path d="M130 284l54-46h38v46M478 238h35l60 46z" fill="url(#roofLines)"/>
        <path d="M223 230h255M211 222h278M151 290h72M478 290h71"/>
        <path d="M325 155v-23h51v30M319 132h64M340 144h20"/>
        <path d="M313 414v-78a37 37 0 0 1 74 0v78M320 414v-78a30 30 0 0 1 60 0v78M350 306v108"/>
        <path d="M238 414v-62a25 25 0 0 1 50 0v62M413 414v-62a25 25 0 0 1 50 0v62"/>
        <path d="M245 414v-62a18 18 0 0 1 36 0v62M420 414v-62a18 18 0 0 1 36 0v62"/>
        <path d="M165 405v-62a19 19 0 0 1 38 0v62zM496 405v-62a19 19 0 0 1 38 0v62z"/>
        <path d="M248 262a15 15 0 0 1 30 0v29h-30zM335 262a15 15 0 0 1 30 0v29h-30zM422 262a15 15 0 0 1 30 0v29h-30z"/>
        <path d="M263 249v42M350 249v42M437 249v42M248 271h30M335 271h30M422 271h30"/>
        <path d="M219 303h262M219 307h262M219 314h262M228 314v100M296 314v100M404 314v100M474 314v100"/>
        <path d="M227 416h247l15 10H213zM212 429h279l16 9H195M194 441h314l18 9H176"/>
        <path d="M287 450q-21 26-63 51M411 450q24 27 66 51M254 481h192M232 497h234"/>
      </g>
      {[88,119,581,615].map((x,i)=><g key={x} transform={'translate('+x+' '+(i%2?15:0)+')'}>
        <path d="M0 397V216M-2 219C-8 237-23 262-17 278C-32 292-21 308-24 322C-32 345-14 373 0 378C18 372 29 347 23 327C31 312 25 293 17 282C22 260 6 233-2 219Z" fill="currentColor" fillOpacity=".06"/>
        <path d="M-7 272l7 20 9-32M-14 309l14 13 16-22M-14 345l14 9 18-17" opacity=".5"/>
      </g>)}
      <path d="M134 401q-11-28 9-31q6-29 27-8q17-13 25 10M484 394q-12-24 7-31q18-20 31 1q24-8 22 25" fill="currentColor" fillOpacity=".04"/>
      <path d="M151 405q-30-11-43 2M550 406q24-12 46 1M54 413h80M559 414h90M150 415H91M561 419h51" opacity=".5"/>
      <circle cx="535" cy="139" r="27" opacity=".28"/>
      <path d="M305 104q8-8 16 0q8-8 16 0M394 93q5-5 10 0q5-5 10 0" opacity=".4"/>
      <path d="M83 458q46-13 90-5M529 452q46-7 87 9M118 478q22-6 44-3M535 481h41" opacity=".35"/>
    </g>
  </svg>
}

export function Icon({ name, className = '' }: { name: 'arrow' | 'rings' | 'glass' | 'dinner' | 'music' | 'close' | 'calendar' | 'pin' | 'heart'; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M4 12h16M13 5l7 7-7 7"/></>,
    rings: <><circle cx="9" cy="14" r="6"/><circle cx="16" cy="14" r="6"/><path d="M7 6l2-3 2 3M14 6l2-3 2 3"/></>,
    glass: <><path d="M6 3h12l-1 8a5 5 0 0 1-10 0L6 3ZM12 16v6M8 22h8M7 8h10"/></>,
    dinner: <><path d="M5 2v7a3 3 0 0 0 6 0V2M8 2v20M17 2v10h4V2M21 12v10"/></>,
    music: <><path d="M10 18V5l11-3v14M10 9l11-3"/><ellipse cx="6" cy="19" rx="4" ry="3"/><ellipse cx="17" cy="17" rx="4" ry="3"/></>,
    close: <path d="M5 5l14 14M19 5L5 19"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M7 2v6M17 2v6M3 11h18M8 15h2M14 15h2"/></>,
    pin: <><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    heart: <path d="M12 21S2 14 2 8a5 5 0 0 1 10-1A5 5 0 0 1 22 8c0 6-10 13-10 13Z"/>,
  }
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

