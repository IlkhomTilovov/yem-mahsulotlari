import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Factory,
  Globe2,
  Leaf,
  PackageCheck,
  FileDown,
  MessageCircle,
  Send,
  Mail,
  Menu,
  X,
  CheckCircle2,
  Truck,
  Award,
  FlaskConical,
  Building2,
  Sparkles,
  Quote,
} from "lucide-react";

import factoryHero from "@/assets/factory-hero.jpg";
import factoryLine from "@/assets/factory-line.jpg";
import privateLabelImg from "@/assets/private-label.jpg";
import dryDog from "@/assets/product-dry-dog.jpg";
import wetDog from "@/assets/product-wet-dog.jpg";
import dryCat from "@/assets/product-dry-cat.jpg";
import wetCat from "@/assets/product-wet-cat.jpg";
import treats from "@/assets/product-treats.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Steppe Nutrition — O'zbekistondagi uy hayvonlari ozuqasi ishlab chiqaruvchisi va eksportchisi" },
      { name: "description", content: "O'zbekistondan ishonchli B2B uy hayvonlari ozuqasi yetkazib beruvchi hamkor. Mushuk va itlar uchun quruq va ho'l ozuqa. Private label, eksportga tayyor sertifikatlar, raqobatbardosh narxlar." },
      { property: "og:title", content: "Steppe Nutrition — Uy hayvonlari ozuqasi ishlab chiqaruvchi va eksportchi" },
      { property: "og:description", content: "Markaziy Osiyodan ishonchli uy hayvonlari ozuqasi yetkazib beruvchi hamkoringiz. Private label OEM, ISO sertifikatlangan, 20+ davlatga eksport." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Steppe Nutrition",
        description: "O'zbekistonda joylashgan uy hayvonlari ozuqasi ishlab chiqaruvchi va eksportchi. Mushuk va itlar uchun quruq va ho'l ozuqa. Xalqaro distribyutorlar uchun Private label OEM hamkor.",
        address: { "@type": "PostalAddress", addressCountry: "UZ", addressLocality: "Toshkent" },
      }),
    }],
  }),
  component: Landing,
});

/* ---------------- i18n ---------------- */
type Lang = "UZ" | "RU" | "EN";

const T = {
  UZ: {
    nav: { about: "Kompaniya", products: "Mahsulotlar", privateLabel: "Private Label", quality: "Sifat", production: "Ishlab chiqarish", export: "Eksport", contact: "Aloqa" },
    cta: { quote: "Narx so'rash", catalog: "Katalogni yuklab olish", startPL: "Private Label loyihasini boshlash", sendInquiry: "So'rovni yuborish", reqQuote: "Narx so'rash", reqSample: "Namuna so'rash" },
    hero: {
      eyebrow: "B2B ishlab chiqaruvchi · Eksportchi",
      titleA: "Markaziy Osiyodan uy hayvonlari ozuqasi yetkazib beruvchi",
      titleHi: " ishonchli hamkoringiz",
      titleB: ".",
      sub: "Biz mushuk va itlar uchun eksportga tayyor quruq va ho'l ozuqa ishlab chiqaramiz — sertifikatlangan sifat, doimiy yetkazib berish va sizning marjangizni himoya qiluvchi private-label moslashuvchanligi.",
      feats: ["ISO 22000 sertifikatlangan", "MOQ 5 tonnadan", "FOB va CIF qo'llab-quvvatlanadi", "Private-label OEM", "Veterinariya tasdig'i", "24 soat ichida javob"],
      stats: [{ k: "20+", v: "Eksport davlatlari" }, { k: "12k t", v: "Yillik quvvat" }, { k: "ISO", v: "22000 sertifikati" }],
      imgAlt: "O'zbekistondagi Steppe Nutrition zavodida uy hayvonlari ozuqasi ishlab chiqarish liniyasi",
    },
    trust: ["ISO 22000", "HACCP", "Halal Sertifikati", "EAC", "Veterinariya Tasdig'i", "GMP+"],
    about: {
      eyebrow: "Kompaniya haqida",
      title: "Bir tom ostida — ishlab chiqaruvchi va eksportchi.",
      body: "Steppe Nutrition — Toshkentda joylashgan vertikal integratsiyalangan uy hayvonlari ozuqasi ishlab chiqaruvchisi. Biz retsept ishlab chiqishdan tortib ekstruziya, qadoqlash va xalqaro yetkazib berishgacha bo'lgan barcha jarayonlarni nazorat qilamiz — shuning uchun B2B hamkorlarimiz doimiy sifat va prognoz qilinadigan muddatlar uchun yagona, mas'uliyatli manbaga ega bo'ladilar.",
      stats: [
        { k: "12 000+", v: "Tonna / yil quvvat" },
        { k: "20+", v: "Eksport davlatlari" },
        { k: "12", v: "Yillik tajriba" },
        { k: "40+", v: "Mahsulot turlari (SKU)" },
      ],
    },
    products: {
      eyebrow: "Mahsulotlar katalogi",
      title: "Distribyutorlar, importyorlar va private-label hamkorlar uchun yaratilgan.",
      subtitle: "Beshta asosiy yo'nalish, 40+ SKU. Barcha retseptlar sertifikatlangan veterinar-nutritsionistlar tomonidan tuzilgan, sizning yoki bizning spetsifikatsiyamiz bo'yicha ishlab chiqariladi.",
      cats: { All: "Barchasi", Dog: "It", Cat: "Mushuk", Snacks: "Shirinliklar" },
      downloadPdf: "To'liq katalogni yuklab oling (PDF) →",
      spec: { protein: "Protein", pack: "Qadoqlash", shelf: "Saqlash muddati" },
      items: [
        { name: "Premium quruq it ozuqasi", category: "Dog", catLabel: "It · Quruq", img: dryDog, protein: "26%", sizes: "1, 3, 10, 20 kg", shelf: "18 oy" },
        { name: "Sousli ho'l it ozuqasi", category: "Dog", catLabel: "It · Ho'l", img: wetDog, protein: "10%", sizes: "100, 200, 400 g", shelf: "24 oy" },
        { name: "Kattalar uchun quruq mushuk ozuqasi", category: "Cat", catLabel: "Mushuk · Quruq", img: dryCat, protein: "32%", sizes: "0.4, 1.5, 5, 10 kg", shelf: "18 oy" },
        { name: "Pate ho'l mushuk ozuqasi", category: "Cat", catLabel: "Mushuk · Ho'l", img: wetCat, protein: "11%", sizes: "85, 100, 200 g", shelf: "24 oy" },
        { name: "Tabiiy go'shtli shirinliklar", category: "Snacks", catLabel: "Shirinliklar", img: treats, protein: "55%", sizes: "50, 100, 250 g", shelf: "12 oy" },
        { name: "Kuchukcha va mushukcha qatori", category: "Dog Cat", catLabel: "It · Mushuk · Quruq", img: dryDog, protein: "30%", sizes: "0.5, 1.5, 5 kg", shelf: "18 oy" },
      ],
    },
    pl: {
      eyebrow: "Private label ishlab chiqarish",
      titleA: "Sizning brendingiz,",
      titleB: "bizning ishlab chiqarishimiz.",
      body: "Hamkorlarimizning aksariyati mahsulotimizni o'z brendi ostida sotadi. Biz buning uchun yaratilganmiz: maxsus ishlab chiqarish, sizning qadoqlashingiz, sizning retseptingiz — va zavoddan to'g'ridan-to'g'ri narxlar tufayli yuqori marja.",
      steps: [
        { n: "01", t: "Retsept", d: "Bizning isbotlangan formulalarimizdan birini ishlating yoki nutritsionistlarimiz bilan birga o'zingiznikini yarating." },
        { n: "02", t: "Qadoqlash", d: "Sizning brendingiz, sizning dizayningiz — paketlar, banka, do'ppi. To'liq art-work qo'llab-quvvatlash." },
        { n: "03", t: "Ishlab chiqarish", d: "To'liq sifat nazorati va laboratoriya tekshiruvi bilan alohida partiyalarda ishlab chiqariladi." },
        { n: "04", t: "Eksport", d: "FOB, CIF, DAP. Konteynerlar barcha hujjatlar bilan yuklanadi, bojxonadan o'tishga tayyor." },
      ],
      imgAlt: "Private label uy hayvonlari ozuqasi qadoqlash maketi",
    },
    quality: {
      eyebrow: "Sifat va sertifikatlar",
      title: "Kelishuvga bormaydigan xaridorlar uchun ishonch markazi.",
      subtitle: "Har bir partiya kuzatiladi. Har bir yetkazib berish tekshiriladi. Har qanday sertifikat so'rov bo'yicha taqdim etiladi.",
      certs: [
        { t: "ISO 22000", d: "Oziq-ovqat xavfsizligi boshqaruvi" },
        { t: "HACCP", d: "Xavf-xatarlarni tahlil qilish tizimi" },
        { t: "GMP+", d: "Yaxshi ishlab chiqarish amaliyoti" },
        { t: "Halal", d: "Sertifikatlangan ishlab chiqarish liniyasi" },
        { t: "EAC", d: "Yevroosiyo muvofiqligi" },
        { t: "Vet. Cert.", d: "Davlat veterinariya tasdig'i" },
      ],
      points: [
        { t: "O'z laboratoriyamizda tekshirish", d: "Har bir partiya chiqarilishidan oldin protein, yog', namlik, kul va mikrobiologik xavfsizlik bo'yicha tekshiriladi." },
        { t: "To'liq kuzatuv", d: "Lot kodlari xom ashyodan tayyor pallet gacha bog'langan — talab bo'yicha auditdan o'tkaziladi." },
        { t: "Eksport hujjatlari tayyor", d: "Sog'liq sertifikatlari, kelib chiqish sertifikatlari, laboratoriya hisobotlari va bojxona hujjatlari har bir konteyner bilan birga yetkaziladi." },
      ],
    },
    prod: {
      eyebrow: "Zavod ichida",
      title: "O'zbekistonda ishlab chiqarilgan, dunyo uchun qurilgan.",
      sub: "Zamonaviy Yevropa ekstruziya liniyalarida yiliga 12 000+ tonna quvvat. Shaffof, auditlanadigan ishlab chiqarish — istalgan vaqtda tashrif buyurishingiz mumkin.",
      steps: ["Xom ashyoni qabul qilish", "Retseptni shakllantirish", "Ekstruziya va quritish", "Qoplama va sovutish", "Laboratoriya QC chiqarish", "Qadoqlash va palletlash"],
      imgAlt: "Zamonaviy uy hayvonlari ozuqasi ekstruziya ishlab chiqarish liniyasi",
    },
    exp: {
      eyebrow: "Eksport va logistika",
      title: "Konteynerga tayyor, bojxonaga tayyor, hamkorlikka tayyor.",
      subtitle: "Biz eksport tomonini boshqaramiz — sizning import tomoningiz silliq ishlaydi.",
      items: [
        { t: "Incoterms qo'llab-quvvatlanadi", d: "EXW, FOB, CFR, CIF, DAP. Sizning logistikangizga moslashuvchan." },
        { t: "Eksport qadoqlash", d: "Ko'p qatlamli, namlikka chidamli, 40' HC konteynerlar uchun optimallashtirilgan." },
        { t: "Bojxona hujjatlari", d: "Fitosanitariya, sog'liq, kelib chiqish va laboratoriya sertifikatlari kiritilgan." },
        { t: "Butun dunyo bo'ylab yetkazib berish", d: "Toshkent va hamkor portlar orqali dengiz, avtomobil va temir yo'l yuk tashish." },
      ],
      currentlyExporting: "Hozirgi eksport davlatlari",
      countriesTitle: "Yevroosiyo va undan tashqaridagi 20+ davlat",
      countries: ["Qozog'iston", "Qirg'iziston", "Turkmaniston", "Tojikiston", "Rossiya", "Belarus", "Gruziya", "Ozarbayjon", "Armaniston", "Turkiya", "BAA", "Saudiya Arabistoni", "Iroq", "Mo'g'uliston", "Vetnam", "Xitoy"],
    },
    social: {
      eyebrow: "Xalqaro hamkorlar ishonadi",
      title: "Biz bilan brendlarini quruvchi distribyutorlar.",
      testimonials: [
        { q: "Doimiy sifat, partiyadan partiyaga, private-label moslashuvchanligi esa bizga o'z brendimizni 8 oyda ishga tushirish imkonini berdi.", a: "Distribyutor, Qozog'iston" },
        { q: "Hujjatlar birinchi konteyner bilan mukammal yetib keldi. Bojxonadan bironta kechikishsiz o'tdi.", a: "Importyor, BAA" },
      ],
    },
    contact: {
      eyebrow: "Narx so'rovi",
      title: "So'rovni boshlang. Biz 24 soat ichida javob beramiz.",
      labels: { name: "To'liq ism", company: "Kompaniya", country: "Davlat", email: "Email", message: "Sizga nima kerak?" },
      messagePh: "Mahsulot, hajm, qadoqlash, manzil porti…",
      privacy: "Yuborish orqali siz bizning eksport jamoamiz bilan bog'lanishga rozilik bildirasiz. Hech qanday spam yo'q.",
      received: "So'rov qabul qilindi.",
      receivedSub: "Eksport jamoamiz 24 soat ichida narx, MOQ va namuna variantlari bilan javob beradi.",
      hq: "Bosh ofis",
      city: "Toshkent, O'zbekiston",
      hours: "Du–Sha · 09:00–18:00 (UTC+5) · O'zbek, Rus, Ingliz",
      ctas: { wa: "WhatsApp orqali yozish", tg: "Telegram orqali yozish", em: "Email yuborish" },
    },
    footer: {
      blurb: "Toshkent, O'zbekistondan uy hayvonlari ozuqasi ishlab chiqaruvchi va eksportchi. Butun dunyo bo'ylab distribyutorlar va private-label brendlar uchun ishlab chiqarish hamkori.",
      cols: {
        Company: { title: "Kompaniya", links: ["Kompaniya haqida", "Ishlab chiqarish", "Sifat", "Eksport"] },
        Products: { title: "Mahsulotlar", links: ["Quruq it ozuqasi", "Ho'l it ozuqasi", "Quruq mushuk ozuqasi", "Ho'l mushuk ozuqasi", "Shirinliklar"] },
        Partners: { title: "Hamkorlar", links: ["Private Label", "Distribyutorlar", "Katalog"] },
        Contact: { title: "Aloqa", links: ["Narx so'rash", "WhatsApp", "Telegram", "Email"] },
      },
      copyright: "Steppe Nutrition MChJ · O'zbekistonda ishlab chiqarilgan",
    },
  },
  RU: {
    nav: { about: "Компания", products: "Продукция", privateLabel: "Private Label", quality: "Качество", production: "Производство", export: "Экспорт", contact: "Контакты" },
    cta: { quote: "Запросить цену", catalog: "Скачать каталог", startPL: "Начать Private Label проект", sendInquiry: "Отправить запрос", reqQuote: "Запросить цену", reqSample: "Запросить образец" },
    hero: {
      eyebrow: "B2B Производитель · Экспортёр",
      titleA: "Ваш надёжный партнёр по поставкам кормов для животных из",
      titleHi: " Центральной Азии",
      titleB: ".",
      sub: "Мы производим готовые к экспорту сухие и влажные корма для кошек и собак — сертифицированное качество, стабильные поставки и гибкость private-label, которая защищает вашу маржу.",
      feats: ["Сертификат ISO 22000", "MOQ от 5 тонн", "Поддержка FOB и CIF", "Private-label OEM", "Ветеринарное одобрение", "Ответ в течение 24 часов"],
      stats: [{ k: "20+", v: "Стран экспорта" }, { k: "12k т", v: "Годовая мощность" }, { k: "ISO", v: "22000 сертификат" }],
      imgAlt: "Линия производства кормов для животных на заводе Steppe Nutrition в Узбекистане",
    },
    trust: ["ISO 22000", "HACCP", "Халяль", "EAC", "Ветеринарное одобрение", "GMP+"],
    about: {
      eyebrow: "О компании",
      title: "Производитель и экспортёр — под одной крышей.",
      body: "Steppe Nutrition — вертикально интегрированный производитель кормов для животных в Ташкенте, Узбекистан. Мы контролируем всё: от разработки рецептов и экструзии до упаковки и международной отгрузки — поэтому наши B2B партнёры получают единый, ответственный источник стабильного качества и предсказуемых сроков.",
      stats: [
        { k: "12 000+", v: "Тонн / год мощность" },
        { k: "20+", v: "Стран экспорта" },
        { k: "12", v: "Лет на рынке" },
        { k: "40+", v: "SKU в категориях" },
      ],
    },
    products: {
      eyebrow: "Каталог продукции",
      title: "Создано для дистрибьюторов, импортёров и private-label партнёров.",
      subtitle: "Пять основных линий, 40+ SKU. Все рецепты разработаны сертифицированными ветеринарами-нутрициологами, производство по вашей или нашей спецификации.",
      cats: { All: "Все", Dog: "Собаки", Cat: "Кошки", Snacks: "Лакомства" },
      downloadPdf: "Скачать полный каталог (PDF) →",
      spec: { protein: "Протеин", pack: "Упаковка", shelf: "Срок годности" },
      items: [
        { name: "Премиум сухой корм для собак", category: "Dog", catLabel: "Собака · Сухой", img: dryDog, protein: "26%", sizes: "1, 3, 10, 20 кг", shelf: "18 мес" },
        { name: "Влажный корм для собак в соусе", category: "Dog", catLabel: "Собака · Влажный", img: wetDog, protein: "10%", sizes: "100, 200, 400 г", shelf: "24 мес" },
        { name: "Сухой корм для взрослых кошек", category: "Cat", catLabel: "Кошка · Сухой", img: dryCat, protein: "32%", sizes: "0.4, 1.5, 5, 10 кг", shelf: "18 мес" },
        { name: "Влажный паштет для кошек", category: "Cat", catLabel: "Кошка · Влажный", img: wetCat, protein: "11%", sizes: "85, 100, 200 г", shelf: "24 мес" },
        { name: "Натуральные мясные лакомства", category: "Snacks", catLabel: "Лакомства", img: treats, protein: "55%", sizes: "50, 100, 250 г", shelf: "12 мес" },
        { name: "Линия для щенков и котят", category: "Dog Cat", catLabel: "Собака · Кошка · Сухой", img: dryDog, protein: "30%", sizes: "0.5, 1.5, 5 кг", shelf: "18 мес" },
      ],
    },
    pl: {
      eyebrow: "Private label производство",
      titleA: "Ваш бренд,",
      titleB: "наше производство.",
      body: "Большинство наших партнёров продают продукцию под собственным брендом. Мы для этого созданы: отдельные производственные циклы, ваша упаковка, ваш рецепт — и маржа, которую обеспечивает прямая цена с завода.",
      steps: [
        { n: "01", t: "Рецепт", d: "Используйте одну из наших проверенных формул или разработайте свою с нашими нутрициологами." },
        { n: "02", t: "Упаковка", d: "Ваш бренд, ваш дизайн — пакеты, банки, паучи. Полная поддержка дизайна." },
        { n: "03", t: "Производство", d: "Отдельные циклы с полным контролем качества и лабораторными испытаниями." },
        { n: "04", t: "Экспорт", d: "FOB, CIF, DAP. Контейнеры загружаются со всей документацией, готовы к таможне." },
      ],
      imgAlt: "Макет упаковки кормов private label",
    },
    quality: {
      eyebrow: "Качество и сертификаты",
      title: "Центр доверия для покупателей, которые не идут на компромиссы.",
      subtitle: "Каждая партия отслеживается. Каждая отгрузка тестируется. Любой сертификат предоставляется по запросу.",
      certs: [
        { t: "ISO 22000", d: "Управление пищевой безопасностью" },
        { t: "HACCP", d: "Система анализа рисков" },
        { t: "GMP+", d: "Надлежащая производственная практика" },
        { t: "Halal", d: "Сертифицированная линия" },
        { t: "EAC", d: "Евразийское соответствие" },
        { t: "Vet. Cert.", d: "Государственное вет. одобрение" },
      ],
      points: [
        { t: "Собственная лаборатория", d: "Каждая партия тестируется на белок, жир, влажность, золу и микробиологию перед выпуском." },
        { t: "Полная прослеживаемость", d: "Лот-коды связаны от сырья до готового поддона — аудит по запросу." },
        { t: "Готовая экспортная документация", d: "Сертификаты здоровья, происхождения, лабораторные отчёты и таможенные документы с каждым контейнером." },
      ],
    },
    prod: {
      eyebrow: "Внутри завода",
      title: "Произведено в Узбекистане, создано для мира.",
      sub: "Более 12 000 тонн годовой мощности на современных европейских экструзионных линиях. Прозрачное, проверяемое производство — приглашаем посетить в любое время.",
      steps: ["Приём сырья", "Формирование рецепта", "Экструзия и сушка", "Покрытие и охлаждение", "Лабораторный QC", "Упаковка и палетирование"],
      imgAlt: "Современная экструзионная линия производства кормов",
    },
    exp: {
      eyebrow: "Экспорт и логистика",
      title: "Готовы к контейнеру, таможне и партнёрству.",
      subtitle: "Мы берём на себя экспортную сторону — ваша импортная сторона работает гладко.",
      items: [
        { t: "Инкотермс", d: "EXW, FOB, CFR, CIF, DAP. Гибко под вашу логистику." },
        { t: "Экспортная упаковка", d: "Многослойная, влагостойкая, оптимизирована для 40' HC." },
        { t: "Таможенные документы", d: "Фитосанитарные, здоровья, происхождения и лабораторные." },
        { t: "Доставка по миру", d: "Море, авто и ж/д через Ташкент и партнёрские порты." },
      ],
      currentlyExporting: "Сейчас экспортируем в",
      countriesTitle: "Более 20 стран по Евразии и за её пределами",
      countries: ["Казахстан", "Кыргызстан", "Туркменистан", "Таджикистан", "Россия", "Беларусь", "Грузия", "Азербайджан", "Армения", "Турция", "ОАЭ", "Саудовская Аравия", "Ирак", "Монголия", "Вьетнам", "Китай"],
    },
    social: {
      eyebrow: "Доверяют международные партнёры",
      title: "Дистрибьюторы, строящие свои бренды с нами.",
      testimonials: [
        { q: "Стабильное качество от партии к партии, а гибкость private-label позволила нам запустить свой бренд за 8 месяцев.", a: "Дистрибьютор, Казахстан" },
        { q: "Документы пришли идеально с первым контейнером. Таможня прошла без единой задержки.", a: "Импортёр, ОАЭ" },
      ],
    },
    contact: {
      eyebrow: "Запрос цены",
      title: "Начните запрос. Мы отвечаем в течение 24 часов.",
      labels: { name: "Полное имя", company: "Компания", country: "Страна", email: "Email", message: "Что вы ищете?" },
      messagePh: "Продукт, объём, упаковка, порт назначения…",
      privacy: "Отправляя форму, вы соглашаетесь на связь с нашей экспортной командой. Никакого спама.",
      received: "Запрос получен.",
      receivedSub: "Наша экспортная команда ответит в течение 24 часов с ценой, MOQ и образцами.",
      hq: "Штаб-квартира",
      city: "Ташкент, Узбекистан",
      hours: "Пн–Сб · 09:00–18:00 (UTC+5) · Английский, Русский, Узбекский",
      ctas: { wa: "Написать в WhatsApp", tg: "Написать в Telegram", em: "Отправить email" },
    },
    footer: {
      blurb: "Производитель и экспортёр кормов для животных из Ташкента, Узбекистан. Производственный партнёр для дистрибьюторов и private-label брендов по всему миру.",
      cols: {
        Company: { title: "Компания", links: ["О нас", "Производство", "Качество", "Экспорт"] },
        Products: { title: "Продукция", links: ["Сухой корм для собак", "Влажный корм для собак", "Сухой корм для кошек", "Влажный корм для кошек", "Лакомства"] },
        Partners: { title: "Партнёры", links: ["Private Label", "Дистрибьюторы", "Каталог"] },
        Contact: { title: "Контакты", links: ["Запросить цену", "WhatsApp", "Telegram", "Email"] },
      },
      copyright: "Steppe Nutrition LLC · Произведено в Узбекистане",
    },
  },
  EN: {
    nav: { about: "About", products: "Products", privateLabel: "Private Label", quality: "Quality", production: "Production", export: "Export", contact: "Contact" },
    cta: { quote: "Request a Quote", catalog: "Download Catalog", startPL: "Start a Private Label Project", sendInquiry: "Send Inquiry", reqQuote: "Request Quote", reqSample: "Request Sample" },
    hero: {
      eyebrow: "B2B Manufacturer · Exporter",
      titleA: "Your reliable pet food supply partner from",
      titleHi: " Central Asia",
      titleB: ".",
      sub: "We manufacture export-ready dry and wet food for cats and dogs — certified quality, consistent supply, and private-label flexibility that protects your margin.",
      feats: ["ISO 22000 certified", "MOQ from 5 tons", "FOB & CIF supported", "Private-label OEM", "Veterinary approved", "24h reply guarantee"],
      stats: [{ k: "20+", v: "Export countries" }, { k: "12k t", v: "Annual capacity" }, { k: "ISO", v: "22000 certified" }],
      imgAlt: "Pet food production line at the Steppe Nutrition factory in Uzbekistan",
    },
    trust: ["ISO 22000", "HACCP", "Halal Certified", "EAC", "Veterinary Approved", "GMP+"],
    about: {
      eyebrow: "About the company",
      title: "Manufacturer and exporter — under one roof.",
      body: "Steppe Nutrition is a vertically integrated pet food manufacturer based in Tashkent, Uzbekistan. We control everything from recipe development and extrusion to packaging and international shipping — so our B2B partners get a single, accountable source for consistent quality and predictable lead times.",
      stats: [
        { k: "12,000+", v: "Tons / year capacity" },
        { k: "20+", v: "Export countries" },
        { k: "12", v: "Years in operation" },
        { k: "40+", v: "SKUs across categories" },
      ],
    },
    products: {
      eyebrow: "Product catalog",
      title: "Built for distributors, importers and private-label partners.",
      subtitle: "Five core lines, 40+ SKUs. All recipes formulated by certified veterinary nutritionists, manufactured to your spec or ours.",
      cats: { All: "All", Dog: "Dog", Cat: "Cat", Snacks: "Snacks" },
      downloadPdf: "Download full catalog (PDF) →",
      spec: { protein: "Protein", pack: "Packaging", shelf: "Shelf life" },
      items: [
        { name: "Premium Dry Dog Food", category: "Dog", catLabel: "Dog · Dry", img: dryDog, protein: "26%", sizes: "1, 3, 10, 20 kg", shelf: "18 months" },
        { name: "Wet Dog Food in Gravy", category: "Dog", catLabel: "Dog · Wet", img: wetDog, protein: "10%", sizes: "100, 200, 400 g", shelf: "24 months" },
        { name: "Adult Dry Cat Food", category: "Cat", catLabel: "Cat · Dry", img: dryCat, protein: "32%", sizes: "0.4, 1.5, 5, 10 kg", shelf: "18 months" },
        { name: "Wet Cat Food Pâté", category: "Cat", catLabel: "Cat · Wet", img: wetCat, protein: "11%", sizes: "85, 100, 200 g", shelf: "24 months" },
        { name: "Natural Meat Treats", category: "Snacks", catLabel: "Snacks", img: treats, protein: "55%", sizes: "50, 100, 250 g", shelf: "12 months" },
        { name: "Puppy & Kitten Range", category: "Dog Cat", catLabel: "Dog · Cat · Dry", img: dryDog, protein: "30%", sizes: "0.5, 1.5, 5 kg", shelf: "18 months" },
      ],
    },
    pl: {
      eyebrow: "Private label manufacturing",
      titleA: "Your brand,",
      titleB: "our production.",
      body: "Most of our partners sell our product under their own brand. We're built for it: dedicated production runs, your packaging, your recipe — and margins that direct-from-factory pricing makes possible.",
      steps: [
        { n: "01", t: "Recipe", d: "Use one of our proven formulas or co-develop your own with our nutritionists." },
        { n: "02", t: "Packaging", d: "Your brand, your design — bags, cans, pouches. Full artwork support included." },
        { n: "03", t: "Production", d: "Manufactured on dedicated runs with full QC traceability and lab testing." },
        { n: "04", t: "Export", d: "FOB, CIF, DAP. Containers loaded with all documentation, ready for clearance." },
      ],
      imgAlt: "Private label pet food packaging mockup",
    },
    quality: {
      eyebrow: "Quality & certifications",
      title: "A trust center for buyers who can't compromise.",
      subtitle: "Every batch traceable. Every shipment tested. Every certificate available on request.",
      certs: [
        { t: "ISO 22000", d: "Food safety management" },
        { t: "HACCP", d: "Hazard analysis system" },
        { t: "GMP+", d: "Good manufacturing practice" },
        { t: "Halal", d: "Certified production line" },
        { t: "EAC", d: "Eurasian conformity" },
        { t: "Vet. Cert.", d: "State veterinary approval" },
      ],
      points: [
        { t: "In-house lab testing", d: "Every batch tested for protein, fat, moisture, ash and microbiological safety before release." },
        { t: "Full traceability", d: "Lot codes linked from raw material to finished pallet — auditable on demand." },
        { t: "Export documentation ready", d: "Health certificates, certificates of origin, lab reports and customs paperwork delivered with every container." },
      ],
    },
    prod: {
      eyebrow: "Inside the factory",
      title: "Made in Uzbekistan, built for the world.",
      sub: "12,000+ tons of annual capacity across modern European extrusion lines. Transparent, auditable production — you're welcome to visit any time.",
      steps: ["Raw material intake", "Recipe formulation", "Extrusion & drying", "Coating & cooling", "Lab QC release", "Packaging & palletizing"],
      imgAlt: "Modern pet food extrusion production line",
    },
    exp: {
      eyebrow: "Export & logistics",
      title: "Container-ready, customs-ready, partner-ready.",
      subtitle: "We handle the export side so your import side runs smoothly.",
      items: [
        { t: "Incoterms supported", d: "EXW, FOB, CFR, CIF, DAP. Flexible to your logistics setup." },
        { t: "Export packaging", d: "Multi-layer, moisture-resistant, optimized for 40' HC containers." },
        { t: "Customs documents", d: "Phytosanitary, health, origin & lab certificates included." },
        { t: "Worldwide delivery", d: "Sea, road and rail freight via Tashkent and partner ports." },
      ],
      currentlyExporting: "Currently exporting to",
      countriesTitle: "20+ countries across Eurasia and beyond",
      countries: ["Kazakhstan", "Kyrgyzstan", "Turkmenistan", "Tajikistan", "Russia", "Belarus", "Georgia", "Azerbaijan", "Armenia", "Turkey", "UAE", "Saudi Arabia", "Iraq", "Mongolia", "Vietnam", "China"],
    },
    social: {
      eyebrow: "Trusted by international partners",
      title: "Distributors building their brands with us.",
      testimonials: [
        { q: "Consistent quality batch after batch, and the private-label flexibility let us launch our own brand in 8 months.", a: "Distributor, Kazakhstan" },
        { q: "Documentation arrived perfect with the first container. Customs cleared without a single delay.", a: "Importer, UAE" },
      ],
    },
    contact: {
      eyebrow: "Request a quote",
      title: "Start an inquiry. We reply within 24 hours.",
      labels: { name: "Full name", company: "Company", country: "Country", email: "Email", message: "What are you looking for?" },
      messagePh: "Product, target volume, packaging, destination port…",
      privacy: "By submitting, you agree to be contacted by our export team. No spam, ever.",
      received: "Inquiry received.",
      receivedSub: "Our export team will reply within 24 hours with pricing, MOQ and sample options.",
      hq: "Headquarters",
      city: "Tashkent, Uzbekistan",
      hours: "Mon–Sat · 09:00–18:00 (UTC+5) · English, Russian, Uzbek",
      ctas: { wa: "Chat on WhatsApp", tg: "Message on Telegram", em: "Send email" },
    },
    footer: {
      blurb: "Pet food manufacturer and exporter from Tashkent, Uzbekistan. Manufacturing partner to distributors and private-label brands worldwide.",
      cols: {
        Company: { title: "Company", links: ["About", "Production", "Quality", "Export"] },
        Products: { title: "Products", links: ["Dry Dog Food", "Wet Dog Food", "Dry Cat Food", "Wet Cat Food", "Treats"] },
        Partners: { title: "Partners", links: ["Private Label", "Distributors", "Catalog"] },
        Contact: { title: "Contact", links: ["Request Quote", "WhatsApp", "Telegram", "Email"] },
      },
      copyright: "Steppe Nutrition LLC · Made in Uzbekistan",
    },
  },
} as const;

type TT = (typeof T)[Lang];
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: TT }>({
  lang: "UZ", setLang: () => {}, t: T.UZ as TT,
});
const useT = () => useContext(LangCtx);

function Landing() {
  const [lang, setLang] = useState<Lang>("UZ");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "UZ" || saved === "RU" || saved === "EN") setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang.toLowerCase();
    }
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang, t: T[lang] }}>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <TrustStrip />
          <About />
          <Products />
          <PrivateLabel />
          <Quality />
          <Production />
          <Export />
          <SocialProof />
          <Contact />
        </main>
        <Footer />
        <MobileCTA />
      </div>
    </LangCtx.Provider>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const { lang, setLang, t } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const NAV = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.products, href: "#products" },
    { label: t.nav.privateLabel, href: "#private-label" },
    { label: t.nav.quality, href: "#quality" },
    { label: t.nav.production, href: "#production" },
    { label: t.nav.export, href: "#export" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled ? "border-border bg-background/85 backdrop-blur" : "border-transparent bg-background"
      }`}
    >
      <div className="container-x flex h-16 items-center gap-4 md:h-20">
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Steppe<span className="text-primary"> Nutrition</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="hidden items-center rounded-full border border-border bg-card p-0.5 md:flex">
            {(["UZ", "RU", "EN"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <a href="#contact" className="hidden btn-warm md:inline-flex">
            {t.cta.quote} <ArrowRight className="h-4 w-4" />
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="container-x flex h-16 items-center">
            <span className="font-display text-lg font-extrabold">Steppe Nutrition</span>
            <button
              className="ml-auto grid h-10 w-10 place-items-center rounded-lg border border-border"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="container-x mt-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary">
                {n.label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-card p-0.5 self-start">
              {(["UZ", "RU", "EN"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-warm mt-4">
              {t.cta.quote} <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const { t } = useT();
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[720px] bg-gradient-to-b from-secondary via-background to-background" />
      <div className="container-x grid gap-12 pt-20 pb-20 md:pt-28 md:pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-[140px] lg:pb-[140px]">
        <div className="fade-up flex flex-col justify-center">
          <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t.hero.eyebrow}</span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.15] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
            {t.hero.titleA}<span className="text-primary">{t.hero.titleHi}</span>{t.hero.titleB}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.hero.sub}</p>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-warm px-8 py-4 text-base">{t.cta.quote} <ArrowRight className="h-4 w-4" /></a>
            <a href="#products" className="btn-outline"><FileDown className="h-4 w-4" /> {t.cta.catalog}</a>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted-foreground sm:grid-cols-3">
            {t.hero.feats.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
            <img src={factoryHero} alt={t.hero.imgAlt} width={1600} height={1100} className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]" />
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 rounded-2xl border border-white/40 bg-white/30 p-3 text-center backdrop-blur-xl md:inset-x-6 md:bottom-6 md:p-4">
              {t.hero.stats.map((s) => (
                <div key={s.v}>
                  <div className="font-display text-xl font-semibold text-primary md:text-2xl">{s.k}</div>
                  <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-foreground/70 md:text-xs">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div aria-hidden className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-warm/40 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const { t } = useT();
  return (
    <section aria-label="Certifications" className="border-y border-border bg-surface/60">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-14 gap-y-4 py-10 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {t.trust.map((i) => (
          <span key={i} className="inline-flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" /> {i}
          </span>
        ))}
      </div>
    </section>
  );
}

function About() {
  const { t } = useT();
  const icons = [Factory, Globe2, Building2, PackageCheck];
  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{t.about.body}</p>
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {t.about.stats.map((s, i) => {
            const Icon = icons[i];
            return (
              <div key={s.v} className="card-surface p-6 sm:p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <div className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{s.k}</div>
                <span className="mt-3 inline-block h-1 w-8 rounded-full bg-primary/60" />
                <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.v}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function Products() {
  const { t } = useT();
  const cats = ["All", "Dog", "Cat", "Snacks"] as const;
  const [filter, setFilter] = useState<typeof cats[number]>("All");
  const visible = t.products.items.filter((p) => filter === "All" || p.category.includes(filter));

  return (
    <Section id="products" eyebrow={t.products.eyebrow} title={t.products.title} subtitle={t.products.subtitle}>
      <div className="mb-10 flex flex-wrap items-center gap-2">
        <div className="inline-flex flex-wrap gap-1 rounded-full border border-border bg-card p-1">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                filter === c
                  ? "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.products.cats[c]}
            </button>
          ))}
        </div>
        <a href="#contact" className="ml-auto hidden text-sm font-semibold text-primary hover:underline sm:inline-flex">
          {t.products.downloadPdf}
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <article
            key={p.name}
            className="group flex flex-col overflow-hidden rounded-[16px] border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#f5f3ee]">
              <img
                src={p.img}
                alt={p.name}
                width={900}
                height={675}
                loading="lazy"
                className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">{p.catLabel}</div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{p.name}</h3>
              <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-border/70 py-5 text-xs">
                <Spec label={t.products.spec.protein} value={p.protein} />
                <Spec label={t.products.spec.pack} value={p.sizes} />
                <Spec label={t.products.spec.shelf} value={p.shelf} />
              </dl>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a href="#contact" className="btn-primary w-full justify-center !py-2.5 !text-sm">{t.cta.reqQuote}</a>
                <a href="#contact" className="btn-outline w-full justify-center !py-2.5 !text-sm">{t.cta.reqSample}</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 text-center">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-2 truncate text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function PrivateLabel() {
  const { t } = useT();
  return (
    <section id="private-label" className="bg-primary text-primary-foreground">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-[120px]">
        <div>
          <div
            className="overflow-hidden rounded-3xl border border-white/15"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.28)" }}
          >
            <img src={privateLabelImg} alt={t.pl.imgAlt} width={1400} height={1000} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-warm">
            <Sparkles className="h-4 w-4" /> {t.pl.eyebrow}
          </span>
          <h2 className="mt-6 text-4xl leading-[1.15] sm:text-5xl lg:text-[3.25rem]">
            {t.pl.titleA}<br />{t.pl.titleB}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">{t.pl.body}</p>

          <ol className="mt-14 grid gap-5 sm:grid-cols-2">
            {t.pl.steps.map((s) => (
              <li key={s.n} className="rounded-[16px] border border-white/20 bg-white/[0.06] p-7 backdrop-blur transition-colors hover:bg-white/[0.11]">
                <div className="font-display text-3xl font-extrabold text-warm sm:text-4xl">{s.n}</div>
                <div className="mt-3 font-semibold">{s.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{s.d}</p>
              </li>
            ))}
          </ol>

          <a href="#contact" className="mt-14 inline-flex items-center gap-2.5 rounded-xl bg-warm px-8 py-4 text-base font-bold text-warm-foreground transition-transform hover:-translate-y-0.5">
            {t.cta.startPL} <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Quality() {
  const { t } = useT();
  const icons = [FlaskConical, PackageCheck, ShieldCheck];
  return (
    <Section id="quality" eyebrow={t.quality.eyebrow} title={t.quality.title} subtitle={t.quality.subtitle}>
      <div className="mt-14 grid items-start gap-10 lg:mt-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {t.quality.certs.map((c) => (
            <div key={c.t} className="card-surface flex flex-col items-start p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </span>
              <div className="mt-4 font-display text-lg font-bold">{c.t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.d}</div>
            </div>
          ))}
        </div>

        <ul className="space-y-7">
          {t.quality.points.map((p, i) => {
            const Icon = icons[i];
            return (
              <li key={p.t} className="flex gap-5 rounded-[16px] border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-lg font-bold">{p.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

function Production() {
  const { t } = useT();
  return (
    <section id="production" className="bg-surface/60 py-16 lg:py-[120px]">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">{t.prod.eyebrow}</span>
          <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl lg:text-5xl">{t.prod.title}</h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">{t.prod.sub}</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]">
          <img src={factoryLine} alt={t.prod.imgAlt} width={1600} height={1000} loading="lazy" className="aspect-[16/9] w-full object-cover" />
        </div>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.prod.steps.map((s, i) => (
            <li key={s} className="card-surface flex items-center gap-4 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="font-semibold">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Export() {
  const { t } = useT();
  const icons = [Truck, PackageCheck, ShieldCheck, Globe2];
  return (
    <Section id="export" eyebrow={t.exp.eyebrow} title={t.exp.title} subtitle={t.exp.subtitle}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {t.exp.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={item.t} className="card-surface p-5">
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-4 font-display text-base font-bold">{item.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            );
          })}
        </div>

        <div className="card-surface p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">{t.exp.currentlyExporting}</div>
          <h3 className="mt-2 font-display text-2xl">{t.exp.countriesTitle}</h3>
          <ul className="mt-6 flex flex-wrap gap-2">
            {t.exp.countries.map((c) => (
              <li key={c} className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function SocialProof() {
  const { t } = useT();
  const logos = ["PetCo Asia", "Nordic Paws", "MENA Vet", "PrimePet", "Aralia Trade", "Kalmar Foods"];
  return (
    <section className="border-y border-border bg-card py-16 lg:py-[120px]">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">{t.social.eyebrow}</span>
          <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl">{t.social.title}</h2>
        </div>

        <div className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-6 opacity-70 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((l) => (
            <div key={l} className="text-center font-display text-lg font-bold tracking-tight text-muted-foreground">{l}</div>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {t.social.testimonials.map((tt) => (
            <figure key={tt.a} className="card-surface p-6 sm:p-8">
              <Quote className="h-6 w-6 text-warm" />
              <blockquote className="mt-4 text-lg leading-relaxed">{tt.q}</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-muted-foreground">— {tt.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useT();
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="card-surface p-6 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-start gap-3 py-6">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <h3 className="font-display text-2xl">{t.contact.received}</h3>
              <p className="text-muted-foreground">{t.contact.receivedSub}</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.contact.labels.name} name="name" required />
              <Field label={t.contact.labels.company} name="company" required />
              <Field label={t.contact.labels.country} name="country" required />
              <Field label={t.contact.labels.email} name="email" type="email" required />
              <div className="sm:col-span-2">
                <Field label={t.contact.labels.message} name="message" textarea placeholder={t.contact.messagePh} />
              </div>
              <button type="submit" className="btn-warm sm:col-span-2 !py-3.5">
                {t.cta.sendInquiry} <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-muted-foreground sm:col-span-2">{t.contact.privacy}</p>
            </div>
          )}
        </form>

        <div className="space-y-4">
          <ContactRow icon={MessageCircle} title="WhatsApp" value="+998 90 000 00 00" href="https://wa.me/998900000000" cta={t.contact.ctas.wa} />
          <ContactRow icon={Send} title="Telegram" value="@steppe_nutrition" href="https://t.me/steppe_nutrition" cta={t.contact.ctas.tg} />
          <ContactRow icon={Mail} title="Email" value="export@steppenutrition.uz" href="mailto:export@steppenutrition.uz" cta={t.contact.ctas.em} />
          <div className="card-surface p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">{t.contact.hq}</div>
            <p className="mt-2 font-display text-lg font-bold">{t.contact.city}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.contact.hours}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label, name, type = "text", required, textarea, placeholder,
}: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean; placeholder?: string }) {
  const cls =
    "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15";
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}{required && " *"}
      </span>
      {textarea ? (
        <textarea name={name} rows={4} placeholder={placeholder} className={cls} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}

function ContactRow({ icon: Icon, title, value, href, cta }: { icon: typeof MessageCircle; title: string; value: string; href: string; cta: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="card-surface flex items-center gap-4 p-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="truncate font-semibold">{value}</div>
      </div>
      <span className="hidden text-sm font-semibold text-primary sm:inline">{cta} →</span>
    </a>
  );
}

function Footer() {
  const { t } = useT();
  const cols = t.footer.cols;
  return (
    <footer className="border-t border-border bg-surface/60 pb-24 pt-16 lg:pb-14 lg:pt-[120px]">
      <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">Steppe Nutrition</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t.footer.blurb}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <FooterCol title={cols.Company.title} links={cols.Company.links} />
          <FooterCol title={cols.Products.title} links={cols.Products.links} />
          <FooterCol title={cols.Partners.title} links={cols.Partners.links} />
          <FooterCol title={cols.Contact.title} links={cols.Contact.links} />
        </div>
      </div>
      <div className="container-x mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {t.footer.copyright}</span>
        <span>UZ · RU · EN</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: readonly string[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}>
            <a href="#contact" className="hover:text-foreground">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileCTA() {
  const { t } = useT();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
      <a href="#contact" className="btn-warm w-full !py-3.5">
        {t.cta.quote} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function Section({
  id, eyebrow, title, subtitle, children,
}: { id?: string; eyebrow?: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="py-16 lg:py-[120px]">
      <div className="container-x">
        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem]">{title}</h2>
          {subtitle && <p className="mt-5 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
        </div>
        <div className="mt-12 lg:mt-16">{children}</div>
      </div>
    </section>
  );
}
