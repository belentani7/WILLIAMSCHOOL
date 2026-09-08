import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, Trophy, Star, Sparkles, Award, Zap, Heart, CheckCircle2, Monitor } from 'lucide-react';
import { ClassicMiniGame } from '../types';
import { playSoundSuccess, playSoundClick, speakBelentani } from '../utils/speech';
import confetti from 'canvas-confetti';

interface RetroGameProps {
  game: ClassicMiniGame;
  onScore: (pts: number) => void;
}

// 1. PONG RETRO 1972
export const PongGame: React.FC<RetroGameProps> = ({ onScore }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [p1Score, setP1Score] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let ballX = 300;
    let ballY = 180;
    let ballSpeedX = 4.5;
    let ballSpeedY = 3.5;
    let paddle1Y = 140;
    let paddle2Y = 140;
    const paddleHeight = 70;
    const paddleWidth = 12;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      paddle1Y = Math.max(10, Math.min(canvas.height - paddleHeight - 10, relativeY - paddleHeight / 2));
    };

    window.addEventListener('mousemove', handleMouseMove);

    const loop = () => {
      // Clear
      ctx.fillStyle = '#0f0507';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center dotted line
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = 'rgba(255, 45, 85, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Move CPU paddle smoothly towards ball
      const cpuCenter = paddle2Y + paddleHeight / 2;
      if (cpuCenter < ballY - 15) paddle2Y += 3.4;
      else if (cpuCenter > ballY + 15) paddle2Y -= 3.4;
      paddle2Y = Math.max(10, Math.min(canvas.height - paddleHeight - 10, paddle2Y));

      // Move Ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Bounce top / bottom
      if (ballY <= 8 || ballY >= canvas.height - 8) {
        ballSpeedY = -ballSpeedY;
      }

      // Check Paddle 1 (Player) collision
      if (ballX <= 30 && ballX >= 15 && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
        ballSpeedX = Math.abs(ballSpeedX) * 1.05;
        const delta = (ballY - (paddle1Y + paddleHeight / 2)) / (paddleHeight / 2);
        ballSpeedY = delta * 5;
        ballX = 31;
        playSoundClick();
      }

      // Check Paddle 2 (CPU) collision
      if (ballX >= canvas.width - 30 && ballX <= canvas.width - 15 && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
        ballSpeedX = -Math.abs(ballSpeedX) * 1.05;
        const delta = (ballY - (paddle2Y + paddleHeight / 2)) / (paddleHeight / 2);
        ballSpeedY = delta * 5;
        ballX = canvas.width - 31;
        playSoundClick();
      }

      // Score P1
      if (ballX > canvas.width) {
        setP1Score(s => {
          const next = s + 1;
          onScore(50);
          if (next >= 5) {
            setWinner('¡Ganó Danilo!');
            setIsPlaying(false);
            confetti();
            playSoundSuccess();
          }
          return next;
        });
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -4;
        ballSpeedY = (Math.random() - 0.5) * 4;
      }

      // Score CPU
      if (ballX < 0) {
        setCpuScore(s => {
          const next = s + 1;
          if (next >= 5) {
            setWinner('¡Punto para CPU Belentani!');
            setIsPlaying(false);
          }
          return next;
        });
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 4;
        ballSpeedY = (Math.random() - 0.5) * 4;
      }

      // Draw Paddles with glowing carmesí
      ctx.fillStyle = '#ff2d55';
      ctx.shadowColor = '#ff2d55';
      ctx.shadowBlur = 10;
      ctx.fillRect(18, paddle1Y, paddleWidth, paddleHeight);

      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fillRect(canvas.width - 18 - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

      // Draw Ball
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlaying, onScore]);

  const resetGame = () => {
    setP1Score(0);
    setCpuScore(0);
    setWinner(null);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between w-full px-4 text-xs font-bold text-white">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff2d55]" />
          <span>DANILO (Tú): {p1Score}</span>
        </div>
        <span className="text-zinc-400">PRIMERO A 5 PUNTOS</span>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#38bdf8]" />
          <span>CPU BELENTANI: {cpuScore}</span>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden border-2 border-[#ff2d55]/40 shadow-[0_0_30px_rgba(255,45,85,0.25)] bg-[#0f0507]">
        <canvas ref={canvasRef} width={600} height={360} className="block cursor-none max-w-full" />
        
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <Trophy className="w-12 h-12 text-[#ff2d55] animate-bounce" />
            <h3 className="text-2xl font-black text-white">
              {winner || 'PONG 1972 VINTAGE'}
            </h3>
            <p className="text-xs text-zinc-300 max-w-sm">
              Mueve el ratón arriba y abajo para controlar la pala carmesí. Calcula el ángulo del rebote.
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white font-bold text-sm shadow-lg hover:brightness-110 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{winner ? 'Jugar Otra Vez' : 'Comenzar Partida'}</span>
            </button>
          </div>
        )}
      </div>

      <div className="text-[11px] text-zinc-400 text-center">
        💡 <strong>Física aplicada:</strong> El ángulo de salida depende del punto exacto de la pala donde impacte la bola.
      </div>
    </div>
  );
};

// 2. BREAKOUT / ARKANOID
export const BreakoutGame: React.FC<RetroGameProps> = ({ onScore }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let paddleX = 250;
    const paddleWidth = 90;
    const paddleHeight = 12;

    let ballX = 300;
    let ballY = 300;
    let ballSpeedX = 4;
    let ballSpeedY = -4;
    const ballRadius = 6;

    // Create brick grid (5 rows x 8 cols)
    const rows = 5;
    const cols = 8;
    const brickPadding = 6;
    const brickOffsetTop = 40;
    const brickOffsetLeft = 25;
    const brickWidth = (canvas.width - brickOffsetLeft * 2 - (cols - 1) * brickPadding) / cols;
    const brickHeight = 16;
    const rowColors = ['#ff2d55', '#f43f5e', '#fb7185', '#f59e0b', '#10b981'];

    const bricks: { x: number; y: number; status: number; color: string; pts: number }[][] = [];
    for (let r = 0; r < rows; r++) {
      bricks[r] = [];
      for (let c = 0; c < cols; c++) {
        const x = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const y = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[r][c] = { x, y, status: 1, color: rowColors[r], pts: (rows - r) * 10 };
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      paddleX = Math.max(10, Math.min(canvas.width - paddleWidth - 10, relativeX - paddleWidth / 2));
    };

    window.addEventListener('mousemove', handleMouseMove);

    const loop = () => {
      ctx.fillStyle = '#0a0305';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Bricks
      let remaining = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const b = bricks[r][c];
          if (b.status === 1) {
            remaining++;
            ctx.fillStyle = b.color;
            ctx.fillRect(b.x, b.y, brickWidth, brickHeight);

            // Brick collision
            if (
              ballX + ballRadius > b.x &&
              ballX - ballRadius < b.x + brickWidth &&
              ballY + ballRadius > b.y &&
              ballY - ballRadius < b.y + brickHeight
            ) {
              ballSpeedY = -ballSpeedY;
              b.status = 0;
              setScore(s => {
                const next = s + b.pts;
                onScore(b.pts);
                return next;
              });
              playSoundClick();
            }
          }
        }
      }

      if (remaining === 0) {
        setGameState('won');
        confetti();
        playSoundSuccess();
        return;
      }

      // Move Ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Bounce walls
      if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
      }
      if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
      }

      // Paddle collision
      if (
        ballY + ballRadius >= canvas.height - 30 &&
        ballY - ballRadius <= canvas.height - 30 + paddleHeight &&
        ballX >= paddleX &&
        ballX <= paddleX + paddleWidth
      ) {
        const hitPoint = (ballX - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
        ballSpeedX = hitPoint * 5.5;
        ballSpeedY = -Math.abs(ballSpeedY);
        playSoundClick();
      }

      // Ball falls below paddle
      if (ballY > canvas.height) {
        setLives(l => {
          const next = l - 1;
          if (next <= 0) {
            setGameState('lost');
          } else {
            ballX = 300;
            ballY = 280;
            ballSpeedX = (Math.random() - 0.5) * 6;
            ballSpeedY = -4;
          }
          return next;
        });
      }

      // Draw Paddle
      ctx.fillStyle = '#ff2d55';
      ctx.shadowColor = '#ff2d55';
      ctx.shadowBlur = 10;
      ctx.fillRect(paddleX, canvas.height - 30, paddleWidth, paddleHeight);

      // Draw Ball
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameState, onScore]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameState('playing');
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between w-full px-4 text-xs font-bold text-white">
        <span className="text-amber-400">PUNTOS: {score}</span>
        <div className="flex items-center gap-1 text-rose-400">
          <span>VIDAS:</span>
          {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
            <Heart key={i} className="w-3.5 h-3.5 fill-current text-[#ff2d55]" />
          ))}
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden border-2 border-[#ff2d55]/40 shadow-[0_0_30px_rgba(255,45,85,0.25)] bg-[#0a0305]">
        <canvas ref={canvasRef} width={600} height={380} className="block cursor-none max-w-full" />
        
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <Trophy className="w-12 h-12 text-[#ff2d55]" />
            <h3 className="text-2xl font-black text-white">
              {gameState === 'won' ? '¡VICTORIA TOTAL!' : gameState === 'lost' ? 'FIN DE PARTIDA' : 'BREAKOUT ARKANOID'}
            </h3>
            <p className="text-xs text-zinc-300 max-w-sm">
              Mueve el ratón para guiar la pala carmesí y pulveriza todas las capas de ladrillos.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white font-bold text-sm shadow-lg hover:brightness-110 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{gameState === 'idle' ? 'Comenzar Partida' : 'Reintentar'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. SNAKE CLÁSICO 8-BIT
export const SnakeGame: React.FC<RetroGameProps> = ({ onScore }) => {
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState({ x: 15, y: 10 });
  const [dir, setDir] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  const gridSize = 20;
  const boardSize = 20;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && dirRef.current !== 'DOWN') setDir('UP');
      if (e.key === 'ArrowDown' && dirRef.current !== 'UP') setDir('DOWN');
      if (e.key === 'ArrowLeft' && dirRef.current !== 'RIGHT') setDir('LEFT');
      if (e.key === 'ArrowRight' && dirRef.current !== 'LEFT') setDir('RIGHT');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isRunning || isGameOver) return;

    const timer = setInterval(() => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        if (dirRef.current === 'UP') head.y -= 1;
        if (dirRef.current === 'DOWN') head.y += 1;
        if (dirRef.current === 'LEFT') head.x -= 1;
        if (dirRef.current === 'RIGHT') head.x += 1;

        // Wrap around walls or collide? Let's wrap around smoothly
        if (head.x < 0) head.x = boardSize - 1;
        if (head.x >= boardSize) head.x = 0;
        if (head.y < 0) head.y = boardSize - 1;
        if (head.y >= boardSize) head.y = 0;

        // Check self collision
        if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
          setIsGameOver(true);
          setIsRunning(false);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Ate food
        if (head.x === food.x && head.y === food.y) {
          setScore(s => {
            const next = s + 10;
            onScore(20);
            return next;
          });
          playSoundClick();
          setFood({
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize)
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 110);

    return () => clearInterval(timer);
  }, [isRunning, isGameOver, food, onScore]);

  const restart = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ]);
    setFood({ x: 15, y: 10 });
    setDir('RIGHT');
    setScore(0);
    setIsGameOver(false);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between w-full text-xs font-bold text-white px-2">
        <span className="text-emerald-400">MANZANAS DEVORADAS: {score / 10}</span>
        <span className="text-amber-400">PUNTUACIÓN: {score}</span>
      </div>

      <div className="relative w-[340px] h-[340px] rounded-2xl bg-[#09150d] border-2 border-emerald-500/40 p-2 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
        <div className="w-full h-full grid grid-cols-20 grid-rows-20 gap-0.5 relative">
          {Array.from({ length: boardSize * boardSize }).map((_, idx) => {
            const x = idx % boardSize;
            const y = Math.floor(idx / boardSize);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isBody = snake.slice(1).some(seg => seg.x === x && seg.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={idx}
                className={`w-full h-full rounded-sm ${
                  isHead
                    ? 'bg-emerald-300 shadow-[0_0_8px_#10b981]'
                    : isBody
                    ? 'bg-emerald-500'
                    : isFood
                    ? 'bg-[#ff2d55] rounded-full animate-pulse shadow-[0_0_8px_#ff2d55]'
                    : 'bg-white/[0.02]'
                }`}
              />
            );
          })}
        </div>

        {(!isRunning || isGameOver) && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-4 text-center space-y-3">
            <Trophy className="w-10 h-10 text-emerald-400" />
            <h3 className="text-xl font-black text-white">
              {isGameOver ? '¡FIN DE LA PARTIDA!' : 'SNAKE 8-BIT RETRO'}
            </h3>
            <p className="text-xs text-zinc-300">
              Usa las flechas del teclado o los botones para dirigir la serpiente y comer manzanas.
            </p>
            <button
              onClick={restart}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg hover:brightness-110 flex items-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isGameOver ? 'Volver a Intentar' : 'Comenzar'}</span>
            </button>
          </div>
        )}
      </div>

      {/* On-screen touch D-Pad for tablet/mobile */}
      <div className="grid grid-cols-3 gap-2 w-44 pt-2">
        <div />
        <button
          onClick={() => dirRef.current !== 'DOWN' && setDir('UP')}
          className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 font-bold text-center"
        >
          ▲
        </button>
        <div />
        <button
          onClick={() => dirRef.current !== 'RIGHT' && setDir('LEFT')}
          className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 font-bold text-center"
        >
          ◀
        </button>
        <button
          onClick={() => dirRef.current !== 'UP' && setDir('DOWN')}
          className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 font-bold text-center"
        >
          ▼
        </button>
        <button
          onClick={() => dirRef.current !== 'LEFT' && setDir('RIGHT')}
          className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 font-bold text-center"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

// 4. SPACE INVADERS GALAXY
export const SpaceInvadersGame: React.FC<RetroGameProps> = ({ onScore }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let shipX = canvas.width / 2;
    const shipWidth = 30;
    const shipHeight = 18;
    let bullets: { x: number; y: number }[] = [];
    let aliens: { x: number; y: number; alive: boolean }[] = [];

    // Initialize 3 rows x 8 aliens
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 8; c++) {
        aliens.push({ x: 50 + c * 45, y: 40 + r * 30, alive: true });
      }
    }

    let alienDir = 1;
    let alienSpeed = 1.2;

    const keys: Record<string, boolean> = {};
    const onKey = (e: KeyboardEvent) => {
      keys[e.key] = e.type === 'keydown';
      if (e.type === 'keydown' && e.key === ' ') {
        bullets.push({ x: shipX + shipWidth / 2 - 2, y: canvas.height - 35 });
        playSoundClick();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);

    const loop = () => {
      ctx.fillStyle = '#05020a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Starfield background
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      for (let i = 0; i < 20; i++) {
        ctx.fillRect((i * 37) % canvas.width, (i * 59 + Date.now() * 0.05) % canvas.height, 1.5, 1.5);
      }

      // Move Ship
      if (keys['ArrowLeft'] || keys['a']) shipX = Math.max(10, shipX - 5);
      if (keys['ArrowRight'] || keys['d']) shipX = Math.min(canvas.width - shipWidth - 10, shipX + 5);

      // Draw Ship
      ctx.fillStyle = '#ff2d55';
      ctx.shadowColor = '#ff2d55';
      ctx.shadowBlur = 8;
      ctx.fillRect(shipX, canvas.height - 30, shipWidth, shipHeight);
      ctx.fillRect(shipX + 12, canvas.height - 36, 6, 6);
      ctx.shadowBlur = 0;

      // Update & Draw Bullets
      bullets.forEach(b => { b.y -= 7; });
      bullets = bullets.filter(b => b.y > 0);

      ctx.fillStyle = '#38bdf8';
      bullets.forEach(b => {
        ctx.fillRect(b.x, b.y, 4, 10);
      });

      // Move Aliens
      let bounce = false;
      aliens.forEach(a => {
        if (!a.alive) return;
        a.x += alienDir * alienSpeed;
        if (a.x > canvas.width - 30 || a.x < 10) bounce = true;
      });

      if (bounce) {
        alienDir = -alienDir;
        aliens.forEach(a => {
          if (a.alive) {
            a.y += 12;
            if (a.y >= canvas.height - 50) {
              setGameOver(true);
              setIsPlaying(false);
            }
          }
        });
      }

      // Collisions
      let aliveCount = 0;
      aliens.forEach(a => {
        if (!a.alive) return;
        aliveCount++;

        // Draw Alien
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(a.x, a.y, 22, 16);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(a.x + 4, a.y + 4, 3, 3);
        ctx.fillRect(a.x + 15, a.y + 4, 3, 3);

        // Check bullet hit
        bullets.forEach(b => {
          if (b.x >= a.x && b.x <= a.x + 22 && b.y >= a.y && b.y <= a.y + 16) {
            a.alive = false;
            b.y = -100;
            setScore(s => {
              const next = s + 50;
              onScore(30);
              return next;
            });
            playSoundClick();
          }
        });
      });

      if (aliveCount === 0) {
        setIsPlaying(false);
        confetti();
        playSoundSuccess();
        return;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKey);
    };
  }, [isPlaying, onScore]);

  const start = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between w-full text-xs font-bold text-white px-2">
        <span className="text-purple-400">INVASORES DEL ESPACIO</span>
        <span className="text-amber-400">PUNTOS: {score}</span>
      </div>

      <div className="relative rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.25)] bg-[#05020a]">
        <canvas ref={canvasRef} width={460} height={340} className="block max-w-full" />
        
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3">
            <Trophy className="w-10 h-10 text-purple-400 animate-bounce" />
            <h3 className="text-xl font-black text-white">
              {gameOver ? '¡LA TIERRA FUE INVADIDA!' : 'SPACE INVADERS 1978'}
            </h3>
            <p className="text-xs text-zinc-300 max-w-xs">
              Mueve la nave con ◀ y ▶ o A/D. Pulsa la <strong>BARRA ESPACIADORA</strong> para disparar tus torpedos de plasma.
            </p>
            <button
              onClick={start}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-[#ff2d55] text-white font-bold text-xs shadow-lg hover:brightness-110 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{gameOver ? 'Reintentar Batalla' : 'Lanzar Caza'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 5. TIC-TAC-TOE / 3 EN RAYA
export const TicTacToeGame: React.FC<RetroGameProps> = ({ onScore }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const checkWin = (b: (string | null)[]) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (const [x, y, z] of lines) {
      if (b[x] && b[x] === b[y] && b[x] === b[z]) return b[x];
    }
    if (b.every(cell => cell !== null)) return 'Empate';
    return null;
  };

  const handleCellClick = (idx: number) => {
    if (board[idx] || winner) return;

    const next = [...board];
    next[idx] = 'X'; // Player
    playSoundClick();

    const w = checkWin(next);
    if (w) {
      setBoard(next);
      setWinner(w);
      if (w === 'X') {
        setScore(s => s + 100);
        onScore(50);
        confetti();
        playSoundSuccess();
      }
      return;
    }

    // Belentani CPU turn
    const empties = next.map((val, i) => val === null ? i : null).filter((v): v is number => v !== null);
    if (empties.length > 0) {
      const cpuMove = empties[Math.floor(Math.random() * empties.length)];
      next[cpuMove] = 'O';
      const w2 = checkWin(next);
      if (w2) {
        setWinner(w2);
      }
    }
    setBoard(next);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto p-4">
      <div className="flex items-center justify-between w-full text-xs font-bold text-white">
        <span className="text-[#ff2d55]">TÚ: X</span>
        <span className="text-amber-400">PUNTOS: {score}</span>
        <span className="text-sky-400">BELENTANI: O</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 w-full aspect-square">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            className={`rounded-xl flex items-center justify-center text-3xl font-black transition-all ${
              cell === 'X'
                ? 'bg-[#ff2d55]/20 text-[#ff2d55] border border-[#ff2d55]/50'
                : cell === 'O'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50'
                : 'bg-white/5 hover:bg-white/10 text-transparent'
            }`}
          >
            {cell || '·'}
          </button>
        ))}
      </div>

      {winner && (
        <div className="text-center space-y-2">
          <p className="text-sm font-bold text-white">
            {winner === 'X' ? '🎉 ¡Ganaste la partida!' : winner === 'O' ? '🤖 Ganó Belentani' : '🤝 ¡Tablas / Empate!'}
          </p>
          <button
            onClick={reset}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white font-bold text-xs"
          >
            Jugar Otra Ronda
          </button>
        </div>
      )}
    </div>
  );
};

// 6. AHORCADO TRILINGÜE
export const HangmanGame: React.FC<RetroGameProps> = ({ onScore }) => {
  const words = [
    { word: "ASIGNATURA", hintEs: "Materia de clase en el instituto", hintCa: "Assignatura", hintPt: "Disciplina escolar" },
    { word: "ECUACION", hintEs: "Igualdad algebraica con incógnitas", hintCa: "Equació", hintPt: "Equação com x" },
    { word: "ESCOBA", hintEs: "Sirve para barrer (¡NO confundir con basura!)", hintCa: "Escombra", hintPt: "Vassoura" },
    { word: "AMISTAD", hintEs: "Vínculo afectivo entre compañeros", hintCa: "Amistat", hintPt: "Amizade" },
    { word: "INSTITUTO", hintEs: "Centro de Educación Secundaria Obligatoria", hintCa: "Institut", hintPt: "Colégio / Escola" },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const maxMistakes = 6;

  const current = words[currentIdx];
  const isWon = current.word.split('').every(l => guessedLetters.includes(l));
  const isLost = mistakes >= maxMistakes;

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || isWon || isLost) return;
    setGuessedLetters(prev => [...prev, letter]);

    if (current.word.includes(letter)) {
      playSoundClick();
      if (current.word.split('').every(l => l === letter || guessedLetters.includes(l))) {
        onScore(100);
        confetti();
        playSoundSuccess();
        speakBelentani(`¡Excelente Danilo! Has descubierto la palabra ${current.word}.`, { lang: 'es' });
      }
    } else {
      setMistakes(m => m + 1);
    }
  };

  const nextWord = () => {
    setGuessedLetters([]);
    setMistakes(0);
    setCurrentIdx(prev => (prev + 1) % words.length);
  };

  const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto p-4">
      {/* Word display */}
      <div className="glass-red p-4 rounded-2xl w-full text-center space-y-2">
        <span className="text-[10px] font-bold text-[#ff8fa3] uppercase tracking-wider">
          Pista Cultural:
        </span>
        <p className="text-xs text-zinc-200">
          ES: {current.hintEs} · CA: {current.hintCa} · PT: {current.hintPt}
        </p>

        <div className="flex items-center justify-center gap-2 pt-3 flex-wrap">
          {current.word.split('').map((letter, i) => (
            <span
              key={i}
              className={`w-8 h-10 rounded-lg flex items-center justify-center text-lg font-black border ${
                guessedLetters.includes(letter) || isLost
                  ? 'bg-white/10 text-white border-white/20'
                  : 'bg-black/30 text-transparent border-white/10'
              }`}
            >
              {guessedLetters.includes(letter) || isLost ? letter : '_'}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/10">
          <span>Fallos restantes: {maxMistakes - mistakes}</span>
          <span className="text-amber-400 font-bold">Palabra {currentIdx + 1} de {words.length}</span>
        </div>
      </div>

      {/* Letters keyboard */}
      <div className="flex flex-wrap gap-1.5 justify-center max-w-md">
        {alphabet.map(letter => {
          const used = guessedLetters.includes(letter);
          return (
            <button
              key={letter}
              disabled={used || isWon || isLost}
              onClick={() => handleGuess(letter)}
              className={`w-8 h-8 rounded-lg font-black text-xs transition-all ${
                used
                  ? 'bg-white/5 text-zinc-600 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-[#ff2d55] hover:scale-105 active:scale-95'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {(isWon || isLost) && (
        <div className="text-center space-y-2">
          <p className="text-sm font-bold text-white">
            {isWon ? '🎉 ¡Descubriste la palabra con éxito!' : `❌ ¡Agotaste los intentos! Era: ${current.word}`}
          </p>
          <button
            onClick={nextWord}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white font-bold text-xs"
          >
            Siguiente Palabra
          </button>
        </div>
      )}
    </div>
  );
};

// 7. VIRTUAL RETRO ARCADE CABINET SIMULATOR (Plays any of the 500 games!)
export const VirtualCabinetSimulator: React.FC<RetroGameProps> = ({ game, onScore }) => {
  const [coins, setCoins] = useState(2);
  const [cabinetScore, setCabinetScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [isPowerActive, setIsPowerActive] = useState(false);
  const [crtEffect, setCrtEffect] = useState(true);
  const [targetZone, setTargetZone] = useState({ min: 40, max: 60 });
  const [sliderPos, setSliderPos] = useState(50);
  const [isMovingRight, setIsMovingRight] = useState(true);

  // Reaction slider rhythm mechanic
  useEffect(() => {
    const timer = setInterval(() => {
      setSliderPos(pos => {
        if (pos >= 95) {
          setIsMovingRight(false);
          return 94;
        }
        if (pos <= 5) {
          setIsMovingRight(true);
          return 6;
        }
        return isMovingRight ? pos + 2.5 : pos - 2.5;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [isMovingRight]);

  const handleActionPress = () => {
    playSoundClick();
    // Check if slider is in target zone
    if (sliderPos >= targetZone.min && sliderPos <= targetZone.max) {
      const added = 50 * combo;
      setCabinetScore(s => s + added);
      setCombo(c => Math.min(10, c + 1));
      setIsPowerActive(true);
      setTimeout(() => setIsPowerActive(false), 200);
      onScore(added);
      playSoundSuccess();
      // Shift target zone randomly
      const newMin = Math.floor(Math.random() * 50) + 15;
      setTargetZone({ min: newMin, max: newMin + 20 });
    } else {
      setCombo(1);
    }
  };

  const insertCoin = () => {
    playSoundClick();
    setCoins(c => c + 1);
    speakBelentani("¡Moneda insertada! Partida lista en la recreativa de Belentani.", { lang: 'es' });
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
      {/* Cabinet Bezel Header */}
      <div className="flex items-center justify-between w-full text-xs font-bold text-white px-2">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-[#ff2d55]" />
          <span>RECREATIVA Nº {game.number} / 500: {game.title}</span>
        </div>
        <button
          onClick={() => setCrtEffect(v => !v)}
          className={`px-2 py-0.5 rounded text-[10px] ${crtEffect ? 'bg-[#ff2d55] text-white' : 'bg-white/10 text-zinc-400'}`}
        >
          {crtEffect ? 'Scanlines CRT: ON' : 'Scanlines CRT: OFF'}
        </button>
      </div>

      {/* Screen Enclosure */}
      <div className={`relative w-full aspect-video rounded-3xl overflow-hidden border-4 border-[#ff2d55]/60 shadow-[0_0_40px_rgba(255,45,85,0.35)] bg-[#0c0407] flex flex-col justify-between p-6 ${crtEffect ? 'crt-screen' : ''}`}>
        {/* CRT Scanline overlay effect */}
        {crtEffect && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] opacity-70 z-10" />
        )}

        {/* Top Screen HUD */}
        <div className="relative z-20 flex items-center justify-between text-xs font-black text-white">
          <div className="flex items-center gap-2">
            <span className="text-[#ff8fa3] uppercase tracking-widest text-[10px]">BELENTANI ARCADE ENGINE</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-amber-400">{game.era}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-300">SCORE: {cabinetScore.toString().padStart(6, '0')}</span>
            <span className="text-rose-400">COMBO: x{combo}</span>
          </div>
        </div>

        {/* Center Virtual Graphic Stage */}
        <div className="relative z-20 my-auto text-center space-y-3">
          <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#ff2d55] to-[#c8102e] flex items-center justify-center text-4xl shadow-xl transition-transform ${isPowerActive ? 'scale-125 rotate-6' : 'animate-pulse'}`}>
            🕹️
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            {game.title}
          </h2>
          <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
            {game.description}
          </p>

          {/* Timing bar challenge for score */}
          <div className="max-w-md mx-auto space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-[10px] text-zinc-400">
              <span>Sincronización motriz:</span>
              <span className="text-emerald-400 font-bold">¡Golpea cuando la aguja esté en verde!</span>
            </div>
            <div className="relative w-full h-5 rounded-full bg-white/10 overflow-hidden border border-white/20">
              {/* Target zone */}
              <div
                className="absolute top-0 bottom-0 bg-emerald-500/50 border-x-2 border-emerald-400"
                style={{ left: `${targetZone.min}%`, width: `${targetZone.max - targetZone.min}%` }}
              />
              {/* Slider cursor */}
              <div
                className="absolute top-0 bottom-0 w-2.5 bg-white shadow-[0_0_10px_white] -ml-1"
                style={{ left: `${sliderPos}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Screen Bar */}
        <div className="relative z-20 flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/10">
          <span className="text-[11px]">Habilidad: {game.educationalSkill}</span>
          <span className="text-amber-400 font-bold">CRÉDITOS: {coins}</span>
        </div>
      </div>

      {/* Physical Cabinet Control Deck */}
      <div className="glass-red p-4 rounded-2xl w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={insertCoin}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5"
          >
            🪙 <span>Insertar Moneda</span>
          </button>
          <span className="text-xs text-zinc-300">Controles: {game.controls}</span>
        </div>

        <button
          onClick={handleActionPress}
          className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white font-black text-sm shadow-[0_0_20px_rgba(255,45,85,0.5)] active:scale-95 hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5 fill-current" />
          <span>¡BOTÓN DE ACCIÓN / GOLPEAR!</span>
        </button>
      </div>
    </div>
  );
};
