// POST /api/delete-account { password } — навсегда удалить аккаунт и все его данные
// Пароль спрашивается ещё раз: случайный клик или чужой человек за вашим компьютером аккаунт не удалит.
import { sql } from './_lib/db.js';
import { requireUser, verifyPassword, clearedCookie } from './_lib/auth.js';
import { send, body, allow, fail } from './_lib/http.js';

export default async function handler(req, res) {
  if (!allow(req, res, ['POST'])) return;
  try {
    const user = await requireUser(req, sql);
    if (!user) return send(res, 401, { error: 'unauthorized' });

    const { password } = body(req);
    const [row] = await sql`select password_hash from users where id = ${user.id}`;
    if (!row || typeof password !== 'string' || !verifyPassword(password, row.password_hash)) {
      return send(res, 403, { error: 'wrong_password' });
    }

    // операции (user_data) и коды восстановления (password_resets) удаляются вместе с аккаунтом — on delete cascade
    await sql`delete from users where id = ${user.id}`;
    send(res, 200, { ok: true }, clearedCookie());
  } catch (err) {
    fail(res, err);
  }
}
