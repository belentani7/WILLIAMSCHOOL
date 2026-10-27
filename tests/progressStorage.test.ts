import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ProgressStorage } from '../src/utils/progress/storage.ts';

function mockStorage(options: { blockRead?: boolean; blockWrite?: boolean } = {}) {
  const data = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem(key: string) {
        if (options.blockRead) throw new Error('SecurityError');
        return data.get(key) ?? null;
      },
      setItem(key: string, value: string) {
        if (options.blockWrite) throw new Error('QuotaExceededError');
        data.set(key, value);
      },
    },
  });
  return data;
}

test('blocked writes preserve progress for the current session and report non-persistence', () => {
  mockStorage({ blockWrite: true });
  const profileId = 'session-quota';
  const progress = { ...ProgressStorage.createDefaultProgress(profileId), completedLessons: ['math-numbers'] };
  assert.equal(ProgressStorage.saveProfileProgress(profileId, progress), false);
  assert.deepEqual(ProgressStorage.getProfileProgress(profileId).completedLessons, ['math-numbers']);
  assert.ok(ProgressStorage.listProfileIds().includes(profileId));
});

test('unavailable localStorage reads and writes do not break lesson completion', () => {
  mockStorage({ blockRead: true, blockWrite: true });
  const profileId = 'session-private';
  assert.equal(ProgressStorage.saveProfileProgress(profileId, {
    ...ProgressStorage.createDefaultProgress(profileId),
    completedLessons: ['language-reading'],
  }), false);
  assert.deepEqual(ProgressStorage.getProfileProgress(profileId).completedLessons, ['language-reading']);
});

test('successful writes persist without retaining a session-only override', () => {
  const data = mockStorage();
  const profileId = 'persisted-ok';
  const progress = { ...ProgressStorage.createDefaultProgress(profileId), completedLessons: ['math-numbers', 'math-numbers'] };
  assert.equal(ProgressStorage.saveProfileProgress(profileId, progress), true);
  assert.deepEqual(ProgressStorage.getProfileProgress(profileId).completedLessons, ['math-numbers']);
  assert.ok(ProgressStorage.listProfileIds().includes(profileId));
  assert.equal(JSON.parse(data.get(ProgressStorage.STORAGE_KEY)!).profiles[profileId].completedLessons.length, 1);
});

test('temporary storage quota failure can recover and persist the newest progress', () => {
  const data = mockStorage({ blockWrite: true });
  const profileId = 'session-recovery';
  assert.equal(ProgressStorage.saveProfileProgress(profileId, {
    ...ProgressStorage.createDefaultProgress(profileId), completedLessons: ['math-numbers'],
  }), false);
  const writable = mockStorage();
  assert.equal(ProgressStorage.saveProfileProgress(profileId, {
    ...ProgressStorage.getProfileProgress(profileId), completedLessons: ['math-numbers', 'math-problems'],
  }), true);
  assert.deepEqual(JSON.parse(writable.get(ProgressStorage.STORAGE_KEY)!).profiles[profileId].completedLessons, ['math-numbers', 'math-problems']);
  assert.equal(data.size, 0);
});

test('blocked reads never overwrite other profiles with an empty document', () => {
  const data = mockStorage({ blockRead: true });
  const profileId = 'session-read-blocked';
  assert.equal(ProgressStorage.saveProfileProgress(profileId, {
    ...ProgressStorage.createDefaultProgress(profileId), completedLessons: ['math-numbers'],
  }), false);
  assert.equal(data.has(ProgressStorage.STORAGE_KEY), false);
  assert.deepEqual(ProgressStorage.getProfileProgress(profileId).completedLessons, ['math-numbers']);
});
