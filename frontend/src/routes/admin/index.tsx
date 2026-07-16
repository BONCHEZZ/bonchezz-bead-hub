import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ClipboardList,
  Layers,
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import { AdminSummaryCard } from "@/components/admin/AdminSummaryCard";
import {
  getCategories,
  getCustomers,
  getOrders,
  getProducts,
  type Category,
  type Customer,
  type Order,
  type Product,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [productResponse, categoryResponse, orderResponse, customerResponse] =
          await Promise.all([getProducts(), getCategories(), getOrders(), getCustomers()]);

        setProducts(productResponse.results);
        setCategories(categoryResponse);
        setOrders(orderResponse);
        setCustomers(customerResponse);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const lowStockProducts = useMemo(
    () =>
      products.filter(
        (product) => typeof product.stock_quantity === "number" && product.stock_quantity <= 5,
      ),
    [products],
  );

  const pendingOrders = useMemo(
    () => orders.filter((order) => order.status === "Pending"),
    [orders],
  );
  const completedOrders = useMemo(
    () => orders.filter((order) => order.status === "Completed"),
    [orders],
  );
  const latestCustomers = useMemo(
    () =>
      [...customers]
        .sort((a, b) => Number(new Date(b.registered_at)) - Number(new Date(a.registered_at)))
        .slice(0, 5),
    [customers],
  );

  const revenueToday = useMemo(() => {
    const today = new Date().toDateString();
    return orders
      .filter((order) => new Date(order.order_date).toDateString() === today)
      .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  }, [orders]);

  const monthlyRevenue = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return orders
      .filter((order) => {
        const d = new Date(order.order_date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  }, [orders]);

  const salesChartData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    return days.map((date) => {
      const dateStr = date.toDateString();
      const dayOrders = orders.filter(
        (order) => new Date(order.order_date).toDateString() === dateStr,
      );
      const revenue = dayOrders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
      return {
        name: date.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        orders: dayOrders.length,
        revenue,
      };
    });
  }, [orders]);

  const bestSellingProducts = useMemo(() => {
    const productMap = new Map<number, { name: string; quantity: number; revenue: number }>();
    orders.forEach((order) => {
      order.items?.forEach((item) => {
        const existing = productMap.get(Number(item.product)) || {
          name: item.product_name,
          quantity: 0,
          revenue: 0,
        };
        existing.quantity += Number(item.quantity || 0);
        existing.revenue += Number(item.price || 0) * Number(item.quantity || 0);
        productMap.set(Number(item.product), existing);
      });
    });
    return Array.from(productMap.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }, [orders]);

  if (loading) {
    return <AdminLoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminSummaryCard
          label="Total products"
          value={products.length}
          icon={Package}
          accent="gold"
        />
        <AdminSummaryCard
          label="Total categories"
          value={categories.length}
          icon={Layers}
          accent="purple"
        />
        <AdminSummaryCard
          label="Total orders"
          value={orders.length}
          icon={ShoppingBag}
          accent="pink"
        />
        <AdminSummaryCard
          label="Total customers"
          value={customers.length}
          icon={Users}
          accent="gold"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <AdminSummaryCard
          label="Revenue today"
          value={`KSh ${revenueToday.toLocaleString()}`}
          icon={DollarSign}
          accent="purple"
        />
        <AdminSummaryCard
          label="Monthly revenue"
          value={`KSh ${monthlyRevenue.toLocaleString()}`}
          icon={TrendingUp}
          accent="gold"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.75fr_1fr]">
        <section className="rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Sales overview
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Daily order count and revenue for the last 7 days.
              </p>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Low stock
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Products that need restocking soon.
                </p>
              </div>
              <Link
                to="/admin/inventory"
                className="text-sm font-semibold text-purple hover:text-foreground"
              >
                Manage inventory
              </Link>
            </div>
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No low stock products right now.</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="rounded-3xl border border-border bg-muted/60 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Stock: {product.stock_quantity ?? 0}
                        </p>
                      </div>
                      <Badge variant="destructive">Low</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  New customers
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Recently registered shoppers.</p>
              </div>
              <Link
                to="/admin/customers"
                className="text-sm font-semibold text-purple hover:text-foreground"
              >
                View customers
              </Link>
            </div>
            {latestCustomers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No customers have registered yet.</p>
            ) : (
              <div className="space-y-3">
                {latestCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="rounded-3xl border border-border bg-muted/60 p-4"
                  >
                    <p className="font-medium">{customer.full_name}</p>
                    <p className="text-xs text-muted-foreground">{customer.email}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Pending orders
          </p>
          <p className="mt-3 text-3xl font-semibold">{pendingOrders.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Awaiting processing</p>
        </Card>
        <Card className="rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Completed orders
          </p>
          <p className="mt-3 text-3xl font-semibold">{completedOrders.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Successfully fulfilled</p>
        </Card>
        <Card className="rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Low stock items
          </p>
          <p className="mt-3 text-3xl font-semibold">{lowStockProducts.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Below reorder threshold</p>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Recent orders
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest customer pickup and payment updates.
              </p>
            </div>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple hover:text-foreground"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {orders.length === 0 ? (
            <AdminEmptyState
              title="No orders yet"
              message="New orders will appear here once customers place them."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.order_number}</TableCell>
                    <TableCell>{order.customer_name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "secondary"
                            : order.status === "Pending"
                              ? "destructive"
                              : "default"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.total_amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>

        <section className="rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Best sellers
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Top products by quantity sold.</p>
            </div>
            <Link
              to="/admin/products"
              className="text-sm font-semibold text-purple hover:text-foreground"
            >
              View products
            </Link>
          </div>
          {bestSellingProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sales data available yet.</p>
          ) : (
            <div className="space-y-3">
              {bestSellingProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-3xl border border-border bg-muted/60 p-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple/10 text-sm font-semibold text-purple">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.quantity} sold</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    KSh {product.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
