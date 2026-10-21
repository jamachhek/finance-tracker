// POST /api/reset { email, code, password } — проверить код из письма и задать новый пароль
import { timingSafeEqual } from 'node:crypto';
import { sql } from './_lib/db.js';
import { normalizeEmail, isValidPassword, hashPassword, hashResetCode, sessionCookie } from './_lib/auth.js';
import { send, body, allow, fail } from './_lib/http.js';

const MAX_ATTEMPTS = 5; // столько раз можно ошибиться с одним кодом

export default async function handler(req, res) {
  if (!allow(req, res, ['POST'])) return;
  try {
    const { email: rawEmail, code, password } = body(req);
    const email = normalizeEmail(rawEmail);
    if (!isValidPassword(password)) return send(res, 400, { error: 'weak_password' });
    if (!/^\d{6}$/.test(String(code || ''))) return send(res, 400, { error: 'invalid_code' });

    const [user] = await sql`select id from users where email = ${email}`;
    if (!user) return send(res, 400, { error: 'invalid_code' });

    const [row] = await sql`
      select id, code_hash, attempts, expires_at < now() as expired
      from password_resets
      where user_id = ${user.id} and used_at is null
      order by created_at desc limit 1`;
    if (!row || row.expired) return send(res, 400, { error: 'code_expired' });
    if (row.attempts >= MAX_ATTEMPTS) return send(res, 400, { error: 'too_many_attempts' });

    const expected = Buffer.from(row.code_hash);
    const given = Buffer.from(hashResetCode(String(code)));
    if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
      const [{ attempts }] = await sql`
        update password_resets set attempts = attempts + 1 where id = ${row.id} returning attempts`;
      const left = Math.max(0, MAX_ATTEMPTS - attempts);
      return send(res, 400, { error: left ? 'invalid_code' : 'too_many_attempts', attemptsLeft: left });
    }

    // код верный: он больше не действует, пароль новый, все старые входы на других устройствах сброшены
    await sql`update password_resets set used_at = now() where id = ${row.id}`;
    const [updated] = await sql`
      update users set password_hash = ${hashPassword(password)}, session_version = session_version + 1
      where id = ${user.id} returning session_version`;
    send(res, 200, { user: { email } }, sessionCookie(Number(user.id), Number(updated.session_version)));
  } catch (err) {
    fail(res, err);
  }
}
