"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";
import {
  getCategories,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  type Category,
  type Product,
} from "@/lib/api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [productResponse, categoryData] = await Promise.all([getProducts(), getCategories()]);
        setProducts(productResponse.results);
        setCategories(categoryData);
      } catch {
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = search
        ? product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description?.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesCategory = categoryFilter ? String(product.category) === categoryFilter : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const handleAdd = () => {
    setSelectedProduct(null);
    setProductModalOpen(true);
  };

  const handleSubmit = async ({
    formData,
    imageFile,
  }: {
    formData: FormData;
    imageFile?: File;
  }) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, formData);
        if (imageFile) {
          await uploadProductImage(selectedProduct.id, [imageFile]);
        }
      } else {
        const product = await createProduct(formData);
        if (imageFile) {
          await uploadProductImage(product.id, [imageFile]);
        }
      }
      const result = await getProducts();
      setProducts(result.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct(deleteTarget.id);
      setProducts((prev) => prev.filter((product) => product.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <AdminLoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Products</p>
          <h2 className="text-3xl font-semibold">Manage inventory</h2>
        </div>
        <Button onClick={handleAdd} className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <AdminSearchBar value={search} onChange={setSearch} placeholder="Search products" />
        <div className="max-w-xs">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <AdminEmptyState
          title="No matching products"
          message="Try adjusting the search or category filter."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category_name ?? "—"}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock_quantity ?? 0}</TableCell>
                <TableCell>
                  <Badge variant={product.availability ? "secondary" : "destructive"}>
                    {product.availability ? "Available" : "Out of stock"}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProduct(product);
                      setProductModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setDeleteTarget(product);
                      setDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ProductFormModal
        open={productModalOpen}
        onOpenChange={setProductModalOpen}
        categories={categories}
        initialData={selectedProduct ?? undefined}
        onSubmit={handleSubmit}
      />
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete product"
        description={`Are you sure you want to delete ${deleteTarget?.name ?? "this product"}? This cannot be undone.`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
