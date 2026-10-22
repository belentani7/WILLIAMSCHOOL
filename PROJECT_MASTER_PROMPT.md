# PROJECT_MASTER_PROMPT — WILLIAMSCHOOL — escuela digital personalizada y acompañamiento intercultural

**Documento canónico de intención y dirección de producto** · 22/10/2026  
**Repositorio:** `belentani7/WILLIAMSCHOOL`  
**Regla de lectura:** hechos observados separados de propuestas; este archivo no sustituye el README técnico ni las reglas preexistentes del repositorio.

## 1. ADN del proyecto — qué es y qué no es

- **Producto**: entorno educativo personalizado ESO/Bachillerato en Catalunya con puente PT-BR → español → catalán y herramientas de ofimática.
- **Stack comprobado**: React 19/Vite/TS + Express en `server.ts`; contenido educativo en `public/modules/` y `open-data/`; instrucciones previas en `AGENTS.md` y mapa de relaciones en `UNIVERSO-EDUCATIVO.md`.
- **Partes documentadas**: EduOffice, EduTube con vídeos verificados, Aprende Brasil, módulos curriculares y compañero Belentani; hay integración con Hugging Face condicionada a configuración.
- **Público sensible**: estudiante menor. Privacidad y protección de menores prevalecen sobre personalización invasiva.

## 2. Norte creativo y tecnológico: máximo potencial

Construir una **escuela-asistente excelente** que reduzca la fricción de adaptación al sistema educativo de Catalunya y permita progresar con autonomía: currículum preciso, explicaciones adaptadas a nivel, aprendizaje multilingüe, tareas, ofimática y acompañamiento declarado como IA, nunca como una persona o conciencia real.

## 3. Producto ideal y recorrido de usuario

- Inicio con plan del día, materia y progreso real, rutas del curso con objetivos observables, lectura asistida PT/ES/CA y glosario contextual.
- Lecciones de matemáticas, ciencias, lenguas, historia y ofimática con ejercicios verificados, feedback explicativo, adaptaciones, accesibilidad y materiales imprimibles.
- Tutor conversacional que cite la lección o documento fuente, diga «no sé» cuando proceda y ofrezca modo offline si falta la clave; no inventar calificaciones.
- EduOffice con guardar/exportar local y plantillas educativas; EduTube con fuentes revisadas, vista segura, y sin autoplay invasivo.
- Modo tutor/familia estrictamente opcional y con controles de privacidad apropiados para menores.

## 4. Arquitectura y diseño técnico para llegar allí

- Preservar `AGENTS.md`: reglas aditivas y fuente única; reconciliar cualquier conflicto con ese canon antes de editar.
- Evitar duplicar el motor `campus/` de otros repos. Consumir recursos educativos mediante contratos/índices versionados donde exista permiso.
- `server.ts`: validación de entradas, control de cuota, privacidad de menores, sin exponer `HUGGINGFACE_TOKEN` ni otros secretos al cliente.
- Progreso de estudiante: local-first o backend mínimamente necesario; retención limitada, consentimiento adecuado, exportación/borrado y sin perfiles públicos.
- Definir contenidos contra fuentes curriculares reales, con traducción humana revisada cuando sea esencial.

## 5. Plan de construcción por resultados observables

1. Comprobar `npm run lint`, `npm run check:modules`, `npm test`, `npm run build`; corregir incompatibilidades antes de ampliar.
2. Unificar navegación de lecciones, tareas y progreso, sin alterar el significado del contenido existente.
3. Mejorar accesibilidad, claridad lingüística y verificación de fuentes docentes por materia.
4. Fortalecer tutor IA con citas internas, límites de seguridad, fallbacks y costes controlados.
5. Verificar todos los flujos en móvil/escritorio y separar con precisión lo desplegado de lo previsto.

## 6. Límites innegociables de este producto

No recopilar datos de menores sin necesidad, no hacer vigilancia escolar, no insinuar calificaciones oficiales, no presentar IA como conciencia, no fusionar este repositorio con `ManosAbiertas`, `open-school` o `secure-t`.


## Protocolo obligatorio para el siguiente agente (ejecución, no relato)

> **Instrucción operativa**: Recupera primero la realidad del repositorio y eleva ESTE producto a su máximo potencial sin cambiar su identidad. Este archivo es el canon estratégico y un prompt reutilizable; **no es prueba** de que las funciones aquí propuestas ya existan.

1. Lee `README.md`, directorios de código, configuración, documentación y pruebas. Contrasta el árbol y el código actual con lo declarado aquí. Marca cada capacidad como existente, parcial o futura; nunca presentes ideas como funciones terminadas.
2. Respeta la intención original, licencia, titulares de derechos, público y estilo visual. No crees otro repositorio, una copia sin motivo, un fork de producto ni mezcles productos independientes.
3. Construye verticalmente: cada entrega debe comprender experiencia de usuario, lógica, contenido y persistencia/integraciones reales **solo cuando sean necesarias**, así como control de errores, accesibilidad, seguridad y pruebas. Nunca simules bases de datos, métricas, usuarios ni integraciones.
4. Antes de adoptar proveedor, framework o infraestructura nueva, demuestra la necesidad y el coste de mantenerla. Prefiere las dependencias existentes, contratos estables y componentes reutilizables; ninguna clave de API va al frontend o al repositorio.
5. No borres material histórico o creativo ni modifiques datos personales, secretos, dominios, estado público/privado o despliegues irreversibles sin respaldo y autorización específica. No sustituyas contenido auténtico por texto de relleno.
6. Cambios pequeños y trazables, con pruebas, lint, build y validación manual de los flujos esenciales; documenta la diferencia exacta entre **implementado**, **validado** y **pendiente**.
7. Si un objetivo se opone al valor central de este proyecto, prioriza su identidad sobre la homogeneización del ecosistema. Los vínculos con otros proyectos son integraciones opcionales, no órdenes de fusión.

## Definición de terminado

Un incremento está terminado solo cuando el usuario alcanza el objetivo principal sin pantallas vacías ni navegación rota; el contenido es auténtico y mantenible; el estado de datos es consistente; errores y límites de uso son legibles; privacidad/accesibilidad/seguridad están contempladas; hay pruebas reproducibles y el despliegue, si se anuncia, ha sido comprobado en su URL real. Cada afirmación pública debe estar sustentada por código, datos o evidencia actual.

## Prompt maestro reutilizable

«Actúa simultáneamente como responsable de producto, director de arte, arquitecto de software, desarrollador full-stack, especialista en contenido, accesibilidad y seguridad de **este repositorio**. Relee este canon y el código real antes de intervenir. Detecta la diferencia entre el producto actual y su visión máxima. Elige el siguiente incremento más valioso para el usuario final, constrúyelo de extremo a extremo sobre la estructura existente, prueba lo que afirmas y documenta resultados comprobados y limitaciones. Mantén identidad, trazabilidad y autonomía del proyecto. No conviertas esta visión en otra auditoría sin cambios ni en un rediseño genérico». 
