// Пароли и сессии без внешних зависимостей — только встроенный модуль crypto.
import { scryptSync, randomBytes, timingSafeEqual, createHmac } from 'node:crypto';

const COOKIE = 'ft_session';
const MAX_AGE = 60 * 60 * 24 * 30; // сессия живёт 30 дней

/* ---------- Пароли: scrypt с индивидуальной солью ---------- */
export function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`;
}

export function verifyPassword(password, stored) {
  const [scheme, saltB64, hashB64] = String(stored).split('$');
  if (scheme !== 'scrypt' || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, 'base64');
  const actual = scryptSync(password, Buffer.from(saltB64, 'base64'), expected.length);
  return timingSafeEqual(actual, expected);
}

/* ---------- Сессия: подписанная cookie (HttpOnly — недоступна скриптам страницы) ---------- */
function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error('SESSION_SECRET is not set');
  return s;
}

const sign = payload => createHmac('sha256', secret()).update(payload).digest('base64url');

export function sessionCookie(userId) {
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp: Date.now() + MAX_AGE * 1000 })).toString('base64url');
  return `${COOKIE}=${payload}.${sign(payload)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`;
}

export const clearedCookie = () => `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;

/** id пользователя из cookie запроса или null */
export function getUserId(req) {
  const raw = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith(`${COOKIE}=`));
  if (!raw) return null;
  const [payload, sig] = raw.slice(COOKIE.length + 1).split('.');
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { uid, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return Number.isInteger(uid) && exp > Date.now() ? uid : null;
  } catch {
    return null;
  }
}

/* ---------- Проверка ввода ---------- */
export const normalizeEmail = email => String(email || '').trim().toLowerCase();
export const isValidEmail = email => email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPassword = pw => typeof pw === 'string' && pw.length >= 8 && pw.length <= 200;
