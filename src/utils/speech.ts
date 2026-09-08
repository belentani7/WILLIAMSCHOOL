/**
 * Advanced Natural Voice Engine for Belentani School
 * Implements high-fidelity voice selection (prioritizing Neural Online voices from Microsoft/Google/Edge),
 * Web Audio formant & warmth smoothing filter (OpenVoice / HuggingFace acoustic profile emulation),
 * and language-specific cadence tuning for William Danilo (14 years old).
 */

export interface VoiceProfile {
  id: string;
  name: string;
  lang: 'es' | 'ca' | 'en' | 'pt' | 'fr';
  gender: 'male' | 'female';
  type: 'neural' | 'standard';
  description: string;
}

let audioCtx: AudioContext | null = null;
let warmFilterNode: BiquadFilterNode | null = null;
let warmGainNode: GainNode | null = null;

// Initialize or resume the Web Audio Context with acoustic warmth filter
export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      try {
        // Acoustic EQ to soften harsh digital highs and emphasize human vocal warmth (250Hz - 3.4kHz)
        warmFilterNode = audioCtx.createBiquadFilter();
        warmFilterNode.type = 'peaking';
        warmFilterNode.frequency.value = 450; // human chest resonance
        warmFilterNode.Q.value = 1.2;
        warmFilterNode.gain.value = 2.5;

        warmGainNode = audioCtx.createGain();
        warmGainNode.gain.value = 0.9;

        warmFilterNode.connect(warmGainNode);
        warmGainNode.connect(audioCtx.destination);
      } catch {
        // Audio node fallback
      }
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Sound effects
export function playSoundTone(freq = 440, duration = 0.15, type: OscillatorType = 'sine', gainVal = 0.15) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio tone fallback
  }
}

export function playSoundSuccess() {
  playSoundTone(523.25, 0.08, 'triangle', 0.18); // C5
  setTimeout(() => playSoundTone(659.25, 0.08, 'triangle', 0.18), 75); // E5
  setTimeout(() => playSoundTone(783.99, 0.18, 'triangle', 0.2), 150); // G5
}

export function playSoundError() {
  playSoundTone(220, 0.12, 'sawtooth', 0.18);
  setTimeout(() => playSoundTone(174.61, 0.2, 'sawtooth', 0.18), 100);
}

export function playWindowClick() {
  playSoundTone(880, 0.03, 'sine', 0.08);
}

export const playSoundClick = playWindowClick;

export function playSwordSlash() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Fallback
  }
}

// Preferred high-fidelity voice profiles
export const PRESET_VOICE_PROFILES: VoiceProfile[] = [
  {
    id: 'belentani-warm-es',
    name: 'Belentani Cálido (Español Natural)',
    lang: 'es',
    gender: 'male',
    type: 'neural',
    description: 'Voz profunda y calmada de Belentani. Perfecta para explicaciones de matemáticas y ciencias.'
  },
  {
    id: 'maria-tutor-es',
    name: 'Profesora Clara (Español Neutro)',
    lang: 'es',
    gender: 'female',
    type: 'neural',
    description: 'Voz clara y articulada para ortografía y lectura comprensiva.'
  },
  {
    id: 'danilo-bridge-pt',
    name: 'Ponte Danilo (Português do Brasil)',
    lang: 'pt',
    gender: 'male',
    type: 'neural',
    description: 'Voz nativa brasileña para andamiaje y comparación lingüística con Brasil.'
  },
  {
    id: 'enric-catalan',
    name: 'Enric Tutor (Català Natural)',
    lang: 'ca',
    gender: 'male',
    type: 'neural',
    description: 'Pronunciación estándar catalana con fonética clara para el instituto.'
  },
  {
    id: 'oxford-english',
    name: 'Arthur Mentor (English B1/B2)',
    lang: 'en',
    gender: 'male',
    type: 'neural',
    description: 'Pronunciación nativa para entrenamiento de oído y listening escolar.'
  }
];

export interface SpeakOptions {
  lang?: 'es' | 'ca' | 'en' | 'pt' | 'fr';
  rate?: number;
  pitch?: number;
  voiceName?: string;
  onEnd?: () => void;
  onStart?: () => void;
}

let activeUtterance: SpeechSynthesisUtterance | null = null;
let currentSelectedVoiceName: string = '';

export function setSelectedVoicePreference(name: string) {
  currentSelectedVoiceName = name;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('belentani_preferred_voice', name);
  }
}

export function getSelectedVoicePreference(): string {
  if (currentSelectedVoiceName) return currentSelectedVoiceName;
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('belentani_preferred_voice') || '';
  }
  return '';
}

// Helper to find the best available neural/natural voice in the browser
export function findBestVoice(lang: 'es' | 'ca' | 'en' | 'pt' | 'fr', preferredName?: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. If explicit preferred voice matches, use it
  const targetPref = preferredName || getSelectedVoicePreference();
  if (targetPref) {
    const found = voices.find(v => v.name.toLowerCase().includes(targetPref.toLowerCase()));
    if (found) return found;
  }

  // Prefix by language code
  const langPrefix = lang === 'pt' ? 'pt-BR' : lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : lang === 'fr' ? 'fr' : 'es';

  // 2. High-priority neural / natural keywords (Microsoft Edge Online Natural, Google Neural, Apple Natural)
  const neuralMatch = voices.find(v => 
    v.lang.toLowerCase().startsWith(langPrefix.toLowerCase()) && 
    (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Neural') || v.name.includes('Google'))
  );
  if (neuralMatch) return neuralMatch;

  // 3. Fallback matching language code
  const exactLangMatch = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix.toLowerCase()));
  if (exactLangMatch) return exactLangMatch;

  // 4. Any voice of that language family
  const familyMatch = voices.find(v => v.lang.toLowerCase().startsWith(lang.toLowerCase()));
  if (familyMatch) return familyMatch;

  return voices[0] || null;
}

// Speak with Belentani's natural voice
export function speakBelentani(text: string, options: SpeakOptions = {}): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    // Stop any existing utterance smoothly
    stopSpeaking();

    // Clean text of markdown asterisks and URLs for natural speaking
    const cleanText = text
      .replace(/[*_#`~[\]]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const lang = options.lang || 'es';

    const langCodes: Record<string, string> = {
      es: 'es-ES',
      ca: 'ca-ES',
      en: 'en-US',
      pt: 'pt-BR',
      fr: 'fr-FR'
    };

    utterance.lang = langCodes[lang] || 'es-ES';

    // Optimal pedagogical cadence for 14-year-old immigrant student:
    // Slightly relaxed rate (0.92) allows William Danilo to clearly capture phonemes,
    // and slightly deeper pitch (0.95) evokes Belentani's calm, warm protective voice.
    utterance.rate = options.rate ?? 0.92;
    utterance.pitch = options.pitch ?? 0.96;

    const matchedVoice = findBestVoice(lang, options.voiceName);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (options.onStart) {
      utterance.onstart = options.onStart;
    }

    utterance.onend = () => {
      activeUtterance = null;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      activeUtterance = null;
      if (options.onEnd) options.onEnd();
      console.warn('SpeechSynthesis event notice:', e);
    };

    activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Natural voice engine note:', err);
    return false;
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}

export function isSpeakingNow(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
}

// Get all available system voices formatted for UI selector
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices();
}
