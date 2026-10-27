import { useState } from 'react';
import { AcademicPlan } from './components/AcademicPlan';
import { ProfileSelector } from './components/profile/ProfileSelector';
import { LessonList } from './components/progress/LessonList';
import { LessonView } from './components/progress/LessonView';
import { ProgressStorage } from './utils/progress/storage';
import { lessonMap } from './utils/progress/lessonMapper';

type WorkspaceTab = 'academic' | 'practice';

export default function App() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('academic');
  const [profileId, setProfileId] = useState<string | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [storageWarning, setStorageWarning] = useState(false);

  const handleLessonComplete = (lessonId: string) => {
    if (profileId) {
      const progress = ProgressStorage.getProfileProgress(profileId);
      const persisted = ProgressStorage.saveProfileProgress(profileId, {
        ...progress,
        completedLessons: Array.from(new Set([...progress.completedLessons, lessonId])),
        currentLesson: null,
        lastUpdated: new Date().toISOString(),
      });
      setStorageWarning(!persisted);
    }
    setCurrentLessonId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <h1 className="flex items-center text-2xl font-bold tracking-tight">
              <span className="mr-3" aria-hidden="true">📚</span>
              WILLIAMSCHOOL
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Un espacio de aprendizaje individualizado, multilingüe y orientado a competencias.
            </p>
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Áreas de aprendizaje">
            <button
              type="button"
              onClick={() => setActiveTab('academic')}
              aria-current={activeTab === 'academic' ? 'page' : undefined}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${activeTab === 'academic' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              Plan académico
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('practice')}
              aria-current={activeTab === 'practice' ? 'page' : undefined}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${activeTab === 'practice' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              Práctica y progreso
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {storageWarning && <p role="alert" className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">No se puede guardar el progreso en este navegador. Los cambios solo estarán disponibles mientras mantengas abierta esta pestaña.</p>}
        {activeTab === 'academic' ? (
          <AcademicPlan />
        ) : profileId === null ? (
          <ProfileSelector onProfileSelected={setProfileId} />
        ) : currentLessonId && lessonMap[currentLessonId] ? (
          <LessonView
            lesson={lessonMap[currentLessonId]}
            onLessonComplete={handleLessonComplete}
            onBackToList={() => setCurrentLessonId(null)}
          />
        ) : (
          <LessonList profileId={profileId} onLessonSelect={setCurrentLessonId} />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          WILLIAMSCHOOL © 2026 · Aprendizaje individualizado
        </div>
      </footer>
    </div>
  );
}
