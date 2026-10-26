export interface ProgressData {
  profileId: string;
  completedLessons: string[];
  currentLesson: string | null;
  lastUpdated: string;
}

interface StoredProgress {
  profiles: Record<string, ProgressData>;
}

export class ProgressStorage {
  static readonly STORAGE_KEY = 'williamschool_progress';

  static getProfileProgress(profileId: string): ProgressData {
    try {
      const stored = this.readStore();
      const progress = stored.profiles[profileId];
      if (!progress || !Array.isArray(progress.completedLessons)) {
        return this.createDefaultProgress(profileId);
      }
      return {
        ...this.createDefaultProgress(profileId),
        ...progress,
        profileId,
        completedLessons: progress.completedLessons.filter((id): id is string => typeof id === 'string'),
        currentLesson: typeof progress.currentLesson === 'string' ? progress.currentLesson : null,
      };
    } catch (error) {
      console.error('No se pudo leer el progreso guardado:', error);
      return this.createDefaultProgress(profileId);
    }
  }

  static saveProfileProgress(profileId: string, progress: ProgressData): void {
    const stored = this.readStore();
    stored.profiles[profileId] = {
      ...progress,
      profileId,
      completedLessons: Array.from(new Set(progress.completedLessons)),
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stored));
  }

  static createDefaultProgress(profileId: string): ProgressData {
    return {
      profileId,
      completedLessons: [],
      currentLesson: null,
      lastUpdated: new Date().toISOString(),
    };
  }

  private static readStore(): StoredProgress {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return { profiles: {} };

    try {
      const parsed: unknown = JSON.parse(raw);
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'profiles' in parsed &&
        typeof parsed.profiles === 'object' &&
        parsed.profiles !== null &&
        !Array.isArray(parsed.profiles)
      ) {
        return { profiles: parsed.profiles as Record<string, ProgressData> };
      }
    } catch (error) {
      console.error('El almacenamiento de progreso contiene JSON inválido:', error);
    }

    return { profiles: {} };
  }
}
