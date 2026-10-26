// src/components/progress/LessonView.tsx
import React from 'react';
import { lessonMap, Lesson } from '../../utils/progress/lessonMapper';

interface LessonViewProps {
  lesson: Lesson;
  onLessonComplete: (lessonId: string) => void;
  onBackToList: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onLessonComplete,
  onBackToList
}) => {
  const handleComplete = () => {
    onLessonComplete(lesson.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={onBackToList}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Volver al Listado de Lecciones
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
        <div className="mb-4 flex items-center text-sm text-gray-500">
          <span className="mr-4">
            📚 {lesson.subject}
          </span>
          <span className="mr-4">
            ⏱️ Tiempo estimado: {lesson.estimatedTime} minutos
          </span>
          {lesson.prerequisites.length > 0 && (
            <span>
              🔗 Requisitos: {lesson.prerequisites.map(p => lessonMap[p]?.title || p).join(', ')}
            </span>
          )}
        </div>
        
        <div className="prose lg:prose-xl mb-6">
          {lesson.description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {/* Contenido específico de la lección basado en el tema */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Actividad de Aprendizaje</h2>
          <div className="space-y-4">
            <p className="mb-3">
              Esta lección te guiará a través de los conceptos fundamentales de 
              <strong>{lesson.title}</strong>. Al completarla, podrás:
            </p>
            <ol className="list-decimal pl-5 mb-4">
              <li>Entender los principios básicos de {lesson.title.toLowerCase()}</li>
              <li>Aplicar lo aprendido en ejercicios prácticos</li>
              <li>Identificar aplicaciones reales de estos conceptos</li>
              <li>Prepararte para temas más avanzados relacionados</li>
            </ol>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Ejercicio Práctico</h3>
              <p className="mb-2">
                Reflexiona sobre cómo puedes aplicar lo que aprendiste en 
                {lesson.title.toLowerCase()} en tu vida diaria o en situaciones 
                académicas futuras. Escribe al menos tres aplicaciones prácticas.
              </p>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Escribe tus respuestas aquí..."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleComplete}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Marcar Lección como Completada
          </button>
        </div>
      </div>
    </div>
  );
};
