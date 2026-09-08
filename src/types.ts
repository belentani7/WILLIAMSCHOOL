/**
 * Belentani School - Type Definitions
 * Complete 6-Year Secondary & High School Curriculum,
 * Cognitive-Friendly Windows 7/11 Desktop Suite & EduOffice Tools
 */

export type AcademicYear = '1eso' | '2eso' | '3eso' | '4eso' | '1bach' | '2bach';

export type DesktopWindowId = 
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
}
