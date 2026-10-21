// src/utils/progress/storage.ts
export class ProgressStorage {
  static readonly STORAGE_KEY = 'williamschool_progress';

  static getProfileProgress(profileId: string): ProgressData {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return this.createDefaultProgress(profileId);
    }

    try {
      const parsed = JSON.parse(data);
      return parsed.profiles[profileId] || this.createDefaultProgress(profileId);
    } catch (error) {
      console.error('Error al parsear el progreso:', error);
      return this.createDefaultProgress(profileId);
    }
  }

  static saveProfileProgress(profileId: string, progress: ProgressData): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    const storageData = data ? JSON.parse(data) : { profiles: {} };

    storageData.profiles[profileId] = progress;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storageData));
  }

  static createDefaultProgress(profileId: string): ProgressData {
    return {
      profileId,
      completedLessons: [],
      currentLesson: null,
      lastUpdated: new Date().toISOString()
    };
  }
}

export interface ProgressData {
  profileId: string;
  completedLessons: string[]; // IDs de lecciones completadas
  currentLesson: string | null; // ID de la lección actual
  lastUpdated: string; // ISO string de la última actualización
}
