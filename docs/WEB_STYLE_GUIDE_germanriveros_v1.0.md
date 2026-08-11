# WEB STYLE GUIDE — germanriveros.cl

**Versión:** 1.0  
**Fecha:** 11 de agosto de 2026  
**Proyecto:** germanriveros.cl  
**Estado:** MVP / Base evolutiva  
**Responsable:** Germán Riveros

---

## 1. Propósito

Este documento establece la primera guía de estilo visual y comunicacional para **germanriveros.cl**.

Su objetivo no es crear un sistema de diseño definitivo, sino proporcionar una base suficientemente sólida para comenzar inmediatamente el desarrollo del sitio y mantener una experiencia visual coherente.

La guía debe entenderse como un **documento vivo**:

```text
WEB_STYLE_GUIDE v1.0
        ↓
       MVP
        ↓
    Uso real
        ↓
    Aprendizaje
        ↓
WEB_STYLE_GUIDE v1.x
        ↓
     Evolución
```

Las decisiones futuras pueden modificar, ampliar o reemplazar cualquier elemento de esta versión.

---

# 2. Contexto estratégico

germanriveros.cl no debe presentarse únicamente como un portafolio tecnológico.

El sitio debe funcionar progresivamente como:

- portafolio profesional;
- demostración técnica y visual;
- vitrina comercial;
- presentación de servicios;
- espacio para casos de estudio;
- punto de contacto;
- base para futuras soluciones y productos reutilizables.

El modelo de negocio contempla cuatro líneas principales:

1. **Desarrollo Web**
2. **Gestión Web**
3. **Mantenimiento y Soporte**
4. **Evolución y Mejoras**

La comunicación visual debe apoyar esta propuesta y no competir con ella.

---

# 3. Principio rector

> **Build with purpose. Learn continuously. Share knowledge.**

La identidad debe expresar:

### Build with purpose.

Construir soluciones que respondan a problemas reales.

### Learn continuously.

Mostrar una identidad profesional asociada al aprendizaje y la evolución tecnológica.

### Share knowledge.

Comunicar conocimiento de manera clara y útil para clientes y comunidad.

---

# 4. Dirección visual

## 4.1 Concepto

La dirección visual de v1.0 será:

> **Editorial + tecnológica + minimalista.**

No se busca una estética de "startup SaaS", una web excesivamente futurista ni un portafolio de programador cargado de efectos.

La intención es transmitir:

- profesionalidad;
- claridad;
- precisión;
- tecnología;
- humanidad;
- confianza;
- evolución.

## 4.2 Cinco atributos

La experiencia visual debe sentirse:

**Clara · Técnica · Humana · Precisa · Evolutiva**

## 4.3 Lo que debe evitar

La interfaz no debe sentirse:

- genérica;
- ruidosa;
- excesivamente corporativa;
- artificial;
- sobrecargada;
- dependiente de tendencias;
- excesivamente "tech";
- llena de animaciones sin propósito.

---

# 5. Principio de diseño

La jerarquía fundamental será:

```text
PROBLEMA DEL CLIENTE
        ↓
      SERVICIO
        ↓
     SOLUCIÓN
        ↓
     RESULTADO
        ↓
    TECNOLOGÍA
```

La tecnología demuestra capacidad, pero no debe convertirse en el mensaje principal.

El sitio debe comunicar primero **qué problema se resuelve** y después explicar **cómo se construye**.

---

# 6. Paleta de color — v1.0

Esta paleta es una **propuesta inicial de implementación**, no una decisión definitiva de marca.

## 6.1 Colores principales

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#2563EB` | Acciones principales, enlaces y elementos destacados |
| `--color-primary-hover` | `#1D4ED8` | Hover de elementos primarios |
| `--color-accent` | `#14B8A6` | Acentos puntuales |
| `--color-bg` | `#F8FAFC` | Fondo principal claro |
| `--color-surface` | `#FFFFFF` | Cards, bloques y superficies |
| `--color-text` | `#0F172A` | Texto principal |
| `--color-text-secondary` | `#475569` | Texto secundario |
| `--color-text-muted` | `#64748B` | Metadatos y texto auxiliar |
| `--color-border` | `#E2E8F0` | Bordes y divisores |

## 6.2 Feedback

| Token | Valor | Uso |
|---|---|---|
| `--color-success` | `#15803D` | Éxito |
| `--color-warning` | `#A16207` | Advertencias |
| `--color-error` | `#B91C1C` | Errores |
| `--color-info` | `#0369A1` | Información |

Los colores de feedback no deben utilizarse como decoración.

## 6.3 Regla de uso

El azul primario debe utilizarse para orientar la acción.

El teal/acento debe utilizarse con moderación.

La mayor parte de la interfaz debe permanecer en una base neutra.

---

# 7. Tipografía — v1.0

## 7.1 Tipografía principal

**Inter** será la tipografía principal propuesta para la interfaz.

Fallback:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

Prioridad:

1. legibilidad;
2. claridad;
3. rendimiento;
4. personalidad.

## 7.2 Tipografía técnica

Para código y elementos estrictamente técnicos:

```css
font-family:
  "JetBrains Mono",
  "SFMono-Regular",
  Consolas,
  "Liberation Mono",
  monospace;
```

No utilizar la tipografía monoespaciada para párrafos normales.

---

# 8. Escala tipográfica

| Nivel | Desktop | Mobile | Uso |
|---|---:|---:|---|
| Display | `clamp(2.75rem, 7vw, 5rem)` | fluido | Hero principal |
| H1 | `clamp(2.25rem, 5vw, 3.75rem)` | fluido | Título de página |
| H2 | `clamp(1.875rem, 4vw, 2.75rem)` | fluido | Secciones |
| H3 | `clamp(1.5rem, 3vw, 2rem)` | fluido | Subsecciones |
| H4 | `1.25rem` | `1.125rem` | Componentes |
| Body Large | `1.125rem` | `1.0625rem` | Introducciones |
| Body | `1rem` | `1rem` | Texto principal |
| Small | `0.875rem` | `0.875rem` | Información secundaria |
| Caption | `0.75rem` | `0.75rem` | Metadatos |
| Code | `0.875rem` | `0.8125rem` | Código |

## 8.1 Pesos

- `400` — regular
- `500` — medium
- `600` — semibold
- `700` — bold

## 8.2 Line-height

- headings: `1.1–1.2`;
- body: `1.5–1.7`;
- elementos pequeños: `1.4–1.5`.

---

# 9. Espaciado

Escala inicial:

```text
4
8
12
16
24
32
48
64
80
96
128
```

Tokens:

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-20: 5rem;
--space-24: 6rem;
--space-32: 8rem;
```

---

# 10. Container y layout

## Container

```css
--container-max: 72rem;
```

## Padding horizontal

```text
Mobile   → 1rem
Tablet   → 1.5rem
Desktop  → 2rem
```

## Grid

- 1 columna en mobile;
- 2 columnas cuando el contenido lo justifique;
- 3 columnas para grupos comparables.

No forzar columnas cuando el contenido funcione mejor como composición editorial.

---

# 11. Border radius

```css
--radius-sm: 0.375rem;
--radius-md: 0.625rem;
--radius-lg: 1rem;
--radius-xl: 1.5rem;
--radius-pill: 9999px;
```

Uso:

- `sm`: controles pequeños;
- `md`: botones y UI;
- `lg`: cards;
- `xl`: bloques destacados;
- `pill`: badges o elementos donde tenga sentido.

No utilizar `pill` para todo.

---

# 12. Sombras

La interfaz debe ser predominantemente plana.

```css
--shadow-sm:
  0 1px 2px rgb(15 23 42 / 0.06);

--shadow-md:
  0 8px 24px rgb(15 23 42 / 0.08);

--shadow-lg:
  0 16px 40px rgb(15 23 42 / 0.10);
```

Las sombras deben crear jerarquía, no decoración.

---

# 13. Botones

## Jerarquía MVP

1. Primary
2. Secondary
3. Text / Link

### Primary

Para:

- contacto;
- solicitudes;
- acciones principales.

### Secondary

Para acciones complementarias.

### Text / Link

Para navegación y acciones secundarias.

Todos deben tener estados:

```text
Default
Hover
Focus
Active
Disabled
```

El estado **Focus** es obligatorio.

---

# 14. Links

Los enlaces deben ser reconocibles como enlaces.

Evitar:

> "Haz clic aquí"

Preferir:

> "Ver proyecto"

> "Conocer el servicio"

> "Contactar"

---

# 15. Cards

Las cards se utilizarán cuando exista una agrupación lógica:

- proyecto;
- servicio;
- artículo;
- tecnología;
- experiencia.

No utilizar cards para dividir visualmente toda la página.

## Project Card

Prioridad:

1. imagen;
2. proyecto;
3. problema/contexto;
4. solución o resultado;
5. tecnologías, si son relevantes;
6. acción.

La tecnología no debe dominar visualmente.

---

# 16. Header

Estructura inicial:

```text
Identidad
   │
   ├── Proyectos
   ├── Servicios
   ├── Sobre mí
   └── Contacto
```

Mobile:

```text
Identidad + Menú
```

El Header prioriza navegación y claridad.

---

# 17. Footer

Debe contener:

- identidad;
- descripción breve;
- navegación;
- enlaces profesionales relevantes;
- contacto;
- copyright.

No debe convertirse en un segundo sitio dentro del sitio.

---

# 18. Imágenes

Las imágenes tienen especial importancia por el carácter visual del portafolio.

Principios:

- calidad suficiente;
- tamaño optimizado;
- proporciones coherentes;
- relevancia;
- `alt` apropiado;
- formatos adecuados;
- comportamiento responsive.

En proyectos visuales, la imagen puede ser protagonista.

---

# 19. Iconografía

La iconografía debe ser:

- simple;
- consistente;
- preferentemente SVG;
- funcional;
- accesible.

Evitar iconos puramente decorativos en exceso.

---

# 20. Motion

La animación será **funcional y progresiva**.

MVP:

- hover;
- focus;
- transiciones suaves;
- aparición discreta.

Posteriormente:

- SVG;
- transiciones de página;
- microinteracciones.

Respetar:

```css
@media (prefers-reduced-motion: reduce) {
  /* Reducir o eliminar animaciones no esenciales */
}
```

---

# 21. Responsive Design

El diseño será responsive desde el inicio.

### Mobile

Prioridad:

- lectura;
- navegación;
- interacción táctil;
- velocidad;
- contenido esencial.

### Tablet

Permitir expansión del grid y reorganización.

### Desktop

Permitir composiciones editoriales, grids e imágenes grandes.

No intentar reproducir exactamente desktop en mobile.

---

# 22. Accesibilidad

La accesibilidad es transversal.

## MVP obligatorio

- HTML semántico;
- navegación por teclado;
- focus visible;
- `alt` en imágenes informativas;
- formularios correctamente etiquetados;
- contraste suficiente;
- `prefers-reduced-motion`;
- jerarquía lógica de headings.

Ejemplo:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

según corresponda.

---

# 23. Contenido y voz

La comunicación debe ser:

- clara;
- directa;
- profesional;
- humana;
- comprensible;
- técnica cuando sea necesario.

Evitar:

- exceso de jerga;
- frases corporativas vacías;
- exageraciones;
- promesas absolutas;
- vender frameworks como producto.

Principio:

```text
Problema
   ↓
Solución
   ↓
Beneficio
   ↓
Tecnología
```

---

# 24. Presentación de servicios

Las cuatro líneas principales:

### Desarrollo Web

Construcción de sitios nuevos.

### Gestión Web

Administración de sitios o ecommerce existentes.

### Mantenimiento y Soporte

Continuidad técnica y operativa.

### Evolución y Mejoras

Nuevas necesidades, funcionalidades y optimización.

---

# 25. Presentación de proyectos

Cada proyecto debería comunicar:

```text
PROBLEMA
   ↓
CONTEXTO
   ↓
SOLUCIÓN
   ↓
RESULTADO
   ↓
TECNOLOGÍA
```

La tecnología es evidencia, no la historia completa.

---

# 26. Technical Signature

Pueden incorporarse discretamente:

- fragmentos de código;
- etiquetas técnicas;
- detalles monoespaciados;
- referencias a componentes;
- diagramas simples;
- metadatos técnicos.

Regla:

> **La tecnología debe aparecer como firma, no como ruido visual.**

No convertir el sitio en una terminal o dashboard.

---

# 27. Performance

El diseño debe considerar performance desde el comienzo.

Evitar:

- imágenes innecesariamente grandes;
- videos de fondo sin propósito;
- librerías visuales innecesarias;
- animaciones pesadas;
- JavaScript para interacciones que puedan resolverse con HTML/CSS.

Principio:

> **Enviar solamente lo que realmente aporta valor al usuario.**

---

# 28. Design Tokens iniciales

```css
:root {
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-accent: #14B8A6;

  --color-bg: #F8FAFC;
  --color-surface: #FFFFFF;

  --color-text: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #64748B;

  --color-border: #E2E8F0;

  --color-success: #15803D;
  --color-warning: #A16207;
  --color-error: #B91C1C;
  --color-info: #0369A1;

  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-pill: 9999px;

  --container-max: 72rem;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
}
```

Estos tokens son la base de implementación de v1.0 y pueden evolucionar.

---

# 29. Componentes MVP

Implementar inicialmente:

```text
Header
Footer
Container
Section
Button
Link
Card
ProjectCard
ServiceCard
CTA
```

Posteriormente, según necesidad real:

```text
Timeline
Experience
Badge
Tag
Form
Gallery
Modal
Tabs
Accordion
```

No incorporar componentes sin una necesidad concreta.

---

# 30. Arquitectura visual de Home

La Home MVP puede seguir:

```text
HEADER
   ↓
HERO
   ↓
SERVICIOS
   ↓
PROYECTOS DESTACADOS
   ↓
PROPUESTA DE VALOR
   ↓
SOBRE MÍ
   ↓
CTA
   ↓
FOOTER
```

El Hero debe responder rápidamente:

- quién eres;
- qué haces;
- para quién;
- cuál es el siguiente paso.

---

# 31. Do / Don't

## DO

- usar espacio negativo;
- mantener jerarquía clara;
- utilizar imágenes relevantes;
- priorizar contenido;
- mantener consistencia;
- animar con propósito;
- pensar en mobile;
- diseñar con accesibilidad;
- demostrar performance.

## DON'T

- saturar con colores;
- convertir todo en cards;
- animar todo;
- abusar de iconos;
- esconder la navegación;
- utilizar jerga técnica como argumento comercial;
- sacrificar accesibilidad por estética;
- sacrificar performance por efectos.

---

# 32. Prioridades

## P0 — MVP

```text
Color
Typography
Spacing
Container
Responsive
Header
Footer
Buttons
Links
Cards básicas
Accessibility
Content hierarchy
```

## P1 — Después del MVP

```text
Dark mode refinado
Gallery
Project cards avanzadas
Motion
SVG animations
Más variantes de componentes
```

## P2 — Evolución

```text
Design tokens avanzados
Sistema multi-sitio
Component library
Documentación interactiva
Temas reutilizables
```

---

# 33. Relación con Astro

La guía debe traducirse directamente a:

```text
WEB STYLE GUIDE
       ↓
DESIGN TOKENS
       ↓
GLOBAL CSS
       ↓
ASTRO COMPONENTS
       ↓
LAYOUTS
       ↓
PAGES
```

La arquitectura debe mantenerse simple durante el MVP.

La reutilización se extraerá a medida que aparezcan patrones reales.

---

# 34. Principio de evolución

Si una decisión deja de funcionar:

```text
Detectar
   ↓
Evaluar
   ↓
Modificar
   ↓
Documentar
   ↓
Aplicar
```

La documentación existe para facilitar la evolución, no para impedirla.

---

# 35. Criterio de éxito de v1.0

La guía es suficientemente buena cuando permite:

- comenzar a construir germanriveros.cl;
- mantener consistencia;
- crear componentes reutilizables;
- presentar claramente los servicios;
- mostrar proyectos;
- mantener una experiencia responsive;
- cumplir una base razonable de accesibilidad;
- mantener buen rendimiento;
- comunicar la propuesta de valor.

No necesita resolver todos los escenarios futuros.

---

# 36. Principio final

> **No diseñar para demostrar que sabemos diseñar. Diseñar para resolver.**

germanriveros.cl debe demostrar mediante su propio sitio los principios que ofrece a sus clientes:

**propósito + claridad + accesibilidad + performance + mantenibilidad + evolución.**

El sitio debe ser, en sí mismo, un caso de estudio de la forma de trabajo propuesta.

---

# 37. Estado del documento

**Versión:** 1.0  
**Estado:** Base inicial para MVP  
**Nivel de decisión:** Evolutivo  
**Próxima revisión:** Después de implementar y utilizar el MVP

> **Implementar primero. Observar después. Mejorar continuamente.**

**Build with purpose. Learn continuously. Share knowledge.**
