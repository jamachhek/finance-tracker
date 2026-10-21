// GET /api/me — кто вошёл (или 401, если никто)
import { sql } from './_lib/db.js';
import { requireUser } from './_lib/auth.js';
import { send, allow, fail } from './_lib/http.js';

export default async function handler(req, res) {
  if (!allow(req, res, ['GET'])) return;
  try {
    const user = await requireUser(req, sql);
    if (!user) return send(res, 401, { error: 'unauthorized' });
    send(res, 200, { user: { email: user.email } });
  } catch (err) {
    fail(res, err);
  }
}
