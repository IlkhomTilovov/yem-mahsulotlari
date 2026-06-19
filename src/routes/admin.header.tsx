import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Plus, Pencil, Trash2, Upload, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin/header")({
  component: HeaderAdminPage,
});

type HeaderSettings = {
  id: boolean;
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

type NavItem = {
  id: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  url: string;
  sort_order: number;
  visible: boolean;
  open_new_tab: boolean;
};

function HeaderAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Header & Navigation</h1>
        <p className="text-muted-foreground">Logo, navigatsiya, tillar va CTA tugmasini boshqaring.</p>
      </div>
      <Tabs defaultValue="logo">
        <TabsList>
          <TabsTrigger value="logo">Logo & Sozlamalar</TabsTrigger>
          <TabsTrigger value="nav">Navigatsiya</TabsTrigger>
          <TabsTrigger value="lang">Tillar</TabsTrigger>
          <TabsTrigger value="cta">CTA tugmasi</TabsTrigger>
        </TabsList>
        <SettingsLoader>
          {(settings, save, saving) => (
            <>
              <TabsContent value="logo"><LogoTab s={settings} save={save} saving={saving} /></TabsContent>
              <TabsContent value="lang"><LangTab s={settings} save={save} saving={saving} /></TabsContent>
              <TabsContent value="cta"><CtaTab s={settings} save={save} saving={saving} /></TabsContent>
            </>
          )}
        </SettingsLoader>
        <TabsContent value="nav"><NavTab /></TabsContent>
      </Tabs>
    </div>
  );
}

function SettingsLoader({ children }: { children: (s: HeaderSettings, save: (p: Partial<HeaderSettings>) => void, saving: boolean) => React.ReactNode }) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["header-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("header_settings" as never).select("*").eq("id", true).maybeSingle();
      if (error) throw error;
      return data as unknown as HeaderSettings;
    },
  });
  const m = useMutation({
    mutationFn: async (patch: Partial<HeaderSettings>) => {
      const { error } = await supabase.from("header_settings" as never).update(patch as never).eq("id", true);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saqlandi");
      qc.invalidateQueries({ queryKey: ["header-settings"] });
      qc.invalidateQueries({ queryKey: ["site-header"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  if (isLoading || !data) return <div className="p-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  return <>{children(data, (p) => m.mutate(p), m.isPending)}</>;
}

function LogoTab({ s, save, saving }: { s: HeaderSettings; save: (p: Partial<HeaderSettings>) => void; saving: boolean }) {
  const [form, setForm] = useState(s);
  useEffect(() => setForm(s), [s]);
  const [uploading, setUploading] = useState(false);

  const onUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `logo-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("header-assets").upload(path, file, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("header-assets").getPublicUrl(path);
      setForm({ ...form, logo_image_url: data.publicUrl });
      toast.success("Yuklandi. 'Saqlash'ni bosing.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6 space-y-5 mt-4">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>Logo rasm</Label>
          {form.logo_image_url && <img src={form.logo_image_url} alt="logo" className="h-16 w-auto rounded border bg-muted/30 p-2" />}
          <div className="flex gap-2">
            <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} disabled={uploading} />
            {uploading && <Loader2 className="h-4 w-4 animate-spin self-center" />}
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Switch checked={form.show_logo_image} onCheckedChange={(v) => setForm({ ...form, show_logo_image: v })} />
            <span className="text-sm">Logo rasmni ko'rsatish</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Logo matni</Label>
          <Input value={form.logo_text} onChange={(e) => setForm({ ...form, logo_text: e.target.value })} maxLength={50} />
          <div className="flex items-center gap-2 pt-1">
            <Switch checked={form.show_logo_text} onCheckedChange={(v) => setForm({ ...form, show_logo_text: v })} />
            <span className="text-sm">Logo matnni ko'rsatish</span>
          </div>
        </div>
      </div>
      <div className="space-y-2 max-w-md">
        <Label>Logo havolasi</Label>
        <Input value={form.logo_link} onChange={(e) => setForm({ ...form, logo_link: e.target.value })} placeholder="/" />
      </div>
      <Button onClick={() => save(form)} disabled={saving}>
        {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Saqlash
      </Button>
    </Card>
  );
}

function LangTab({ s, save, saving }: { s: HeaderSettings; save: (p: Partial<HeaderSettings>) => void; saving: boolean }) {
  const [form, setForm] = useState(s);
  useEffect(() => setForm(s), [s]);
  const langs: { key: "UZ" | "RU" | "EN"; field: keyof HeaderSettings; label: string }[] = [
    { key: "UZ", field: "lang_uz_enabled", label: "O'zbek" },
    { key: "RU", field: "lang_ru_enabled", label: "Русский" },
    { key: "EN", field: "lang_en_enabled", label: "English" },
  ];
  return (
    <Card className="p-6 space-y-5 mt-4">
      <div className="space-y-3">
        <Label>Yoqilgan tillar</Label>
        {langs.map((l) => (
          <div key={l.key} className="flex items-center gap-3">
            <Switch checked={form[l.field] as boolean} onCheckedChange={(v) => setForm({ ...form, [l.field]: v } as HeaderSettings)} />
            <span className="text-sm font-medium w-20">{l.label}</span>
            <span className="text-xs text-muted-foreground">{l.key}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2 max-w-xs">
        <Label>Standart til</Label>
        <select className="w-full h-10 rounded-md border bg-background px-3 text-sm"
          value={form.default_lang}
          onChange={(e) => setForm({ ...form, default_lang: e.target.value as "UZ" | "RU" | "EN" })}>
          {langs.map((l) => <option key={l.key} value={l.key}>{l.label}</option>)}
        </select>
      </div>
      <Button onClick={() => save(form)} disabled={saving}>
        {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Saqlash
      </Button>
    </Card>
  );
}

function CtaTab({ s, save, saving }: { s: HeaderSettings; save: (p: Partial<HeaderSettings>) => void; saving: boolean }) {
  const [form, setForm] = useState(s);
  useEffect(() => setForm(s), [s]);
  return (
    <Card className="p-6 space-y-5 mt-4">
      <div className="flex items-center gap-2">
        <Switch checked={form.cta_enabled} onCheckedChange={(v) => setForm({ ...form, cta_enabled: v })} />
        <span className="text-sm font-medium">CTA tugmasi yoqilgan</span>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2"><Label>Matn (UZ)</Label><Input value={form.cta_text_uz} onChange={(e) => setForm({ ...form, cta_text_uz: e.target.value })} /></div>
        <div className="space-y-2"><Label>Matn (RU)</Label><Input value={form.cta_text_ru} onChange={(e) => setForm({ ...form, cta_text_ru: e.target.value })} /></div>
        <div className="space-y-2"><Label>Matn (EN)</Label><Input value={form.cta_text_en} onChange={(e) => setForm({ ...form, cta_text_en: e.target.value })} /></div>
      </div>
      <div className="space-y-2 max-w-md"><Label>CTA havolasi</Label><Input value={form.cta_url} onChange={(e) => setForm({ ...form, cta_url: e.target.value })} placeholder="/contact" /></div>
      <Button onClick={() => save(form)} disabled={saving}>
        {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Saqlash
      </Button>
    </Card>
  );
}

function NavTab() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["nav-items-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("nav_items" as never).select("*").order("sort_order");
      if (error) throw error;
      return data as unknown as NavItem[];
    },
  });
  const upsert = useMutation({
    mutationFn: async (item: Partial<NavItem> & { id?: string }) => {
      if (item.id) {
        const { error } = await supabase.from("nav_items" as never).update(item as never).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("nav_items" as never).insert(item as never);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Saqlandi");
      qc.invalidateQueries({ queryKey: ["nav-items-admin"] });
      qc.invalidateQueries({ queryKey: ["site-nav"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("nav_items" as never).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("O'chirildi");
      qc.invalidateQueries({ queryKey: ["nav-items-admin"] });
      qc.invalidateQueries({ queryKey: ["site-nav"] });
    },
  });

  const move = (item: NavItem, dir: -1 | 1) => {
    if (!data) return;
    const sorted = [...data].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex((i) => i.id === item.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    upsert.mutate({ id: item.id, sort_order: swap.sort_order });
    upsert.mutate({ id: swap.id, sort_order: item.sort_order });
  };

  return (
    <Card className="p-0 mt-4">
      <div className="p-4 flex items-center justify-between">
        <h2 className="font-semibold">Navigatsiya elementlari</h2>
        <NavItemDialog onSave={(d) => upsert.mutate(d)} trigger={<Button size="sm"><Plus className="h-4 w-4 mr-1" /> Qo'shish</Button>} />
      </div>
      {isLoading ? (
        <div className="p-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Tartib</TableHead>
              <TableHead>UZ</TableHead>
              <TableHead>RU</TableHead>
              <TableHead>EN</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Ko'rinadi</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(item, -1)}><ArrowUp className="h-3 w-3" /></Button>
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(item, 1)}><ArrowDown className="h-3 w-3" /></Button>
                  </div>
                </TableCell>
                <TableCell>{item.title_uz}</TableCell>
                <TableCell>{item.title_ru}</TableCell>
                <TableCell>{item.title_en}</TableCell>
                <TableCell className="font-mono text-xs">{item.url}{item.open_new_tab && " ↗"}</TableCell>
                <TableCell>
                  <Switch checked={item.visible} onCheckedChange={(v) => upsert.mutate({ id: item.id, visible: v })} />
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <NavItemDialog item={item} onSave={(d) => upsert.mutate({ ...d, id: item.id })} trigger={<Button size="sm" variant="ghost"><Pencil className="h-4 w-4" /></Button>} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>O'chirish?</AlertDialogTitle>
                        <AlertDialogDescription>"{item.title_uz}" elementini o'chirishni xohlaysizmi?</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Bekor</AlertDialogCancel>
                        <AlertDialogAction onClick={() => del.mutate(item.id)}>O'chirish</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}

function NavItemDialog({ item, onSave, trigger }: { item?: NavItem; onSave: (d: Partial<NavItem>) => void; trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({
    title_uz: item?.title_uz ?? "",
    title_ru: item?.title_ru ?? "",
    title_en: item?.title_en ?? "",
    url: item?.url ?? "/",
    sort_order: item?.sort_order ?? 100,
    visible: item?.visible ?? true,
    open_new_tab: item?.open_new_tab ?? false,
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{item ? "Tahrirlash" : "Yangi element"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1"><Label>Sarlavha (UZ)</Label><Input value={f.title_uz} onChange={(e) => setF({ ...f, title_uz: e.target.value })} /></div>
          <div className="space-y-1"><Label>Sarlavha (RU)</Label><Input value={f.title_ru} onChange={(e) => setF({ ...f, title_ru: e.target.value })} /></div>
          <div className="space-y-1"><Label>Sarlavha (EN)</Label><Input value={f.title_en} onChange={(e) => setF({ ...f, title_en: e.target.value })} /></div>
          <div className="space-y-1"><Label>URL</Label><Input value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} /></div>
          <div className="space-y-1"><Label>Tartib raqami</Label><Input type="number" value={f.sort_order} onChange={(e) => setF({ ...f, sort_order: parseInt(e.target.value) || 0 })} /></div>
          <div className="flex items-center gap-2"><Switch checked={f.visible} onCheckedChange={(v) => setF({ ...f, visible: v })} /><span className="text-sm">Ko'rinadi</span></div>
          <div className="flex items-center gap-2"><Switch checked={f.open_new_tab} onCheckedChange={(v) => setF({ ...f, open_new_tab: v })} /><span className="text-sm">Yangi oynada ochish</span></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Bekor</Button>
          <Button onClick={() => { onSave(f); setOpen(false); }} disabled={!f.title_uz || !f.url}>Saqlash</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
