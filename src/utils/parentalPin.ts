/**
 * Voluntary, device-local PIN for settings. Not a security boundary against a
 * person who controls the browser, filesystem, or developer tools.
 *
 * No default PIN, plaintext PIN, network request or silent fallback.
 * A separate authenticated backend is required for enforceable parental access.
 */
const KEY = 'williamschool:settings-pin:v1';
const ROUNDS = 210_000;
type PinRecord = { v: 1; salt: string; digest: string; rounds: number };

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}
function fromHex(value: string): Uint8Array | null {
  if (!/^(?:[0-9a-f]{2})+$/.test(value)) return null;
  const bytes = new Uint8Array(value.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(value.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}
function readRecord(): PinRecord | null {
  try {
    const raw = localStorage.getItem(KEY);
    // This record is a small verifier (< 200 bytes). Never parse a huge
    // value planted through developer tools or browser extensions.
    if (!raw || raw.length > 1024) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return null;
    const p = value as Partial<PinRecord>;
    if (p.v !== 1 || p.rounds !== ROUNDS || typeof p.salt !== 'string' ||
        typeof p.digest !== 'string' || p.salt.length !== 32 || p.digest.length !== 64 ||
        !fromHex(p.salt) || !fromHex(p.digest)) return null;
    return p as PinRecord;
  } catch {
    return null;
  }
}
function cryptoAvailable(): boolean {
  return typeof crypto !== 'undefined' && !!crypto.subtle && typeof crypto.getRandomValues === 'function';
}
async function digest(pin: string, salt: Uint8Array, rounds: number): Promise<string> {
  const secret = await crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveBits']);
  const bytes = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: new Uint8Array(salt), iterations: rounds },
    secret,
    256
  );
  return toHex(new Uint8Array(bytes));
}
export function pinConfigured(): boolean {
  return readRecord() !== null;
}
export function pinSupported(): boolean {
  try { localStorage.getItem(KEY); return cryptoAvailable(); } catch { return false; }
}
export async function configurePin(pin: string): Promise<boolean> {
  if (!/^\d{6,12}$/.test(pin) || !pinSupported() || pinConfigured()) return false;
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const record: PinRecord = { v: 1, salt: toHex(salt), digest: await digest(pin, salt, ROUNDS), rounds: ROUNDS };
  try {
    localStorage.setItem(KEY, JSON.stringify(record));
    return pinConfigured();
  } catch {
    return false;
  }
}
export async function verifyPin(pin: string): Promise<boolean> {
  const record = readRecord();
  if (!record || !/^\d{6,12}$/.test(pin) || !cryptoAvailable()) return false;
  const salt = fromHex(record.salt);
  if (!salt) return false;
  const computed = await digest(pin, salt, record.rounds);
  // Compare without early return. This does not turn a client-side PIN into a
  // genuine security boundary, but avoids leaking matching prefix length.
  let difference = 0;
  for (let i = 0; i < computed.length; i++) difference |= computed.charCodeAt(i) ^ record.digest.charCodeAt(i);
  return difference === 0;
}
