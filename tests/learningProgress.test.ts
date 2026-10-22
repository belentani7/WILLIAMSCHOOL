import assert from 'node:assert/strict';
import { test } from 'node:test';
import { completeLesson, createLearner, lessonKey, loadLearningProgress, saveLearningProgress } from '../src/utils/learningProgress.ts';

test('independent learners retain only their own completed lessons after a reload', () => {
  const stored = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: (key: string) => stored.get(key) ?? null,
    setItem: (key: string, value: string) => stored.set(key, value),
  } });
  const first = loadLearningProgress();
  const key = lessonKey('mates', 'intro');
  const completed = completeLesson(completeLesson(first, key), key);
  const second = createLearner(completed, 'Otra persona');
  assert.deepEqual(second.profiles[0].completed, [key]);
  assert.deepEqual(second.profiles[1].completed, []);
  assert.notEqual(second.profiles[0].id, second.profiles[1].id);
  saveLearningProgress(second);
  assert.deepEqual(loadLearningProgress(), second);
  const secondCompleted = completeLesson(second, lessonKey('lengua', 'intro'));
  assert.deepEqual(secondCompleted.profiles[0].completed, [key]);
  assert.deepEqual(secondCompleted.profiles[1].completed, ['lengua:intro']);
  assert.deepEqual(first.profiles[0].completed, []);
});

test('damaged or unavailable storage still starts an empty study session', () => {
  for (const raw of ['not json', '{"profiles":[]}', '{"profiles":[null]}']) {
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
      getItem: () => raw, setItem: () => { throw new Error('quota'); },
    } });
    const progress = loadLearningProgress();
    assert.equal(progress.profiles.length, 1);
    assert.deepEqual(progress.profiles[0].completed, []);
    assert.doesNotThrow(() => saveLearningProgress(progress));
  }
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('blocked'); } });
  assert.deepEqual(loadLearningProgress().profiles[0].completed, []);
});

test('browser storage rejects oversized, cross-profile and malformed lesson entries', () => {
  const store = new Map<string,string>();
  const storage = { getItem: (key: string) => store.get(key) ?? null,
                    setItem: (key: string, value: string) => store.set(key, value) };
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: storage });
  const key = 'belentani-school:learning-progress:v1';
  const seed = loadLearningProgress();
  const profile = seed.profiles[0];
  const malformed = [
    { ...seed, profiles: [{ ...profile, completed: ['valid', null] }] },
    { ...seed, profiles: [{ ...profile, completed: ['x'.repeat(181)] }] },
    { ...seed, profiles: [{ ...profile, name: '' }] },
    { ...seed, profiles: Array.from({ length: 9 }, (_, i) => ({
      id: String(i), name: 'Learner', completed: [],
    })) },
    { ...seed, profiles: [profile, profile] },
  ];
  for (const payload of malformed) {
    store.set(key, JSON.stringify(payload));
    const result = loadLearningProgress();
    assert.equal(result.profiles.length, 1);
    assert.deepEqual(result.profiles[0].completed, []);
  }
  store.set(key, ' '.repeat(256_001));
  assert.deepEqual(loadLearningProgress().profiles[0].completed, []);
});

test('deduplicates valid lessons and bounds profile creation', () => {
  const first = loadLearningProgress();
  const key = 'belentani-school:learning-progress:v1';
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: (candidate: string) => candidate === key ? JSON.stringify({
      ...first, profiles: [{ ...first.profiles[0], completed: ['math:a', 'math:a'] }],
    }) : null,
    setItem: () => {},
  } });
  assert.deepEqual(loadLearningProgress().profiles[0].completed, ['math:a']);
  let current = first;
  for (let i = 0; i < 7; i++) current = createLearner(current, 'Perfil '+i);
  assert.equal(current.profiles.length, 8);
  assert.throws(() => createLearner(current, 'Noveno'), RangeError);
  assert.throws(() => createLearner(first, '  '), RangeError);
  assert.throws(() => completeLesson(first, 'x'.repeat(181)), RangeError);
});
