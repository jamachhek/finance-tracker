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

const tables = await sql`
  select table_name from information_schema.tables
  where table_schema = 'public' and table_name in ('users', 'user_data')
  order by table_name`;
console.log('Таблицы готовы:', tables.map(t => t.table_name).join(', '));
