import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site";
import { useCmsPage } from "@/hooks/use-cms-page";
import { CmsPageRenderer } from "@/components/cms/cms-page-renderer";
import { Loader2 } from "lucide-react";

function AboutPage() {
  const { data, isLoading } = useCmsPage("about");
  return (
    <SiteLayout>
      {isLoading ? (
        <div className="py-32 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : data ? (
        <CmsPageRenderer sections={data.sections} />
      ) : (
        <div className="py-32 text-center text-muted-foreground">Sahifa topilmadi</div>
      )}
    </SiteLayout>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Kompaniya haqida — Steppe Nutrition" },
      { name: "description", content: "Steppe Nutrition — vertikal integratsiyalangan uy hayvonlari ozuqasi ishlab chiqaruvchisi." },
    ],
  }),
  component: AboutPage,
});
