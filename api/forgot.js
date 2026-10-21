// POST /api/forgot { email, lang } — отправить на почту код для смены пароля
import { sql } from './_lib/db.js';
import { normalizeEmail, isValidEmail, newResetCode, hashResetCode } from './_lib/auth.js';
import { mailConfigured, sendResetCode } from './_lib/mail.js';
import { send, body, allow, fail } from './_lib/http.js';

const MAX_PER_HOUR = 3; // не больше 3 кодов на почту в час

export default async function handler(req, res) {
  if (!allow(req, res, ['POST'])) return;
  try {
    const { email: rawEmail, lang } = body(req);
    const email = normalizeEmail(rawEmail);
    if (!isValidEmail(email)) return send(res, 400, { error: 'invalid_email' });
    if (!mailConfigured()) return send(res, 503, { error: 'mail_not_configured' });

    const [user] = await sql`select id from users where email = ${email}`;
    // одинаковый ответ, есть такой аккаунт или нет, — не подсказываем, какие почты зарегистрированы
    if (!user) return send(res, 200, { ok: true });

    const [{ n }] = await sql`
      select count(*)::int as n from password_resets
      where user_id = ${user.id} and created_at > now() - interval '1 hour'`;
    if (n >= MAX_PER_HOUR) return send(res, 429, { error: 'too_many_requests' });

    // прежние коды больше не действуют — работает только последний
    await sql`update password_resets set used_at = now() where user_id = ${user.id} and used_at is null`;
    const code = newResetCode();
    await sql`
      insert into password_resets (user_id, code_hash, expires_at)
      values (${user.id}, ${hashResetCode(code)}, now() + interval '15 minutes')`;

    await sendResetCode(email, code, lang === 'uz' ? 'uz' : 'ru');
    send(res, 200, { ok: true });
  } catch (err) {
    fail(res, err);
  }
}
