// src/utils/progress/lessonMapper.ts

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  description: string;
  prerequisites: string[];
  estimatedTime: number;
}

/**
 * Starter curriculum. Each lesson is intentionally concise and can be replaced
 * by curriculum authored by the school without changing progress tracking.
 */
export const lessonMap: Record<string, Lesson> = {
  'math-numbers': {
    id: 'math-numbers',
    title: 'Números y operaciones básicas',
    subject: 'Matemáticas',
    description: 'Reconoce números naturales y practica suma, resta, multiplicación y división con ejemplos cotidianos. Comprueba cada resultado estimando primero una respuesta aproximada.',
    prerequisites: [],
    estimatedTime: 20,
  },
  'language-reading': {
    id: 'language-reading',
    title: 'Comprensión lectora',
    subject: 'Lengua',
    description: 'Lee un texto breve, identifica su idea principal y distingue los detalles que la apoyan. Resume el contenido con tus propias palabras y formula una pregunta sobre lo leído.',
    prerequisites: [],
    estimatedTime: 20,
  },
  'science-observation': {
    id: 'science-observation',
    title: 'Observar y formular preguntas',
    subject: 'Ciencias',
    description: 'La investigación comienza con una observación. Describe qué ves, formula una pregunta que pueda investigarse y propón una explicación que después pueda ponerse a prueba.',
    prerequisites: [],
    estimatedTime: 15,
  },
  'math-problems': {
    id: 'math-problems',
    title: 'Resolver problemas paso a paso',
    subject: 'Matemáticas',
    description: 'Lee el problema, identifica los datos, decide qué operación necesitas y explica por qué. Resuelve el ejercicio y revisa si el resultado tiene sentido.',
    prerequisites: ['math-numbers'],
    estimatedTime: 25,
  },
  'language-writing': {
    id: 'language-writing',
    title: 'Escribir un párrafo claro',
    subject: 'Lengua',
    description: 'Construye un párrafo con una idea principal, dos detalles de apoyo y una frase final. Revisa la puntuación, evita repeticiones y comprueba que cada frase contribuya al tema.',
    prerequisites: ['language-reading'],
    estimatedTime: 25,
  },
  'science-evidence': {
    id: 'science-evidence',
    title: 'Hipótesis y evidencias',
    subject: 'Ciencias',
    description: 'Diferencia una observación de una interpretación. Formula una hipótesis comprobable, indica qué datos necesitarías y explica qué resultado podría refutar tu idea.',
    prerequisites: ['science-observation'],
    estimatedTime: 25,
  },
  'thinking-sources': {
    id: 'thinking-sources',
    title: 'Evaluar una afirmación',
    subject: 'Pensamiento crítico',
    description: 'Antes de aceptar una afirmación, identifica quién la presenta, qué pruebas aporta y qué información falta. Compara fuentes independientes y separa hechos, opiniones e inferencias.',
    prerequisites: ['language-reading'],
    estimatedTime: 20,
  },
};

export function getNextAvailableLesson(completedLessons: string[]): Lesson | null {
  return Object.values(lessonMap).find(
    (lesson) => !completedLessons.includes(lesson.id) && isLessonAvailable(lesson.id, completedLessons),
  ) ?? null;
}

export function isLessonAvailable(lessonId: string, completedLessons: string[]): boolean {
  const lesson = lessonMap[lessonId];
  if (!lesson || completedLessons.includes(lessonId)) return false;
  return lesson.prerequisites.every((id) => completedLessons.includes(id));
}

export function getCompletedLessonsBySubject(completedLessons: string[], subject: string): string[] {
  return completedLessons.filter((id) => lessonMap[id]?.subject === subject);
}

export function getSubjectProgress(completedLessons: string[]): Record<string, { completed: number; total: number }> {
  const progress: Record<string, { completed: number; total: number }> = {};
  for (const lesson of Object.values(lessonMap)) {
    progress[lesson.subject] ??= { completed: 0, total: 0 };
    progress[lesson.subject].total += 1;
    if (completedLessons.includes(lesson.id)) progress[lesson.subject].completed += 1;
  }
  return progress;
}
