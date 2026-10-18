# ADR: progreso local por perfil

Estado: aceptado para esta iteración.

Se guarda un único documento versionado en `localStorage` por navegador. Cada perfil tiene UUID propio y una lista de claves de lecciones. El contenido curricular sigue en `curriculumData.ts`.

Razón: permite una experiencia propia y comprobable sin introducir un backend de identidad ni transmitir datos de menores. Límite: no hay sincronización entre dispositivos, recuperación de cuenta ni prueba de dominio; esas funciones requieren diseño y protección de datos específicos.
