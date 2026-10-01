#!/usr/bin/env tsx
/**
 * export-biblia.mts — publica la Biblia de open-school dentro del Campus.
 *
 * Fuente única: open-school/client/src/lib/biblia.ts, que a su vez se genera
 * desde docs/BIBLIA_TERMINOS_DESARROLLO.md. Aquí NO se reescribe nada: se
 * importa el módulo real y se serializa, para que cada plataforma tenga sus
 * conceptos propios (mapa CURSO) además del glosario completo.
 *
 * Uso (desde WILLIAMSCHOOL):  npx tsx scripts/export-biblia.mts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const W = path.resolve(here, '..');
const PLAT = path.resolve(W, '..');
const OUT = path.join(W, 'public', 'modules', 'biblia');
const SRC = path.join(PLAT, 'open-school', 'client', 'src', 'lib', 'biblia.ts');

type Term = { abrev: string; nombre: string; significado: string; curso?: string; categoria: string };

const mod = (await import(pathToFileURL(SRC).href)) as {
  TODOS: Term[];
  CURSO: Record<string, string>;
  CATEGORIAS: { id: string }[];
  BIBLIA_TOTAL: number;
};

mkdirSync(OUT, { recursive: true });

const datasets: { id: string; label: string; kind: 'array'; count: number; file: string }[] = [];

function write(id: string, label: string, arr: unknown[]) {
  writeFileSync(path.join(OUT, `${id}.json`), JSON.stringify(arr));
  datasets.push({ id, label, kind: 'array', count: arr.length, file: `${id}.json` });
}

// Glosario completo (universal).
write('todos', `Todos los términos (${mod.BIBLIA_TOTAL})`, mod.TODOS);

// Los conceptos propios de cada plataforma: en el original, cada término
// lleva un campo `curso` (id de ruta). Se agrupan por ese campo.
const cursos = [
  ...new Set(mod.TODOS.map((t) => t.curso).filter((c): c is string => Boolean(c))),
].sort();
for (const curso of cursos) {
  const propios = mod.TODOS.filter((t) => t.curso === curso);
  write(`plataforma-${curso}`, `Conceptos de ${curso}`, propios);
}

writeFileSync(
  path.join(OUT, 'index.json'),
  JSON.stringify(
    {
      repo: 'biblia',
      source: 'open-school/docs/BIBLIA_TERMINOS_DESARROLLO.md -> client/src/lib/biblia.ts',
      generatedAt: new Date().toISOString(),
      total: mod.BIBLIA_TOTAL,
      categorias: mod.CATEGORIAS.length,
      datasets,
      skipped: [],
    },
    null,
    2
  )
);

const totalPropios = datasets
  .filter((d) => d.id.startsWith('plataforma-'))
  .reduce((n, d) => n + d.count, 0);

console.log(`biblia: ${mod.BIBLIA_TOTAL} términos, ${datasets.length} conjuntos`);
console.log(`plataformas con conceptos propios: ${datasets.filter((d) => d.id.startsWith('plataforma-')).length} (${totalPropios} enlaces término-plataforma)`);
