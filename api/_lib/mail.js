// Отправка писем через Resend (https://resend.com). Ключ — только в переменной окружения RESEND_API_KEY.
export const mailConfigured = () => Boolean(process.env.RESEND_API_KEY);

const TEXTS = {
  ru: {
    subject: code => `${code} — код для смены пароля`,
    title: 'Смена пароля',
    intro: 'Вы запросили смену пароля в приложении «Финансы». Введите этот код на сайте:',
    expires: 'Код действует 15 минут и подходит только один раз.',
    ignore: 'Если вы не запрашивали смену пароля, просто проигнорируйте это письмо — пароль останется прежним.',
  },
  uz: {
    subject: code => `${code} — parolni almashtirish kodi`,
    title: 'Parolni almashtirish',
    intro: '«Moliya» ilovasida parolni almashtirishni so‘radingiz. Ushbu kodni saytda kiriting:',
    expires: 'Kod 15 daqiqa amal qiladi va faqat bir marta ishlatiladi.',
    ignore: 'Agar siz parolni almashtirishni so‘ramagan bo‘lsangiz, bu xatni e’tiborsiz qoldiring — parol o‘zgarmaydi.',
  },
};

export async function sendResetCode(to, code, lang = 'ru') {
  const t = TEXTS[lang] || TEXTS.ru;
  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:440px;margin:0 auto;padding:24px;color:#1f2d3b">
      <h2 style="margin:0 0 12px">${t.title}</h2>
      <p style="margin:0 0 16px;line-height:1.5">${t.intro}</p>
      <div style="font-size:34px;font-weight:700;letter-spacing:10px;text-align:center;padding:16px;border-radius:16px;background:#eef3f2;color:#3f8a80">${code}</div>
      <p style="margin:16px 0 8px;color:#5c6b7b;font-size:14px">${t.expires}</p>
      <p style="margin:0;color:#5c6b7b;font-size:13px">${t.ignore}</p>
    </div>`;
  const text = `${t.intro}\n\n${code}\n\n${t.expires}\n${t.ignore}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || 'Finance <onboarding@resend.dev>',
      to: [to],
      subject: t.subject(code),
      html,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
