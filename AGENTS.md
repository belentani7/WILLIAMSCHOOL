# AGENTS.md -- WILLIAMSCHOOL

Reglas para agentes y personas que trabajen en este repositorio.

## Proposito del proyecto

Plataforma de estudio personal (ESO/Bachillerato, Espana) con acogida cultural Brasil-Espana, ofimatica, videos educativos verificados y companero de IA.

Stack detectado: Node.js, React, Vite, Tailwind, Express, TypeScript.

## Regla dura (aditiva)

**Nunca romper lo que ya funciona.** Los cambios deben ser aditivos o compatibles
hacia atras. Si un cambio puede romper build, tests o interfaz, justificalo y
pruebalo antes de fusionar. No eliminar archivos ni reescribir modulos completos
sin necesidad demostrada.

## Fuente de verdad

Cada dato vive en un unico lugar (single source of truth). No duplicar contenido
entre archivos. La documentacion vive en `docs/` y se actualiza en el mismo PR
que el cambio (Spec-Code Convergence).

### Biblia (glosario tecnico)

La Biblia **no se edita aqui**. Fuente unica:
`../open-school/docs/BIBLIA_TERMINOS_DESARROLLO.md` → alli `npm run build:biblia`.
Para publicar en este campus: `npx tsx scripts/export-biblia.mts`
(escribe `public/modules/biblia/`). No inventar un segundo glosario.

Prioridad William (2026-10-02): `open-school` + `belentani-school-unificado`.
Fuera de alcance: `nataliamarinho`, `secure-t`. Luego: ManosAbiertas, UX Academy.

## Seguridad

- Sin secretos en git (claves, tokens, endpoints privados). Usar variables de entorno.
- Validacion de entrada y autorizacion por endpoint si hay backend.
- Errores al cliente genericos; detalle solo en logs.

## Comandos

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run preview`
- `npm run clean`
- `npm run lint`

## Commits

Commits convencionales: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `ci:`, `perf:`.

## CI

Mantener la integracion continua en verde. No fusionar cambios que rompan tests,
lint o build.

## Documentacion obligatoria antes de codigo

PRD -> SRS -> SDD -> ADR -> Plan (ver `docs/`). Gate: sin documento no se codifica.
