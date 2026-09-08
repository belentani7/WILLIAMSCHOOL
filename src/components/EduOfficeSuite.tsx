import React, { useState } from 'react';
import { EduWord } from './EduWord';
import { EduExcel } from './EduExcel';
import { EduSlides } from './EduSlides';
import { FileText, Table, Presentation, Sparkles } from 'lucide-react';
import { playSoundSuccess } from '../utils/speech';

export const EduOfficeSuite: React.FC = () => {
  const [activeApp, setActiveApp] = useState<'word' | 'excel' | 'slides'>('word');

  const handleSwitchApp = (app: 'word' | 'excel' | 'slides') => {
    playSoundSuccess();
    setActiveApp(app);
  };

  return (
    <div className="space-y-4">
      {/* Top Windows 11 / Aero Navigation Bar for Office Suite */}
      <div className="bg-white rounded-2xl p-3 shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>EduOffice Suite 2026 · Danilo</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleSwitchApp('word')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeApp === 'word'
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>EduWord (Redactor & Tutor PT-ES)</span>
            </button>

            <button
              onClick={() => handleSwitchApp('excel')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeApp === 'excel'
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>EduExcel (Hojas de Mates & Notas)</span>
            </button>

            <button
              onClick={() => handleSwitchApp('slides')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeApp === 'slides'
                  ? 'bg-orange-600 text-white shadow-sm ring-2 ring-orange-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Presentation className="w-4 h-4" />
              <span>EduSlides (Presentaciones Orales)</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-500 hidden md:block">
          Auto-guardado seguro en memoria local
        </div>
      </div>

      {/* Embedded Active Application with A4 / Canvas Height */}
      <div className="h-[750px]">
        {activeApp === 'word' && <EduWord />}
        {activeApp === 'excel' && <EduExcel />}
        {activeApp === 'slides' && <EduSlides />}
      </div>
    </div>
  );
};
