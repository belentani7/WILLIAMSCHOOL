// src/components/progress/LessonList.tsx
import React from 'react';
import { LessonCard } from './LessonCard';
import { ProgressStorage, ProgressData } from '../../utils/progress/storage';
import { getNextAvailableLesson, getSubjectProgress } from '../../utils/progress/lessonMapper';

interface LessonListProps {
  profileId: string;
}

export const LessonList: React.FC<LessonListProps> = ({ profileId }) => {
  const [progress, setProgress] = React.useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar progreso del perfil
  React.useEffect(() => {
    const loadProgress = () => {
      const savedProgress = ProgressStorage.getProfileProgress(profileId);
      setProgress(savedProgress);
      setLoading(false);
    };

    loadProgress();
  }, [profileId]);

  // Manejar selección de lección
  const handleLessonSelect = (lessonId: string) => {
    setProgress(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        currentLesson: lessonId,
        lastUpdated: new Date().toISOString()
      };
    });
    ProgressStorage.saveProfileProgress(profileId, {
      ...prev!,
      currentLesson: lessonId,
      lastUpdated: new Date().toISOString()
    });
  };

  // Manejar completado de lección
  const handleLessonComplete = (lessonId: string) => {
    setProgress(prev => {
      if (!prev) return prev;
      const completedLessons = Array.from(new Set([...prev.completedLessons, lessonId]));
      return {
        ...prev,
        completedLessons,
        currentLesson: null, // Al completar una lección, no hay lección actual
        lastUpdated: new Date().toISOString()
      };
    });
    ProgressStorage.saveProfileProgress(profileId, {
      ...prev!,
      completedLessons: Array.from(new Set([...prev!.completedLessons, lessonId])),
      currentLesson: null,
      lastUpdated: new Date().toISOString()
    });
  };

  if (loading || !progress) {
    return <div className="text-center py-8">Cargando progreso...</div>;
  }

  const nextLesson = getNextAvailableLesson(progress.completedLessons);
  const subjectProgress = getSubjectProgress(progress.completedLessons);

  return (
    <div className="space-y-6">
      {/* Resumen de progreso */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Resumen de Progreso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(subjectProgress).map(([subject, data]) => (
            <div key={subject} className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">{subject}</h3>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div
                      className={`h-2.5 bg-blue-600 rounded-full transition-all duration-500 w-${Math.min(
                        100,
                        Math.round((data.completed / data.total) * 100)
                      )}`}
                    ></div>
                  </div>
                </div>
                <div className="ml-3 text-sm font-medium">
                  {data.completed}/{data.total}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((data.completed / data.total) * 100)}% completado
              </p>
            </div>
          ))}
        </div>
        
        {nextLesson && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Próxima Lección Recomendada</h3>
            <p className="text-sm">
              {nextLesson.title} ({nextLesson.subject}) - {nextLesson.estimatedTime} min
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {nextLesson.description}
            </p>
          </div>
        )}
      </div>

      {/* Lista de lecciones */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Lecciones Disponibles</h2>
        
        {/* Mensaje cuando no hay lecciones disponibles */}
        {!Object.keys(lessonMap).length && (
          <p className="text-center py-8 text-gray-500">
            No hay lecciones disponibles en este momento.
          </p>
        )}
        
        {/* Lista de lecciones organizadas por materia */}
        {Object.values(lessonMap).length > 0 && (
          <div className="space-y-4">
            {/* Agrupar lecciones por materia */}
            {Object.entries(
              Object.values(lessonMap).reduce((acc, lesson) => {
                if (!acc[lesson.subject]) {
                  acc[lesson.subject] = [];
                }
                acc[lesson.subject].push(lesson);
                return acc;
              }, {} as Record<string, Lesson[]>)
            ).map(([subject, lessons]) => (
              <div key={subject} className="mb-5">
                <h3 className="text-lg font-semibold mb-3 border-b pb-2">
                  {subject}
                </div>
                <div className="space-y-3">
                  {lessons.map(lesson => (
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
              }
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
