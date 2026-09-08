import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { Send, Mic, MicOff, Volume2, Sparkles, User, RefreshCw, Languages, HelpCircle } from 'lucide-react';
import { speakBelentani, stopSpeaking, playSoundSuccess, playSoundError } from '../utils/speech';

export const AITutorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'belentani',
      text: '¡Hola William Danilo! ⚔️🎵 Soy Belentani, tu tutor, guerrero y cantante. Estoy aquí para acompañarte en tu aventura en el instituto: resolveremos cualquier duda de matemáticas, practicaremos español, catalán e inglés conectándolos con tu portugués brasileño, y te enseñaré cómo se vive, se canta y se disfruta la cultura en España y Cataluña. ¿Qué materia o pregunta quieres explorar hoy?',
      language: 'es',
      timestamp: 'Ahora'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentLang, setCurrentLang] = useState<'es' | 'ca' | 'en' | 'pt'>('es');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageContent,
      language: currentLang,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);
    playSoundSuccess();

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          language: currentLang,
          history: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await res.json();
      const replyText = data.reply || data.fallbackReply || '¡Muy bien Danilo! Continúa así.';

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'belentani',
        text: replyText,
        language: currentLang,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      // Speak the answer automatically
      speakBelentani(replyText, { lang: currentLang });
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'belentani',
        text: '¡Tranquilo Danilo! He tenido una pequeña interrupción de señal, pero no te preocupes: para resolver cualquier duda en matemáticas o idiomas, ¡recuerda que tu cerebro bilingüe tiene una fuerza enorme!',
        language: 'es',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVoiceInput = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionClass = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition 
      || (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert('El reconocimiento por micrófono no está disponible en este navegador. Puedes escribir directamente.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = currentLang === 'ca' ? 'ca-ES' : currentLang === 'en' ? 'en-US' : currentLang === 'pt' ? 'pt-BR' : 'es-ES';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendMessage(transcript);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const quickPrompts = [
    { label: "🧮 Ecuación 3º ESO", query: "Explícame cómo resolver una ecuación con paréntesis paso a paso." },
    { label: "⚠️ Falso Amigo", query: "¿Cuál es la diferencia entre 'embaraçada' en portugués y 'embarazada' en español?" },
    { label: "🎗️ Deberes en Catalán", query: "¿Cómo pido los deberes al profesor en catalán y cómo hablo del patio escolar?" },
    { label: "🇬🇧 Inglés B1", query: "Let's practice a short dialogue about school subjects in English." },
    { label: "💃 Rumba y Cultura", query: "¿Cómo es la rumba catalana, el compás de palmas y la fiesta de Sant Jordi?" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Belentani Profile & Quick Skills */}
      <div className="lg:col-span-4 space-y-4">
        <div className="glass-red p-6 rounded-3xl text-center space-y-4">
          <div className="relative inline-block mx-auto">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#ff2d55] shadow-[0_0_35px_rgba(255,45,85,0.6)] p-0.5 bg-gradient-to-br from-[#ff2d55] to-[#300]">
              <img src="/assets/belentani.jpg" alt="Belentani" className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="absolute bottom-0 right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[9px] font-black uppercase">
              Online
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black text-white">BELENTANI AI</h3>
            <p className="text-xs text-[#ff8fa3] font-medium">Guerrero & Cantante · Voz Humana Ilimitada</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-zinc-300 text-left space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span>Superpoderes del Tutor:</span>
            </div>
            <ul className="space-y-1 text-[11px] text-zinc-300">
              <li>• <strong>5 Idiomas:</strong> Español, Catalán, Inglés, Portugués, Francés.</li>
              <li>• <strong>Voz Humana:</strong> Lee en voz alta con entonación natural.</li>
              <li>• <strong>Andamiaje Afectivo:</strong> Cero juicios, paciencia infinita.</li>
              <li>• <strong>Matemáticas ESO:</strong> Guía socrática paso a paso.</li>
            </ul>
          </div>

          {/* Language selector */}
          <div className="space-y-1 text-left">
            <label className="text-[11px] font-bold text-zinc-400 uppercase flex items-center gap-1">
              <Languages className="w-3 h-3 text-[#ff2d55]" />
              <span>Idioma Principal de Práctica:</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'es', label: 'Castellano' },
                { id: 'ca', label: 'Català' },
                { id: 'en', label: 'English' },
                { id: 'pt', label: 'Português' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentLang(item.id as any)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all ${
                    currentLang === item.id
                      ? 'bg-[#ff2d55] text-white'
                      : 'bg-white/5 hover:bg-white/10 text-zinc-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Question Prompts */}
        <div className="glass-red-card p-5 rounded-3xl space-y-2.5">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#ff8fa3]" />
            <span>Preguntas Rápidas de Danilo</span>
          </div>
          <div className="space-y-1.5">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.query)}
                className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#ff2d55]/40 text-xs text-zinc-200 transition-all flex items-center justify-between"
              >
                <span>{qp.label}</span>
                <span className="text-[#ff8fa3] text-[10px]">Preguntar ➔</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Chat Stream & Interactive Voice Messenger */}
      <div className="lg:col-span-8 flex flex-col h-[650px] glass-red-card rounded-3xl p-4 md:p-6 overflow-hidden">
        {/* Chat message history stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#ff2d55] shrink-0">
                    <img src="/assets/belentani.jpg" alt="Belentani" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                  isMe
                    ? 'bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white rounded-tr-none shadow-md'
                    : 'bg-black/50 border border-white/10 text-zinc-100 rounded-tl-none'
                }`}>
                  <div className="flex items-center justify-between gap-3 text-[10px] opacity-70 pb-1 border-b border-white/10">
                    <span className="font-bold">{isMe ? 'William Danilo' : 'Belentani (Tutor)'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {!isMe && (
                    <div className="pt-2 flex items-center justify-end">
                      <button
                        onClick={() => speakBelentani(msg.text, { lang: currentLang })}
                        className="flex items-center gap-1.5 text-[11px] font-medium text-[#ffd7de] hover:text-white px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Escuchar con voz</span>
                      </button>
                    </div>
                  )}
                </div>

                {isMe && (
                  <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-zinc-300" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#ff2d55]">
                <img src="/assets/belentani.jpg" alt="Belentani" className="w-full h-full object-cover animate-pulse" />
              </div>
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-[#ff8fa3] flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Belentani está pensando y preparando la respuesta pedagógica...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-2">
            {/* Mic recording button */}
            <button
              onClick={handleToggleVoiceInput}
              className={`p-3 rounded-2xl border transition-all ${
                isRecording
                  ? 'bg-red-600 text-white animate-pulse border-white'
                  : 'bg-white/10 hover:bg-white/15 text-zinc-300 border-white/10'
              }`}
              title={isRecording ? "Detener grabación" : "Hablar con el micrófono"}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-[#ff8fa3]" />}
            </button>

            {/* Text input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={`Pregunta en ${currentLang === 'pt' ? 'português' : currentLang === 'ca' ? 'català' : currentLang === 'en' ? 'English' : 'español'} a Belentani...`}
              className="flex-1 px-4 py-3 rounded-2xl bg-black/50 border border-white/15 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff2d55]"
            />

            {/* Send button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputText.trim()}
              className="p-3 rounded-2xl bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 shadow-[0_0_15px_rgba(255,45,85,0.4)]"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 px-1">
            <span>Presiona ENTER para enviar • Puedes hablar por micrófono o escribir</span>
            <span>Tutor de Inteligencia Artificial Protegida</span>
          </div>
        </div>
      </div>
    </div>
  );
};
