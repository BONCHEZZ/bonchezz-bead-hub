import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useAuth } from "@/lib/auth-context";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const token = localStorage.getItem("bonchezz-token");
    if (token) throw redirect({ to: "/" });
  },
  head: () => ({ meta: [{ title: "Login — Bonchezz" }] }),
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      window.location.href = "/";
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <div className="mx-auto grid min-h-[70vh] max-w-md items-center px-4 py-12">
        <div className="w-full rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Log in to track orders and save favorites.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Student email
              </span>
              <input
                name="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
              />
            </label>
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
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex justify-end text-xs">
              <a href="#" className="text-purple hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              disabled={loading}
              className="w-full rounded-full bg-foreground py-3 text-sm font-semibold text-background hover:bg-purple disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/register" className="font-medium text-purple hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
