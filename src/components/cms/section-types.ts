export type SectionType =
  | "hero"
  | "text"
  | "image"
  | "stats"
  | "gallery"
  | "timeline"
  | "faq"
  | "cta"
  | "video"
  | "html";

export const SECTION_DEFINITIONS: { type: SectionType; label: string; defaultContent: Record<string, unknown> }[] = [
  {
    type: "hero",
    label: "Hero",
    defaultContent: {
      title_uz: "", title_ru: "", title_en: "",
      subtitle_uz: "", subtitle_ru: "", subtitle_en: "",
      cta_text_uz: "", cta_text_ru: "", cta_text_en: "",
      cta_url: "", background_image_url: "",
    },
  },
  {
    type: "text",
    label: "Matn bloki",
    defaultContent: {
      heading_uz: "", heading_ru: "", heading_en: "",
      body_uz: "", body_ru: "", body_en: "",
    },
  },
  {
    type: "image",
    label: "Rasm bloki",
    defaultContent: { image_url: "", caption_uz: "", caption_ru: "", caption_en: "" },
  },
  {
    type: "stats",
    label: "Statistika",
    defaultContent: { items: [{ value: "", label_uz: "", label_ru: "", label_en: "" }] },
  },
  {
    type: "gallery",
    label: "Galereya",
    defaultContent: { images: [] as string[] },
  },
  {
    type: "timeline",
    label: "Timeline",
    defaultContent: { items: [{ year: "", title_uz: "", title_ru: "", title_en: "", description_uz: "", description_ru: "", description_en: "" }] },
  },
  {
    type: "faq",
    label: "FAQ",
    defaultContent: { items: [{ question_uz: "", question_ru: "", question_en: "", answer_uz: "", answer_ru: "", answer_en: "" }] },
  },
  {
    type: "cta",
    label: "CTA banner",
    defaultContent: {
      title_uz: "", title_ru: "", title_en: "",
      description_uz: "", description_ru: "", description_en: "",
      button_text_uz: "", button_text_ru: "", button_text_en: "",
      button_url: "",
    },
  },
  {
    type: "video",
    label: "Video",
    defaultContent: { video_url: "", caption_uz: "", caption_ru: "", caption_en: "" },
  },
  {
    type: "html",
    label: "Custom HTML",
    defaultContent: { html: "" },
  },
];

export const SECTION_LABELS: Record<string, string> = Object.fromEntries(
  SECTION_DEFINITIONS.map((d) => [d.type, d.label]),
);
