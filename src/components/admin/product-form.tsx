import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export type ProductFormValues = {
  sku: string;
  slug: string;
  category_id: string | null;
  status: "draft" | "published";
  featured: boolean;
  name_uz: string; name_ru: string; name_en: string;
  description_uz: string; description_ru: string; description_en: string;
  ingredients_uz: string; ingredients_ru: string; ingredients_en: string;
  feeding_guide_uz: string; feeding_guide_ru: string; feeding_guide_en: string;
  product_type: string;
  protein_pct: string;
  fat_pct: string;
  moisture_pct: string;
  packaging_sizes: string; // comma separated
  shelf_life_months: string;
  cover_image_url: string;
  gallery_urls: string; // newline separated
  pdf_url: string;
};

const empty: ProductFormValues = {
  sku: "", slug: "", category_id: null, status: "draft", featured: false,
  name_uz: "", name_ru: "", name_en: "",
  description_uz: "", description_ru: "", description_en: "",
  ingredients_uz: "", ingredients_ru: "", ingredients_en: "",
  feeding_guide_uz: "", feeding_guide_ru: "", feeding_guide_en: "",
  product_type: "", protein_pct: "", fat_pct: "", moisture_pct: "",
  packaging_sizes: "", shelf_life_months: "",
  cover_image_url: "", gallery_urls: "", pdf_url: "",
};

export function ProductForm({ initial, productId }: { initial?: Partial<ProductFormValues>; productId?: string }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [v, setV] = useState<ProductFormValues>({ ...empty, ...initial });
  const set = <K extends keyof ProductFormValues>(k: K, val: ProductFormValues[K]) => setV((s) => ({ ...s, [k]: val }));

  const cats = useQuery({
    queryKey: ["categories-select"],
    queryFn: async () => {
      const { data, error } = await supabase.from("product_categories").select("id, name_uz").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        sku: v.sku.trim(),
        slug: v.slug.trim() || v.sku.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category_id: v.category_id || null,
        status: v.status,
        featured: v.featured,
        name_uz: v.name_uz, name_ru: v.name_ru || null, name_en: v.name_en || null,
        description_uz: v.description_uz || null, description_ru: v.description_ru || null, description_en: v.description_en || null,
        ingredients_uz: v.ingredients_uz || null, ingredients_ru: v.ingredients_ru || null, ingredients_en: v.ingredients_en || null,
        feeding_guide_uz: v.feeding_guide_uz || null, feeding_guide_ru: v.feeding_guide_ru || null, feeding_guide_en: v.feeding_guide_en || null,
        product_type: v.product_type || null,
        protein_pct: v.protein_pct ? Number(v.protein_pct) : null,
        fat_pct: v.fat_pct ? Number(v.fat_pct) : null,
        moisture_pct: v.moisture_pct ? Number(v.moisture_pct) : null,
        packaging_sizes: v.packaging_sizes ? v.packaging_sizes.split(",").map((s) => s.trim()).filter(Boolean) : null,
        shelf_life_months: v.shelf_life_months ? Number(v.shelf_life_months) : null,
        cover_image_url: v.cover_image_url || null,
        gallery_urls: v.gallery_urls ? v.gallery_urls.split("\n").map((s) => s.trim()).filter(Boolean) : null,
        pdf_url: v.pdf_url || null,
      };
      if (!payload.sku || !payload.name_uz) throw new Error("SKU va UZ nomi majburiy");
      if (productId) {
        const { error } = await supabase.from("products").update(payload).eq("id", productId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Saqlandi");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      navigate({ to: "/admin/products" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); save.mutate(); }}
      className="space-y-6"
    >
      <Card>
        <CardHeader><CardTitle>Asosiy ma'lumot</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>SKU *</Label>
            <Input value={v.sku} onChange={(e) => set("sku", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input value={v.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generate" />
          </div>
          <div className="space-y-2">
            <Label>Kategoriya</Label>
            <Select value={v.category_id ?? "none"} onValueChange={(val) => set("category_id", val === "none" ? null : val)}>
              <SelectTrigger><SelectValue placeholder="Tanlash" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— Yoq —</SelectItem>
                {cats.data?.map((c) => <SelectItem key={c.id} value={c.id}>{c.name_uz}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Mahsulot turi</Label>
            <Input value={v.product_type} onChange={(e) => set("product_type", e.target.value)} placeholder="Dry / Wet / Treats" />
          </div>
          <div className="space-y-2">
            <Label>Holat</Label>
            <Select value={v.status} onValueChange={(val: "draft" | "published") => set("status", val)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Qoralama</SelectItem>
                <SelectItem value="published">Chop etilgan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3 pt-7">
            <Switch checked={v.featured} onCheckedChange={(c) => set("featured", c)} id="featured" />
            <Label htmlFor="featured">Tanlangan mahsulot</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Kontent (3 tilda)</CardTitle></CardHeader>
        <CardContent>
          <Tabs defaultValue="uz">
            <TabsList>
              <TabsTrigger value="uz">UZ</TabsTrigger>
              <TabsTrigger value="ru">RU</TabsTrigger>
              <TabsTrigger value="en">EN</TabsTrigger>
            </TabsList>
            {(["uz", "ru", "en"] as const).map((lng) => (
              <TabsContent key={lng} value={lng} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Nomi {lng === "uz" && "*"}</Label>
                  <Input
                    value={v[`name_${lng}` as const]}
                    onChange={(e) => set(`name_${lng}` as const, e.target.value)}
                    required={lng === "uz"}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tavsif</Label>
                  <Textarea rows={4} value={v[`description_${lng}` as const]} onChange={(e) => set(`description_${lng}` as const, e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Tarkibi</Label>
                  <Textarea rows={3} value={v[`ingredients_${lng}` as const]} onChange={(e) => set(`ingredients_${lng}` as const, e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Boqish bo'yicha qollanma</Label>
                  <Textarea rows={3} value={v[`feeding_guide_${lng}` as const]} onChange={(e) => set(`feeding_guide_${lng}` as const, e.target.value)} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Spetsifikatsiya</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Protein %</Label><Input type="number" step="0.1" value={v.protein_pct} onChange={(e) => set("protein_pct", e.target.value)} /></div>
          <div className="space-y-2"><Label>Fat %</Label><Input type="number" step="0.1" value={v.fat_pct} onChange={(e) => set("fat_pct", e.target.value)} /></div>
          <div className="space-y-2"><Label>Namlik %</Label><Input type="number" step="0.1" value={v.moisture_pct} onChange={(e) => set("moisture_pct", e.target.value)} /></div>
          <div className="space-y-2 md:col-span-2"><Label>Qadoqlash olchamlari (vergul bilan)</Label><Input value={v.packaging_sizes} onChange={(e) => set("packaging_sizes", e.target.value)} placeholder="1kg, 3kg, 10kg" /></div>
          <div className="space-y-2"><Label>Saqlash muddati (oy)</Label><Input type="number" value={v.shelf_life_months} onChange={(e) => set("shelf_life_months", e.target.value)} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Media</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Asosiy rasm URL</Label><Input value={v.cover_image_url} onChange={(e) => set("cover_image_url", e.target.value)} /></div>
          <div className="space-y-2"><Label>Galereya URL (har biri yangi qatorga)</Label><Textarea rows={3} value={v.gallery_urls} onChange={(e) => set("gallery_urls", e.target.value)} /></div>
          <div className="space-y-2"><Label>PDF URL</Label><Input value={v.pdf_url} onChange={(e) => set("pdf_url", e.target.value)} /></div>
          <p className="text-xs text-muted-foreground">Media Library Phase 2'da qo'shiladi.</p>
        </CardContent>
      </Card>

      <div className="flex gap-2 justify-end sticky bottom-4 bg-background/80 backdrop-blur p-3 rounded-lg border shadow-sm">
        <Button type="button" variant="outline" onClick={() => navigate({ to: "/admin/products" })}>Bekor qilish</Button>
        <Button type="submit" disabled={save.isPending}>
          {save.isPending ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
          Saqlash
        </Button>
      </div>
    </form>
  );
}
