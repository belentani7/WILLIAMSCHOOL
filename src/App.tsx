/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab, ParentalSettings } from './types';
import { Header } from './components/Header';
import { AcademicPlan } from './components/AcademicPlan';
import { CulturalTutor } from './components/CulturalTutor';
import { ArcadeCenter } from './components/ArcadeCenter';
import { AITutorChat } from './components/AITutorChat';
import { ParentalShield } from './components/ParentalShield';
import { JsonBankExplorer } from './components/JsonBankExplorer';
import { SuperpowerAuditoria } from './components/SuperpowerAuditoria';
import { EduOfficeSuite } from './components/EduOfficeSuite';
import { EduTube } from './components/EduTube';
import { VoiceStudioModal } from './components/VoiceStudioModal';
import { playSoundSuccess } from './utils/speech';
import { Eye, ShieldCheck, Heart, Sparkles, Volume2, Monitor } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('academic');
  const [studyMinutes, setStudyMinutes] = useState<number>(14);
  const [showEyeBreakModal, setShowEyeBreakModal] = useState<boolean>(false);
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState<boolean>(false);
  const [parentalSettings, setParentalSettings] = useState<ParentalSettings>({
    maxDailyMinutes: 60,
    usedMinutesToday: 14,
    breakEveryMinutes: 20,
    safetyShieldEnabled: true,
    dataVaultEncrypted: true,
    autoVoiceEnabled: true,
    parentPin: '1234'
  });

  // Track study time and fire eye-break reminders
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyMinutes(prev => {
        const updated = prev + 1;
        setParentalSettings(ps => ({ ...ps, usedMinutesToday: updated }));
        if (updated % parentalSettings.breakEveryMinutes === 0) {
          setShowEyeBreakModal(true);
        }
        return updated;
      });
    }, 60000); // every minute

    return () => clearInterval(timer);
  }, [parentalSettings.breakEveryMinutes]);

  const handleTabChange = (tab: NavigationTab) => {
    playSoundSuccess();
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50/40 to-slate-200 text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white font-sans">
      {/* Windows Aero Header */}
      <Header
        activeTab={currentTab}
        onSelectTab={handleTabChange}
        onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
        minutesUsed={studyMinutes}
        maxMinutes={parentalSettings.maxDailyMinutes}
        safetyShieldActive={parentalSettings.safetyShieldEnabled}
        autoVoiceEnabled={parentalSettings.autoVoiceEnabled}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Eye Break Alert Modal (20-20-20 Rule) */}
        {showEyeBreakModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white p-6 max-w-md w-full rounded-2xl text-center space-y-4 shadow-2xl border border-blue-300">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto border border-blue-300">
                <Eye className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">¡Momento de Descanso Ocular, Danilo!</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Han pasado 20 minutos de estudio activo. Para proteger tu vista según la regla 20-20-20, mira a un punto lejano por la ventana durante 20 segundos y parpadea suavemente.
                </p>
              </div>
              <button
                onClick={() => setShowEyeBreakModal(false)}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md transition-colors"
              >
                He descansado la vista, ¡continuar!
              </button>
            </div>
          </div>
        )}

        {/* Tab View Switching */}
        {currentTab === 'academic' && <AcademicPlan />}

        {currentTab === 'office' && <EduOfficeSuite />}

        {currentTab === 'edutube' && <EduTube />}

        {currentTab === 'cultural' && <CulturalTutor />}

        {currentTab === 'arcade' && <ArcadeCenter />}

        {currentTab === 'chat' && <AITutorChat />}

        {currentTab === 'parental' && (
          <ParentalShield
            settings={parentalSettings}
            onUpdateSettings={setParentalSettings}
          />
        )}

        {currentTab === 'jsonBank' && <JsonBankExplorer />}

        {currentTab === 'auditoria' && <SuperpowerAuditoria />}
      </main>

      {/* Voice Tuning Studio Modal */}
      <VoiceStudioModal
        isOpen={isVoiceStudioOpen}
        onClose={() => setIsVoiceStudioOpen(false)}
      />

      {/* Windows 11 / Aero Bottom Taskbar & Status Footer */}
      <footer className="w-full border-t border-slate-300/80 bg-white/80 backdrop-blur-md py-3 px-4 sm:px-6 mt-auto text-slate-600 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Blindaje de Menor Activo</span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-700">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Estudio hoy: <strong className="text-slate-900">{studyMinutes} min</strong></span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Metodología Krashen & Jubran (Filtro Afectivo y Andamiaje PT-ES)</span>
            <span>•</span>
            <span className="text-blue-700 font-bold">Belentani School © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
