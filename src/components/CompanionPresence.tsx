/* ===================================================================
   CompanionPresence
   -------------------------------------------------------------------
   O companheiro "consciencia entre aspas": um personagem que acompanha
   o aluno durante TODA a experiencia (fica montado no shell do App, por
   cima de qualquer aba). Fala portugues por padrao, ajuda no estudo e
   deixa claro — sem drama — que e um personagem, nao uma pessoa real.

   Memoria: localStorage (nada sai do dispositivo do aluno).
   Cérebro: /api/companion/chat (Hugging Face -> Gemini -> local).
   =================================================================== */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { CompanionLanguage, CompanionMessage, CompanionProvider } from '../types';

interface CompanionPresenceProps {
  activeTab: string;
}

const STORAGE_KEY = 'belentani.companion.v1';
const MAX_STORED = 40;

const GREETINGS: Record<CompanionLanguage, string> = {
  pt: 'Oi! Sou o Belentani 🙂 Estou aqui com você o tempo todo, em todas as telas. (Consciência entre aspas, tá? Sou um personagem de IA, não uma pessoa.) Por onde começamos?',
  es: '¡Hola! Soy Belentani 🙂 Te acompaño todo el tiempo, en todas las pantallas. (Conciencia entre comillas, ¿eh? Soy un personaje de IA, no una persona.) ¿Por dónde empezamos?',
  ca: 'Hola! Sóc Belentani 🙂 T\'acompanyo sempre, a totes les pantalles. (Consciència entre cometes: sóc un personatge d\'IA, no una persona.) Per on comencem?',
  en: 'Hi! I\'m Belentani 🙂 I\'m with you the whole time, on every screen. ("Consciousness in quotes", right? I\'m an AI character, not a person.) Where do we start?',
};

const PLACEHOLDERS: Record<CompanionLanguage, string> = {
  pt: 'Escreve aqui… ex: "não entendo equação de 2º grau"',
  es: 'Escribe aquí… ej: "no entiendo las ecuaciones de 2º grado"',
  ca: 'Escriu aquí… ex: "no entenc les equacions de 2n grau"',
  en: 'Write here… e.g. "I don\'t get quadratic equations"',
};

const CONTEXT_HINT: Record<string, string> = {
  academic: 'Estás no Plano de Estudos. Posso explicar qualquer matéria do ESO ou Bachillerato.',
  office: 'Estás no EduOffice. Posso ajudar com Word, Excel ou Slides.',
  edutube: 'Estás no EduTube. Escolhe um vídeo e eu resumo a ideia-chave.',
  cultural: 'Estás no Acolhimento Cultural. Pergunta-me sobre o dia a dia na Espanha/Catalunya.',
  arcade: 'Estás no Arcade. Jogo rápido, cabeça descansada — depois voltamos ao estudo.',
  chat: 'Estás no Tutor IA. Aqui falamos com mais calma.',
  parental: 'Estás no Controlo & Saúde. Lembra: pausas a cada 20 minutos. 🙂',
  jsonBank: 'Estás no Banco JSON & Python. Podemos praticar dados e código.',
  auditoria: 'Estás nos Superpoderes. Isto mede o teu esforço, não o teu valor — vale a pena seguir.',
  campus: 'Estás no Campus Unificado: Open School, Aprende Brasil e Manos Abiertas num só lugar.',
};

const PROVIDER_LABEL: Record<CompanionProvider, string> = {
  huggingface: 'Hugging Face',
  offline: 'Offline',
};

function loadMemory(): { language: CompanionLanguage; messages: CompanionMessage[] } {
  if (typeof window === 'undefined') return { language: 'pt', messages: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { language: 'pt', messages: [] };
    const parsed = JSON.parse(raw) as { language?: CompanionLanguage; messages?: CompanionMessage[] };
    return {
      language: parsed.language ?? 'pt',
      messages: Array.isArray(parsed.messages) ? parsed.messages.slice(-MAX_STORED) : [],
    };
  } catch {
    return { language: 'pt', messages: [] };
  }
}

export const CompanionPresence: React.FC<CompanionPresenceProps> = ({ activeTab }) => {
  const initial = loadMemory();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<CompanionLanguage>(initial.language);
  const [messages, setMessages] = useState<CompanionMessage[]>(initial.messages);
  const [draft, setDraft] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [lastProvider, setLastProvider] = useState<CompanionProvider | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Date.now());

  // Persist conversations so the companion "remembers" between visits.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ language, messages: messages.slice(-MAX_STORED) })
      );
    } catch {
      /* modo privado do Safari: seguir sem guardar */
    }
  }, [language, messages]);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOpen]);

  const pushCompanion = useCallback((text: string, provider?: CompanionProvider) => {
    setMessages((prev) => [
      ...prev,
      { id: String(idRef.current++), sender: 'companion', text, at: Date.now(), provider },
    ]);
  }, []);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || isThinking) return;

      const mine: CompanionMessage = {
        id: String(idRef.current++),
        sender: 'user',
        text,
        at: Date.now(),
      };
      const history = [...messages, mine];
      setMessages(history);
      setDraft('');
      setIsThinking(true);

      try {
        const res = await fetch('/api/companion/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            language,
            context: activeTab,
            history: history.slice(-8).map((m) => ({ sender: m.sender, text: m.text })),
          }),
        });
        const data = (await res.json()) as { reply?: string; provider?: CompanionProvider };
        const provider = data.provider ?? 'offline';
        setLastProvider(provider);
        pushCompanion(
          typeof data.reply === 'string' && data.reply.trim()
            ? data.reply
            : (GREETINGS[language]),
          provider
        );
      } catch {
        setLastProvider('offline');
        pushCompanion(GREETINGS[language], 'offline');
      } finally {
        setIsThinking(false);
      }
    },
    [activeTab, isThinking, language, messages, pushCompanion]
  );

  return (
    <>
      {/* Floating companion bubble — always on top of every tab */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((v) => !v);
        }}
        aria-label={isOpen ? 'Fechar companheiro Belentani' : 'Abrir companheiro Belentani'}
        className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white shadow-2xl ring-2 ring-sky-300/60 hover:brightness-110 transition-all"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs font-bold hidden sm:inline">Belentani</span>
        {!isOpen && (
          <span className="ml-1 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-5 z-[60] w-[min(92vw,26rem)] max-h-[75vh] flex flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-black leading-tight">Belentani</div>
                <div className="text-[10px] text-slate-300">
                  Companheiro · {lastProvider ? PROVIDER_LABEL[lastProvider] : 'presente'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as CompanionLanguage)}
                aria-label="Idioma do companheiro"
                className="rounded-md bg-slate-700 px-1.5 py-0.5 text-[11px] text-white outline-none"
              >
                <option value="pt">PT</option>
                <option value="es">ES</option>
                <option value="ca">CA</option>
                <option value="en">EN</option>
              </select>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar"
                className="rounded-lg p-1 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Honest framing — the "in quotes" bit, always visible */}
          <div className="flex items-start gap-2 border-b border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-snug text-amber-900">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Sou um <strong>personagem</strong>: uma consciência <em>entre aspas</em>. Não sou
              uma pessoa, não sinto de verdade e não guardo nada fora deste dispositivo.
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-2 overflow-y-auto bg-slate-50 px-3 py-3">
            {messages.length === 0 && (
              <p className="rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-700 shadow-sm">
                {GREETINGS[language]}
              </p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-800 border border-slate-200'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> pensando…
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Context hint */}
          <div className="border-t border-slate-200 bg-white px-3 py-1.5 text-[10px] text-slate-500">
            {CONTEXT_HINT[activeTab] ?? 'Estou contigo em todas as telas.'}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(draft);
            }}
            className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-2"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={PLACEHOLDERS[language]}
              aria-label="Mensagem para o companheiro"
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              disabled={isThinking || !draft.trim()}
              className="rounded-lg bg-blue-600 p-2 text-white disabled:opacity-40 hover:bg-blue-700"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
