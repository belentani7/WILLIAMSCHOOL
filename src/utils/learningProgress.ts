const STORAGE_KEY = 'belentani-school:learning-progress:v1';

export interface LearnerProfile {
  id: string;
  name: string;
  completed: string[];
}

interface LearningProgress {
  activeProfileId: string;
  profiles: LearnerProfile[];
}

const newProfile = (name: string): LearnerProfile => ({
  id: crypto.randomUUID(),
  name: name.trim().slice(0, 40),
  completed: [],
});

export const lessonKey = (moduleId: string, topicId: string) => `${moduleId}:${topicId}`;

export function loadLearningProgress(): LearningProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as LearningProgress;
      if (Array.isArray(parsed.profiles) && parsed.profiles.length > 0 &&
          parsed.profiles.every(profile => typeof profile.id === 'string' && typeof profile.name === 'string' && Array.isArray(profile.completed))) {
        return {
          activeProfileId: parsed.profiles.some(profile => profile.id === parsed.activeProfileId)
            ? parsed.activeProfileId : parsed.profiles[0].id,
          profiles: parsed.profiles,
        };
      }
    }
  } catch {
    // Private browsing or damaged local data must not prevent study.
  }
  const profile = newProfile('Mi aprendizaje');
  return { activeProfileId: profile.id, profiles: [profile] };
}

export function saveLearningProgress(progress: LearningProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Progress remains available in memory for this session.
  }
}

export function createLearner(progress: LearningProgress, name: string): LearningProgress {
  const profile = newProfile(name);
  return { activeProfileId: profile.id, profiles: [...progress.profiles, profile] };
}

export function completeLesson(progress: LearningProgress, key: string): LearningProgress {
  return {
    ...progress,
    profiles: progress.profiles.map(profile => profile.id === progress.activeProfileId && !profile.completed.includes(key)
      ? { ...profile, completed: [...profile.completed, key] }
      : profile),
  };
}
