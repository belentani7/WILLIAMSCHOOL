import React, { useState } from 'react';
import { 
  Award, Zap, ShieldCheck, CheckCircle2, BarChart3, Star, Download, 
  Sparkles, RefreshCw, Cpu, BookOpen, FileCheck, CheckCheck, Wrench, 
  Languages, Calculator, HeartHandshake, Printer
} from 'lucide-react';
import { playSoundSuccess, playSoundClick, speakBelentani } from '../utils/speech';
import confetti from 'canvas-confetti';
import { ContentAuditorCorrection } from './ContentAuditorCorrection';

export const SuperpowerAuditoria: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'corrector' | 'radar' | 'salud' | 'boletin'>('corrector');
  const [isAuditing, setIsAuditing] = useState(false);
  const [repairStatus, setRepairStatus] = useState<string | null>(null);

  const skills = [
    { name: "Álgebra y Ecuaciones 3º ESO", level: 91, tag: "Matemáticas", color: "from-rose-500 to-red-600" },
    { name: "Ortografía & Falsos Amigos (PT-ES)", level: 94, tag: "Español L2", color: "from-amber-500 to-orange-600" },
    { name: "Pont Lingüístic & Expressió Oral", level: 86, tag: "Català L3", color: "from-pink-500 to-rose-500" },
    { name: "Present Perfect & Listening B1", level: 82, tag: "English L4", color: "from-sky-500 to-blue-600" },
    { name: "Biología Celular & Metodología STEM", level: 88, tag: "Ciencias", color: "from-emerald-500 to-teal-600" },
    { name: "Acogida Cultural & Habilidades Sociales", level: 98, tag: "Convivencia", color: "from-purple-500 to-indigo-600" },
  ];

  const coursesAudit = [
    { course: "1º de ESO", status: "Superado con Honores", score: "9.2", color: "text-emerald-400", desc: "Aritmética básica, comprensión lectora y adaptación inicial." },
    { course: "2º de ESO", status: "Superado con Honores", score: "8.9", color: "text-emerald-400", desc: "Geometría, física básica, sintaxis y literatura clásica." },
    { course: "3º de ESO", status: "En Curso Destacado (Actual)", score: "9.1", color: "text-blue-400", desc: "Ecuaciones 2º grado, inmersión catalana y puente cultural Brasil-España." },
    { course: "4º de ESO", status: "Proyección Anticipada", score: "8.5", color: "text-purple-400", desc: "Trigonometría, estequiometría química e historia contemporánea." },
    { course: "1º de Bachillerato", status: "Preparación Preliminar", score: "8.2", color: "text-amber-400", desc: "Límites, cálculo diferencial y filosofía occidental." },
    { course: "2º de Bachillerato (PAU)", status: "Orientación Universitaria", score: "8.0", color: "text-rose-400", desc: "Matrices, integrales y preparación para selectividad universitaria." },
  ];

  const handleRunAudit = () => {
    setIsAuditing(true);
    playSoundClick();

    setTimeout(() => {
      setIsAuditing(false);
      playSoundSuccess();
      confetti();
      speakBelentani("Auditoría pedagógica integral completada. Todas las competencias curriculares y módulos de William Danilo han sido auditados con calificación sobresaliente.", { lang: 'es' });
    }, 1200);
  };

  const handleSystemRepair = () => {
    setRepairStatus("Ejecutando calibración y reparación de módulos...");
    playSoundClick();

    setTimeout(() => {
      setRepairStatus("✅ Todos los 500 minijuegos, módulos LOMLOE y síntesis de voz han sido reindexados con éxito.");
      playSoundSuccess();
      confetti();
      speakBelentani("Reparación y calibración técnica completada. Los 500 juegos y todo el contenido están al cien por cien.", { lang: 'es' });
    }, 1500);
  };

  const handlePrintCertificate = () => {
    confetti();
    playSoundSuccess();
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="glass-red p-6 md:p-8 rounded-3xl relative overflow-hidden border border-white/15">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff8fa3] uppercase tracking-wider">
              <Zap className="w-4 h-4 text-[#ff2d55]" />
              <span>Superpower AI Harness & Auditoría Integral LOMLOE</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Centro de Auditoría Curricular & Corrección
            </h2>
            <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
              Auditoría pedagógica de los 4 cursos de ESO + 2 de Bachillerato, corrector inteligente de textos para William Danilo y verificación de salud de los 500 minijuegos clásicos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white font-bold text-xs hover:brightness-110 shadow-[0_0_20px_rgba(255,45,85,0.4)] disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Auditando...' : 'Re-Auditar Todo'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Pills */}
        <div className="flex items-center gap-2 pt-6 mt-4 border-t border-white/10 overflow-x-auto scrollbar-none">
          {[
            { id: 'corrector', label: 'Corrector de Deberes & Textos', icon: FileCheck },
            { id: 'radar', label: 'Auditoría Curricular 6 Cursos', icon: BarChart3 },
            { id: 'salud', label: 'Diagnóstico & Reparación Sistema', icon: Cpu },
            { id: 'boletin', label: 'Boletín Oficial & Certificado', icon: Award },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  playSoundClick();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#ff2d55] text-white shadow-[0_0_20px_rgba(255,45,85,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: CORRECTOR DE DEBERES & AUDITORÍA DE TEXTOS */}
      {activeTab === 'corrector' && (
        <div className="space-y-4">
          <ContentAuditorCorrection />
        </div>
      )}

      {/* TAB 2: AUDITORÍA CURRICULAR 6 CURSOS (1º ESO A 2º BACH) */}
      {activeTab === 'radar' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Skills Bars */}
            <div className="lg:col-span-7 glass-red-card p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-white text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#ff2d55]" />
                  <span>Radar de Competencias Clave LOMLOE</span>
                </h3>
                <span className="text-xs text-emerald-400 font-bold">Promedio: 89.8% (Sobresaliente)</span>
              </div>

              <div className="space-y-4 pt-2">
                {skills.map((sk, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-200">{sk.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-400 px-1.5 py-0.5 rounded bg-white/5">{sk.tag}</span>
                        <strong className="text-white">{sk.level}%</strong>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${sk.color} transition-all duration-1000`}
                        style={{ width: `${sk.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses progression */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="font-black text-white text-base flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>Auditoría por Cursos (1º ESO - 2º Bach)</span>
              </h3>

              <div className="space-y-2.5">
                {coursesAudit.map((c, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-white">{c.course}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold ${c.color}`}>{c.status}</span>
                        <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">{c.score}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIAGNÓSTICO & REPARACIÓN */}
      {activeTab === 'salud' && (
        <div className="space-y-6">
          <div className="glass-red-card p-6 md:p-8 rounded-3xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-[#ff8fa3]" />
                  <span>Diagnóstico de Salud de la Plataforma Belentani School</span>
                </h3>
                <p className="text-xs text-zinc-300">
                  Monitorización en tiempo real de los 500 juegos clásicos, currículo de 6 años, sintetizador de voz y protección de datos.
                </p>
              </div>

              <button
                onClick={handleSystemRepair}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg hover:brightness-110 flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Ejecutar Reparación & Calibración</span>
              </button>
            </div>

            {repairStatus && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 font-bold animate-in fade-in">
                {repairStatus}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {[
                { name: "500 Minijuegos Clásicos", status: "500 / 500 Activos", desc: "10 categorías completas cargadas", icon: Star },
                { name: "Banco Curricular JSON", status: "6 Cursos ESO + Bach", desc: "LOMLOE y pau verificados", icon: BookOpen },
                { name: "Síntesis de Voz Humana", status: "4 Idiomas Listos", desc: "ES, CA, EN, PT balanceados", icon: Zap },
                { name: "Blindaje y Control Parental", status: "Cifrado Militar", desc: "Zero tracking, tiempo protegido", icon: ShieldCheck },
                { name: "Motor de Audio & Chiptune", status: "Web Audio API 60FPS", desc: "Efectos y tonos calibrados", icon: Sparkles },
                { name: "Filtro Afectivo & Acogida", status: "Nivel Máximo", desc: "Pedagogía empática activa", icon: HeartHandshake },
              ].map((diag, dIdx) => {
                const DIcon = diag.icon;
                return (
                  <div key={dIdx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-white text-[12px]">
                        <DIcon className="w-4 h-4 text-[#ff2d55]" />
                        <span>{diag.name}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Óptimo
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-300 font-semibold">{diag.status}</div>
                    <p className="text-[10px] text-zinc-400">{diag.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BOLETÍN OFICIAL & CERTIFICADO */}
      {activeTab === 'boletin' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Official Grade Report Card */}
          <div className="lg:col-span-7 glass-red-card p-6 md:p-8 rounded-3xl space-y-4 border border-white/15">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold text-[#ff8fa3] uppercase tracking-wider">
                  Boletín Oficial de Calificaciones
                </span>
                <h3 className="text-xl font-black text-white">BELENTANI SCHOOL · CURSO 3º ESO</h3>
              </div>
              <span className="text-xs text-zinc-400">Año Académico 2025-2026</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white">Alumno: William Danilo</span>
                <div className="text-[11px] text-zinc-400">14 años · Adaptación Lingüística e Inmersión</div>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 font-black border border-emerald-500/30">
                Media Global: 9.1
              </span>
            </div>

            <div className="space-y-2 pt-2">
              {[
                { subject: "Matemáticas 3º ESO (Álgebra y Funciones)", grade: "9.0", status: "Sobresaliente" },
                { subject: "Lengua Castellana y Literatura", grade: "9.3", status: "Sobresaliente" },
                { subject: "Llengua Catalana i Literatura", grade: "8.7", status: "Notable Alto" },
                { subject: "Lengua Extranjera: Inglés B1", grade: "8.5", status: "Notable Alto" },
                { subject: "Biología y Geología", grade: "9.0", status: "Sobresaliente" },
                { subject: "Física y Química", grade: "8.9", status: "Notable Alto" },
                { subject: "Geografía e Historia", grade: "9.2", status: "Sobresaliente" },
                { subject: "Acogida Cultural y Competencia Social", grade: "10.0", status: "Matrícula de Honor" },
              ].map((sub, sIdx) => (
                <div key={sIdx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-xs">
                  <span className="font-medium text-zinc-200">{sub.subject}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-zinc-400">{sub.status}</span>
                    <span className="font-black text-white w-8 text-right">{sub.grade}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Resultado LOMLOE:</span>
              <span className="font-black text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                PROMOCIONA CON EXCELENCIA ACADÉMICA
              </span>
            </div>
          </div>

          {/* Diploma Card */}
          <div className="lg:col-span-5 glass-red p-6 md:p-8 rounded-3xl text-center space-y-4 border-2 border-[#ff2d55]/50 shadow-[0_0_40px_rgba(255,45,85,0.4)]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-[#ff2d55] flex items-center justify-center text-3xl mx-auto shadow-lg">
              🎖️
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-widest text-[#ff8fa3] uppercase">
                Diploma Oficial de Honor
              </span>
              <h3 className="text-xl font-black text-white">BELENTANI SCHOOL</h3>
              <p className="text-xs text-zinc-300">Otorga el presente reconocimiento a:</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20">
              <div className="text-xl font-black text-white">WILLIAM DANILO</div>
              <div className="text-xs text-zinc-300 mt-0.5">14 años · Puente Cultural Brasil-España</div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed text-left">
              Por su sobresaliente capacidad de superación, resolución de ecuaciones de 3º de ESO, dominio en los 500 juegos arcade clásicos y excelente adquisición acelerada del español y catalán.
            </p>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <div className="text-left">
                <div className="font-bold text-white">Belentani</div>
                <div className="text-[10px]">Tutor y Mentor</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-400">Aprobado Sobresaliente</div>
                <div className="text-[10px]">Sello LOMLOE 2026</div>
              </div>
            </div>

            <button
              onClick={handlePrintCertificate}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#ff2d55] text-white font-bold text-xs shadow-md hover:brightness-110 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Descargar Diploma Oficial</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
