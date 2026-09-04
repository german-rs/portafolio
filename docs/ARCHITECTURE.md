# Architecture

This describes how the code is actually organized today — one page, five
section components, no framework beyond Astro and vanilla Three.js. If a
claim here stops matching the code, trust the code and fix this file.

## Rendering model

Astro 7, static output (`output: "static"`, the default). The build produces
plain HTML/CSS with zero client-side JS, except for two deliberate
exceptions:

1. The hero's Three.js icosahedron (`src/scripts/hero-icosaedro.js`).
2. Google Tag Manager, loaded through `@astrojs/partytown` into a web worker
   — see "Analytics, tracking & SEO" in the README for why and how.

Everything else — layout, content, styling — ships as static markup.

## Page composition

There is exactly one route: `src/pages/index.astro`. It owns the document
shell (`<html>`, `<head>`, header, footer) and composes the five section
components in order:

```
Hero → Work → Services → About → Contact
```

There is no `Layout.astro` yet. With a single page, the shell lives directly
in `index.astro`. The moment a second page is added (a case-study page, a
blog post), that shell needs to be extracted into a real layout component —
don't duplicate the `<head>` into a second file.

## Component pattern

Each section under `src/components/<Section>/` follows the same shape:

* `<Section>.astro` — owns the section's content as an inline array/object in
  its frontmatter, and the section-level markup (eyebrow label, heading,
  sidebar label, grid).
* For sections with repeated items (Work, Services), a `<Item>Card.astro`
  renders one item and is looped over from the parent.

There is no CMS and no Astro content collection. Content is TypeScript
literals inside the component frontmatter — adding a project to Work or a
service to Services means editing the array in `Work.astro` / `Services.astro`
directly, not touching a data file elsewhere.

### Type sharing between section and card

`Work.astro` / `WorkCard.astro` share one type: `WorkCard.astro` exports the
`Props` interface, and `Work.astro` imports it back under an alias:

```ts
// WorkCard.astro
export interface Props { number: string; title: string; /* ... */ }

// Work.astro
import WorkCard, { type Props as Project } from "./WorkCard.astro";
const projects: Project[] = [ /* ... */ ];
```

One type, defined once, so the project list and the card can't silently
drift apart.

**Known inconsistency:** `ServiceCard.astro` does not follow this pattern —
it declares its own `interface Props` locally instead of exporting it, and
`Services.astro` doesn't import a shared type at all. Same idea, less
discipline. Worth aligning `ServiceCard` to the `WorkCard` pattern next time
either file is touched.

## Styling

Plain CSS, BEM naming (`.block__element--modifier`) throughout — this is the
actual namespacing mechanism, since nothing here uses CSS Modules or
scoped styles. `src/styles/global.css` is the single stylesheet entry point,
imported once from `index.astro`. It `@import`s every section stylesheet:

```css
@import "./Hero.css";
@import "./Work.css";
@import "./Services.css";
@import "./About.css";
@import "./Contact.css";
```

Design tokens (colors, spacing) are literal values inline in `global.css`,
not extracted into CSS custom properties yet. Shared UI classes like
`.button`, `.button-primary`, and `.button-secondary` also live in
`global.css`, since they're reused across sections (Hero and Contact CTAs,
for example).

**Known inconsistency:** `Hero.astro`, `Services.astro`, `About.astro`, and
`Contact.astro` each *also* `import "../../styles/<Section>.css"` directly
in their own frontmatter, on top of the `@import` already in `global.css`.
`Work.astro` does not — it relies solely on the `global.css` chain. In
practice this doesn't ship duplicate CSS (Vite dedupes the resolved module),
but it's an inconsistent, redundant pattern in the source: pick one
mechanism (probably the direct per-component import, since it keeps a
component and its styles next to each other) and apply it everywhere,
including Work.

## Accessibility, enforced per section

Not a separate layer — baked into every section component:

* `:focus-visible` styles mirror `:hover` so keyboard users get the same
  affordance cues as mouse users.
* `prefers-reduced-motion` is respected wherever something animates.
* `aria-labelledby` ties each `<section>` to its heading; purely decorative
  elements (the hero's 3D canvas wrapper, sidebar labels) are `aria-hidden`.
* Color pairs are checked against WCAG AA (4.5:1 body text) by hand, not by
  eye — this caught a real bug during development (see README).
* Primary CTAs meet the 44px minimum mobile tap target.

## The Three.js exception

`hero-icosaedro.js` is imported from a `<script>` tag inside `Hero.astro`
(Astro bundles this as a regular module script, deduplicated across the
page). It's guarded twice at runtime:

* `window.matchMedia("(min-width: 761px)")` — skips initialization entirely
  below 761px, since the mobile layout has no room for it anyway.
* `prefers-reduced-motion` — renders a single static frame instead of
  starting the `requestAnimationFrame` loop.

**Known gap:** there's no `dispose()` call on the renderer/geometry and no
`removeEventListener` for the `resize` handler. Harmless today — this is a
single static page with no client-side routing, so a full page load tears
everything down anyway — but it would need to be addressed before this
pattern is reused on a page that persists across client-side navigation
(e.g. if Astro View Transitions are ever adopted).

## Build & deploy

`.github/workflows/deploy.yml` runs `withastro/action@v6`, which installs
from `package-lock.json`. That means: a manual edit to `package.json` alone
is not enough — run `npm install` locally so the lockfile stays in sync,
commit both files, or CI's install step can fail.

Pipeline: push to `main` → GitHub Actions builds with `withastro/action@v6`
→ deploys to GitHub Pages → served through Cloudflare on the custom domain.

Also worth remembering day-to-day: `npm run dev` doesn't catch case-sensitive
import mismatches. Those only surface in `npm run build` (and therefore in
CI, since Linux is case-sensitive and macOS/Windows usually aren't). Always
run `npm run build` locally before pushing.

## Known architectural debt (honest list)

* `ServiceCard.astro`'s `Props` interface isn't exported/shared, unlike
  `WorkCard.astro`.
* Four of five section components redundantly import their own CSS file on
  top of the `global.css` `@import` chain; `Work.astro` is the outlier that
  doesn't.
* No `Layout.astro` — fine for one page, a blocker the moment a second page
  is added.
* No cleanup (`dispose`, `removeEventListener`) in `hero-icosaedro.js`.
* The Three.js bundle still trips Vite's 500kB chunk-size warning on build
  (tracked in the README roadmap; code-splitting so it only loads when the
  hero is in view is the likely fix).