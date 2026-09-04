# germanriveros.cl

Business website for a web **administration, maintenance, optimization, and
accessibility** service — built with Astro.

This is not a from-scratch web development portfolio. The positioning is
deliberate: the target audience already has a website (WordPress, Magento, or
another platform) and needs someone to keep it running, updated, secure, fast,
and accessible. Every piece of copy on the site is written against that
premise.

## Live site

**https://germanriveros.cl**

## Screenshot

![Hero section of germanriveros.cl](docs/screenshots/hero-german-riveros.jpg)

## Tech stack

* **Astro 7** — static output, zero client-side JS by default
* **Vanilla CSS** — no framework; design tokens are literal hex values
  documented inline (see `src/styles/global.css`)
* **TypeScript** — via Astro's `strict` tsconfig, type-checking component
  frontmatter (no dedicated `.ts` application code yet)
* **Vanilla Three.js** — used directly, without React or
  `@react-three/fiber`/`drei`, specifically to avoid adding a second UI
  framework for one decorative element on a site that also promotes
  performance as a service. See "The hero's 3D element" below.
* **GitHub Actions → GitHub Pages**, custom domain via Cloudflare
* **`@astrojs/partytown`** and **`@astrojs/sitemap`** — see "Analytics,
  tracking & SEO" below

## Design principles

Accessibility and performance aren't described as generic bullet points —
they're enforced in the code, with the reasoning documented inline:

* Every interactive component has `:focus-visible` styles that mirror
  `:hover`, so keyboard users get the same information mouse users do.
* `prefers-reduced-motion` is respected across animated elements, including
  the hero's 3D icosahedron (falls back to a static frame).
* Color pairs are validated against WCAG AA (4.5:1 for body text) rather than
  chosen by eye — this caught a real bug during development (a decorative
  label at 35% opacity that read fine on the site's dark background but
  failed contrast, and separately became invisible when reused on a light
  background for the logo).
* Mobile tap targets meet the 44px minimum on primary CTAs.

Brand voice, tone, and visual language are documented in `docs/BRAND.md` /
`docs/BRAND_ES.md` and `docs/WEB_STYLE_GUIDE_germanriveros_v1.0.md`.

## Analytics, tracking & SEO

Installed with the same performance discipline as the rest of the project —
nothing here should cost main-thread time it doesn't have to:

* **Google Tag Manager** — loaded via `@astrojs/partytown`, so the GTM loader
  and any tag it fires run in a web worker instead of blocking the main
  thread. The container snippet lives in `src/pages/index.astro`
  (`<script type="text/partytown">` in `<head>`, plus the `<noscript>`
  fallback right after `<body>`, which stays outside Partytown on purpose
  since it has to work without JS).
* **Google Analytics 4** — not a separate hardcoded `gtag.js` script. It's
  configured as a GA4 Configuration tag *inside* the GTM container (trigger:
  All Pages), so future tags (Google Ads, LinkedIn Insight Tag, etc.) can be
  added from the GTM UI without another deploy.
* **Google Search Console** — verified at the domain level via a DNS TXT
  record on Cloudflare, which covers http/https and www/non-www in a single
  property instead of verifying each variant separately.
* **Sitemap** — generated at build time by `@astrojs/sitemap` as
  `sitemap-index.xml` → `sitemap-0.xml`, referenced from `public/robots.txt`.
* **`llms.txt`** — a plain-Markdown summary of the site's services and
  sections for AI agents, following Jeremy Howard's proposed convention.
  Honest caveat: as of mid-2026, Google Search Central explicitly excludes it
  from Search ranking and AI Overviews. It's here because some AI products
  (Claude, coding assistants) do use it during retrieval — a forward-looking
  addition, not an SEO tactic.

Relevant `astro.config.mjs` excerpt:

```js
integrations: [
  partytown({
    config: {
      forward: ["dataLayer.push", "gtag"],
    },
  }),
  sitemap(),
],
```

## The hero's 3D element

The wireframe icosahedron in the hero is rendered with **vanilla Three.js**
(`src/scripts/hero-icosaedro.js`), not the React/`@react-three/fiber` version
used for prototyping in the
[`experimentos-threejs`](https://github.com/german-rs/experimentos-threejs)
repo. That was a deliberate trade-off, not an oversight: this project has no
other React dependency, and pulling in React + fiber + drei for one
decorative shape would work against the site's own performance positioning.

It's desktop-only (hidden below 761px, where there's no layout space for it
anyway), transparent-background so it composites into the existing ambient
glow, and respects `prefers-reduced-motion`.

**Known trade-off:** even as vanilla Three.js, the bundle currently trips
Vite's 500kB chunk-size warning on build. Not yet addressed — a reasonable
next step is code-splitting so it's only loaded when the hero is in view.

## Project structure

```text
src/
├── components/
│   ├── Hero/
│   │   └── Hero.astro
│   ├── Work/
│   │   ├── Work.astro
│   │   └── WorkCard.astro   
│   ├── Services/
│   │   ├── Services.astro
│   │   └── ServiceCard.astro
│   ├── About/
│   │   └── About.astro
│   └── Contact/
│       └── Contact.astro
├── pages/
│   └── index.astro
├── scripts/
│   └── hero-icosaedro.js
└── styles/
    ├── global.css
    ├── Hero.css
    ├── Work.css
    ├── Services.css
    ├── About.css
    └── Contact.css

public/
├── favicon.svg
├── favicon.ico
├── robots.txt
├── llms.txt
└── images/
    └── germanriveros.cl.jpg

docs/
├── BRAND.md
├── BRAND_ES.md
├── ARCHITECTURE.md                        
├── WEB_STYLE_GUIDE_germanriveros_v1.0.md
└── screenshots/
    └── hero-german-riveros.jpg

.github/
└── workflows/
    └── deploy.yml
```

## Development

Clone the repository:

```bash
git clone https://github.com/german-rs/portafolio.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production — **run this before pushing**, not just `dev`. The dev
server doesn't catch case-sensitive import errors that only surface on
Linux-based CI (this has happened before: a `@import` referenced `work.css`
while the real file was `Work.css`, which builds fine on macOS/Windows but
fails on GitHub Actions):

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

Deployed automatically via **GitHub Actions** (`.github/workflows/deploy.yml`)
to **GitHub Pages**, served through **Cloudflare** on a custom domain. Every
push to `main` triggers a new build and deploy.

## Status / honest roadmap

* [x] Hero section — copy, contrast-checked palette, 3D icosahedron
* [x] Work section — project list, accessible card pattern, live-status indicator
* [x] Favicon / logo 
* [x] Services section — administration, optimization, technical SEO, and
      accessibility offerings
* [X] About section — built
* [x] Contact section — availability status, response-time facts, contact
      links
* [x] Google Tag Manager — installed via Partytown, zero main-thread cost
* [x] Google Analytics 4 — configured as a tag inside GTM
* [x] Google Search Console — verified via DNS (Cloudflare), sitemap submitted
* [x] Sitemap (`@astrojs/sitemap`) and `robots.txt`
* [x] `llms.txt`
* [x] `docs/ARCHITECTURE.md`
* [ ] Custom GA4 conversion events (contact CTA click, per-platform tag clicks)
* [ ] Code-splitting for the Three.js bundle (500kB build warning)
* [ ] Blog

## License

MIT