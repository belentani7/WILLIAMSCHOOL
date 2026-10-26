type SpeechLanguage = 'es' | 'ca' | 'en';

interface SpeakOptions {
  lang?: SpeechLanguage;
  rate?: number;
  pitch?: number;
  volume?: number;
}

const LANGUAGES: Record<SpeechLanguage, string> = {
  es: 'es-ES',
  ca: 'ca-ES',
  en: 'en-GB',
};

/** Read text aloud when the browser provides speech synthesis; fail quietly otherwise. */
export function speakBelentani(text: string, options: SpeakOptions = {}): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text.trim()) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGES[options.lang ?? 'es'];
    utterance.rate = Math.min(1.5, Math.max(0.6, options.rate ?? 1));
    utterance.pitch = Math.min(2, Math.max(0.5, options.pitch ?? 1));
    utterance.volume = Math.min(1, Math.max(0, options.volume ?? 1));
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn('La síntesis de voz no está disponible en este navegador.', error);
  }
}

function playTone(frequency: number, durationMs: number): void {
  if (typeof window === 'undefined') return;
  const AudioContextConstructor = window.AudioContext;
  if (!AudioContextConstructor) return;

  try {
    const context = new AudioContextConstructor();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + durationMs / 1000);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + durationMs / 1000 + 0.02);
    oscillator.onended = () => { void context.close().catch(() => undefined); };
  } catch {
    // Audio feedback is optional and must never break the learning activity.
  }
}

export function playSoundSuccess(): void {
  playTone(660, 90);
}

export function playSoundError(): void {
  playTone(220, 130);
}
