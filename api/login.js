// POST /api/login { email, password } — вход в аккаунт
import { sql } from './_lib/db.js';
import { verifyPassword, sessionCookie, normalizeEmail } from './_lib/auth.js';
import { send, body, allow, fail } from './_lib/http.js';

export default async function handler(req, res) {
  if (!allow(req, res, ['POST'])) return;
  try {
    const { email: rawEmail, password } = body(req);
    const email = normalizeEmail(rawEmail);
    const [user] = await sql`select id, password_hash, session_version from users where email = ${email}`;
    // одинаковый ответ для «нет такой почты» и «неверный пароль» — не подсказываем, какие почты зарегистрированы
    if (!user || typeof password !== 'string' || !verifyPassword(password, user.password_hash)) {
      return send(res, 401, { error: 'invalid_credentials' });
    }
    send(res, 200, { user: { email } }, sessionCookie(Number(user.id), Number(user.session_version)));
  } catch (err) {
    fail(res, err);
  }
}
