#!/usr/bin/env node
/**
 * build-conceptos.mjs — crea el "ambito de conceptos" de cada plataforma.
 *
 * Para cada plataforma genera una pagina autonoma (sin dependencias ni build):
 *   <repo>/public/conceptos/index.html   (glosario completo + los suyos)
 *   <repo>/public/conceptos/conceptos.json
 *
 * Fuente: public/modules/biblia/ (exportado de la Biblia real de open-school).
 * Uso: node scripts/build-conceptos.mjs
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const W = path.resolve(here, '..');
const BIBLIA = path.join(W, 'public', 'modules', 'biblia');
const CENTRAL = path.join(BIBLIA, 'plataformas');

const todos = JSON.parse(readFileSync(path.join(BIBLIA, 'todos.json'), 'utf8'));

// Que plataforma se despliega en que repo local (si existe).
const TARGETS = {
  'secure-t': [
    'C:\\Users\\USER\\Documents\\05_EDUCACION\\educativos\\secure-t\\client\\public\\conceptos',
    'C:\\Users\\USER\\Documents\\05_EDUCACION\\educativos\\secure-t\\conceptos',
  ],
  'manos-abiertas': 'C:\\Users\\USER\\Documents\\05_EDUCACION\\educativos\\ManosAbiertas\\public\\conceptos',
  'ux-academy': 'C:\\Users\\USER\\Documents\\07_INFORMES\\_mimocode_work\\fix\\ux-academy-professional-program\\client\\public\\conceptos',
};

const NOMBRES = {
  'secure-t': 'secure-t · Universidad de Ciberseguridad e IA',
  'manos-abiertas': 'Manos Abiertas · IA y ofimática para recién llegados',
  'ux-academy': 'UX Academy · Diseño UX/Producto',
  'lingua-aberta': 'Lingua Aberta · Idiomas',
  'creative-tech': 'Creative Tech · Web creativa',
  'agent-systems': 'Agent Systems · Agentes y APIs',
};

function pagina(curso, propios, total) {
  const nombre = NOMBRES[curso] || curso;
  const data = { curso, nombre, total, todos, propios };
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Conceptos · ${nombre}</title>
<meta name="description" content="Conceptos de ${nombre}: definiciones propias dentro del glosario universal de desarrollo de software.">
<style>
:root{--bg:#0b0f17;--card:#121826;--line:#1f2a3d;--tx:#e7ecf5;--mut:#8b9bb4;--ac:#ffb020;--ok:#3ddc97}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--tx);font:15px/1.55 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
header{padding:28px 20px 16px;border-bottom:1px solid var(--line)}
h1{margin:0 0 6px;font-size:22px}
header p{margin:0;color:var(--mut);font-size:13px}
.bar{position:sticky;top:0;display:flex;flex-wrap:wrap;gap:8px;padding:12px 20px;background:rgba(11,15,23,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);z-index:5}
input{flex:1;min-width:220px;background:var(--card);border:1px solid var(--line);color:var(--tx);padding:10px 12px;border-radius:10px;font-size:14px;outline:none}
input:focus{border-color:var(--ac)}
button{background:var(--card);border:1px solid var(--line);color:var(--mut);padding:10px 14px;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer}
button.on{background:var(--ac);border-color:var(--ac);color:#1a1200}
main{max-width:900px;margin:0 auto;padding:16px 20px 60px}
.item{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin:10px 0}
.item.mine{border-color:var(--ac)}
.top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:700;color:var(--ac);font-size:13px}
.nom{font-weight:600}
.chip{margin-left:auto;font-size:11px;color:var(--mut);border:1px solid var(--line);border-radius:999px;padding:2px 8px}
.def{margin:8px 0 0;color:#c7d2e3;font-size:14px}
.mine .chip{color:var(--ok);border-color:var(--ok)}
.empty{color:var(--mut);text-align:center;padding:40px 0}
footer{color:var(--mut);font-size:12px;text-align:center;padding:0 20px 40px}
a{color:var(--ac)}
</style>
</head>
<body>
<header>
  <h1>Conceptos de ${nombre}</h1>
  <p>Definiciones propias dentro del glosario universal de desarrollo de software (${total} términos). El glosario completo vive en <a href="https://open-school-gamma.vercel.app/biblia">open-school · /biblia</a>.</p>
</header>
<div class="bar">
  <input id="q" placeholder="Buscar sigla, nombre o definición…" autocomplete="off">
  <button id="ball" class="on">Todos (${total})</button>
  <button id="bmine">Solo los míos (${propios.length})</button>
</div>
<main id="list"></main>
<footer>Documento fuente único: open-school/docs/BIBLIA_TERMINOS_DESARROLLO.md · página autónoma, sin dependencias.</footer>
<script>
const DATA = ${JSON.stringify(data)};
const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
let soloMios = false, q = "";
const list = document.getElementById("list");
function render(){
  const base = soloMios ? DATA.propios : DATA.todos;
  const t = norm(q).split(/\\s+/).filter(Boolean);
  const items = !t.length ? base : base.filter(x => {
    const hay = norm(x.abrev + " " + x.nombre + " " + x.significado + " " + (x.categoria||""));
    return t.every(tk => hay.includes(tk));
  });
  if(!items.length){ list.innerHTML = '<p class="empty">Sin resultados.</p>'; return; }
  list.innerHTML = items.map(x => {
    const mine = x.curso === DATA.curso;
    return '<article class="item' + (mine ? ' mine' : '') + '"><div class="top"><code>' + esc(x.abrev) +
      '</code><span class="nom">' + esc(x.nombre) + '</span><span class="chip">' +
      esc(mine ? "de esta plataforma" : (x.categoria || "")) + '</span></div><p class="def">' + esc(x.significado) + '</p></article>';
  }).join("");
}
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
document.getElementById("q").addEventListener("input", e => { q = e.target.value; render(); });
document.getElementById("ball").addEventListener("click", () => { soloMios=false; toggles(); });
document.getElementById("bmine").addEventListener("click", () => { soloMios=true; toggles(); });
function toggles(){ document.getElementById("ball").classList.toggle("on", !soloMios); document.getElementById("bmine").classList.toggle("on", soloMios); render(); }
render();
</script>
</body>
</html>
`;
}

mkdirSync(CENTRAL, { recursive: true });
const hechas = [];
const files = readdirSync(BIBLIA).filter((n) => n.startsWith('plataforma-') && n.endsWith('.json'));
for (const file of files) {
  const curso = file.replace(/^plataforma-/, '').replace(/\.json$/, '');
  const propios = JSON.parse(readFileSync(path.join(BIBLIA, file), 'utf8'));
  const html = pagina(curso, propios, todos.length);

  const dirs = [path.join(CENTRAL, curso)];
  const destinos = Array.isArray(TARGETS[curso])
    ? TARGETS[curso]
    : TARGETS[curso]
      ? [TARGETS[curso]]
      : [];
  for (const t of destinos) {
    if (existsSync(path.dirname(t))) dirs.push(t);
  }

  for (const dir of dirs) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
    writeFileSync(path.join(dir, 'conceptos.json'), JSON.stringify(propios, null, 2), 'utf8');
  }
  hechas.push(`${curso} (${propios.length} propios) -> ${dirs.length} destino(s)`);
}
console.log('conceptos generados:');
for (const h of hechas) console.log('  -', h);
