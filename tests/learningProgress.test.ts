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
