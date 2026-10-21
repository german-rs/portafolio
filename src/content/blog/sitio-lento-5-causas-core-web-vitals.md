---
title: "Mi sitio está lento: 5 causas comunes y cómo detectarlas"
description: "Qué miden realmente LCP, INP y CLS, cómo medirlos gratis y qué corregir primero para que tu sitio cargue rápido en el celular."
pubDate: 2026-10-21
tags: ["Rendimiento", "Core Web Vitals", "SEO"]
draft: false
cover: "../../assets/blog/sitio-lento-core-web-vitals.jpg"
coverAlt: "Velocímetro con la aguja en zona verde junto a un cronómetro y una ventana de navegador que carga, sobre un icosaedro de líneas azules en fondo oscuro"
---

Cuando un sitio tarda en cargar, la mayoría de las personas no espera a que termine: se va. Y si ese sitio es tu tienda, tu formulario de contacto o tu página de reservas, cada segundo de demora es una venta o una consulta que no llega.

La velocidad también influye en cómo te encuentran. Google usa los llamados Core Web Vitals como parte de su evaluación de la experiencia de usuario, y gran parte de tus visitas probablemente llega desde el celular, con una conexión que no siempre es buena.

Esta guía te ayuda a medir cómo está tu sitio, entender qué te dicen los números y saber por dónde empezar a corregir. No necesitas ser desarrollador para hacer el diagnóstico.

## Qué son los Core Web Vitals, sin tecnicismos

Son tres mediciones que intentan reflejar cómo se siente usar tu sitio:

- **LCP (Largest Contentful Paint):** cuánto tarda en aparecer el contenido principal de la página, normalmente una imagen grande o un título. Es la sensación de "ya cargó". Lo recomendable es que ocurra en menos de 2,5 segundos.
- **INP (Interaction to Next Paint):** cuánto demora el sitio en responder cuando tocas un botón, abres un menú o escribes en un formulario. Si el sitio se siente "pegado", este indicador está mal. Lo recomendable es que sea menor a 200 milisegundos.
- **CLS (Cumulative Layout Shift):** cuánto se mueve el contenido mientras carga. Es esa molestia de ir a tocar un botón y que justo cambie de lugar porque cargó una imagen o un anuncio. Lo recomendable es mantenerlo bajo 0,1.

Estos umbrales los define Google y pueden ajustarse con el tiempo, así que conviene confirmarlos en [web.dev](https://web.dev/vitals/) cuando hagas tu revisión.

## Cómo medir tu sitio gratis

1. **PageSpeed Insights.** Ingresa la dirección de tu sitio y revisa primero los resultados en móvil. Muestra datos de laboratorio y, si tu sitio tiene suficientes visitas, también datos reales de usuarios.
2. **Search Console.** En el informe de Core Web Vitals verás qué páginas de tu sitio están en estado bueno, "necesita mejorar" o deficiente, agrupadas por tipo de problema.
3. **Tu propio celular.** Abre tu sitio con datos móviles, no con wifi, y fíjate en qué momento puedes realmente leer y usar la página. Ninguna herramienta reemplaza esa prueba.

Mide al menos tres páginas distintas: la principal, una interna y la más importante para tu negocio (por ejemplo, una ficha de producto o la página de contacto). Rara vez todas rinden igual.

## Las 5 causas más comunes de un sitio lento

### 1. Imágenes sin optimizar

Es la causa número uno. Una foto de 4 MB subida directamente desde el celular o desde una cámara puede ser mil veces más pesada de lo necesario.

Qué revisar:

- Que las imágenes estén en formatos modernos como WebP o AVIF.
- Que el tamaño sea acorde a donde se muestran: no tiene sentido cargar una imagen de 4000 píxeles de ancho para un recuadro de 400.
- Que las imágenes que están más abajo en la página se carguen de forma diferida (lazy loading), pero **no** la imagen principal de la parte superior, porque eso empeora el LCP.

### 2. Demasiados plugins, módulos o scripts

Cada extensión que instalas suele agregar su propio código, que el navegador debe descargar y ejecutar. Esto pasa en WordPress, pero también en Magento, PrestaShop, Joomla y otras plataformas.

Qué revisar:

- Plugins o módulos que ya no usas: desactívalos y elimínalos.
- Funciones duplicadas, como dos plugins de caché, dos de SEO o dos de formularios.
- Sliders, animaciones y constructores visuales pesados que se cargan en todas las páginas aunque solo se usen en una.

### 3. Falta de caché

Sin caché, el servidor reconstruye la página desde cero con cada visita. Con caché, entrega una versión ya preparada, mucho más rápida.

Qué revisar:

- Si tu plataforma tiene caché de página activada y bien configurada.
- Si el hosting ofrece caché a nivel de servidor.
- Que, después de configurarla, el formulario de contacto, el carrito y las zonas privadas sigan funcionando correctamente. Una caché mal configurada puede romper lo que más importa.

### 4. Hosting insuficiente

A veces el problema no es el sitio, sino el lugar donde vive. Un plan compartido muy básico, con el servidor saturado o ubicado lejos de tus visitantes, puede hacer lento incluso un sitio bien construido.

Cómo notarlo: si las páginas tardan en empezar a responder (el navegador queda "esperando" antes de mostrar algo) y no mejoran por más que optimices imágenes y plugins, vale la pena revisar el plan de hosting, la versión de PHP y si cuentas con una red de distribución de contenido (CDN).

### 5. Fuentes y scripts de terceros

Cada servicio externo que incorporas suma peticiones y tiempo de carga: Google Fonts, píxeles de seguimiento, chat en vivo, mapas incrustados, videos de YouTube, botones de redes sociales.

Qué revisar:

- Cuántas familias y pesos de tipografía cargas realmente. Menos es más.
- Si todos los scripts de seguimiento siguen siendo necesarios o quedaron de campañas antiguas.
- Si los videos y mapas pueden cargarse solo cuando la persona interactúa con ellos, en lugar de al abrir la página.

## Qué corregir primero

No todo vale el mismo esfuerzo. Un orden razonable, de mayor a menor impacto para la mayoría de los sitios:

1. Optimizar las imágenes más pesadas, sobre todo la principal de cada página.
2. Eliminar plugins, módulos y scripts que no usas.
3. Activar o revisar la caché.
4. Reducir las fuentes y los scripts de terceros.
5. Evaluar el hosting si, tras lo anterior, la respuesta del servidor sigue siendo lenta.

Cambia una cosa a la vez y mide de nuevo. Así sabes qué funcionó y evitas romper algo sin darte cuenta.

## Un límite honesto de las mediciones

El puntaje de PageSpeed Insights, ese número de 0 a 100, es una guía, no un objetivo en sí mismo. Se calcula en condiciones simuladas y puede variar de una medición a otra. Lo que realmente importa es la experiencia de las personas que usan tu sitio, que se refleja mejor en los datos reales de Search Console y en tu propia prueba desde el celular.

Tampoco conviene perseguir el 100 a cualquier costo: a veces sacrificar una función útil para ganar cinco puntos no vale la pena. Busca estar en la zona "buena" de los tres indicadores y que el sitio se sienta rápido.

## Rendimiento y accesibilidad van de la mano

Un sitio liviano y estable también es más fácil de usar para quien tiene una conexión limitada, un equipo antiguo o necesita navegar con tecnologías de apoyo. Si quieres complementar esta revisión, puedes seguir con las [5 revisiones rápidas de accesibilidad](/blog/accesibilidad-web-5-revisiones-rapidas/). Y si aún no tienes una rutina de cuidado, el [checklist mensual de mantenimiento para WordPress](/blog/checklist-mantenimiento-wordpress/) incluye una revisión de rendimiento que puedes repetir cada mes.

## ¿Y si no sabes por dónde empezar?

Medir es sencillo; interpretar los resultados y corregirlos sin romper nada requiere experiencia. Si prefieres que alguien lo haga por ti, ese es justamente mi trabajo: reviso tu sitio, te explico en lenguaje claro qué lo está frenando y qué conviene corregir primero, ya sea que uses WordPress, Magento u otra plataforma.

Cuéntame qué plataforma usas y qué te preocupa, y te respondo con un diagnóstico claro.