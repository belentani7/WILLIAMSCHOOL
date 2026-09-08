import React, { useState, useEffect } from 'react';
import { 
  FileText, Bold, Italic, Underline, AlignLeft, AlignCenter, 
  List, Download, Printer, Sparkles, CheckCircle2, AlertCircle, Volume2
} from 'lucide-react';
import { speakBelentani, playSoundSuccess } from '../utils/speech';

const WORD_TEMPLATES = [
  {
    id: 'redaccion-llegada',
    name: 'Redacción: Mi llegada de Brasil a España',
    content: `# Mi Experiencia: De Brasil a España y Cataluña
Autor: William Danilo | 3º de ESO | Curso 2026

Al principio, llegar a un nuevo país con 14 años parece un gran desafío. Sin embargo, poco a poco me he dado cuenta de que el portugués y el español comparten más del 80% de su vocabulario.

En el instituto, los compañeros y los profesores me han acogido con amabilidad. En el recreo ('pati'), la música y el fútbol nos ayudan a entendernos sin necesidad de muchas palabras.

Mi meta este curso es obtener el título de Graduado en ESO con buenas notas en matemáticas y ciencias, aprendiendo a la vez catalán y mejorando mi inglés.`
  },
  {
    id: 'informe-ciencias',
    name: 'Informe de Laboratorio: La Célula y la Nutrición',
    content: `# Práctica de Laboratorio: Observación de Células Eucariotas
Asignatura: Biología y Geología 3º ESO | Alumno: William Danilo

1. OBJETIVO:
Identificar las estructuras principales de la célula animal y su función en la respiración celular.

2. MATERIALES:
- Microscopio óptico.
- Muestra de tejido epitelial.
- Azul de metileno.

3. CONCLUSIÓN:
Hemos observado el núcleo donde se encuentra el ADN y las mitocondrias que proporcionan energía a la célula a partir de glucosa y oxígeno.`
  },
  {
    id: 'deures-catala',
    name: 'Deures de Llengua Catalana: Presentació',
    content: `# Presentació personal a la classe de Català
Alumne: William Danilo | Institut

Bon dia a tots! Em dic William Danilo, tinc 14 anys i fa pocs mesos que he arribat del Brasil a Catalunya.

M'agrada molt la música, cantar i tocar la guitarra. Trobo que el català té molts sons semblants al portuguès, com la 'ç' i les vocals obertes. Estic molt content d'estudiar aquí!`
  }
];

// Trilingual false friends dictionary detector
const PT_DETECTOR_WORDS: Record<string, string> = {
  vassoura: "En español se dice 'escoba' (y en catalán 'escombra'). 'Basura' en español significa residuos (lixo).",
  esquisito: "Cuidado: 'esquisito' en español significa refinado y delicioso. Si quieres decir raro, usa 'extraño' o 'raro'.",
  embaraçada: "Atención: 'embarazada' en español significa esperando un bebé (pregnant). Para decir con vergüenza, usa 'avergonzada'.",
  oficina: "'Oficina' en español es un despacho. Si te refieres a un lugar donde arreglan coches o maquinaria, usa 'taller'.",
  sobrenome: "En español se dice 'apellido' (nombre familiar). 'Sobrenombre' en español es un apodo o mote.",
  apelido: "'Apelido' en español es un 'apodo' o 'mote'. Tu nombre de familia se llama 'apellido'.",
  falar: "En español se dice 'hablar' (y en catalán 'parlar').",
  muito: "En español se escribe 'mucho' o 'muy' (y en catalán 'molt').",
  obrigado: "En español se dice 'gracias' (y en catalán 'moltes gràcies' o 'merci')."
};

export const EduWord: React.FC = () => {
  const [docTitle, setDocTitle] = useState('Mi Trabajo Escolar - Danilo.docx');
  const [content, setContent] = useState(WORD_TEMPLATES[0].content);
  const [activeAlerts, setActiveAlerts] = useState<{ word: string; tip: string }[]>([]);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  // Analyze text for Portuguese false friends in real-time
  useEffect(() => {
    const lower = content.toLowerCase();
    const detected: { word: string; tip: string }[] = [];

    Object.entries(PT_DETECTOR_WORDS).forEach(([word, tip]) => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(lower)) {
        detected.push({ word, tip });
      }
    });

    setActiveAlerts(detected);
  }, [content]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  const handleDownloadTxt = () => {
    playSoundSuccess();
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = docTitle.replace('.docx', '.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSpeakDocument = () => {
    playSoundSuccess();
    speakBelentani(content.slice(0, 400), { lang: 'es' });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden text-slate-800">
      {/* Office Ribbon Header (Windows Aero / Fluent style) */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-700 text-white px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-900/60 border border-white/20 flex items-center justify-center font-bold text-sm shadow-inner">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="bg-transparent border-b border-transparent hover:border-white/40 focus:border-white text-sm font-semibold text-white focus:outline-none px-1 rounded"
              />
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-800/80 text-blue-100 border border-blue-400/30">
                EduWord 2026 · Danilo
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakDocument}
            className="flex items-center gap-1 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
            title="Leer documento con voz de Belentani"
          >
            <Volume2 className="w-3.5 h-3.5 text-sky-200" />
            <span className="hidden sm:inline">Leer en Voz Alta</span>
          </button>

          <button
            onClick={handleDownloadTxt}
            className="flex items-center gap-1 px-3 py-1 rounded bg-white text-blue-800 hover:bg-blue-50 text-xs font-bold shadow transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Guardar .txt</span>
          </button>
        </div>
      </div>

      {/* Toolbar Ribbon */}
      <div className="bg-slate-100 border-b border-slate-300 px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700">
        <div className="flex items-center gap-1 border-r border-slate-300 pr-3">
          <button
            onClick={() => setIsBold(!isBold)}
            className={`p-1.5 rounded hover:bg-slate-200 font-bold ${isBold ? 'bg-slate-300 text-blue-700' : ''}`}
            title="Negrita"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`p-1.5 rounded hover:bg-slate-200 italic ${isItalic ? 'bg-slate-300 text-blue-700' : ''}`}
            title="Cursiva"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 rounded hover:bg-slate-200 underline"
            title="Subrayado"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>

        {/* Templates quick selector */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 font-medium">Plantillas:</span>
          {WORD_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => {
                playSoundSuccess();
                setContent(tpl.content);
                setDocTitle(`${tpl.name}.docx`);
              }}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 border border-slate-300 text-[11px] font-medium text-slate-700 hover:text-blue-700 hover:border-blue-300 transition-all"
            >
              {tpl.name.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Document Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-200/80 p-4 gap-4">
        {/* The White Page (A4 look) */}
        <div className="flex-1 max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-slate-300 p-8 flex flex-col overflow-y-auto">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full flex-1 bg-transparent border-0 resize-none focus:outline-none text-slate-900 leading-relaxed text-sm font-sans ${
              isBold ? 'font-bold' : ''
            } ${isItalic ? 'italic' : ''}`}
            placeholder="Comienza a redactar tus deberes o apuntes escolares aquí..."
            rows={18}
          />
        </div>

        {/* Sidebar: Trilingual Assistant for Danilo */}
        <div className="w-full md:w-80 bg-white rounded-lg shadow-md border border-slate-300 p-4 flex flex-col gap-3 overflow-y-auto">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-blue-700 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Asistente Trilingüe de Belentani</span>
          </div>

          <div className="text-[11px] text-slate-600 leading-relaxed">
            Escribe en español o catalán con total tranquilidad. Si detectamos una palabra en portugués o un falso amigo, Belentani te avisará aquí para ayudarte a pulir tu redacción.
          </div>

          {activeAlerts.length > 0 ? (
            <div className="space-y-2 mt-1">
              <div className="flex items-center gap-1 text-amber-700 font-bold text-xs">
                <AlertCircle className="w-4 h-4" />
                <span>{activeAlerts.length} Sugerencia(s) detectada(s):</span>
              </div>
              {activeAlerts.map((alert, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                  <div className="font-bold text-amber-800 capitalize">
                    Palabra: <span className="underline">{alert.word}</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-normal">{alert.tip}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>¡Ortografía y redacción sin interferencias! Todo se lee de forma fluida y natural.</span>
            </div>
          )}

          {/* Quick tips for school writing */}
          <div className="mt-auto pt-3 border-t border-slate-200 space-y-1.5 text-[11px] text-slate-500">
            <div className="font-semibold text-slate-700">Consejos de Examen ESO:</div>
            <div>• En español los signos de interrogación se abren al principio: <strong>¿...?</strong></div>
            <div>• Solo existe el acento agudo (´), nunca el circunflejo ni la crase.</div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-slate-100 border-t border-slate-300 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-4">
          <span>Página 1 de 1</span>
          <span>{wordCount} palabras</span>
          <span>{charCount} caracteres</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Corrector Activo: Español (España) / Català</span>
        </div>
      </div>
    </div>
  );
};
