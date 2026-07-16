"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getBusinessSettings, updateBusinessSettings, type BusinessSettings } from "@/lib/api";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

const settingsSchema = z.object({
  business_name: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email(),
  description: z.string().optional(),
  pickup_location: z.string().min(2),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  whatsapp: z.string().optional(),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const form = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    async function load() {
      try {
        const businessSettings = await getBusinessSettings();
        setSettings(businessSettings);
        form.reset(businessSettings);
      } catch {
        setSettings(null);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [form]);

  const onSubmit = async (data: SettingsForm) => {
    setSaving(true);
    try {
      const updatedSettings = await updateBusinessSettings(data);
      setSettings(updatedSettings);
      form.reset(updatedSettings);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminLoadingSpinner />;
  }

  if (!settings) {
    return (
      <AdminEmptyState
        title="Settings unavailable"
        message="Unable to load business settings right now."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Settings</p>
        <h2 className="text-3xl font-semibold">Business information</h2>
      </div>

      <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span>Business name</span>
            <Input {...form.register("business_name")} />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Phone number</span>
            <Input {...form.register("phone")} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span>Email address</span>
            <Input {...form.register("email")} />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Pickup location</span>
            <Input {...form.register("pickup_location")} />
          </label>
        </div>

        <label className="grid gap-2 text-sm">
          <span>Business description</span>
          <Textarea {...form.register("description")} rows={5} />
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2 text-sm">
            <span>Instagram</span>
            <Input {...form.register("instagram")} />
          </label>
          <label className="grid gap-2 text-sm">
            <span>TikTok</span>
            <Input {...form.register("tiktok")} />
          </label>
          <label className="grid gap-2 text-sm">
            <span>WhatsApp</span>
            <Input {...form.register("whatsapp")} />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
