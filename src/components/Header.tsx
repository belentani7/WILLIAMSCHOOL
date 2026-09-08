import React, { useState } from 'react';
import { ShieldCheck, Volume2, VolumeX, Sparkles, User, Heart, Mic, SlidersHorizontal, Monitor } from 'lucide-react';
import { speakBelentani, stopSpeaking, playSoundSuccess } from '../utils/speech';
import { NavigationTab } from '../types';

interface HeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenVoiceStudio: () => void;
  minutesUsed?: number;
  maxMinutes?: number;
  safetyShieldActive?: boolean;
  autoVoiceEnabled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenVoiceStudio,
  minutesUsed = 14,
  maxMinutes = 60,
  safetyShieldActive = true,
  autoVoiceEnabled = true
}) => {
  const [isSpeakingWelcome, setIsSpeakingWelcome] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);

  const handleVoiceGreeting = () => {
    if (isSpeakingWelcome) {
      stopSpeaking();
      setIsSpeakingWelcome(false);
      return;
    }

    setIsSpeakingWelcome(true);
    playSoundSuccess();
    const greetingText = 
      "¡Hola William Danilo! Bienvenido a Belentani School. Soy Belentani, tu tutor, cantante y compañero de estudio. " +
      "He preparado para ti el currículo completo de la ESO y Bachillerato, la suite EduOffice con Word y Excel, y un espacio seguro para aprender sin estrés. " +
      "¡Mucho ánimo, guerrero! Cada día estás más cerca del éxito escolar.";

    speakBelentani(greetingText, {
      lang: 'es',
      rate: 0.92,
      onEnd: () => setIsSpeakingWelcome(false)
    });
  };

  const navItems: { id: NavigationTab; label: string; icon: string }[] = [
    { id: 'academic', label: 'Plan ESO (1º a 2º Bach)', icon: '🎓' },
    { id: 'office', label: 'EduOffice Pack', icon: '💼' },
    { id: 'edutube', label: 'EduTube Aula', icon: '📺' },
    { id: 'cultural', label: 'Acogida Cultural', icon: '🌍' },
    { id: 'arcade', label: 'Arcade Belentani', icon: '🎮' },
    { id: 'chat', label: 'IA Amiga & Voz', icon: '🤖' },
    { id: 'parental', label: 'Control & Salud', icon: '🛡️' },
    { id: 'jsonBank', label: 'Banco JSON & Python', icon: '🐍' },
    { id: 'auditoria', label: 'Superpoderes', icon: '⚡' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-slate-700/60 shadow-lg text-slate-100">
      {/* Windows 11 Fluent / Aero Top Task Info Bar */}
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-sky-300">
            <Monitor className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wide text-[11px]">Belentani Edu-OS · Windows Aero & Fluent</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-300">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold text-white">William Danilo</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">14 años (Brasil 🇧🇷 → 🇪🇸 España & Catalunya)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Safety shield */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Blindaje Infantil {safetyShieldActive ? 'Activo' : 'Pausado'}</span>
          </div>

          {/* Time tracker */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[11px]">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>{minutesUsed} / {maxMinutes} min</span>
          </div>

          {/* Voice Tuning Studio Button */}
          <button
            onClick={onOpenVoiceStudio}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 border border-sky-400/30 transition-all shadow-sm"
            title="Ajustar tono, acento y voz humana natural de Belentani"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-300" />
            <span className="hidden md:inline">Voz Humana</span>
          </button>

          {/* Quick Voice Greeting Button */}
          <button
            onClick={handleVoiceGreeting}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-sm ${
              isSpeakingWelcome 
                ? 'bg-amber-500 text-black animate-pulse' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-110 shadow-md'
            }`}
            title="Escuchar saludo con la voz de Belentani para Danilo"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{isSpeakingWelcome ? 'Voz Hablando...' : 'Saludar con Voz'}</span>
          </button>

          {/* Mute button */}
          <button 
            onClick={() => {
              if (!soundMuted) stopSpeaking();
              setSoundMuted(!soundMuted);
            }}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title={soundMuted ? "Activar audio" : "Silenciar audio"}
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
          </button>
        </div>
      </div>

      {/* Main Bar with Belentani Portrait & Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={handleVoiceGreeting}>
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/20 shadow-md p-0.5 bg-gradient-to-br from-blue-600 via-sky-500 to-slate-700">
              <img 
                src="/assets/belentani.jpg" 
                alt="Belentani Guerrero y Cantante" 
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  <span className="bg-gradient-to-r from-white via-sky-100 to-blue-200 bg-clip-text text-transparent">
                    BELENTANI
                  </span>
                  <span className="text-sky-400">SCHOOL</span>
                </h1>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-900/60 text-blue-200 border border-blue-500/30">
                  AERO 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Tutor ESO · Acogida Cultural Brasil-España · Voz Humana
              </p>
            </div>
          </div>
        </div>

        {/* Windows 11 Taskbar-style Floating Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            // Arcade tab gets a special red glow highlight to respect "déjalo solo para juegos"
            const isArcade = item.id === 'arcade';

            return (
              <button
                key={item.id}
                onClick={() => {
                  playSoundSuccess();
                  onSelectTab(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? isArcade
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md ring-2 ring-red-400/50'
                      : 'bg-white text-slate-900 shadow-md ring-2 ring-blue-400/50 font-bold'
                    : 'bg-slate-800/70 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/40'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
