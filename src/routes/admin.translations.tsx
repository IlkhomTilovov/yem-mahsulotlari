import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TEXT_KEY_GROUPS } from "@/lib/text-keys";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

type Row = { key: string; value_uz: string | null; value_ru: string | null; value_en: string | null };

export const Route = createFileRoute("/admin/translations")({
  component: TranslationsPage,
});

function TranslationsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-translations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_translations" as never)
        .select("key,value_uz,value_ru,value_en");
      if (error) throw error;
      const m: Record<string, Row> = {};
      for (const r of (data ?? []) as unknown as Row[]) m[r.key] = r;
      return m;
    },
  });

  const save = useMutation({
    mutationFn: async (row: Row) => {
      const { error } = await supabase
        .from("site_translations" as never)
        .upsert(row, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saqlandi");
      qc.invalidateQueries({ queryKey: ["admin-translations"] });
      qc.invalidateQueries({ queryKey: ["site-translations"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sayt matnlari (Translations)</h1>
        <p className="text-muted-foreground">Saytdagi har bir matnni UZ / RU / EN tillarida tahrirlash. Bo'sh qoldirilsa default UZ matn ko'rsatiladi.</p>
      </div>

      <Tabs defaultValue={TEXT_KEY_GROUPS[0].group}>
        <TabsList className="flex flex-wrap h-auto">
          {TEXT_KEY_GROUPS.map((g) => (
            <TabsTrigger key={g.group} value={g.group}>{g.label}</TabsTrigger>
          ))}
        </TabsList>
        {TEXT_KEY_GROUPS.map((g) => (
          <TabsContent key={g.group} value={g.group} className="space-y-4 pt-4">
            {g.keys.map((k) => (
              <KeyEditor
                key={k.key}
                meta={k}
                row={data?.[k.key]}
                onSave={(row) => save.mutate(row)}
                saving={save.isPending}
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function KeyEditor({
  meta, row, onSave, saving,
}: {
  meta: { key: string; default_uz: string; multiline?: boolean };
  row?: Row;
  onSave: (r: Row) => void;
  saving: boolean;
}) {
  const [uz, setUz] = useState(row?.value_uz ?? "");
  const [ru, setRu] = useState(row?.value_ru ?? "");
  const [en, setEn] = useState(row?.value_en ?? "");

  useEffect(() => {
    setUz(row?.value_uz ?? "");
    setRu(row?.value_ru ?? "");
    setEn(row?.value_en ?? "");
  }, [row?.value_uz, row?.value_ru, row?.value_en]);

  const dirty = useMemo(
    () => uz !== (row?.value_uz ?? "") || ru !== (row?.value_ru ?? "") || en !== (row?.value_en ?? ""),
    [uz, ru, en, row]
  );

  const Field = meta.multiline ? Textarea : Input;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-mono text-muted-foreground">{meta.key}</CardTitle>
        <p className="text-xs text-muted-foreground/70 italic">Default: {meta.default_uz}</p>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        <div className="space-y-1">
          <Label className="text-xs">UZ</Label>
          <Field value={uz} onChange={(e) => setUz(e.target.value)} placeholder={meta.default_uz} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">RU</Label>
          <Field value={ru} onChange={(e) => setRu(e.target.value)} placeholder="Русский" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">EN</Label>
          <Field value={en} onChange={(e) => setEn(e.target.value)} placeholder="English" />
        </div>
        <div className="md:col-span-3 flex justify-end">
          <Button
            size="sm"
            disabled={!dirty || saving}
            onClick={() => onSave({
              key: meta.key,
              value_uz: uz || null,
              value_ru: ru || null,
              value_en: en || null,
            })}
          >
            {saving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
            Saqlash
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
