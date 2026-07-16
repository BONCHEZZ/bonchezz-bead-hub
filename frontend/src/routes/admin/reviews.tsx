"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";
import { getAdminReviews, updateAdminReview, deleteAdminReview, type Review } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";

const ratingOptions = [1, 2, 3, 4, 5];

export const Route = createFileRoute("/admin/reviews")({
  component: AdminReviews,
});

function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdminReviews();
        setReviews(data);
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  const filteredReviews = useMemo(
    () =>
      reviews.filter((review) => {
        const query = search.toLowerCase();
        return (
          review.product_name?.toLowerCase().includes(query) ||
          review.user_name?.toLowerCase().includes(query) ||
          review.comment?.toLowerCase().includes(query)
        );
      }),
    [reviews, search],
  );

  const openEdit = (review: Review) => {
    setSelectedReview(review);
    setForm({ rating: review.rating, comment: review.comment });
    setEditOpen(true);
  };

  const saveEdit = async () => {
    if (!selectedReview) return;
    setSaving(true);
    try {
      const updated = await updateAdminReview(selectedReview.id, form);
      setReviews((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      setEditOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedReview) return;
    try {
      await deleteAdminReview(selectedReview.id);
      setReviews((prev) => prev.filter((r) => r.id !== selectedReview.id));
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <AdminLoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Reviews</p>
        <h2 className="text-3xl font-semibold">Customer reviews</h2>
      </div>

      <AdminSearchBar value={search} onChange={setSearch} placeholder="Search reviews" />

      {filteredReviews.length === 0 ? (
        <AdminEmptyState
          title="No reviews found"
          message="Customer reviews will appear here once submitted."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">
                  {review.product_name ?? `#${review.product}`}
                </TableCell>
                <TableCell>{review.user_name ?? `#${review.user}`}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{review.rating}/5</Badge>
                </TableCell>
                <TableCell className="max-w-[320px] truncate text-sm text-muted-foreground">
                  {review.comment}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(review)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedReview(review);
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

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit review</DialogTitle>
            <DialogDescription>Update the rating and comment for this review.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Rating</Label>
              <Select
                value={String(form.rating)}
                onValueChange={(value) => setForm((prev) => ({ ...prev, rating: Number(value) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  {ratingOptions.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Comment</Label>
              <Textarea
                value={form.comment}
                onChange={(e) => setForm((prev) => ({ ...prev, comment: e.target.value }))}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEdit} disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirmationModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete review"
        description={`Are you sure you want to delete this review? This cannot be undone.`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
