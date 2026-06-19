import { Link } from "@tanstack/react-router";
import { useT, type Lang } from "@/components/site";
import type { CmsSection } from "@/hooks/use-cms-page";

const pick = (c: Record<string, unknown>, key: string, lang: Lang): string => {
  const k = `${key}_${lang.toLowerCase()}`;
  return (c[k] as string) || (c[`${key}_uz`] as string) || "";
};

function HeroSection({ content }: { content: Record<string, unknown> }) {
  const { lang } = useT();
  const bg = (content.background_image_url as string) || "";
  return (
    <section
      className="relative py-24 md:py-32 bg-muted overflow-hidden"
      style={bg ? { backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      {bg && <div className="absolute inset-0 bg-background/60" />}
      <div className="container relative max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{pick(content, "title", lang)}</h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{pick(content, "subtitle", lang)}</p>
        {pick(content, "cta_text", lang) && content.cta_url ? (
          <Link
            to={content.cta_url as string}
            className="inline-flex mt-8 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90"
          >
            {pick(content, "cta_text", lang)}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function TextSection({ content }: { content: Record<string, unknown> }) {
  const { lang } = useT();
  return (
    <section className="py-16">
      <div className="container max-w-3xl mx-auto px-4">
        {pick(content, "heading", lang) && (
          <h2 className="text-3xl font-bold mb-4">{pick(content, "heading", lang)}</h2>
        )}
        <div className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-wrap">
          {pick(content, "body", lang)}
        </div>
      </div>
    </section>
  );
}

function ImageSection({ content }: { content: Record<string, unknown> }) {
  const { lang } = useT();
  const url = content.image_url as string;
  if (!url) return null;
  return (
    <section className="py-12">
      <div className="container max-w-5xl mx-auto px-4">
        <img src={url} alt={pick(content, "caption", lang)} className="w-full rounded-lg" />
        {pick(content, "caption", lang) && (
          <p className="text-sm text-muted-foreground text-center mt-3">{pick(content, "caption", lang)}</p>
        )}
      </div>
    </section>
  );
}

function StatsSection({ content }: { content: Record<string, unknown> }) {
  const { lang } = useT();
  const items = (content.items as Array<Record<string, string>>) ?? [];
  return (
    <section className="py-16 bg-muted/40">
      <div className="container max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-5xl font-bold text-primary">{it.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {it[`label_${lang.toLowerCase()}`] || it.label_uz}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GallerySection({ content }: { content: Record<string, unknown> }) {
  const images = (content.images as string[]) ?? [];
  if (!images.length) return null;
  return (
    <section className="py-12">
      <div className="container max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <img key={i} src={src} alt="" className="w-full h-56 object-cover rounded-md" />
        ))}
      </div>
    </section>
  );
}

function TimelineSection({ content }: { content: Record<string, unknown> }) {
  const { lang } = useT();
  const items = (content.items as Array<Record<string, string>>) ?? [];
  return (
    <section className="py-16">
      <div className="container max-w-3xl mx-auto px-4 space-y-6">
        {items.map((it, i) => (
          <div key={i} className="border-l-2 border-primary pl-5 py-2">
            <div className="text-sm text-primary font-medium">{it.year}</div>
            <div className="font-semibold text-lg">{it[`title_${lang.toLowerCase()}`] || it.title_uz}</div>
            <p className="text-muted-foreground text-sm mt-1">
              {it[`description_${lang.toLowerCase()}`] || it.description_uz}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ content }: { content: Record<string, unknown> }) {
  const { lang } = useT();
  const items = (content.items as Array<Record<string, string>>) ?? [];
  return (
    <section className="py-16">
      <div className="container max-w-3xl mx-auto px-4 space-y-4">
        {items.map((it, i) => (
          <details key={i} className="border rounded-md p-4">
            <summary className="cursor-pointer font-medium">
              {it[`question_${lang.toLowerCase()}`] || it.question_uz}
            </summary>
            <p className="text-muted-foreground mt-3 text-sm whitespace-pre-wrap">
              {it[`answer_${lang.toLowerCase()}`] || it.answer_uz}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CtaSection({ content }: { content: Record<string, unknown> }) {
  const { lang } = useT();
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">{pick(content, "title", lang)}</h2>
        <p className="mt-4 opacity-90">{pick(content, "description", lang)}</p>
        {pick(content, "button_text", lang) && content.button_url && (
          <Link
            to={content.button_url as string}
            className="inline-flex mt-6 px-6 py-3 rounded-md bg-background text-foreground font-medium"
          >
            {pick(content, "button_text", lang)}
          </Link>
        )}
      </div>
    </section>
  );
}

function VideoSection({ content }: { content: Record<string, unknown> }) {
  const url = content.video_url as string;
  if (!url) return null;
  return (
    <section className="py-12">
      <div className="container max-w-4xl mx-auto px-4 aspect-video">
        <iframe src={url} className="w-full h-full rounded-lg" allowFullScreen />
      </div>
    </section>
  );
}

function HtmlSection({ content }: { content: Record<string, unknown> }) {
  // eslint-disable-next-line react/no-danger
  return <section className="py-8 container max-w-5xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: (content.html as string) || "" }} />;
}

const SECTION_COMPONENTS: Record<string, (p: { content: Record<string, unknown> }) => JSX.Element | null> = {
  hero: HeroSection,
  text: TextSection,
  image: ImageSection,
  stats: StatsSection,
  gallery: GallerySection,
  timeline: TimelineSection,
  faq: FaqSection,
  cta: CtaSection,
  video: VideoSection,
  html: HtmlSection,
};

export function CmsPageRenderer({ sections }: { sections: CmsSection[] }) {
  return (
    <>
      {sections
        .filter((s) => s.visible)
        .map((s) => {
          const Comp = SECTION_COMPONENTS[s.section_type];
          if (!Comp) return null;
          return <Comp key={s.id} content={(s.content as Record<string, unknown>) ?? {}} />;
        })}
    </>
  );
}
