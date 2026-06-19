import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type HeaderSettings = {
  logo_image_url: string | null;
  logo_text: string;
  logo_link: string;
  show_logo_image: boolean;
  show_logo_text: boolean;
  lang_uz_enabled: boolean;
  lang_ru_enabled: boolean;
  lang_en_enabled: boolean;
  default_lang: "UZ" | "RU" | "EN";
  cta_enabled: boolean;
  cta_text_uz: string;
  cta_text_ru: string;
  cta_text_en: string;
  cta_url: string;
};

export type NavItem = {
  id: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  url: string;
  sort_order: number;
  visible: boolean;
  open_new_tab: boolean;
};

export function useHeaderSettings() {
  return useQuery({
    queryKey: ["site-header"],
    queryFn: async () => {
      const { data, error } = await supabase.from("header_settings" as never).select("*").eq("id", true).maybeSingle();
      if (error) throw error;
      return data as unknown as HeaderSettings | null;
    },
    staleTime: 60_000,
  });
}

export function useNavItems() {
  return useQuery({
    queryKey: ["site-nav"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("nav_items" as never)
        .select("*")
        .eq("visible", true)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as unknown as NavItem[];
    },
    staleTime: 60_000,
  });
}
