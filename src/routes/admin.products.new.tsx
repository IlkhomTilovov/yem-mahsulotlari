import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductForm } from "@/components/admin/product-form";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/admin/products/new")({
  component: () => (
    <div className="space-y-6">
      <div>
        <Link to="/admin/products" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" /> Mahsulotlar
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mt-2">Yangi mahsulot</h1>
      </div>
      <ProductForm />
    </div>
  ),
});
