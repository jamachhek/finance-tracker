// POST /api/logout — выход: браузер удаляет cookie сессии
import { clearedCookie } from './_lib/auth.js';
import { send, allow } from './_lib/http.js';

export default function handler(req, res) {
  if (!allow(req, res, ['POST'])) return;
  send(res, 200, { ok: true }, clearedCookie());
}
