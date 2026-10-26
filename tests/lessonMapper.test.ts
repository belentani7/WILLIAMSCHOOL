import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  getCompletedLessonsBySubject,
  getNextAvailableLesson,
  getSubjectProgress,
  isLessonAvailable,
  lessonMap,
} from '../src/utils/progress/lessonMapper.ts';

test('curriculum has unique, stable lesson identifiers', () => {
  const lessons = Object.values(lessonMap);
  assert.ok(lessons.length >= 5, 'curriculum should provide a meaningful starter set');
  assert.equal(new Set(lessons.map((lesson) => lesson.id)).size, lessons.length);
  for (const lesson of lessons) {
    assert.ok(lesson.title.trim().length > 0);
    assert.ok(lesson.description.trim().length > 0);
    assert.ok(lesson.estimatedTime > 0);
    for (const prerequisite of lesson.prerequisites) {
      assert.ok(lessonMap[prerequisite], `missing prerequisite ${prerequisite} for ${lesson.id}`);
    }
  }
});

test('prerequisites gate advanced lessons and unknown identifiers safely', () => {
  assert.equal(isLessonAvailable('math-problems', []), false);
  assert.equal(isLessonAvailable('math-problems', ['math-numbers']), true);
  assert.equal(isLessonAvailable('math-problems', ['math-problems', 'math-numbers']), false);
  assert.equal(isLessonAvailable('not-a-lesson', []), false);
});

test('recommended lesson advances when prerequisites are completed', () => {
  assert.equal(getNextAvailableLesson([])?.id, 'math-numbers');
  assert.equal(getNextAvailableLesson(['math-numbers'])?.id, 'language-reading');
  assert.equal(getNextAvailableLesson(Object.keys(lessonMap)), null);
});

test('subject progress counts known lessons only and remains consistent', () => {
  const progress = getSubjectProgress(['math-numbers', 'math-problems', 'unknown']);
  assert.deepEqual(progress['Matemáticas'], { completed: 2, total: 2 });
  assert.deepEqual(getCompletedLessonsBySubject(['math-numbers', 'unknown', 'math-problems'], 'Matemáticas'), [
    'math-numbers',
    'math-problems',
  ]);
  const totalKnown = Object.values(progress).reduce((sum, subject) => sum + subject.total, 0);
  assert.equal(totalKnown, Object.keys(lessonMap).length);
});
