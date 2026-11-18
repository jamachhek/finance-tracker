# SPEC — техническая спецификация

## 1. Архитектура
```
Браузер (index.html + main.css + script.js, без сборки и фреймворков)
   │  fetch, cookie ft_session (HttpOnly, Secure, SameSite=Lax)
   ▼
Vercel Serverless Functions (api/*.js, Node, ESM)
   │  @neondatabase/serverless (HTTP)
   ▼
Neon Postgres (users, user_data, password_resets)
   +  Resend (письма с кодом сброса пароля)
```
- **Локальный режим**: если `GET /api/me` отвечает 404 (GitHub Pages, локальный сервер) — приложение работает только с `localStorage`, экран входа не показывается.
- **Гость**: `/api/me` → 401 — показывается экран входа.
- **Пользователь**: `/api/me` → 200 — данные берутся из облака, копия кэшируется в `localStorage` (`finance-tracker:v1:<email>`).

## 2. Модель данных (клиент)
```js
state = {
  transactions: [{ id, type: 'income'|'expense', amount /* в сумах, > 0 */, categoryId, date: 'YYYY-MM-DD', note }],
  categories:   [{ id, key /* стандартная или null */, name, type, color }],
  settings:     { currency: 'UZS'|'USD'|'EUR'|'RUB'|'KZT', rates: { UZS: 1, USD: 12700, ... }, theme: 'auto'|'light'|'dark', lang: 'ru'|'uz' }
}
```
- Все суммы хранятся **в сумах**; при показе делятся на курс выбранной валюты.
- `normalizeState()` чинит старые/битые данные; `isValidTx()` отбрасывает некорректные операции.
- CRUD — через `createRepository(collection)` (`Transactions`, `Categories`), настройки — `Settings`.
- Сохранение: `Store.save()` → кэш в `localStorage` + `Cloud.schedule()` (отправка через 700 мс, последнее изменение побеждает).

## 3. База данных (Neon)
| Таблица | Поля |
|---|---|
| `users` | `id bigint PK`, `email unique`, `password_hash` (`scrypt$salt$hash`), `session_version int`, `created_at` |
| `user_data` | `user_id PK → users ON DELETE CASCADE`, `data jsonb`, `updated_at` |
| `password_resets` | `id`, `user_id → users CASCADE`, `code_hash` (HMAC), `attempts`, `expires_at`, `used_at`, `created_at` |

Миграции: `npm run migrate` (`scripts/migrate.mjs`, идемпотентно).

## 4. API
| Метод и путь | Тело | Ответы |
|---|---|---|
| `POST /api/register` | `{email, password}` | 201 + cookie · 400 `invalid_email`/`weak_password` · 409 `email_taken` |
| `POST /api/login` | `{email, password}` | 200 + cookie · 401 `invalid_credentials` |
| `POST /api/logout` | — | 200, cookie очищена |
| `GET /api/me` | — | 200 `{user}` · 401 |
| `GET /api/data` | — | 200 `{data, updatedAt}` · 401 |
| `PUT /api/data` | `{data}` | 200 · 400 `invalid_data` · 413 `too_large` (> 2 МБ) |
| `POST /api/forgot` | `{email, lang}` | 200 всегда (не раскрывает почты) · 429 · 503 `mail_not_configured` |
| `POST /api/reset` | `{email, code, password}` | 200 + cookie · 400 `invalid_code` (+`attemptsLeft`) / `code_expired` · 429 `too_many_attempts` |
| `POST /api/delete-account` | `{password}` | 200 · 401 · 403 `wrong_password` |

## 5. Безопасность
- Пароли: scrypt + соль 16 байт, сравнение `timingSafeEqual`; длина 8–200.
- Сессия: подписанная HMAC-SHA256 cookie на 30 дней; `session_version` растёт при смене пароля — все старые входы гаснут.
- Код сброса: 6 цифр (`randomInt`), в базе только HMAC, 15 минут, 5 попыток, не больше 3 кодов в час.
- Одинаковая ошибка для «нет почты» и «неверный пароль».
- Секреты только в переменных окружения Vercel: `DATABASE_URL`, `SESSION_SECRET` (≥ 32 символа), `RESEND_API_KEY`, `MAIL_FROM` (необязательно).
- Весь пользовательский текст на страницу — через `escapeHtml`.

## 6. Интернационализация
- Словарь `I18N = { ru, uz }`, функция `t(key, params)`, атрибуты `data-i18n` / `data-i18n-attr`.
- Числа — группировка `ru-RU`; даты на узбекском форматируются вручную (`15-okt, 2026`).

## 7. Развёртывание
- Облако: `vercel deploy --prod --yes` (Vercel не привязан к GitHub).
- Статичная версия: GitHub Pages из ветки `main` (локальный режим).
- В деплой не попадают: `physic/`, `scripts/`, `*.md`, `.env*` (`.vercelignore`).

## 8. Поддержка браузеров
Последние Chrome / Edge / Safari / Firefox. Выпадающие списки с `appearance: base-select` деградируют до обычных `<select>`.
