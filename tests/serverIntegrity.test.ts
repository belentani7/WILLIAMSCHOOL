import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import express from 'express';

test('SPA fallback route can be registered on Express 5', () => {
  const app = express();
  assert.doesNotThrow(() => app.get('/{*path}', (_req, res) => { res.send('ok'); }));
  const source = readFileSync(new URL('../server.ts', import.meta.url), 'utf8');
  assert.match(source, /app\.get\('\/\{\*path\}'/);
  assert.doesNotMatch(source, /app\.get\('\*'/);
});

test('missing model does not deliver a fake automatically-correct lesson', () => {
  const source = readFileSync(new URL('../server.ts', import.meta.url), 'utf8');
  const begin = source.indexOf('app.post("/api/gemini/generate-lesson"');
  const end = source.indexOf('/* ===================================================================', begin);
  assert.ok(begin > 0 && end > begin);
  const endpoint = source.slice(begin, end);
  assert.match(endpoint, /status\(503\)/);
  assert.match(endpoint, /MODEL_UNAVAILABLE/);
  assert.doesNotMatch(endpoint, /Opción A \(Correcta\)/);
});
