const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        LevelFormat, ExternalHyperlink } = require('docx');
const fs = require('fs');

const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
}
function h3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(text)] });
}
function p(text, opts = {}) {
  return new Paragraph({ children: [new TextRun(text)], ...opts });
}
function boldP(label, text) {
  return new Paragraph({ children: [
    new TextRun({ text: label + ": ", bold: true }),
    new TextRun(text)
  ]});
}

function createTable(headers, rows) {
  const totalWidth = 9360;
  const colCount = headers.length;
  const colWidth = Math.floor(totalWidth / colCount);
  const columnWidths = Array(colCount).fill(colWidth);
  // adjust last to match total
  columnWidths[colCount - 1] = totalWidth - colWidth * (colCount - 1);

  const headerCells = headers.map(h => new TableCell({
    borders: cellBorders,
    width: { size: colWidth, type: WidthType.DXA },
    shading: { fill: "E8F5E9", type: ShadingType.CLEAR },
    children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })]
  }));

  const dataRows = rows.map(row => new TableRow({
    children: row.map((cellText, i) => new TableCell({
      borders: cellBorders,
      width: { size: columnWidths[i], type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun(cellText)] })]
    }))
  }));

  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths,
    rows: [new TableRow({ children: headerCells }), ...dataRows]
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: "1B5E20" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "2E7D32" },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: "388E3C" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      h1("Steppe Nutrition – Web-loyiha hujjati"),
      p("Tuzilgan sana: 2026-yil 19-iyun"),
      p("Hujjat turi: Loyiha texnik hujjati (DOCX)"),

      h2("1. Loyiha umumiy ma'lumotlari"),
      boldP("Loyiha nomi", "Steppe Nutrition"),
      boldP("Tavsif", "O'zbekistondan uy hayvonlari ozuqasi ishlab chiqaruvchi va eksportchi kompaniyasi uchun B2B veb-sayt"),
      boldP("Asosiy til", "O'zbek, Rus, Ingliz (3 tilli)"),
      boldP("URL manzillar", "https://daraja.com.uz, https://yem-mahsulotlari.lovable.app"),

      h2("2. Texnologik stack"),
      createTable(["Komponent", "Versiya / Texnologiya", "Maqsad"], [
        ["Frontend framework", "React 19.2.0", "Foydalanuvchi interfeysi"],
        ["Full-stack framework", "TanStack Start v1", "SSR, routing, server functionlar"],
        ["Build tool", "Vite 7.3.1", "Modul banti va dev server"],
        ["Styling", "Tailwind CSS v4.2.1", "Utility-first CSS"],
        ["UI kutubxonasi", "Radix UI + shadcn/ui", "Komponentlar"],
        ["Routing", "TanStack Router", "Fayl-asosiy routing"],
        ["State/Data", "TanStack Query", "Server ma'lumotlarini boshqarish"],
        ["TypeScript", "5.8.3", "Statik tiplash"],
        ["Linter", "ESLint 9 + Prettier", "Kod sifati"],
      ]),

      h2("3. Sayt strukturasi (sahifalar)"),
      createTable(["Sahifa", "Yo'nalish (path)", "Tavsif"], [
        ["Bosh sahifa", "/", "Hero, statistika, mahsulotlar, hamkorliklar"],
        ["Kompaniya haqida", "/about", "Kompaniya tarixi va maqsadi"],
        ["Mahsulotlar", "/products", "40+ SKU katalogi"],
        ["Private Label", "/private-label", "OEM ishlab chiqarish"],
        ["Sifat", "/quality", "Sertifikatlar va laboratoriya"],
        ["Ishlab chiqarish", "/production", "Zavod jarayonlari"],
        ["Eksport", "/export", "Logistika va davlatlar"],
        ["Aloqa", "/contact", "So'rov formasi va aloqa"],
      ]),

      h2("4. Mahsulotlar (6 asosiy SKU)"),
      createTable(["Mahsulot", "Tur", "Protein", "Qadoqlash", "Saqlash muddati"], [
        ["Premium quruq it ozuqasi", "It · Quruq", "26%", "1, 3, 10, 20 kg", "18 oy"],
        ["Sousli ho'l it ozuqasi", "It · Ho'l", "10%", "100, 200, 400 g", "24 oy"],
        ["Kattalar uchun quruq mushuk ozuqasi", "Mushuk · Quruq", "32%", "0.4, 1.5, 5, 10 kg", "18 oy"],
        ["Pate ho'l mushuk ozuqasi", "Mushuk · Ho'l", "11%", "85, 100, 200 g", "24 oy"],
        ["Tabiiy go'shtli shirinliklar", "Shirinliklar", "55%", "50, 100, 250 g", "12 oy"],
        ["Kuchukcha va mushukcha qatori", "It · Mushuk · Quruq", "30%", "0.5, 1.5, 5 kg", "18 oy"],
      ]),

      h2("5. Sertifikatlar"),
      p("Kompaniya quyidagi xalqaro sertifikatlarga ega:"),
      new Paragraph({ numbering: { reference: "certs", level: 0 }, children: [new TextRun("ISO 22000 – Oziq-ovqat xavfsizligi boshqaruvi")] }),
      new Paragraph({ numbering: { reference: "certs", level: 0 }, children: [new TextRun("HACCP – Xavf-xatarlarni tahlil qilish tizimi")] }),
      new Paragraph({ numbering: { reference: "certs", level: 0 }, children: [new TextRun("GMP+ – Yaxshi ishlab chiqarish amaliyoti")] }),
      new Paragraph({ numbering: { reference: "certs", level: 0 }, children: [new TextRun("Halal – Sertifikatlangan ishlab chiqarish liniyasi")] }),
      new Paragraph({ numbering: { reference: "certs", level: 0 }, children: [new TextRun("EAC – Yevroosiyo muvofiqligi")] }),
      new Paragraph({ numbering: { reference: "certs", level: 0 }, children: [new TextRun("Veterinariya tasdiqi – Davlat veterinariya sertifikati")] }),

      h2("6. Eksport ma'lumotlari"),
      boldP("Yillik quvvat", "12 000+ tonna"),
      boldP("Eksport davlatlari soni", "20+"),
      boldP("Tajriba", "12 yil"),
      boldP("SKU soni", "40+"),
      boldP("MOQ", "5 tonnadan"),
      boldP("Incoterms", "EXW, FOB, CFR, CIF, DAP"),
      boldP("Yetkazib berish usullari", "Dengiz, avtomobil, temir yo'l"),
      p("Eksport qilinayotgan asosiy davlatlar: Qozog'iston, Qirg'iziston, Turkmaniston, Tojikiston, Rossiya, Belarus, Gruziya, Ozarbayjon, Armaniston, Turkiya, BAA, Saudiya Arabistoni, Iroq, Mo'g'uliston, Vetnam, Xitoy."),

      h2("7. Dizayn va uslub"),
      createTable(["Xususiyat", "Qiymat"], [
        ["Asosiy rang (primary)", "Forest green (oklch 0.42 0.09 165)"],
        ["Aktsent rang", "Warm amber (oklch 0.74 0.14 65)"],
        ["Fon", "Near-white off-white"],
        ["Sarlavha shrifti", "Plus Jakarta Sans"],
        ["Matn shrifti", "Inter"],
        ["UI kutubxonasi", "shadcn/ui + Tailwind CSS v4"],
      ]),

      h2("8. Aloqa ma'lumotlari (saytda ko'rsatilgan)"),
      boldP("Bosh ofis", "Toshkent, O'zbekiston"),
      boldP("Ish vaqti", "Du–Sha · 09:00–18:00 (UTC+5)"),
      boldP("Tillar", "O'zbek, Rus, Ingliz"),
      p("Aloqa kanallari: WhatsApp, Telegram, Email"),

      h2("9. Foydalanuvchi o'zgarishlari (so'nggi)"),
      p("Quyidagi o'zgarishlar amalga oshirilgan:"),
      new Paragraph({ numbering: { reference: "changes", level: 0 }, children: [new TextRun("Logotip joyiga 'Dip' yozuvi qo'shildi")] }),
      new Paragraph({ numbering: { reference: "changes", level: 0 }, children: [new TextRun("'Katalogni yuklab olish' tugmasi 'Ariza qoldirish' ga o'zgartirildi va /contact yo'nalishiga yo'naltirildi")] }),
      new Paragraph({ numbering: { reference: "changes", level: 0 }, children: [new TextRun("Navbardan 'Narx so'rash' tugmasi olib tashlandi")] }),
      new Paragraph({ numbering: { reference: "changes", level: 0 }, children: [new TextRun("'Mahsulotlar' bo'limi qo'shildi")] }),

      h2("10. Loyiha fayl strukturasi"),
      p("Asosiy fayllar va papkalar:"),
      createTable(["Fayl/Papka", "Tavsif"], [
        ["src/routes/", "Sahifa fayllari (index, about, products, contact, ...)"],
        ["src/components/site.tsx", "Barcha komponentlar va i18n matnlari"],
        ["src/components/ui/", "shadcn/ui komponentlari"],
        ["src/styles.css", "Global CSS, Tailwind theme, custom utilities"],
        ["src/router.tsx", "TanStack Router sozlamalari"],
        ["vite.config.ts", "Vite konfiguratsiyasi"],
        ["package.json", "NPM paketlar ro'yxati"],
      ]),

      p("", { spacing: { before: 400 } }),
      p("Ushbu hujjat Steppe Nutrition loyihasi haqida umumiy ma'lumot beradi.", { alignment: AlignmentType.CENTER }),
    ]
  }],
  numbering: {
    config: [
      { reference: "certs",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "changes",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  }
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/documents/Steppe_Nutrition_Loyiha_Malumoti.docx", buffer);
  console.log("DOCX fayl muvaffaqiyatli yaratildi: /mnt/documents/Steppe_Nutrition_Loyiha_Malumoti.docx");
});
