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
  // Only used when the browser refuses persistence; never presented as durable.
  private static readonly sessionProgress = new Map<string, ProgressData>();

  static listProfileIds(): string[] {
    return Array.from(new Set([
      ...Object.keys(this.readStore()?.profiles ?? {}),
      ...this.sessionProgress.keys(),
    ]));
  }

  static getProfileProgress(profileId: string): ProgressData {
    const stored = this.sessionProgress.get(profileId) ?? this.readStore()?.profiles[profileId];
    if (!stored || !Array.isArray(stored.completedLessons)) {
      return this.createDefaultProgress(profileId);
    }
    return {
      ...this.createDefaultProgress(profileId),
      ...stored,
      profileId,
      completedLessons: stored.completedLessons.filter((id): id is string => typeof id === 'string'),
      currentLesson: typeof stored.currentLesson === 'string' ? stored.currentLesson : null,
    };
  }

  /** Returns false if progress is available only in memory for this tab. */
  static saveProfileProgress(profileId: string, progress: ProgressData): boolean {
    const next: ProgressData = {
      ...progress,
      profileId,
      completedLessons: Array.from(new Set(progress.completedLessons)),
      lastUpdated: new Date().toISOString(),
    };
    try {
      const stored = this.readStore();
      if (!stored) throw new Error('No se puede leer el progreso anterior');
      stored.profiles[profileId] = next;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stored));
      this.sessionProgress.delete(profileId);
      return true;
    } catch {
      // Safari private mode, disabled storage and quota limits must not crash study.
      this.sessionProgress.set(profileId, next);
      return false;
    }
  }

  static createDefaultProgress(profileId: string): ProgressData {
    return {
      profileId,
      completedLessons: [],
      currentLesson: null,
      lastUpdated: new Date().toISOString(),
    };
  }

  private static readStore(): StoredProgress | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return { profiles: {} };
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
    } catch {
      // Damaged JSON or blocked reads: never overwrite an unreadable document.
      return null;
    }
    return null;
  }
}
