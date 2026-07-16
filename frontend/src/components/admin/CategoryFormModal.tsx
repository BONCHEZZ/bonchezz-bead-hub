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
import type { Category } from "@/lib/api";

const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  description: z.string().optional(),
  image: z.any().optional(),
});

type CategoryFormFields = z.infer<typeof categorySchema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Category;
  onSubmit: (payload: FormData) => Promise<void>;
};

export function CategoryFormModal({ open, onOpenChange, initialData, onSubmit }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm<CategoryFormFields>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
    },
  });

  useEffect(() => {
    setPreview(initialData?.image ?? null);
    form.reset({
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
    });
  }, [initialData, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = async (values: CategoryFormFields) => {
    const payload = new FormData();
    payload.append("name", values.name);
    payload.append("description", values.description ?? "");

    const imageField = (form.getValues("image") as FileList | undefined)?.[0];
    if (imageField) {
      payload.append("image", imageField);
    }

    await onSubmit(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit category" : "Add category"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update category details."
              : "Create a new category for the product catalog."}
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 pt-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <label className="grid gap-2 text-sm">
            <span>Name</span>
            <Input {...form.register("name")} />
          </label>

          <label className="grid gap-2 text-sm">
            <span>Description</span>
            <Textarea {...form.register("description")} rows={4} />
          </label>

          <label className="grid gap-2 text-sm">
            <span>Category image</span>
            <Input
              type="file"
              accept="image/*"
              {...form.register("image")}
              onChange={handleFileChange}
            />
          </label>

          {preview && (
            <div className="grid gap-2 text-sm">
              <span>Preview</span>
              <img
                src={preview}
                alt="Preview"
                className="h-32 w-32 rounded-2xl object-cover border border-border"
              />
            </div>
          )}

          <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
