// Создаёт таблицы в Neon. Запуск: DATABASE_URL=... node scripts/migrate.mjs
// Можно запускать повторно — существующие таблицы не трогаются.
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('Задайте DATABASE_URL');
  process.exit(1);
}
const sql = neon(process.env.DATABASE_URL);

await sql`
  create table if not exists users (
    id            bigint generated always as identity primary key,
    email         text        not null unique,
    password_hash text        not null,
    created_at    timestamptz not null default now()
  )`;

await sql`
  create table if not exists user_data (
    user_id    bigint      primary key references users(id) on delete cascade,
    data       jsonb       not null,
    updated_at timestamptz not null default now()
  )`;

// версия сессий: после смены пароля растёт — все старые входы перестают действовать
await sql`alter table users add column if not exists session_version integer not null default 0`;

// коды «Забыли пароль?» из письма: в базе только HMAC-хеш кода, сам код — лишь в письме
await sql`
  create table if not exists password_resets (
    id         bigint      generated always as identity primary key,
    user_id    bigint      not null references users(id) on delete cascade,
    code_hash  text        not null,
    attempts   integer     not null default 0,
    expires_at timestamptz not null,
    used_at    timestamptz,
    created_at timestamptz not null default now()
  )`;
await sql`create index if not exists password_resets_user_idx on password_resets (user_id, created_at)`;

const tables = await sql`
  select table_name from information_schema.tables
  where table_schema = 'public' and table_name in ('users', 'user_data', 'password_resets')
  order by table_name`;
console.log('Таблицы готовы:', tables.map(t => t.table_name).join(', '));
