import { useState } from 'react';
import { ProfileSelector } from './components/profile/ProfileSelector';
import { LessonList } from './components/progress/LessonList';
import { LessonView } from './components/progress/LessonView';
import { ProgressStorage } from './utils/progress/storage';
import { lessonMap } from './utils/progress/lessonMapper';

export default function App() {
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
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="flex items-center text-2xl font-bold">
            <span className="mr-3" aria-hidden="true">📚</span>
            WILLIAMSCHOOL
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Una plataforma de aprendizaje personalizado: cada estudiante avanza a su ritmo.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {profileId === null ? (
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

      <footer className="bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          WILLIAMSCHOOL © 2026 · Aprendizaje individualizado
        </div>
      </footer>
    </div>
  );
}
