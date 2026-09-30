# WILLIAMSCHOOL

Escuela digital comunitaria: curriculo de Nepal adaptado, diseno institucional y acceso abierto.

## Que es

Una plataforma educativa para una comunidad escolar. El curriculo base procede de Nepal y se
adapta a un formato digital, con una identidad visual institucional sobria.

En linea: <https://williamschool.vercel.app>

## Stack

- **Vite + TypeScript** - aplicacion
- **Bun** - gestor de paquetes
- **GitHub Pages / Vercel** - despliegue

## Detalle tecnico importante

El sitio vive en un subpath (`/WILLIAMSCHOOL/`). Por eso `vite.config.ts` usa **base relativa**
y las rutas de assets son `./assets`, no `/assets`. Cambiar eso rompe las imagenes en Pages.

## Puesta en marcha

```bash
bun install
bun run dev
```

## Licencia

MIT - ver `LICENSE`.

---

## Parte del indice educativo

Esta plataforma forma parte del conjunto educativo de **Belentani / NOIACORE**:
formacion gratuita y abierta. El indice completo, con material y estado de cada una,
vive en el nodo central:

**<https://github.com/belentani7/open-school/blob/main/INDICE-EDUCATIVO.md>**

| Plataforma | Que ensena | Enlace |
|---|---|---|
| Open School | Instituto digital universal | https://open-school-gamma.vercel.app |
| ManosAbiertas | IA y ofimatica para recien llegados | https://belentani7.github.io/ManosAbiertas/ |
| WILLIAMSCHOOL | Escuela comunitaria (curriculo Nepal) | https://williamschool.vercel.app |
| UX Academy | Diseno UX/Producto, trilingue | https://ux-academy-professional.vercel.app |
| Aprende Brasil | Educacion para Brasil | https://aprende-brasil.vercel.app/ |
| Lingua Aberta | Idiomas, progresion CEFR | https://belentani7.github.io/lingua-aberta-empresa/ |
| Cruzando el Charco | Acogida y arraigo | https://belentani7.github.io/Cruzando-el-charco/ |
| secure-t | Ciberseguridad e IA | https://belentani7.github.io/secure-t/ |

**PT > ES > EN > CA.** Gratuito, accesible (WCAG) y conectado.
