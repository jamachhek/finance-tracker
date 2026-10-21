// Задать новый пароль аккаунту, если старый забыт.
// Запуск: node scripts/reset-password.mjs --db-file <файл с адресом базы Neon>
// Почта и пароль вводятся в терминале; пароль скрыт звёздочками и никуда не выводится.
import { readFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { neon } from '@neondatabase/serverless';
import { hashPassword, normalizeEmail } from '../api/_lib/auth.js';

const fileArg = process.argv.indexOf('--db-file');
const url = fileArg > 0 ? readFileSync(process.argv[fileArg + 1], 'utf8').trim() : process.env.DATABASE_URL;
if (!url) { console.error('Нет адреса базы: --db-file <файл> или DATABASE_URL'); process.exit(1); }
const sql = neon(url);

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer.trim()); }));
}

/** Ввод пароля со звёздочками вместо символов */
function askHidden(question) {
  return new Promise(resolve => {
    process.stdout.write(question);
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    let value = '';
    const onData = ch => {
      if (ch === '\r' || ch === '\n') {
        stdin.setRawMode(false); stdin.pause(); stdin.off('data', onData);
        process.stdout.write('\n');
        resolve(value);
      } else if (ch === '\u0003') { // Ctrl+C
        process.stdout.write('\n'); process.exit(1);
      } else if (ch === '\u0008' || ch === '\u007f') { // Backspace
        if (value) { value = value.slice(0, -1); process.stdout.write('\b \b'); }
      } else {
        value += ch;
        process.stdout.write('*'.repeat(ch.length));
      }
    };
    stdin.on('data', onData);
  });
}

const email = normalizeEmail(await ask('Почта аккаунта: '));
const [user] = await sql`select id from users where email = ${email}`;
if (!user) { console.error(`Аккаунт ${email} не найден.`); process.exit(1); }

const password = await askHidden('Новый пароль (не короче 8 символов): ');
if (password.length < 8) { console.error('Слишком короткий пароль — ничего не изменено.'); process.exit(1); }
const repeat = await askHidden('Повторите новый пароль: ');
if (repeat !== password) { console.error('Пароли не совпадают — ничего не изменено.'); process.exit(1); }

// session_version + 1 — все старые входы на других устройствах перестают действовать
await sql`update users set password_hash = ${hashPassword(password)}, session_version = session_version + 1 where id = ${user.id}`;
console.log(`Готово: пароль для ${email} изменён. Войдите на сайте с новым паролем.`);
