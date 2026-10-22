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
      // Browser storage is editable by extensions, DevTools and other scripts.
      // Limit parsing cost and validate both shape and every completed lesson.
      if (raw.length > 256_000) throw new RangeError('Progress exceeds the local limit');
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && 'profiles' in parsed &&
          Array.isArray(parsed.profiles) && parsed.profiles.length >= 1 &&
          parsed.profiles.length <= 8) {
        const profiles: LearnerProfile[] = [];
        const ids = new Set<string>();
        for (const value of parsed.profiles) {
          if (!value || typeof value !== 'object' || Array.isArray(value)) break;
          const profile = value as Partial<LearnerProfile>;
          if (typeof profile.id !== 'string' || profile.id.length < 1 ||
              profile.id.length > 80 || ids.has(profile.id) ||
              typeof profile.name !== 'string' || profile.name.trim().length < 1 ||
              profile.name.length > 40 || !Array.isArray(profile.completed) ||
              profile.completed.length > 5000 ||
              !profile.completed.every(key => typeof key === 'string' &&
                key.length > 0 && key.length <= 180)) break;
          ids.add(profile.id);
          profiles.push({
            id: profile.id,
            name: profile.name,
            completed: [...new Set(profile.completed)],
          });
        }
        if (profiles.length === parsed.profiles.length) {
          const candidate = 'activeProfileId' in parsed ? parsed.activeProfileId : null;
          const activeProfileId = typeof candidate === 'string' && ids.has(candidate)
            ? candidate : profiles[0].id;
          return { activeProfileId, profiles };
        }
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
  if (!name.trim() || progress.profiles.length >= 8) {
    throw new RangeError('Provide a learner name; eight profiles maximum');
  }
  const profile = newProfile(name);
  return { activeProfileId: profile.id, profiles: [...progress.profiles, profile] };
}

export function completeLesson(progress: LearningProgress, key: string): LearningProgress {
  if (!key || key.length > 180) throw new RangeError('Invalid lesson key');
  return {
    ...progress,
    profiles: progress.profiles.map(profile => profile.id === progress.activeProfileId &&
      profile.completed.length < 5000 && !profile.completed.includes(key)
      ? { ...profile, completed: [...profile.completed, key] }
      : profile),
  };
}
