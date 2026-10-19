#!/usr/bin/env -S npx tsx
/**
 * fix-manos-abiertas.mts — corrige el index.json de manos-abiertas para incluir los datasets reales.
 */
import { mkdirSync, writeFileSync, readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const W = path.resolve(here, '..');
const PLAT = path.resolve(W, '..');
const OUT = path.join(W, 'public', 'modules', 'manos-abiertas');

type Dataset = { id: string; label: string; kind: 'array' | 'object'; count: number; file: string };

const prettify = (k: string) =>
  k
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());

const countOf = (v: unknown) =>
  Array.isArray(v) ? v.length : v && typeof v === 'object' ? Object.keys(v).length : 0;

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

const REPOS: { repo: string; json: { src: string; id: string; label: string }[] }[] = [
  {
    repo: 'manos-abiertas',
    json: [
      { src: 'academicData__ACADEMIC_COURSES.json', id: 'academicData__ACADEMIC_COURSES', label: 'ACADEMIC COURSES' },
      { src: 'aiCurriculumData__AI_LESSONS.json', id: 'aiCurriculumData__AI_LESSONS', label: 'AI LESSONS' },
      { src: 'aiCurriculumData__AI_MODULES_OVERVIEW.json', id: 'aiCurriculumData__AI_MODULES_OVERVIEW', label: 'AI MODULES OVERVIEW' },
      { src: 'careerData__CAREER_TRACKS.json', id: 'careerData__CAREER_TRACKS', label: 'CAREER TRACKS' },
      { src: 'communityData__ASSOCIATIONS_DIRECTORY.json', id: 'communityData__ASSOCIATIONS_DIRECTORY', label: 'ASSOCIATIONS DIRECTORY' },
      { src: 'communityData__COMMUNITY_EVENTS.json', id: 'communityData__COMMUNITY_EVENTS', label: 'COMMUNITY EVENTS' },
      { src: 'deleExamData__DELE_LEVELS.json', id: 'deleExamData__DELE_LEVELS', label: 'DELE LEVELS' },
      { src: 'deleExamData__DELE_QUESTIONS_A2.json', id: 'deleExamData__DELE_QUESTIONS_A2', label: 'DELE QUESTIONS A2' },
      { src: 'educationData__EDUCATION_AREAS.json', id: 'educationData__EDUCATION_AREAS', label: 'EDUCATION AREAS' },
      { src: 'educationData__EDUCATION_COURSES.json', id: 'educationData__EDUCATION_COURSES', label: 'EDUCATION COURSES' },
      { src: 'financeHousingData__FINANCIAL_GUIDES.json', id: 'financeHousingData__FINANCIAL_GUIDES', label: 'FINANCIAL GUIDES' },
      { src: 'financeHousingData__HOUSING_GUIDES.json', id: 'financeHousingData__HOUSING_GUIDES', label: 'HOUSING GUIDES' },
      { src: 'helpData__EMERGENCY_CONTACTS.json', id: 'helpData__EMERGENCY_CONTACTS', label: 'EMERGENCY CONTACTS' },
      { src: 'helpData__HELP_FAQS.json', id: 'helpData__HELP_FAQS', label: 'HELP FAQS' },
      { src: 'legalRightsData__LEGAL_ARTICLES.json', id: 'legalRightsData__LEGAL_ARTICLES', label: 'LEGAL ARTICLES' },
      { src: 'nodesMetadata__NODES_LIST.json', id: 'nodesMetadata__NODES_LIST', label: 'NODES LIST' },
      { src: 'officeData__OFFICE_MODULES.json', id: 'officeData__OFFICE_MODULES', label: 'OFFICE_MODULES' },
      { src: 'resourcesData__RESOURCES_LIST.json', id: 'resourcesData__RESOURCES_LIST', label: 'RESOURCES LIST' },
    ],
  },
];

mkdirSync(OUT, { recursive: true });

for (const job of REPOS) {
  const outDir = path.join(OUT);
  mkdirSync(outDir, { recursive: true });
  const written: Dataset[] = [];
  const skipped: string[] = [];

  for (const j of job.json) {
    const abs = path.join(OUT, j.src);
    if (existsSync(abs)) datasetFromJson(abs, outDir, j.id, j.label, written, skipped);
    else skipped.push(`${j.src} (no existe)`);
  }

  writeFileSync(
    path.join(outDir, 'index.json'),
    JSON.stringify({ repo: job.repo, generatedAt: new Date().toISOString(), datasets: written, skipped }, null, 2)
  );

  const total = written.reduce((n, d) => n + d.count, 0);
  console.log(`${job.repo}: ${written.length} datasets, ${total} items${skipped.length ? `, ${skipped.length} avisos` : ''}`);
  for (const s of skipped) console.log(`   - skip: ${s}`);
}
