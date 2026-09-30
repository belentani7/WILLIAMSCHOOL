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
