import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type TranslationRow = {
  key: string;
  value_uz: string | null;
  value_ru: string | null;
  value_en: string | null;
};

export type CopyMap = Record<string, TranslationRow>;

export function useSiteCopy() {
  return useQuery<CopyMap>({
    queryKey: ["site-translations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_translations" as never)
        .select("key,value_uz,value_ru,value_en");
      if (error) throw error;
      const map: CopyMap = {};
      for (const r of (data ?? []) as unknown as TranslationRow[]) {
        map[r.key] = r;
      }
      return map;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });
}

/** Apply dot-path overrides on top of a deeply nested base object. */
export function applyOverrides<T>(base: T, copy: CopyMap | undefined, lang: "UZ" | "RU" | "EN"): T {
  if (!copy || Object.keys(copy).length === 0) return base;
  const out: unknown = structuredClone(base);
  const langKey = `value_${lang.toLowerCase()}` as "value_uz" | "value_ru" | "value_en";
  for (const [key, row] of Object.entries(copy)) {
    const v = (row[langKey] ?? row.value_uz) || undefined;
    if (v == null) continue;
    setPath(out, key.split("."), v);
  }
  return out as T;
}

function setPath(obj: unknown, segs: string[], val: string) {
  let cur: Record<string, unknown> | unknown[] = obj as Record<string, unknown>;
  for (let i = 0; i < segs.length - 1; i++) {
    const k = segs[i];
    const next = (cur as Record<string, unknown>)[k];
    if (next == null || typeof next !== "object") return; // path doesn't exist — skip
    cur = next as Record<string, unknown>;
  }
  const last = segs[segs.length - 1];
  const idx = Number(last);
  if (Array.isArray(cur) && !Number.isNaN(idx)) {
    cur[idx] = val;
  } else {
    (cur as Record<string, unknown>)[last] = val;
  }
}
