import { useEffect, useMemo, useState } from 'react';
import { LessonCard } from './LessonCard';
import { ProgressData, ProgressStorage } from '../../utils/progress/storage';
import { getNextAvailableLesson, getSubjectProgress, lessonMap, type Lesson } from '../../utils/progress/lessonMapper';

interface LessonListProps {
  profileId: string;
  onLessonSelect: (lessonId: string) => void;
}

export function LessonList({ profileId, onLessonSelect }: LessonListProps) {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setProgress(ProgressStorage.getProfileProgress(profileId));
    } catch (error) {
      console.error('No se pudo cargar el progreso del estudiante:', error);
      setProgress(ProgressStorage.createDefaultProgress(profileId));
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  const lessonsBySubject = useMemo(() => {
    const grouped: Record<string, Lesson[]> = {};
    for (const lesson of Object.values(lessonMap)) {
      (grouped[lesson.subject] ??= []).push(lesson);
    }
    return grouped;
  }, []);

  const updateProgress = (next: ProgressData) => {
    setProgress(next);
    try {
      ProgressStorage.saveProfileProgress(profileId, next);
    } catch (error) {
      console.error('No se pudo guardar el progreso del estudiante:', error);
    }
  };

  const handleLessonSelect = (lessonId: string) => {
    if (!progress) return;
    updateProgress({
      ...progress,
      currentLesson: lessonId,
      lastUpdated: new Date().toISOString(),
    });
    onLessonSelect(lessonId);
  };

  const handleLessonComplete = (lessonId: string) => {
    if (!progress) return;
    updateProgress({
      ...progress,
      completedLessons: Array.from(new Set([...progress.completedLessons, lessonId])),
      currentLesson: null,
      lastUpdated: new Date().toISOString(),
    });
  };

  if (loading || !progress) {
    return <div className="py-8 text-center" role="status">Cargando progreso...</div>;
  }

  const nextLesson = getNextAvailableLesson(progress.completedLessons);
  const subjectProgress = getSubjectProgress(progress.completedLessons);

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-white p-4 shadow-md" aria-labelledby="progress-heading">
        <h2 id="progress-heading" className="mb-4 text-xl font-bold">Resumen de progreso</h2>
        {Object.keys(subjectProgress).length === 0 ? (
          <p className="text-sm text-gray-600">Todavía no hay lecciones en el catálogo.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(subjectProgress).map(([subject, data]) => {
              const percentage = data.total === 0 ? 0 : Math.round((data.completed / data.total) * 100);
              return (
                <div key={subject} className="rounded-lg bg-gray-50 p-3">
                  <h3 className="mb-2 font-semibold">{subject}</h3>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200" role="progressbar" aria-label={`Progreso de ${subject}`} aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${percentage}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-gray-600">{data.completed} de {data.total} · {percentage}% completado</p>
                </div>
              );
            })}
          </div>
        )}

        {nextLesson && (
          <div className="mt-4 rounded-lg bg-blue-50 p-3">
            <h3 className="mb-2 font-semibold">Próxima lección recomendada</h3>
            <p className="text-sm">{nextLesson.title} · {nextLesson.subject} · {nextLesson.estimatedTime} min</p>
            <p className="mt-1 text-xs text-gray-600">{nextLesson.description}</p>
            <button type="button" onClick={() => handleLessonSelect(nextLesson.id)} className="mt-3 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
              Continuar aprendizaje
            </button>
          </div>
        )}
      </section>

      <section className="rounded-lg bg-white p-4 shadow-md" aria-labelledby="lessons-heading">
        <h2 id="lessons-heading" className="mb-4 text-xl font-bold">Lecciones disponibles</h2>
        {Object.keys(lessonMap).length === 0 ? (
          <p className="py-8 text-center text-gray-500">No hay lecciones disponibles en este momento.</p>
        ) : (
          <div className="space-y-5">
            {Object.entries(lessonsBySubject).map(([subject, lessons]) => (
              <div key={subject}>
                <h3 className="mb-3 border-b pb-2 text-lg font-semibold">{subject}</h3>
                <div className="space-y-3">
                  {lessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      completedLessons={progress.completedLessons}
                      currentLesson={progress.currentLesson}
                      onLessonSelect={handleLessonSelect}
                      onLessonComplete={handleLessonComplete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
