import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, Sliders, CheckCircle2, Play, Sparkles, X, User } from 'lucide-react';
import { 
  speakBelentani, stopSpeaking, getAvailableVoices, 
  setSelectedVoicePreference, getSelectedVoicePreference, 
  PRESET_VOICE_PROFILES, VoiceProfile, playSoundSuccess 
} from '../utils/speech';

interface VoiceStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceStudioModal: React.FC<VoiceStudioModalProps> = ({ isOpen, onClose }) => {
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>(getSelectedVoicePreference());
  const [testText, setTestText] = useState<string>(
    "¡Hola William Danilo! Esta es mi voz humana natural para explicarte matemáticas y acompañarte en el instituto."
  );
  const [speechRate, setSpeechRate] = useState<number>(0.92);
  const [speechPitch, setSpeechPitch] = useState<number>(0.96);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const load = () => {
        const v = getAvailableVoices();
        setSystemVoices(v);
      };
      load();
      window.speechSynthesis.onvoiceschanged = load;
    }
  }, []);

  if (!isOpen) return null;

  const handleTestVoice = (textToSay?: string, langCode: 'es' | 'ca' | 'en' | 'pt' = 'es') => {
    playSoundSuccess();
    setIsSpeaking(true);
    speakBelentani(textToSay || testText, {
      lang: langCode,
      rate: speechRate,
      pitch: speechPitch,
      voiceName: selectedVoiceName,
      onEnd: () => setIsSpeaking(false)
    });
  };

  const handleSelectPreset = (p: VoiceProfile) => {
    playSoundSuccess();
    setSelectedVoiceName(p.name);
    setSelectedVoicePreference(p.name);
  };

  const handleSelectSystemVoice = (name: string) => {
    setSelectedVoiceName(name);
    setSelectedVoicePreference(name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Aero Windows Style */}
        <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Estudio de Voz Humana Natural</h3>
              <p className="text-xs text-blue-100">Configura la voz más natural para William Danilo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs">
          {/* Preset natural profiles */}
          <div>
            <label className="font-bold text-sm text-slate-900 mb-2 block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Perfiles Vocales Recomendados (Neurales de Alta Fidelidad):</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_VOICE_PROFILES.map((p) => {
                const isSelected = selectedVoiceName.includes(p.name);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-400 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-900">{p.name}</span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                        {p.lang}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{p.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System voices selector */}
          <div>
            <label className="font-bold text-xs text-slate-700 mb-1.5 block">
              Todas las Voces Detectadas en tu Navegador / Sistema ({systemVoices.length}):
            </label>
            <select
              value={selectedVoiceName}
              onChange={(e) => handleSelectSystemVoice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="">Seleccionar automáticamente la mejor voz neural disponible</option>
              {systemVoices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang}) {v.name.includes('Natural') || v.name.includes('Online') ? '⭐ NEURAL RECOMENDADA' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Sliders: Cadence and Tone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div className="flex justify-between font-bold text-xs text-slate-700 mb-1">
                <span>Velocidad de Lectura:</span>
                <span className="text-blue-700 font-mono">{speechRate}x</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.2"
                step="0.02"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[10px] text-slate-400">0.92x es la cadencia óptima para comprensión pedagógica.</span>
            </div>

            <div>
              <div className="flex justify-between font-bold text-xs text-slate-700 mb-1">
                <span>Calidez de Tono:</span>
                <span className="text-blue-700 font-mono">{speechPitch}</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.2"
                step="0.02"
                value={speechPitch}
                onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[10px] text-slate-400">0.96 aporta mayor calidez y profundidad masculina humana.</span>
            </div>
          </div>

          {/* Test area */}
          <div>
            <label className="font-bold text-xs text-slate-700 mb-1.5 block">
              Prueba de Audio en Vivo:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-600"
              />
              <button
                onClick={() => handleTestVoice()}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isSpeaking ? 'Hablando...' : 'Probar'}</span>
              </button>
            </div>

            {/* Quick language buttons */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] text-slate-500">Frases de muestra:</span>
              <button
                onClick={() => handleTestVoice("En català: Aïllar la incògnita i aplicar el teorema de Pitàgores.", 'ca')}
                className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-[11px] font-medium"
              >
                Català
              </button>
              <button
                onClick={() => handleTestVoice("Em português: As regras de isolar o x são idênticas, Danilo!", 'pt')}
                className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-[11px] font-medium"
              >
                Português
              </button>
              <button
                onClick={() => handleTestVoice("In English: Practice makes perfect in your high school exams.", 'en')}
                className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-[11px] font-medium"
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Filtro Acústico de Confort Web Audio Activado</span>
          </div>
          <button
            onClick={() => {
              playSoundSuccess();
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow"
          >
            Guardar y Aplicar Voz
          </button>
        </div>
      </div>
    </div>
  );
};
