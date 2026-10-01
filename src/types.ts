/**
 * Belentani School - Type Definitions
 * Complete 6-Year Secondary & High School Curriculum,
 * Cognitive-Friendly Windows 7/11 Desktop Suite & EduOffice Tools
 */

export type AcademicYear = '1eso' | '2eso' | '3eso' | '4eso' | '1bach' | '2bach';

export type DesktopWindowId = 
  | 'campus'
  | 'academic'
  | 'office'
  | 'word'
  | 'excel'
  | 'slides'
  | 'edutube'
  | 'cultural'
  | 'arcade'
  | 'chat'
  | 'parental'
  | 'jsonBank'
  | 'auditoria'
  | 'voiceStudio';

export type NavigationTab = DesktopWindowId;

export interface SubjectModule {
  id: string;
  name: string;
  year: AcademicYear;
  yearLabel: string;
  category: 'ciencias' | 'letras' | 'idiomas' | 'humanidades' | 'tecnologia';
  icon: string;
  color: string;
  description: string;
  topics: TopicLesson[];
  exercises: Exercise[];
  examReview: ExamReview;
}

export interface TopicLesson {
  id: string;
  title: string;
  subtitle: string;
  portugueseBridge?: string;
  catalanBridge?: string;
  summary: string;
  keyConcepts: {
    term: string;
    pt: string;
    es: string;
    ca: string;
    en: string;
    explanation: string;
  }[];
  interactiveExample: {
    prompt: string;
    stepByStep: string[];
    ruleBox: string;
  };
}

export interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  portugueseTip?: string;
  difficulty: 'fácil' | 'medio' | 'avanzado';
  subject: string;
}

export interface ExamReview {
  title: string;
  objectives: string[];
  formulaSheet: string[];
  mockQuestions: {
    q: string;
    a: string;
  }[];
}

export interface CulturalGuideItem {
  id: string;
  category: 'vida_diaria' | 'lenguaje_instituto' | 'musica_baile' | 'fiestas_tradiciones' | 'socializacion';
  title: string;
  icon: string;
  description: string;
  spainHabit: string;
  brazilComparison: string;
  daniloTip: string;
  audioPhrase?: string;
  tags: string[];
}

export interface FalseFriendItem {
  pt: string;
  trap: string;
  correctEs: string;
  ca: string;
  en: string;
  example: string;
  trapMeaning: string;
}

export interface GameItem {
  id: string;
  title: string;
  genre: string;
  icon: string;
  tag: string;
  subjectFocus: string;
  description: string;
  badgeColor: string;
  componentKey: string;
  difficulty: string;
}

export interface ClassicMiniGame {
  id: string;
  number: number;
  title: string;
  category: string;
  era: '1970s' | '1980s' | '1990s' | '2000s' | 'Retro Moderno';
  difficulty: 'Fácil' | 'Media' | 'Difícil' | 'Extrema';
  rating: number;
  plays: number;
  description: string;
  controls: string;
  educationalSkill: string;
  builtInEngine?: 'pong' | 'breakout' | 'snake' | 'flappy' | 'spaceInvaders' | 'tictactoe' | 'memory' | 'mathShooter' | 'hangman' | 'rhythm' | 'combat' | 'runner' | 'falseFriends' | 'game2048' | 'karaoke' | 'towerDefense' | 'maze' | 'links' | 'superQuiz' | 'virtualCabinet';
  color: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'belentani';
  text: string;
  language?: 'es' | 'ca' | 'en' | 'pt';
  timestamp: string;
  audioPlaying?: boolean;
}

export interface ParentalSettings {
  maxDailyMinutes: number;
  usedMinutesToday: number;
  breakEveryMinutes: number;
  parentPin: string;
  safetyShieldEnabled: boolean;
  dataVaultEncrypted: boolean;
  autoVoiceEnabled: boolean;
  lastBreakTimestamp: number;
}

// EduWord types
export interface WordDocument {
  id: string;
  title: string;
  content: string;
  lastModified: string;
  category: string;
}

// EduExcel types
export interface ExcelCell {
  val: string;
  computed?: string | number;
}

export interface ExcelSpreadsheet {
  title: string;
  rows: number;
  cols: number;
  data: Record<string, string>; // e.g. "A1": "Nota Mates", "B1": "8.5"
}

// EduSlides types
export interface SlideItem {
  id: number;
  title: string;
  bullets: string[];
  speakerNotes: string;
  accentColor: string;
}

// EduTube types
export interface EduTubeVideo {
  id: string;
  title: string;
  duration: string;
  subject: string;
  course: string;
  description: string;
  badge: string;
  keyTakeaway: string;
  /** ID real de YouTube. Si existe, EduTube reproduce el vídeo de verdad. */
  youtubeId?: string;
  /** Canal de origen (solo en vídeos verificados). */
  channel?: string;
}

// --- Campus Unificado: módulos reales traídos de los otros repos ---

export type CampusModuleId = 'biblia' | 'aprende-brasil' | 'open-school' | 'manos-abiertas' | 'belentani';

export interface CampusModule {
  id: CampusModuleId;
  name: string;
  tagline: string;
  description: string;
  sourceRepo: string;
  liveUrl: string;
  /** 'embedded' = contenido real dentro de la app; 'link' = módulo desplegado aparte. */
  integration: 'embedded' | 'link';
  /** Cifras verificadas (no inventadas). */
  metrics: { label: string; value: string }[];
  accent: string;
  icon: string;
}

// Datos reales de aprende-brasil (public/modules/aprende-brasil/curriculum.json)
export interface CurriculumTrack {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  color: string;
  icon: string;
  target_modules: number;
  module_count: number;
}

export interface CurriculumStep {
  order: number;
  type: string;
  title: string;
  content: string;
}

export interface CurriculumModule {
  id: string;
  track_id: string;
  title: string;
  subtitle: string;
  level: string;
  level_order: number;
  duration_min: number;
  age_group: string;
  objectives: string[];
  featured: boolean;
  accent: string;
  icon: string;
  steps: CurriculumStep[];
}

export interface CurriculumFile {
  tracks: CurriculumTrack[];
  modules: CurriculumModule[];
}

// Vídeos verificados (public/modules/edutube/videos.json)
export interface VerifiedVideo {
  id: string;
  title: string;
  channel: string;
  subject: string;
  course: string;
  topics: string[];
  thumbnail: string;
  watchUrl: string;
  embedUrl: string;
}

export interface VerifiedVideoFile {
  source: string;
  generatedAtUtc: string;
  disclaimer: string;
  count: number;
  allowlist: string[];
  videos: VerifiedVideo[];
}

// Companion ("consciencia entre comillas") types
export type CompanionLanguage = 'pt' | 'es' | 'ca' | 'en';

export type CompanionProvider = 'huggingface' | 'offline';

export interface CompanionMessage {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  at: number;
  provider?: CompanionProvider;
}
