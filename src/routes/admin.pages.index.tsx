import { createFileRoute, Link } from "@tanstack/react-router";
import { useCmsPagesList } from "@/hooks/use-cms-page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, ChevronRight } from "lucide-react";

function AdminPagesPage() {
  const { data: pages, isLoading } = useCmsPagesList();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">CMS Sahifalar</h1>
        <p className="text-muted-foreground text-sm">Sayt sahifalarini va ularning bo'limlarini boshqaring.</p>
      </div>
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      ) : (
        <div className="grid gap-3">
          {pages?.map((p) => (
            <Link key={p.id} to="/admin/pages/$slug" params={{ slug: p.slug }}>
              <Card className="p-4 flex items-center justify-between hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{p.title_uz || p.slug}</div>
                    <div className="text-xs text-muted-foreground">/{p.slug}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={p.published ? "default" : "secondary"}>
                    {p.published ? "Published" : "Draft"}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/admin/pages/")({
  component: AdminPagesPage,
});
