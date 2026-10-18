# Aprendizaje por logros en Belentani School

## Producto

El alumnado entra en un campus propio, elige su curso y asignatura, estudia una lección y ve qué ha conquistado. El currículo y sus puentes portugués, castellano y catalán siguen siendo la fuente del contenido. La portada y el aula usan la misma identidad azul noche, azul cielo y marfil.

## Requisitos

- Cada persona usa un perfil local identificable. Su avance no se mezcla con otro perfil del mismo navegador.
- Las lecciones se conquistan en orden por asignatura. La siguiente se habilita al completar la anterior.
- Las lecciones ya conquistadas se pueden volver a abrir. El alumno puede ver cuántas completó y cuál sigue.
- Los ejercicios existentes siguen disponibles y conservan su explicación inmediata.
- El avance se guarda en el navegador; esta versión no afirma sincronización entre dispositivos.

## Diseño técnico

Un almacén pequeño con versión guarda perfiles y lecciones completadas en `localStorage`. Los IDs de las lecciones proceden de `curriculumData.ts`; no se duplican textos ni contenidos. Las claves incluyen ID de perfil, módulo y tema. Lecturas inválidas se recuperan con un perfil nuevo sin bloquear el campus.

## Aceptación

Crear dos perfiles, completar una lección en el primero y comprobar que el segundo no la muestra completada. Recargar: el primero mantiene su avance. El tema siguiente está bloqueado hasta completar el anterior. `npm run lint` y `npm run build` pasan. `npm run check:modules` requiere los datos generados de EduTube y Aprende Brasil; su ausencia se reporta, no se oculta.

## Decisión

Se mantiene React/Vite y el contenido actual. El toolkit de Matheus se usa como método de contexto, mejora incremental y verificación; no se introduce Next.js ni otro motor por plantilla.
