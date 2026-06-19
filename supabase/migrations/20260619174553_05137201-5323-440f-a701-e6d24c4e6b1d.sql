
CREATE TABLE public.header_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id = true),
  logo_image_url text,
  logo_text text NOT NULL DEFAULT 'Steppe Nutrition',
  logo_link text NOT NULL DEFAULT '/',
  show_logo_image boolean NOT NULL DEFAULT false,
  show_logo_text boolean NOT NULL DEFAULT true,
  lang_uz_enabled boolean NOT NULL DEFAULT true,
  lang_ru_enabled boolean NOT NULL DEFAULT true,
  lang_en_enabled boolean NOT NULL DEFAULT true,
  default_lang text NOT NULL DEFAULT 'UZ' CHECK (default_lang IN ('UZ','RU','EN')),
  cta_enabled boolean NOT NULL DEFAULT true,
  cta_text_uz text NOT NULL DEFAULT 'Narx so''rash',
  cta_text_ru text NOT NULL DEFAULT 'Запросить цену',
  cta_text_en text NOT NULL DEFAULT 'Request a quote',
  cta_url text NOT NULL DEFAULT '/contact',
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.header_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.header_settings TO authenticated;
GRANT ALL ON public.header_settings TO service_role;

ALTER TABLE public.header_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads header" ON public.header_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage header" ON public.header_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_manager'))
  WITH CHECK (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_manager'));

CREATE TRIGGER trg_header_settings_updated BEFORE UPDATE ON public.header_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.header_settings (id) VALUES (true);

CREATE TABLE public.nav_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_uz text NOT NULL,
  title_ru text NOT NULL,
  title_en text NOT NULL,
  url text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  open_new_tab boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.nav_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.nav_items TO authenticated;
GRANT ALL ON public.nav_items TO service_role;

ALTER TABLE public.nav_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads nav" ON public.nav_items FOR SELECT USING (true);
CREATE POLICY "Admins manage nav" ON public.nav_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_manager'))
  WITH CHECK (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'content_manager'));

CREATE TRIGGER trg_nav_items_updated BEFORE UPDATE ON public.nav_items
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.nav_items (title_uz,title_ru,title_en,url,sort_order) VALUES
  ('Kompaniya','Компания','Company','/about',10),
  ('Mahsulotlar','Продукты','Products','/products',20),
  ('Private Label','Private Label','Private Label','/private-label',30),
  ('Sifat','Качество','Quality','/quality',40),
  ('Ishlab chiqarish','Производство','Production','/production',50),
  ('Eksport','Экспорт','Export','/export',60),
  ('Aloqa','Контакты','Contact','/contact',70);
