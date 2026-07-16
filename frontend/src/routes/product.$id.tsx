import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart-context";
import { getProductById, getProducts, type Product } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: async ({ params }) => {
    try {
      const product = await getProductById(params.id);
      return { product };
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.name} — Bonchezz` : "Product — Bonchezz" },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:image", content: loaderData?.product.images?.[0]?.image ?? "" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("Default");
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    async function loadRelated() {
      const data = await getProducts();
      setRelated(data.results.filter((item) => item.id !== Number(product.id)).slice(0, 4));
    }

    void loadRelated();
  }, [product.id]);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          ·{" "}
          <Link to="/shop" className="hover:text-foreground">
            Shop
          </Link>{" "}
          · <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-3xl bg-muted shadow-soft"
          >
            <img
              src={product.images?.[0]?.image ?? ""}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </motion.div>

          <div className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-1 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(Number(product.rating))
                      ? "fill-gold text-gold"
                      : "text-muted-foreground",
                  )}
                />
              ))}
              <span className="ml-2 text-muted-foreground">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-display text-3xl font-semibold">
                KSh {Number(product.price).toLocaleString()}
              </span>
              {product.availability && (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-purple">
                  In stock
                </span>
              )}
            </div>
            <p className="mt-5 leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Color
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Default", "Rose", "Gold"].map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition",
                      color === c
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:bg-accent",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Quantity
              </div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-accent"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-10 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-accent"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  add(
                    {
                      id: String(product.id),
                      name: product.name,
                      price: Number(product.price),
                      image: product.images?.[0]?.image ?? "",
                      category: product.category_name ?? "",
                      description: product.description,
                      rating: Number(product.rating),
                      reviews: 0,
                      colors: ["Default"],
                      inStock: product.availability,
                    },
                    qty,
                  );
                  toast.success(`Added ${qty} × ${product.name}`);
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background hover:bg-purple transition"
              >
                <ShoppingBag className="h-4 w-4" /> Add to cart
              </button>
              <Link
                to="/checkout"
                onClick={() =>
                  add(
                    {
                      id: String(product.id),
                      name: product.name,
                      price: Number(product.price),
                      image: product.images?.[0]?.image ?? "",
                      category: product.category_name ?? "",
                      description: product.description,
                      rating: Number(product.rating),
                      reviews: 0,
                      colors: ["Default"],
                      inStock: product.availability,
                    },
                    qty,
                  )
                }
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition"
              >
                <Zap className="h-4 w-4" /> Buy now
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">You may also love</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
