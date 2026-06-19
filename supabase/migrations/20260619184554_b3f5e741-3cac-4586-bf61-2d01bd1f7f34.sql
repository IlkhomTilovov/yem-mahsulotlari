CREATE TABLE public.site_translations (
  key text PRIMARY KEY,
  value_uz text,
  value_ru text,
  value_en text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_translations TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_translations TO authenticated;
GRANT ALL ON public.site_translations TO service_role;

ALTER TABLE public.site_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read translations"
  ON public.site_translations FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Editors can insert translations"
  ON public.site_translations FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager'));

CREATE POLICY "Editors can update translations"
  ON public.site_translations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager'));

CREATE POLICY "Editors can delete translations"
  ON public.site_translations FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_manager'));

CREATE TRIGGER trg_site_translations_touch
  BEFORE UPDATE ON public.site_translations
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();