# Nepal Trek Agency

A production-quality demo website for **Nepal Trek Agency** — a Kathmandu-based
Himalayan trekking company (est. 2010). Built to radiate trust, adventure and
refined "mountain luxury."

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom Himalayan green + amber design system)
- **Three.js** via `@react-three/fiber` + `@react-three/drei` (hero scene + interactive globe)
- **Framer Motion** (page transitions, scroll reveals, micro-interactions)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — 3D hero, animated stats, featured treks, interactive 3D region globe, why-us, testimonials, gallery teaser, CTA |
| `/treks` | All 12 treks with live filtering (region / difficulty / duration / price) |
| `/treks/[slug]` | Trek detail — itinerary accordion, SVG elevation chart, includes/excludes, departures, gallery, related treks, sticky booking bar |
| `/gallery` | Filterable masonry gallery with full keyboard-navigable lightbox |
| `/reviews` | Rating stats, filterable reviews, full validated "Share Your Experience" form with interactive star picker |
| `/about` | Story, milestone timeline, flip-card guide team, certifications |
| `/contact` | Inquiry form, contact info, embedded map, FAQ accordion |
| `*` | Custom 404 ("You've gone off trail…") |

## Design system

Colours, fonts and motion tokens live in `tailwind.config.ts` and
`app/globals.css`. Fonts: Playfair Display (display), DM Serif Display
(headings), Lato (body), Montserrat (UI labels).

## Structure

```
app/                 routes + layout + globals
components/
  layout/            Navbar, Footer
  sections/          home-page sections
  3d/                HeroScene, TrekGlobe (dynamic, ssr:false)
  ui/                reusable widgets (cards, lightbox, star rating, animated backgrounds…)
  treks/ gallery/ reviews/ about/ contact/   page-specific components
data/                treks, reviews, gallery content
```

## Notes

- Every section carries a low-opacity animated trekking motif
  (`<AnimatedBackground variant="…" />`): mountains, snow, prayer flags,
  contours, footprints, compass, pines, clouds, eagles, trekking poles.
- 3D scenes are dynamically imported with SSR disabled and graceful loading
  fallbacks, so they never block first paint or the build.
- All form submissions and social links are demo-only (no backend).
- Images are loaded from Unsplash; configured in `next.config.mjs`.
