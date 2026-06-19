/**
 * Central registry of all translatable text keys used on the public site.
 * Used by the admin /admin/translations page to expose every editable string.
 *
 * Format: dot-path keys grouped by section. Each key maps to a default UZ value
 * (which is what currently appears in the React components — kept here so the
 * admin UI can show it as a placeholder/fallback hint).
 */

export type KeyGroup = {
  group: string;
  label: string;
  keys: Array<{ key: string; default_uz: string; multiline?: boolean }>;
};

export const TEXT_KEY_GROUPS: KeyGroup[] = [
  {
    group: "home_hero",
    label: "Bosh sahifa — Hero",
    keys: [
      { key: "hero.eyebrow", default_uz: "B2B ishlab chiqaruvchi · Eksportchi" },
      { key: "hero.titleA", default_uz: "Markaziy Osiyodan uy hayvonlari ozuqasi yetkazib beruvchi" },
      { key: "hero.titleHi", default_uz: " ishonchli hamkoringiz" },
      { key: "hero.titleB", default_uz: "." },
      { key: "hero.sub", default_uz: "Biz mushuk va itlar uchun eksportga tayyor quruq va ho'l ozuqa ishlab chiqaramiz…", multiline: true },
      { key: "hero.feats.0", default_uz: "ISO 22000 sertifikatlangan" },
      { key: "hero.feats.1", default_uz: "MOQ 5 tonnadan" },
      { key: "hero.feats.2", default_uz: "FOB va CIF qo'llab-quvvatlanadi" },
      { key: "hero.feats.3", default_uz: "Private-label OEM" },
      { key: "hero.feats.4", default_uz: "Veterinariya tasdig'i" },
      { key: "hero.feats.5", default_uz: "24 soat ichida javob" },
      { key: "hero.stats.0.k", default_uz: "20+" },
      { key: "hero.stats.0.v", default_uz: "Eksport davlatlari" },
      { key: "hero.stats.1.k", default_uz: "12k t" },
      { key: "hero.stats.1.v", default_uz: "Yillik quvvat" },
      { key: "hero.stats.2.k", default_uz: "ISO" },
      { key: "hero.stats.2.v", default_uz: "22000 sertifikati" },
    ],
  },
  {
    group: "nav",
    label: "Navigatsiya & CTA",
    keys: [
      { key: "nav.about", default_uz: "Kompaniya" },
      { key: "nav.products", default_uz: "Mahsulotlar" },
      { key: "nav.privateLabel", default_uz: "Private Label" },
      { key: "nav.quality", default_uz: "Sifat" },
      { key: "nav.production", default_uz: "Ishlab chiqarish" },
      { key: "nav.export", default_uz: "Eksport" },
      { key: "nav.contact", default_uz: "Aloqa" },
      { key: "cta.quote", default_uz: "Narx so'rash" },
      { key: "cta.catalog", default_uz: "Katalogni yuklab olish" },
      { key: "cta.application", default_uz: "Ariza qoldirish" },
      { key: "cta.products", default_uz: "Mahsulotlar" },
      { key: "cta.startPL", default_uz: "Private Label loyihasini boshlash" },
      { key: "cta.sendInquiry", default_uz: "So'rovni yuborish" },
      { key: "cta.reqQuote", default_uz: "Narx so'rash" },
      { key: "cta.reqSample", default_uz: "Namuna so'rash" },
    ],
  },
  {
    group: "home_stats",
    label: "Bosh sahifa — Statistika",
    keys: [
      { key: "home.stats.0.k", default_uz: "12 000+" },
      { key: "home.stats.0.v", default_uz: "Tonna / yil quvvat" },
      { key: "home.stats.1.k", default_uz: "20+" },
      { key: "home.stats.1.v", default_uz: "Eksport davlatlari" },
      { key: "home.stats.2.k", default_uz: "12" },
      { key: "home.stats.2.v", default_uz: "Yillik tajriba" },
      { key: "home.stats.3.k", default_uz: "40+" },
      { key: "home.stats.3.v", default_uz: "Mahsulot turlari (SKU)" },
    ],
  },
  {
    group: "home_benefits",
    label: "Bosh sahifa — Afzalliklar",
    keys: [
      { key: "home.benefits.eyebrow", default_uz: "Nega Steppe Nutrition" },
      { key: "home.benefits.title", default_uz: "Faqat mahsulot emas — ishonchli biznes hamkor." },
      { key: "home.benefits.sub", default_uz: "Distribyutorlar va importyorlar bizdan shunchaki uy hayvonlari ozuqasidan ko'proq narsa oladi…", multiline: true },
      { key: "home.benefits.0.t", default_uz: "Doimiy sifat" },
      { key: "home.benefits.0.d", default_uz: "Har partiya laboratoriyada tekshiriladi." },
      { key: "home.benefits.1.t", default_uz: "Barqaror yetkazib berish" },
      { key: "home.benefits.1.d", default_uz: "Prognoz qilinadigan muddatlar va hajmlar." },
      { key: "home.benefits.2.t", default_uz: "Private-label moslashuvchanligi" },
      { key: "home.benefits.2.d", default_uz: "Sizning brendingiz, yuqori marja." },
      { key: "home.benefits.3.t", default_uz: "Sertifikatlangan eksport" },
      { key: "home.benefits.3.d", default_uz: "ISO, HACCP, to'liq hujjatlar." },
    ],
  },
  {
    group: "home_vs",
    label: "Bosh sahifa — Vositachi vs Ishlab chiqaruvchi",
    keys: [
      { key: "home.vs.eyebrow", default_uz: "To'g'ridan-to'g'ri ishlab chiqaruvchidan" },
      { key: "home.vs.title", default_uz: "Vositachidan emas — to'g'ridan-to'g'ri ishlab chiqaruvchidan." },
      { key: "home.vs.left.title", default_uz: "Qo'shimcha xarajat va xavf" },
      { key: "home.vs.left.0", default_uz: "Yuqori narx — qo'shimcha qatlam marja" },
      { key: "home.vs.left.1", default_uz: "Sifat nazorati yo'q" },
      { key: "home.vs.left.2", default_uz: "Sekin javob va noaniq muddatlar" },
      { key: "home.vs.left.3", default_uz: "Noaniq kelib chiqish" },
      { key: "home.vs.right.title", default_uz: "Zavod narxi va to'liq nazorat" },
      { key: "home.vs.right.0", default_uz: "Zavod narxi — to'g'ridan-to'g'ri" },
      { key: "home.vs.right.1", default_uz: "To'liq sifat nazorati va laboratoriya" },
      { key: "home.vs.right.2", default_uz: "24 soat ichida javob" },
      { key: "home.vs.right.3", default_uz: "Shaffof kelib chiqish va hujjatlar" },
    ],
  },
  {
    group: "home_products",
    label: "Bosh sahifa — Mahsulotlar preview",
    keys: [
      { key: "home.productsPreview.eyebrow", default_uz: "Mahsulotlarimiz" },
      { key: "home.productsPreview.title", default_uz: "Eksportga tayyor asosiy yo'nalishlar" },
      { key: "home.productsPreview.sub", default_uz: "Sertifikatlangan retseptlar, doimiy sifat. To'liq katalogda 40+ SKU." },
      { key: "home.productsPreview.allBtn", default_uz: "Barcha mahsulotlar" },
    ],
  },
  {
    group: "home_pl",
    label: "Bosh sahifa — Private Label",
    keys: [
      { key: "home.pl.title", default_uz: "Sizning brendingiz, bizning ishlab chiqarishimiz." },
      { key: "home.pl.sub", default_uz: "Private-label / OEM ishlab chiqarish — mahsulot sizning brendingiz ostida chiqariladi…", multiline: true },
      { key: "home.pl.steps.0", default_uz: "Retsept" },
      { key: "home.pl.steps.1", default_uz: "Qadoqlash" },
      { key: "home.pl.steps.2", default_uz: "Ishlab chiqarish" },
      { key: "home.pl.steps.3", default_uz: "Eksport" },
      { key: "home.pl.cta", default_uz: "Private Label haqida batafsil" },
    ],
  },
  {
    group: "home_how",
    label: "Bosh sahifa — Jarayon",
    keys: [
      { key: "home.how.eyebrow", default_uz: "Jarayon" },
      { key: "home.how.title", default_uz: "Hamkorlik qanday boshlanadi" },
      { key: "home.how.0.t", default_uz: "So'rov yuboring" },
      { key: "home.how.0.d", default_uz: "Mahsulot, hajm va talablaringizni ayting." },
      { key: "home.how.1.t", default_uz: "Namuna va taklif oling" },
      { key: "home.how.1.d", default_uz: "Namuna yuboramiz, narx va shartlarni kelishamiz." },
      { key: "home.how.2.t", default_uz: "Buyurtma va eksport" },
      { key: "home.how.2.d", default_uz: "Ishlab chiqaramiz va hujjatlar bilan yetkazamiz." },
      { key: "home.how.cta", default_uz: "So'rovni boshlang" },
    ],
  },
  {
    group: "home_quality",
    label: "Bosh sahifa — Sifat",
    keys: [
      { key: "home.qs.eyebrow", default_uz: "Sifat bilan boshqariladi" },
      { key: "home.qs.title", default_uz: "Retseptlar veterinar-nutritsionistlar tomonidan ishlab chiqilgan." },
      { key: "home.qs.points.0", default_uz: "O'z laboratoriyamizda sifat nazorati" },
      { key: "home.qs.points.1", default_uz: "Veterinar-nutritsionist nazorati" },
      { key: "home.qs.points.2", default_uz: "AAFCO standartlariga to'liq moslik" },
      { key: "home.qs.points.3", default_uz: "Har partiya sertifikatlanadi" },
    ],
  },
  {
    group: "home_social",
    label: "Bosh sahifa — Hamkorlar",
    keys: [
      { key: "home.social.eyebrow", default_uz: "Hamkorlar" },
      { key: "home.social.title", default_uz: "Xalqaro hamkorlar ishonadi" },
    ],
  },
  {
    group: "home_cta",
    label: "Bosh sahifa — Final CTA",
    keys: [
      { key: "home.finalCta.titleA", default_uz: "Hamkorlikni boshlang." },
      { key: "home.finalCta.titleHi", default_uz: "24 soat ichida" },
      { key: "home.finalCta.titleB", default_uz: "javob beramiz." },
      { key: "home.finalCta.sub", default_uz: "Distribyutor yoki importyormisiz? Narx, MOQ va namuna uchun so'rov yuboring — eksport jamoamiz tezda bog'lanadi.", multiline: true },
      { key: "home.finalCta.btn", default_uz: "Narx so'rash" },
    ],
  },
  {
    group: "trust",
    label: "Sertifikatlar (Trust strip)",
    keys: [
      { key: "trust.0", default_uz: "ISO 22000" },
      { key: "trust.1", default_uz: "HACCP" },
      { key: "trust.2", default_uz: "GMP+" },
      { key: "trust.3", default_uz: "EAC" },
      { key: "trust.4", default_uz: "Veterinariya tasdig'i" },
    ],
  },
];

export const ALL_KEYS = TEXT_KEY_GROUPS.flatMap((g) => g.keys.map((k) => ({ ...k, group: g.group })));
