# WILLIAMSCHOOL

Plataforma de estudio personal: ESO/Bachillerato (España) con acogida cultural
Brasil-España, ofimática, vídeos educativos verificados y un compañero de IA
("consciencia entre aspas").

## Qué es

App de escritorio educativa (estilo "edu-OS") para un estudiante de 14 años, brasileño,
que cursa ESO en Catalunya. Cubre:

- **Plan ESO/Bachillerato**: módulos por curso con puentes lingüísticos PT → ES → CA.
- **EduOffice**: editor de texto, hoja de cálculo y presentaciones.
- **EduTube**: vídeos reales de YouTube de canales educativos **verificados uno a uno**
  contra el oEmbed de YouTube (no hay IDs inventados).
- **Campus Unificado**: Aprende Brasil (205 módulos / 1025 pasos) integrado dentro de la
  app, más Open School, Manos Abiertas y Belentani como módulos.
- **Compañero Belentani**: personaje de IA con **portugués como idioma principal**, que se
  declara a sí mismo como personaje y acompaña en todas las pantallas.

En línea: <https://williamschool-livid.vercel.app>

## Stack

- **React 19 + Vite 6 + TypeScript + Tailwind 4**
- **Express** (`server.ts`) como servidor y proxy de IA
- **npm** como gestor de paquetes (no Bun: `bun` no funciona en este equipo)

## Tutor IA y compañero: servicios distintos

La aplicación conserva **dos funciones independientes**, ambas implementadas en `server.ts`:

- **Tutor académico / lecciones:** `POST /api/gemini/chat` y `POST /api/gemini/generate-lesson` utilizan Google Gemini con `GEMINI_API_KEY`. Sin esta clave, la aplicación ofrece respuestas demostrativas señaladas como simuladas; no debe presentarlas como generación en tiempo real.
- **Compañero Belentani:** `POST /api/companion/chat` utiliza Hugging Face (`HUGGINGFACE_TOKEN` y `COMPANION_MODEL`), en portugués brasileño por defecto. Cuando el modelo no está disponible, contesta con un mensaje local identificado como `provider: "offline"` y `simulated: true`. Esta ruta **no** cambia automáticamente a Gemini.

Las claves solo pertenecen al entorno del servidor; no se deben publicar en Git ni incluir en el JavaScript del navegador. El personaje de IA no debe presentarse como consciente, profesional sanitario ni sustituto de docentes o tutores legales.

## Datos reales, no inventados

Todo el contenido viene de archivos reales:

- `public/modules/aprende-brasil/curriculum.json` — 205 módulos, 1025 pasos.
- `public/modules/edutube/videos.json` — 127 vídeos verificados (regenerable con
  `node scripts/build-edutube.mjs`).

Los paneles de autoevaluación (notas, porcentajes) son valores **orientativos de ejemplo**,
no calificaciones oficiales ni auditorías externas.

## Puesta en marcha

```bash
npm install
npm run dev        # tsx server.ts
npm run lint       # tsc --noEmit
npm run check:modules
npm run build
```

Variables de entorno en `.env` (ver `.env.example`): `GEMINI_API_KEY`,
`HUGGINGFACE_TOKEN`, `COMPANION_MODEL`, `APP_URL`.

## Detalle técnico

`vite.config.ts` **no** define `base` (usa el valor por defecto `/`). Si el sitio se
despliega en un subpath, hay que fijarlo para que las rutas de assets no se rompan.

## Licencia

MIT - ver `LICENSE`.

---

## Parte del índice educativo

Esta plataforma forma parte del conjunto educativo de **Belentani / NOIACORE**:
formación gratuita y abierta. El índice completo, con material y estado de cada una,
vive en el nodo central:

**<https://github.com/belentani7/open-school/blob/main/INDICE-EDUCATIVO.md>**

| Plataforma | Qué enseña | Enlace |
|---|---|---|
| Open School | Instituto digital universal | https://open-school-gamma.vercel.app |
| ManosAbiertas | IA y ofimática para recién llegados | https://belentani7.github.io/ManosAbiertas/ |
| WILLIAMSCHOOL | Estudio ESO/Bachillerato + acogida BR-ES | https://williamschool-livid.vercel.app |
| UX Academy | Diseño UX/Producto, trilingüe | https://ux-academy-professional.vercel.app |
| Aprende Brasil | Educação para o Brasil | https://aprende-brasil.vercel.app/ |
| Lingua Aberta | Idiomas, progresión CEFR | https://belentani7.github.io/lingua-aberta-empresa/ |
| Cruzando el Charco | Acogida y arraigo | https://belentani7.github.io/Cruzando-el-charco/ |
| secure-t | Ciberseguridad e IA | https://belentani7.github.io/secure-t/ |

**PT > ES > EN > CA.** Gratuito, accesible (WCAG) y conectado.
