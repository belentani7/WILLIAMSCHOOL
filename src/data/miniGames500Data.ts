import { ClassicMiniGame } from '../types';

export interface MiniGameCategoryDef {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
  description: string;
}

export const MINI_GAME_CATEGORIES: MiniGameCategoryDef[] = [
  { id: 'arcade', name: '8-Bit & Arcade Clásico', icon: 'Gamepad2', color: '#ff2d55', count: 50, description: 'Las recreativas doradas de los 70s y 80s: reflejos, naves y laberintos de píxeles.' },
  { id: 'puzzles', name: 'Puzzles, Lógica & Bloques', icon: 'Puzzle', color: '#f59e0b', count: 50, description: 'Desafíos de ingenio, gravedad, cajas, números y resolución lógica de problemas.' },
  { id: 'mates', name: 'Mates, Números & Álgebra Blitz', icon: 'Calculator', color: '#10b981', count: 50, description: 'Entrenamiento de cálculo mental, ecuaciones ESO, fracciones y geometría relámpago.' },
  { id: 'idiomas', name: 'Palabras, Letras & Idiomas PT-ES-CA', icon: 'Languages', color: '#06b6d4', count: 50, description: 'Ortografía, vocabulario, falsos amigos de Brasil a Cataluña y agilidad verbal.' },
  { id: 'plataformas', name: 'Plataformas, Saltos & Runners', icon: 'Footprints', color: '#8b5cf6', count: 50, description: 'Carreras a toda velocidad, saltos milimétricos y desafíos de precisión 2D.' },
  { id: 'deportes', name: 'Deportes, Atletismo & Motor 2D', icon: 'Trophy', color: '#ec4899', count: 50, description: 'Fútbol, tenis de mesa, carreras retro, atletismo y pruebas olímpicas pixeladas.' },
  { id: 'naves', name: 'Naves, Disparo & Espacio Retro', icon: 'Rocket', color: '#ef4444', count: 50, description: 'Invasiones alienígenas, disparos cósmicos y combate estelar clásico.' },
  { id: 'memoria', name: 'Memoria, Reflejos & Reacción', icon: 'Brain', color: '#3b82f6', count: 50, description: 'Agudeza visual, velocidad de procesamiento milimétrica y retención nemotécnica.' },
  { id: 'musica', name: 'Música, Ritmo & Beat Box', icon: 'Music', color: '#d946ef', count: 50, description: 'Tocar notas, compases, ritmo de batucada, flamenco y entonación vocal.' },
  { id: 'estrategia', name: 'Juegos de Mesa & Estrategia Clásica', icon: 'Crown', color: '#14b8a6', count: 50, description: 'Ajedrez, 4 en raya, damas, dominó y grandes clásicos de tablero universal.' },
];

interface RawGameSeed {
  title: string;
  era: '1970s' | '1980s' | '1990s' | '2000s' | 'Retro Moderno';
  difficulty: 'Fácil' | 'Media' | 'Difícil' | 'Extrema';
  rating: number;
  plays: number;
  description: string;
  controls: string;
  educationalSkill: string;
  builtInEngine?: ClassicMiniGame['builtInEngine'];
}

const ARCADE_SEEDS: RawGameSeed[] = [
  { title: "Pong 1972 Original", era: "1970s", difficulty: "Fácil", rating: 4.9, plays: 12400, description: "El legendario juego de mesa y pala que inició la era de los videojuegos. Rebota la pelota y vence al rival.", controls: "W/S o Flechas Arriba/Abajo", educationalSkill: "Ángulos de incidencia y velocidad de reacción", builtInEngine: "pong" },
  { title: "Space Invaders 1978", era: "1970s", difficulty: "Media", rating: 4.9, plays: 15300, description: "Defiende la Tierra contra escuadrones de alienígenas que descienden fila a fila.", controls: "Flechas Izq/Der + Espacio", educationalSkill: "Cálculo de trayectorias y anticipación espacial", builtInEngine: "spaceInvaders" },
  { title: "Breakout Arkanoid Bricks", era: "1970s", difficulty: "Media", rating: 4.8, plays: 11200, description: "Destruye todos los ladrillos de colores con tu pelota antes de que caiga al abismo.", controls: "Ratón o Flechas Izq/Der", educationalSkill: "Geometría analítica de rebotes e impulsos", builtInEngine: "breakout" },
  { title: "Snake Clásico 8-Bit", era: "1990s", difficulty: "Media", rating: 4.9, plays: 19800, description: "Guía a la serpiente para devorar manzanas sin chocar contra las paredes ni contra tu propia cola.", controls: "Flechas Direccionales", educationalSkill: "Visión espacial y planificación algorítmica", builtInEngine: "snake" },
  { title: "Flappy Belentani Hero", era: "Retro Moderno", difficulty: "Difícil", rating: 4.8, plays: 17500, description: "Haz aletear a Belentani entre columnas y tubos sonoros al compás de la música.", controls: "Espacio o Clic continuo", educationalSkill: "Gestión de impulsos físicos y ritmo", builtInEngine: "flappy" },
  { title: "Pac-Dot Chaser 1980", era: "1980s", difficulty: "Media", rating: 4.9, plays: 14200, description: "Recorre el laberinto comiendo puntos y esquivando los 4 fantasmas clásicos.", controls: "Flechas Direccionales", educationalSkill: "Teoría de grafos y evasión de obstáculos" },
  { title: "Asteroids Vector Laser", era: "1970s", difficulty: "Difícil", rating: 4.7, plays: 9800, description: "Pilota una nave triangular en el espacio profundo pulverizando meteoritos flotantes.", controls: "Flechas de Giro + Espacio Disparo", educationalSkill: "Inercia física de Newton y vectores 2D" },
  { title: "Galaga Star Fleet", era: "1980s", difficulty: "Media", rating: 4.8, plays: 13100, description: "Combate contra insectos alienígenas que se lanzan en picado acrobático.", controls: "Izq / Der + Disparo", educationalSkill: "Patrones de vuelo circular y reflejos" },
  { title: "Frogger River Crossing", era: "1980s", difficulty: "Media", rating: 4.7, plays: 8900, description: "Ayuda a la rana a cruzar la carretera de coches veloces y el río sobre troncos y tortugas.", controls: "Cruceta Direccional", educationalSkill: "Sincronización de fases temporales" },
  { title: "Donkey Barrels 1981", era: "1980s", difficulty: "Difícil", rating: 4.9, plays: 11400, description: "Sube por las vigas industriales esquivando los barriles que ruedan hacia ti.", controls: "Flechas + Salto", educationalSkill: "Coordinación visomotora y salto preciso" },
  { title: "Centipede Swarm", era: "1980s", difficulty: "Difícil", rating: 4.6, plays: 7800, description: "Dispara al ciempiés que baja serpenteando entre los hongos del bosque.", controls: "Ratón o Teclado", educationalSkill: "División geométrica de cuerpos segmentados" },
  { title: "Missile Command Defense", era: "1980s", difficulty: "Extrema", rating: 4.7, plays: 8200, description: "Lanza misiles interceptores para proteger las 6 ciudades aliadas del bombardeo.", controls: "Ratón y Teclas 1-2-3", educationalSkill: "Intersección de parábolas y tiempos de impacto" },
  { title: "Diggy Dug Caverns", era: "1980s", difficulty: "Media", rating: 4.7, plays: 9100, description: "Excava túneles subterráneos y derrota a los dragones con tu bomba de aire.", controls: "Flechas + Tecla Acción", educationalSkill: "Exploración de matrices bidimensionales" },
  { title: "Defender Space Orbit", era: "1980s", difficulty: "Extrema", rating: 4.8, plays: 6900, description: "Vuela a toda velocidad por el horizonte salvando astronautas de los abductores.", controls: "Giro, Acelerador, Disparo", educationalSkill: "Radar y lectura periférica múltiple" },
  { title: "Tempest Tube Vector", era: "1980s", difficulty: "Difícil", rating: 4.6, plays: 5800, description: "Dispara en las aristas de un tubo geométrico tridimensional contra enemigos que suben.", controls: "Rotación + Disparo Superzapper", educationalSkill: "Geometría no euclidiana y poliedros" },
  { title: "Lunar Lander Simulator", era: "1970s", difficulty: "Extrema", rating: 4.8, plays: 7300, description: "Calcula el empuje de los retrocohetes para aterrizar suavemente en la Luna sin estrellarte.", controls: "Flecha Arriba (Gas) + Izq/Der", educationalSkill: "Gravedad lunar (1.62 m/s²) y desaceleración" },
  { title: "Burger Time Chef", era: "1980s", difficulty: "Media", rating: 4.6, plays: 6400, description: "Pisa las tapas de hamburguesa haciéndolas caer sobre los platos mientras huyes de las salchichas.", controls: "Flechas + Pimentero", educationalSkill: "Planificación de rutas de caída libre" },
  { title: "Q-Bert Isometric Pyramids", era: "1980s", difficulty: "Media", rating: 4.7, plays: 8100, description: "Salta de cubo en cubo cambiando el color de la pirámide isométrica sin caer al vacío.", controls: "Diagonales Teclado", educationalSkill: "Proyección axonométrica e isometría" },
  { title: "Joust Ostrich Knights", era: "1980s", difficulty: "Difícil", rating: 4.6, plays: 5900, description: "Monta en un avestruz volador y colisiona desde una altura mayor para vencer al oponente.", controls: "Aleteo + Dirección", educationalSkill: "Conservación de energía potencial y cinética" },
  { title: "Paperboy Bike Route", era: "1980s", difficulty: "Media", rating: 4.7, plays: 9200, description: "Reparte los periódicos en los buzones de los suscriptores esquivando perros y cortacéspedes.", controls: "Giro y Lanzamiento", educationalSkill: "Cálculo de velocidad relativa y alcance" },
  { title: "Rampage Kaiju City", era: "1980s", difficulty: "Fácil", rating: 4.8, plays: 10500, description: "Destruye rascacielos pixelados golpeando las ventanas y devorando frutas de energía.", controls: "Flechas + Puño + Salto", educationalSkill: "Estructuras de resistencia y gravedad" },
  { title: "Bubble Bobble Dragons", era: "1980s", difficulty: "Fácil", rating: 4.9, plays: 13800, description: "Encierra a los enemigos en burbujas verdes y hazlas estallar saltando sobre ellas.", controls: "Mover + Salto + Burbuja", educationalSkill: "Dinámica de fluidos y flotabilidad" },
  { title: "Pitfall Jungle Run 1982", era: "1980s", difficulty: "Media", rating: 4.8, plays: 9600, description: "Corre por la selva saltando sobre cocodrilos, lianas y pozos de brea.", controls: "Carrera + Salto", educationalSkill: "Sincronización de oscilación de péndulo" },
  { title: "Marble Madness Slope", era: "1980s", difficulty: "Extrema", rating: 4.7, plays: 7200, description: "Guía la canica de cristal por rampas de física acelerada contra el cronómetro.", controls: "Trackball Virtual o Teclas", educationalSkill: "Fuerza centrífuga y fricción dinámica" },
  { title: "Spy Hunter High-Speed", era: "1980s", difficulty: "Difícil", rating: 4.6, plays: 6700, description: "Conduce el supercoche interceptor disparando a vehículos enemigos en la autopista.", controls: "Acelerador + Manillar + Armas", educationalSkill: "Cinemática de movimiento rectilíneo" },
  { title: "Gauntlet Dungeon Crawl", era: "1980s", difficulty: "Media", rating: 4.8, plays: 11000, description: "Explora mazmorras infinitas con el guerrero, valquiria, mago y elfo.", controls: "Cruceta + Disparo a distancia", educationalSkill: "Gestión de recursos y trabajo en equipo" },
  { title: "OutRun Turbo Seaside", era: "1980s", difficulty: "Media", rating: 4.9, plays: 14500, description: "Siente la brisa con el Ferrari rojo descapotable recorriendo la costa mediterránea.", controls: "Volante + Cambio de marcha", educationalSkill: "Perspectiva de punto de fuga y horizonte" },
  { title: "Shinobi Shadow Blade", era: "1980s", difficulty: "Difícil", rating: 4.7, plays: 8400, description: "Lanza shurikens y rescata a los rehenes ninja en tejados de Kioto.", controls: "Mover + Disparo + Ninjutsu", educationalSkill: "Geometría de proyectiles rectos" },
  { title: "Golden Axe Fantasy 8-Bit", era: "1980s", difficulty: "Media", rating: 4.9, plays: 12800, description: "Recupera el Hacha Dorada lanzando hechizos mágicos de tierra, fuego y rayo.", controls: "Ataque + Salto + Poción Mágica", educationalSkill: "Elementos químicos de la mitología antigua" },
  { title: "Double Dragon Streets", era: "1980s", difficulty: "Media", rating: 4.8, plays: 11900, description: "Lucha callejera cooperativa con patadas voladoras y codazos legendarios.", controls: "Puñetazo + Patada + Salto", educationalSkill: "Palancas osteomusculares y biomecánica" },
  { title: "Battle City Tanks 1985", era: "1980s", difficulty: "Media", rating: 4.9, plays: 16200, description: "Protege la base del águila dorada demoliendo muros de ladrillo con tu tanque blindado.", controls: "Flechas + Disparo de Cañón", educationalSkill: "Geometría de mapas y defensa táctica" },
  { title: "Bomberman Classic Blast", era: "1980s", difficulty: "Media", rating: 4.9, plays: 17100, description: "Coloca bombas con mecha temporizada para despejar bloques y atrapar a los rivales.", controls: "Cruceta + Colocar Bomba", educationalSkill: "Propagación de ondas de presión en cruz" },
  { title: "1942 Pacific Ace", era: "1980s", difficulty: "Difícil", rating: 4.7, plays: 9500, description: "Pilota un caza P-38 haciendo giros en rizo (looping) sobre el océano Pacífico.", controls: "Vuelo + Cañones + Pirueta", educationalSkill: "Física aerodinámica de sustentación aérea" },
  { title: "Gradius Option Core", era: "1980s", difficulty: "Difícil", rating: 4.8, plays: 8800, description: "Potencia la nave Vic Viper recolectando cápsulas para activar láseres y satélites.", controls: "Movimiento + Potenciador", educationalSkill: "Evolución algorítmica de variables" },
  { title: "R-Type Wave Cannon", era: "1980s", difficulty: "Extrema", rating: 4.9, plays: 9700, description: "Acopla la cápsula Force en proa o popa y carga el cañón de ondas contra el imperio Bydo.", controls: "Carga de disparo + Acople", educationalSkill: "Propagación ondulatoria y carga de energía" },
  { title: "Contra Jungle Commando", era: "1980s", difficulty: "Extrema", rating: 4.9, plays: 18400, description: "Supera la base enemiga con el legendario disparo disperso 'Spread Gun'.", controls: "Flechas 8 Direcciones + Fuego", educationalSkill: "Dispersión angular de partículas" },
  { title: "Snow Bros Snowball Toss", era: "1990s", difficulty: "Media", rating: 4.8, plays: 13300, description: "Convierte a los monstruos en bolas de nieve gigantes y hazlas rodar colina abajo.", controls: "Lanzar Nieve + Empujar", educationalSkill: "Conservación de momento lineal" },
  { title: "Pang Harpoon Balloons", era: "1980s", difficulty: "Media", rating: 4.8, plays: 12100, description: "Dispara arpones hacia el cielo para dividir los globos gigantes en esferas más pequeñas.", controls: "Desplazamiento + Arpón", educationalSkill: "División geométrica binaria 2^n" },
  { title: "Street Fighter Alpha Pixel", era: "1990s", difficulty: "Difícil", rating: 4.9, plays: 15900, description: "Domina el Hadoken y el Shoryuken en torneos de artes marciales de todo el mundo.", controls: "Media Luna + Puño / Patada", educationalSkill: "Secuencia de impulsos motrices y reflejos" },
  { title: "Metal Slug Mini War", era: "1990s", difficulty: "Media", rating: 4.9, plays: 16700, description: "Avanza como Marco Rossi rescatando prisioneros de guerra y conduciendo tanques SV-001.", controls: "Disparo 360 + Granada + Salto", educationalSkill: "Trayectorias parabólicas de artillería" },
  { title: "Sunset Riders Wild West", era: "1990s", difficulty: "Media", rating: 4.8, plays: 10400, description: "Cobra las recompensas en el Lejano Oeste con pistolas duales y estampidas de toros.", controls: "Disparo multidireccional", educationalSkill: "Historia del siglo XIX y velocidad reactiva" },
  { title: "Wonder Boy Monster Land", era: "1980s", difficulty: "Media", rating: 4.7, plays: 8300, description: "Compra espadas, botas mágicas y escudos con monedas que caen de los monstruos.", controls: "Espadazo + Magia + Salto", educationalSkill: "Economía de trueque y presupuestos" },
  { title: "Adventure Island Skater", era: "1980s", difficulty: "Difícil", rating: 4.6, plays: 7900, description: "Recoge plátanos y manzanas para que el medidor de energía no llegue a cero mientras patinas.", controls: "Monopatín + Hacha de sílex", educationalSkill: "Metabolismo calórico y consumo de energía" },
  { title: "Castlevania Vampire Whip", era: "1980s", difficulty: "Difícil", rating: 4.9, plays: 11800, description: "Blande el látigo Vampire Killer en el castillo gótico de Transilvania.", controls: "Látigo + Agua Bendita + Salto", educationalSkill: "Literatura gótica del siglo XIX y mitología" },
  { title: "Megaman Robot Buster", era: "1980s", difficulty: "Extrema", rating: 4.9, plays: 14600, description: "Derrota a los 8 Robot Masters y asimila sus poderes para explotar sus debilidades.", controls: "Disparo Buster + Barrida + Salto", educationalSkill: "Sistemas de debilidad elemental cíclica" },
  { title: "Ghosts 'n Goblins Armor", era: "1980s", difficulty: "Extrema", rating: 4.8, plays: 9900, description: "Sir Arthur avanza en armadura de plata lanzando lanzas contra zombis y gárgolas.", controls: "Lanza + Salto + Armadura", educationalSkill: "Perseverancia ante la frustración y temple" },
  { title: "Kirby Dream Star 8-Bit", era: "1990s", difficulty: "Fácil", rating: 4.9, plays: 17200, description: "Inhala a los enemigos para copiar sus habilidades de espada, fuego o rayo cósmico.", controls: "Inhalar + Escupir + Volar", educationalSkill: "Asimilación biológica y adaptabilidad" },
  { title: "Duck Hunter Laser Scope", era: "1980s", difficulty: "Fácil", rating: 4.8, plays: 13900, description: "Apunta con la pistola óptica Zapper a los patos que alzan el vuelo entre la maleza.", controls: "Ratón / Clic de mira láser", educationalSkill: "Óptica de haces luminosos y fotodiodos" },
  { title: "Excitebike Mud Stunt", era: "1980s", difficulty: "Media", rating: 4.7, plays: 9700, description: "Acelera tu moto de cross controlando la inclinación para aterrizar perfecto sobre las rampas.", controls: "Gas Normal / Turbo + Inclinación", educationalSkill: "Centro de gravedad y momento angular" },
  { title: "Belentani Arcade Legend", era: "Retro Moderno", difficulty: "Media", rating: 5.0, plays: 25000, description: "El tributo maestro de Belentani que reúne lo mejor de las salas arcade clásicas de España.", controls: "Cruceta + Botón A y B", educationalSkill: "Integración de destrezas multidisciplinares" },
];

// Helper to fill 50 games for each category programmatically with rich educational parameters
function generateCategoryGames(
  catId: string,
  catName: string,
  baseColor: string,
  seeds: { title: string; skill: string; desc: string; diff: 'Fácil' | 'Media' | 'Difícil' | 'Extrema'; era: ClassicMiniGame['era']; engine?: ClassicMiniGame['builtInEngine'] }[]
): ClassicMiniGame[] {
  const result: ClassicMiniGame[] = [];
  seeds.forEach((seed, idx) => {
    const num = result.length + 1;
    result.push({
      id: `${catId}-${num}`,
      number: num,
      title: seed.title,
      category: catName,
      era: seed.era,
      difficulty: seed.diff,
      rating: parseFloat((4.5 + ((num * 7) % 5) * 0.1).toFixed(1)),
      plays: 5000 + ((num * 347) % 15000),
      description: seed.desc,
      controls: "Teclado (Flechas / Espacio) o Pantalla Táctil",
      educationalSkill: seed.skill,
      builtInEngine: seed.engine || 'virtualCabinet',
      color: baseColor
    });
  });
  return result;
}

// 2. PUZZLES SEEDS (50)
const PUZZLE_TITLES = [
  { t: "Tetris Bloques 1984", s: "Rotación espacial y completado de líneas", d: "El puzle más famoso de la historia: encaja tetrominós sin dejar huecos.", e: '1980s' as const, diff: 'Media' as const },
  { t: "Sokoban Box Pusher", s: "Planificación heurística hacia adelante", d: "Empuja cajas a sus puntos de destino en un almacén laberíntico sin encajonarlas.", e: '1980s' as const, diff: 'Difícil' as const },
  { t: "2048 Number Fusion", s: "Potencias de base 2 (2^n) y cálculo mental", d: "Desliza fichas numéricas para fusionar pares idénticos hasta alcanzar el 2048.", e: '2000s' as const, diff: 'Media' as const, eng: 'game2048' as const },
  { t: "Buscaminas / Minesweeper", s: "Probabilidad condicionada e inferencia deductiva", d: "Despeja el campo de casillas leyendo los números que indican minas adyacentes.", e: '1990s' as const, diff: 'Difícil' as const },
  { t: "Torres de Hanoi", s: "Recursividad matemática y potencias 2^n - 1", d: "Pasa los discos de la torre A a la C sin colocar jamás un disco mayor sobre uno menor.", e: '1970s' as const, diff: 'Media' as const },
  { t: "Tangram Clásico Chino", s: "Geometría euclidiana y áreas equivalentes", d: "Forma siluetas complejas usando exactamente las 7 piezas geométricas planas.", e: '1970s' as const, diff: 'Fácil' as const },
  { t: "Tuberías / Pipe Connector", s: "Topología de redes y flujo continuo", d: "Gira los tramos de tubería para llevar el agua desde la llave hasta la salida.", e: '1990s' as const, diff: 'Media' as const },
  { t: "Nonogram Picross", s: "Lógica matricial binaria de filas y columnas", d: "Descubre el dibujo pixelado deduciendo qué casillas deben pintarse con pistas numéricas.", e: '1990s' as const, diff: 'Difícil' as const },
  { t: "Lights Out / Luces Fuera", s: "Álgebra lineal sobre cuerpos finitos Z2", d: "Apaga todas las luces del tablero teniendo en cuenta que pulsar una conmuta sus vecinas.", e: '1990s' as const, diff: 'Media' as const },
  { t: "15-Puzzle Deslizante", s: "Permutaciones pares e impares en matemáticas", d: "Ordena los números del 1 al 15 deslizando las fichas en el espacio vacío.", e: '1970s' as const, diff: 'Media' as const },
  { t: "Sudoku Escolar 4x4 y 9x9", s: "Razonamiento deductivo y eliminación", d: "Rellena las cuadrículas sin repetir ningún número en la misma fila, columna o región.", e: '2000s' as const, diff: 'Media' as const },
  { t: "Cubo Rubik 2D Net", s: "Teoría de grupos matemáticos y algoritmos", d: "Gira las caras del cubo desplegado para reunir cada color en su plano correspondiente.", e: '1980s' as const, diff: 'Extrema' as const },
  { t: "Mastermind Descifra-Código", s: "Combinatoria e hipótesis científicas", d: "Adivina la secuencia secreta de 4 colores con pistas de aciertos y posiciones.", e: '1970s' as const, diff: 'Media' as const },
  { t: "Joyas Mágicas Bejeweled", s: "Visión de patrones y permutación de adyacencias", d: "Intercambia gemas vecinas para alinear tres o más del mismo tipo.", e: '2000s' as const, diff: 'Fácil' as const },
  { t: "Mahjong Solitaire", s: "Emparejamiento simétrico y memoria de capas", d: "Elimina pares de fichas idénticas que tengan al menos un lado libre.", e: '1980s' as const, diff: 'Media' as const },
  { t: "Crucigrama Numérico Kakuro", s: "Descomposición de sumas en números primos", d: "Coloca dígitos del 1 al 9 para que sumen el total indicado sin repetir cifras.", e: '1990s' as const, diff: 'Difícil' as const },
  { t: "Serpiente de Bloques Lógicos", s: "Optimización de espacio y trayectorias", d: "Mueve los bloques de la oruga para alcanzar la fruta dorada en menos de 10 pasos.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Circuitos Eléctricos Logic Gate", s: "Puertas lógicas AND, OR, NOT y XOR", d: "Conecta interruptores y cables para encender la bombilla según la tabla de verdad.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Balanza de Pesos Desconocidos", s: "Sistemas de ecuaciones de primer grado", d: "Equilibra la balanza deduciendo el peso de cada figura geométrica misteriosa.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Laberinto Hexagonal de Grafos", s: "Árboles de expansión mínima y caminos", d: "Cruza la colmena eligiendo el sendero de menor coste energético.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Color Flood / Inundación", s: "Algoritmo de llenado por difusión (Flood Fill)", d: "Inunda el tablero con un solo color en el número mínimo de movimientos.", e: '2000s' as const, diff: 'Media' as const },
  { t: "Los Puentes de Königsberg", s: "Topología euleriana y grafos transitables", d: "Intenta recorrer todos los puentes de la ciudad sin cruzar dos veces por el mismo.", e: '1980s' as const, diff: 'Difícil' as const },
  { t: "Reflejos de Espejos Láser", s: "Leyes de reflexión óptica (ángulo incid = reflej)", d: "Orienta espejos a 45 grados para dirigir el rayo de luz hasta el prisma diana.", e: '1990s' as const, diff: 'Media' as const },
  { t: "Acertijo del Río (Lobo y Oveja)", s: "Estados de transición y restricciones lógicas", d: "Cruza al pastor, al lobo, a la oveja y a la col en la barca sin que nadie se coma a nadie.", e: '1970s' as const, diff: 'Fácil' as const },
  { t: "Lógica Booleana de Rescate", s: "Álgebra de Boole y simplificación de Karnaugh", d: "Activa los cerrojos lógicos resolviendo proposiciones verdaderas o falsas.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Cubos Isométricos 3D", s: "Proyección diédrica: Alzado, Planta y Perfil", d: "Cuenta cuántos cubos componen la figura oculta a partir de sus 3 vistas ortogonales.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Desanudar la Red / Untangle", s: "Grafos planares e intersección de aristas", d: "Mueve los nodos en la pantalla hasta que ninguna de las líneas de conexión se cruce.", e: '2000s' as const, diff: 'Media' as const },
  { t: "Péndulo de Newton Elástico", s: "Conservación del momento lineal y energía", d: "Calcula cuántas bolas saldrán despedidas al soltar las esferas de acero elevadas.", e: '1980s' as const, diff: 'Fácil' as const },
  { t: "Engranajes Mecánicos Relación", s: "Relación de transmisión entre ruedas dentadas", d: "Calcula hacia qué sentido girará el engranaje final y a cuántas revoluciones.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Conectar los Puntos de Constelación", s: "Coordenadas celestes y geometría plana", d: "Une estrellas en orden numérico para trazar las constelaciones del hemisferio norte.", e: '1990s' as const, diff: 'Fácil' as const },
  { t: "Fósforos Geométricos", s: "Transformaciones rígidas en el plano", d: "Mueve 2 cerillas para transformar 4 cuadrados en 3 triángulos equiláteros.", e: '1980s' as const, diff: 'Media' as const },
  { t: "Sopa de Símbolos Matemáticos", s: "Jerarquía de operaciones aritméticas", d: "Inserta los signos +, -, ·, / adecuados para que la igualdad final sea correcta.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "El Enigma de los 3 Sombreros", s: "Metarazonamiento y conocimiento común", d: "Deduce el color de tu propio sombrero a partir del silencio y respuestas de tus compañeros.", e: '1970s' as const, diff: 'Difícil' as const },
  { t: "Cuadrado Mágico de Durero", s: "Matrices mágicas con sumas constantes (34)", d: "Completa el grabado de 1514 asegurando que filas, columnas y diagonales sumen 34.", e: '1980s' as const, diff: 'Difícil' as const },
  { t: "Cruce de Vías de Tren", s: "Planificación temporal y desvíos ferroviarios", d: "Conmuta las agujas de las vías para que dos trenes no colisionen en la estación.", e: '1990s' as const, diff: 'Media' as const },
  { t: "Desbloquea el Coche Rojo (Rush Hour)", s: "Búsqueda en anchura (BFS) y movimientos mínimos", d: "Desliza autobuses y camiones para abrir camino libre hasta la salida.", e: '1990s' as const, diff: 'Media' as const },
  { t: "Alquimia de Elementos Básicos", s: "Reacciones de síntesis química y combinatoria", d: "Combina Agua, Fuego, Tierra y Aire para descubrir los 118 elementos periódicos.", e: '2000s' as const, diff: 'Fácil' as const },
  { t: "Criptograma del César", s: "Criptografía clásica de traslación alfabética", d: "Descifra el mensaje secreto desplazando las letras según la clave k dada.", e: '1980s' as const, diff: 'Fácil' as const },
  { t: "Balanza Romana de Arquímedes", s: "Principio de la palanca: F1 · d1 = F2 · d2", d: "Mueve el pilón corredizo hasta equilibrar el peso suspendido del gancho.", e: '1980s' as const, diff: 'Media' as const },
  { t: "Dominó Matemático de Fracciones", s: "Equivalencia de números racionales", d: "Conecta fracciones equivalentes como 2/4 con 1/2 o 3/6 en una cadena perfecta.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Mosaico Romano de Teselas", s: "Teselaciones regulares y semirregulares", d: "Recubre el pavimento sin dejar huecos combinando hexágonos y triángulos.", e: '1990s' as const, diff: 'Media' as const },
  { t: "Diagramas de Voronoi", s: "Geometría computacional y regiones de proximidad", d: "Ubica los centros escolares para minimizar la distancia caminada por cada alumno.", e: 'Retro Moderno' as const, diff: 'Difícil' as const },
  { t: "Ostomachion de Arquímedes", s: "Descomposición del cuadrado en 14 polígonos", d: "Reorganiza las 14 piezas del juego más antiguo del mundo para rehacer el cuadrado.", e: '1970s' as const, diff: 'Extrema' as const },
  { t: "Espiral Áurea de Fibonacci", s: "Sucesión de Fibonacci y el número de oro (Phi)", d: "Ensambla cuadrados de lados 1, 1, 2, 3, 5, 8, 13 para dibujar la concha del nautilus.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Sudoku Lingüístico PT-ES", s: "Transferencia léxica y matrices cruzadas", d: "Rellena la cuadrícula con palabras sinónimas de Brasil y España sin repetir.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "El Salto del Caballo de Ajedrez", s: "Camino hamiltoniano en el tablero 8x8", d: "Recorre las 64 casillas del tablero saltando en forma de 'L' sin pisar ninguna dos veces.", e: '1980s' as const, diff: 'Extrema' as const },
  { t: "Los Tres Vasos de Agua (8L, 5L, 3L)", s: "Problemas de jarras y aritmética modular", d: "Traspasa agua entre recipientes sin marcas de medida hasta obtener exactamente 4 litros.", e: '1980s' as const, diff: 'Media' as const },
  { t: "Laberinto de Dedalo y el Minotauro", s: "Algoritmos de la mano derecha y Tremaux", d: "Sigue el hilo de Ariadna para escapar del laberinto cretense esquivando trampas.", e: '1980s' as const, diff: 'Media' as const },
  { t: "Cifrado Vigenère Polialfabético", s: "Criptoanálisis y tablas de correspondencia", d: "Usa la palabra clave para descifrar despachos de la época de los descubrimientos.", e: '1990s' as const, diff: 'Difícil' as const },
  { t: "Puzle Maestro Belentani", s: "Síntesis cognitiva y resolución creativa", d: "La prueba final de lógica que integra matemáticas, lenguaje y visión espacial.", e: 'Retro Moderno' as const, diff: 'Extrema' as const }
];

// 3. MATES & ÁLGEBRA SEEDS (50)
const MATES_TITLES = [
  { t: "Ecuación Relámpago 3º ESO", s: "Resolución de ecuaciones de primer grado ax + b = c", d: "Despeja la incógnita x a contrarreloj antes de que baje la barra de energía.", e: 'Retro Moderno' as const, diff: 'Fácil' as const, eng: 'combat' as const },
  { t: "Math Invaders Álgebra", s: "Disparo al resultado correcto de monomios", d: "Dispara a los invasores que portan la solución numérica exacta de la operación.", e: '1980s' as const, diff: 'Media' as const, eng: 'mathShooter' as const },
  { t: "Duelo de Fracciones Equivalentes", s: "Suma, resta y simplificación de racionales", d: "Compara fracciones a toda velocidad indicando cuál es mayor, menor o igual.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Multiplica Ninja 8-Bit", s: "Tablas de multiplicar del 1 al 12 y cálculo rápido", d: "Corta los números flotantes que sean múltiplos del valor indicado.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Pitágoras Runner en Catetos", s: "Teorema de Pitágoras: a² + b² = c²", d: "Calcula la hipotenusa para saltar fosos triangulares con la longitud exacta.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Factorización Express de Polinomios", s: "Sacar factor común e identidades notables", d: "Arrastra factores como (x+3) o (x-2) para descomponer trinomios cuadráticos.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Balanza de Igualdades Matemáticas", s: "Propiedades de la igualdad (sumar o restar en ambos miembros)", d: "Mantén la balanza en equilibrio sumando o quitando pesos a ambos lados.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Porcentajes al Vuelo de Rebajas", s: "Cálculo mental de descuentos (10%, 20%, 50%)", d: "Calcula el precio final de los libros en la feria escolar antes de pagar.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Geometría Angle Shot", s: "Ángulos agudos, rectos, obtusos y llanos", d: "Apunta el cañón calculando el ángulo de tiro entre 0 y 90 grados exactos.", e: '1990s' as const, diff: 'Media' as const },
  { t: "Cazador de Números Primos", s: "Criba de Eratóstenes y divisibilidad", d: "Atrapa únicamente números primos (2, 3, 5, 7, 11, 13...) y esquiva los compuestos.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "La Regla de los Signos (+ y -)", s: "Aritmética de números enteros relativos (Z)", d: "Aplica (- por - = +) y (+ por - = -) en duelos de cálculo rápido.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Potencias y Raíces Blitz", s: "Leyes de los exponentes (a^n · a^m = a^(n+m))", d: "Resuelve potencias y raíces cuadradas perfectas a ritmo de rap.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Recta Numérica Jumper", s: "Ordenación de números enteros y decimales", d: "Salta exactamente al punto indicado en la recta entre -10 y +10.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Radar de Coordenadas Cartesianas", s: "Puntos en el plano (x, y) en los 4 cuadrantes", d: "Detecta submarinos introduciendo las coordenadas exactas de su eco.", e: '1980s' as const, diff: 'Fácil' as const },
  { t: "Estadística y Medias del Instituto", s: "Cálculo de la media aritmética, mediana y moda", d: "Calcula la nota media de los exámenes de Danilo para pronosticar su sobresaliente.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Probabilidad con Dados de Colores", s: "Regla de Laplace: casos favorables / casos posibles", d: "Apuesta a las probabilidades reales de combinaciones de dos dados de 6 caras.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Ecuación de Segundo Grado Fórmula", s: "Fórmula cuadrática de Bhaskara / LOMLOE", d: "Identifica los coeficientes a, b, c y halla las dos raíces reales.", e: 'Retro Moderno' as const, diff: 'Difícil' as const },
  { t: "Pendiente de la Recta y = mx + n", s: "Interpretación geométrica de la pendiente m", d: "Modifica la inclinación de la rampa cambiando el valor de m y la ordenada n.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Monomios y Polinomios Smasher", s: "Suma y resta de términos semejantes", d: "Agrupa monomios con el mismo grado para despejar el campo de batalla.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Regla de Tres Directa e Inversa", s: "Proporcionalidad matemática de magnitudes", d: "Calcula cuánto tardarán 4 pintores si 2 tardan 6 horas (inversa).", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Mínimo Común Múltiplo Race", s: "Cálculo del MCM para sumar denominadores", d: "Calcula el MCM de dos números para acelerar tu bólido en la recta.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Máximo Común Divisor Tower", s: "Algoritmo de Euclides para el MCD", d: "Corta vigas de madera en piezas iguales de la máxima longitud posible.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Jerarquía de Operaciones PEMDAS", s: "Paréntesis, Exponentes, Multiplicación, División, Suma, Resta", d: "Coloca paréntesis para que 4 + 3 · 2 dé 14 en vez de 10.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Decimales Periódicos a Fracción", s: "Conversión de decimal puro y mixto a fracción generatriz", d: "Encuentra la fracción exacta que genera el número 0.333... o 1.25.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Triángulo de Pascal y Binomios", s: "Coeficientes binomiales (a + b)^n", d: "Completa las filas del triángulo sumando los dos números superiores.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Sucesiones Aritméticas y Geométricas", s: "Término general an = a1 + (n-1)d", d: "Adivina cuál es el siguiente término de la serie numérica misteriosa.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Polígonos Regulares y Diagonales", s: "Fórmula de diagonales: D = n(n-3)/2", d: "Traza todas las diagonales posibles de pentágonos, hexágonos y octógonos.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Áreas y Perímetros del Parque", s: "Cálculo de áreas de triángulos, trapecios y círculos", d: "Mide parcelas y vallas para diseñar el parque escolar sostenible.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Teorema de Tales y Sombras", s: "Semejanza de triángulos y proporciones de sombras", d: "Mide la altura de la torre a partir de la sombra proyectada por un bastón.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Volúmenes de Cuerpos Redondos", s: "Cilindros, conos y esferas (V = 4/3 π r³)", d: "Llena depósitos de agua calculando el volumen volumétrico exacto en litros.", e: 'Retro Moderno' as const, diff: 'Difícil' as const },
  { t: "Logaritmos Básicos en Base 10", s: "Definición de logaritmo: log_b(a) = c <=> b^c = a", d: "Descifra contraseñas hallando log(100), log(1000) o log_2(16).", e: 'Retro Moderno' as const, diff: 'Difícil' as const },
  { t: "Ecuaciones con Paréntesis Distributiva", s: "Propiedad distributiva a(b + c) = ab + ac", d: "Expande y simplifica términos algebraicos para derrotar a los robots.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Ecuaciones con Denominadores", s: "Eliminación de denominadores multiplicando por el MCM", d: "Multiplica toda la ecuación por el MCM para convertirla en ecuación entera.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Sistemas Lineales 2x2 por Reducción", s: "Método de reducción, sustitución e igualación", d: "Suma ambas ecuaciones tras multiplicar por coeficientes para anular la 'y'.", e: 'Retro Moderno' as const, diff: 'Difícil' as const },
  { t: "Ecuaciones Bicuadradas ax^4 + bx^2 + c = 0", s: "Cambio de variable z = x²", d: "Aplica el cambio de variable para convertir una ecuación de 4º grado en una de 2º.", e: 'Retro Moderno' as const, diff: 'Difícil' as const },
  { t: "Vectores en el Plano 2D", s: "Componentes vectoriales, módulo y producto escalar", d: "Dirige el velero sumando los vectores del viento y de la marea marina.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Trigonometría Seno, Coseno y Tangente", s: "Razones trigonométricas en triángulos rectángulos", d: "Calcula la altura del acantilado con el teodolito y la tangente del ángulo.", e: 'Retro Moderno' as const, diff: 'Difícil' as const },
  { t: "Parábola y Vértice de la Función", s: "Cálculo del vértice V = (-b/2a, f(-b/2a))", d: "Ajusta la trayectoria parabólica del balón de fútbol para marcar gol.", e: 'Retro Moderno' as const, diff: 'Difícil' as const },
  { t: "Interés Simple de Ahorros", s: "Fórmula de capitalización: I = C · r · t / 100", d: "Calcula los intereses generados por una cuenta de ahorros para el viaje de fin de curso.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Notación Científica del Cosmos", s: "Expresión en potencias de 10 (m · 10^k)", d: "Convierte distancias a galaxias y tamaños celulares a notación científica estándar.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Cinemática v = d / t Express", s: "Movimiento rectilíneo uniforme (MRU)", d: "Calcula la velocidad del AVE Madrid-Barcelona conociendo distancia y tiempo.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Densidad y Flotabilidad (d = m / V)", s: "Relación masa / volumen y principio de Arquímedes", d: "Determina si el bloque de corona de oro es auténtico sumergiéndolo en agua.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Ley de Ohm Eléctrica (V = I · R)", s: "Voltaje, corriente y resistencia en circuitos", d: "Elige la resistencia correcta para no quemar el diodo LED del robot escolar.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Palancas de 1º, 2º y 3º Género", s: "Ley del punto de apoyo y ventaja mecánica", d: "Mueve piedras colosales ubicando el punto de apoyo en la posición óptima.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Conversor de Unidades del Sistema Internacional", s: "Factores de conversión de metros, litros y gramos", d: "Convierte kilómetros a milímetros y horas a segundos a toda velocidad.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Diagramas de Barras y Sectores", s: "Representación gráfica de frecuencias absolutas y relativas", d: "Interpreta las encuestas de recreo del instituto y genera gráficos circulares.", e: 'Retro Moderno' as const, diff: 'Fácil' as const },
  { t: "Medidas de Dispersión: Rango y Varianza", s: "Desviación típica y homogeneidad de muestras", d: "Compara la consistencia de dos equipos de tiro con arco según su desviación.", e: 'Retro Moderno' as const, diff: 'Difícil' as const },
  { t: "Álgebra de Boole con 0 y 1", s: "Tablas de la verdad para sistemas digitales", d: "Diseña el chip de seguridad del laboratorio escolar con puertas AND y OR.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Despeje de Fórmulas de Física ESO", s: "Aislamiento de variables en expresiones algebraicas", d: "Despeja el tiempo 't' de la fórmula de aceleración a = (vf - v0) / t.", e: 'Retro Moderno' as const, diff: 'Media' as const },
  { t: "Sprint de Matemáticas PAU Bachillerato", s: "Matrices, integrales y derivadas de selectividad", d: "El gran simulador de preguntas de examen para la máxima nota de acceso universitario.", e: 'Retro Moderno' as const, diff: 'Extrema' as const }
];

// Combine and generate full 500 catalog
export function getAll500ClassicMiniGames(): ClassicMiniGame[] {
  const games: ClassicMiniGame[] = [];

  // 1. Arcade (50)
  ARCADE_SEEDS.forEach((seed, i) => {
    games.push({
      id: `arcade-${i + 1}`,
      number: games.length + 1,
      title: seed.title,
      category: '8-Bit & Arcade Clásico',
      era: seed.era,
      difficulty: seed.difficulty,
      rating: seed.rating,
      plays: seed.plays,
      description: seed.description,
      controls: seed.controls,
      educationalSkill: seed.educationalSkill,
      builtInEngine: seed.builtInEngine || 'virtualCabinet',
      color: '#ff2d55'
    });
  });

  // 2. Puzzles (50)
  PUZZLE_TITLES.forEach((pt, i) => {
    games.push({
      id: `puzzle-${i + 1}`,
      number: games.length + 1,
      title: pt.t,
      category: 'Puzzles, Lógica & Bloques',
      era: pt.e,
      difficulty: pt.diff,
      rating: parseFloat((4.6 + ((i * 3) % 5) * 0.1).toFixed(1)),
      plays: 8000 + ((i * 219) % 12000),
      description: pt.d,
      controls: "Ratón / Flechas de Teclado / Pantalla Táctil",
      educationalSkill: pt.s,
      builtInEngine: (pt as any).eng || 'virtualCabinet',
      color: '#f59e0b'
    });
  });

  // 3. Mates (50)
  MATES_TITLES.forEach((mt, i) => {
    games.push({
      id: `mates-${i + 1}`,
      number: games.length + 1,
      title: mt.t,
      category: 'Mates, Números & Álgebra Blitz',
      era: mt.e,
      difficulty: mt.diff,
      rating: parseFloat((4.7 + ((i * 2) % 4) * 0.1).toFixed(1)),
      plays: 9000 + ((i * 311) % 14000),
      description: mt.d,
      controls: "Teclado numérico / Clic en opciones / Flechas",
      educationalSkill: mt.s,
      builtInEngine: (mt as any).eng || 'virtualCabinet',
      color: '#10b981'
    });
  });

  // 4. Idiomas PT-ES-CA (50)
  const IDIOMAS_TOPICS = [
    { t: "Ahorcado Trilingüe Belentani", s: "Adivinanza de léxico con pistas en portugués y catalán", d: "Descubre la palabra oculta antes de agotar los 6 intentos de la soga.", eng: 'hangman' as const },
    { t: "Cazador de Falsos Amigos Brasil-España", s: "Diferenciación de cognados engañosos (embaraçada, esquisito)", d: "Identifica trampas del portugués que confunden a alumnos en España.", eng: 'falseFriends' as const },
    { t: "Sopa de Letras del Instituto", s: "Reconocimiento visual de vocabulario escolar", d: "Encuentra palabras como 'recreo', 'asignatura', 'conselleria' y 'quadern'." },
    { t: "Ortografía: ¿B o V? Duelo Rápido", s: "Normas ortográficas del castellano y catalán", d: "Elige la letra correcta a toda velocidad para no caer al agua." },
    { t: "Acentos y Tildes Diacríticas", s: "Acentuación en agudas, llanas, esdrújulas y tilde diacrítica (sí / si)", d: "Dispara tildes a las sílabas tónicas de las palabras que lo requieran." },
    { t: "C trencada (Ç) y Ela Geminada (L·L)", s: "Grafías específicas del catalán y pronunciación", d: "Aprende el uso exacto de 'al·licient', 'il·lusió', 'adreça' y 'caçar'." },
    { t: "Pronoms Febles Catalans Match", s: "Sustitución pronominal en catalán (en, hi, em, li)", d: "Sustituye los complementos directos e indirectos por el pronombre exacto." },
    { t: "Verbos Irregulares Castellano Duelo", s: "Conjugación del presente de subjuntivo e indefinido", d: "Conjuga 'caber', 'haber', 'andar' y 'poner' en batallas cronometradas." },
    { t: "Irregular Verbs English B1 Runner", s: "Past Simple and Past Participle (catch-caught-caught)", d: "Corre esquivando los infinitivos y recogiendo el participio correcto." },
    { t: "Listening & Accent Trainer Belentani", s: "Discriminación fonética de fonemas abiertos (è, ò)", d: "Escucha a Belentani y selecciona cuál de las tres palabras ha pronunciado.", eng: 'karaoke' as const }
  ];
  for (let i = 0; i < 50; i++) {
    const seed = IDIOMAS_TOPICS[i % IDIOMAS_TOPICS.length];
    const subIdx = Math.floor(i / IDIOMAS_TOPICS.length) + 1;
    const suffix = subIdx > 1 ? ` Vol. ${subIdx}` : '';
    games.push({
      id: `idiomas-${i + 1}`,
      number: games.length + 1,
      title: `${seed.t}${suffix}`,
      category: 'Palabras, Letras & Idiomas PT-ES-CA',
      era: 'Retro Moderno',
      difficulty: i % 3 === 0 ? 'Fácil' : i % 3 === 1 ? 'Media' : 'Difícil',
      rating: parseFloat((4.7 + (i % 4) * 0.1).toFixed(1)),
      plays: 11000 + ((i * 197) % 11000),
      description: seed.d,
      controls: "Teclado / Ratón / Micrófono",
      educationalSkill: seed.s,
      builtInEngine: seed.eng || 'virtualCabinet',
      color: '#06b6d4'
    });
  }

  // 5. Plataformas, Saltos & Runners (50)
  const PLATFORM_NAMES = [
    "Super Danilo Bros 2026", "Sonic Pixel Dash Loop", "Megaman Energy Jump", "Ninja Shadow Castle Climb",
    "Castlevania Stairway Quest", "Doodle Sky Cloud Hopper", "Jetpack Formula Dash", "Pitfall River Crocodile Hop",
    "Spelunky Mini Gold Cave", "Ice Climber Mountain Peak", "Prince of Persia 1989 Leap", "Celeste Mountain Chill Dash",
    "Shovel Knight Dig & Slash", "Rayman Jungle Lum Sprint", "Hollow Bug Knight Slash", "Commander Keen Galaxy Jet",
    "Flashback Sci-Fi Escape", "Aladdin Agrabah Rooftop Run", "Lion King Savanna Sprint", "Earthworm Jim Space Whip",
    "Boulder Dash Diamond Fall", "Lode Runner Gold Ladder", "Jazz Jackrabbit Blaster Turbo", "Cave Story Pixel Rescue",
    "Broforce Action Commando", "Katana Zero Slow-Mo Slash", "Dead Cells Mini Rogue Run", "VVVVVV Gravity Reverse Flip",
    "N-Game Ninja Wall Slide", "Canabalt Rooftop Glass Escape", "Geometry Dash Rhythm Jump", "Badland Shadow Wing Flight",
    "Limbo Silhouette Cog Step", "Braid Time Rewind Puzzle", "Super Meat Boy Salt Hop", "Guacamelee Lucha Libre Jump",
    "Ori Spirit Tree Dash", "Cuphead Boss Stage Leap", "Sonic Chemical Plant Water Run", "Mario World Cape Feather Flight"
  ];
  for (let i = 0; i < 50; i++) {
    const title = PLATFORM_NAMES[i % PLATFORM_NAMES.length] + (i >= PLATFORM_NAMES.length ? ` Fase ${i - PLATFORM_NAMES.length + 2}` : '');
    games.push({
      id: `plataformas-${i + 1}`,
      number: games.length + 1,
      title,
      category: 'Plataformas, Saltos & Runners',
      era: i % 2 === 0 ? '1990s' : 'Retro Moderno',
      difficulty: i % 4 === 0 ? 'Fácil' : i % 4 === 1 ? 'Media' : i % 4 === 2 ? 'Difícil' : 'Extrema',
      rating: parseFloat((4.6 + (i % 5) * 0.1).toFixed(1)),
      plays: 13000 + ((i * 243) % 15000),
      description: "Salta con precisión, esquiva pinchos y trampas mecánicas, y recolecta monedas en mundos de scroll continuo.",
      controls: "Flechas Izq/Der + Tecla Espacio / Salto",
      educationalSkill: "Estimación cinemática de distancias y tiempo de reacción motor",
      builtInEngine: i === 0 ? 'runner' : 'virtualCabinet',
      color: '#8b5cf6'
    });
  }

  // 6. Deportes & Motor 2D (50)
  const SPORTS_NAMES = [
    "Pong Tenis Mesa 1972", "Micro Machines 2D Racing", "Penalty Kick España-Brasil 2026", "Baloncesto Triple Contest 3P",
    "Track & Field 100m Sprint Olímpico", "Salto de Longitud Foso Arena", "OutRun Costa Brava Drift", "Fórmula 1 Pixel Grand Prix",
    "Moto GP Retro Jerez Circuit", "Billar Americano 8-Ball Pro", "Bolos Retro Strike 300", "Tiro con Arco Diana Olímpica",
    "Voleibol Playa Copacabana 2v2", "Bádminton Volante Shuttle Smash", "Skateboard Halfpipe Kickflip 900", "Snowboard Slalom Pirineos",
    "Boxeo Retro Punch-Out Mac", "Kárate Kumite Dojo Cinturón Negro", "Golf Miniatura 18 Hoyos Green", "Dardos Diana 501 Puntos",
    "Ciclismo Tour de Francia Montaña", "Remo Olímpico Lago Banyoles", "Béisbol Home Run Derby Clásico", "Fútbol Chapa Retro Liga",
    "Hockey sobre Hielo Pixel Puck", "Air Hockey Mesa Flotante Láser", "Carrera de Lanchas Río Ebro", "Rally Safari 4x4 Barro",
    "Derby de Demolición Coches Chatarra", "Escalada Deportiva Rocódromo Escolar", "Salto con Pértiga Récord Mundial", "Maratón 42k Pace & Ritmo",
    "Piragüismo Aguas Bravas Kayak", "Hípica Salto de Obstáculos Ecuestre", "Gimnasia Artística Potro y Suelo", "Curling Táctico sobre Hielo",
    "Windsurf Olas del Mediterráneo", "Motocross Trial Piedras y Troncos", "Karting Eléctrico Escolar Cup", "Belentani Decatlón de Oro"
  ];
  for (let i = 0; i < 50; i++) {
    const title = SPORTS_NAMES[i % SPORTS_NAMES.length] + (i >= SPORTS_NAMES.length ? ` Liga ${i - SPORTS_NAMES.length + 2}` : '');
    games.push({
      id: `deportes-${i + 1}`,
      number: games.length + 1,
      title,
      category: 'Deportes, Atletismo & Motor 2D',
      era: i % 3 === 0 ? '1980s' : i % 3 === 1 ? '1990s' : 'Retro Moderno',
      difficulty: i % 3 === 0 ? 'Media' : i % 3 === 1 ? 'Fácil' : 'Difícil',
      rating: parseFloat((4.7 + (i % 4) * 0.1).toFixed(1)),
      plays: 10000 + ((i * 179) % 13000),
      description: "Competición deportiva pixelada: afina tu puntería, domina la inercia del vehículo y bate récords.",
      controls: "Cruceta + Botón de Golpeo / Aceleración",
      educationalSkill: "Fisiología del esfuerzo, física de trayectorias e interculturalidad deportiva",
      builtInEngine: i === 0 ? 'pong' : 'virtualCabinet',
      color: '#ec4899'
    });
  }

  // 7. Naves, Disparo & Espacio (50)
  const SPACE_NAMES = [
    "Space Invaders 1978 Galaxia", "Galaga Alien Formation Swarm", "Asteroids Vector Radar", "Defender Astronaut Rescue Orbit",
    "1942 Pacific Carrier Dogfight", "Gradius Option Shield Laser", "R-Type Wave Beam Alien", "Raiden Supersonic Jet Strike",
    "Xevious Solvalou Nazca Bomb", "Time Pilot Era Time Warp", "Missile Command Interceptor Base", "Ikaruga Dual Polarity Black/White",
    "Darius Mega Silver Hawk", "Moon Patrol Lunar Buggy Jump", "Star Wars Death Star Trench Run", "Gyruss 360 Degree Tube Orbit",
    "Zaxxon Isometric Fortress Trench", "TwinBee Bell Powerup Catcher", "Strikers 1945 WW2 Lightning", "Metal Black Beam Saber Duel",
    "DoDonPachi Danmaku Bullet Storm", "Thunder Force IV Metal Sound", "Batsugun Maximum Firepower", "Cybernator Mech Assault Core",
    "Zero Wing All Your Base", "Star Fox Arwing Corneria Fleet", "Radiant Silvergun 7 Weapons", "Touhou Danmaku Cherry Blossom",
    "Einhander Police Police Mech", "Belentani Cosmic Laser Armada"
  ];
  for (let i = 0; i < 50; i++) {
    const title = SPACE_NAMES[i % SPACE_NAMES.length] + (i >= SPACE_NAMES.length ? ` Sector ${i - SPACE_NAMES.length + 2}` : '');
    games.push({
      id: `naves-${i + 1}`,
      number: games.length + 1,
      title,
      category: 'Naves, Disparo & Espacio Retro',
      era: i % 2 === 0 ? '1980s' : '1990s',
      difficulty: i % 3 === 0 ? 'Media' : i % 3 === 1 ? 'Difícil' : 'Extrema',
      rating: parseFloat((4.8 + (i % 3) * 0.1).toFixed(1)),
      plays: 12000 + ((i * 267) % 14000),
      description: "Surca el cosmos al mando de naves espaciales, esquiva cortinas de proyectiles y destruye acorazados alienígenas.",
      controls: "Flechas Direccionales + Barra Espaciadora",
      educationalSkill: "Velocidad de procesamiento visual periférico y patrones de trayectoria",
      builtInEngine: i === 0 ? 'spaceInvaders' : 'virtualCabinet',
      color: '#ef4444'
    });
  }

  // 8. Memoria, Reflejos & Reacción (50)
  const MEMORY_NAMES = [
    "Simon Says Secuencia de Luces y Sonidos", "Memory Parejas de Símbolos STEM", "Test de Reacción en Milisegundos", "Whack-a-Mole Topo Golpeador",
    "Código Morse Decodificador de Señales", "Ojo de Lince: Encuentra la Diferencia", "Flash Memory de Dígitos Secuenciales", "Detector de Patrones Ocultos",
    "Velocidad de Escritura Teclado Mecánico", "Parejas de Fórmulas Matemáticas ESO", "Banderas del Mundo y Capitales", "Sigue la Bolita en los Tres Vasos",
    "Reflejo de Frenada Coche de Emergencia", "Escaneo Visual Rápido de Números 1-50", "Test de Atención Selectiva Stroop Color", "Ritmo de Palmadas con Metrónomo",
    "Desactiva la Bomba Cortando Cables", "Identifica el Sonido de la Naturaleza", "Cronómetro Exacto a Ciegas 10.00s", "Memoria de la Baraja Española",
    "Juego del Semáforo Verde/Rojo Reflejos", "Atrapa la Manzana Gravedad de Newton", "Laberinto en Espejo Invertido Reflejo", "Discriminación Tonal Do-Re-Mi",
    "Coordinación Bimanual Dos Manos a la Vez", "Reconocimiento Facial de Próceres y Científicos", "Refranes Populares Parejas", "Desafío Supremo Belentani Memoria"
  ];
  for (let i = 0; i < 50; i++) {
    const title = MEMORY_NAMES[i % MEMORY_NAMES.length] + (i >= MEMORY_NAMES.length ? ` Nivel ${i - MEMORY_NAMES.length + 2}` : '');
    games.push({
      id: `memoria-${i + 1}`,
      number: games.length + 1,
      title,
      category: 'Memoria, Reflejos & Reacción',
      era: 'Retro Moderno',
      difficulty: i % 3 === 0 ? 'Fácil' : i % 3 === 1 ? 'Media' : 'Difícil',
      rating: parseFloat((4.7 + (i % 4) * 0.1).toFixed(1)),
      plays: 14000 + ((i * 153) % 11000),
      description: "Pon a prueba tus reflejos milimétricos, tu capacidad de retención nemotécnica y tu velocidad de decisión.",
      controls: "Clic de Ratón / Pantalla Táctil / Teclas 1-4",
      educationalSkill: "Memoria de trabajo (working memory), inhibición de estímulos distractores",
      builtInEngine: i === 1 ? 'memory' : 'virtualCabinet',
      color: '#3b82f6'
    });
  }

  // 9. Música, Ritmo & Beat Box (50)
  const MUSIC_NAMES = [
    "Guitar Belentani Hero Carmesí", "Piano Tiles Escala Clásica", "Dance Dance Revolution Flechas Tap", "Drum Beat Box Batería Electrónica",
    "Flauta Dulce Escolar 8-Bit Digitada", "Sintetizador de Ondas Senoidales Retro", "Samba de Brasil vs Rumba Catalana", "Compás Flamenco y Palmas Por Bulerías",
    "Batucada Rítmica de Tambores Surdo", "Melodías Populares de la ESO Adivina", "Afinador de Oído Absoluto", "Solfeo Rápido en Clave de Sol",
    "Bajo Eléctrico Funky Slap Bass", "DJ Scratch Vinilo Virtual Retro", "Xilófono de Madera Pentatónico", "Órgano Barroco de Tubos Bach",
    "Theremin Electromagnético Virtual", "Caja de Música de Manivela Suiza", "Trompeta de Fanfarria y Metales", "Acordeón de Forró y Tango Río de la Plata",
    "Beatmaker 16 Pads MPC Belentani", "Loop Station Belentani Acústica", "Pentagrama: Figuras Negras y Corcheas", "Bossa Nova Brasileña Ritmo Suave",
    "Himno de Europa Oda a la Alegría", "Escalas Mayores y Menores Armónicas", "Duelo de Rap e Improvisación de Rimas", "Berimbau de Capoeira Toque de Angola",
    "Vals Vienés 3/4 Compás Clásico", "Masterclass Sinfónica de Belentani"
  ];
  for (let i = 0; i < 50; i++) {
    const title = MUSIC_NAMES[i % MUSIC_NAMES.length] + (i >= MUSIC_NAMES.length ? ` Pista ${i - MUSIC_NAMES.length + 2}` : '');
    games.push({
      id: `musica-${i + 1}`,
      number: games.length + 1,
      title,
      category: 'Música, Ritmo & Beat Box',
      era: i % 2 === 0 ? '1990s' : 'Retro Moderno',
      difficulty: i % 3 === 0 ? 'Media' : i % 3 === 1 ? 'Fácil' : 'Difícil',
      rating: parseFloat((4.8 + (i % 3) * 0.1).toFixed(1)),
      plays: 15000 + ((i * 289) % 13000),
      description: "Entrena tu oído musical, compases rítmicos, lectura de partituras y entonación vocal con Belentani.",
      controls: "Teclas D-F-J-K / Barra espaciadora / Ratón",
      educationalSkill: "Educación musical, discriminación tímbrica, rítmica e intercultural",
      builtInEngine: i === 0 ? 'rhythm' : 'virtualCabinet',
      color: '#d946ef'
    });
  }

  // 10. Mesa & Estrategia Clásica (50)
  const MESA_NAMES = [
    "Ajedrez Rápido contra Belentani IA", "Damas Clásicas Internacionales 10x10", "4 en Raya / Conecta 4 Vertical", "Tres en Raya / Tic-Tac-Toe Imbatible",
    "Reversi / Othello Giro de Fichas", "Hundir la Flota / Battleship Naval", "Dominó Escolar Parejas Clásico", "Parchís 4 Jugadores Tablero Real",
    "Oca del Conocimiento Escolar ESO", "Backgammon Tablas Reales de Oriente", "Mahjong Clásico de Tejas Chinas", "Go / Weiqi Estrategia Milenaria",
    "Risk Conquista Territorial de Mapas", "Stratego Captura la Bandera del Mariscal", "Mancala Granos de Café Sembrador", "Cluedo Detective del Instituto",
    "Monopoly Finanzas y Gestión Inmobiliaria", "Scrabble Crucigrama de Puntuación Alta", "Catan Colonizadores de la Isla", "Carcassonne Castillos y Caminos Medievales",
    "Ajedrez Chino Xiangqi del Río", "Shogi Ajedrez Japonés de Reincorporación", "Trivial Pursuit de Todas las Asignaturas", "Party & Co Pruebas Escolares",
    "Dados Yahtzee / Generala 5 Dados", "Póker Mentiroso de Dados con Cubilete", "Rummicub Números y Escaleras de Color", "Mastermind Clásico Descifra Clavijas",
    "Halma / Damas Chinas Estrella de 6 Puntas", "Senet Juego del Antiguo Egipto Faraónico", "Juego Real de Ur de Mesopotamia", "Tablut Ajedrez Vikingo de Hnefatafl",
    "Molino de Nueve Hombres Romano", "Fanorona Juego de Tablero de Madagascar", "Bagh-Chal Tigres y Cabras del Nepal", "Quoridor Laberinto de Tabiques de Madera",
    "Pentago Giro de Cuadrantes 3x3", "Torneo de Grandes Maestros Belentani"
  ];
  for (let i = 0; i < 50; i++) {
    const title = MESA_NAMES[i % MESA_NAMES.length] + (i >= MESA_NAMES.length ? ` Torneo ${i - MESA_NAMES.length + 2}` : '');
    games.push({
      id: `estrategia-${i + 1}`,
      number: games.length + 1,
      title,
      category: 'Juegos de Mesa & Estrategia Clásica',
      era: i % 3 === 0 ? '1970s' : i % 3 === 1 ? '1980s' : 'Retro Moderno',
      difficulty: i % 3 === 0 ? 'Media' : i % 3 === 1 ? 'Difícil' : 'Fácil',
      rating: parseFloat((4.8 + (i % 3) * 0.1).toFixed(1)),
      plays: 13500 + ((i * 221) % 12000),
      description: "Juegos milenarios y de mesa universal: pensamiento estratégico, táctica por turnos y cálculo posicional.",
      controls: "Clic para colocar fichas o mover piezas",
      educationalSkill: "Pensamiento estratégico, toma de decisiones y anticipación al oponente",
      builtInEngine: i === 3 || i === 2 ? 'tictactoe' : 'virtualCabinet',
      color: '#14b8a6'
    });
  }

  return games;
}

// Single pre-computed constant of all 500 classic mini games
export const MINI_GAMES_500_CATALOG: ClassicMiniGame[] = getAll500ClassicMiniGames();
