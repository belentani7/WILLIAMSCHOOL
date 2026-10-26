export type AcademicYear = '1eso' | '2eso' | '3eso' | '4eso' | '1bach' | '2bach';

export interface KeyConcept {
  term: string;
  pt: string;
  es: string;
  ca: string;
  en: string;
  explanation: string;
}

export interface TopicLesson {
  id: string;
  title: string;
  subtitle: string;
  portugueseBridge: string;
  catalanBridge: string;
  summary: string;
  keyConcepts: KeyConcept[];
  interactiveExample: {
    prompt: string;
    stepByStep: string[];
    ruleBox: string;
  };
  portugueseTip?: string;
}

export interface Exercise {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: string;
  portugueseTip?: string;
}

export interface SubjectModule {
  id: string;
  name: string;
  year: AcademicYear;
  yearLabel: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  topics: TopicLesson[];
  exercises: Exercise[];
  examReview: {
    title: string;
    objectives: string[];
    formulaSheet: string[];
    mockQuestions: { q: string; a: string }[];
  };
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

export interface CulturalGuideItem {
  id: string;
  category: string;
  title: string;
  icon: string;
  description: string;
  spainHabit: string;
  brazilComparison: string;
  studentTip: string;
  audioPhrase: string;
  tags: string[];
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

export interface EduTubeVideo {
  id: string;
  title: string;
  duration: string;
  subject: string;
  course: string;
  badge: string;
  description: string;
  keyTakeaway: string;
}

export type MiniGameEngine =
  | 'pong' | 'spaceInvaders' | 'breakout' | 'snake' | 'flappy'
  | 'hangman' | 'falseFriends' | 'virtualCabinet';

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
  builtInEngine: MiniGameEngine | string;
  color: string;
}
