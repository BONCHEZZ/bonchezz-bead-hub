import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { getCategories, getProducts, type Category, type Product } from "@/lib/api";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — Bonchezz Bead Hub" },
      {
        name: "description",
        content:
          "Browse handcrafted bead accessories: bracelets, necklaces, waist beads, watches and phone charms.",
      },
    ],
  }),
  component: Shop,
});

type Sort = "latest" | "price-asc" | "price-desc";

function Shop() {
  const navigate = useNavigate();
  const { category, q: searchQuery } = Route.useSearch();
  const [q, setQ] = useState(searchQuery ?? "");
  const [sort, setSort] = useState<Sort>("latest");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const active = category ?? "all";

  useEffect(() => {
    setQ(searchQuery ?? "");
  }, [searchQuery]);

  useEffect(() => {
    async function load() {
      try {
        const [categoryData, productData] = await Promise.all([getCategories(), getProducts()]);
        setCategories(categoryData.filter((c) => c.is_active));
        setProducts(productData.results);
      } catch (error) {
        console.error("Shop page data load failed", error);
      }
    }

    void load();
  }, []);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({
      to: "/shop",
      search: {
        category: category ?? undefined,
        q: q.trim() || undefined,
      },
    });
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesCategory =
        active === "all" ||
        p.category_name
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") === active;
      const matchesSearch =
        needle === "" ||
        [p.name, p.description, p.category_name]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(needle));
      return matchesCategory && matchesSearch;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "price-desc") list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    return list;
  }, [active, products, q, sort]);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">The Shop</h1>
          <p className="mt-2 text-muted-foreground">
            Every piece handmade on campus. Ships or picks up same day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 lg:w-80"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </form>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Link
              to="/shop"
              className={cn(
                "shrink-0 rounded-full border border-border px-4 py-1.5 text-sm transition",
                active === "all" ? "bg-foreground text-background" : "hover:bg-accent",
              )}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/shop"
                search={{
                  category: c.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, ""),
                  q: q.trim() || undefined,
                }}
                className={cn(
                  "shrink-0 rounded-full border border-border px-4 py-1.5 text-sm transition",
                  active ===
                    c.name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "")
                    ? "bg-foreground text-background"
                    : "hover:bg-accent",
                )}
              >
                {c.name}
              </Link>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm outline-none"
          >
            <option value="latest">Latest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {products.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground">
            Products are loading from the backend. Once items are published, they will appear here.
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground">
            No pieces match that search. Try a different keyword.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
