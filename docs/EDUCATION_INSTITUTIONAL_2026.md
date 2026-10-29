# WILLIAMSCHOOL — BELENTANI Education Institutional UI

Esta integración conserva los módulos de la aplicación React (AcademicPlan, ProfileSelector, LessonView, LessonList y ProgressStorage), y crea una portada editorial con tres caminos interactivos, hero original responsivo y marca SVG local. No añade proveedor IA, calificaciones oficiales ni cuentas de estudiante.

## Arquitectura
Componentes React en `src/components/EducationHero.tsx`; skin aislado en `src/education-institutional.css`, importado tras `index.css`. Las rutas activan los dos modos reales existentes del workspace, no un catálogo fingido. Componentes originales del campus no se sustituyen.

## Validación
`npm run lint` (TypeScript), `npm run check:modules`, `npm run build`, `node --test tests/education-institutional.test.mjs`. Verificar navegación móvil, foco, zoom, y lector de pantalla. El objetivo es WCAG 2.2 AA, sin reclamar una conformidad no ensayada.

## Recomendación editorial
No mostrar métricas de alumnos, certificados ni proveedores de IA que no estén verificados. Consolidar las lenguas PT/ES/CA desde las fuentes de los módulos y marcar visiblemente el alcance de los datos.
