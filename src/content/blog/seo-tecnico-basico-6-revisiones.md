---
title: "SEO técnico básico: 6 revisiones para que Google entienda tu sitio"
description: "Seis revisiones de SEO técnico para que Google encuentre y entienda tu sitio: indexación, Search Console, sitemap, canonical y datos estructurados."
pubDate: 2026-10-21
tags: ["SEO", "Search Console", "Datos estructurados"]
draft: false
cover: "../../assets/blog/seo-tecnico-basico.jpg"
coverAlt: "Lupa sobre una ventana de navegador con un fragmento de código, junto a un mapa de nodos conectados y un icono de ubicación, sobre un icosaedro de líneas azules en fondo oscuro"
---

Puedes tener el mejor contenido del mundo y que nadie lo encuentre por un detalle técnico: una opción mal marcada, un archivo que bloquea a Google o una página que los buscadores no logran interpretar. Eso es lo que resuelve el SEO técnico: asegurarse de que los buscadores puedan **encontrar**, **leer** y **entender** tu sitio.

No garantiza posiciones por sí solo, porque el contenido y la reputación de tu sitio también pesan. Pero es la base: sin ella, lo demás rinde menos.

Estas seis revisiones puedes hacerlas sin ser desarrollador. Te dicen si lo básico está en orden.

## 1. Verifica que Google pueda indexar tu sitio

Antes de optimizar nada, confirma que tu sitio aparece en Google. Busca `site:tudominio.cl` y revisa cuántas páginas aparecen y si son las que esperas.

Si no aparece nada, o aparecen páginas que no corresponden, revisa:

- **En WordPress:** en *Ajustes → Lectura*, que la opción "Disuadir a los motores de búsqueda de indexar este sitio" esté **desmarcada**. Es muy común que quede activada desde la etapa de desarrollo y nadie la desactive al publicar.
- **En otras plataformas:** si tienes etiquetas `noindex` en páginas que sí deberían aparecer, o configuraciones equivalentes de visibilidad en buscadores.

## 2. Conecta Search Console y revisa sus informes

Google Search Console es gratuito y es la fuente de verdad sobre cómo ve Google tu sitio. Si todavía no lo tienes, verifica tu dominio y revisa tres informes:

- **Páginas (indexación):** qué páginas están indexadas y cuáles no, con el motivo. No todas las no indexadas son un problema, pero conviene entender por qué.
- **Rendimiento:** con qué búsquedas aparece tu sitio y qué páginas reciben clics. Aquí detectas oportunidades reales.
- **Experiencia y mejoras:** errores de usabilidad móvil, Core Web Vitals y datos estructurados.

Revísalo una vez al mes. Es una de las revisiones del [checklist mensual de mantenimiento](/blog/checklist-mantenimiento-wordpress/).

## 3. Revisa tu sitemap y tu robots.txt

Son dos archivos pequeños con mucho impacto:

- **Sitemap (`/sitemap.xml` o `/sitemap_index.xml`):** una lista de las páginas que quieres que Google conozca. Ábrelo en el navegador y confirma que existe, que incluye tus páginas importantes y que no lista páginas eliminadas o que redirigen. Luego envíalo en Search Console, en la sección Sitemaps.
- **`robots.txt` (`tudominio.cl/robots.txt`):** indica a los buscadores qué partes del sitio pueden recorrer. Busca una línea como `Disallow: /` aplicada a todo el sitio: bloquearía la totalidad de tu contenido. Revisa también que no esté bloqueando carpetas necesarias para mostrar la página correctamente.

Un error en estos archivos puede ocultar tu sitio entero, y es de las cosas que más rápido se corrigen una vez detectadas.

## 4. Mira los títulos y las descripciones

Cada página debe tener su propio **título** (`title`) y una **meta descripción**. Son lo que ves en los resultados de Google antes de hacer clic.

Qué revisar:

- Que no haya títulos duplicados ni genéricos como "Inicio" o "Sin título".
- Que el título describa la página y, cuando tenga sentido, incluya lo que la persona buscaría, por ejemplo "Mantención de sitios WordPress en Santiago".
- Que la meta descripción resuma la página en una o dos frases claras y con una invitación a entrar.

Un detalle honesto: la meta descripción no mejora directamente tu posición, pero un texto bien escrito aumenta la cantidad de personas que hacen clic en tu resultado, y eso sí importa.

Revisa además que cada página tenga un único encabezado principal (`H1`) y que los subtítulos (`H2`, `H3`) sigan un orden lógico. Esto ayuda tanto a los buscadores como a quienes usan lector de pantalla, algo que vimos en las [5 revisiones rápidas de accesibilidad](/blog/accesibilidad-web-5-revisiones-rapidas/).

## 5. Evita contenido duplicado con la etiqueta canonical

Muchas veces la misma página es accesible desde varias direcciones: con y sin `www`, con `http` y `https`, con parámetros de seguimiento al final o con filtros en una tienda. Para Google son direcciones distintas con contenido casi idéntico, y eso diluye tu posicionamiento.

La solución es la etiqueta **canonical**, que le indica cuál es la versión preferida de cada página. Revisa que:

- Todas las versiones del sitio redirijan a una sola (por ejemplo, siempre `https://` y siempre con o sin `www`).
- Cada página tenga su canonical apuntando a sí misma o a la versión original.
- Las páginas eliminadas redirijan con un código 301 a una equivalente, en lugar de mostrar un error 404 sin salida.

En tiendas con muchos filtros y variantes de producto, como las construidas sobre Magento o WooCommerce, este punto suele ser uno de los más importantes.

## 6. Agrega datos estructurados

Los datos estructurados son un fragmento de código, normalmente en formato JSON-LD, que le explica a Google **qué es** cada cosa en tu página: un negocio local, un producto, un artículo, una pregunta frecuente. Gracias a esto, tus resultados pueden mostrar información adicional, como valoraciones, precios o horarios.

Para una pyme, los tipos más útiles suelen ser:

- **Organization o LocalBusiness:** nombre, dirección, teléfono, horarios y redes sociales.
- **Product:** precio, disponibilidad y valoraciones, si tienes tienda.
- **Article:** para las entradas de tu blog.
- **FAQPage:** para preguntas frecuentes visibles en la página.

Para comprobar que están bien implementados, usa la **Prueba de resultados enriquecidos** de Google: pegas la dirección de tu página y te indica qué datos detecta y si hay errores. Los plugins de SEO más usados en WordPress generan buena parte de esto automáticamente, pero conviene verificar que el resultado sea correcto y no esté duplicado.

## Un límite honesto del SEO técnico

Corregir estos puntos elimina obstáculos, pero no reemplaza lo demás: contenido útil, enlaces de otros sitios que te mencionen y una buena experiencia de usuario. Y los cambios en buscadores no son inmediatos: pueden pasar semanas hasta que Google reprocese tu sitio.

Por eso el SEO técnico funciona mejor como una rutina de cuidado, no como una tarea de una sola vez. Y se complementa con lo que ya revisamos: un sitio [rápido y estable](/blog/sitio-lento-5-causas-core-web-vitals/) y accesible suele posicionarse mejor.

## ¿Y si no sabes qué está bloqueando a tu sitio?

Detectar estos problemas es sencillo cuando sabes dónde mirar, pero interpretarlos y corregirlos sin afectar lo que ya funciona requiere experiencia. Si prefieres que alguien lo haga por ti, ese es justamente mi trabajo: reviso tu sitio, te explico en lenguaje claro qué encontré y qué conviene corregir primero, ya sea que uses WordPress, Magento u otra plataforma.

Cuéntame qué plataforma usas y qué te preocupa, y te respondo con un diagnóstico claro.