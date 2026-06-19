import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, MessageSquare, Globe2, Languages, Plus, FolderTree } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

function StatCard({ icon: Icon, label, value, hint }: { icon: typeof Package; label: string; value: string | number; hint?: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
          </div>
          <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardPage() {
  const stats = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const [products, leads, leadsThisMonth, categories] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase
          .from("leads")
          .select("id", { count: "exact", head: true })
          .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
        supabase.from("product_categories").select("id", { count: "exact", head: true }),
      ]);
      return {
        products: products.count ?? 0,
        leads: leads.count ?? 0,
        leadsThisMonth: leadsThisMonth.count ?? 0,
        categories: categories.count ?? 0,
      };
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Boshqaruv paneli</h1>
        <p className="text-muted-foreground">Steppe Nutrition admin tizimiga xush kelibsiz.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Mahsulotlar" value={stats.data?.products ?? "—"} />
        <StatCard icon={MessageSquare} label="Jami sorovlar" value={stats.data?.leads ?? "—"} />
        <StatCard icon={MessageSquare} label="Bu oygi sorovlar" value={stats.data?.leadsThisMonth ?? "—"} />
        <StatCard icon={FolderTree} label="Kategoriyalar" value={stats.data?.categories ?? "—"} />
        <StatCard icon={Globe2} label="Eksport davlatlari" value="20+" hint="Phase 2'da boshqariladi" />
        <StatCard icon={Languages} label="Faol tillar" value="3" hint="UZ · RU · EN" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tezkor amallar</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/admin/products/new">
              <Plus className="h-4 w-4 mr-1" /> Mahsulot qo'shish
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/products">Mahsulotlarni korish</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/leads">Sorovlarni korish</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/categories">Kategoriyalarni boshqarish</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyingi bosqichlar</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>Phase 1 (hozir): Auth + Rollar + Dashboard + Mahsulotlar + Kategoriyalar + Sorovlar (RU/EN/UZ)</p>
          <p>Phase 2: Media Library, Sertifikatlar, Eksport boshqaruvi, Email bildirishnomalari</p>
          <p>Phase 3: CMS (sahifa kontenti), SEO boshqaruvi, Analytics, Settings</p>
        </CardContent>
      </Card>
    </div>
  );
}
