import React, { useState } from 'react';
import { Presentation, Play, ChevronLeft, ChevronRight, Volume2, Plus, Sparkles, Layout } from 'lucide-react';
import { speakBelentani, playSoundSuccess } from '../utils/speech';
import { SlideItem } from '../types';

const INITIAL_SLIDES: SlideItem[] = [
  {
    id: 1,
    title: 'Mi Viaje de Brasil a España y Cataluña',
    bullets: [
      '¡Hola a todos! Me llamo William Danilo, tengo 14 años.',
      'Llegué recientemente de Brasil para cursar 3º de la ESO en España.',
      'El portugués y el español comparten más del 80% de su léxico.',
      'En Cataluña estoy aprendiendo a la vez catalán y castellano en el instituto.'
    ],
    speakerNotes: 'Consejo para la exposición: Habla pausado, mira a tus compañeros a los ojos y sonríe. ¡Tu historia inspira a toda la clase!',
    accentColor: '#2563eb'
  },
  {
    id: 2,
    title: 'Similitudes y Puentes entre Portugués y Catalán',
    bullets: [
      'La letra Ç (c trencada) y los sonidos de X suenan idénticos en portugués.',
      'La distinción de vocales abiertas y cerradas (è, ò) es natural para un brasileño.',
      'Palabras afines: plaça, lliçó, deures, sortir, menjar.',
      'La rumba catalana y la samba comparten la alegría y el compás rítmico.'
    ],
    speakerNotes: 'Explica a tus compañeros que tu lengua materna te ayuda a entender el catalán más rápido de lo que parece.',
    accentColor: '#dc2626'
  },
  {
    id: 3,
    title: 'Proyecto de Ciencias: La Célula y la Respiración',
    bullets: [
      'Unidad de Biología y Geología de 3º de ESO.',
      'La célula eucariota: núcleo con ADN y mitocondrias energéticas.',
      'Los 4 aparatos de la nutrición: Digestivo, Respiratorio, Circulatorio y Excretor.',
      'Fórmula clave: Glucosa + Oxígeno -> CO2 + Agua + Energía ATP.'
    ],
    speakerNotes: 'Muestra con orgullo las analogías científicas internacionales: célula, mitocôndria, citoplasma.',
    accentColor: '#16a34a'
  },
  {
    id: 4,
    title: 'Mis Metas Escolares y de Futuro',
    bullets: [
      'Graduarme en la ESO con buenas notas en matemáticas y ciencias.',
      'Dominar el español, catalán e inglés (Nivel B1/B2).',
      'Itinerario: Bachillerato Tecnológico o Ciclo Superior de Informática y Programación.',
      '¡Constancia, perseverancia y superación diaria!'
    ],
    speakerNotes: 'Concluye dando las gracias a los profesores y compañeros: ¡Moltes gràcies a tothom i obrigado!',
    accentColor: '#7c3aed'
  }
];

export const EduSlides: React.FC = () => {
  const [slides, setSlides] = useState<SlideItem[]>(INITIAL_SLIDES);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);

  const currentSlide = slides[currentSlideIndex];

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      playSoundSuccess();
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      playSoundSuccess();
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleSpeakSlide = () => {
    playSoundSuccess();
    const textToSpeak = `${currentSlide.title}. ${currentSlide.bullets.join('. ')}`;
    speakBelentani(textToSpeak, { lang: 'es' });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden text-slate-800">
      {/* Office Ribbon Header (Orange PowerPoint look) */}
      <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-amber-700 text-white px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-900/60 border border-white/20 flex items-center justify-center font-bold text-sm shadow-inner">
            <Presentation className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold">Exposición Oral de William Danilo.pptx</span>
            <span className="text-[11px] ml-2 px-2 py-0.5 rounded-full bg-orange-800/80 text-orange-100 border border-orange-400/30">
              EduSlides 2026 · Diapositivas ESO
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakSlide}
            className="flex items-center gap-1 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Escuchar Diapositiva</span>
          </button>

          <button
            onClick={() => {
              playSoundSuccess();
              setIsPresentationMode(!isPresentationMode);
            }}
            className="flex items-center gap-1 px-3 py-1 rounded bg-white text-orange-800 hover:bg-orange-50 text-xs font-bold shadow transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-orange-800" />
            <span>{isPresentationMode ? 'Salir Presentación' : 'Presentar Pantalla'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Slides Rail + Center Stage */}
      <div className="flex-1 flex flex-col md:flex-row bg-slate-200/90 overflow-hidden p-4 gap-4">
        {/* Thumbnails Sidebar */}
        <div className="w-full md:w-56 bg-white rounded-lg shadow border border-slate-300 p-2 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => {
                playSoundSuccess();
                setCurrentSlideIndex(idx);
              }}
              className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex-shrink-0 md:flex-shrink ${
                currentSlideIndex === idx
                  ? 'border-orange-500 bg-orange-50/80 ring-2 ring-orange-400 shadow-sm'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span>Diapositiva {idx + 1}</span>
              </div>
              <div className="font-bold text-xs text-slate-800 truncate">{s.title}</div>
            </div>
          ))}
        </div>

        {/* Center Presentation Stage (16:9 Aspect Ratio) */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl aspect-[16/9] bg-white rounded-xl shadow-lg border border-slate-300 p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Slide decorative bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 absolute top-0 left-0" />

            <div>
              <div className="text-[11px] font-bold text-orange-600 tracking-wider uppercase mb-1">
                Belentani School · 3º ESO Presentación
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {currentSlide.title}
              </h2>
            </div>

            <div className="my-auto space-y-3 pl-2">
              {currentSlide.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                    {b}
                  </p>
                </div>
              ))}
            </div>

            {/* Slide Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs text-slate-500">
              <span>Alumno: <strong>William Danilo</strong></span>
              <span>{currentSlideIndex + 1} / {slides.length}</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-full bg-white shadow hover:bg-slate-100 disabled:opacity-40 transition-all text-slate-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-slate-600">
              Diapositiva {currentSlideIndex + 1} de {slides.length}
            </span>
            <button
              onClick={handleNextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className="p-2 rounded-full bg-white shadow hover:bg-slate-100 disabled:opacity-40 transition-all text-slate-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Speaker Notes Drawer */}
        <div className="w-full md:w-72 bg-white rounded-lg shadow border border-slate-300 p-4 flex flex-col gap-2">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 pb-2 border-b border-slate-200">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>Notas para el Orador (Danilo)</span>
          </div>
          <div className="text-xs text-slate-600 leading-relaxed italic bg-amber-50/70 p-3 rounded-lg border border-amber-200">
            "{currentSlide.speakerNotes}"
          </div>
          <div className="text-[11px] text-slate-500 mt-auto pt-2 border-t border-slate-200">
            💡 <em>Consejo de Belentani:</em> En las exposiciones orales en España se valora la claridad, no leer directamente la diapositiva y responder con amabilidad a las preguntas.
          </div>
        </div>
      </div>
    </div>
  );
};
