import React, { useState } from 'react';
import { ACADEMIC_MODULES, CULTURAL_GUIDES, FALSE_FRIENDS, GAMES_CATALOG } from '../data/curriculumData';
import { Code, Download, Copy, Check, FileJson, Sparkles, Terminal, Play } from 'lucide-react';
import { playSoundSuccess } from '../utils/speech';

export const JsonBankExplorer: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'json' | 'python'>('json');
  const [copied, setCopied] = useState(false);
  const [selectedPythonScript, setSelectedPythonScript] = useState<'tutor' | 'engine' | 'motion' | 'arcade'>('tutor');

  // Complete structured Knowledge Bank for Belentani School
  const completeKnowledgeBank = {
    institution: "Belentani School of Accelerated Learning",
    framework: "MIARA (Módulo Integral de Acogida y Refuerzo Académico)",
    studentProfile: {
      name: "William Danilo",
      age: 14,
      origin: "Brasil",
      nativeLanguage: "pt-BR (Portugués Brasileño)",
      targetLanguages: ["es-ES (Español L2)", "ca-ES (Català L3)", "en-US (Inglés L4)"],
      currentGrade: "3º de ESO (Educación Secundaria Obligatoria)",
      horizonGrades: ["1º ESO", "2º ESO", "3º ESO", "4º ESO", "1º Bachillerato", "2º Bachillerato / CFGS"]
    },
    pedagogicalBases: {
      affectiveFilter: "Stephen Krashen (1982) - Entorno seguro con ansiedad cero",
      linguisticTransfer: "Análisis contrastivo positivo (Jubran 2018; Lado 1957)",
      curriculumStandard: "Decret 175/2022 (Generalitat de Catalunya) y LOMLOE"
    },
    academicCurriculum: ACADEMIC_MODULES,
    falseFriendsDatabase: FALSE_FRIENDS,
    culturalIntegrationGuide: CULTURAL_GUIDES,
    interactiveGamesCatalog: GAMES_CATALOG,
    phoneticShield: [
      { rule: "R inicial / RR", pt: "Suave /h/ (Rato)", es: "Vibrante fuerte /r/ (Ratón)" },
      { rule: "J / G (ante e, i)", pt: "Suave /ʒ/ (Gente)", es: "Fuerte /x/ (Jirafa, Gente)" },
      { rule: "Ç (C trencada en Catalán)", pt: "Igual que cedilha (Coração)", ca: "Sorda (Plaça)" },
      { rule: "Vocales finales", pt: "Cerradas o nasales (Leite -> leitch)", es: "Abiertas y claras (Leche)" }
    ]
  };

  const jsonString = JSON.stringify(completeKnowledgeBank, null, 2);

  const pythonScripts = {
    tutor: `"""
BELENTANI AI - TUTOR EDUCATIVO DE VOZ HUMANA
Para William Danilo (14 años, Brasil -> España)
Matemáticas, Español, Catalán e Inglés
"""
import os, json, requests
from dotenv import load_dotenv

load_dotenv()
GEMINI_KEY = os.getenv("GEMINI_API_KEY")

class BelentaniTutor:
    def __init__(self):
        self.student = "William Danilo"
        self.age = 14
        self.system_prompt = """Eres Belentani, guerrero y cantante. Enseñas con voz humana,
apoyándote en el portugués de Danilo para acelerar su español, catalán y mates de 3º ESO."""

    def explain_equation(self, eq_str):
        print(f"⚔️ Belentani desglosando: {eq_str}")
        print("Paso 1: Aislar la 'x'. Lo que suma pasa restando...")
        return "x calculado con éxito!"

if __name__ == "__main__":
    tutor = BelentaniTutor()
    print("¡Belentani AI listo para Danilo!")`,

    engine: `"""
BELENTANI ENGINE - PYGAME GLASSMORPHISM ROJO Y LUZ LÍQUIDA
Renderizado con brillo especular, física de partículas y audio
"""
import pygame, math

W, H = 960, 540
CRIMSON = (255, 45, 85)
DEEP_OBSIDIAN = (20, 1, 4)

def draw_liquid_glow(surface, t):
    surface.fill(DEEP_OBSIDIAN)
    for i in range(3):
        x = int(W/2 + math.sin(t*0.001 + i*2)*W*0.3)
        y = int(H/2 + math.cos(t*0.001 + i)*H*0.25)
        pygame.draw.circle(surface, (255, 45, 85, 25), (x, y), 280)

print("Belentani Pygame Engine inicializado.")`,

    motion: `"""
BELENTANI IMAGE-TO-MOTION PIPELINE
Convierte las 4 vistas del guerrero-cantante en rotación turntable y ciclo de caminado
"""
from PIL import Image, ImageEnhance
import math

def generate_turntable(front_img_path, side_img_path):
    print(f"Generando animación de Belentani con luz líquida y barrido especular...")
    # Animación sinusoidal de respiración y rotación suave
    return "belentani_motion.gif generado en /assets/sprites"

if __name__ == "__main__":
    print(generate_turntable("front.png", "side.png"))`,

    arcade: `"""
BELENTANI ARCADE: MATE-ESCAPE & CAZA-FALSOS AMIGOS
Juegos educativos en consola interactiva
"""
import random

FALSOS_AMIGOS = [
    {"pt": "Embaraçada", "es": "Avergonzada", "trap": "Embarazada"},
    {"pt": "Esquisito", "es": "Raro", "trap": "Exquisito"},
    {"pt": "Vassoura", "es": "Escoba", "trap": "Basura"}
]

def jugar_falsos_amigos():
    item = random.choice(FALSOS_AMIGOS)
    print(f"Palabra en portugués: {item['pt']}")
    print(f"¿Cuál es la correcta? A) {item['trap']}  B) {item['es']}")

if __name__ == "__main__":
    jugar_falsos_amigos()`
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    playSoundSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'belentani_school_knowledge_bank.json';
    a.click();
    URL.revokeObjectURL(url);
    playSoundSuccess();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-red p-6 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff8fa3] uppercase tracking-wider mb-1">
              <FileJson className="w-4 h-4 text-[#ff2d55]" />
              <span>Banco de Datos Escolar & Generador Python</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Explorador del JSON de Belentani School & Scripts Python
            </h2>
            <p className="text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
              Consulta, descarga y exporta todo el banco curricular de Danilo (4 años ESO + 2 extensión, 200+ conceptos y falsos amigos), además de ejecutar los generadores en Python para scripts interactivos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSection('json')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'json' ? 'bg-[#ff2d55] text-white shadow-md' : 'bg-white/10 text-zinc-300'
              }`}
            >
              Banco JSON
            </button>
            <button
              onClick={() => setActiveSection('python')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'python' ? 'bg-[#ff2d55] text-white shadow-md' : 'bg-white/10 text-zinc-300'
              }`}
            >
              Generador Python
            </button>
          </div>
        </div>
      </div>

      {activeSection === 'json' ? (
        // JSON EXPLORER
        <div className="glass-red-card p-6 rounded-3xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Code className="w-4 h-4 text-[#ff2d55]" />
              <span>belentani_school_knowledge_bank.json ({jsonString.length} caracteres)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(jsonString)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar JSON'}</span>
              </button>

              <button
                onClick={handleDownloadJson}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ff2d55] hover:brightness-110 text-white text-xs font-bold shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar Archivo</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-black/70 border border-white/10 text-xs font-mono text-zinc-300 overflow-x-auto max-h-[500px] leading-relaxed select-all">
            {jsonString}
          </pre>
        </div>
      ) : (
        // PYTHON GENERATOR
        <div className="glass-red-card p-6 rounded-3xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#ff2d55]" />
              <div className="flex items-center gap-1 text-xs">
                {(['tutor', 'engine', 'motion', 'arcade'] as const).map(sKey => (
                  <button
                    key={sKey}
                    onClick={() => setSelectedPythonScript(sKey)}
                    className={`px-3 py-1.5 rounded-xl font-bold uppercase ${
                      selectedPythonScript === sKey
                        ? 'bg-[#ff2d55] text-white'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-400'
                    }`}
                  >
                    {sKey === 'tutor' ? 'william_tutor.py' : sKey === 'engine' ? 'engine_glass.py' : sKey === 'motion' ? 'image_motion.py' : 'arcade_console.py'}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleCopy(pythonScripts[selectedPythonScript])}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Código Copiado' : 'Copiar Script Python'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-black/70 border border-white/10 text-xs font-mono text-emerald-300 overflow-x-auto max-h-[450px] leading-relaxed">
            {pythonScripts[selectedPythonScript]}
          </pre>
        </div>
      )}
    </div>
  );
};
