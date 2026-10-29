import { useState } from 'react';
import { EducationHero } from './components/EducationHero';
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

  const handleLessonComplete = (lessonId: string) => {
    if (profileId) {
      const progress = ProgressStorage.getProfileProgress(profileId);
      ProgressStorage.saveProfileProgress(profileId, {
        ...progress,
        completedLessons: Array.from(new Set([...progress.completedLessons, lessonId])),
        currentLesson: null,
        lastUpdated: new Date().toISOString(),
      });
    }
    setCurrentLessonId(null);
  };

  return (
    <div className="edu-page min-h-screen bg-slate-50 text-slate-900">
      <a className="edu-skip" href="#workspace">Saltar al contenido educativo</a>
      <header className="edu-header border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <a className="edu-brand" href="#inicio" aria-label="WILLIAMSCHOOL, inicio">
              <svg viewBox="0 0 56 56" role="img" aria-label="Símbolo de WILLIAMSCHOOL" width="48" height="48">
                <rect width="56" height="56" rx="14" fill="#174a3b" />
                <path d="M12 17q8-4 16 3 8-7 16-3v23q-8-4-16 3-8-7-16-3Z" fill="none" stroke="#f7f3e8" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M28 20v23" stroke="#f7f3e8" strokeWidth="2.5"/>
                <path d="M17 25l5 3m17-3-5 3" stroke="#d3a676" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span><strong>WILLIAMSCHOOL</strong><small>BELENTANI EDUCATION</small></span>
            </a>
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Áreas de aprendizaje">
            <button
              type="button"
              onClick={() => setActiveTab('academic')}
              aria-pressed={activeTab === 'academic'}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 ${activeTab === 'academic' ? 'bg-emerald-900 text-white' : 'bg-stone-100 text-slate-700 hover:bg-stone-200'}`}
            >
              Plan académico
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('practice')}
              aria-pressed={activeTab === 'practice'}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${activeTab === 'practice' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              Práctica y progreso
            </button>
            <a href="/itinerarios/index.html" className="rounded-lg px-4 py-2 text-sm font-semibold bg-emerald-950 text-white">Cursos completos ↗</a>
          </nav>
        </div>
      </header>

      <EducationHero
        onAcademic={() => setActiveTab('academic')}
        onPractice={() => setActiveTab('practice')}
      />
      <main id="workspace" tabIndex={-1} className="edu-workspace mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

      <footer className="edu-footer border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          WILLIAMSCHOOL © 2026 · Aprendizaje individualizado
        </div>
      </footer>
    </div>
  );
}
