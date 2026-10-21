// POST /api/register { email, password } — создать аккаунт и сразу войти
import { sql } from './_lib/db.js';
import { hashPassword, sessionCookie, normalizeEmail, isValidEmail, isValidPassword } from './_lib/auth.js';
import { send, body, allow, fail } from './_lib/http.js';

export default async function handler(req, res) {
  if (!allow(req, res, ['POST'])) return;
  try {
    const { email: rawEmail, password } = body(req);
    const email = normalizeEmail(rawEmail);
    if (!isValidEmail(email)) return send(res, 400, { error: 'invalid_email' });
    if (!isValidPassword(password)) return send(res, 400, { error: 'weak_password' });

    const rows = await sql`
      insert into users (email, password_hash)
      values (${email}, ${hashPassword(password)})
      on conflict (email) do nothing
      returning id`;
    if (!rows.length) return send(res, 409, { error: 'email_taken' });

    send(res, 201, { user: { email } }, sessionCookie(rows[0].id));
  } catch (err) {
    fail(res, err);
  }
}
