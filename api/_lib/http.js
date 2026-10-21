// Мелкие помощники для ответов API
export function send(res, status, body, cookie) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (cookie) res.setHeader('Set-Cookie', cookie);
  res.status(status).send(JSON.stringify(body));
}

/** Тело запроса как объект (Vercel сам разбирает JSON, но подстрахуемся) */
export function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch { return {}; }
}

/** Разрешает только указанные методы; JSON-запросы с чужих сайтов отсекает CORS + SameSite cookie */
export function allow(req, res, methods) {
  if (methods.includes(req.method)) return true;
  res.setHeader('Allow', methods.join(', '));
  send(res, 405, { error: 'method_not_allowed' });
  return false;
}

export function fail(res, err) {
  console.error(err);
  send(res, 500, { error: 'server_error' });
}
