CREATE TABLE public.pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title_uz text NOT NULL DEFAULT '',
  title_ru text NOT NULL DEFAULT '',
  title_en text NOT NULL DEFAULT '',
  seo_title_uz text DEFAULT '',
  seo_title_ru text DEFAULT '',
  seo_title_en text DEFAULT '',
  seo_description_uz text DEFAULT '',
  seo_description_ru text DEFAULT '',
  seo_description_en text DEFAULT '',
  seo_keywords text DEFAULT '',
  og_image_url text,
  published boolean NOT NULL DEFAULT true,
  is_system boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pages TO authenticated;
GRANT ALL ON public.pages TO service_role;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published pages" ON public.pages FOR SELECT
USING (published = true OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager'));
CREATE POLICY "Content admins manage pages" ON public.pages FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager'))
WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager'));
CREATE TRIGGER pages_touch BEFORE UPDATE ON public.pages
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.page_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  section_type text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX page_sections_page_idx ON public.page_sections(page_id, sort_order);
GRANT SELECT ON public.page_sections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_sections TO authenticated;
GRANT ALL ON public.page_sections TO service_role;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads visible sections" ON public.page_sections FOR SELECT
USING (visible = true OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager'));
CREATE POLICY "Content admins manage sections" ON public.page_sections FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager'))
WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager'));
CREATE TRIGGER page_sections_touch BEFORE UPDATE ON public.page_sections
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.pages (slug, title_uz, title_ru, title_en, is_system) VALUES
  ('about', 'Biz haqimizda', 'О нас', 'About Us', true),
  ('private-label', 'Private Label', 'Private Label', 'Private Label', true),
  ('quality', 'Sifat', 'Качество', 'Quality', true),
  ('production', 'Ishlab chiqarish', 'Производство', 'Production', true),
  ('export', 'Eksport', 'Экспорт', 'Export', true),
  ('contact', 'Bog''lanish', 'Контакты', 'Contact', true);

INSERT INTO public.page_sections (page_id, section_type, sort_order, content)
SELECT id, 'hero', 0, jsonb_build_object(
  'title_uz','Steppe Nutrition haqida','title_ru','О Steppe Nutrition','title_en','About Steppe Nutrition',
  'subtitle_uz','O''zbekistondan jahonga sifatli ozuqa','subtitle_ru','Качественный корм из Узбекистана','subtitle_en','Premium nutrition from Uzbekistan',
  'cta_text_uz','Mahsulotlar','cta_text_ru','Продукты','cta_text_en','Products','cta_url','/products','background_image_url',''
) FROM public.pages WHERE slug = 'about';

INSERT INTO public.page_sections (page_id, section_type, sort_order, content)
SELECT id, 'stats', 1, jsonb_build_object('items', jsonb_build_array(
  jsonb_build_object('value','15+','label_uz','Yillik tajriba','label_ru','Лет опыта','label_en','Years experience'),
  jsonb_build_object('value','25+','label_uz','Eksport mamlakatlari','label_ru','Стран экспорта','label_en','Export countries'),
  jsonb_build_object('value','120+','label_uz','SKU','label_ru','SKU','label_en','SKU'),
  jsonb_build_object('value','50K t','label_uz','Yillik quvvat','label_ru','Годовая мощность','label_en','Annual capacity')
)) FROM public.pages WHERE slug = 'about';

INSERT INTO public.page_sections (page_id, section_type, sort_order, content)
SELECT id, 'text', 2, jsonb_build_object(
  'heading_uz','Bizning missiyamiz','heading_ru','Наша миссия','heading_en','Our Mission',
  'body_uz','Sifatli, xavfsiz va arzon hayvon ozuqasini ishlab chiqarish.',
  'body_ru','Производить качественный, безопасный и доступный корм для животных.',
  'body_en','To produce safe, high-quality, affordable animal nutrition.'
) FROM public.pages WHERE slug = 'about';

CREATE POLICY "Public read cms-media" ON storage.objects FOR SELECT USING (bucket_id = 'cms-media');
CREATE POLICY "Content admins write cms-media" ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'cms-media' AND (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager')))
WITH CHECK (bucket_id = 'cms-media' AND (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager')));