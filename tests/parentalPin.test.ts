import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import { test } from 'node:test';
import { configurePin, pinConfigured, pinSupported, verifyPin } from '../src/utils/parentalPin.ts';

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto });
}

test('settings PIN has no factory bypass and never saves plaintext', async () => {
  const stored = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => stored.get(key) ?? null,
      setItem: (key: string, value: string) => { stored.set(key, value); }
    }
  });
  assert.equal(pinSupported(), true);
  assert.equal(pinConfigured(), false);
  assert.equal(await verifyPin('1234'), false);
  assert.equal(await configurePin('1234'), false);
  assert.equal(await configurePin('01234567'), true);
  assert.equal(pinConfigured(), true);
  assert.equal(await verifyPin('01234567'), true);
  assert.equal(await verifyPin('11111111'), false);
  assert.equal(await verifyPin('1234'), false);
  assert.equal(await configurePin('55555555'), false);
  const raw = [...stored.values()].join('');
  assert.equal(raw.includes('01234567'), false);
  const record = JSON.parse(raw) as { salt: string; digest: string; rounds: number };
  assert.equal(record.salt.length, 32);
  assert.equal(record.digest.length, 64);
  assert.ok(record.rounds >= 150000);
});

test('tampered data and unavailable storage fail closed', async () => {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: () => '{"v":1,"salt":"invalid","digest":"invalid","rounds":210000}', setItem: () => {} }
  });
  assert.equal(pinConfigured(), false);
  assert.equal(await verifyPin('01234567'), false);
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    get() { throw new Error('private storage blocked'); }
  });
  assert.equal(pinSupported(), false);
  assert.equal(await configurePin('12345678'), false);
  assert.equal(await verifyPin('12345678'), false);
});
