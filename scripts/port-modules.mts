#!/usr/bin/env -S npx tsx
/**
 * port-modules.mts — unifica el contenido real de los otros repos en el Campus.
 *
 * NO inventa nada:
 *  - Importa cada export real de los ficheros de datos (.ts) y lo serializa a JSON.
 *  - Copia los JSON que ya existen (open-data, quiz).
 *  - Convierte las cápsulas .md de open-school a JSON.
 *
 * Uso (desde WILLIAMSCHOOL):  npx tsx scripts/port-modules.mts
 */
import { mkdirSync, writeFileSync, readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const W = path.resolve(here, '..');
const PLAT = path.resolve(W, '..');
const OUT = path.join(W, 'public', 'modules');

type Dataset = { id: string; label: string; kind: 'array' | 'object'; count: number; file: string };

const prettify = (k: string) =>
  k
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());

const countOf = (v: unknown) =>
  Array.isArray(v) ? v.length : v && typeof v === 'object' ? Object.keys(v).length : 0;

/** Importa un .ts y devuelve sus datasets serializables. */
async function datasetsFromTs(absFile: string, outDir: string, written: Dataset[], skipped: string[]) {
  try {
    const ns = await import(pathToFileURL(absFile).href);
    const base = path.basename(absFile).replace(/\.ts$/, '');
    for (const [key, val] of Object.entries(ns)) {
      if (val == null || typeof val !== 'object') continue;
      let json: string;
      try {
        json = JSON.stringify(val);
      } catch {
        skipped.push(`${base} :: ${key} (no serializable)`);
        continue;
      }
      const id = `${base}__${key}`;
      writeFileSync(path.join(outDir, `${id}.json`), json);
      written.push({
        id,
        label: prettify(key),
        kind: Array.isArray(val) ? 'array' : 'object',
        count: countOf(val),
        file: `${id}.json`,
      });
    }
  } catch (e) {
    skipped.push(`${path.basename(absFile)} (${(e as Error)?.message ?? e})`);
  }
}

/** Copia un JSON ya existente y lo registra como dataset. */
function datasetFromJson(absJson: string, outDir: string, id: string, label: string, written: Dataset[], skipped: string[]) {
  try {
    const raw = readFileSync(absJson, 'utf8');
    const val = JSON.parse(raw);
    writeFileSync(path.join(outDir, `${id}.json`), JSON.stringify(val));
    written.push({ id, label, kind: Array.isArray(val) ? 'array' : 'object', count: countOf(val), file: `${id}.json` });
  } catch (e) {
    skipped.push(`${id} (${(e as Error)?.message ?? e})`);
  }
}

const REPOS: { repo: string; ts: string[]; json: { src: string; id: string; label: string }[]; capsules?: string; quiz?: string }[] = [
  {
    repo: 'open-school',
    ts: [
      'open-school/client/src/lib/catalog.ts',
      'open-school/client/src/lib/biblia.ts',
    ],
    json: [
      { src: 'open-school/open-data/topics.json', id: 'open-data__topics', label: 'Open Data · Temas' },
      { src: 'open-school/open-data/data/ciencia-y-actualidad.json', id: 'open-data__ciencia', label: 'Open Data · Ciencia y actualidad' },
      { src: 'open-school/open-data/data/datos-educativos.json', id: 'open-data__datos', label: 'Open Data · Datos educativos' },
      { src: 'open-school/open-data/data/investigacion-escolar.json', id: 'open-data__investigacion', label: 'Open Data · Investigación escolar' },
      { src: 'open-school/open-data/data/lecturas-obligatorias.json', id: 'open-data__lecturas', label: 'Open Data · Lecturas' },
      { src: 'open-school/open-data/data/libros-libres.json', id: 'open-data__libros', label: 'Open Data · Libros libres' },
      { src: 'open-school/open-data/data/textos-por-asignatura.json', id: 'open-data__textos', label: 'Open Data · Textos por asignatura' },
    ],
    capsules: 'open-school/campus/capsulas',
    quiz: 'open-school/campus/cursos/ciberseguridad-5-anios/quiz.json',
  },
  {
    repo: 'manos-abiertas',
    ts: [
      'Myopenhands/src/data/aiCurriculumData.ts',
      'Myopenhands/src/data/nodesMetadata.ts',
      'Myopenhands/src/data/educationData.ts',
      'Myopenhands/src/data/officeData.ts',
      'Myopenhands/src/data/academicData.ts',
      'Myopenhands/src/data/careerData.ts',
      'Myopenhands/src/data/legalRightsData.ts',
      'Myopenhands/src/data/financeHousingData.ts',
      'Myopenhands/src/data/resourcesData.ts',
      'Myopenhands/src/data/helpData.ts',
      'Myopenhands/src/data/communityData.ts',
      'Myopenhands/src/data/deleExamData.ts',
    ],
    json: [],
  },
  {
    repo: 'belentani',
    ts: [
      'belentani-school-unificado/src/data/curriculumData.ts',
      'belentani-school-unificado/src/data/classes365Days.ts',
      'belentani-school-unificado/src/data/omegaCourseraPythonHub.ts',
      'belentani-school-unificado/src/data/miniGames500Data.ts',
    ],
    json: [
      { src: 'WILLIAMSCHOOL/open-data/topics.json', id: 'open-data__topics', label: 'Open Data · Temas' },
      { src: 'WILLIAMSCHOOL/open-data/data/ciencia-natural.json', id: 'open-data__ciencia', label: 'Open Data · Ciencia natural' },
      { src: 'WILLIAMSCHOOL/open-data/data/datos-del-mundo.json', id: 'open-data__mundo', label: 'Open Data · Datos del mundo' },
      { src: 'WILLIAMSCHOOL/open-data/data/lecturas-obligatorias.json', id: 'open-data__lecturas', label: 'Open Data · Lecturas' },
      { src: 'WILLIAMSCHOOL/open-data/data/refuerzo-idiomas.json', id: 'open-data__idiomas', label: 'Open Data · Refuerzo idiomas' },
      { src: 'WILLIAMSCHOOL/open-data/data/textos-por-asignatura.json', id: 'open-data__textos', label: 'Open Data · Textos por asignatura' },
      { src: 'WILLIAMSCHOOL/open-data/data/tutorias-y-cultura.json', id: 'open-data__tutorias', label: 'Open Data · Tutorías y cultura' },
    ],
  },
];

mkdirSync(OUT, { recursive: true });

for (const job of REPOS) {
  const outDir = path.join(OUT, job.repo);
  mkdirSync(outDir, { recursive: true });
  const written: Dataset[] = [];
  const skipped: string[] = [];

  for (const rel of job.ts) {
    const abs = path.join(PLAT, rel);
    if (existsSync(abs)) await datasetsFromTs(abs, outDir, written, skipped);
    else skipped.push(`${rel} (no existe)`);
  }
  for (const j of job.json) {
    const abs = path.join(PLAT, j.src);
    if (existsSync(abs)) datasetFromJson(abs, outDir, j.id, j.label, written, skipped);
    else skipped.push(`${j.src} (no existe)`);
  }

  // Cápsulas .md -> JSON
  if (job.capsules) {
    const dir = path.join(PLAT, job.capsules);
    if (existsSync(dir)) {
      const items = readdirSync(dir)
        .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
        .sort()
        .map((f) => ({
          fecha: f.replace(/\.md$/, ''),
          texto: readFileSync(path.join(dir, f), 'utf8').trim(),
        }));
      writeFileSync(path.join(outDir, 'capsulas.json'), JSON.stringify(items));
      written.push({ id: 'capsulas', label: 'Cápsulas diarias', kind: 'array', count: items.length, file: 'capsulas.json' });
    }
  }

  // Quiz de curso -> JSON
  if (job.quiz) {
    const abs = path.join(PLAT, job.quiz);
    if (existsSync(abs)) {
      const val = JSON.parse(readFileSync(abs, 'utf8'));
      writeFileSync(path.join(outDir, 'quiz-ciberseguridad.json'), JSON.stringify(val));
      written.push({ id: 'quiz-ciberseguridad', label: 'Quiz · Ciberseguridad', kind: Array.isArray(val) ? 'array' : 'object', count: countOf(val), file: 'quiz-ciberseguridad.json' });
    }
  }

  writeFileSync(
    path.join(outDir, 'index.json'),
    JSON.stringify({ repo: job.repo, generatedAt: new Date().toISOString(), datasets: written, skipped }, null, 2)
  );

  const total = written.reduce((n, d) => n + d.count, 0);
  console.log(`${job.repo}: ${written.length} datasets, ${total} items${skipped.length ? `, ${skipped.length} avisos` : ''}`);
  for (const s of skipped) console.log(`   - skip: ${s}`);
}
