#!/usr/bin/env node
/**
 * Valida los JSON reales que alimentan el Campus y EduTube.
 * No inventa datos: solo comprueba coherencia estructural y de recuentos.
 * Uso: node scripts/validate-modules.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const pub = path.resolve(root, '..', 'public', 'modules');

const errors = [];
const check = (cond, msg) => {
  if (!cond) errors.push(msg);
};

// --- EduTube: vídeos verificados ---
const videosPath = path.join(pub, 'edutube', 'videos.json');
const v = JSON.parse(readFileSync(videosPath, 'utf8'));
check(Array.isArray(v.videos), 'videos.json: falta el array "videos"');
check(v.videos?.length === v.count, `videos.json: count (${v.count}) != length (${v.videos?.length})`);
for (const vid of v.videos ?? []) {
  check(typeof vid.id === 'string' && vid.id.length === 11, `video id inválido: ${vid.id}`);
  check(
    vid.embedUrl === `https://www.youtube-nocookie.com/embed/${vid.id}`,
    `embedUrl incoherente para ${vid.id}`
  );
  check(typeof vid.watchUrl === 'string' && vid.watchUrl.includes(vid.id), `watchUrl incoherente para ${vid.id}`);
}

// --- Aprende Brasil: currículum ---
const curPath = path.join(pub, 'aprende-brasil', 'curriculum.json');
const c = JSON.parse(readFileSync(curPath, 'utf8'));
check(Array.isArray(c.modules) && c.modules.length > 0, 'curriculum.json: sin modules');
check(Array.isArray(c.tracks) && c.tracks.length > 0, 'curriculum.json: sin tracks');
const steps = (c.modules ?? []).reduce((n, m) => n + (m.steps?.length ?? 0), 0);
for (const m of c.modules ?? []) {
  check(typeof m.id === 'string' && m.id.length > 0, 'módulo sin id');
  check(Array.isArray(m.steps) && m.steps.length > 0, `módulo ${m.id} sin steps`);
}

// --- Módulos del Campus: cada plataforma con sus conjuntos de datos ---
const MODULE_INDEXES = ['biblia', 'open-school', 'manos-abiertas', 'belentani'];
let moduleDatasets = 0;
let moduleItems = 0;
for (const repo of MODULE_INDEXES) {
  const idxPath = path.join(pub, repo, 'index.json');
  try {
    const idx = JSON.parse(readFileSync(idxPath, 'utf8'));
    check(Array.isArray(idx.datasets) && idx.datasets.length > 0, `${repo}: index.json sin datasets`);
    for (const d of idx.datasets ?? []) {
      const val = JSON.parse(readFileSync(path.join(pub, repo, d.file), 'utf8'));
      const n = Array.isArray(val) ? val.length : Object.keys(val).length;
      check(n === d.count, `${repo}/${d.file}: count declarado ${d.count} != real ${n}`);
      moduleDatasets += 1;
      moduleItems += n;
    }
  } catch (e) {
    check(false, `${repo}: index.json ilegible (${e.message})`);
  }
}

if (errors.length) {
  console.error(`validate-modules: ${errors.length} problema(s)`);
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}

console.log(
  `validate-modules OK — ${v.videos.length} vídeos, ${c.modules.length} módulos, ` +
    `${steps} pasos, ${c.tracks.length} trilhas, ${moduleDatasets} conjuntos de plataforma (${moduleItems} registros).`
);
