import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useAuth } from "@/lib/auth-context";
import { useState, type FormEvent } from "react";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    const token = localStorage.getItem("bonchezz-token");
    if (token) throw redirect({ to: "/" });
  },
  head: () => ({ meta: [{ title: "Create account — Bonchezz" }] }),
  component: Register,
});

function Register() {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const full_name = (form.elements.namedItem("full_name") as HTMLInputElement).value.trim();
    const student_email = (
      form.elements.namedItem("student_email") as HTMLInputElement
    ).value.trim();
    const phone_number = (form.elements.namedItem("phone_number") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;
    if (!full_name || !student_email || !phone_number || !password || !confirm) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await register({ full_name, student_email, phone_number, password });
      toast.success("Account created!");
      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data as Record<string, unknown>;
        const messages: string[] = [];
        if (typeof data.detail === "string") {
          messages.push(data.detail);
        }
        for (const value of Object.values(data)) {
          if (Array.isArray(value)) {
            messages.push(value.join(" "));
          } else if (typeof value === "string") {
            messages.push(value);
          }
        }
        setError(
          messages.filter(Boolean).join(" ") ||
            "Could not create account. The email may already be in use.",
        );
      } else {
        setError("Could not create account. The email may already be in use.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <div className="mx-auto grid min-h-[70vh] max-w-md items-center px-4 py-12">
        <div className="w-full rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h1 className="font-display text-3xl font-bold">Join the club</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Members get early drops and student discounts.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Full name
              </span>
              <input
                name="full_name"
                required
                className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Student email
              </span>
              <input
                name="student_email"
                type="email"
                required
                className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Phone number
              </span>
              <input
                name="phone_number"
                type="tel"
                required
                className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Password
                </span>
                <input
                  name="password"
                  type="password"
                  required
                  className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Confirm password
                </span>
                <input
                  name="confirm"
                  type="password"
                  required
                  className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
                />
              </label>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              disabled={loading}
              className="w-full rounded-full bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have one?{" "}
            <Link to="/login" className="font-medium text-purple hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
