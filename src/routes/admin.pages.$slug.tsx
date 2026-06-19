import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Loader2, Plus, Trash2, ArrowUp, ArrowDown, ChevronLeft, Eye, EyeOff, Save,
} from "lucide-react";
import { SECTION_DEFINITIONS, SECTION_LABELS, type SectionType } from "@/components/cms/section-types";
import type { CmsPage, CmsSection } from "@/hooks/use-cms-page";

const LANGS = ["uz", "ru", "en"] as const;

function usePageBuilder(slug: string) {
  return useQuery({
    queryKey: ["admin-cms-page", slug],
    queryFn: async () => {
      const { data: page, error } = await supabase.from("pages").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      if (!page) return null;
      const { data: sections, error: e2 } = await supabase
        .from("page_sections").select("*").eq("page_id", page.id).order("sort_order");
      if (e2) throw e2;
      return { page: page as CmsPage, sections: (sections ?? []) as CmsSection[] };
    },
  });
}

function PageSettingsForm({ page, onSaved }: { page: CmsPage; onSaved: () => void }) {
  const [form, setForm] = useState(page);
  const mut = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("pages").update({
        title_uz: form.title_uz, title_ru: form.title_ru, title_en: form.title_en,
        seo_title_uz: form.seo_title_uz, seo_title_ru: form.seo_title_ru, seo_title_en: form.seo_title_en,
        seo_description_uz: form.seo_description_uz, seo_description_ru: form.seo_description_ru, seo_description_en: form.seo_description_en,
        seo_keywords: form.seo_keywords, og_image_url: form.og_image_url, published: form.published,
      }).eq("id", page.id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Sahifa saqlandi"); onSaved(); },
    onError: (e: Error) => toast.error(e.message),
  });
  const set = (k: keyof CmsPage, v: unknown) => setForm({ ...form, [k]: v });
  return (
    <Card className="p-5 space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        {LANGS.map((l) => (
          <div key={l}>
            <Label>Sarlavha ({l.toUpperCase()})</Label>
            <Input value={(form as any)[`title_${l}`] ?? ""} onChange={(e) => set(`title_${l}` as keyof CmsPage, e.target.value)} />
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {LANGS.map((l) => (
          <div key={l}>
            <Label>SEO title ({l.toUpperCase()})</Label>
            <Input value={(form as any)[`seo_title_${l}`] ?? ""} onChange={(e) => set(`seo_title_${l}` as keyof CmsPage, e.target.value)} />
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {LANGS.map((l) => (
          <div key={l}>
            <Label>SEO description ({l.toUpperCase()})</Label>
            <Textarea rows={2} value={(form as any)[`seo_description_${l}`] ?? ""} onChange={(e) => set(`seo_description_${l}` as keyof CmsPage, e.target.value)} />
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <Label>SEO keywords</Label>
          <Input value={form.seo_keywords ?? ""} onChange={(e) => set("seo_keywords", e.target.value)} />
        </div>
        <div>
          <Label>OG image URL</Label>
          <Input value={form.og_image_url ?? ""} onChange={(e) => set("og_image_url", e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
        <Label>Published</Label>
      </div>
      <Button onClick={() => mut.mutate()} disabled={mut.isPending}>
        {mut.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
        Saqlash
      </Button>
    </Card>
  );
}

// ----- field renderers -----
function LangFields({ keyBase, content, set, multiline }: {
  keyBase: string; content: any; set: (k: string, v: unknown) => void; multiline?: boolean;
}) {
  return (
    <div className="grid md:grid-cols-3 gap-3">
      {LANGS.map((l) => {
        const k = `${keyBase}_${l}`;
        return (
          <div key={l}>
            <Label className="text-xs uppercase">{keyBase.replace(/_/g, " ")} ({l.toUpperCase()})</Label>
            {multiline ? (
              <Textarea rows={3} value={content[k] ?? ""} onChange={(e) => set(k, e.target.value)} />
            ) : (
              <Input value={content[k] ?? ""} onChange={(e) => set(k, e.target.value)} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ArrayItemsEditor({ content, set, itemFields, itemKey = "items" }: {
  content: any; set: (k: string, v: unknown) => void;
  itemFields: { key: string; label: string; multiLang?: boolean; multiline?: boolean }[];
  itemKey?: string;
}) {
  const items: any[] = content[itemKey] ?? [];
  const update = (next: any[]) => set(itemKey, next);
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <Card key={i} className="p-4 space-y-3 bg-muted/30">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Item #{i + 1}</span>
            <Button size="sm" variant="ghost" onClick={() => update(items.filter((_, j) => j !== i))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {itemFields.map((f) =>
            f.multiLang ? (
              <LangFields key={f.key} keyBase={f.key} content={it} multiline={f.multiline}
                set={(k, v) => update(items.map((x, j) => j === i ? { ...x, [k]: v } : x))} />
            ) : (
              <div key={f.key}>
                <Label className="text-xs">{f.label}</Label>
                <Input value={it[f.key] ?? ""}
                  onChange={(e) => update(items.map((x, j) => j === i ? { ...x, [f.key]: e.target.value } : x))} />
              </div>
            )
          )}
        </Card>
      ))}
      <Button variant="outline" size="sm" onClick={() => update([...items, {}])}>
        <Plus className="h-4 w-4 mr-2" /> Yangi item
      </Button>
    </div>
  );
}

function StringArrayEditor({ content, set, itemKey }: {
  content: any; set: (k: string, v: unknown) => void; itemKey: string;
}) {
  const items: string[] = content[itemKey] ?? [];
  const update = (next: string[]) => set(itemKey, next);
  return (
    <div className="space-y-2">
      {items.map((v, i) => (
        <div key={i} className="flex gap-2">
          <Input value={v} onChange={(e) => update(items.map((x, j) => j === i ? e.target.value : x))} />
          <Button size="icon" variant="ghost" onClick={() => update(items.filter((_, j) => j !== i))}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => update([...items, ""])}>
        <Plus className="h-4 w-4 mr-2" /> URL qo'shish
      </Button>
    </div>
  );
}

function SectionFields({ type, content, set }: { type: SectionType; content: any; set: (k: string, v: unknown) => void }) {
  switch (type) {
    case "hero":
      return (
        <>
          <LangFields keyBase="title" content={content} set={set} />
          <LangFields keyBase="subtitle" content={content} set={set} multiline />
          <LangFields keyBase="cta_text" content={content} set={set} />
          <div className="grid md:grid-cols-2 gap-3">
            <div><Label>CTA URL</Label><Input value={content.cta_url ?? ""} onChange={(e) => set("cta_url", e.target.value)} /></div>
            <div><Label>Background image URL</Label><Input value={content.background_image_url ?? ""} onChange={(e) => set("background_image_url", e.target.value)} /></div>
          </div>
        </>
      );
    case "text":
      return (<><LangFields keyBase="heading" content={content} set={set} /><LangFields keyBase="body" content={content} set={set} multiline /></>);
    case "image":
      return (
        <>
          <div><Label>Rasm URL</Label><Input value={content.image_url ?? ""} onChange={(e) => set("image_url", e.target.value)} /></div>
          <LangFields keyBase="caption" content={content} set={set} />
        </>
      );
    case "stats":
      return <ArrayItemsEditor content={content} set={set} itemFields={[
        { key: "value", label: "Qiymat (masalan 15+)" },
        { key: "label", label: "Label", multiLang: true },
      ]} />;
    case "gallery":
      return <StringArrayEditor content={content} set={set} itemKey="images" />;
    case "timeline":
      return <ArrayItemsEditor content={content} set={set} itemFields={[
        { key: "year", label: "Yil" },
        { key: "title", label: "Sarlavha", multiLang: true },
        { key: "description", label: "Tavsif", multiLang: true, multiline: true },
      ]} />;
    case "faq":
      return <ArrayItemsEditor content={content} set={set} itemFields={[
        { key: "question", label: "Savol", multiLang: true },
        { key: "answer", label: "Javob", multiLang: true, multiline: true },
      ]} />;
    case "cta":
      return (
        <>
          <LangFields keyBase="title" content={content} set={set} />
          <LangFields keyBase="description" content={content} set={set} multiline />
          <LangFields keyBase="button_text" content={content} set={set} />
          <div><Label>Tugma URL</Label><Input value={content.button_url ?? ""} onChange={(e) => set("button_url", e.target.value)} /></div>
        </>
      );
    case "video":
      return (
        <>
          <div><Label>Video URL (embed)</Label><Input value={content.video_url ?? ""} onChange={(e) => set("video_url", e.target.value)} /></div>
          <LangFields keyBase="caption" content={content} set={set} />
        </>
      );
    case "html":
      return <div><Label>HTML kod</Label><Textarea rows={8} value={content.html ?? ""} onChange={(e) => set("html", e.target.value)} /></div>;
  }
}

function SectionEditor({ section, onChange }: { section: CmsSection; onChange: (next: any) => void }) {
  const content = (section.content as Record<string, unknown>) ?? {};
  const set = (k: string, v: unknown) => onChange({ ...content, [k]: v });
  return <div className="space-y-4">{SectionFields({ type: section.section_type as SectionType, content, set })}</div>;
}

function PageBuilder() {
  const { slug } = useParams({ from: "/admin/pages/$slug" });
  const qc = useQueryClient();
  const { data, isLoading } = usePageBuilder(slug);
  const [addOpen, setAddOpen] = useState(false);
  const [addType, setAddType] = useState<SectionType>("hero");
  const [editing, setEditing] = useState<Record<string, any>>({});

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-cms-page", slug] });

  const addMut = useMutation({
    mutationFn: async () => {
      if (!data) return;
      const def = SECTION_DEFINITIONS.find((d) => d.type === addType)!;
      const maxOrder = Math.max(-1, ...data.sections.map((s) => s.sort_order));
      const { error } = await supabase.from("page_sections").insert({
        page_id: data.page.id, section_type: addType, sort_order: maxOrder + 1, content: def.defaultContent as any,
      });
      if (error) throw error;
    },
    onSuccess: () => { setAddOpen(false); invalidate(); toast.success("Bo'lim qo'shildi"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateContent = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: any }) => {
      const { error } = await supabase.from("page_sections").update({ content }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { invalidate(); toast.success("Saqlandi"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleVis = useMutation({
    mutationFn: async (s: CmsSection) => {
      const { error } = await supabase.from("page_sections").update({ visible: !s.visible }).eq("id", s.id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const removeSec = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("page_sections").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { invalidate(); toast.success("O'chirildi"); },
  });

  const reorder = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string; newOrder: number }) => {
      const { error } = await supabase.from("page_sections").update({ sort_order: newOrder }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;
  if (!data) return <p>Sahifa topilmadi.</p>;

  const move = (idx: number, dir: -1 | 1) => {
    const other = data.sections[idx + dir];
    if (!other) return;
    const cur = data.sections[idx];
    reorder.mutate({ id: cur.id, newOrder: other.sort_order });
    reorder.mutate({ id: other.id, newOrder: cur.sort_order });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/admin/pages" className="text-sm text-muted-foreground inline-flex items-center hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Sahifalar
          </Link>
          <h1 className="text-2xl font-bold mt-1">{data.page.title_uz || data.page.slug}</h1>
          <p className="text-sm text-muted-foreground">/{data.page.slug}</p>
        </div>
        <Link to="/$slug" params={{ slug: data.page.slug }} className="text-sm text-primary hover:underline">
          Saytda ko'rish →
        </Link>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Sahifa sozlamalari & SEO</h2>
        <PageSettingsForm page={data.page} onSaved={invalidate} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Bo'limlar ({data.sections.length})</h2>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Bo'lim qo'shish</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Yangi bo'lim turi</DialogTitle></DialogHeader>
              <Select value={addType} onValueChange={(v) => setAddType(v as SectionType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SECTION_DEFINITIONS.map((d) => (
                    <SelectItem key={d.type} value={d.type}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => addMut.mutate()} disabled={addMut.isPending}>Qo'shish</Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {data.sections.map((s, idx) => {
            const liveContent = editing[s.id] ?? (s.content as any);
            const dirty = editing[s.id] !== undefined;
            return (
              <Card key={s.id} className="p-5 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-muted">{SECTION_LABELS[s.section_type] ?? s.section_type}</span>
                    {!s.visible && <span className="text-xs text-muted-foreground">(yashirin)</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" disabled={idx === 0} onClick={() => move(idx, -1)}><ArrowUp className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" disabled={idx === data.sections.length - 1} onClick={() => move(idx, 1)}><ArrowDown className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => toggleVis.mutate(s)}>
                      {s.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => { if (confirm("O'chirilsinmi?")) removeSec.mutate(s.id); }}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <SectionEditor
                  section={{ ...s, content: liveContent }}
                  onChange={(next) => setEditing({ ...editing, [s.id]: next })}
                />
                {dirty && (
                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" onClick={() => {
                      updateContent.mutate({ id: s.id, content: liveContent }, {
                        onSuccess: () => setEditing((e) => { const n = { ...e }; delete n[s.id]; return n; }),
                      });
                    }}>
                      <Save className="h-4 w-4 mr-2" /> Bo'limni saqlash
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditing((e) => { const n = { ...e }; delete n[s.id]; return n; })}>
                      Bekor qilish
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
          {data.sections.length === 0 && (
            <Card className="p-10 text-center text-muted-foreground">Hali bo'limlar yo'q. "Bo'lim qo'shish" tugmasini bosing.</Card>
          )}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin/pages/$slug")({
  component: PageBuilder,
});
