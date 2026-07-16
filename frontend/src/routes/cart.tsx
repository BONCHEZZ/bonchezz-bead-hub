import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Bonchezz" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQuantity, remove, subtotal } = useCart();
  const delivery = subtotal > 0 ? 150 : 0;
  const total = subtotal + delivery;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Your Bag</h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-border bg-card p-10 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-primary-foreground">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-display text-2xl">Your bag is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Browse handmade pieces you'll actually wear.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-purple"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              {items.map((i) => (
                <li
                  key={i.product.id}
                  className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft sm:flex-row"
                >
                  <img
                    src={
                      i.product.images?.[0]?.image ??
                      i.product.image ??
                      "/src/assets/hero-beads.jpg"
                    }
                    alt={i.product.name}
                    className="h-32 w-full rounded-2xl object-cover sm:w-32"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to="/product/$id"
                          params={{ id: String(i.product.id) }}
                          className="font-display text-lg font-semibold hover:text-purple"
                        >
                          {i.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground capitalize">
                          {String(i.product.category).replace("-", " ")}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(String(i.product.id))}
                        className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border p-1">
                        <button
                          onClick={() => setQuantity(String(i.product.id), i.quantity - 1)}
                          className="grid h-8 w-8 place-items-center rounded-full hover:bg-accent"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold">
                          {i.quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(String(i.product.id), i.quantity + 1)}
                          className="grid h-8 w-8 place-items-center rounded-full hover:bg-accent"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-xl font-semibold">
                        KSh {(Number(i.product.price) * i.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-xl font-semibold">Order summary</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium">KSh {subtotal.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Delivery</dt>
                  <dd className="font-medium">KSh {delivery.toLocaleString()}</dd>
                </div>
                <div className="mt-3 flex justify-between border-t border-border pt-3 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-display text-xl font-bold">KSh {total.toLocaleString()}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-6 block rounded-full bg-gradient-brand py-3 text-center text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow"
              >
                Continue to checkout
              </Link>
              <Link
                to="/shop"
                className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground"
              >
                or keep shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
