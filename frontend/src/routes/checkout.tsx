import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { CheckCircle2, Smartphone, Wallet } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/Layout";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { checkout as apiCheckout } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  beforeLoad: () => {
    const token = localStorage.getItem("bonchezz-token");
    if (!token) throw redirect({ to: "/login" });
  },
  head: () => ({ meta: [{ title: "Checkout — Bonchezz" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState<"mpesa" | "cash">("mpesa");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const delivery = items.length > 0 ? 100 : 0;
  const total = items.reduce((n, i) => n + i.quantity * Number(i.product.price), 0) + delivery;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    try {
      const form = e.currentTarget as HTMLFormElement;
      const pickup_location = (
        form.elements.namedItem("location") as HTMLInputElement
      ).value.trim();
      if (!pickup_location) {
        toast.error("Please enter a pickup location.");
        setLoading(false);
        return;
      }
      const payment_method = method === "cash" ? "Cash on Pickup" : "M-Pesa";
      await apiCheckout({
        pickup_location,
        payment_method,
      });
      clear();
      setSubmitted(true);
      toast.success("Order placed! We'll be in touch shortly.");
      setTimeout(() => navigate({ to: "/" }), 1800);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-primary-foreground">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold">Order confirmed!</h1>
          <p className="mt-2 text-muted-foreground">Check your email for pickup details.</p>
        </div>
      </SiteLayout>
    );
  }

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Your bag is empty</h1>
          <p className="mt-2 text-muted-foreground">Add something before checking out.</p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-purple"
          >
            Shop now
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Checkout</h1>

        <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl font-semibold">Delivery details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Full Name
                  </span>
                  <input
                    name="name"
                    defaultValue={user?.full_name || ""}
                    required
                    className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                    readOnly
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Phone Number
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    defaultValue={user?.phone_number || ""}
                    required
                    className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                    readOnly
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    defaultValue={user?.student_email || ""}
                    required
                    className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                    readOnly
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Hostel / Residence
                  </span>
                  <input
                    name="hostel"
                    required
                    className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Pickup Location
                  </span>
                  <input
                    name="location"
                    required
                    className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl font-semibold">Payment method</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <PaymentOption
                  active={method === "mpesa"}
                  onClick={() => {
                    toast.error("M-Pesa is not available yet. Please choose cash on pickup.");
                    setMethod("cash");
                  }}
                  icon={Smartphone}
                  title="M-Pesa"
                  subtitle="Pay via STK push"
                />
                <PaymentOption
                  active={method === "cash"}
                  onClick={() => setMethod("cash")}
                  icon={Wallet}
                  title="Cash on Pickup"
                  subtitle="Pay when you collect"
                />
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-xl font-semibold">Order summary</h3>
            <ul className="mt-4 space-y-3">
              {items.map((i) => (
                <li key={i.product.id} className="flex items-center gap-3 text-sm">
                  <img
                    src={
                      i.product.images?.[0]?.image ??
                      i.product.image ??
                      "/src/assets/hero-beads.jpg"
                    }
                    alt=""
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{i.product.name}</div>
                    <div className="text-xs text-muted-foreground">Qty {i.quantity}</div>
                  </div>
                  <span className="font-medium">
                    KSh {(Number(i.product.price) * i.quantity).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>
                  KSh{" "}
                  {items
                    .reduce((n, i) => n + i.quantity * Number(i.product.price), 0)
                    .toLocaleString()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd>KSh {delivery.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-display text-lg font-bold">KSh {total.toLocaleString()}</dd>
              </div>
            </dl>
            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="mt-6 block w-full rounded-full bg-gradient-brand py-3 text-center text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place order"}
            </button>
          </aside>
        </form>
      </div>
    </SiteLayout>
  );
}

function Field({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
      />
    </label>
  );
}

function PaymentOption({
  active,
  onClick,
  icon: Icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition",
        active ? "border-purple bg-secondary" : "border-border hover:border-foreground/20",
      )}
    >
      <div
        className={cn(
          "grid h-10 w-10 place-items-center rounded-full",
          active ? "bg-gradient-brand text-primary-foreground" : "bg-muted",
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
    </button>
  );
}
