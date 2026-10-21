// GET /api/data — данные пользователя (операции, категории, настройки)
// PUT /api/data { data } — сохранить их
import { sql } from './_lib/db.js';
import { getUserId } from './_lib/auth.js';
import { send, body, allow, fail } from './_lib/http.js';

const MAX_BYTES = 2_000_000; // ~2 МБ на пользователя — это десятки тысяч операций

export default async function handler(req, res) {
  if (!allow(req, res, ['GET', 'PUT'])) return;
  try {
    const uid = getUserId(req);
    if (!uid) return send(res, 401, { error: 'unauthorized' });

    if (req.method === 'GET') {
      const [row] = await sql`select data, updated_at from user_data where user_id = ${uid}`;
      return send(res, 200, { data: row ? row.data : null, updatedAt: row ? row.updated_at : null });
    }

    const { data } = body(req);
    if (!data || typeof data !== 'object' || !Array.isArray(data.transactions) || !Array.isArray(data.categories)) {
      return send(res, 400, { error: 'invalid_data' });
    }
    const json = JSON.stringify(data);
    if (json.length > MAX_BYTES) return send(res, 413, { error: 'too_large' });

    const [row] = await sql`
      insert into user_data (user_id, data, updated_at)
      values (${uid}, ${json}::jsonb, now())
      on conflict (user_id) do update set data = excluded.data, updated_at = now()
      returning updated_at`;
    send(res, 200, { ok: true, updatedAt: row.updated_at });
  } catch (err) {
    fail(res, err);
  }
}
