import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const STATUSES = [
  { v: "new", label: "Yangi" },
  { v: "contacted", label: "Bog'lanildi" },
  { v: "negotiating", label: "Muzokara" },
  { v: "sample_sent", label: "Namuna yuborildi" },
  { v: "won", label: "Yutildi" },
  { v: "lost", label: "Yo'qotildi" },
] as const;

type LeadStatus = (typeof STATUSES)[number]["v"];

export const Route = createFileRoute("/admin/leads")({
  component: LeadsPage,
});

function LeadsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      const { error } = await supabase.from("leads").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Yangilandi");
      qc.invalidateQueries({ queryKey: ["admin-leads"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sorovlar (CRM)</h1>
        <p className="text-muted-foreground">Mijozlardan kelgan sorovlarni boshqaring.</p>
      </div>

      <Card>
        {isLoading ? (
          <div className="p-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>
        ) : !data || data.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">Hali sorov yo'q.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sana</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead>Kompaniya</TableHead>
                <TableHead>Email / Tel</TableHead>
                <TableHead>Davlat</TableHead>
                <TableHead>Xabar</TableHead>
                <TableHead>Holat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="text-xs">{new Date(l.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{l.contact_name}</TableCell>
                  <TableCell>{l.company_name ?? "—"}</TableCell>
                  <TableCell className="text-xs">
                    <div>{l.email}</div>
                    <div className="text-muted-foreground">{l.phone}</div>
                  </TableCell>
                  <TableCell>{l.country ?? "—"}</TableCell>
                  <TableCell className="max-w-xs truncate text-sm" title={l.message ?? ""}>
                    {l.message ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Select value={l.status} onValueChange={(v: LeadStatus) => update.mutate({ id: l.id, status: v })}>
                      <SelectTrigger className="w-40 h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => <SelectItem key={s.v} value={s.v}>{s.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
