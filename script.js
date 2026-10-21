'use strict';

/* =========================================================
   Константы
   ========================================================= */
const STORAGE_KEY = 'finance-tracker:v1';

/* =========================================================
   Языки: русский и узбекский (латиница)
   ========================================================= */
const I18N = {
  ru: {
    'app.title': 'Финансы — трекер доходов и расходов',
    'app.name': 'Финансы',
    'app.mark': 'Ф',
    'app.locale': 'ru-RU',
    formatDate: d => d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
    'lang.label': 'Язык',
    'lang.changed': 'Язык: русский',

    'auth.title': 'Вход в аккаунт',
    'auth.titleRegister': 'Создание аккаунта',
    'auth.subtitle': 'Данные хранятся в облаке и доступны с любого устройства',
    'auth.login': 'Вход',
    'auth.register': 'Регистрация',
    'auth.email': 'Электронная почта',
    'auth.password': 'Пароль',
    'auth.passwordHint': 'Не короче 8 символов',
    'auth.passwordRepeat': 'Повторите пароль',
    'auth.err.mismatch': 'Пароли не совпадают',
    'auth.newPassword': 'Новый пароль',
    'auth.forgot': 'Забыли пароль?',
    'auth.back': 'Ко входу',
    'auth.titleForgot': 'Восстановление пароля',
    'auth.subtitleForgot': 'Введите почту аккаунта — мы пришлём код из 6 цифр',
    'auth.titleReset': 'Новый пароль',
    'auth.subtitleReset': 'Введите код из письма и придумайте новый пароль',
    'auth.submitForgot': 'Отправить код',
    'auth.submitReset': 'Сменить пароль',
    'auth.code': 'Код из письма',
    'auth.codeSent': 'Если аккаунт с почтой {email} существует, мы отправили на неё код. Он действует 15 минут. Проверьте и папку «Спам».',
    'auth.resend': 'Отправить код ещё раз',
    'auth.resendIn': 'Отправить ещё раз можно через {s} с',
    'auth.err.code': 'Введите 6 цифр из письма',
    'auth.err.invalidCode': 'Неверный код. Осталось попыток: {n}',
    'auth.err.codeExpired': 'Код устарел или уже использован — запросите новый',
    'auth.err.attempts': 'Слишком много неверных попыток — запросите новый код',
    'auth.err.tooMany': 'Слишком много запросов — попробуйте через час',
    'auth.err.mailOff': 'Отправка писем ещё не настроена',
    'toast.passwordChanged': 'Пароль изменён — вы вошли в аккаунт',
    'privacy.link': 'Политика конфиденциальности',
    'account.title': 'Аккаунт',
    'account.deleteHint': 'Удаление стирает аккаунт и все ваши операции без возможности восстановления.',
    'account.delete': 'Удалить аккаунт',
    'account.deleteTitle': 'Удалить аккаунт навсегда?',
    'account.deleteText': 'Аккаунт, все операции, категории и настройки будут удалены без возможности восстановления. Чтобы подтвердить, введите пароль.',
    'account.deleteConfirm': 'Удалить навсегда',
    'account.err.password': 'Неверный пароль',
    'toast.accountDeleted': 'Аккаунт и все данные удалены',
    'auth.submitLogin': 'Войти',
    'auth.submitRegister': 'Создать аккаунт',
    'auth.busy': 'Подождите…',
    'auth.logout': 'Выйти',
    'auth.err.invalid': 'Неверная почта или пароль',
    'auth.err.taken': 'Аккаунт с такой почтой уже есть — войдите',
    'auth.err.email': 'Введите корректную почту',
    'auth.err.password': 'Пароль должен быть не короче 8 символов',
    'auth.err.network': 'Сервер недоступен, попробуйте ещё раз',
    'toast.welcome': 'Добро пожаловать!',
    'toast.migrated': 'Данные с этого устройства перенесены в аккаунт',
    'toast.syncFailed': 'Не удалось сохранить в облако — проверьте интернет',
    'settings.cloudHint': 'Данные хранятся в облаке (Neon) и доступны после входа с любого устройства.',

    'nav.aria': 'Навигация',
    'nav.dashboard': 'Дашборд',
    'nav.transactions': 'Операции',
    'nav.categories': 'Категории',
    'nav.settings': 'Настройки',
    'nav.add': 'Добавить операцию',

    'dash.title': 'Дашборд',
    'dash.subtitle': 'Обзор ваших доходов и расходов',
    'dash.period': 'Период',
    'period.month': 'Этот месяц',
    'period.3m': '3 месяца',
    'period.6m': '6 месяцев',
    'period.year': 'Этот год',
    'period.all': 'Всё время',
    'periodLabel.month': 'за этот месяц',
    'periodLabel.3m': 'за 3 месяца',
    'periodLabel.6m': 'за 6 месяцев',
    'periodLabel.year': 'за этот год',
    'periodLabel.all': 'за всё время',
    'btn.addIncome': '+ Доход',
    'btn.addExpense': '+ Расход',
    'stat.balance': 'Баланс',
    'stat.savings': 'Норма сбережений',
    'stat.savingsHint': 'доля дохода, оставшаяся после расходов',
    'common.income': 'Доходы',
    'common.expense': 'Расходы',
    'common.incomeOne': 'Доход',
    'common.expenseOne': 'Расход',
    'common.total': 'Итог',

    'chart.byMonth': 'Доходы и расходы по месяцам',
    'chart.structure': 'Структура',
    'chart.balance': 'Динамика баланса',
    'chart.structureAria': 'Структура по категориям',
    'chart.emptyPeriod': 'Нет данных за выбранный период.<br>Добавьте первую операцию.',
    'chart.emptyLine': 'Нет данных для построения графика',
    'donut.total': 'Всего',
    'donut.rest': 'Остальное',
    'donut.noExpense': 'Нет расходов за период',
    'donut.noIncome': 'Нет доходов за период',
    'recent.title': 'Последние операции',
    'recent.all': 'Все операции →',
    'recent.empty': 'Пока нет операций',

    'tx.title': 'Операции',
    'tx.subtitle': 'Добавление, просмотр, редактирование и удаление',
    'tx.add': '+ Добавить',
    'tx.search': 'Поиск по описанию или категории…',
    'tx.allTypes': 'Все типы',
    'tx.allCats': 'Все категории',
    'tx.month': 'Месяц',
    'tx.reset': 'Сбросить',
    'tx.found': 'Найдено',
    'tx.emptyFiltered': 'По заданным фильтрам ничего не найдено',
    'tx.emptyNone': 'Операций пока нет',
    'tx.addFirst': 'Добавить первую операцию',
    'tx.new': 'Новая операция',
    'tx.edit': 'Редактировать операцию',
    'sort.new': 'Сначала новые',
    'sort.old': 'Сначала старые',
    'sort.amountDesc': 'Сумма ↓',
    'sort.amountAsc': 'Сумма ↑',
    'col.date': 'Дата',
    'col.category': 'Категория',
    'col.note': 'Описание',
    'col.amount': 'Сумма',

    'cats.title': 'Категории',
    'cats.subtitle': 'Управление категориями доходов и расходов',
    'cats.new': '+ Новая категория',
    'cats.income': 'Категории доходов',
    'cats.expense': 'Категории расходов',
    'cats.empty': 'Категорий нет',
    'cats.newTitle': 'Новая категория',
    'cats.editTitle': 'Редактировать категорию',

    'settings.title': 'Настройки',
    'settings.subtitle': 'Валюта, оформление и управление данными',
    'settings.currency': 'Валюта',
    'settings.displayCurrency': 'Валюта отображения',
    'settings.ratesHint': 'Все суммы хранятся в сумах и пересчитываются по курсу ниже. Курс — сколько сумов стоит 1 единица валюты.',
    'settings.rateAria': 'Курс {code} в сумах',
    'settings.saveRates': 'Сохранить курсы',
    'settings.appearance': 'Оформление',
    'settings.theme': 'Тема',
    'theme.auto': 'Как в системе',
    'theme.light': 'Светлая',
    'theme.dark': 'Тёмная',
    'settings.data': 'Данные',
    'settings.dataHint': 'Данные хранятся локально в браузере (localStorage).',
    'settings.export': '⬇ Экспорт в JSON',
    'settings.import': '⬆ Импорт из JSON',
    'settings.demo': '✨ Заполнить демо-данными',
    'settings.reset': '🗑 Удалить все данные',

    'modal.close': 'Закрыть',
    'field.amount': 'Сумма,',
    'field.category': 'Категория',
    'field.date': 'Дата',
    'field.note': 'Описание',
    'field.optional': 'Необязательно',
    'field.name': 'Название',
    'field.color': 'Цвет',
    'field.colorAria': 'Цвет {color}',
    'btn.delete': 'Удалить',
    'btn.cancel': 'Отмена',
    'btn.save': 'Сохранить',
    'action.edit': 'Редактировать',
    'action.delete': 'Удалить',

    'err.amountRequired': 'Введите сумму',
    'err.amountPositive': 'Сумма должна быть положительным числом',
    'err.dateRequired': 'Укажите дату',
    'err.nameRequired': 'Введите название',
    'err.nameDuplicate': 'Такая категория уже существует',

    'toast.txUpdated': 'Операция обновлена',
    'toast.incomeAdded': 'Доход добавлен',
    'toast.expenseAdded': 'Расход добавлен',
    'toast.txDeleted': 'Операция удалена',
    'toast.catUpdated': 'Категория обновлена',
    'toast.catCreated': 'Категория создана',
    'toast.catDeleted': 'Категория удалена',
    'toast.currency': 'Валюта: {name}',
    'toast.rateInvalid': 'Курс должен быть положительным числом',
    'toast.ratesSaved': 'Курсы сохранены',
    'toast.exported': 'Файл экспортирован',
    'toast.imported': 'Данные импортированы',
    'toast.importFailed': 'Не удалось прочитать файл: неверный формат',
    'toast.demoAdded': 'Демо-данные добавлены',
    'toast.allDeleted': 'Все данные удалены',
    'toast.saveFailed': 'Не удалось сохранить данные в браузере',

    'confirm.title': 'Подтверждение',
    'confirm.deleteTxTitle': 'Удалить операцию?',
    'confirm.deleteTxText': '{cat}, {amount} от {date}. Это действие нельзя отменить.',
    'confirm.deleteCatTitle': 'Удалить «{name}»?',
    'confirm.deleteCatUsed': '{ops} этой категории останутся, но будут помечены как «Без категории».',
    'confirm.deleteCatUnused': 'Категория не используется в операциях.',
    'confirm.importTitle': 'Импортировать данные?',
    'confirm.importText': 'Текущие данные будут заменены ({ops} в файле).',
    'confirm.importOk': 'Импортировать',
    'confirm.demoTitle': 'Заполнить демо-данными?',
    'confirm.demoText': 'Текущие операции будут заменены примерами за последние 6 месяцев.',
    'confirm.demoOk': 'Заполнить',
    'confirm.resetTitle': 'Удалить все данные?',
    'confirm.resetText': 'Все операции, категории и настройки будут сброшены. Это действие нельзя отменить.',
    'confirm.resetOk': 'Удалить всё',

    'cur.UZS': 'Узбекский сум',
    'cur.USD': 'Доллар США',
    'cur.EUR': 'Евро',
    'cur.RUB': 'Российский рубль',
    'cur.KZT': 'Казахстанский тенге',
    'cur.uzsSymbol': 'сум',
    'num.thousand': 'тыс',
    'num.million': 'млн',
    'num.billion': 'млрд',
    months: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    ops: n => {
      const mod10 = n % 10, mod100 = n % 100;
      const word = mod10 === 1 && mod100 !== 11 ? 'операция'
        : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? 'операции' : 'операций';
      return `${n} ${word}`;
    },

    'cat.none': 'Без категории',
    'cat.salary': 'Зарплата',
    'cat.freelance': 'Фриланс',
    'cat.gifts': 'Подарки',
    'cat.otherIncome': 'Прочие доходы',
    'cat.groceries': 'Продукты',
    'cat.transport': 'Транспорт',
    'cat.cafe': 'Кафе и рестораны',
    'cat.utilities': 'Коммунальные услуги',
    'cat.telecom': 'Связь и интернет',
    'cat.fun': 'Развлечения',
    'cat.health': 'Здоровье',
    'cat.shopping': 'Одежда и покупки',
    'cat.otherExpense': 'Прочие расходы',

    'demo.salary': 'Зарплата',
    'demo.project': 'Проект для клиента',
    'demo.gift': 'Подарок на день рождения',
    'demo.utilities': 'Свет, газ, вода',
    'demo.telecom': 'Интернет и мобильная связь',
    'demo.groceries': 'Супермаркет',
    'demo.taxi': 'Такси и метро',
    'demo.dinner': 'Ужин',
    'demo.cinema': 'Кино',
    'demo.shopping': 'Покупки',
    'demo.pharmacy': 'Аптека',
  },

  uz: {
    'app.title': 'Moliya — daromad va xarajatlar hisobi',
    'app.name': 'Moliya',
    'app.mark': 'M',
    // в браузерах почти нет узбекских данных Intl: числа форматируем по-узбекски вручную
    // (разряды через пробел, как в ru-RU), даты — «15-okt, 2026»
    'app.locale': 'ru-RU',
    formatDate: d => `${d.getDate()}-${I18N.uz.months[d.getMonth()]}, ${d.getFullYear()}`,
    'lang.label': 'Til',
    'lang.changed': 'Til: o‘zbekcha',

    'auth.title': 'Hisobga kirish',
    'auth.titleRegister': 'Hisob yaratish',
    'auth.subtitle': 'Ma’lumotlar bulutda saqlanadi va istalgan qurilmadan ochiladi',
    'auth.login': 'Kirish',
    'auth.register': 'Ro‘yxatdan o‘tish',
    'auth.email': 'Elektron pochta',
    'auth.password': 'Parol',
    'auth.passwordHint': 'Kamida 8 ta belgi',
    'auth.passwordRepeat': 'Parolni takrorlang',
    'auth.err.mismatch': 'Parollar mos kelmadi',
    'auth.newPassword': 'Yangi parol',
    'auth.forgot': 'Parolni unutdingizmi?',
    'auth.back': 'Kirishga qaytish',
    'auth.titleForgot': 'Parolni tiklash',
    'auth.subtitleForgot': 'Hisob pochtasini kiriting — 6 xonali kod yuboramiz',
    'auth.titleReset': 'Yangi parol',
    'auth.subtitleReset': 'Xatdagi kodni kiriting va yangi parol o‘ylab toping',
    'auth.submitForgot': 'Kodni yuborish',
    'auth.submitReset': 'Parolni almashtirish',
    'auth.code': 'Xatdagi kod',
    'auth.codeSent': 'Agar {email} pochtasi bilan hisob mavjud bo‘lsa, unga kod yubordik. Kod 15 daqiqa amal qiladi. «Spam» papkasini ham tekshiring.',
    'auth.resend': 'Kodni qayta yuborish',
    'auth.resendIn': 'Qayta yuborish {s} soniyadan keyin',
    'auth.err.code': 'Xatdagi 6 ta raqamni kiriting',
    'auth.err.invalidCode': 'Kod noto‘g‘ri. Qolgan urinishlar: {n}',
    'auth.err.codeExpired': 'Kod eskirgan yoki ishlatilgan — yangisini so‘rang',
    'auth.err.attempts': 'Juda ko‘p noto‘g‘ri urinish — yangi kod so‘rang',
    'auth.err.tooMany': 'So‘rovlar juda ko‘p — bir soatdan keyin urinib ko‘ring',
    'auth.err.mailOff': 'Xat yuborish hali sozlanmagan',
    'toast.passwordChanged': 'Parol almashtirildi — hisobga kirdingiz',
    'privacy.link': 'Maxfiylik siyosati',
    'account.title': 'Hisob',
    'account.deleteHint': 'O‘chirish hisobni va barcha operatsiyalaringizni qayta tiklab bo‘lmaydigan qilib o‘chiradi.',
    'account.delete': 'Hisobni o‘chirish',
    'account.deleteTitle': 'Hisob butunlay o‘chirilsinmi?',
    'account.deleteText': 'Hisob, barcha operatsiyalar, kategoriyalar va sozlamalar qayta tiklab bo‘lmaydigan qilib o‘chiriladi. Tasdiqlash uchun parolni kiriting.',
    'account.deleteConfirm': 'Butunlay o‘chirish',
    'account.err.password': 'Parol noto‘g‘ri',
    'toast.accountDeleted': 'Hisob va barcha ma’lumotlar o‘chirildi',
    'auth.submitLogin': 'Kirish',
    'auth.submitRegister': 'Hisob yaratish',
    'auth.busy': 'Kuting…',
    'auth.logout': 'Chiqish',
    'auth.err.invalid': 'Pochta yoki parol noto‘g‘ri',
    'auth.err.taken': 'Bu pochta bilan hisob mavjud — kiring',
    'auth.err.email': 'To‘g‘ri pochta manzilini kiriting',
    'auth.err.password': 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak',
    'auth.err.network': 'Server javob bermayapti, qayta urinib ko‘ring',
    'toast.welcome': 'Xush kelibsiz!',
    'toast.migrated': 'Bu qurilmadagi ma’lumotlar hisobingizga ko‘chirildi',
    'toast.syncFailed': 'Bulutga saqlab bo‘lmadi — internetni tekshiring',
    'settings.cloudHint': 'Ma’lumotlar bulutda (Neon) saqlanadi va kirgandan so‘ng istalgan qurilmada ochiladi.',

    'nav.aria': 'Navigatsiya',
    'nav.dashboard': 'Asosiy',
    'nav.transactions': 'Operatsiyalar',
    'nav.categories': 'Kategoriyalar',
    'nav.settings': 'Sozlamalar',
    'nav.add': 'Operatsiya qo‘shish',

    'dash.title': 'Asosiy panel',
    'dash.subtitle': 'Daromad va xarajatlaringiz sharhi',
    'dash.period': 'Davr',
    'period.month': 'Shu oy',
    'period.3m': '3 oy',
    'period.6m': '6 oy',
    'period.year': 'Shu yil',
    'period.all': 'Butun davr',
    'periodLabel.month': 'shu oy uchun',
    'periodLabel.3m': '3 oy uchun',
    'periodLabel.6m': '6 oy uchun',
    'periodLabel.year': 'shu yil uchun',
    'periodLabel.all': 'butun davr uchun',
    'btn.addIncome': '+ Daromad',
    'btn.addExpense': '+ Xarajat',
    'stat.balance': 'Balans',
    'stat.savings': 'Jamg‘arma ulushi',
    'stat.savingsHint': 'xarajatlardan keyin qolgan daromad ulushi',
    'common.income': 'Daromadlar',
    'common.expense': 'Xarajatlar',
    'common.incomeOne': 'Daromad',
    'common.expenseOne': 'Xarajat',
    'common.total': 'Natija',

    'chart.byMonth': 'Oylar bo‘yicha daromad va xarajatlar',
    'chart.structure': 'Tarkib',
    'chart.balance': 'Balans dinamikasi',
    'chart.structureAria': 'Kategoriyalar bo‘yicha tarkib',
    'chart.emptyPeriod': 'Tanlangan davr uchun ma’lumot yo‘q.<br>Birinchi operatsiyani qo‘shing.',
    'chart.emptyLine': 'Grafik uchun ma’lumot yo‘q',
    'donut.total': 'Jami',
    'donut.rest': 'Boshqalar',
    'donut.noExpense': 'Davr uchun xarajatlar yo‘q',
    'donut.noIncome': 'Davr uchun daromadlar yo‘q',
    'recent.title': 'So‘nggi operatsiyalar',
    'recent.all': 'Barcha operatsiyalar →',
    'recent.empty': 'Hozircha operatsiyalar yo‘q',

    'tx.title': 'Operatsiyalar',
    'tx.subtitle': 'Qo‘shish, ko‘rish, tahrirlash va o‘chirish',
    'tx.add': '+ Qo‘shish',
    'tx.search': 'Tavsif yoki kategoriya bo‘yicha qidiruv…',
    'tx.allTypes': 'Barcha turlar',
    'tx.allCats': 'Barcha kategoriyalar',
    'tx.month': 'Oy',
    'tx.reset': 'Tozalash',
    'tx.found': 'Topildi',
    'tx.emptyFiltered': 'Filtrlar bo‘yicha hech narsa topilmadi',
    'tx.emptyNone': 'Hozircha operatsiyalar yo‘q',
    'tx.addFirst': 'Birinchi operatsiyani qo‘shish',
    'tx.new': 'Yangi operatsiya',
    'tx.edit': 'Operatsiyani tahrirlash',
    'sort.new': 'Avval yangilari',
    'sort.old': 'Avval eskilari',
    'sort.amountDesc': 'Summa ↓',
    'sort.amountAsc': 'Summa ↑',
    'col.date': 'Sana',
    'col.category': 'Kategoriya',
    'col.note': 'Tavsif',
    'col.amount': 'Summa',

    'cats.title': 'Kategoriyalar',
    'cats.subtitle': 'Daromad va xarajat kategoriyalarini boshqarish',
    'cats.new': '+ Yangi kategoriya',
    'cats.income': 'Daromad kategoriyalari',
    'cats.expense': 'Xarajat kategoriyalari',
    'cats.empty': 'Kategoriyalar yo‘q',
    'cats.newTitle': 'Yangi kategoriya',
    'cats.editTitle': 'Kategoriyani tahrirlash',

    'settings.title': 'Sozlamalar',
    'settings.subtitle': 'Valyuta, ko‘rinish va ma’lumotlarni boshqarish',
    'settings.currency': 'Valyuta',
    'settings.displayCurrency': 'Ko‘rsatish valyutasi',
    'settings.ratesHint': 'Barcha summalar so‘mda saqlanadi va quyidagi kurs bo‘yicha qayta hisoblanadi. Kurs — 1 birlik valyuta necha so‘m turishi.',
    'settings.rateAria': '{code} kursi so‘mda',
    'settings.saveRates': 'Kurslarni saqlash',
    'settings.appearance': 'Ko‘rinish',
    'settings.theme': 'Mavzu',
    'theme.auto': 'Tizimdagidek',
    'theme.light': 'Yorug‘',
    'theme.dark': 'Qorong‘i',
    'settings.data': 'Ma’lumotlar',
    'settings.dataHint': 'Ma’lumotlar brauzerda mahalliy saqlanadi (localStorage).',
    'settings.export': '⬇ JSON ga eksport',
    'settings.import': '⬆ JSON dan import',
    'settings.demo': '✨ Demo ma’lumotlar bilan to‘ldirish',
    'settings.reset': '🗑 Barcha ma’lumotlarni o‘chirish',

    'modal.close': 'Yopish',
    'field.amount': 'Summa,',
    'field.category': 'Kategoriya',
    'field.date': 'Sana',
    'field.note': 'Tavsif',
    'field.optional': 'Ixtiyoriy',
    'field.name': 'Nomi',
    'field.color': 'Rang',
    'field.colorAria': 'Rang {color}',
    'btn.delete': 'O‘chirish',
    'btn.cancel': 'Bekor qilish',
    'btn.save': 'Saqlash',
    'action.edit': 'Tahrirlash',
    'action.delete': 'O‘chirish',

    'err.amountRequired': 'Summani kiriting',
    'err.amountPositive': 'Summa musbat son bo‘lishi kerak',
    'err.dateRequired': 'Sanani ko‘rsating',
    'err.nameRequired': 'Nomini kiriting',
    'err.nameDuplicate': 'Bunday kategoriya allaqachon mavjud',

    'toast.txUpdated': 'Operatsiya yangilandi',
    'toast.incomeAdded': 'Daromad qo‘shildi',
    'toast.expenseAdded': 'Xarajat qo‘shildi',
    'toast.txDeleted': 'Operatsiya o‘chirildi',
    'toast.catUpdated': 'Kategoriya yangilandi',
    'toast.catCreated': 'Kategoriya yaratildi',
    'toast.catDeleted': 'Kategoriya o‘chirildi',
    'toast.currency': 'Valyuta: {name}',
    'toast.rateInvalid': 'Kurs musbat son bo‘lishi kerak',
    'toast.ratesSaved': 'Kurslar saqlandi',
    'toast.exported': 'Fayl eksport qilindi',
    'toast.imported': 'Ma’lumotlar import qilindi',
    'toast.importFailed': 'Faylni o‘qib bo‘lmadi: noto‘g‘ri format',
    'toast.demoAdded': 'Demo ma’lumotlar qo‘shildi',
    'toast.allDeleted': 'Barcha ma’lumotlar o‘chirildi',
    'toast.saveFailed': 'Ma’lumotlarni brauzerda saqlab bo‘lmadi',

    'confirm.title': 'Tasdiqlash',
    'confirm.deleteTxTitle': 'Operatsiya o‘chirilsinmi?',
    'confirm.deleteTxText': '{cat}, {amount}, {date}. Bu amalni bekor qilib bo‘lmaydi.',
    'confirm.deleteCatTitle': '«{name}» o‘chirilsinmi?',
    'confirm.deleteCatUsed': 'Bu kategoriyadagi {ops} qoladi, lekin «Kategoriyasiz» deb belgilanadi.',
    'confirm.deleteCatUnused': 'Kategoriya operatsiyalarda ishlatilmagan.',
    'confirm.importTitle': 'Ma’lumotlar import qilinsinmi?',
    'confirm.importText': 'Joriy ma’lumotlar almashtiriladi (faylda {ops}).',
    'confirm.importOk': 'Import qilish',
    'confirm.demoTitle': 'Demo ma’lumotlar bilan to‘ldirilsinmi?',
    'confirm.demoText': 'Joriy operatsiyalar so‘nggi 6 oylik namunalar bilan almashtiriladi.',
    'confirm.demoOk': 'To‘ldirish',
    'confirm.resetTitle': 'Barcha ma’lumotlar o‘chirilsinmi?',
    'confirm.resetText': 'Barcha operatsiyalar, kategoriyalar va sozlamalar tiklanadi. Bu amalni bekor qilib bo‘lmaydi.',
    'confirm.resetOk': 'Hammasini o‘chirish',

    'cur.UZS': 'O‘zbek so‘mi',
    'cur.USD': 'AQSH dollari',
    'cur.EUR': 'Yevro',
    'cur.RUB': 'Rossiya rubli',
    'cur.KZT': 'Qozog‘iston tengesi',
    'cur.uzsSymbol': 'so‘m',
    'num.thousand': 'ming',
    'num.million': 'mln',
    'num.billion': 'mlrd',
    months: ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek'],
    ops: n => `${n} ta operatsiya`,

    'cat.none': 'Kategoriyasiz',
    'cat.salary': 'Ish haqi',
    'cat.freelance': 'Frilans',
    'cat.gifts': 'Sovg‘alar',
    'cat.otherIncome': 'Boshqa daromadlar',
    'cat.groceries': 'Oziq-ovqat',
    'cat.transport': 'Transport',
    'cat.cafe': 'Kafe va restoranlar',
    'cat.utilities': 'Kommunal xizmatlar',
    'cat.telecom': 'Aloqa va internet',
    'cat.fun': 'Ko‘ngilochar',
    'cat.health': 'Sog‘liq',
    'cat.shopping': 'Kiyim va xaridlar',
    'cat.otherExpense': 'Boshqa xarajatlar',

    'demo.salary': 'Ish haqi',
    'demo.project': 'Mijoz uchun loyiha',
    'demo.gift': 'Tug‘ilgan kun sovg‘asi',
    'demo.utilities': 'Elektr, gaz, suv',
    'demo.telecom': 'Internet va mobil aloqa',
    'demo.groceries': 'Supermarket',
    'demo.taxi': 'Taksi va metro',
    'demo.dinner': 'Kechki ovqat',
    'demo.cinema': 'Kino',
    'demo.shopping': 'Xaridlar',
    'demo.pharmacy': 'Dorixona',
  },
};

const LANGS = Object.keys(I18N);
/** Текущий язык (до загрузки хранилища — русский) */
const lang = () => {
  let l;
  try { l = Store.state?.settings?.lang; } catch { /* хранилище ещё не создано */ }
  return LANGS.includes(l) ? l : 'ru';
};
/** Перевод по ключу с подстановкой {параметров} */
function t(key, params = {}) {
  const value = I18N[lang()][key] ?? I18N.ru[key] ?? key;
  return typeof value === 'string' ? value.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? '') : value;
}
const locale = () => t('app.locale');

const CURRENCIES = {
  UZS: { decimals: 0 },            // символ зависит от языка: «сум» / «so‘m»
  USD: { symbol: '$', decimals: 2 },
  EUR: { symbol: '€', decimals: 2 },
  RUB: { symbol: '₽', decimals: 2 },
  KZT: { symbol: '₸', decimals: 0 },
};
const currencySymbol = code => CURRENCIES[code].symbol || t('cur.uzsSymbol');
const currencyName = code => t(`cur.${code}`);

// Сколько сумов стоит 1 единица валюты (редактируется в настройках)
const DEFAULT_RATES = { UZS: 1, USD: 12700, EUR: 13800, RUB: 155, KZT: 25 };

// Тёплая землистая палитра: бирюза, шалфей, крем, апельсин, шоколад, олива
const PALETTE = [
  '#4e7e78', '#6e9886', '#104c64', '#8fb3a3', '#d2781f', '#b6410f',
  '#c0754d', '#d9a95e', '#7a4a2a', '#463f30', '#8c7a5b', '#3a1806',
];

// Стандартные категории: key — для перевода названия (пока пользователь его не переименовал)
const DEFAULT_CATEGORIES = [
  { key: 'salary',       type: 'income',  color: '#4e7e78' },
  { key: 'freelance',    type: 'income',  color: '#6e9886' },
  { key: 'gifts',        type: 'income',  color: '#104c64' },
  { key: 'otherIncome',  type: 'income',  color: '#8c7a5b' },
  { key: 'groceries',    type: 'expense', color: '#d2781f' },
  { key: 'transport',    type: 'expense', color: '#104c64' },
  { key: 'cafe',         type: 'expense', color: '#c0754d' },
  { key: 'utilities',    type: 'expense', color: '#4e7e78' },
  { key: 'telecom',      type: 'expense', color: '#8fb3a3' },
  { key: 'fun',          type: 'expense', color: '#d9a95e' },
  { key: 'health',       type: 'expense', color: '#b6410f' },
  { key: 'shopping',     type: 'expense', color: '#7a4a2a' },
  { key: 'otherExpense', type: 'expense', color: '#463f30' },
];

// Название стандартной категории на любом языке → её key (для уже сохранённых данных)
const DEFAULT_NAME_TO_KEY = Object.fromEntries(
  DEFAULT_CATEGORIES.flatMap(({ key }) => LANGS.map(l => [I18N[l][`cat.${key}`], key])));

/** Отображаемое название категории на текущем языке */
const catName = c => (c.key ? t(`cat.${c.key}`) : c.name);

// Цвета прежней палитры → новые (чтобы обновились уже сохранённые категории)
const LEGACY_COLORS = {
  '#16a36a': '#4e7e78', '#0ea5e9': '#6e9886', '#3b82f6': '#104c64', '#6366f1': '#8fb3a3',
  '#8b5cf6': '#d9a95e', '#a855f7': '#104c64', '#ec4899': '#c0754d', '#ef4444': '#b6410f',
  '#f97316': '#7a4a2a', '#f59e0b': '#d2781f', '#14b8a6': '#4e7e78', '#64748b': '#463f30',
};

const UNCATEGORIZED = { id: null, key: 'none', color: '#a8998a' };

/* =========================================================
   Хранилище (localStorage) + CRUD-репозитории
   ========================================================= */
const uid = () =>
  (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));

function defaultState() {
  return {
    transactions: [],
    categories: DEFAULT_CATEGORIES.map(c => ({ id: uid(), ...c, name: t(`cat.${c.key}`) })),
    settings: { currency: 'UZS', rates: { ...DEFAULT_RATES }, theme: 'auto', lang: lang() },
  };
}

const Store = {
  state: null,

  /** Ключ в браузере: у вошедшего пользователя — свой (копия облачных данных на устройстве) */
  key() {
    return Cloud.user ? `${STORAGE_KEY}:${Cloud.user.email}` : STORAGE_KEY;
  },

  load() {
    try {
      const raw = localStorage.getItem(this.key());
      this.state = raw ? normalizeState(JSON.parse(raw)) : defaultState();
    } catch (e) {
      console.warn('Не удалось прочитать данные, используется состояние по умолчанию', e);
      this.state = defaultState();
    }
  },

  /** Сохраняет в браузер и, если пользователь вошёл, — в облако (Neon) */
  save() {
    this.cache();
    Cloud.schedule();
  },

  cache() {
    try {
      localStorage.setItem(this.key(), JSON.stringify(this.state));
    } catch (e) {
      toast(t('toast.saveFailed'), 'error');
    }
  },

  replace(state) {
    this.state = normalizeState(state);
    this.save();
  },
};

/* =========================================================
   Облако: аккаунт и синхронизация через API на Vercel (данные — в Neon)
   Если API нет (GitHub Pages, локальный просмотр) — приложение работает
   как раньше: без входа, данные только в браузере.
   ========================================================= */
const Cloud = {
  enabled: false, // есть сервер с API
  user: null,     // { email } вошедшего пользователя
  timer: null,
  warned: false,

  async request(path, { method = 'GET', body, keepalive = false } = {}) {
    const res = await fetch(`/api/${path}`, {
      method,
      credentials: 'same-origin',
      keepalive,
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  },

  /** 'local' — сервера нет, 'guest' — нужен вход, 'user' — уже вошли */
  async init() {
    try {
      const r = await this.request('me');
      if (r.status === 401) { this.enabled = true; return 'guest'; }
      if (!r.ok || !r.data.user) return 'local';
      this.enabled = true;
      this.user = r.data.user;
      await this.pull();
      return 'user';
    } catch {
      return 'local';
    }
  },

  /** Загружает данные аккаунта; у нового аккаунта — переносит туда данные этого устройства */
  async pull() {
    const r = await this.request('data');
    if (!r.ok) throw new Error(`pull failed: ${r.status}`);
    if (r.data.data) {
      Store.state = normalizeState(r.data.data);
      Store.cache();
      return { migrated: false };
    }
    // новый аккаунт: в облако уходит то, что было на устройстве до входа (или чистый лист)
    const migrated = Store.state.transactions.length > 0;
    Store.cache();
    await this.push();
    return { migrated };
  },

  /** Сохранение в облако — с задержкой, чтобы серия правок ушла одним запросом */
  schedule() {
    if (!this.user) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.push(), 700);
  },

  async push({ keepalive = false } = {}) {
    clearTimeout(this.timer);
    this.timer = null;
    if (!this.user) return;
    try {
      const r = await this.request('data', { method: 'PUT', body: { data: Store.state }, keepalive });
      if (r.status === 401) return location.reload(); // сессия истекла — на экран входа
      if (!r.ok) throw new Error(`push failed: ${r.status}`);
      this.warned = false;
    } catch (e) {
      console.warn(e);
      if (!this.warned) toast(t('toast.syncFailed'), 'error');
      this.warned = true;
    }
  },

  /** Отправить отложенное сохранение немедленно (перед выходом, закрытием вкладки) */
  flush(opts) {
    return this.timer ? this.push(opts) : Promise.resolve();
  },
};

/** Режим экрана входа: 'login' или 'register' */
let authMode = 'login';

// при закрытии или сворачивании вкладки несохранённые правки уходят сразу
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') Cloud.flush({ keepalive: true });
});

function normalizeState(s) {
  const base = defaultState();
  if (!s || typeof s !== 'object') return base;
  return {
    transactions: Array.isArray(s.transactions) ? s.transactions.filter(isValidTx) : [],
    categories: Array.isArray(s.categories)
      ? s.categories.filter(c => c && c.id && c.name).map(c => ({
        ...c,
        // стандартные категории из старых данных получают key — их название переводится
        key: c.key !== undefined ? c.key : (DEFAULT_NAME_TO_KEY[c.name] ?? null),
        color: LEGACY_COLORS[c.color] || c.color,
      }))
      : base.categories,
    settings: {
      ...base.settings,
      ...(s.settings || {}),
      rates: { ...DEFAULT_RATES, ...((s.settings && s.settings.rates) || {}), UZS: 1 },
    },
  };
}

function isValidTx(t) {
  return t && t.id && (t.type === 'income' || t.type === 'expense') &&
    Number.isFinite(t.amount) && t.amount > 0 && /^\d{4}-\d{2}-\d{2}$/.test(t.date);
}

/** Универсальный CRUD-репозиторий над коллекцией в Store.state */
function createRepository(collection) {
  return {
    // Read
    all: () => Store.state[collection],
    get: id => Store.state[collection].find(item => item.id === id) || null,
    // Create
    create(data) {
      const item = { id: uid(), createdAt: new Date().toISOString(), ...data };
      Store.state[collection].push(item);
      Store.save();
      return item;
    },
    // Update
    update(id, patch) {
      const item = this.get(id);
      if (!item) return null;
      Object.assign(item, patch, { updatedAt: new Date().toISOString() });
      Store.save();
      return item;
    },
    // Delete
    remove(id) {
      const list = Store.state[collection];
      const idx = list.findIndex(item => item.id === id);
      if (idx === -1) return false;
      list.splice(idx, 1);
      Store.save();
      return true;
    },
  };
}

const Transactions = createRepository('transactions');
const Categories = createRepository('categories');

const Settings = {
  get: () => Store.state.settings,
  update(patch) {
    Object.assign(Store.state.settings, patch);
    Store.save();
  },
};

/* =========================================================
   Утилиты
   ========================================================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const escapeHtml = str => String(str ?? '').replace(/[&<>"']/g, ch => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
));

const pad2 = n => String(n).padStart(2, '0');
const toISODate = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const parseISODate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const monthKey = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
const todayISO = () => toISODate(new Date());

function formatDate(iso) {
  return t('formatDate')(parseISODate(iso));
}

function monthLabel(key, withYear = false) {
  const [y, m] = key.split('-').map(Number);
  return t('months')[m - 1] + (withYear ? ` ${String(y).slice(2)}` : '');
}

/** «5 операций» / «5 ta operatsiya» */
const pluralOps = n => t('ops')(n);

/* ---------- Деньги ---------- */
const currentCurrency = () => {
  const code = CURRENCIES[Settings.get().currency] ? Settings.get().currency : 'UZS';
  return { ...CURRENCIES[code], code, symbol: currencySymbol(code), name: currencyName(code) };
};
const currentRate = () => Settings.get().rates[Settings.get().currency] || 1;

/** Из сумов (хранение) в валюту отображения */
const fromBase = amount => amount / currentRate();
/** Из валюты отображения в сумы (хранение) */
const toBase = value => value * currentRate();

function formatNumber(value, decimals = currentCurrency().decimals) {
  return new Intl.NumberFormat(locale(), {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Форматирует значение, уже переведённое в валюту отображения */
function formatDisplay(value, { sign = false } = {}) {
  const cur = currentCurrency();
  const prefix = sign ? (value > 0 ? '+' : value < 0 ? '−' : '') : (value < 0 ? '−' : '');
  return `${prefix}${formatNumber(Math.abs(value), cur.decimals)} ${cur.symbol}`;
}

/** Форматирует сумму из хранилища (в сумах) */
const formatMoney = (amountBase, opts) => formatDisplay(fromBase(amountBase), opts);

/** Компактный формат для осей графиков */
function formatCompact(value) {
  const abs = Math.abs(value);
  const sign = value < 0 ? '−' : '';
  const fmt = n => new Intl.NumberFormat(locale(), { maximumFractionDigits: 1 }).format(n);
  if (abs >= 1e9) return `${sign}${fmt(abs / 1e9)} ${t('num.billion')}`;
  if (abs >= 1e6) return `${sign}${fmt(abs / 1e6)} ${t('num.million')}`;
  if (abs >= 1e3) return `${sign}${fmt(abs / 1e3)} ${t('num.thousand')}`;
  return sign + fmt(abs);
}

function parseAmount(str) {
  const clean = String(str).replace(/\s| /g, '').replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(clean)) return NaN;
  return parseFloat(clean);
}

/** «Красивая» верхняя граница оси */
function niceMax(value) {
  if (value <= 0) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(value)));
  const f = value / exp;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * exp;
}

/** Категория для отображения: с названием на текущем языке */
function getCategory(id) {
  const c = (id && Categories.get(id)) || UNCATEGORIZED;
  return { ...c, name: catName(c) };
}

const catInitial = name => escapeHtml((name || '?').trim().charAt(0).toUpperCase());

/* =========================================================
   UI: тосты, модалки, подсказки
   ========================================================= */
/** duration — сколько оповещение висит на экране (мс), fade — длительность исчезновения */
function toast(message, type = '', { duration = 2600, fade = 300 } = {}) {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  $('#toasts').appendChild(el);
  setTimeout(() => {
    el.style.transition = `opacity ${fade}ms`;
    el.style.opacity = '0';
    setTimeout(() => el.remove(), fade);
  }, duration);
  return el;
}

function openModal(modal) {
  modal.hidden = false;
  const first = modal.querySelector('input:not([type=hidden]), select, button[type=submit]');
  if (first) setTimeout(() => first.focus(), 30);
}

function closeModal(modal) {
  modal.hidden = true;
  if (modal === $('#confirmModal') && confirmResolver) {
    confirmResolver(false);
    confirmResolver = null;
  }
}

let confirmResolver = null;
function confirmDialog({ title = t('confirm.title'), text, okText = t('btn.delete') }) {
  $('#confirmTitle').textContent = title;
  $('#confirmText').textContent = text;
  $('#confirmOk').textContent = okText;
  openModal($('#confirmModal'));
  return new Promise(resolve => { confirmResolver = resolve; });
}

$('#confirmOk').addEventListener('click', () => {
  const resolve = confirmResolver;
  confirmResolver = null;
  $('#confirmModal').hidden = true;
  if (resolve) resolve(true);
});

document.addEventListener('click', e => {
  const closer = e.target.closest('[data-close]');
  if (closer) closeModal(closer.closest('.modal'));
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const open = $$('.modal').filter(m => !m.hidden).pop();
  if (open) closeModal(open);
});

/* Тултипы для графиков: элементы с data-tip.
   При переходе к соседнему месяцу/точке содержимое «перелистывается»:
   курсор ушёл вправо — старый текст уезжает влево, новый заезжает справа (и наоборот). */
const tooltip = $('#tooltip');
const TIP_SLIDE = { duration: 340, easing: 'cubic-bezier(.2, .8, .2, 1)' };
let tipHtml = null; // что показано сейчас
let tipX = 0;       // где находится текущая цель — для направления листания

function showTip(html) {
  tooltip.getAnimations({ subtree: true }).forEach(a => a.cancel());
  tooltip.innerHTML = `<div class="tip-page">${html}</div>`;
  tooltip.hidden = false;
}

function hideTip() {
  if (tooltip.hidden) return;
  tooltip.hidden = true;
  tipHtml = null;
}

/** dir = 1 — новый текст заезжает справа, старый уезжает влево; dir = -1 — наоборот */
function slideTip(html, dir) {
  // если предыдущее листание ещё идёт — убираем всё, кроме последней страницы
  tooltip.getAnimations({ subtree: true }).forEach(a => a.cancel());
  const pages = [...tooltip.querySelectorAll('.tip-page')];
  pages.slice(0, -1).forEach(p => p.remove());
  const oldPage = pages[pages.length - 1];

  const fromWidth = tooltip.offsetWidth;
  const newPage = document.createElement('div');
  newPage.className = 'tip-page';
  newPage.innerHTML = html;
  tooltip.appendChild(newPage);
  if (!oldPage || reduceMotion.matches) { oldPage?.remove(); return; }

  oldPage.classList.add('leaving'); // уходящая страница больше не влияет на размер окошка
  const toWidth = tooltip.offsetWidth;
  const away = `calc(${-dir} * (100% + 16px))`;
  const from = `calc(${dir} * (100% + 16px))`;
  tooltip.animate([{ width: `${fromWidth}px` }, { width: `${toWidth}px` }], TIP_SLIDE);
  oldPage.animate([{ transform: 'translateX(0)', opacity: 1 }, { transform: `translateX(${away})`, opacity: 0 }], TIP_SLIDE)
    .onfinish = () => oldPage.remove();
  newPage.animate([{ transform: `translateX(${from})`, opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }], TIP_SLIDE);
}

document.addEventListener('pointermove', e => {
  const target = e.target.closest && e.target.closest('[data-tip]');
  if (!target) { hideTip(); return; }
  tooltip.style.left = `${e.clientX}px`;
  tooltip.style.top = `${e.clientY}px`;

  const html = target.dataset.tip;
  if (html === tipHtml) return; // тот же месяц (столбец дохода, расхода или колонка целиком)
  const x = target.getBoundingClientRect().left;
  if (tipHtml === null) showTip(html);
  else slideTip(html, x >= tipX ? 1 : -1);
  tipHtml = html;
  tipX = x;
});
document.addEventListener('pointerleave', hideTip);

/* =========================================================
   Навигация
   ========================================================= */
const VIEWS = ['dashboard', 'transactions', 'categories', 'settings'];
let currentView = null;

function showView(name) {
  if (!VIEWS.includes(name)) name = 'dashboard';
  // Повторный выбор уже открытой страницы ничего не делает — анимация только при открытии
  if (name === currentView) return;
  currentView = name;
  $$('.view').forEach(v => v.classList.toggle('active', v.id === `view-${name}`));
  const tabs = $$('.tab[data-view]');
  const prevLeft = new Map(tabs.map(t => [t, t.getBoundingClientRect().left]));
  tabs.forEach(b => b.classList.toggle('active', b.dataset.view === name));
  moveNavPill(prevLeft);
  if (location.hash !== `#${name}`) history.replaceState(null, '', `#${name}`);
  // открытие дашборда: перерисовка под реальную ширину и анимация графиков и чисел с нуля
  if (name === 'dashboard') renderDashboard({ animate: true });
  window.scrollTo({ top: 0 });
}

/**
 * Переносит светлую «пилюлю» под активную вкладку (CSS-переход по позиции и ширине).
 * prevLeft — позиции вкладок до переключения: активная вкладка расширяется под подпись,
 * поэтому соседние сдвигаются — плавно проигрываем этот сдвиг (FLIP).
 */
function moveNavPill(prevLeft) {
  const active = $('.tab.active');
  const pill = $('.tab-pill');
  if (!active || !pill) return;
  pill.style.width = `${active.offsetWidth}px`;
  pill.style.transform = `translateX(${active.offsetLeft}px)`;

  const animate = prevLeft && $('#tabbar').classList.contains('ready') &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!animate) return;
  $$('.tab[data-view]').forEach(tab => {
    const dx = prevLeft.get(tab) - tab.getBoundingClientRect().left;
    if (Math.abs(dx) > 0.5) {
      tab.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }],
        { duration: 500, easing: 'cubic-bezier(.34, 1.3, .64, 1)' });
    }
  });
}

$$('.tab[data-view]').forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));
window.addEventListener('resize', () => moveNavPill());
document.addEventListener('click', e => {
  const goto = e.target.closest('[data-goto]');
  if (goto) showView(goto.dataset.goto);

  const action = e.target.closest('[data-action]');
  if (!action) return;
  switch (action.dataset.action) {
    case 'add-transaction': openTxModal(); break;
    case 'add-income':      openTxModal({ type: 'income' }); break;
    case 'add-expense':     openTxModal({ type: 'expense' }); break;
    case 'add-category':    openCatModal(); break;
  }
});
window.addEventListener('hashchange', () => showView(location.hash.slice(1)));

/* =========================================================
   Дашборд
   ========================================================= */
let donutType = 'expense';

function getPeriod(period) {
  const now = new Date();
  const monthStart = back => new Date(now.getFullYear(), now.getMonth() - back, 1);
  switch (period) {
    case 'month': return { from: monthStart(0), label: t('periodLabel.month'), chartMonths: 6 };
    case '3m':    return { from: monthStart(2), label: t('periodLabel.3m'), chartMonths: 3 };
    case '6m':    return { from: monthStart(5), label: t('periodLabel.6m'), chartMonths: 6 };
    case 'year':  return { from: new Date(now.getFullYear(), 0, 1), label: t('periodLabel.year'), chartMonths: now.getMonth() + 1 };
    default: {
      const dates = Transactions.all().map(t => t.date).sort();
      let months = 6;
      if (dates.length) {
        const first = parseISODate(dates[0]);
        months = (now.getFullYear() - first.getFullYear()) * 12 + now.getMonth() - first.getMonth() + 1;
      }
      return { from: null, label: t('periodLabel.all'), chartMonths: Math.min(Math.max(months, 1), 24) };
    }
  }
}

function lastMonths(count) {
  const now = new Date();
  const keys = [];
  for (let i = count - 1; i >= 0; i--) keys.push(monthKey(new Date(now.getFullYear(), now.getMonth() - i, 1)));
  return keys;
}

/* ---------- Анимация статистики ----------
   При открытии дашборда все графики и числа обнуляются. Каждая карточка проигрывает
   анимацию, когда ВПЕРВЫЕ за это открытие полностью появляется на экране (выше нижней панели).
   Прокрутка туда-обратно, добавление/изменение операций и смена размера окна её не повторяют. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const CHART_SELECTORS = ['#barChart', '#lineChart', '#donutChart'];
const STAT_SELECTORS = ['#statBalance', '#statIncome', '#statExpense', '#statSavings'];
const NAV_SPACE = 90; // px снизу экрана перекрывает плавающая панель навигации

const STAT_FORMATS = {
  money: v => formatMoney(v),
  pct: v => `${Math.round(v)}%`,
};

/** Карточки дашборда, которые анимируются */
const introCards = () =>
  [...STAT_SELECTORS, ...CHART_SELECTORS].map(sel => $(sel).closest('.card, .stat-card'));

/** Карточки, которые в текущее открытие дашборда ещё не показали анимацию */
const pendingIntro = new Set();

const introObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const card = entry.target;
    if (!pendingIntro.has(card) || !entry.isIntersecting) return;
    const root = entry.rootBounds;
    const fullyVisible = entry.intersectionRatio >= 0.98 ||
      // карточка выше экрана: считаем «полностью видной», когда она заняла почти весь экран
      (root && entry.intersectionRect.height >= root.height * 0.9);
    if (!fullyVisible) return;
    pendingIntro.delete(card);
    playIntro(card);
  });
}, {
  rootMargin: `0px 0px -${NAV_SPACE}px 0px`,
  threshold: Array.from({ length: 21 }, (_, i) => i / 20),
});

function playIntro(card) {
  const chart = card.querySelector('.chart');
  if (chart) chart.classList.add('in-view'); // CSS-переходы: столбцы растут, линия рисуется, кольцо заполняется
  const stat = card.querySelector('.stat-value');
  if (stat) countUp(stat);
}

/** Плавный счётчик от нуля до значения */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const fmt = STAT_FORMATS[el.dataset.format];
  cancelAnimationFrame(el._raf);
  if (!Number.isFinite(target)) { el.textContent = '—'; return; }
  if (reduceMotion.matches) { el.textContent = fmt(target); return; }
  el.textContent = fmt(0); // сразу с нуля, без кадра с итоговым числом
  const start = performance.now();
  const duration = 1100;
  const step = now => {
    const p = Math.min(1, (now - start) / duration);
    el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) el._raf = requestAnimationFrame(step);
  };
  el._raf = requestAnimationFrame(step);
}

/** Записывает значение карточки; пока карточка ждёт анимации, показывает 0 */
function setStat(el, value, format) {
  el.dataset.count = Number.isFinite(value) ? value : '';
  el.dataset.format = format;
  cancelAnimationFrame(el._raf);
  const waiting = pendingIntro.has(el.closest('.stat-card'));
  el.textContent = Number.isFinite(value) ? STAT_FORMATS[format](waiting ? 0 : value) : '—';
}

/**
 * animate: true — только при открытии страницы (см. showView): карточки обнуляются
 * и ждут, пока каждая полностью появится на экране. По умолчанию — сразу финальный вид.
 */
function renderDashboard({ animate = false } = {}) {
  const charts = CHART_SELECTORS.map(sel => $(sel));
  const arm = animate && !reduceMotion.matches;
  if (arm) introCards().forEach(card => pendingIntro.add(card));
  // Графики, ждущие анимации, переводятся в нулевое состояние ДО отрисовки:
  // новые столбцы, линия и сектора сразу создаются «пустыми» и потом вырастают
  charts.forEach(el => { if (pendingIntro.has(el.closest('.card'))) el.classList.remove('in-view'); });

  const period = getPeriod($('#dashPeriod').value);
  const fromISO = period.from ? toISODate(period.from) : '0000-00-00';
  const todayStr = todayISO();
  const txs = Transactions.all().filter(t => t.date >= fromISO);

  // --- Карточки ---
  let income = 0, expense = 0, incCount = 0, expCount = 0;
  txs.forEach(t => {
    if (t.type === 'income') { income += t.amount; incCount++; }
    else { expense += t.amount; expCount++; }
  });
  const balance = income - expense;
  const balEl = $('#statBalance');
  balEl.className = `stat-value ${balance > 0 ? 'income' : balance < 0 ? 'expense' : ''}`;
  setStat(balEl, balance, 'money');
  setStat($('#statIncome'), income, 'money');
  setStat($('#statExpense'), expense, 'money');
  setStat($('#statSavings'), income > 0 ? (balance / income) * 100 : null, 'pct');
  $('#statBalanceSub').textContent = period.label;
  $('#statIncomeCount').textContent = pluralOps(incCount);
  $('#statExpenseCount').textContent = pluralOps(expCount);

  // --- Графики ---
  const months = lastMonths(period.chartMonths);
  renderBarChart(months);
  renderLineChart(months);
  renderDonut(txs);
  renderRecent(todayStr);

  // остальные графики — сразу в финальном виде
  charts.forEach(el => { if (!pendingIntro.has(el.closest('.card'))) el.classList.add('in-view'); });

  // Переподписка заставляет наблюдателя сразу проверить видимость: карточки,
  // уже полностью видные при открытии, начнут анимацию в следующем кадре
  if (arm) {
    introCards().forEach(card => { introObserver.unobserve(card); introObserver.observe(card); });
  }
}

function aggregateByMonth(months) {
  const map = new Map(months.map(k => [k, { key: k, income: 0, expense: 0 }]));
  Transactions.all().forEach(t => {
    const row = map.get(t.date.slice(0, 7));
    if (row) row[t.type] += t.amount;
  });
  return [...map.values()];
}

function chartSize(el, height) {
  const width = Math.max(300, el.clientWidth || el.parentElement.clientWidth || 600);
  return { W: width, H: height };
}

function yAxis(max, min, pad, W, y) {
  let out = '';
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = min + ((max - min) / steps) * i;
    const yy = y(v);
    out += `<line class="${v === 0 ? 'zero-line' : 'grid-line'}" x1="${pad.l}" x2="${W - pad.r}" y1="${yy}" y2="${yy}"/>`;
    out += `<text class="axis-text" x="${pad.l - 8}" y="${yy + 4}" text-anchor="end">${formatCompact(v)}</text>`;
  }
  return out;
}

function renderBarChart(months) {
  const el = $('#barChart');
  const data = aggregateByMonth(months).map(d => ({ ...d, income: fromBase(d.income), expense: fromBase(d.expense) }));
  const maxVal = Math.max(...data.map(d => Math.max(d.income, d.expense)));
  if (!maxVal) {
    el.innerHTML = `<div class="chart-empty">${t('chart.emptyPeriod')}</div>`;
    return;
  }

  const { W, H } = chartSize(el, 280);
  const pad = { t: 12, r: 8, b: 28, l: 64 };
  const max = niceMax(maxVal);
  const innerH = H - pad.t - pad.b;
  const y = v => pad.t + innerH - (v / max) * innerH;
  const groupW = (W - pad.l - pad.r) / data.length;
  const barW = Math.max(4, Math.min(26, groupW * 0.32));
  const gap = Math.min(4, barW * 0.2);
  const showYear = months[0].slice(0, 4) !== months[months.length - 1].slice(0, 4);
  const labelEvery = Math.ceil(data.length / Math.floor((W - pad.l) / 44));

  // объёмные столбцы: сверху светлее, к основанию — насыщенный цвет (цвета задаются в CSS)
  let svg = `<defs>
    <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="g-inc-top"/><stop offset="1" class="g-inc"/></linearGradient>
    <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="g-exp-top"/><stop offset="1" class="g-exp"/></linearGradient>
  </defs>`;
  svg += yAxis(max, 0, pad, W, y);
  const barRadius = Math.min(barW / 2, 8);
  data.forEach((d, i) => {
    const cx = pad.l + groupW * i + groupW / 2;
    const tip = `<b>${monthLabel(d.key, true)}</b><br>${t('common.income')}: ${formatDisplay(d.income)}` +
      `<br>${t('common.expense')}: ${formatDisplay(d.expense)}<br>${t('common.total')}: ${formatDisplay(d.income - d.expense, { sign: true })}`;
    // --d — задержка, чтобы столбцы вырастали по очереди слева направо
    const bar = (cls, v, x, delay) => {
      const h = Math.max(v > 0 ? 2 : 0, innerH * (v / max));
      return `<rect class="bar ${cls}" x="${x}" y="${pad.t + innerH - h}" width="${barW}" height="${h}" rx="${Math.min(barRadius, h / 2)}" style="--d:${delay}ms" data-tip="${escapeHtml(tip)}"/>`;
    };
    svg += bar('bar-income', d.income, cx - barW - gap / 2, i * 90);
    svg += bar('bar-expense', d.expense, cx + gap / 2, i * 90 + 70);
    // невидимая область для подсказки по всей колонке
    svg += `<rect x="${cx - groupW / 2}" y="${pad.t}" width="${groupW}" height="${innerH}" fill="transparent" data-tip="${escapeHtml(tip)}"/>`;
    if (i % labelEvery === 0) {
      svg += `<text class="axis-text" x="${cx}" y="${H - 8}" text-anchor="middle">${monthLabel(d.key, showYear)}</text>`;
    }
  });

  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeHtml(t('chart.byMonth'))}">${svg}</svg>`;
}

function renderLineChart(months) {
  const el = $('#lineChart');
  const all = Transactions.all();
  if (!all.length) {
    el.innerHTML = `<div class="chart-empty">${t('chart.emptyLine')}</div>`;
    return;
  }
  // Накопленный баланс на конец каждого месяца
  const points = months.map(key => {
    let bal = 0;
    all.forEach(t => { if (t.date.slice(0, 7) <= key) bal += t.type === 'income' ? t.amount : -t.amount; });
    return { key, value: fromBase(bal) };
  });

  const { W, H } = chartSize(el, 240);
  const pad = { t: 14, r: 14, b: 28, l: 64 };
  const values = points.map(p => p.value);
  const rawMax = Math.max(0, ...values);
  const rawMin = Math.min(0, ...values);
  const max = rawMax > 0 ? niceMax(rawMax) : 0;
  const min = rawMin < 0 ? -niceMax(-rawMin) : 0;
  const range = (max - min) || 1;
  const innerH = H - pad.t - pad.b;
  const innerW = W - pad.l - pad.r;
  const y = v => pad.t + innerH - ((v - min) / range) * innerH;
  const x = i => pad.l + (points.length === 1 ? innerW / 2 : (innerW / (points.length - 1)) * i);
  const labelEvery = Math.ceil(points.length / Math.floor(innerW / 44));
  const showYear = months[0].slice(0, 4) !== months[months.length - 1].slice(0, 4);

  // мягкая заливка под линией: плотнее у линии, прозрачная к низу
  let svg = `<defs><linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" class="g-area-top"/><stop offset="1" class="g-area-bottom"/></linearGradient></defs>`;
  svg += yAxis(max, min, pad, W, y);
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p.value)}`).join(' ');
  const zeroY = y(Math.max(min, Math.min(0, max)));
  svg += `<path class="area" d="${path} L${x(points.length - 1)},${zeroY} L${x(0)},${zeroY} Z"/>`;
  svg += `<path class="line" d="${path}" pathLength="1"/>`;
  points.forEach((p, i) => {
    const tip = `<b>${monthLabel(p.key, true)}</b><br>${t('stat.balance')}: ${formatDisplay(p.value)}`;
    // точка появляется, когда до неё «дорисовывается» линия
    const delay = points.length === 1 ? 0.6 : (1.3 * i) / (points.length - 1);
    svg += `<circle class="point" cx="${x(i)}" cy="${y(p.value)}" r="4" style="--d:${delay.toFixed(2)}s" data-tip="${escapeHtml(tip)}"/>`;
    if (i % labelEvery === 0) {
      svg += `<text class="axis-text" x="${x(i)}" y="${H - 8}" text-anchor="middle">${monthLabel(p.key, showYear)}</text>`;
    }
  });

  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeHtml(t('chart.balance'))}">${svg}</svg>`;
}

function renderDonut(txs) {
  const el = $('#donutChart');
  const legend = $('#donutLegend');
  const byCat = new Map();
  txs.filter(t => t.type === donutType).forEach(t => {
    const key = t.categoryId || '__none';
    byCat.set(key, (byCat.get(key) || 0) + t.amount);
  });
  const rows = [...byCat.entries()]
    .map(([id, sum]) => ({ key: id, cat: getCategory(id === '__none' ? null : id), sum }))
    .sort((a, b) => b.sum - a.sum);
  const total = rows.reduce((s, r) => s + r.sum, 0);
  donutFocusKey = null;
  el.classList.remove('has-focus');
  legend.classList.remove('has-focus');
  clearTimeout(legend._unlock);
  legend.style.height = '';

  if (!total) {
    el.innerHTML = '';
    legend.innerHTML = `<li class="muted">${t(donutType === 'expense' ? 'donut.noExpense' : 'donut.noIncome')}</li>`;
    return;
  }

  const R = 70, C = 2 * Math.PI * R;
  const SWEEP = 1.1; // секунд на полный круг
  let offset = 0;
  let svg = `<circle class="ring-bg" cx="100" cy="100" r="${R}" fill="none" stroke="var(--grid)" stroke-width="26"/>`;
  rows.forEach(r => {
    const len = (r.sum / total) * C;
    // сектора «заполняются» по кругу один за другим
    const vars = `--dash:${Math.max(0, len - (rows.length > 1 ? 1.5 : 0)).toFixed(2)}px;--gap:${C.toFixed(2)}px;` +
      `--d:${((offset / C) * SWEEP).toFixed(3)}s;--t:${Math.max(0.05, (len / C) * SWEEP).toFixed(3)}s`;
    svg += `<circle class="slice" cx="100" cy="100" r="${R}" fill="none" stroke="${r.cat.color}" stroke-width="26"
      stroke-dashoffset="${-offset}" style="${vars}"
      data-key="${escapeHtml(r.key)}" data-name="${escapeHtml(r.cat.name)}" data-value="${escapeHtml(formatCompact(fromBase(r.sum)))}"
      transform="rotate(-90 100 100)"/>`;
    offset += len;
  });
  const totalText = formatCompact(fromBase(total));
  svg += `<text class="donut-center-label" x="100" y="94" text-anchor="middle">${escapeHtml(t('donut.total'))}</text>`;
  svg += `<text class="donut-center-value" x="100" y="114" text-anchor="middle" data-total="${escapeHtml(totalText)}">${escapeHtml(totalText)}</text>`;
  el.innerHTML = `<svg viewBox="0 0 200 200" role="img" aria-label="${escapeHtml(t('chart.structureAria'))}">${svg}</svg>`;

  const top = rows.slice(0, 7);
  const rest = rows.slice(7).reduce((s, r) => s + r.sum, 0);
  if (rest) top.push({ key: '__rest', cat: { name: t('donut.rest'), color: '#a8998a' }, sum: rest });
  legend.innerHTML = top.map((r, i) => `
    <li data-key="${escapeHtml(r.key)}" data-index="${i}">
      <i class="dot" style="background:${r.cat.color}"></i>
      <span class="name">${escapeHtml(r.cat.name)}<small class="amt">${formatMoney(r.sum)}</small></span>
      <span class="pct">${Math.round((r.sum / total) * 100)}%</span>
    </li>`).join('');
}

/* ---------- Наведение на сектор: категория крупно в первой строке, остальные ниже ---------- */
let donutFocusKey = null;

function focusDonut(key) {
  if (key === donutFocusKey) return;
  donutFocusKey = key;
  const chart = $('#donutChart');
  const legend = $('#donutLegend');
  const items = [...legend.querySelectorAll('li[data-key]')];
  if (!items.length) return;

  // Высота легенды на время выделения фиксируется — карточка не вытягивается по вертикали,
  // а строки сжимаются внутри неё
  clearTimeout(legend._unlock);
  if (key && !legend.style.height) legend.style.height = `${legend.offsetHeight}px`;
  if (!key) legend._unlock = setTimeout(() => { legend.style.height = ''; }, 450);

  // FLIP: запоминаем, где строки легенды находятся сейчас
  const first = new Map(items.map(li => [li, li.getBoundingClientRect().top]));
  items.forEach(li => li.getAnimations().forEach(a => a.cancel()));

  // сектора, не попавшие в легенду, относятся к строке «Остальное»
  const legendKey = key && (items.some(li => li.dataset.key === key) ? key : '__rest');
  chart.classList.toggle('has-focus', Boolean(key));
  legend.classList.toggle('has-focus', Boolean(key));
  $$('.slice', chart).forEach(s => s.classList.toggle('focus', s.dataset.key === key));
  items.forEach(li => li.classList.toggle('focus', li.dataset.key === legendKey));

  // выбранная категория поднимается в первую строку, остальные уходят ниже по исходному порядку
  const ordered = [...items].sort((a, b) => a.dataset.index - b.dataset.index);
  const focused = ordered.find(li => li.dataset.key === legendKey);
  if (focused) ordered.unshift(...ordered.splice(ordered.indexOf(focused), 1));
  ordered.forEach(li => legend.appendChild(li));

  // подпись в центре круга
  const label = $('.donut-center-label', chart);
  const value = $('.donut-center-value', chart);
  const slice = key && $$('.slice', chart).find(s => s.dataset.key === key);
  if (label && value) {
    const name = slice ? slice.dataset.name : t('donut.total');
    label.textContent = name.length > 16 ? name.slice(0, 15) + '…' : name;
    value.textContent = slice ? slice.dataset.value : value.dataset.total;
  }

  if (reduceMotion.matches) return;
  items.forEach(li => {
    const dy = first.get(li) - li.getBoundingClientRect().top;
    if (Math.abs(dy) > 0.5) {
      li.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }],
        { duration: 420, easing: 'cubic-bezier(.2, .8, .2, 1)' });
    }
  });
}

$('#donutChart').addEventListener('pointerover', e => {
  // тонкие зазоры между секторами — тоже кольцо: не сбрасываем выбор, чтобы не мигало
  if (e.target.closest('.ring-bg')) return;
  const slice = e.target.closest('.slice');
  focusDonut(slice ? slice.dataset.key : null);
});
$('#donutChart').addEventListener('pointerleave', () => focusDonut(null));

function renderRecent() {
  const list = $('#recentList');
  const recent = sortTransactions(Transactions.all(), 'date-desc').slice(0, 6);
  if (!recent.length) {
    list.innerHTML = `<li class="empty-row">${t('recent.empty')}</li>`;
    return;
  }
  list.innerHTML = recent.map(tx => {
    const cat = getCategory(tx.categoryId);
    return `
      <li>
        <span class="cat-icon" style="background:${cat.color}">${catInitial(cat.name)}</span>
        <div class="item-main">
          <span class="item-title">${escapeHtml(tx.note || cat.name)}</span>
          <span class="item-sub">${escapeHtml(cat.name)} · ${formatDate(tx.date)}</span>
        </div>
        <span class="amount ${tx.type}">${formatMoney(tx.type === 'income' ? tx.amount : -tx.amount, { sign: true })}</span>
        <button class="icon-btn" data-edit-tx="${tx.id}" aria-label="${t('action.edit')}">${ICON_EDIT}</button>
      </li>`;
  }).join('');
}

$('#dashPeriod').addEventListener('change', () => renderDashboard());
$('#donutType').addEventListener('click', e => {
  const btn = e.target.closest('.seg');
  if (!btn) return;
  donutType = btn.dataset.type;
  $$('#donutType .seg').forEach(b => b.classList.toggle('active', b === btn));
  renderDashboard();
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if ($('#view-dashboard').classList.contains('active')) renderDashboard();
  }, 150);
});

/* =========================================================
   Операции: список (Read) + фильтры
   ========================================================= */
const ICON_EDIT = '<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zM20.7 7.04a1 1 0 000-1.41l-2.33-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.82-1.83z"/></svg>';
const ICON_DELETE = '<svg viewBox="0 0 24 24"><path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';

function sortTransactions(list, mode) {
  const arr = [...list];
  const byDate = (a, b) => a.date.localeCompare(b.date) || (a.createdAt || '').localeCompare(b.createdAt || '');
  switch (mode) {
    case 'date-asc':    return arr.sort(byDate);
    case 'amount-desc': return arr.sort((a, b) => b.amount - a.amount);
    case 'amount-asc':  return arr.sort((a, b) => a.amount - b.amount);
    default:            return arr.sort((a, b) => byDate(b, a));
  }
}

function getFilteredTransactions() {
  const q = $('#fSearch').value.trim().toLowerCase();
  const type = $('#fType').value;
  const cat = $('#fCategory').value;
  const month = $('#fMonth').value;

  const filtered = Transactions.all().filter(t => {
    if (type !== 'all' && t.type !== type) return false;
    if (cat !== 'all' && (t.categoryId || '__none') !== cat) return false;
    if (month && !t.date.startsWith(month)) return false;
    if (q) {
      const hay = `${t.note || ''} ${getCategory(t.categoryId).name}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  return sortTransactions(filtered, $('#fSort').value);
}

function renderTransactions() {
  const list = getFilteredTransactions();
  const body = $('#txBody');
  const hasAny = Transactions.all().length > 0;

  const edit = t('action.edit'), del = t('action.delete');
  body.innerHTML = list.map(tx => {
    const cat = getCategory(tx.categoryId);
    const signed = tx.type === 'income' ? tx.amount : -tx.amount;
    return `
      <tr>
        <td class="td-date">${formatDate(tx.date)}</td>
        <td class="td-cat">
          <div class="cat-cell">
            <span class="cat-icon" style="background:${cat.color}">${catInitial(cat.name)}</span>
            <span>${escapeHtml(cat.name)}</span>
          </div>
        </td>
        <td class="note">${escapeHtml(tx.note) || '—'}</td>
        <td class="num"><span class="amount ${tx.type}">${formatMoney(signed, { sign: true })}</span></td>
        <td class="td-actions">
          <div class="row-actions">
            <button class="icon-btn" data-edit-tx="${tx.id}" aria-label="${edit}" title="${edit}">${ICON_EDIT}</button>
            <button class="icon-btn danger" data-delete-tx="${tx.id}" aria-label="${del}" title="${del}">${ICON_DELETE}</button>
          </div>
        </td>
      </tr>`;
  }).join('');

  const empty = $('#txEmpty');
  empty.hidden = list.length > 0;
  empty.querySelector('p').textContent = t(hasAny ? 'tx.emptyFiltered' : 'tx.emptyNone');
  empty.querySelector('button').hidden = hasAny;

  const inc = list.filter(tx => tx.type === 'income').reduce((s, tx) => s + tx.amount, 0);
  const exp = list.filter(tx => tx.type === 'expense').reduce((s, tx) => s + tx.amount, 0);
  $('#txFoot').hidden = !list.length;
  $('#txFoot').innerHTML = `
    <span>${t('tx.found')}: <b>${list.length}</b></span>
    <span>${t('common.income')}: <b class="income">${formatMoney(inc)}</b></span>
    <span>${t('common.expense')}: <b class="expense">${formatMoney(exp)}</b></span>
    <span>${t('common.total')}: <b>${formatMoney(inc - exp, { sign: true })}</b></span>`;
}

function renderCategoryFilter() {
  const sel = $('#fCategory');
  const current = sel.value;
  const opt = c => `<option value="${c.id}">${escapeHtml(catName(c))}</option>`;
  const cats = Categories.all();
  sel.innerHTML = `
    <option value="all">${t('tx.allCats')}</option>
    <optgroup label="${escapeHtml(t('common.income'))}">${cats.filter(c => c.type === 'income').map(opt).join('')}</optgroup>
    <optgroup label="${escapeHtml(t('common.expense'))}">${cats.filter(c => c.type === 'expense').map(opt).join('')}</optgroup>
    <option value="__none">${t('cat.none')}</option>`;
  sel.value = [...sel.options].some(o => o.value === current) ? current : 'all';
}

['#fSearch', '#fType', '#fCategory', '#fMonth', '#fSort'].forEach(sel => {
  $(sel).addEventListener('input', renderTransactions);
});
$('#fReset').addEventListener('click', () => {
  $('#fSearch').value = '';
  $('#fType').value = 'all';
  $('#fCategory').value = 'all';
  $('#fMonth').value = '';
  $('#fSort').value = 'date-desc';
  renderTransactions();
});

document.addEventListener('click', e => {
  const edit = e.target.closest('[data-edit-tx]');
  if (edit) {
    const tx = Transactions.get(edit.dataset.editTx);
    if (tx) openTxModal(tx);
    return;
  }
  const del = e.target.closest('[data-delete-tx]');
  if (del) deleteTransaction(del.dataset.deleteTx);
});

/* =========================================================
   Операции: форма (Create / Update / Delete)
   ========================================================= */
const txForm = $('#txForm');
let txType = 'expense';
let txOriginal = null; // для сохранения точной суммы, если пользователь её не менял

/**
 * Переключатель «Доход / Расход»: пилюля переезжает к выбранному варианту (CSS-переход),
 * по пути чуть растягивается, как капля, а цвет перетекает между зелёным и оранжевым
 */
function moveSegPill(container, type) {
  const prev = container.dataset.active;
  container.dataset.active = type;
  if (!prev || prev === type || reduceMotion.matches) return;
  container.animate(
    [{ scale: '1 1' }, { scale: '1.12 .9', offset: 0.4 }, { scale: '1 1' }],
    { duration: 520, easing: 'ease-out', pseudoElement: '::before' });
}

function setTxType(type) {
  txType = type;
  $$('#txType .seg').forEach(b => b.classList.toggle('active', b.dataset.type === type));
  moveSegPill($('#txType'), type);
  const sel = $('#txCategory');
  const prev = sel.value;
  const cats = Categories.all().filter(c => c.type === type);
  sel.innerHTML = cats.map(c => `<option value="${c.id}">${escapeHtml(catName(c))}</option>`).join('') +
    `<option value="">${t('cat.none')}</option>`;
  if ([...sel.options].some(o => o.value === prev)) sel.value = prev;
}

function amountToInput(amountBase) {
  const v = fromBase(amountBase);
  const d = currentCurrency().decimals;
  return String(Math.round(v * 10 ** d) / 10 ** d);
}

function openTxModal(tx = {}) {
  clearErrors(txForm);
  const isEdit = Boolean(tx.id);
  $('#txModalTitle').textContent = t(isEdit ? 'tx.edit' : 'tx.new');
  $('#txId').value = tx.id || '';
  $('#txDelete').hidden = !isEdit;
  $$('.cur-label').forEach(el => { el.textContent = currentCurrency().symbol; });

  setTxType(tx.type || 'expense');
  $('#txCategory').value = isEdit ? (tx.categoryId || '') : ($('#txCategory').options[0]?.value || '');
  const amountStr = isEdit ? amountToInput(tx.amount) : '';
  $('#txAmount').value = amountStr;
  $('#txDate').value = tx.date || todayISO();
  $('#txNote').value = tx.note || '';
  txOriginal = isEdit ? { amountStr, amount: tx.amount } : null;
  openModal($('#txModal'));
}

$('#txType').addEventListener('click', e => {
  const btn = e.target.closest('.seg');
  if (btn) setTxType(btn.dataset.type);
});

function clearErrors(form) {
  $$('.error', form).forEach(el => { el.textContent = ''; });
  $$('.invalid', form).forEach(el => el.classList.remove('invalid'));
}

function setError(form, id, message) {
  $(`#${id}`).classList.add('invalid');
  $(`.error[data-for="${id}"]`, form).textContent = message;
}

txForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors(txForm);

  const id = $('#txId').value;
  const amountStr = $('#txAmount').value.trim();
  const value = parseAmount(amountStr);
  const date = $('#txDate').value;
  let ok = true;

  if (!amountStr) { setError(txForm, 'txAmount', t('err.amountRequired')); ok = false; }
  else if (!Number.isFinite(value) || value <= 0) { setError(txForm, 'txAmount', t('err.amountPositive')); ok = false; }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { setError(txForm, 'txDate', t('err.dateRequired')); ok = false; }
  if (!ok) return;

  const amount = txOriginal && txOriginal.amountStr === amountStr ? txOriginal.amount : toBase(value);
  const data = {
    type: txType,
    amount,
    categoryId: $('#txCategory').value || null,
    date,
    note: $('#txNote').value.trim(),
  };

  if (id) {
    Transactions.update(id, data);
    toast(t('toast.txUpdated'));
  } else {
    Transactions.create(data);
    toast(t(txType === 'income' ? 'toast.incomeAdded' : 'toast.expenseAdded'));
  }
  closeModal($('#txModal'));
  renderAll();
});

$('#txDelete').addEventListener('click', async () => {
  const id = $('#txId').value;
  closeModal($('#txModal'));
  await deleteTransaction(id);
});

async function deleteTransaction(id) {
  const tx = Transactions.get(id);
  if (!tx) return;
  const ok = await confirmDialog({
    title: t('confirm.deleteTxTitle'),
    text: t('confirm.deleteTxText', { cat: getCategory(tx.categoryId).name, amount: formatMoney(tx.amount), date: formatDate(tx.date) }),
  });
  if (!ok) return;
  Transactions.remove(id);
  toast(t('toast.txDeleted'));
  renderAll();
}

/* =========================================================
   Категории (CRUD)
   ========================================================= */
const catForm = $('#catForm');
let catType = 'expense';
let catColor = PALETTE[0];

function renderCategories() {
  const stats = new Map();
  Transactions.all().forEach(t => {
    const s = stats.get(t.categoryId) || { count: 0, sum: 0 };
    s.count++; s.sum += t.amount;
    stats.set(t.categoryId, s);
  });

  const edit = t('action.edit'), del = t('action.delete');
  const renderList = type => {
    const cats = Categories.all().filter(c => c.type === type);
    if (!cats.length) return `<li class="muted">${t('cats.empty')}</li>`;
    return cats.map(c => {
      const s = stats.get(c.id) || { count: 0, sum: 0 };
      const name = catName(c);
      return `
        <li>
          <span class="cat-icon" style="background:${c.color}">${catInitial(name)}</span>
          <div class="item-main">
            <span class="item-title">${escapeHtml(name)}</span>
            <span class="item-sub">${pluralOps(s.count)}${s.count ? ' · ' + formatMoney(s.sum) : ''}</span>
          </div>
          <div class="row-actions">
            <button class="icon-btn" data-edit-cat="${c.id}" aria-label="${edit}" title="${edit}">${ICON_EDIT}</button>
            <button class="icon-btn danger" data-delete-cat="${c.id}" aria-label="${del}" title="${del}">${ICON_DELETE}</button>
          </div>
        </li>`;
    }).join('');
  };
  $('#catIncome').innerHTML = renderList('income');
  $('#catExpense').innerHTML = renderList('expense');
}

function setCatType(type) {
  catType = type;
  $$('#catType .seg').forEach(b => b.classList.toggle('active', b.dataset.type === type));
  moveSegPill($('#catType'), type);
}

function setCatColor(color) {
  catColor = color;
  $$('#catColors .swatch').forEach(s => s.classList.toggle('active', s.dataset.color === color));
}

function renderSwatches() {
  $('#catColors').innerHTML = PALETTE.map(c =>
    `<button type="button" class="swatch${c === catColor ? ' active' : ''}" data-color="${c}" style="background:${c}" aria-label="${t('field.colorAria', { color: c })}"></button>`).join('');
}
renderSwatches();
$('#catColors').addEventListener('click', e => {
  const s = e.target.closest('.swatch');
  if (s) setCatColor(s.dataset.color);
});
$('#catType').addEventListener('click', e => {
  const btn = e.target.closest('.seg');
  if (btn) setCatType(btn.dataset.type);
});

function openCatModal(cat = {}) {
  clearErrors(catForm);
  const isEdit = Boolean(cat.id);
  $('#catModalTitle').textContent = t(isEdit ? 'cats.editTitle' : 'cats.newTitle');
  $('#catId').value = cat.id || '';
  $('#catName').value = isEdit ? catName(cat) : '';
  setCatType(cat.type || 'expense');
  setCatColor(cat.color || PALETTE[Categories.all().length % PALETTE.length]);
  openModal($('#catModal'));
}

catForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors(catForm);
  const id = $('#catId').value;
  const name = $('#catName').value.trim();

  if (!name) return setError(catForm, 'catName', t('err.nameRequired'));
  const duplicate = Categories.all().some(c =>
    c.id !== id && c.type === catType && catName(c).toLowerCase() === name.toLowerCase());
  if (duplicate) return setError(catForm, 'catName', t('err.nameDuplicate'));

  if (id) {
    const old = Categories.get(id);
    // Смена типа категории: операции этой категории остаются, но меняют тип вместе с ней
    if (old && old.type !== catType) {
      Transactions.all().forEach(tx => { if (tx.categoryId === id) tx.type = catType; });
    }
    // если название стандартной категории не меняли — она продолжает переводиться
    const key = old && old.key && name === catName(old) ? old.key : null;
    Categories.update(id, { name, key, type: catType, color: catColor });
    toast(t('toast.catUpdated'));
  } else {
    Categories.create({ name, key: null, type: catType, color: catColor });
    toast(t('toast.catCreated'));
  }
  closeModal($('#catModal'));
  renderAll();
});

document.addEventListener('click', async e => {
  const edit = e.target.closest('[data-edit-cat]');
  if (edit) {
    const cat = Categories.get(edit.dataset.editCat);
    if (cat) openCatModal(cat);
    return;
  }
  const del = e.target.closest('[data-delete-cat]');
  if (!del) return;
  const cat = Categories.get(del.dataset.deleteCat);
  if (!cat) return;
  const used = Transactions.all().filter(tx => tx.categoryId === cat.id);
  const ok = await confirmDialog({
    title: t('confirm.deleteCatTitle', { name: catName(cat) }),
    text: used.length
      ? t('confirm.deleteCatUsed', { ops: pluralOps(used.length) })
      : t('confirm.deleteCatUnused'),
  });
  if (!ok) return;
  used.forEach(tx => { tx.categoryId = null; });
  Categories.remove(cat.id);
  toast(t('toast.catDeleted'));
  renderAll();
});

/* =========================================================
   Настройки
   ========================================================= */
function renderSettings() {
  const s = Settings.get();
  $('#sCurrency').innerHTML = Object.keys(CURRENCIES)
    .map(code => `<option value="${code}">${escapeHtml(currencyName(code))} (${escapeHtml(currencySymbol(code))})</option>`).join('');
  $('#sCurrency').value = s.currency;
  $('#sTheme').value = s.theme;
  $('#sRates').innerHTML = Object.keys(CURRENCIES)
    .filter(code => code !== 'UZS')
    .map(code => `
      <label class="rate-row">
        <span>1 ${currencySymbol(code)}</span>
        <input type="text" inputmode="decimal" class="input" data-rate="${code}" value="${s.rates[code]}" aria-label="${escapeHtml(t('settings.rateAria', { code }))}">
      </label>`).join('');
}

$('#sCurrency').addEventListener('change', e => {
  Settings.update({ currency: e.target.value });
  toast(t('toast.currency', { name: currentCurrency().name }));
  renderAll();
});

$('#sSaveRates').addEventListener('click', () => {
  const rates = { ...Settings.get().rates };
  for (const input of $$('[data-rate]')) {
    const v = parseAmount(input.value);
    if (!Number.isFinite(v) || v <= 0) {
      input.classList.add('invalid');
      input.focus();
      return toast(t('toast.rateInvalid'), 'error');
    }
    input.classList.remove('invalid');
    rates[input.dataset.rate] = v;
  }
  Settings.update({ rates });
  toast(t('toast.ratesSaved'));
  renderAll();
});

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme() {
  const theme = Settings.get().theme;
  const dark = theme === 'dark' || (theme === 'auto' && darkQuery.matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}
darkQuery.addEventListener('change', applyTheme);
$('#sTheme').addEventListener('change', e => {
  Settings.update({ theme: e.target.value });
  applyTheme();
});

$('#sExport').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(Store.state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `finance-${todayISO()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast(t('toast.exported'));
});

$('#sImport').addEventListener('change', async e => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    if (!parsed || !Array.isArray(parsed.transactions)) throw new Error('bad format');
    const ok = await confirmDialog({
      title: t('confirm.importTitle'),
      text: t('confirm.importText', { ops: pluralOps(parsed.transactions.length) }),
      okText: t('confirm.importOk'),
    });
    if (!ok) return;
    Store.replace(parsed);
    applyTheme();
    applyLanguage();
    toast(t('toast.imported'));
  } catch {
    toast(t('toast.importFailed'), 'error');
  }
});

$('#sDemo').addEventListener('click', async () => {
  if (Transactions.all().length) {
    const ok = await confirmDialog({
      title: t('confirm.demoTitle'),
      text: t('confirm.demoText'),
      okText: t('confirm.demoOk'),
    });
    if (!ok) return;
  }
  generateDemoData();
  toast(t('toast.demoAdded'));
  renderAll();
});

$('#sReset').addEventListener('click', async () => {
  const ok = await confirmDialog({
    title: t('confirm.resetTitle'),
    text: t('confirm.resetText'),
    okText: t('confirm.resetOk'),
  });
  if (!ok) return;
  Store.replace(defaultState()); // язык интерфейса сохраняется
  applyTheme();
  toast(t('toast.allDeleted'));
  renderAll();
});

function generateDemoData() {
  // категории ищем по ключу, а если стандартную удалили — по названию на текущем языке
  const catByKey = key => (Categories.all().find(c => c.key === key) ||
    Categories.all().find(c => c.name === t(`cat.${key}`)))?.id || null;
  const rnd = (min, max, step = 1000) => Math.round((min + Math.random() * (max - min)) / step) * step;
  const now = new Date();
  const today = todayISO();
  const list = [];
  // описания операций — на текущем языке интерфейса
  const add = (type, cat, amount, date, note) => {
    const iso = toISODate(date);
    if (iso <= today) list.push({ id: uid(), createdAt: new Date().toISOString(), type, amount, categoryId: catByKey(cat), date: iso, note: t(`demo.${note}`) });
  };

  for (let m = 5; m >= 0; m--) {
    const y = now.getFullYear(), mo = now.getMonth() - m;
    const d = day => new Date(y, mo, day);
    add('income', 'salary', rnd(9_000_000, 11_000_000, 100_000), d(5), 'salary');
    if (Math.random() > 0.4) add('income', 'freelance', rnd(1_500_000, 4_000_000, 50_000), d(18), 'project');
    if (m === 2) add('income', 'gifts', 1_000_000, d(12), 'gift');
    add('expense', 'utilities', rnd(500_000, 900_000), d(10), 'utilities');
    add('expense', 'telecom', 150_000, d(3), 'telecom');
    [2, 9, 16, 23].forEach(day => add('expense', 'groceries', rnd(350_000, 750_000), d(day), 'groceries'));
    [4, 14, 24].forEach(day => add('expense', 'transport', rnd(60_000, 180_000), d(day), 'taxi'));
    [7, 20].forEach(day => add('expense', 'cafe', rnd(150_000, 450_000), d(day), 'dinner'));
    add('expense', 'fun', rnd(100_000, 400_000), d(15), 'cinema');
    if (Math.random() > 0.5) add('expense', 'shopping', rnd(400_000, 1_500_000), d(21), 'shopping');
    if (Math.random() > 0.6) add('expense', 'health', rnd(100_000, 500_000), d(26), 'pharmacy');
  }
  Store.state.transactions = list;
  Store.save();
}

/* =========================================================
   Язык интерфейса
   ========================================================= */
/** Переводит статичную разметку: data-i18n — текст, data-i18n-attr="атрибут=ключ;…" — атрибуты */
function translateStatic() {
  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split('=');
      el.setAttribute(attr.trim(), t(key.trim()));
    });
  });
  document.documentElement.lang = lang();
  document.title = t('app.title');
  // переключатели (в шапке и на экране входа): подложка уезжает под выбранный язык
  $$('.lang-switch').forEach(sw => {
    sw.dataset.lang = lang();
    $$('button', sw).forEach(b => b.setAttribute('aria-checked', String(b.dataset.lang === lang())));
  });
  // заголовок, подпись и кнопка экрана входа зависят от режима
  translateAuth();
  // политика открывается на текущем языке
  $$('.privacy-link').forEach(a => { a.href = `privacy.html?lang=${lang()}`; });
}

/** Применяет язык ко всему приложению */
function applyLanguage({ animate = false } = {}) {
  hideTip();
  translateStatic();
  renderSwatches();
  renderAll();
  moveNavPill(); // подпись активной вкладки сменила длину
  // открытые окна операции / категории тоже переводятся
  if (!$('#txModal').hidden) {
    $('#txModalTitle').textContent = t($('#txId').value ? 'tx.edit' : 'tx.new');
    $$('.cur-label').forEach(el => { el.textContent = currentCurrency().symbol; });
    setTxType(txType);
  }
  if (!$('#catModal').hidden) $('#catModalTitle').textContent = t($('#catId').value ? 'cats.editTitle' : 'cats.newTitle');

  // новые тексты мягко проявляются
  if (animate && !reduceMotion.matches) {
    $$('.view.active [data-i18n], .topbar [data-i18n], .tab.active .tab-label, .view.active .chart, .view.active .stat-value, .view.active .stat-sub, .view.active .recent-list, .view.active .donut-legend, .view.active #txBody, .view.active .cat-list')
      .forEach(el => el.animate(
        [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }],
        { duration: 380, easing: 'cubic-bezier(.2, .8, .2, 1)' }));
  }
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.lang-switch button[data-lang]');
  if (!btn || btn.dataset.lang === lang()) return;
  Settings.update({ lang: btn.dataset.lang });
  applyLanguage({ animate: true });
  // короткое оповещение; при частом переключении предыдущее сразу убирается, а не копится
  $$('.toast.lang').forEach(el => el.remove());
  toast(t('lang.changed'), 'lang', { duration: 1200, fade: 200 });
});

/* =========================================================
   Инициализация
   ========================================================= */
function renderAll() {
  renderCategoryFilter();
  renderDashboard();
  renderTransactions();
  renderCategories();
  renderSettings();
}

/* =========================================================
   Аккаунт: экран входа / регистрации и меню в шапке
   ========================================================= */
/* Режимы экрана: login — вход, register — регистрация,
   forgot — запрос кода на почту, reset — ввод кода и нового пароля */
const AUTH_UI = {
  login:    { title: 'auth.title',         subtitle: 'auth.subtitle',       submit: 'auth.submitLogin',    password: 'auth.password' },
  register: { title: 'auth.titleRegister', subtitle: 'auth.subtitle',       submit: 'auth.submitRegister', password: 'auth.password' },
  forgot:   { title: 'auth.titleForgot',   subtitle: 'auth.subtitleForgot', submit: 'auth.submitForgot',   password: 'auth.password' },
  reset:    { title: 'auth.titleReset',    subtitle: 'auth.subtitleReset',  submit: 'auth.submitReset',    password: 'auth.newPassword' },
};
let resendTimer = null;
let resendAt = 0;
let codeSentTo = '';

/** Тексты экрана входа на текущем языке (вызывается из translateStatic) */
function translateAuth() {
  const ui = AUTH_UI[authMode];
  $('#authTitle').textContent = t(ui.title);
  $('#authSubtitle').textContent = t(ui.subtitle);
  $('#authSubmit').textContent = t(ui.submit);
  $('#authPasswordLabel').textContent = t(ui.password);
  if (authMode === 'reset') {
    $('#authInfo').textContent = t('auth.codeSent', { email: codeSentTo });
    updateResend();
  }
}

function setAuthMode(mode) {
  authMode = mode;
  const tabs = mode === 'login' || mode === 'register';
  const newPassword = mode === 'register' || mode === 'reset';
  $('#authMode').hidden = !tabs;
  if (tabs) {
    $$('#authMode .seg').forEach(b => b.classList.toggle('active', b.dataset.type === mode));
    moveSegPill($('#authMode'), mode);
  }
  $('#authBack').hidden = tabs;
  $('#authEmail').readOnly = mode === 'reset';
  $('#authCodeField').hidden = mode !== 'reset';
  $('#authPasswordField').hidden = mode === 'forgot';
  $('#authPassword').autocomplete = mode === 'login' ? 'current-password' : 'new-password';
  $('#authHint').hidden = !newPassword;
  $('#authRepeatField').hidden = !newPassword;
  $('#authForgot').hidden = mode !== 'login';
  $('#authInfo').hidden = mode !== 'reset';
  $('#authResend').hidden = mode !== 'reset';
  $('#authPassword').value = '';
  $('#authPassword2').value = '';
  $('#authCode').value = '';
  $$('#authForm .invalid').forEach(el => el.classList.remove('invalid'));
  $('#authError').textContent = '';
  translateStatic();
  // фокус — на поле, которое заполняют первым
  const first = mode === 'reset' ? '#authCode' : '#authEmail';
  setTimeout(() => $(first).focus(), 30);
}

/** Кнопка «Отправить код ещё раз» доступна через 60 секунд после отправки */
function updateResend() {
  const btn = $('#authResend');
  const left = Math.ceil((resendAt - Date.now()) / 1000);
  btn.disabled = left > 0;
  btn.textContent = left > 0 ? t('auth.resendIn', { s: left }) : t('auth.resend');
  if (left <= 0) { clearInterval(resendTimer); resendTimer = null; }
}

function startResendTimer() {
  resendAt = Date.now() + 60_000;
  clearInterval(resendTimer);
  resendTimer = setInterval(updateResend, 1000);
  updateResend();
}

/** Запросить код на почту; true — письмо (возможно) отправлено */
async function requestResetCode(email) {
  const error = $('#authError');
  const r = await Cloud.request('forgot', { method: 'POST', body: { email, lang: lang() } });
  if (!r.ok) {
    error.textContent = t(AUTH_ERRORS[r.data.error] || 'auth.err.network');
    return false;
  }
  codeSentTo = email;
  return true;
}

$('#authForgot').addEventListener('click', () => setAuthMode('forgot'));
$('#authBack').addEventListener('click', () => setAuthMode('login'));
$('#authResend').addEventListener('click', async () => {
  const btn = $('#authResend');
  btn.disabled = true;
  $('#authError').textContent = '';
  try {
    if (await requestResetCode(codeSentTo)) startResendTimer();
    else updateResend();
  } catch {
    $('#authError').textContent = t('auth.err.network');
    updateResend();
  }
});
// в поле кода — только цифры
$('#authCode').addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6); });

function showAuth() {
  document.body.classList.remove('booting');
  document.body.classList.add('auth-mode');
  $('#authScreen').hidden = false;
  setTimeout(() => $('#authEmail').focus(), 50);
}

$('#authMode').addEventListener('click', e => {
  const btn = e.target.closest('.seg');
  if (btn && btn.dataset.type !== authMode) setAuthMode(btn.dataset.type);
});

const AUTH_ERRORS = {
  invalid_credentials: 'auth.err.invalid',
  email_taken: 'auth.err.taken',
  invalid_email: 'auth.err.email',
  weak_password: 'auth.err.password',
  code_expired: 'auth.err.codeExpired',
  too_many_attempts: 'auth.err.attempts',
  too_many_requests: 'auth.err.tooMany',
  mail_not_configured: 'auth.err.mailOff',
};

$('#authForm').addEventListener('submit', async e => {
  e.preventDefault();
  const email = $('#authEmail').value.trim();
  const password = $('#authPassword').value;
  const code = $('#authCode').value;
  const error = $('#authError');
  const newPassword = authMode === 'register' || authMode === 'reset';
  error.textContent = '';
  // проверка до отправки — сразу понятная подсказка
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { error.textContent = t('auth.err.email'); return; }
  if (authMode === 'reset' && !/^\d{6}$/.test(code)) {
    error.textContent = t('auth.err.code');
    $('#authCode').classList.add('invalid');
    $('#authCode').focus();
    return;
  }
  if (newPassword && password.length < 8) { error.textContent = t('auth.err.password'); return; }
  if (newPassword && password !== $('#authPassword2').value) {
    error.textContent = t('auth.err.mismatch');
    $('#authPassword2').classList.add('invalid');
    $('#authPassword2').focus();
    return;
  }
  if (authMode === 'login' && !password) { error.textContent = t('auth.err.invalid'); return; }

  const submit = $('#authSubmit');
  submit.disabled = true;
  submit.textContent = t('auth.busy');
  try {
    // шаг 1 восстановления: отправить код и перейти к его вводу
    if (authMode === 'forgot') {
      if (await requestResetCode(email)) {
        setAuthMode('reset');
        startResendTimer();
      }
      return;
    }
    const body = authMode === 'reset' ? { email, code, password } : { email, password };
    const r = await Cloud.request(authMode, { method: 'POST', body });
    if (!r.ok) {
      const err = r.data.error;
      error.textContent = err === 'invalid_code'
        ? t('auth.err.invalidCode', { n: r.data.attemptsLeft ?? '—' })
        : t(AUTH_ERRORS[err] || 'auth.err.network');
      if (err === 'invalid_code') { $('#authCode').classList.add('invalid'); $('#authCode').select(); }
      return;
    }
    const wasReset = authMode === 'reset';
    Cloud.user = r.data.user;
    const { migrated } = await Cloud.pull();
    $('#authPassword').value = '';
    $('#authPassword2').value = '';
    clearInterval(resendTimer);
    startApp();
    toast(t(wasReset ? 'toast.passwordChanged' : migrated ? 'toast.migrated' : 'toast.welcome'));
  } catch (err) {
    console.warn(err);
    error.textContent = t('auth.err.network');
  } finally {
    submit.disabled = false;
    translateStatic(); // вернуть текст кнопки
  }
});

// пока вводят повтор пароля, рамка подсказывает: красная — не совпадает, обычная — совпало
['#authPassword', '#authPassword2'].forEach(sel => $(sel).addEventListener('input', () => {
  const repeat = $('#authPassword2');
  const mismatch = repeat.value && repeat.value !== $('#authPassword').value.slice(0, repeat.value.length);
  repeat.classList.toggle('invalid', Boolean(mismatch));
  if (!mismatch && $('#authError').textContent === t('auth.err.mismatch')) $('#authError').textContent = '';
}));

function renderAccount() {
  const box = $('#account');
  box.hidden = !Cloud.user;
  if (!Cloud.user) return;
  $('#accountEmail').textContent = Cloud.user.email;
  $('#accountCard').hidden = false;
  $('#accountCardEmail').textContent = Cloud.user.email;
  $('#accountAvatar').textContent = Cloud.user.email.charAt(0).toUpperCase();
  // в настройках — подсказка, что данные теперь в облаке
  $('#dataHint').dataset.i18n = 'settings.cloudHint';
}

/* ---------- Удаление аккаунта (требование Google Play: пользователь может удалить аккаунт сам) ---------- */
$('#deleteAccountBtn').addEventListener('click', () => {
  $('#deletePassword').value = '';
  $('#deletePassword').classList.remove('invalid');
  $('#deleteError').textContent = '';
  openModal($('#deleteModal'));
});

$('#deleteForm').addEventListener('submit', async e => {
  e.preventDefault();
  const password = $('#deletePassword').value;
  const error = $('#deleteError');
  error.textContent = '';
  if (!password) { error.textContent = t('account.err.password'); $('#deletePassword').focus(); return; }

  const btn = $('#deleteConfirm');
  btn.disabled = true;
  btn.textContent = t('auth.busy');
  try {
    clearTimeout(Cloud.timer); // несохранённые правки удаляемого аккаунта больше не отправляем
    Cloud.timer = null;
    const r = await Cloud.request('delete-account', { method: 'POST', body: { password } });
    if (!r.ok) {
      error.textContent = t(r.data.error === 'wrong_password' ? 'account.err.password' : 'auth.err.network');
      $('#deletePassword').classList.add('invalid');
      $('#deletePassword').select();
      return;
    }
    // копия данных аккаунта на этом устройстве тоже стирается
    try { localStorage.removeItem(Store.key()); } catch { /* ничего страшного */ }
    Cloud.user = null;
    closeModal($('#deleteModal'));
    toast(t('toast.accountDeleted'));
    setTimeout(() => location.reload(), 1200); // на экран входа
  } catch {
    error.textContent = t('auth.err.network');
  } finally {
    btn.disabled = false;
    btn.textContent = t('account.deleteConfirm');
  }
});

$('#logoutBtn').addEventListener('click', async () => {
  await Cloud.flush();
  await Cloud.request('logout', { method: 'POST' }).catch(() => {});
  try { localStorage.removeItem(Store.key()); } catch { /* ничего страшного */ }
  location.reload(); // заново — уже на экран входа
});

/* =========================================================
   Запуск
   ========================================================= */
function startApp() {
  document.body.classList.remove('booting', 'auth-mode');
  $('#authScreen').hidden = true;
  renderAccount();
  applyTheme();
  applyLanguage(); // переводит разметку и рисует все разделы
  currentView = null;
  showView(location.hash.slice(1) || 'dashboard');
  // Включаем анимацию «пилюли» только после первой отрисовки, чтобы она не «прилетала» при загрузке
  requestAnimationFrame(() => requestAnimationFrame(() => $('#tabbar').classList.add('ready')));
}

(async function boot() {
  // страница всегда открывается сверху (браузер не восстанавливает старую прокрутку),
  // чтобы анимации карточек шли по порядку при прокрутке вниз
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  Store.load(); // настройки устройства: язык и тема нужны уже экрану входа
  applyTheme();
  translateStatic();
  const mode = await Cloud.init();
  if (mode === 'guest') showAuth();
  else startApp();
})();

// Синхронизация между вкладками
window.addEventListener('storage', e => {
  if (e.key !== Store.key()) return;
  Store.load();
  applyTheme();
  applyLanguage();
});
