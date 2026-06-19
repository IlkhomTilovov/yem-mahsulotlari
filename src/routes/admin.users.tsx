import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
});

function UsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const [profiles, roles] = await Promise.all([
        supabase.from("profiles").select("id, email, full_name, created_at").order("created_at", { ascending: false }),
        supabase.from("user_roles").select("user_id, role"),
      ]);
      if (profiles.error) throw profiles.error;
      if (roles.error) throw roles.error;
      const byUser = new Map<string, string[]>();
      for (const r of roles.data ?? []) {
        const arr = byUser.get(r.user_id) ?? [];
        arr.push(r.role);
        byUser.set(r.user_id, arr);
      }
      return (profiles.data ?? []).map((p) => ({ ...p, roles: byUser.get(p.id) ?? [] }));
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Foydalanuvchilar</h1>
        <p className="text-muted-foreground">Admin panelga kirish huquqiga ega foydalanuvchilar.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Yangi foydalanuvchi qo'shish</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Hozir foydalanuvchi qo'shish Lovable Cloud (Backend) panelidan amalga oshiriladi:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Backend → Users → Add user (email + parol)</li>
            <li>Backend → Database → user_roles jadvaliga yangi qator qo'shing: user_id + role (super_admin / content_manager / sales_manager)</li>
          </ol>
          <p>Phase 2'da bu jarayonni shu sahifa orqali avtomatlashtiramiz (Auth Admin API + edge function).</p>
        </CardContent>
      </Card>

      <Card>
        {isLoading ? (
          <div className="p-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Ism</TableHead>
                <TableHead>Rollar</TableHead>
                <TableHead>Qo'shilgan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.email}</TableCell>
                  <TableCell>{u.full_name ?? "—"}</TableCell>
                  <TableCell className="space-x-1">
                    {u.roles.length === 0 ? (
                      <Badge variant="outline">Rol yo'q</Badge>
                    ) : (
                      u.roles.map((r) => <Badge key={r} variant="secondary">{r.replaceAll("_", " ")}</Badge>)
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
