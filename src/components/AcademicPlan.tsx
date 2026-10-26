import React, { useState } from 'react';
import { ACADEMIC_MODULES } from '../data/curriculumData';
import { SubjectModule, TopicLesson, AcademicYear } from '../types';
import { 
  BookOpen, Calculator, GraduationCap, Globe2, Atom, Layers, 
  Volume2, CheckCircle2, XCircle, Sparkles, ChevronRight, HelpCircle, 
  SquareCode, TrendingUp, Trophy, Compass, FileText, Check 
} from 'lucide-react';
import { speakBelentani, playSoundSuccess, playSoundError } from '../utils/speech';
import { createLearner, completeLesson, lessonKey, loadLearningProgress, saveLearningProgress } from '../utils/learningProgress';

export const AcademicPlan: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<AcademicYear>('3eso');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mates-3eso');
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'leccion' | 'ejercicios' | 'examen'>('leccion');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(loadLearningProgress);
  const [newLearnerName, setNewLearnerName] = useState('');

  const updateProgress = (next: typeof progress) => {
    setProgress(next);
    saveLearningProgress(next);
  };

  const startLearnerSession = (next: typeof progress) => {
    updateProgress(next);
    setActiveTopicIndex(0);
    setActiveTab('leccion');
    setSelectedAnswers({});
    setShowExplanations({});
  };

  const activeLearner = progress.profiles.find(profile => profile.id === progress.activeProfileId)!;

  // Filter modules by year or get all
  const yearModules = ACADEMIC_MODULES.filter(m => m.year === selectedYear);
  const currentModule = ACADEMIC_MODULES.find(m => m.id === selectedModuleId) || yearModules[0] || ACADEMIC_MODULES[0];
  const activeTopic = currentModule.topics[activeTopicIndex] || currentModule.topics[0];
  const completedTopics = currentModule.topics.filter(topic => activeLearner.completed.includes(lessonKey(currentModule.id, topic.id))).length;
  const currentLessonCompleted = activeLearner.completed.includes(lessonKey(currentModule.id, activeTopic.id));

  const handleSpeakTopic = (text: string, lang: 'es' | 'ca' | 'en' = 'es') => {
    playSoundSuccess();
    speakBelentani(text, { lang, rate: 0.92 });
  };

  const handleSelectAnswer = (exId: string, optionIdx: number, correctIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [exId]: optionIdx }));
    setShowExplanations(prev => ({ ...prev, [exId]: true }));
    if (optionIdx === correctIdx) {
      playSoundSuccess();
    } else {
      playSoundError();
    }
  };

  const getModuleIcon = (name: string) => {
    if (name.includes('Matemáticas')) return <Calculator className="w-4 h-4 text-blue-600" />;
    if (name.includes('Española') || name.includes('Lengua')) return <BookOpen className="w-4 h-4 text-emerald-600" />;
    if (name.includes('Catalana')) return <GraduationCap className="w-4 h-4 text-amber-600" />;
    if (name.includes('English')) return <Globe2 className="w-4 h-4 text-sky-600" />;
    if (name.includes('Ciencias') || name.includes('Biología') || name.includes('Física')) return <Atom className="w-4 h-4 text-teal-600" />;
    if (name.includes('Filosofía')) return <Sparkles className="w-4 h-4 text-purple-600" />;
    if (name.includes('Historia')) return <Compass className="w-4 h-4 text-rose-600" />;
    return <Layers className="w-4 h-4 text-indigo-600" />;
  };

  const courseList: { id: AcademicYear; label: string; age: string; note: string }[] = [
    { id: '1eso', label: '1º ESO', age: '12-13 años', note: 'Fundamentos ESO' },
    { id: '2eso', label: '2º ESO', age: '13-14 años', note: 'Consolidación' },
    { id: '3eso', label: '3º ESO', age: '14 años', note: 'Curso de referencia' },
    { id: '4eso', label: '4º ESO', age: '15-16 años', note: 'Título Graduado ESO' },
    { id: '1bach', label: '1º Bachillerato', age: '16-17 años', note: 'Itinerario Académico' },
    { id: '2bach', label: '2º Bach / PAU', age: '17-18 años', note: 'Acceso Universidad' }
  ];

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-blue-400/30 bg-gradient-to-r from-blue-800 via-sky-800 to-indigo-900 px-5 py-5 text-white shadow-lg md:px-7" aria-label="Mi recorrido de aprendizaje">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">Tu camino en Belentani School</h2>
            <p className="mt-2 text-sm leading-relaxed text-sky-100">Aprende a tu ritmo. Cada lección que completas abre la siguiente. Este perfil guarda sus logros en este navegador.</p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <label className="text-xs font-semibold text-sky-100">
              Perfil
              <select aria-label="Perfil de aprendizaje" value={progress.activeProfileId} onChange={event => startLearnerSession({ ...progress, activeProfileId: event.target.value })} className="mt-1 block min-w-40 rounded-lg border border-sky-300 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400">
                {progress.profiles.map(profile => <option key={profile.id} value={profile.id}>{profile.name}</option>)}
              </select>
            </label>
            <form onSubmit={event => { event.preventDefault(); if (newLearnerName.trim()) { startLearnerSession(createLearner(progress, newLearnerName)); setNewLearnerName(''); } }} className="flex gap-2">
              <label className="sr-only" htmlFor="new-learner-name">Nombre del nuevo perfil</label>
              <input id="new-learner-name" value={newLearnerName} onChange={event => setNewLearnerName(event.target.value)} maxLength={40} placeholder="Nuevo perfil" className="w-32 rounded-lg border border-sky-300 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400" />
              <button type="submit" disabled={!newLearnerName.trim()} className="rounded-lg bg-sky-300 px-3 py-2 text-sm font-bold text-slate-950 hover:bg-sky-200 disabled:cursor-not-allowed disabled:opacity-50">Crear</button>
            </form>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-sky-900 pt-4 text-sm">
          <span className="font-semibold text-sky-100">{currentModule.name} · {currentModule.yearLabel}</span>
          <span className="font-bold text-white">{completedTopics} de {currentModule.topics.length} lecciones conquistadas</span>
        </div>
        <div role="progressbar" aria-label="Progreso de la asignatura" aria-valuenow={completedTopics} aria-valuemin={0} aria-valuemax={currentModule.topics.length} className="mt-2 h-2 overflow-hidden rounded-full bg-sky-950">
          <div className="h-full rounded-full bg-sky-300 transition-[width] duration-300" style={{ width: `${currentModule.topics.length ? 100 * completedTopics / currentModule.topics.length : 0}%` }} />
        </div>
      </section>
      {/* Top Banner: Cognitive-Friendly Educational Aero Card */}
      <div className="bg-gradient-to-r from-blue-700 via-sky-700 to-indigo-800 rounded-2xl p-6 text-white shadow-lg border border-blue-400/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-200 uppercase tracking-wider mb-1">
              <span>📚 Belentani School · Plan Curricular Oficial LOMLOE</span>
              <span>•</span>
              <span className="text-emerald-300 font-semibold">1º ESO a 2º Bachillerato (6 Cursos)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Biblioteca curricular completa y adaptable
            </h2>
            <p className="text-xs md:text-sm text-sky-100 mt-1 max-w-3xl leading-relaxed">
              Explicaciones didácticas profundas, teoremas paso a paso, ejercicios resueltos y <strong className="text-white">puentes de transferencia lingüística (Português ➔ Castellano ➔ Català)</strong> para garantizar el éxito escolar sin estrés.
            </p>
          </div>

          <button
            onClick={() => handleSpeakTopic(
              "Aquí tienes una biblioteca curricular desde primero de la ESO hasta segundo de bachillerato. Cada unidad ofrece explicaciones claras y ejercicios para preparar los exámenes del instituto.",
              'es'
            )}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs shadow-md transition-all shrink-0"
          >
            <Volume2 className="w-4 h-4 text-blue-700" />
            <span>Escuchar Introducción</span>
          </button>
        </div>

        {/* Course Selection Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-5">
          {courseList.map((c) => {
            const isSelected = selectedYear === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  playSoundSuccess();
                  setSelectedYear(c.id);
                  const firstMod = ACADEMIC_MODULES.find(m => m.year === c.id);
                  if (firstMod) {
                    setSelectedModuleId(firstMod.id);
                    setActiveTopicIndex(0);
                  }
                }}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-white text-blue-950 border-white shadow-md ring-2 ring-sky-300 scale-[1.02]'
                    : 'bg-blue-900/40 hover:bg-blue-900/60 text-sky-100 border-white/10'
                }`}
              >
                <div className="font-bold text-xs">{c.label}</div>
                <div className="text-[10px] opacity-80">{c.age}</div>
                <div className="text-[9px] font-semibold mt-1 truncate text-amber-300">{c.note}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Subject Workspace (Windows 7 / 11 Aero Crisp Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Subjects & Units Rail */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Asignaturas ({selectedYear.toUpperCase()}):</span>
              <span className="text-[10px] text-blue-600 font-bold">{yearModules.length} Disponibles</span>
            </h3>

            <div className="space-y-1.5">
              {yearModules.map((mod) => {
                const isSelected = currentModule.id === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      playSoundSuccess();
                      setSelectedModuleId(mod.id);
                      setActiveTopicIndex(0);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-100">
                        {getModuleIcon(mod.name)}
                      </div>
                      <div>
                        <div className="text-xs">{mod.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal line-clamp-1">{mod.description}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topics of current subject */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2.5">
              Unidades Didácticas:
            </h4>
            <div className="space-y-1.5">
              {currentModule.topics.map((t, idx) => {
                const conquered = activeLearner.completed.includes(lessonKey(currentModule.id, t.id));
                const unlocked = idx === 0 || activeLearner.completed.includes(lessonKey(currentModule.id, currentModule.topics[idx - 1].id));
                return (
                <button
                  key={t.id}
                  disabled={!unlocked}
                  aria-label={`${t.title}: ${conquered ? 'conquistada' : unlocked ? 'disponible' : 'pendiente'}`}
                  onClick={() => {
                    playSoundSuccess();
                    setActiveTopicIndex(idx);
                    setActiveTab('leccion');
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                    activeTopicIndex === idx
                      ? 'bg-sky-50 border-sky-400 text-sky-950 font-bold shadow-sm'
                      : unlocked ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <div className="font-semibold">{conquered ? '✓ ' : unlocked ? '• ' : '○ '}{t.title}</div>
                  <div className="text-[10px] text-slate-500 font-normal">{t.subtitle}</div>
                </button>
              ); })}
            </div>
          </div>
        </div>

        {/* Right Column: Deep Lesson Content / Solved Exercises / Exam Review */}
        <div className="lg:col-span-8 space-y-4">
          {/* Action Tabs: Lección | Ejercicios | Examen */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  playSoundSuccess();
                  setActiveTab('leccion');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'leccion'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                📖 Lección Teórica & Pasos
              </button>

              <button
                onClick={() => {
                  playSoundSuccess();
                  setActiveTab('ejercicios');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'ejercicios'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                ✍️ Ejercicios Evaluables ({currentModule.exercises.length})
              </button>

              <button
                onClick={() => {
                  playSoundSuccess();
                  setActiveTab('examen');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'examen'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                🎯 Chuleta & Fórmulas Examen
              </button>
            </div>

            <button
              onClick={() => handleSpeakTopic(`${activeTopic.title}. ${activeTopic.summary}`, 'es')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Escuchar Lección</span>
            </button>
          </div>

          {/* TAB 1: Detailed Theoretical Lesson */}
          {activeTab === 'leccion' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <p className="text-sm font-semibold text-slate-700">{currentLessonCompleted ? 'Lección conquistada. Puedes repasarla cuando quieras.' : 'Estudia esta lección y registra tu logro cuando termines.'}</p>
                <button type="button" disabled={currentLessonCompleted} onClick={() => { updateProgress(completeLesson(progress, lessonKey(currentModule.id, activeTopic.id))); playSoundSuccess(); }} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800 disabled:cursor-default disabled:bg-emerald-100 disabled:text-emerald-900">{currentLessonCompleted ? 'Conquistada' : 'He completado esta lección'}</button>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {currentModule.name} · {currentModule.yearLabel}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {activeTopic.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {activeTopic.subtitle}
                </p>
              </div>

              {/* Trilingual Bridges Cards (PT -> ES -> CA) */}
              {(activeTopic.portugueseBridge || activeTopic.catalanBridge) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeTopic.portugueseBridge && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                        <span>🇧🇷 Puente de portugués:</span>
                      </div>
                      <p className="leading-relaxed">{activeTopic.portugueseBridge}</p>
                    </div>
                  )}

                  {activeTopic.catalanBridge && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-amber-800">
                        <span>🏛️ Pont Català (Institut):</span>
                      </div>
                      <p className="leading-relaxed">{activeTopic.catalanBridge}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Theoretical Summary */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                  Explicación Conceptual:
                </h4>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {activeTopic.summary}
                </p>
              </div>

              {/* Step-by-Step Interactive Example */}
              {activeTopic.interactiveExample && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl p-5 border border-blue-200 space-y-3">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Ejemplo Resuelto Paso a Paso:</span>
                  </div>

                  <div className="font-mono text-xs md:text-sm font-bold text-blue-950 bg-white p-3 rounded-lg border border-blue-200 shadow-sm">
                    {activeTopic.interactiveExample.prompt}
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    {activeTopic.interactiveExample.stepByStep.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 bg-white/80 p-2 rounded-lg border border-blue-100">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          {i + 1}
                        </span>
                        <span className="font-medium">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-100/70 border border-blue-200 text-blue-950 text-xs font-semibold">
                    💡 {activeTopic.interactiveExample.ruleBox}
                  </div>
                </div>
              )}

              {/* Key Concept Vocabulary */}
              {activeTopic.keyConcepts && activeTopic.keyConcepts.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                    Glosario de Conceptos Clave:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeTopic.keyConcepts.map((kc, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1 text-xs">
                        <div className="font-bold text-slate-900">{kc.term}</div>
                        <div className="text-[11px] text-slate-500">
                          🇧🇷 {kc.pt} | 🇪🇸 {kc.es} | 🏴 {kc.ca} | 🇬🇧 {kc.en}
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed pt-1 border-t border-slate-100">
                          {kc.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Exercises with Instant Pedagogical Feedback */}
          {activeTab === 'ejercicios' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-black text-slate-900 text-base">
                  Ejercicios Prácticos: {currentModule.name}
                </h3>
                <span className="text-xs text-slate-500">
                  Prueba de conocimiento tipo examen
                </span>
              </div>

              <div className="space-y-4">
                {currentModule.exercises.map((ex, idx) => {
                  const selected = selectedAnswers[ex.id];
                  const hasAnswered = selected !== undefined;
                  const isCorrect = selected === ex.correctIndex;

                  return (
                    <div key={ex.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-700">Pregunta {idx + 1}:</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold uppercase">
                          {ex.difficulty}
                        </span>
                      </div>

                      <p className="font-semibold text-xs md:text-sm text-slate-900">
                        {ex.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ex.options.map((opt, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          let btnStyle = 'bg-white hover:bg-blue-50 border-slate-200 text-slate-700';

                          if (hasAnswered) {
                            if (optIdx === ex.correctIndex) {
                              btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(ex.id, optIdx, ex.correctIndex)}
                              className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {hasAnswered && optIdx === ex.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {hasAnswered && isOptionSelected && optIdx !== ex.correctIndex && (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                          isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                        }`}>
                          <div className="font-bold mb-0.5">
                            {isCorrect ? '¡Excelente deducción! 🎉' : '¡Casi! Repasemos la regla:'}
                          </div>
                          <p>{ex.explanation}</p>
                          {ex.portugueseTip && (
                            <p className="text-[11px] text-slate-600 mt-1 italic">
                              🇧🇷 Consejo: {ex.portugueseTip}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Exam Cheat Sheet & Formulas */}
          {activeTab === 'examen' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
              <div className="pb-3 border-b border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Preparación de Control Escolar
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {currentModule.examReview.title}
                </h3>
              </div>

              {/* Objectives */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                  Objetivos que Piden los Profesores:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentModule.examReview.objectives.map((obj, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formula Sheet */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                  Formularios y Reglas de Oro para Llevar en la Mente:
                </h4>
                <div className="space-y-1.5">
                  {currentModule.examReview.formulaSheet.map((f, i) => (
                    <div key={i} className="font-mono text-xs font-bold text-blue-900 bg-blue-50 p-3 rounded-lg border border-blue-200">
                      • {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock Questions */}
              {currentModule.examReview.mockQuestions && (
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                    Preguntas Típicas de Examen Resueltas:
                  </h4>
                  <div className="space-y-2">
                    {currentModule.examReview.mockQuestions.map((mq, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <div className="font-bold text-slate-900">P: {mq.q}</div>
                        <div className="text-emerald-800 font-medium">R: {mq.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
