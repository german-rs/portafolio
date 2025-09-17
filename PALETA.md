# Paleta de colores

## Paleta UI en escala de grises

### **Background y superficies**

- **Fondo principal (app background):** `Gray50 (#FAFAFA)` → en modo claro
- **Superficies (cards, paneles, sidebar):** `Gray100 (#F5F5F5)` o `Gray200 (#EEEEEE)`
- **Divisiones y bordes sutiles:** `Gray300 (#E0E0E0)`

---

### **Componentes de interacción (ej. chat, inputs, botones)**

- **Caja de texto (input area):** `White (#FFFFFF)` con borde `Gray300`
- **Mensajes del usuario:** `Gray200 (#EEEEEE)` (con texto oscuro encima)
- **Mensajes del sistema / IA:** `Gray100 (#F5F5F5)` (para diferenciarlos sutilmente)
- **Hover en botones/elementos interactivos:** `Gray300 (#E0E0E0)`

---

### **Textos**

- **Texto principal:** `Gray900 (#212121)` → máximo contraste
- **Texto secundario (subtítulos, etiquetas, timestamps):** `Gray600 (#757575)`
- **Texto deshabilitado / placeholder:** `Gray400 (#BDBDBD)`
- **Texto inverso (sobre fondos oscuros o botones destacados):** `White (#FFFFFF)`

---

### **Controles y estados**

- **Botones primarios (minimalistas, sin color de marca):**
  - Fondo: `Gray800 (#424242)`
  - Texto: `White (#FFFFFF)`
  - Hover: `Gray700 (#616161)`

- **Botones secundarios (bordeados):**
  - Borde: `Gray400 (#BDBDBD)`
  - Fondo: transparente
  - Texto: `Gray800 (#424242)`
  - Hover: `Gray200 (#EEEEEE)`

- **Estados deshabilitados:**
  - Fondo: `Gray200 (#EEEEEE)`
  - Texto: `Gray400 (#BDBDBD)`

---

### **Mensajes de error o advertencia**

Material Design recomienda un color de **error** para accesibilidad.

- **Error:** `#B00020` (rojo oficial de Material Design).
- o usar `Black (#000000)` al 50% de opacidad sobre `Gray200`.

---

## Tipografía recomendada

Material Design usa **Roboto** como fuente oficial, porque es:

- Minimalista.
- Legible en pantallas.
- Optimizada para distintas densidades.

---

## Resumen de estilo

- Fondo general: `Gray50`
- Panel lateral / cards: `Gray100` – `Gray200`
- Chat user: `Gray200`
- Chat IA: `Gray100`
- Input: blanco con borde `Gray300`
- Texto principal: `Gray900`
- Texto secundario: `Gray600`
- Botón principal: `Gray800` con texto blanco
- Fuente: **Roboto** o **Inter**

## Mockup UI – Escala de Grises

| **Componente**                     | **Color de fondo**                          | **Texto (color)** | **Notas**                                            |
| ---------------------------------- | ------------------------------------------- | ----------------- | ---------------------------------------------------- |
| **Fondo general (App background)** | Gray50 `#FAFAFA`                            | Gray900 `#212121` | Fondo principal de la app.                           |
| **Panel lateral / Sidebar**        | Gray100 `#F5F5F5`                           | Gray900 `#212121` | Diferencia visual con el fondo.                      |
| **Card / Bloque de contenido**     | Gray200 `#EEEEEE`                           | Gray900 `#212121` | Para agrupar mensajes o secciones.                   |
| **Mensaje de Usuario**             | Gray200 `#EEEEEE`                           | Gray900 `#212121` | Caja clara con contraste medio.                      |
| **Mensaje de IA**                  | Gray100 `#F5F5F5`                           | Gray900 `#212121` | Caja aún más clara para distinguir del usuario.      |
| **Caja de texto (Input)**          | White `#FFFFFF` con borde Gray300 `#E0E0E0` | Gray900 `#212121` | Minimalista, con separación clara del fondo.         |
| **Texto principal**                | –                                           | Gray900 `#212121` | Mensajes, títulos.                                   |
| **Texto secundario**               | –                                           | Gray600 `#757575` | Subtítulos, timestamps.                              |
| **Texto deshabilitado**            | –                                           | Gray400 `#BDBDBD` | Placeholders, botones inactivos.                     |
| **Botón primario**                 | Gray800 `#424242`                           | White `#FFFFFF`   | Hover: Gray700 `#616161`.                            |
| **Botón secundario (outlined)**    | Transparente + borde Gray400 `#BDBDBD`      | Gray800 `#424242` | Hover: Gray200 `#EEEEEE`.                            |
| **Estados deshabilitados**         | Gray200 `#EEEEEE`                           | Gray400 `#BDBDBD` | Para botones o inputs inactivos.                     |
| **Error**                          | (opcional) #B00020 (Material Red)           | White `#FFFFFF`   | Solo si decides romper monocromo para accesibilidad. |
