import { createFileRoute, Link, Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import {
  ClipboardList,
  CreditCard,
  Grid,
  Inbox,
  Layers,
  LogOut,
  Package,
  ShoppingBag,
  Settings,
  Star,
  Users,
  Bell,
  UserCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { AdminGuard } from "@/components/admin/AdminRouteGuard";
import { GlobalSearch } from "@/components/admin/GlobalSearch";
import { Toaster } from "@/components/ui/sonner";

const navigation = [
  { label: "Dashboard", to: "/admin", icon: Grid },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Categories", to: "/admin/categories", icon: Layers },
  { label: "Orders", to: "/admin/orders", icon: ShoppingBag },
  { label: "Customers", to: "/admin/customers", icon: Users },
  { label: "Reviews", to: "/admin/reviews", icon: Star },
  { label: "Inventory", to: "/admin/inventory", icon: ClipboardList },
  { label: "Messages", to: "/admin/messages", icon: Inbox },
  { label: "Payments", to: "/admin/payments", icon: CreditCard },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export const Route = createFileRoute("/admin/_layout")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Bonchezz" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const router = useRouter();
  const navigate = useNavigate();
  const currentPath = router.state.location.pathname;

  return (
    <AdminGuard>
      <SidebarProvider defaultOpen>
        <div className="min-h-screen bg-background text-foreground">
          <div className="flex min-h-screen">
            <Sidebar>
              <SidebarContent className="px-3 py-4">
                <SidebarHeader>
                  <div className="flex items-center justify-between gap-2 px-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        Admin
                      </p>
                      <p className="mt-1 text-lg font-semibold">Bonchezz Bead Hub</p>
                    </div>
                    <SidebarTrigger className="!h-9 !w-9" />
                  </div>
                </SidebarHeader>

                <nav className="mt-6">
                  <SidebarMenu>
                    {navigation.map((item) => (
                      <SidebarMenuItem key={item.to}>
                        <SidebarMenuButton
                          asChild
                          isActive={
                            currentPath === item.to ||
                            (item.to !== "/admin" && currentPath.startsWith(item.to))
                          }
                          tooltip={item.label}
                        >
                          <Link to={item.to} className="flex w-full items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </nav>

                <SidebarSeparator className="my-4" />

                <SidebarFooter>
                  <Button variant="ghost" size="default" asChild>
                    <Link to="/" className="w-full justify-start gap-3">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Link>
                  </Button>
                </SidebarFooter>
              </SidebarContent>
            </Sidebar>

            <SidebarInset className="flex-1 bg-background">
              <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-lg sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <SidebarTrigger className="!h-9 !w-9 sm:hidden" />
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                        Admin dashboard
                      </p>
                      <h1 className="text-xl font-semibold tracking-tight sm:text-3xl">
                        Manage the store with ease
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <GlobalSearch />
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Notifications"
                      className="relative"
                    >
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-gold" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Profile"
                      onClick={() => navigate({ to: "/admin/settings" })}
                    >
                      <UserCircle2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </header>
              <main className="space-y-8 px-4 py-6 xl:px-10">
                <Outlet />
              </main>
            </SidebarInset>
          </div>
          <Toaster />
        </div>
      </SidebarProvider>
    </AdminGuard>
  );
}
