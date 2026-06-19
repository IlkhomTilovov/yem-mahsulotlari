import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin/settings")({
  component: () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sozlamalar</h1>
        <p className="text-muted-foreground">Kompaniya ma'lumotlari va tizim sozlamalari.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Tez orada</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Phase 3'da: kompaniya ma'lumotlari, ijtimoiy tarmoqlar, WhatsApp/Telegram, ish vaqti, SEO standart qiymatlari.
        </CardContent>
      </Card>
    </div>
  ),
});
