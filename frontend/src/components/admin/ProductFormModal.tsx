"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category, Product } from "@/lib/api";

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price"),
  stock_quantity: z.string().regex(/^\d+$/, "Enter a valid quantity"),
  availability: z.boolean(),
  discount_price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid discount price")
    .optional()
    .or(z.literal("")),
  image: z.any().optional(),
});

type ProductFormFields = z.infer<typeof productSchema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  initialData?: Product;
  onSubmit: (payload: { formData: FormData; imageFile?: File }) => Promise<void>;
};

export function ProductFormModal({ open, onOpenChange, categories, initialData, onSubmit }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm<ProductFormFields>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      category: String(initialData?.category ?? ""),
      description: initialData?.description ?? "",
      price: String(initialData?.price ?? ""),
      stock_quantity: String(initialData?.stock_quantity ?? ""),
      availability: initialData?.availability ?? true,
      discount_price: initialData?.discount_price ? String(initialData.discount_price) : "",
    },
  });

  useEffect(() => {
    setPreview(initialData?.image ?? initialData?.images?.[0]?.image ?? null);
    form.reset({
      name: initialData?.name ?? "",
      category: String(initialData?.category ?? ""),
      description: initialData?.description ?? "",
      price: String(initialData?.price ?? ""),
      stock_quantity: String(initialData?.stock_quantity ?? ""),
      availability: initialData?.availability ?? true,
      discount_price: initialData?.discount_price ? String(initialData.discount_price) : "",
    });
  }, [initialData, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const submitForm = async (data: ProductFormFields) => {
    const payload = new FormData();
    payload.append("name", data.name);
    payload.append("category", data.category);
    payload.append("description", data.description ?? "");
    payload.append("price", data.price);
    payload.append("stock_quantity", data.stock_quantity);
    payload.append("availability", data.availability ? "true" : "false");
    if (data.discount_price) {
      payload.append("discount_price", data.discount_price);
    }
    if (initialData?.id) {
      payload.append("featured", String(!!initialData.featured));
    }

    const imageField = (form.getValues("image") as FileList | undefined)?.[0];
    await onSubmit({ formData: payload, imageFile: imageField });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit product" : "Add new product"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update product details and inventory."
              : "Create a new product listing for the store."}
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 pt-4" onSubmit={form.handleSubmit(submitForm)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span>Name</span>
              <Input {...form.register("name")} />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Category</span>
              <Select onValueChange={(value) => form.setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pick a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          </div>

          <label className="grid gap-2 text-sm">
            <span>Description</span>
            <Textarea {...form.register("description")} rows={4} />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="grid gap-2 text-sm">
              <span>Price</span>
              <Input {...form.register("price")} placeholder="00.00" />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Discount price</span>
              <Input {...form.register("discount_price")} placeholder="00.00" />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Stock quantity</span>
              <Input {...form.register("stock_quantity")} placeholder="0" />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span>Availability</span>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...form.register("availability")}
                  className="h-4 w-4 rounded border-border"
                />
                <span>{form.watch("availability") ? "Available" : "Out of stock"}</span>
              </div>
            </label>
            <label className="grid gap-2 text-sm">
              <span>Product image</span>
              <Input
                type="file"
                accept="image/*"
                {...form.register("image")}
                onChange={handleFileChange}
              />
            </label>
          </div>

          {preview && (
            <div className="grid gap-2 text-sm">
              <span>Preview</span>
              <img
                src={preview}
                alt="Preview"
                className="h-40 w-40 rounded-2xl object-cover border border-border"
              />
            </div>
          )}

          <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
