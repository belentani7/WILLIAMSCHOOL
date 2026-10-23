# Corrección verificable: controles locales, consentimiento y pedagogía
Fecha: 2026-10-22 · Alcance: **WILLIAMSCHOOL** · Rama `fix/parental-privacy-integrity-20261022`

## Problemas confirmados en `main`

- El PIN `1234` estaba fijado en código **y aceptado como alternativa universal**.
- El interruptor «bóveda cifrada» afirmaba cifrar progreso sin cifrado en `learningProgress.ts` (datos en `localStorage`).
- Se mostraba tiempo inicial de estudio de **14 min** antes de estudiar; además se seguía contando cuando la pestaña estaba oculta.
- Se anunciaban «blindaje total», cumplimiento legal, ansiedad reducida a cero, «85%» de vocabulario compartido y calificaciones A2/B1 consolidadas, sin medidas ni evidencia del alumno.
- La preferencia de voz automática no se respetaba por `AITutorChat`, que leía respuestas incondicionalmente.

## Corrección introducida

Se elimina el PIN universal. Una persona adulta puede crear un PIN numérico
local de 6–12 dígitos: PBKDF2-SHA256 (210000 iteraciones), sal aleatoria
(16 bytes) y solo verificador persistido. Cinco intentos fallidos cierran
el formulario durante esa sesión de carga. **Esta barrera no es autenticación
segura:** alguien con acceso al dispositivo/devtools puede modificar datos
locales o recargar. No se transmite el PIN. Para restricciones exigibles hacen
falta cuentas de adulto autenticadas, controles del SO y validación del lado servidor.

El estado de cifrado queda desactivado; no se ofrece un interruptor falso.
El informe del alumno usa exclusivamente el número de lecciones marcadas como
terminadas en el perfil local y no inventa niveles, notas ni destrezas.
El contador empieza en cero, solo avanza con pestaña visible y se etiqueta
como **estimación de sesión**, no como tiempo efectivo ni límite médico.
La opción de voz controla ahora la reproducción automática en el chat y
comienza desactivada.

La información curricular y sanitaria permanece orientativa: este PR no
declara una evaluación clínica, cumplimiento normativo acreditado, ni que
el sistema impida físicamente seguir usando la pantalla.

## Estado de verificación observado (2026-10-23)

- Head revisado: `b2d228ebe58ae4837deb55828e0a604ded96862b`.
- GitHub Actions CI (run `39730732703`) y Security/CodeQL (run `39730732694`) terminaron en `failure`. Sus trabajos no exponen pasos ejecutados y la consulta de logs devolvió `BlobNotFound`; no hay resultados individuales de tests disponibles.
- Vercel no aporta un resultado de compilación para este head: el bot reporta el límite diario gratuito de despliegues (`api-deployments-free-per-day`).
- Por tanto, este documento no afirma que ningún comando local ni gate haya pasado.

## Gates pendientes antes de integrar (no ejecutados en esta revisión)

```bash
npm ci
npm run lint
npm test
npm run build
```

Prueba manual: configurar PIN en HTTPS, comprobar intento 1234 inválido,
recargar y verificar el PIN correcto, errores con almacenamiento bloqueado,
contar solo mientras la pestaña es visible, alternar lectura automática,
confirmar que no aparece ningún informe académico ficticio.
Revisar especialmente compatibilidad con el navegador del alumnado.

Sin ejecución verificada de los comandos ni prueba visual **no fusionar**.
No se modifican ni fusionan WILLIAMSCHOOL, ManosAbiertas y Open School.

## Extensión 2026-10-23 — consentimiento de red del compañero

`src/components/CompanionPresence.tsx` enviaba **siempre** la pregunta y hasta ocho mensajes de contexto a `/api/companion/chat`, mientras su interfaz afirmaba que nada salía del dispositivo. El servidor `server.ts` puede reenviar el contenido a Hugging Face si existe token. En un producto para menores, esto es una discrepancia de privacidad confirmada por lectura del flujo cliente/servidor.

Ahora el compañero comienza **en modo local sin petición de red**; la casilla explícita de envío al servidor/proveedor se desmarca en cada recarga y limita el historial transmitido a ocho mensajes anteriores de 2000 caracteres. La nueva pregunta se incluye solo una vez. La interfaz informa del envío, permite borrar la conversación local, anuncia mensajes para lector de pantalla, recupera foco en el campo de entrada y admite Escape para cerrar el panel. **No es una garantía de privacidad del proveedor** ni sustituye una política de consentimiento para menores. El tutor académico separado `AITutorChat` sigue usando `/api/gemini/chat` y requiere revisión propia antes de publicar.

Pruebas **aisladas** ejecutadas en Node 22.16.0 sobre `src/utils/companionPrivacy.ts` y `tests/companionPrivacy.test.mjs`: `node --experimental-strip-types --test tests/companionPrivacy.test.mjs` **4/4 PASS** y `tsc --noEmit --strict --target ES2022 --module ESNext --skipLibCheck src/utils/companionPrivacy.ts` **PASS** (copia exacta por SHA Git blob). No se ejecutó la suite completa, lint/build de React, navegador, lector de pantalla real ni CI con runner. Sin merge ni publicación; los gates anteriores siguen pendientes.
