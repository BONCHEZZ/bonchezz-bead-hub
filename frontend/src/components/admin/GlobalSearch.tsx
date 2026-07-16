"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

type ResultItem = {
  type: "product" | "category" | "customer" | "order";
  id: number | string;
  label: string;
  sublabel: string;
  to: string;
};

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    async function load() {
      try {
        const [p, c, cu, o] = await Promise.all([
          getProducts(),
          getCategories(),
          getCustomers(),
          getOrders(),
        ]);
        if (!cancelled) {
          setProducts(p.results);
          setCategories(c);
          setCustomers(cu);
          setOrders(o);
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
          setCategories([]);
          setCustomers([]);
          setOrders([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const results = useMemo<ResultItem[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const items: ResultItem[] = [];

    products.forEach((product) => {
      if (
        product.name.toLowerCase().includes(q) ||
        product.description?.toLowerCase().includes(q)
      ) {
        items.push({
          type: "product",
          id: product.id,
          label: product.name,
          sublabel: `Product - ${product.category_name ?? ""}`,
          to: `/admin/products`,
        });
      }
    });

    categories.forEach((category) => {
      if (
        category.name.toLowerCase().includes(q) ||
        category.description?.toLowerCase().includes(q)
      ) {
        items.push({
          type: "category",
          id: category.id,
          label: category.name,
          sublabel: "Category",
          to: `/admin/categories`,
        });
      }
    });

    customers.forEach((customer) => {
      if (
        customer.full_name.toLowerCase().includes(q) ||
        customer.email.toLowerCase().includes(q) ||
        customer.phone.toLowerCase().includes(q)
      ) {
        items.push({
          type: "customer",
          id: customer.id,
          label: customer.full_name,
          sublabel: customer.email,
          to: `/admin/customers`,
        });
      }
    });

    orders.forEach((order) => {
      if (
        order.order_number.toLowerCase().includes(q) ||
        order.customer_name.toLowerCase().includes(q) ||
        order.phone.toLowerCase().includes(q)
      ) {
        items.push({
          type: "order",
          id: order.id,
          label: `#${order.order_number}`,
          sublabel: `${order.customer_name} - ${order.status}`,
          to: `/admin/orders`,
        });
      }
    });

    return items.slice(0, 20);
  }, [query, products, categories, customers, orders]);

  const handleSelect = (item: ResultItem) => {
    setOpen(false);
    setQuery("");
    void navigate({ to: item.to });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search" className="hidden sm:flex">
          <Search className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search products, categories, customers, orders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {loading && <p className="text-sm text-muted-foreground">Loading data...</p>}
          {!loading && query && results.length === 0 && (
            <p className="text-sm text-muted-foreground">No results found.</p>
          )}
          <div className="max-h-[50vh] space-y-2 overflow-y-auto">
            {results.map((item) => (
              <button
                key={`${item.type}-${item.id}`}
                type="button"
                onClick={() => handleSelect(item)}
                className="flex w-full items-center gap-4 rounded-2xl border border-border p-4 text-left hover:bg-muted/60"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sublabel}</p>
                </div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {item.type}
                </span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
