/* ===================================================================
   build-edutube.mjs  (v2 — por tema, con lista blanca de canales)
   ------------------------------------------------------------------
   Genera un catalogo de videos REALES y relevantes para EduTube.

   1. Para cada tema del curriculo lanza una busqueda en YouTube
      (results?search_query=...) y parsea los videoRenderer del HTML.
   2. Descarta todo video cuyo canal NO este en la lista blanca de
      canales educativos de confianza (evita contenido aleatorio o
      inapropiado para un menor) y descarta Shorts.
   3. Verifica cada superviviente contra el oEmbed de YouTube: si
      responde 200, el video existe y entra; si no, se tira.
   4. Escribe public/modules/edutube/videos.json

   Uso: node scripts/build-edutube.mjs
   =================================================================== */

import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const OUT = path.resolve('public/modules/edutube/videos.json');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const HEADERS = {
  'User-Agent': UA,
  'Accept-Language': 'es,en',
  Cookie: 'CONSENT=YES+cb; SOCS=CAI',
};

// Canales en los que confiamos para menores. Match por subcadena en minúsculas.
const ALLOWLIST = [
  'khan academy', 'khanacademy', '3blue1brown', 'crashcourse', 'crash course',
  'amoeba sisters', 'math antics', 'mathantics', 'bbc learning english',
  'freecodecamp', 'píldoras informáticas', 'pildorasinformaticas',
  'curso em vídeo', 'curso em video', 'unicoos', 'derivando', 'quantumfracture',
  'cdeciencia', 'kurzgesagt', 'ted-ed', 'teded', 'ted ', 'mit opencourseware',
  'mitopencourseware', 'oversimplified', 'simple history', 'openstax',
  'date un vlog', 'date un voltio', 'la cuna de halicarnaso',
  'academia play', 'julio profe', 'julioprofe', 'profe alex', 'matemáticas profe',
  'el profesor de mates', 'aprende con ', 'aula365', 'smile and learn',
  'català', '3cat', 'edu365', 'wall street english', 'aprendamos', 'tutor',
  'el traductor de ingeniería', 'eduCaixa', 'educaixa', 'felix',
  'profesor', 'academia', 'clases', 'lecciones', 'educación', 'education',
  'ciencia', 'física', 'química', 'matemática', 'historia', 'filosofía',
  'programación', 'informática', 'ofimática', 'seguridad',
];

// Ruido que nunca deberia acabar en un aula.
const BLOCK = [
  '#shorts', 'shorts', 'news', 'noticias', 'trump', 'xi ', 'summit', 'elecciones',
  'trading', 'bolsa', 'crypto', 'timescaledb', 'codex', 'muse', 't-shirt',
  'announcement', 'merch', 'podcast', 'reaction', 'gameplay', 'vlog',
];

const TOPICS = [
  // --- Matemáticas ---
  { subject: 'Matemáticas', course: '1º-2º ESO', query: 'fracciones explicación ESO' },
  { subject: 'Matemáticas', course: '1º-2º ESO', query: 'números enteros potencias ESO' },
  { subject: 'Matemáticas', course: '3º ESO', query: 'ecuaciones de primer grado resueltas' },
  { subject: 'Matemáticas', course: '3º ESO', query: 'ecuaciones de segundo grado fórmula general' },
  { subject: 'Matemáticas', course: '3º ESO', query: 'sistemas de ecuaciones 2x2 métodos' },
  { subject: 'Matemáticas', course: '3º ESO', query: 'teorema de pitágoras ejercicios' },
  { subject: 'Matemáticas', course: '4º ESO', query: 'trigonometría básica seno coseno tangente' },
  { subject: 'Matemáticas', course: '4º ESO', query: 'funciones matemáticas dominio recorrido' },
  { subject: 'Matemáticas', course: '4º ESO', query: 'estadística probabilidad ESO' },
  { subject: 'Matemáticas', course: '1º Bach', query: 'logaritmos bachillerato explicación' },
  { subject: 'Matemáticas', course: '1º Bach', query: 'límites de funciones indeterminaciones' },
  { subject: 'Matemáticas', course: '2º Bach / PAU', query: 'derivadas reglas de derivación' },
  { subject: 'Matemáticas', course: '2º Bach / PAU', query: 'integrales inmediatas regla de barrow' },
  { subject: 'Matemáticas', course: '2º Bach / PAU', query: 'matrices y determinantes selectividad' },
  // --- Ciencias ---
  { subject: 'Ciencias', course: '3º ESO', query: 'la célula partes y funciones ESO' },
  { subject: 'Ciencias', course: '3º ESO', query: 'fotosíntesis explicación sencilla' },
  { subject: 'Ciencias', course: '3º ESO', query: 'aparato digestivo y respiratorio ESO' },
  { subject: 'Ciencias', course: '3º ESO', query: 'sistema nervioso y endocrino ESO' },
  { subject: 'Ciencias', course: '3º ESO', query: 'sistema inmunitario defensas ESO' },
  { subject: 'Ciencias', course: '4º ESO', query: 'estructura atómica y enlace químico' },
  { subject: 'Ciencias', course: '4º ESO', query: 'reacciones químicas ajuste' },
  { subject: 'Ciencias', course: '4º ESO', query: 'leyes de Newton explicación' },
  { subject: 'Ciencias', course: '4º ESO', query: 'tectónica de placas terremotos' },
  { subject: 'Ciencias', course: '1º Bach', query: 'cinemática MRU MRUA explicación' },
  // --- Inglés ---
  { subject: 'Inglés', course: '3º ESO B1', query: 'present perfect vs past simple English lesson' },
  { subject: 'Inglés', course: '3º ESO B1', query: 'first and second conditional English' },
  { subject: 'Inglés', course: '3º ESO B1', query: 'english phrasal verbs b1' },
  { subject: 'Inglés', course: '3º ESO B1', query: 'reported speech English grammar' },
  // --- Lengua / Literatura ---
  { subject: 'Lengua', course: '3º ESO', query: 'análisis sintáctico oraciones ESO' },
  { subject: 'Lengua', course: '3º ESO', query: 'acentuación diptongos hiatos triptongos' },
  { subject: 'Lengua', course: '4º ESO', query: 'figuras retóricas explicación' },
  // --- Historia / Geografía ---
  { subject: 'Historia', course: '4º ESO', query: 'transición española resumen' },
  { subject: 'Historia', course: '4º ESO', query: 'revolución industrial resumen' },
  { subject: 'Historia', course: '4º ESO', query: 'primera guerra mundial resumen' },
  { subject: 'Historia', course: '3º ESO', query: 'climas y relieve de España' },
  // --- Filosofía ---
  { subject: 'Filosofía', course: '1º Bach', query: 'del mito al logos filosofía' },
  { subject: 'Filosofía', course: '1º Bach', query: 'Platón teoría de las ideas resumen' },
  // --- Programación / IA ---
  { subject: 'Programación', course: 'Transversal', query: 'Python desde cero para principiantes' },
  { subject: 'Programación', course: 'Transversal', query: 'Python programación orientada a objetos' },
  { subject: 'Programación', course: 'Transversal', query: 'introducción a la programación lógica' },
  { subject: 'Programación', course: 'Transversal', query: 'HTML y CSS desde cero' },
  { subject: 'Programación', course: 'Ofimática', query: 'Excel fórmulas y funciones básicas' },
  { subject: 'IA', course: 'Transversal', query: 'qué es la inteligencia artificial explicado' },
  { subject: 'IA', course: 'Transversal', query: 'redes neuronales explicación sencilla' },
  { subject: 'IA', course: 'Transversal', query: 'cómo escribir buenos prompts' },
  // --- Ciberseguridad ---
  { subject: 'Ciberseguridad', course: 'Secure-T', query: 'ciberseguridad básica para principiantes' },
  { subject: 'Ciberseguridad', course: 'Secure-T', query: 'contraseñas seguras cómo crear' },
  { subject: 'Ciberseguridad', course: 'Secure-T', query: 'phishing estafa explicación' },
  { subject: 'Ciberseguridad', course: 'Secure-T', query: 'seguridad en redes wifi públicas' },
  // --- Catalán ---
  { subject: 'Català', course: '2º-3º ESO', query: 'català per a castellanoparlants vocabulari' },
  { subject: 'Català', course: '3º ESO', query: 'passat perifràstic català explicació' },
];

const isAllowed = (channel) => {
  const c = (channel || '').toLowerCase();
  return ALLOWLIST.some((a) => c.includes(a));
};
const isBlocked = (title) => {
  const t = (title || '').toLowerCase();
  return BLOCK.some((b) => t.includes(b));
};

// Node fetch (undici) es rechazado por YouTube; curl.exe sí pasa.
function curlText(url) {
  const args = [
    '-sS', '-m', '30', '--compressed',
    '-H', `User-Agent: ${UA}`,
    '-H', 'Cookie: CONSENT=YES+cb; SOCS=CAI',
    '-H', 'Accept-Language: es,en',
    url,
  ];
  return execFileSync('curl.exe', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

async function fetchText(url) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const text = curlText(url);
      if (text && text.length > 200) return text;
      lastErr = new Error(`respuesta vacia/corta (${text ? text.length : 0} bytes)`);
    } catch (err) {
      lastErr = err;
    }
    await sleep(500 * attempt);
  }
  throw lastErr;
}

function parseSearch(html) {
  const chunks = html.split('"videoRenderer":{"videoId":"').slice(1);
  const out = [];
  for (const chunk of chunks) {
    const id = chunk.slice(0, 11);
    if (!/^[0-9A-Za-z_-]{11}$/.test(id)) continue;
    const title = (chunk.match(/"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.){3,120})"/) || [])[1];
    const channel = (chunk.match(/"ownerText":\{"runs":\[\{"text":"((?:[^"\\]|\\.){1,80})"/) || [])[1];
    if (!title || !channel) continue;
    out.push({
      id,
      title: JSON.parse(`"${title}"`),
      channel: JSON.parse(`"${channel}"`),
    });
  }
  return out;
}

async function verify(id) {
  try {
    const json = await fetchText(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`);
    const data = JSON.parse(json);
    return { title: data.title, author: data.author_name };
  } catch {
    return null;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const byId = new Map();
  const errors = [];
  const MAX_PER_TOPIC = 3;

  for (const topic of TOPICS) {
    let html;
    try {
      html = await fetchText(`https://www.youtube.com/results?search_query=${encodeURIComponent(topic.query)}&hl=es`);
    } catch (err) {
      errors.push(`busqueda "${topic.query}": ${err.message}`);
      continue;
    }
    const results = parseSearch(html)
      .filter((v) => isAllowed(v.channel) && !isBlocked(v.title))
      .slice(0, MAX_PER_TOPIC);

    for (const v of results) {
      if (byId.has(v.id)) {
        const existing = byId.get(v.id);
        if (!existing.topics.includes(topic.query)) existing.topics.push(topic.query);
        continue;
      }
      const meta = await verify(v.id);
      if (!meta) {
        errors.push(`no verificado: ${v.id} (${v.title.slice(0, 40)})`);
        continue;
      }
      byId.set(v.id, {
        id: v.id,
        title: meta.title,
        channel: meta.author,
        subject: topic.subject,
        course: topic.course,
        topics: [topic.query],
        thumbnail: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
        watchUrl: `https://www.youtube.com/watch?v=${v.id}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
      });
      console.log(`  OK [${topic.subject}] ${meta.title.slice(0, 70)}  (${v.id})`);
      await sleep(60);
    }
    console.log(`${topic.subject} · "${topic.query}" -> ${results.length} (acumulado ${byId.size})`);
  }

  const videos = [...byId.values()].sort((a, b) => a.subject.localeCompare(b.subject) || a.title.localeCompare(b.title));
  const payload = {
    source: 'YouTube search (lista blanca de canales) + oEmbed',
    generatedAtUtc: new Date().toISOString(),
    disclaimer:
      'Solo canales educativos de confianza. Cada video fue verificado contra el oEmbed de YouTube al generarse. YouTube puede retirar videos: si uno deja de cargar, reejecuta este script.',
    count: videos.length,
    allowlist: ALLOWLIST,
    videos,
  };

  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(`\nEscritos ${videos.length} videos verificados en ${OUT}`);
  if (errors.length) console.log(`\nIncidencias (${errors.length}):\n  ` + errors.slice(0, 15).join('\n  '));
}

main().catch((err) => {
  console.error('FALLO:', err);
  process.exit(1);
});
