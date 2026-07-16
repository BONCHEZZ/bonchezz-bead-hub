"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus, Minus, XCircle } from "lucide-react";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";
import { getProducts, updateProductStock, type Product } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/inventory")({
  component: AdminInventory,
});

function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [savingId, setSavingId] = useState<number | string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const productResponse = await getProducts();
        setProducts(productResponse.results);
      } catch {
        setProducts([]);
        toast.error("Failed to load inventory");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const query = search.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.category_name?.toLowerCase().includes(query) ||
          String(product.stock_quantity).includes(query)
        );
      }),
    [products, search],
  );

  const lowStockProducts = useMemo(
    () =>
      products.filter(
        (product) => typeof product.stock_quantity === "number" && product.stock_quantity <= 5,
      ),
    [products],
  );

  const adjustStock = async (product: Product, delta: number) => {
    if (savingId) return;
    setSavingId(product.id);
    try {
      const current = Number(product.stock_quantity || 0);
      const next = Math.max(0, current + delta);
      const updated = await updateProductStock(product.id, next);
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      toast.success(`Stock updated to ${next}`);
    } catch {
      toast.error("Failed to update stock");
    } finally {
      setSavingId(null);
    }
  };

  const markOutOfStock = async (product: Product) => {
    if (savingId) return;
    setSavingId(product.id);
    try {
      const updated = await updateProductStock(product.id, 0);
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      toast.success("Marked as out of stock");
    } catch {
      toast.error("Failed to update stock");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return <AdminLoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Inventory</p>
        <h2 className="text-3xl font-semibold">Stock levels</h2>
      </div>

      <AdminSearchBar value={search} onChange={setSearch} placeholder="Search inventory" />

      {filteredProducts.length === 0 ? (
        <AdminEmptyState
          title="No products found"
          message="Search by item name, category, or stock level."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.stock_quantity ?? 0}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.stock_quantity && product.stock_quantity <= 5
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {product.stock_quantity && product.stock_quantity <= 5
                      ? "Low stock"
                      : "In stock"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Decrease stock"
                      disabled={savingId === product.id || (product.stock_quantity ?? 0) <= 0}
                      onClick={() => adjustStock(product, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Increase stock"
                      disabled={savingId === product.id}
                      onClick={() => adjustStock(product, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      aria-label="Mark out of stock"
                      disabled={savingId === product.id || (product.stock_quantity ?? 0) === 0}
                      onClick={() => markOutOfStock(product)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Low stock focus
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Highlighted products are below the reorder threshold and should be restocked soon.
        </p>
        <div className="mt-4 space-y-3">
          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items are currently low in stock.</p>
          ) : (
            lowStockProducts.map((product) => (
              <div key={product.id} className="rounded-3xl border border-border bg-muted/70 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium">{product.name}</p>
                  <Badge variant="destructive">{product.stock_quantity ?? 0} left</Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
