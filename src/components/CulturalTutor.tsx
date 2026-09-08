import React, { useState } from 'react';
import { CULTURAL_GUIDES, FALSE_FRIENDS } from '../data/curriculumData';
import { CulturalGuideItem, FalseFriendItem } from '../types';
import { Sparkles, Volume2, ShieldAlert, Heart, Music, Users, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { speakBelentani, playSoundSuccess } from '../utils/speech';

export const CulturalTutor: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeGuide, setActiveGuide] = useState<CulturalGuideItem>(CULTURAL_GUIDES[0]);
  const [selectedFalseFriend, setSelectedFalseFriend] = useState<FalseFriendItem>(FALSE_FRIENDS[0]);
  const [searchWord, setSearchWord] = useState('');

  const categories = [
    { id: 'todos', label: 'Todas las Guías', icon: Sparkles },
    { id: 'vida_diaria', label: 'Vida & Horarios', icon: Clock },
    { id: 'lenguaje_instituto', label: 'Jerga del Instituto', icon: MessageCircle },
    { id: 'musica_baile', label: 'Música, Canto & Baile', icon: Music },
    { id: 'fiestas_tradiciones', label: 'Fiestas & Sant Jordi', icon: Heart },
    { id: 'socializacion', label: 'Convivencia & Amigos', icon: Users },
  ];

  const filteredGuides = selectedCategory === 'todos'
    ? CULTURAL_GUIDES
    : CULTURAL_GUIDES.filter(g => g.category === selectedCategory);

  const filteredFalseFriends = FALSE_FRIENDS.filter(ff =>
    ff.pt.toLowerCase().includes(searchWord.toLowerCase()) ||
    ff.correctEs.toLowerCase().includes(searchWord.toLowerCase()) ||
    ff.ca.toLowerCase().includes(searchWord.toLowerCase())
  );

  const handleSpeak = (text: string, lang: 'es' | 'ca' | 'pt' = 'es') => {
    playSoundSuccess();
    speakBelentani(text, { lang, rate: 0.94 });
  };

  return (
    <div className="space-y-6">
      {/* Hero: Belentani as Cultural & Emotional Integration Tutor */}
      <div className="glass-red p-6 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2d55]/20 border border-[#ff2d55]/40 text-[#ff8fa3] text-xs font-bold">
              <span>🌟 Tutor de Acogida Cultural & Convivencia</span>
              <span>•</span>
              <span>Brasil 🇧🇷 ➔ España & Catalunya</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Cómo se Vive, se Canta, se Baila y se Convive en España
            </h2>
            <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
              Llegar de Brasil a los 14 años es una aventura maravillosa. Belentani te enseña los códigos del instituto, cómo socializar sin miedo, la música de las plazas, los horarios y las tradiciones para que te sientas integrado desde el primer día.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff2d55] to-[#800] flex items-center justify-center text-2xl">
              💃🏽
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">Cultura Viva</div>
              <div className="text-[#ff8fa3]">Rumba, Flamenco & Sardanes</div>
              <button
                onClick={() => handleSpeak("En España y Cataluña la música, las palmas y el baile unen a la gente en las plazas. ¡Tus raíces brasileñas de samba y ritmo te harán brillar!", 'es')}
                className="mt-1 text-[11px] text-zinc-300 hover:text-white underline flex items-center gap-1"
              >
                <Volume2 className="w-3 h-3 text-[#ff2d55]" />
                <span>Escuchar consejo de Belentani</span>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#ff2d55] text-white shadow-[0_0_15px_rgba(255,45,85,0.4)] border border-[#ff8fa3]/30'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cultural Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => setActiveGuide(guide)}
            className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
              activeGuide.id === guide.id
                ? 'glass-red border-[#ff2d55] shadow-[0_0_25px_rgba(255,45,85,0.3)]'
                : 'bg-[#180206]/80 border-white/10 hover:border-white/20 hover:bg-white/5'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">
                  {guide.category === 'vida_diaria' ? '⏰' :
                   guide.category === 'lenguaje_instituto' ? '💬' :
                   guide.category === 'musica_baile' ? '🎸' :
                   guide.category === 'fiestas_tradiciones' ? '🌹' : '🤝'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                  {guide.category.replace('_', ' ')}
                </span>
              </div>
              <h3 className="font-bold text-white text-base leading-snug">{guide.title}</h3>
              <p className="text-xs text-zinc-300 line-clamp-2">{guide.description}</p>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
              <div className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                <span>💡 Consejo Danilo:</span>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed line-clamp-2">
                {guide.daniloTip}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="flex items-center gap-1.5 flex-wrap">
                {guide.tags.map(t => (
                  <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400">
                    #{t}
                  </span>
                ))}
              </div>
              {guide.audioPhrase && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(guide.audioPhrase!, 'es');
                  }}
                  className="p-1.5 rounded-lg bg-[#ff2d55]/20 hover:bg-[#ff2d55]/30 text-[#ff8fa3]"
                  title="Escuchar frase modelo"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Spotlight on Selected Cultural Guide */}
      {activeGuide && (
        <div className="glass-red-card p-6 rounded-3xl space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-bold text-[#ff8fa3] uppercase tracking-wider">
                Detalle de Convivencia y Acogida
              </span>
              <h3 className="text-xl font-black text-white mt-0.5">{activeGuide.title}</h3>
            </div>
            {activeGuide.audioPhrase && (
              <button
                onClick={() => handleSpeak(`${activeGuide.title}. ${activeGuide.spainHabit}. En Brasil: ${activeGuide.brazilComparison}. Consejo: ${activeGuide.daniloTip}`, 'es')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white text-xs font-bold hover:brightness-110 shadow-md"
              >
                <Volume2 className="w-4 h-4" />
                <span>Escuchar Guía Completa</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <span>🇪🇸 En España & Cataluña:</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed">
                {activeGuide.spainHabit}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <span>🇧🇷 Paralelismo con Brasil:</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed">
                {activeGuide.brazilComparison}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#ff2d55]/15 to-transparent border border-[#ff2d55]/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#ff2d55] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-white">Consejo Especial de Belentani para Danilo:</div>
              <p className="text-zinc-200 leading-relaxed">{activeGuide.daniloTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* FALSE FRIENDS CRITICAL RADAR (Português -> Español -> Català) */}
      <div className="glass-red p-6 rounded-3xl space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-[#ff2d55]" />
              <span>Escudo Lingüístico de Seguridad</span>
            </div>
            <h3 className="text-xl font-black text-white mt-1">
              Falsos Amigos Críticos (Evitar Malentendidos en Clase)
            </h3>
            <p className="text-xs text-zinc-300 mt-0.5">
              Palabras que suenan igual en portugués y español pero significan cosas totalmente distintas.
            </p>
          </div>

          <input
            type="text"
            placeholder="Buscar palabra en PT o ES..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff2d55] w-full md:w-64"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredFalseFriends.map((ff, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedFalseFriend(ff)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                selectedFalseFriend.pt === ff.pt
                  ? 'bg-[#ff2d55]/20 border-[#ff2d55] shadow-lg'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white text-sm">🇧🇷 {ff.pt}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Trampa: {ff.trap}
                </span>
              </div>
              <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <span>✅ Correcto en ES:</span>
                <span>{ff.correctEs}</span>
              </div>
              <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-1 border-t border-white/5">
                <span>🎗️ Català: <strong className="text-zinc-200">{ff.ca}</strong></span>
                <span>🇬🇧 EN: <strong className="text-zinc-200">{ff.en}</strong></span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected False Friend Deep Dive */}
        {selectedFalseFriend && (
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>🇧🇷 "{selectedFalseFriend.pt}"</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-emerald-400">🇪🇸 "{selectedFalseFriend.correctEs}"</span>
              </div>
              <p className="text-zinc-300">{selectedFalseFriend.example}</p>
              <p className="text-amber-400/90 text-[11px]">
                ⚠️ <strong>Ojo con la trampa:</strong> {selectedFalseFriend.trapMeaning}
              </p>
            </div>

            <button
              onClick={() => handleSpeak(
                `En portugués dices ${selectedFalseFriend.pt}, pero en español se dice ${selectedFalseFriend.correctEs}. ${selectedFalseFriend.trapMeaning}`,
                'es'
              )}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 border border-white/10"
            >
              <Volume2 className="w-4 h-4 text-[#ff8fa3]" />
              <span>Pronunciar Dúo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
