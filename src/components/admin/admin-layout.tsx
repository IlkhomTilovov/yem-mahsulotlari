import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useAdminAuth, type AppRole } from "@/hooks/use-admin-auth";
import { Button } from "@/components/ui/button";
import { Loader2, LayoutDashboard, Package, Users, MessageSquare, LogOut, Settings, FolderTree } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles?: AppRole[]; // undefined = all admins
}

const NAV: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Mahsulotlar", icon: Package, roles: ["super_admin", "content_manager"] },
  { to: "/admin/categories", label: "Kategoriyalar", icon: FolderTree, roles: ["super_admin", "content_manager"] },
  { to: "/admin/leads", label: "Sorovlar (CRM)", icon: MessageSquare, roles: ["super_admin", "sales_manager"] },
  { to: "/admin/users", label: "Foydalanuvchilar", icon: Users, roles: ["super_admin"] },
  { to: "/admin/settings", label: "Sozlamalar", icon: Settings, roles: ["super_admin"] },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const auth = useAdminAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!auth.loading && !auth.user) navigate({ to: "/auth" });
  }, [auth.loading, auth.user, navigate]);

  if (auth.loading || !auth.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!auth.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">Ruxsat yoq</h1>
          <p className="text-muted-foreground">
            Sizning akkauntingizga hech qanday admin roli berilmagan. Super admin bilan bogla&apos;ning.
          </p>
          <Button onClick={() => auth.signOut().then(() => navigate({ to: "/auth" }))}>Chiqish</Button>
        </div>
      </div>
    );
  }

  const visibleNav = NAV.filter((i) => !i.roles || i.roles.some((r) => auth.hasRole(r)));

  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="w-64 bg-card border-r flex flex-col">
        <div className="px-6 py-5 border-b">
          <Link to="/admin" className="font-bold text-lg tracking-tight">Logo Admin</Link>
          <p className="text-xs text-muted-foreground mt-0.5">Steppe Nutrition</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to || (item.to !== "/admin" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t space-y-2">
          <div className="px-3 py-2 text-xs">
            <p className="font-medium truncate">{auth.user.email}</p>
            <p className="text-muted-foreground capitalize">{auth.roles.join(", ").replaceAll("_", " ")}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => auth.signOut().then(() => navigate({ to: "/auth" }))}
          >
            <LogOut className="h-4 w-4 mr-2" /> Chiqish
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
