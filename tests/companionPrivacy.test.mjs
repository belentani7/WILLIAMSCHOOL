import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareRemoteCompanionRequest, LOCAL_PRIVACY_REPLY, REMOTE_PRIVACY_LABEL } from '../src/utils/companionPrivacy.ts';

test('remote request is impossible without explicit consent', () => {
  assert.equal(prepareRemoteCompanionRequest(false, 'personal text', 'pt', 'academic', []), null);
});
test('rejects blank or oversized remote messages', () => {
  assert.equal(prepareRemoteCompanionRequest(true, '   ', 'pt', 'academic', []), null);
  assert.equal(prepareRemoteCompanionRequest(true, 'x'.repeat(2001), 'pt', 'academic', []), null);
});
test('trims message, limits history and never mutates previous messages', () => {
  const entries = Array.from({ length: 12 }, (_, i) => ({ sender: i % 2 ? 'companion' : 'user', text: 'z'.repeat(2005) }));
  const request = prepareRemoteCompanionRequest(true, '  hello  ', 'en', 'office', entries);
  assert.equal(request.message, 'hello');
  assert.equal(request.history.length, 8);
  assert.ok(request.history.every(item => item.text.length === 2000));
  assert.equal(entries[0].text.length, 2005);
  assert.equal(request.history[0].sender, entries[4].sender);
});
test('local fallback and disclosure exist in all supported languages', () => {
  for (const lang of ['pt', 'es', 'ca', 'en']) {
    assert.ok(LOCAL_PRIVACY_REPLY[lang].length > 50);
    assert.ok(REMOTE_PRIVACY_LABEL[lang].length > 70);
  }
});
