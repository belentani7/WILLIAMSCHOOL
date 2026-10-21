// src/App.tsx
import React, { useState } from 'react';
import { ProfileSelector } from './components/profile/ProfileSelector';
import { LessonList } from './components/progress/LessonList';
import { LessonView } from './components/progress/LessonView';
import { ProgressStorage, ProgressData } from './utils/progress/storage';

function App() {
  const [profileId, setProfileId] = useState<string | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [showLessonView, setShowLessonView] = useState(false);

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('academic');
  const [studyMinutes, setStudyMinutes] = useState<number>(14);
  const [showEyeBreakModal, setShowEyeBreakModal] = useState<boolean>(false);
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState<boolean>(false);
  const [parentalSettings, setParentalSettings] = useState<ParentalSettings>({
    maxDailyMinutes: 60,
    usedMinutesToday: 14,
    breakEveryMinutes: 20,
    safetyShieldEnabled: true,
    dataVaultEncrypted: true,
    autoVoiceEnabled: true,
    lastBreakTimestamp: Date.now(),
    parentPin: '1234'
  });

  // Manejar selección de lección
  const handleLessonSelect = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setShowLessonView(true);
  };

  // Manejar completado de lección
  const handleLessonComplete = (lessonId: string) => {
    setCurrentLessonId(null);
    setShowLessonView(false);
    // El progreso se guarda automáticamente en el componente LessonList
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold flex items-center">
            <span className="mr-3">📚</span>
            WILLIAMSCHOOL - Plataforma de Aprendizaje Personalizado
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Donde cada estudiante avanza a su propio ritmo
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {profileId === null ? (
          // Seleccionar perfil
          <ProfileSelector onProfileSelected={handleProfileSelected} />
        ) : showLessonView && currentLessonId !== null ? (
          // Vista de lección específica
          <LessonView
            lesson={
              // Intentamos obtener la lección del mapa
              // En una implementación real, esto vendría de un servicio o datos cargados
              {
                id: currentLessonId,
                title: 'Lección Seleccionada',
                subject: 'Variado',
                description: 'Contenido de la lección se cargará aquí basado en el ID seleccionado.',
                prerequisites: [],
                estimatedTime: 30
              } as any // En una implementación real, tiparíamos esto correctamente
            },
            onLessonComplete={handleLessonComplete},
            onBackToList: () => {
              setShowLessonView(false);
              setCurrentLessonId(null);
            }
          }
        ) : (
          // Lista de lecciones
          <LessonList profileId={profileId} />
        )}
      </main>

      <footer className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
          WILLIAMSCHOOL © 2026 - Plataforma Educativa Personalizada
          <br />
          Hecho con ❤️ para el aprendizaje individualizado
        </div>
      </footer>
    </div>
  );
}

export default App;
