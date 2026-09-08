import React, { useState, useEffect, useRef } from 'react';
import { GAMES_CATALOG, FALSE_FRIENDS } from '../data/curriculumData';
import { MINI_GAMES_500_CATALOG, MINI_GAME_CATEGORIES } from '../data/miniGames500Data';
import { GameItem, ClassicMiniGame } from '../types';
import { 
  Play, RotateCcw, Volume2, ArrowLeft, Trophy, Flame, Heart, 
  Gamepad2, Zap, Sword, Music, FastForward, Castle, Compass,
  Sparkles, Award, Search, Filter, Shuffle, ChevronLeft, ChevronRight,
  Monitor, Star
} from 'lucide-react';
import { speakBelentani, playSoundTone, playSoundSuccess, playSoundError, playSwordSlash } from '../utils/speech';
import confetti from 'canvas-confetti';
import { 
  PongGame, BreakoutGame, SnakeGame, SpaceInvadersGame, 
  TicTacToeGame, HangmanGame, VirtualCabinetSimulator 
} from './RetroArcadeEngines';

export const ArcadeCenter: React.FC = () => {
  const [arcadeMode, setArcadeMode] = useState<'belentani' | '500games'>('500games');
  const [selectedGame, setSelectedGame] = useState<GameItem | ClassicMiniGame | null>(null);
  const [activeTabFilter, setActiveTabFilter] = useState<string>('todos');
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // 500 games state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedEra, setSelectedEra] = useState<string>('todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('todas');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('belentani_fav_games');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const pageSize = 24;

  const toggleFavorite = (gameId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId];
      try {
        localStorage.setItem('belentani_fav_games', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Filter 500 games
  const filtered500Games = MINI_GAMES_500_CATALOG.filter(game => {
    if (selectedCategory === 'favoritos') {
      if (!favorites.includes(game.id)) return false;
    } else if (selectedCategory !== 'todos') {
      const catObj = MINI_GAME_CATEGORIES.find(c => c.id === selectedCategory);
      if (catObj && game.category !== catObj.name) return false;
    }

    if (selectedEra !== 'todas' && game.era !== selectedEra) return false;
    if (selectedDifficulty !== 'todas' && game.difficulty !== selectedDifficulty) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = game.title.toLowerCase().includes(q);
      const matchSkill = game.educationalSkill.toLowerCase().includes(q);
      const matchDesc = game.description.toLowerCase().includes(q);
      const matchCat = game.category.toLowerCase().includes(q);
      if (!matchTitle && !matchSkill && !matchDesc && !matchCat) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filtered500Games.length / pageSize) || 1;
  const paginatedGames = filtered500Games.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const launchRandomGame = () => {
    const randomIdx = Math.floor(Math.random() * MINI_GAMES_500_CATALOG.length);
    const chosen = MINI_GAMES_500_CATALOG[randomIdx];
    playSoundSuccess();
    confetti();
    setSelectedGame(chosen);
    speakBelentani(`¡Lanzando ${chosen.title}! Un clásico de ${chosen.category}.`, { lang: 'es' });
  };

  const handleScoreAdd = (pts: number) => {
    setPlayerScore(p => p + pts);
    setStreak(s => s + 1);
  };

  const isClassicGame = selectedGame && ('builtInEngine' in selectedGame || 'number' in selectedGame);
  const activeEngine = isClassicGame 
    ? (selectedGame as ClassicMiniGame).builtInEngine 
    : (selectedGame as GameItem)?.componentKey;

  return (
    <div className="space-y-6">
      {!selectedGame ? (
        // STORE / ARCADE HUB VIEW (Xbox Glassmorphic Style)
        <div className="space-y-6">
          {/* Main Hero Store Banner */}
          <div className="glass-red p-6 md:p-8 rounded-3xl relative overflow-hidden border border-[#ff2d55]/30">
            <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-35 md:opacity-50 pointer-events-none overflow-hidden">
              <img 
                src="/assets/belentani_stage.jpg" 
                alt="Belentani Stage" 
                className="w-full h-full object-cover object-center mix-blend-screen"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#140104] via-[#140104]/70 to-transparent" />
            </div>

            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2d55]/20 border border-[#ff2d55]/40 text-[#ff8fa3] text-xs font-bold">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Bóveda Arcade de Belentani · 500 Minijuegos Clásicos</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Arcade de los 500 Minijuegos Clásicos
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Catálogo monumental con <strong className="text-white">500 minijuegos clásicos retro</strong> (Pong, Space Invaders, Breakout, Snake, Puzzles, Mates Blitz, Idiomas PT-ES-CA, Plataformas y Estrategia) junto a los 10 juegos insignia en glassmorphism carmesí de Belentani.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Puntuación Total: <strong className="text-white">{playerScore} pts</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Flame className="w-4 h-4 text-rose-500" />
                  <span>Racha Máxima: <strong className="text-white">{streak} seguidas</strong></span>
                </div>
                <button
                  onClick={launchRandomGame}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#ff2d55] text-white font-black text-xs shadow-md hover:brightness-110 flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>🎲 Juego Sorpresa (1 de 500)</span>
                </button>
              </div>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-6">
              <button
                onClick={() => setArcadeMode('500games')}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                  arcadeMode === '500games'
                    ? 'bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white shadow-[0_0_20px_rgba(255,45,85,0.4)]'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Bóveda de 500 Minijuegos Clásicos (500)</span>
              </button>

              <button
                onClick={() => setArcadeMode('belentani')}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                  arcadeMode === 'belentani'
                    ? 'bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white shadow-[0_0_20px_rgba(255,45,85,0.4)]'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>10 Insignias de Belentani</span>
              </button>
            </div>
          </div>

          {/* VIEW A: 500 CLASSIC MINI GAMES EXPLORER */}
          {arcadeMode === '500games' && (
            <div className="space-y-6">
              {/* Search & Filters Bar */}
              <div className="glass-red-card p-5 rounded-3xl space-y-4">
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      placeholder="Buscar entre los 500 juegos clásicos (ej: Pong, Invaders, Álgebra, Snake, Catalán, Pitágoras...)"
                      className="w-full bg-black/40 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff2d55]"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <select
                      value={selectedEra}
                      onChange={(e) => { setSelectedEra(e.target.value); setCurrentPage(1); }}
                      className="bg-black/40 border border-white/15 rounded-2xl px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-[#ff2d55]"
                    >
                      <option value="todas">Todas las Épocas</option>
                      <option value="1970s">Años 70 (Arcade Vintage)</option>
                      <option value="1980s">Años 80 (8-Bit Legend)</option>
                      <option value="1990s">Años 90 (16-Bit Classic)</option>
                      <option value="2000s">Años 2000</option>
                      <option value="Retro Moderno">Retro Moderno Belentani</option>
                    </select>

                    <select
                      value={selectedDifficulty}
                      onChange={(e) => { setSelectedDifficulty(e.target.value); setCurrentPage(1); }}
                      className="bg-black/40 border border-white/15 rounded-2xl px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-[#ff2d55]"
                    >
                      <option value="todas">Cualquier Dificultad</option>
                      <option value="Fácil">Fácil</option>
                      <option value="Media">Media</option>
                      <option value="Difícil">Difícil</option>
                      <option value="Extrema">Extrema</option>
                    </select>
                  </div>
                </div>

                {/* 10 Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  <button
                    onClick={() => { setSelectedCategory('todos'); setCurrentPage(1); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedCategory === 'todos'
                        ? 'bg-[#ff2d55] text-white'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
                    }`}
                  >
                    Todos (500)
                  </button>

                  <button
                    onClick={() => { setSelectedCategory('favoritos'); setCurrentPage(1); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      selectedCategory === 'favoritos'
                        ? 'bg-amber-500 text-black'
                        : 'bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Favoritos ({favorites.length})</span>
                  </button>

                  {MINI_GAME_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedCategory === cat.id
                          ? 'bg-[#ff2d55] text-white shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
                      }`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>

                {/* Results count & page indicator */}
                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                  <span>Mostrando {paginatedGames.length} de {filtered500Games.length} juegos</span>
                  <span>Página {currentPage} de {totalPages}</span>
                </div>
              </div>

              {/* 500 Games Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedGames.map(game => (
                  <div
                    key={game.id}
                    onClick={() => {
                      playSoundSuccess();
                      setSelectedGame(game);
                    }}
                    className="glass-red-card p-5 rounded-3xl border border-white/10 hover:border-[#ff2d55]/60 hover:shadow-[0_0_25px_rgba(255,45,85,0.3)] transition-all cursor-pointer group flex flex-col justify-between space-y-3 hover:-translate-y-1 relative"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                          #{game.number} · {game.era}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => toggleFavorite(game.id, e)}
                            className="p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-amber-400 transition-colors"
                          >
                            <Star className={`w-3.5 h-3.5 ${favorites.includes(game.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </button>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-[#ff8fa3] border border-white/10">
                            {game.difficulty}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block truncate">
                          {game.category}
                        </span>
                        <h3 className="text-base font-black text-white group-hover:text-[#ffd7de] transition-colors truncate mt-0.5">
                          {game.title}
                        </h3>
                        <p className="text-xs text-zinc-300 line-clamp-2 mt-1 leading-relaxed">
                          {game.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 space-y-2">
                      <div className="text-[10px] text-zinc-400 bg-black/30 p-1.5 rounded-lg truncate">
                        🎯 <strong>Habilidad:</strong> {game.educationalSkill}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-amber-400 font-bold text-[11px]">⭐ {game.rating}</span>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#ff2d55] group-hover:text-white transition-colors">
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Jugar Ahora</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(7, totalPages) }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                            currentPage === pageNum
                              ? 'bg-[#ff2d55] text-white shadow-md'
                              : 'bg-white/5 hover:bg-white/10 text-zinc-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 7 && <span className="text-zinc-500 px-1">...</span>}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* VIEW B: 10 BELENTANI FLAGSHIP GAMES */}
          {arcadeMode === 'belentani' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {GAMES_CATALOG.map((game) => (
                <div
                  key={game.id}
                  onClick={() => {
                    playSoundSuccess();
                    setSelectedGame(game);
                  }}
                  className="glass-red-card p-5 rounded-3xl border border-white/10 hover:border-[#ff2d55]/60 hover:shadow-[0_0_30px_rgba(255,45,85,0.35)] transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-[#ff2d55]/25 to-black/40 border border-[#ff2d55]/40 text-white group-hover:scale-110 transition-transform">
                        {game.genre.includes('Ritmo') && <Music className="w-5 h-5 text-[#ff2d55]" />}
                        {game.genre.includes('RPG') && <Sword className="w-5 h-5 text-rose-400" />}
                        {game.genre.includes('Runner') && <FastForward className="w-5 h-5 text-amber-400" />}
                        {game.genre.includes('Duelo') && <Zap className="w-5 h-5 text-emerald-400" />}
                        {game.genre.includes('Puzzle') && <Gamepad2 className="w-5 h-5 text-sky-400" />}
                        {game.genre.includes('Defensa') && <Castle className="w-5 h-5 text-purple-400" />}
                        {game.genre.includes('Vocal') && <Music className="w-5 h-5 text-pink-400" />}
                        {game.genre.includes('Aventura') && <Compass className="w-5 h-5 text-orange-400" />}
                        {game.genre.includes('Matching') && <Zap className="w-5 h-5 text-yellow-400" />}
                        {game.genre.includes('Batalla') && <Trophy className="w-5 h-5 text-red-500" />}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-[#ff8fa3] border border-white/10">
                        {game.difficulty}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#ff8fa3] uppercase tracking-wider">
                        {game.tag}
                      </span>
                      <h3 className="text-lg font-black text-white group-hover:text-[#ffd7de] transition-colors mt-0.5">
                        {game.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                        {game.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-[11px] text-zinc-400">{game.subjectFocus}</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#ff2d55] group-hover:text-white transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Jugar</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // ACTIVE GAME LAUNCHER & CANVAS ARENA
        <div className="space-y-4">
          {/* Active game header bar */}
          <div className="glass-red p-4 rounded-2xl flex items-center justify-between gap-4">
            <button
              onClick={() => setSelectedGame(null)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Game Store</span>
            </button>

            <div className="flex items-center gap-2 text-center">
              <h3 className="text-base font-black text-white">{selectedGame.title}</h3>
              <span className="text-xs text-[#ff8fa3]">
                ({(selectedGame as any).genre || (selectedGame as any).category})
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-amber-400 font-bold">⭐ {playerScore} pts</span>
              <span className="text-rose-400 font-bold">🔥 Racha: {streak}</span>
            </div>
          </div>

          {/* RENDER THE SPECIFIC PLAYABLE GAME */}
          <div className="glass-red-card p-6 rounded-3xl min-h-[500px] flex items-center justify-center relative overflow-hidden">
            {/* 1. Classic Pong Engine */}
            {activeEngine === 'pong' && (
              <PongGame game={selectedGame as ClassicMiniGame} onScore={handleScoreAdd} />
            )}

            {/* 2. Breakout Bricks Engine */}
            {activeEngine === 'breakout' && (
              <BreakoutGame game={selectedGame as ClassicMiniGame} onScore={handleScoreAdd} />
            )}

            {/* 3. Snake 8-Bit Engine */}
            {activeEngine === 'snake' && (
              <SnakeGame game={selectedGame as ClassicMiniGame} onScore={handleScoreAdd} />
            )}

            {/* 4. Space Invaders Engine */}
            {activeEngine === 'spaceInvaders' && (
              <SpaceInvadersGame game={selectedGame as ClassicMiniGame} onScore={handleScoreAdd} />
            )}

            {/* 5. Tic-Tac-Toe Engine */}
            {activeEngine === 'tictactoe' && (
              <TicTacToeGame game={selectedGame as ClassicMiniGame} onScore={handleScoreAdd} />
            )}

            {/* 6. Hangman Trilingual Engine */}
            {activeEngine === 'hangman' && (
              <HangmanGame game={selectedGame as ClassicMiniGame} onScore={handleScoreAdd} />
            )}

            {/* 7. Flagship Belentani Rhythm */}
            {activeEngine === 'rhythm' && (
              <RhythmGame onScore={handleScoreAdd} />
            )}

            {/* 8. Flagship Belentani Combat */}
            {activeEngine === 'combat' && (
              <MathCombatGame onScore={handleScoreAdd} />
            )}

            {/* 9. Flagship Belentani Runner */}
            {activeEngine === 'runner' && (
              <SyntaxRunnerGame onScore={handleScoreAdd} />
            )}

            {/* 10. Flagship Belentani False Friends */}
            {activeEngine === 'falseFriends' && (
              <FalseFriendsDuelGame onScore={handleScoreAdd} />
            )}

            {/* 11. Flagship Belentani 2048 */}
            {activeEngine === 'game2048' && (
              <Math2048Game onScore={handleScoreAdd} />
            )}

            {/* 12. Flagship Belentani Tower Defense */}
            {activeEngine === 'towerDefense' && (
              <TowerDefenseGame onScore={handleScoreAdd} />
            )}

            {/* 13. Flagship Belentani Karaoke */}
            {activeEngine === 'karaoke' && (
              <KaraokeDojoGame onScore={handleScoreAdd} />
            )}

            {/* 14. Flagship Belentani Maze */}
            {activeEngine === 'maze' && (
              <MazeEscapeGame onScore={handleScoreAdd} />
            )}

            {/* 15. Flagship Belentani Links */}
            {activeEngine === 'links' && (
              <LaserLinksGame onScore={handleScoreAdd} />
            )}

            {/* 16. Flagship Belentani SuperQuiz */}
            {activeEngine === 'superQuiz' && (
              <SuperQuizArenaGame onScore={handleScoreAdd} />
            )}

            {/* 17. Default: Virtual Retro Arcade Cabinet for any other of the 500 games */}
            {isClassicGame && !['pong', 'breakout', 'snake', 'spaceInvaders', 'tictactoe', 'hangman', 'rhythm', 'combat', 'runner', 'falseFriends', 'game2048', 'towerDefense', 'karaoke', 'maze', 'links', 'superQuiz'].includes(activeEngine || '') && (
              <VirtualCabinetSimulator game={selectedGame as ClassicMiniGame} onScore={handleScoreAdd} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SUB-GAME 1: RITMO Y CANTO DE BELENTANI (D-F-J-K Rhythm Highway)
   ========================================================================= */
const RhythmGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [lang, setLang] = useState<'es' | 'ca' | 'en'>('es');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [activeLane, setActiveLane] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('¡Presiona D-F-J-K o los botones!');
  
  const wordsByLang = {
    es: ["Amigo", "ven", "a", "aprender", "la", "lengua", "nueva", "va", "a", "florecer", "Belentani", "canta", "para", "ti"],
    ca: ["Bon", "dia", "amic", "vine", "a", "aprendre", "la", "llengua", "nova", "a", "florir", "amb", "Belentani"],
    en: ["My", "friend", "come", "learn", "with", "me", "today", "a", "new", "world", "is", "ready", "now"]
  };

  const currentWords = wordsByLang[lang];
  const [wordIndex, setWordIndex] = useState(0);

  const hitLane = (laneIndex: number) => {
    setActiveLane(laneIndex);
    setTimeout(() => setActiveLane(null), 150);

    const currentWord = currentWords[wordIndex % currentWords.length];
    setWordIndex(i => i + 1);

    // Audio pitch by lane
    const freqs = [330, 440, 550, 660];
    playSoundTone(freqs[laneIndex], 0.12, 'triangle', 0.25);
    speakBelentani(currentWord, { lang, rate: 1.1 });

    const earned = 100 + combo * 10;
    setScore(s => s + earned);
    setCombo(c => c + 1);
    onScore(earned);
    setFeedback(`¡PERFECTO! "${currentWord}" +${earned}`);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'd') hitLane(0);
      else if (k === 'f') hitLane(1);
      else if (k === 'j') hitLane(2);
      else if (k === 'k') hitLane(3);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  return (
    <div className="w-full max-w-xl text-center space-y-6">
      {/* Header & Lang select */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-bold">Idioma:</span>
          {(['es', 'ca', 'en'] as const).map(l => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setWordIndex(0);
                speakBelentani(l === 'es' ? 'Español' : l === 'ca' ? 'Català' : 'English', { lang: l });
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                lang === l ? 'bg-[#ff2d55] text-white' : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="text-xs">
          <span className="text-zinc-400">Puntos: </span>
          <strong className="text-white text-sm">{score}</strong>
          <span className="ml-3 text-rose-400 font-bold">🔥 Combo: {combo}</span>
        </div>
      </div>

      {/* Belentani Singer Avatar */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#ff2d55] shadow-[0_0_30px_rgba(255,45,85,0.6)] animate-float-pulse">
          <img src="/assets/belentani.jpg" alt="Belentani" className="w-full h-full object-cover" />
        </div>
        <div className="text-sm font-bold text-white mt-2">
          🎶 Belentani Canta: <span className="text-[#ff8fa3]">"{currentWords[wordIndex % currentWords.length]}"</span>
        </div>
        <div className="text-xs text-emerald-400 font-medium">{feedback}</div>
      </div>

      {/* 4 Lanes (D - F - J - K) */}
      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {['D', 'F', 'J', 'K'].map((keyLabel, idx) => {
          const isActive = activeLane === idx;
          return (
            <button
              key={keyLabel}
              onClick={() => hitLane(idx)}
              className={`h-36 rounded-2xl border flex flex-col items-center justify-between p-3 transition-all active:scale-95 ${
                isActive
                  ? 'bg-[#ff2d55] border-white shadow-[0_0_35px_rgba(255,45,85,0.8)] translate-y-1'
                  : 'bg-gradient-to-b from-white/10 to-[#250308]/60 border-white/15 hover:border-[#ff2d55]/50'
              }`}
            >
              <span className="text-[10px] text-zinc-400 font-semibold">Pista {idx + 1}</span>
              <div className={`w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center text-xs font-black ${
                isActive ? 'bg-white text-black scale-125' : 'bg-black/40 text-white'
              }`}>
                ♪
              </div>
              <span className="text-lg font-black text-white">{keyLabel}</span>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-zinc-400">
        Toca en el teclado las teclas <strong>D, F, J, K</strong> o haz clic en las columnas para cantar con Belentani.
      </p>
    </div>
  );
};

/* =========================================================================
   SUB-GAME 2: COMBATE MATEMÁTICO CARMESÍ (RPG Battle with equations)
   ========================================================================= */
const MathCombatGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [enemyIndex, setEnemyIndex] = useState(0);
  const enemies = [
    { name: "Slime de Sintaxis", maxHp: 60, icon: "👾" },
    { name: "Fantasma Falsos Amigos", maxHp: 90, icon: "👻" },
    { name: "Dragón de la Ignorancia", maxHp: 140, icon: "🐉" }
  ];

  const currentEnemy = enemies[enemyIndex];
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(currentEnemy.maxHp);
  const [isSlashing, setIsSlashing] = useState(false);
  const [roundEquation, setRoundEquation] = useState<{ eq: string; answer: number; options: number[] }>({
    eq: "2x + 4 = 14",
    answer: 5,
    options: [5, 3, 7, 6]
  });

  const generateEquation = () => {
    const x = Math.floor(Math.random() * 8) + 2;
    const a = Math.floor(Math.random() * 4) + 2;
    const b = Math.floor(Math.random() * 8) + 1;
    const c = a * x + b;

    const correct = x;
    const opts = Array.from(new Set([correct, correct + 1, Math.max(1, correct - 2), correct + 3])).slice(0, 4);
    while (opts.length < 4) opts.push(opts.length + 8);
    opts.sort(() => Math.random() - 0.5);

    setRoundEquation({
      eq: `${a}x + ${b} = ${c}`,
      answer: correct,
      options: opts
    });
  };

  const handleAttack = (selectedOpt: number) => {
    if (selectedOpt === roundEquation.answer) {
      // Success slash
      playSwordSlash();
      setIsSlashing(true);
      setTimeout(() => setIsSlashing(false), 400);

      const dmg = 30;
      const nextEnemyHp = Math.max(0, enemyHp - dmg);
      setEnemyHp(nextEnemyHp);
      onScore(150);

      if (nextEnemyHp <= 0) {
        confetti();
        if (enemyIndex + 1 < enemies.length) {
          setEnemyIndex(i => i + 1);
          setEnemyHp(enemies[enemyIndex + 1].maxHp);
        } else {
          speakBelentani("¡Victoria total! Has derrotado a todos los jefes con el poder del álgebra, William Danilo.", { lang: 'es' });
        }
      }
    } else {
      // Miss and take hit
      playSoundError();
      setPlayerHp(hp => Math.max(0, hp - 15));
    }
    generateEquation();
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Battle Arena View */}
      <div className="flex items-center justify-between gap-6 px-4">
        {/* Belentani Warrior Side */}
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#ff2d55] shadow-[0_0_20px_rgba(255,45,85,0.4)]">
            <img src="/assets/belentani.jpg" alt="Belentani" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-black text-white">BELENTANI</div>
            <div className="w-32 h-3 bg-black/60 rounded-full overflow-hidden border border-white/10 mt-1">
              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${playerHp}%` }} />
            </div>
            <span className="text-[10px] text-zinc-400">{playerHp}/100 HP</span>
          </div>
        </div>

        {/* VS Badge */}
        <div className="text-xs font-black text-[#ff8fa3] px-2.5 py-1 rounded-full bg-black/40 border border-[#ff2d55]/30">
          ⚔️ VS ⚔️
        </div>

        {/* Enemy Side */}
        <div className="flex items-center gap-3 text-right">
          <div>
            <div className="text-sm font-black text-white">{currentEnemy.name}</div>
            <div className="w-32 h-3 bg-black/60 rounded-full overflow-hidden border border-white/10 mt-1">
              <div 
                className="h-full bg-[#ff2d55] rounded-full transition-all" 
                style={{ width: `${(enemyHp / currentEnemy.maxHp) * 100}%` }} 
              />
            </div>
            <span className="text-[10px] text-zinc-400">{enemyHp}/{currentEnemy.maxHp} HP</span>
          </div>
          <div className={`w-20 h-20 rounded-2xl bg-black/50 border-2 border-rose-500/30 flex items-center justify-center text-4xl ${
            isSlashing ? 'animate-ping text-rose-500' : ''
          }`}>
            {currentEnemy.icon}
          </div>
        </div>
      </div>

      {/* Slash Effect overlay */}
      {isSlashing && (
        <div className="text-center text-rose-400 text-lg font-black animate-bounce">
          ⚡ ¡TAJO CARMESÍ! -30 DAÑO CRÍTICO ⚡
        </div>
      )}

      {/* Equation Challenge Box */}
      <div className="glass-red p-6 rounded-2xl text-center space-y-4">
        <span className="text-xs font-bold text-[#ff8fa3] uppercase">
          Resuelve la ecuación para atacar al monstruo:
        </span>
        <div className="text-2xl md:text-3xl font-black text-white font-mono tracking-wider">
          {roundEquation.eq}  ➔  <span className="text-[#ff2d55]">¿x = ?</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
          {roundEquation.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAttack(opt)}
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-[#ff2d55] text-white font-bold text-lg border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              x = {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SUB-GAME 3: SYNTAX RUNNER (3-lane runner)
   ========================================================================= */
const SyntaxRunnerGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [lane, setLane] = useState<number>(1); // 0, 1, 2
  const [currentPrompt, setCurrentPrompt] = useState(FALSE_FRIENDS[0]);
  const [status, setStatus] = useState<string>('¡Usa Flechas Izquierda/Derecha o botones para esquivar!');
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  const nextChallenge = () => {
    const nextFf = FALSE_FRIENDS[Math.floor(Math.random() * FALSE_FRIENDS.length)];
    setCurrentPrompt(nextFf);
  };

  const handlePickLane = (chosenLane: number) => {
    setLane(chosenLane);
    // Lane 0 or 2 will be correct or trap
    if (chosenLane === 1) return;

    if (chosenLane === 0) {
      // Left is correct
      playSoundSuccess();
      setScore(s => s + 100);
      onScore(100);
      setStatus(`¡CORRECTO! Recogiste "${currentPrompt.correctEs}"`);
      nextChallenge();
    } else {
      // Right is trap
      playSoundError();
      setLives(l => Math.max(0, l - 1));
      setStatus(`¡TRAMPA! "${currentPrompt.trap}" es falso amigo.`);
      nextChallenge();
    }
  };

  return (
    <div className="w-full max-w-xl space-y-5 text-center">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">Puntos: <strong className="text-white">{score}</strong></span>
        <div className="flex items-center gap-1 text-rose-500">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart key={i} className={`w-4 h-4 ${i < lives ? 'fill-rose-500 text-rose-500' : 'text-zinc-600'}`} />
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
        <div className="text-xs text-[#ff8fa3] font-bold">PALABRA OBJETIVO EN PORTUGUÉS:</div>
        <div className="text-2xl font-black text-white">"{currentPrompt.pt}"</div>
        <div className="text-xs text-zinc-400">{status}</div>
      </div>

      {/* 3 Lanes */}
      <div className="grid grid-cols-3 gap-3 h-52 bg-black/40 rounded-2xl p-3 border border-white/10 relative">
        {/* Lane 0: Correct word */}
        <div 
          onClick={() => handlePickLane(0)}
          className={`rounded-xl border flex flex-col items-center justify-between p-3 cursor-pointer transition-all ${
            lane === 0 ? 'bg-[#ff2d55]/30 border-[#ff2d55]' : 'bg-emerald-950/20 border-emerald-500/30'
          }`}
        >
          <span className="text-[10px] text-emerald-400 font-bold">CARRIL 1</span>
          <span className="text-sm font-black text-white">{currentPrompt.correctEs}</span>
          <span className="text-[10px] text-emerald-300">✅ Correcto</span>
        </div>

        {/* Lane 1: Center road */}
        <div 
          onClick={() => handlePickLane(1)}
          className={`rounded-xl border flex flex-col items-center justify-between p-3 cursor-pointer transition-all ${
            lane === 1 ? 'bg-[#ff2d55]/30 border-[#ff2d55]' : 'bg-white/5 border-white/10'
          }`}
        >
          <span className="text-[10px] text-zinc-400">CENTRO</span>
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#ff2d55] animate-bounce">
            <img src="/assets/belentani.jpg" alt="Runner" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] text-zinc-400">Belentani</span>
        </div>

        {/* Lane 2: Trap word */}
        <div 
          onClick={() => handlePickLane(2)}
          className={`rounded-xl border flex flex-col items-center justify-between p-3 cursor-pointer transition-all ${
            lane === 2 ? 'bg-[#ff2d55]/30 border-[#ff2d55]' : 'bg-rose-950/20 border-rose-500/30'
          }`}
        >
          <span className="text-[10px] text-rose-400 font-bold">CARRIL 3</span>
          <span className="text-sm font-black text-white">{currentPrompt.trap}</span>
          <span className="text-[10px] text-rose-400">⚠️ Falso Amigo</span>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button 
          onClick={() => handlePickLane(0)} 
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
        >
          ⬅ Ir al Carril 1 (Correcto)
        </button>
        <button 
          onClick={() => handlePickLane(2)} 
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
        >
          Ir al Carril 3 (Trampa) ➔
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   SUB-GAME 4: CAZA-FALSOS AMIGOS (Duel of words)
   ========================================================================= */
const FalseFriendsDuelGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const current = FALSE_FRIENDS[index % FALSE_FRIENDS.length];

  const handleChoose = (isTrap: boolean) => {
    if (!isTrap) {
      playSoundSuccess();
      setScore(s => s + 100);
      onScore(100);
      setFeedback(`¡EXCELENTE! "${current.correctEs}" es la traducción real.`);
    } else {
      playSoundError();
      setFeedback(`¡CUIDADO! "${current.trap}" es la trampa falsa amiga.`);
    }
    setIndex(i => i + 1);
  };

  return (
    <div className="w-full max-w-lg text-center space-y-5">
      <div className="text-xs text-zinc-400">Puntos: <strong className="text-white">{score}</strong></div>
      <div className="glass-red p-6 rounded-3xl space-y-4">
        <div className="text-xs text-[#ff8fa3] font-bold">PALABRA EN PORTUGUÉS:</div>
        <div className="text-3xl font-black text-white tracking-wide">
          "{current.pt}"
        </div>
        <p className="text-xs text-zinc-300">¿Cuál es la traducción correcta en ESPAÑOL?</p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => handleChoose(true)}
            className="p-4 rounded-2xl bg-white/10 hover:bg-rose-950/60 border border-white/15 text-white font-bold text-sm transition-all active:scale-95"
          >
            A) {current.trap}
          </button>
          <button
            onClick={() => handleChoose(false)}
            className="p-4 rounded-2xl bg-white/10 hover:bg-emerald-950/60 border border-white/15 text-white font-bold text-sm transition-all active:scale-95"
          >
            B) {current.correctEs}
          </button>
        </div>

        {feedback && (
          <div className="p-3 rounded-xl bg-black/40 text-xs text-zinc-200 border border-white/10">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   SUB-GAME 5: 2048 MATES BELENTANI
   ========================================================================= */
const Math2048Game: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [grid, setGrid] = useState<number[][]>([
    [2, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 4, 0],
    [0, 0, 0, 0]
  ]);
  const [target, setTarget] = useState(16);

  const slideLeft = () => {
    const newGrid = grid.map(row => {
      const filtered = row.filter(n => n !== 0);
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          onScore(filtered[i] * 5);
          filtered.splice(i + 1, 1);
        }
      }
      while (filtered.length < 4) filtered.push(0);
      return filtered;
    });

    // Add random 2
    const emptyCells: [number, number][] = [];
    newGrid.forEach((r, rIdx) => r.forEach((val, cIdx) => {
      if (val === 0) emptyCells.push([rIdx, cIdx]);
    }));

    if (emptyCells.length > 0) {
      const [rr, cc] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newGrid[rr][cc] = 2;
    }

    playSoundTone(440, 0.08);
    setGrid(newGrid);
  };

  return (
    <div className="w-full max-w-sm text-center space-y-4">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">Objetivo Matemático:</span>
        <span className="px-2 py-0.5 rounded bg-[#ff2d55] text-white font-bold">Crea ficha {target}</span>
      </div>

      {/* 4x4 Grid */}
      <div className="grid grid-cols-4 gap-2 bg-black/60 p-3 rounded-2xl border border-white/10">
        {grid.flat().map((val, idx) => (
          <div
            key={idx}
            className={`h-16 rounded-xl flex items-center justify-center font-black text-lg border transition-all ${
              val === 0
                ? 'bg-white/5 border-white/5 text-transparent'
                : val >= 16
                ? 'bg-[#ff2d55] text-white border-white/40 shadow-lg scale-105'
                : 'bg-white/15 text-white border-white/20'
            }`}
          >
            {val || ''}
          </div>
        ))}
      </div>

      <button
        onClick={slideLeft}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white font-bold text-xs hover:brightness-110 shadow-md"
      >
        Deslizar y Fusionar Números
      </button>
    </div>
  );
};

/* =========================================================================
   SUB-GAME 6: TORRE DE PALABRAS (Tower defense)
   ========================================================================= */
const TowerDefenseGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [wave, setWave] = useState(1);
  const [castleHp, setCastleHp] = useState(100);
  const [currentProblem, setCurrentProblem] = useState(FALSE_FRIENDS[0]);

  const handleShoot = (opt: string) => {
    if (opt === currentProblem.correctEs) {
      playSoundSuccess();
      playSwordSlash();
      onScore(120);
      setWave(w => w + 1);
      setCurrentProblem(FALSE_FRIENDS[Math.floor(Math.random() * FALSE_FRIENDS.length)]);
    } else {
      playSoundError();
      setCastleHp(hp => Math.max(0, hp - 20));
    }
  };

  return (
    <div className="w-full max-w-lg text-center space-y-4">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">Oleada: <strong className="text-white">{wave}/12</strong></span>
        <span className="text-rose-400 font-bold">Castillo: {castleHp}/100 HP</span>
      </div>

      <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
        <div className="text-3xl">🏰 💥 👾</div>
        <div className="text-xs text-zinc-400">
          El monstruo invasor grita: <strong className="text-white">"{currentProblem.pt}"</strong>
        </div>
        <p className="text-xs text-zinc-300">Dispara la traducción correcta antes del impacto:</p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {[currentProblem.correctEs, currentProblem.trap].sort().map((w, i) => (
            <button
              key={i}
              onClick={() => handleShoot(w)}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-[#ff2d55] text-white font-bold text-xs border border-white/10"
            >
              🎯 {w}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SUB-GAME 7: KARAOKE & FONÉTICA DOJO
   ========================================================================= */
const KaraokeDojoGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [lang, setLang] = useState<'es' | 'ca' | 'en'>('es');
  const phrases = {
    es: ["Buenos días, hoy vamos a estudiar matemáticas.", "El perro corre rápido por la carretera.", "La célula es la unidad de la vida."],
    ca: ["Bon dia a tothom a l'institut.", "Avui farem els deures de ciències.", "La llengua catalana és molt maca."],
    en: ["I have lived in Spain for two months.", "Mathematics and science are awesome.", "Welcome to Belentani School."]
  };
  const [idx, setIdx] = useState(0);

  const phrase = phrases[lang][idx % phrases[lang].length];

  return (
    <div className="w-full max-w-lg text-center space-y-4">
      <div className="flex justify-center gap-2">
        {(['es', 'ca', 'en'] as const).map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase ${lang === l ? 'bg-[#ff2d55] text-white' : 'bg-white/5 text-zinc-400'}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="glass-red p-6 rounded-3xl space-y-3">
        <span className="text-xs text-zinc-400 font-bold uppercase">Repite con voz alta:</span>
        <div className="text-xl font-black text-white">"{phrase}"</div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => {
              speakBelentani(phrase, { lang });
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff2d55] text-white text-xs font-bold shadow-md hover:brightness-110"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar a Belentani</span>
          </button>

          <button
            onClick={() => {
              playSoundSuccess();
              onScore(100);
              setIdx(i => i + 1);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold shadow-md hover:bg-emerald-600"
          >
            ¡Lo he pronunciado! (+100 pts)
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SUB-GAME 8: LABERINTO DEL INSTITUTO (Maze Escape)
   ========================================================================= */
const MazeEscapeGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [collected, setCollected] = useState(0);
  const target = 3;

  const move = (dr: number, dc: number) => {
    const nextR = Math.max(0, Math.min(3, pos.r + dr));
    const nextC = Math.max(0, Math.min(3, pos.c + dc));
    setPos({ r: nextR, c: nextC });
    playSoundTone(480, 0.05);

    if (nextR === 3 && nextC === 3 && collected < target) {
      setCollected(c => c + 1);
      onScore(150);
      playSoundSuccess();
    }
  };

  return (
    <div className="w-full max-w-sm text-center space-y-4">
      <div className="text-xs text-zinc-400">
        Objetos del instituto recogidos: <strong className="text-emerald-400">{collected}/{target}</strong>
      </div>

      <div className="grid grid-cols-4 gap-2 bg-black/60 p-3 rounded-2xl border border-white/10">
        {Array.from({ length: 16 }).map((_, i) => {
          const r = Math.floor(i / 4);
          const c = i % 4;
          const isPlayer = pos.r === r && pos.c === c;
          const isGoal = r === 3 && c === 3;

          return (
            <div
              key={i}
              className={`h-14 rounded-xl flex items-center justify-center font-bold text-base border transition-all ${
                isPlayer
                  ? 'bg-[#ff2d55] text-white border-white scale-105 shadow-md'
                  : isGoal
                  ? 'bg-emerald-900/40 text-emerald-300 border-emerald-500/40'
                  : 'bg-white/5 border-white/5 text-zinc-600'
              }`}
            >
              {isPlayer ? '🚶‍♂️' : isGoal ? '🏫' : '·'}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
        <div />
        <button onClick={() => move(-1, 0)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold">▲</button>
        <div />
        <button onClick={() => move(0, -1)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold">◀</button>
        <button onClick={() => move(1, 0)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold">▼</button>
        <button onClick={() => move(0, 1)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold">▶</button>
      </div>
    </div>
  );
};

/* =========================================================================
   SUB-GAME 9: ENLACES TRILINGÜES LÁSER
   ========================================================================= */
const LaserLinksGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const pairs = [
    { pt: "Escola", es: "Escuela", ca: "Escola", en: "School" },
    { pt: "Livro", es: "Libro", ca: "Llibre", en: "Book" },
    { pt: "Deveres", es: "Deberes", ca: "Deures", en: "Homework" }
  ];
  const [selectedPt, setSelectedPt] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);

  const handleLink = (targetWord: string, ptOrigin: string) => {
    if (selectedPt === ptOrigin) {
      playSoundSuccess();
      setCompleted([...completed, ptOrigin]);
      setSelectedPt(null);
      onScore(150);
    } else {
      playSoundError();
      setSelectedPt(null);
    }
  };

  return (
    <div className="w-full max-w-md text-center space-y-4">
      <div className="text-xs text-zinc-400">Conecta cada palabra en Portugués con su par en Español:</div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left: PT */}
        <div className="space-y-2">
          {pairs.map(p => (
            <button
              key={p.pt}
              disabled={completed.includes(p.pt)}
              onClick={() => setSelectedPt(p.pt)}
              className={`w-full p-3 rounded-xl border text-xs font-bold transition-all ${
                completed.includes(p.pt)
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 line-through'
                  : selectedPt === p.pt
                  ? 'bg-[#ff2d55] text-white border-white'
                  : 'bg-white/10 text-white border-white/10 hover:bg-white/15'
              }`}
            >
              🇧🇷 {p.pt}
            </button>
          ))}
        </div>

        {/* Right: ES */}
        <div className="space-y-2">
          {pairs.map(p => (
            <button
              key={p.es}
              disabled={completed.includes(p.pt)}
              onClick={() => handleLink(p.es, p.pt)}
              className={`w-full p-3 rounded-xl border text-xs font-bold transition-all ${
                completed.includes(p.pt)
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                  : 'bg-white/10 text-white border-white/10 hover:bg-white/15'
              }`}
            >
              🇪🇸 {p.es}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SUB-GAME 10: SUPER QUIZ ARENA ESO (Final Boss)
   ========================================================================= */
const SuperQuizArenaGame: React.FC<{ onScore: (pts: number) => void }> = ({ onScore }) => {
  const quizQuestions = [
    { q: "Si 3x - 5 = 10, ¿cuánto vale x?", opts: ["5", "3", "15"], correct: 0 },
    { q: "¿Qué significa 'Embaraçada' en portugués?", opts: ["Avergonzada", "Embarazada", "Enfadada"], correct: 0 },
    { q: "¿Cómo se dice 'Deberes' en catalán?", opts: ["Deures", "Deberes", "Treballs"], correct: 0 },
    { q: "¿Qué orgánulo celular produce energía (ATP)?", opts: ["Mitocondria", "Ribosoma", "Núcleo"], correct: 0 },
    { q: "¿Qué festividad en Cataluña regala libros y rosas?", opts: ["Sant Jordi", "Carnaval", "Nochebuena"], correct: 0 }
  ];

  const [qIdx, setQIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (optIdx: number) => {
    if (optIdx === quizQuestions[qIdx].correct) {
      playSoundSuccess();
      onScore(200);
    } else {
      playSoundError();
    }

    if (qIdx + 1 < quizQuestions.length) {
      setQIdx(i => i + 1);
    } else {
      confetti();
      setFinished(true);
      speakBelentani("¡Has completado el Super Quiz Arena, Danilo! Eres un auténtico guerrero del instituto.", { lang: 'es' });
    }
  };

  return (
    <div className="w-full max-w-lg text-center space-y-4">
      {!finished ? (
        <div className="glass-red p-6 rounded-3xl space-y-4">
          <span className="text-xs text-[#ff8fa3] font-bold">PREGUNTA {qIdx + 1} DE {quizQuestions.length}</span>
          <div className="text-xl font-black text-white">{quizQuestions[qIdx].q}</div>

          <div className="space-y-2 pt-2">
            {quizQuestions[qIdx].opts.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-[#ff2d55] text-white font-bold text-xs border border-white/15 transition-all text-left"
              >
                {i + 1}) {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-red p-8 rounded-3xl space-y-4">
          <Trophy className="w-16 h-16 text-amber-400 mx-auto" />
          <h3 className="text-2xl font-black text-white">¡ARENA SUPERADA!</h3>
          <p className="text-xs text-zinc-300">
            Has demostrado tu dominio de las materias de ESO y cultura general española y catalana.
          </p>
          <button
            onClick={() => {
              setQIdx(0);
              setFinished(false);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#ff2d55] text-white font-bold text-xs shadow-lg"
          >
            Jugar de Nuevo
          </button>
        </div>
      )}
    </div>
  );
};
