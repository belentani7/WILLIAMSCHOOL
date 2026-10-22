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

## Gates antes de integrar

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
