import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type CmsPage = Tables<"pages">;
export type CmsSection = Tables<"page_sections">;

export function useCmsPage(slug: string) {
  return useQuery({
    queryKey: ["cms-page", slug],
    queryFn: async () => {
      const { data: page, error } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (!page) return null;
      const { data: sections, error: e2 } = await supabase
        .from("page_sections")
        .select("*")
        .eq("page_id", page.id)
        .order("sort_order", { ascending: true });
      if (e2) throw e2;
      return { page, sections: sections ?? [] };
    },
  });
}

export function useCmsPagesList() {
  return useQuery({
    queryKey: ["cms-pages-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .order("slug");
      if (error) throw error;
      return data ?? [];
    },
  });
}
