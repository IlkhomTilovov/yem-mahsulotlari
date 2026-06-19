import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductForm, type ProductFormValues } from "@/components/admin/product-form";
import { ChevronLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/products/$id")({
  component: EditProductPage,
});

function EditProductPage() {
  const { id } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (!data) return <p>Topilmadi.</p>;

  const initial: Partial<ProductFormValues> = {
    sku: data.sku, slug: data.slug, category_id: data.category_id, status: data.status, featured: data.featured,
    name_uz: data.name_uz ?? "", name_ru: data.name_ru ?? "", name_en: data.name_en ?? "",
    description_uz: data.description_uz ?? "", description_ru: data.description_ru ?? "", description_en: data.description_en ?? "",
    ingredients_uz: data.ingredients_uz ?? "", ingredients_ru: data.ingredients_ru ?? "", ingredients_en: data.ingredients_en ?? "",
    feeding_guide_uz: data.feeding_guide_uz ?? "", feeding_guide_ru: data.feeding_guide_ru ?? "", feeding_guide_en: data.feeding_guide_en ?? "",
    product_type: data.product_type ?? "",
    protein_pct: data.protein_pct?.toString() ?? "",
    fat_pct: data.fat_pct?.toString() ?? "",
    moisture_pct: data.moisture_pct?.toString() ?? "",
    packaging_sizes: data.packaging_sizes?.join(", ") ?? "",
    shelf_life_months: data.shelf_life_months?.toString() ?? "",
    cover_image_url: data.cover_image_url ?? "",
    gallery_urls: data.gallery_urls?.join("\n") ?? "",
    pdf_url: data.pdf_url ?? "",
  };

  return (
    <div className="space-y-6">
      <div>
        <Link to="/admin/products" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" /> Mahsulotlar
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mt-2">{data.name_uz}</h1>
      </div>
      <ProductForm initial={initial} productId={id} />
    </div>
  );
}
