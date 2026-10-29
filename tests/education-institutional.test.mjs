import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const app = readFileSync('src/App.tsx','utf8');
const hero = readFileSync('src/components/EducationHero.tsx','utf8');
const css = readFileSync('src/education-institutional.css','utf8');
test('institutional hero is rendered without removing the real learning workspace',()=>{
  assert.match(app,/<EducationHero/);
  for(const component of ['<AcademicPlan','<ProfileSelector','<LessonView','<LessonList'])assert.ok(app.includes(component));
  assert.match(app,/id="workspace"/);
  assert.doesNotMatch(app,/📚/);
});
test('route control changes between three deliberate learning paths',()=>{
  assert.match(hero,/setSelected\(id\)/);
  assert.match(hero,/aria-pressed=\{selected === id\}/);
  for(const path of ['fundamentos','lenguas','practica'])assert.ok(hero.includes(path));
  assert.match(hero,/aria-live="polite"/);
});
test('visual CSS includes a responsive and reduced-motion strategy',()=>{
  assert.match(css,/@media\(max-width:820px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /focus-visible/);
});
