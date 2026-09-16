# Plan de Implementación — Blog de germanriveros.cl

**Versión:** 1.0
**Fecha:** 15 de septiembre de 2026
**Proyecto:** germanriveros.cl
**Estado:** Borrador — pendiente de decisiones abiertas (sección 7)
**Responsable:** Germán Riveros

---

## 1. Propósito

Este documento establece el plan de implementación del blog de germanriveros.cl: estrategia de contenido, arquitectura técnica en Astro, integración con el sistema de diseño existente y roadmap por fases.

Como el resto de la documentación del proyecto, es un **documento vivo**: se actualiza a medida que se resuelven las decisiones abiertas y se completa cada fase.

---

## 2. Contexto y justificación

- El blog es el único ítem sin marcar en el roadmap del `README.md` (`[ ] Blog`).
- Conecta directamente con los valores de marca definidos en `BRAND.md` / `BRAND_ES.md`: **📚 Aprendizaje continuo** y **🤝 Transparencia** ("compartir conocimiento").
- Es la primera funcionalidad que introduce una segunda dimensión de páginas real, más allá del one-pager actual — con implicancias técnicas directas (ver sección 4.1).

---

## 3. Audiencia y estrategia de contenido

### 3.1 Principio editorial

El blog debe reforzar el posicionamiento del sitio: **administración y mantención de sitios existentes**, no desarrollo desde cero. Se evita contenido tipo "cómo crear un sitio web" — atrae al público equivocado.

### 3.2 Categorías propuestas

1. **Mantención y seguridad** — señales de alerta, buenas prácticas de actualización
2. **Performance / Core Web Vitals** — casos con métricas reales, antes/después
3. **Accesibilidad** — diferenciador principal del negocio: LSCh, guías prácticas WCAG
4. **SEO técnico** — contenido corto y accionable para dueños de pyme
5. **Casos de estudio** — extensión de la sección Work, siguiendo la estructura ya definida en `WEB_STYLE_GUIDE_germanriveros_v1.0.md` (sección 25): problema → contexto → solución → resultado → tecnología

### 3.3 Ejemplos de primeros posts

- "5 señales de que tu WordPress necesita mantención urgente"
- "Qué es Core Web Vitals y por qué le importa a tu negocio en Chile"
- "Accesibilidad web: por qué LSCh no es un plugin, es un compromiso"
- "Cómo elegir entre reconstruir o mantener tu sitio Magento"
- Caso de estudio: mantención de Tharpa Chile

### 3.4 Decisión abierta

¿El blog es exclusivamente para clientes/pymes (tono comercial-técnico), o se mezcla con contenido pedagógico dado el perfil docente de Germán?

**Recomendación:** mantenerlo separado de profegerman.cl — audiencias distintas (pyme/cliente vs. alfabetización digital).

---

## 4. Arquitectura técnica (Astro 7)

### 4.1 Paso 0 — Extraer `BaseLayout.astro`

`ARCHITECTURE.md` ya señala que no existe `Layout.astro` y que es "un bloqueante en cuanto se agregue una segunda página". El blog es esa segunda página, así que este paso deja de ser opcional.

Contenido a extraer: `<head>`, header y footer, hoy duplicados entre `index.astro` y `404.astro`. Parametrizable vía props: título, descripción, OG image, bloque JSON-LD.

### 4.2 Content Collections

```
src/content/blog/
  mantencion-wordpress-senales.md
src/content.config.ts
```

Schema (Zod): `title`, `description`, `pubDate`, `updatedDate`, `tags`, `category`, `draft`, `ogImage`.

Markdown simple para empezar; MDX solo si se necesitan componentes interactivos dentro de un post.

### 4.3 Rutas

- `/blog` — listado, componente `BlogCard.astro`
- `/blog/[slug].astro` — post individual vía `getStaticPaths()`

### 4.4 SEO

- `@astrojs/sitemap` indexa las rutas nuevas automáticamente, sin configuración adicional.
- JSON-LD `BlogPosting` por post, mismo patrón que el JSON-LD ya existente en `index.astro`.
- RSS vía `@astrojs/rss`.
- OG image por post — evaluar reutilizar la lógica de generación del icosaedro usada en el OG card de home.

---

## 5. Integración con el sistema de diseño

- El teal (`#67c6c0`) permanece reservado para estados "activo/disponible" — no se usa como acento decorativo en tarjetas de blog.
- Tipografía monoespaciada (SFMono) para metadata: fecha, categoría, tiempo de lectura.
- `BlogCard.astro` sigue el patrón de `WorkCard.astro` / `ServiceCard.astro`: carpeta propia en `src/components/`, CSS propio en `src/styles/`, `export interface Props`.
- Reglas nuevas para el cuerpo de un post (no existen hoy en ningún componente):
  - `max-width` ~65–75ch para lectura larga
  - Jerarquía de encabezados: un solo `<h1>` por post
  - Bloques de código con contraste AA si se publica contenido técnico
- **Decisión abierta:** ¿el blog vive como sección adicional del one-pager (teaser de 3 posts en home, como Work, con link a `/blog`) o como área completamente separada?

  **Recomendación:** teaser en home + `/blog` como experiencia de lectura propia.

---

## 6. Roadmap por fases

**Fase 1 — Fundación**
- [ ] `BaseLayout.astro`
- [ ] Schema de content collection
- [ ] `/blog` (índice)
- [ ] `/blog/[slug]`

**Fase 2 — SEO y distribución**
- [ ] JSON-LD `BlogPosting` por post
- [ ] RSS feed
- [ ] OG image por post

**Fase 3 — Refinamiento**
- [ ] Teaser en home
- [ ] Tags / categorías
- [ ] Posts relacionados

---

## 7. Decisiones pendientes

1. **Audiencia:** ¿comercial/técnico puro o mezcla con contenido pedagógico?
2. **Ubicación:** ¿teaser en home + `/blog` separado, o `/blog` completamente aislado del one-pager?
3. **Formato:** Markdown simple vs. MDX desde el inicio.

---

## 8. Estado del documento

Documento vivo — actualizar a medida que se resuelvan las decisiones pendientes y se complete cada fase, siguiendo el mismo principio de evolución que `WEB_STYLE_GUIDE_germanriveros_v1.0.md`.