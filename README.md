# Karla & María — Wedding Invitation Demo

A responsive wedding invitation built with React, TypeScript, Vite, GSAP, and @gsap/react.

## Run locally

```bash
npm install
npm run dev
```

## Verify and build

```bash
npm run lint
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Included

- Interactive paper envelope and wax seal with a GSAP opening timeline.
- Responsive invitation, custom botanical and venue SVG illustrations, and local photographs.
- ScrollTrigger reveals, photograph parallax, illustrated line drawing, timeline progression, and a reading progress indicator.
- Live countdown, downloadable calendar event, venue area link, and expandable event details.
- Accessible RSVP dialog with attendance choices, guest count, song request, validation, and a confirmation screen.
- Reduced-motion support, an animation pause control, and cleanup through `useGSAP`.
- Locally hosted fonts and images.

## Personalization

- `src/wedding.ts`: example event data and calendar file generation.
- `src/App.tsx`: names, invitation copy, date labels, itinerary, and event details.
- `src/components/InvitationCover.tsx`: envelope, seal, and opening sequence.
- `src/components/Illustrations.tsx`: original SVG artwork and icons.
- `src/components/RsvpDialog.tsx`: RSVP interaction.
- `src/App.css` and `src/index.css`: layout, colors, typography, and responsive styles.
- `public/images/` and `public/fonts/`: locally hosted assets.

When changing the event, update the visible copy, countdown date, calendar UTC timestamps, and metadata together. The demo uses March 20, 2027 at 4:00 p.m. in Caracas (UTC−04:00).

## Demo boundaries

Names, story, venue, and date are illustrative. The map opens the general El Hatillo area, not a verified event address. The RSVP form runs entirely in memory: it does not send or store responses. Connect an authorized backend before using it for real guests.

## Design references and assets

- Envelope-opening inspiration: https://www.instagram.com/p/DdHG2GxA_ax/
- Fonts from Google Fonts: Cormorant Garamond, Manrope, and Pinyon Script.
- Couple photo: https://images.unsplash.com/photo-1519741497674-611481863552
- Reception photo: https://images.unsplash.com/photo-1519225421980-715cb0215aed
- Botanical, venue, seal, and icon artwork created for this demo.
# boda-karla
