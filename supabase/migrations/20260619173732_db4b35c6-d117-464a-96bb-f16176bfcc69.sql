
DROP POLICY IF EXISTS "Admins read leads" ON public.leads;
CREATE POLICY "Admins read leads" ON public.leads
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'sales_manager'::app_role));

DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
CREATE POLICY "Users view own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR has_role(auth.uid(), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Public reads published" ON public.products;
CREATE POLICY "Public reads published" ON public.products
  FOR SELECT TO anon, authenticated
  USING (status = 'published'::product_status OR has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'content_manager'::app_role));

DROP FUNCTION IF EXISTS public.is_admin(uuid);

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
