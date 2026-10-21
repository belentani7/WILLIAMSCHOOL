// src/components/progress/LessonCard.tsx
import React from 'react';
import { Lesson } from '../../utils/progress/lessonMapper';
import { isLessonAvailable } from '../../utils/progress/lessonMapper';

interface LessonCardProps {
  lesson: Lesson;
  completedLessons: string[];
  currentLesson: string | null;
  onLessonSelect: (lessonId: string) => void;
  onLessonComplete: (lessonId: string) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  completedLessons,
  currentLesson,
  onLessonSelect,
  onLessonComplete
}) => {
  const isCompleted = completedLessons.includes(lesson.id);
  const isCurrent = currentLesson === lesson.id;
  const isAvailable = !isCompleted && isLessonAvailable(lesson.id, completedLessons);

  const handleSelect = () => {
    if (isAvailable || isCurrent) {
      onLessonSelect(lesson.id);
    }
  };

  const handleComplete = () => {
    if (isAvailable || isCurrent) {
      onLessonComplete(lesson.id);
    }
  };

  return (
    <div
      className={`mb-4 p-4 border rounded-lg transition-all duration-200 ${
        isCompleted
          ? 'border-green-500 bg-green-50'
          : isCurrent
            ? 'border-blue-500 bg-blue-50'
            : isAvailable
              ? 'border-gray-300 hover:bg-gray-50 cursor-pointer'
              : 'border-gray-200 bg-gray-50 opacity-50'
      }`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {isCompleted && (
            <span className="mr-3 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </span>
          )}
          {isCurrent && (
            <span className="mr-3 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
              ●
            </span>
          )}
          {!isCompleted && !isCurrent && isAvailable && (
            <span className="mr-3 h-4 w-4 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">
              ○
            </span>
          )}
          {!isCompleted && !isCurrent && !isAvailable && (
            <span className="mr-3 h-4 w-4 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs">
              ○
            </span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1 truncate">
            {lesson.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {lesson.description}
          </p>
          <div className="flex flex-wrap items-center mb-2 text-xs text-gray-500">
            <span className="mr-3">
              📚 {lesson.subject}
            </span>
            <span className="mr-3">
              ⏱️ {lesson.estimatedTime} min
            </span>
            {lesson.prerequisites.length > 0 && (
              <span>
                🔗 Requisitos: {lesson.prerequisites.length}
              </span>
            )}
          </div>
          {!isCompleted && !isAvailable && (
            <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-500 text-sm text-red-800">
              <strong>Requisitos previos no cumplidos</strong>
              <ul className="mt-1 list-disc pl-5 text-xs">
                {lesson.prerequisites.map(prereq => (
                  <li key={prereq}>
                    {lessonMap[prereq]?.title || prereq} {completedLessons.includes(prereq) ? '(✓ completado)' : '(✗ pendiente)'}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 space-y-2">
          {!isCompleted && isAvailable && (
            <button
              onClick={handleSelect}
              className="w-full bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
            >
              Empezar
            </button>
          )}
          {!isCompleted && isAvailable && (
            <button
              onClick={handleComplete}
              className="w-full bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors mt-1"
            >
              Marcar como Completado
            </button>
          )}
          {isCompleted && (
            <button
              onClick={() => onLessonSelect(lesson.id)}
              className="w-full bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors"
            >
              Revisar
            </button>
          )}
          {isCurrent && !isCompleted && (
            <button
              onClick={handleComplete}
              className="w-full bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
            >
              Completar Lección
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
