"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";
import { CategoryFormModal } from "@/components/admin/CategoryFormModal";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const categoryResponse = await getCategories();
        setCategories(categoryResponse);
      } catch {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) => category.name.toLowerCase().includes(search.toLowerCase())),
    [categories, search],
  );

  const handleSubmit = async (payload: FormData) => {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, payload);
      } else {
        await createCategory(payload);
      }
      const refreshed = await getCategories();
      setCategories(refreshed);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory.id);
      setCategories((prev) => prev.filter((category) => category.id !== selectedCategory.id));
      setSelectedCategory(null);
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
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Categories</p>
          <h2 className="text-3xl font-semibold">Manage product categories</h2>
        </div>
        <Button
          onClick={() => {
            setSelectedCategory(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add category
        </Button>
      </div>

      <AdminSearchBar value={search} onChange={setSearch} placeholder="Search categories" />

      {filteredCategories.length === 0 ? (
        <AdminEmptyState
          title="No categories found"
          message="Create a new category to group your products."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description ?? "—"}</TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category);
                      setDeleteOpen(true);
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

      <CategoryFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={selectedCategory ?? undefined}
        onSubmit={handleSubmit}
      />
      <DeleteConfirmationModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete category"
        description={`Are you sure you want to delete ${selectedCategory?.name ?? "this category"}?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
