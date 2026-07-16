import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { getCategories, type Category } from "@/lib/api";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Categories — Bonchezz" }] }),
  component: Categories,
});

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data.filter((category) => category.is_active));
      } catch {
        setCategories([]);
      }
    }

    void loadCategories();
  }, []);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Categories</h1>
          <p className="mt-2 text-muted-foreground">
            Pick your lane. Every category is fully handmade.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {categories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
            Categories will appear here once the backend has catalog data.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => {
              const slug = c.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to="/shop"
                    search={{ category: slug }}
                    className="group relative block overflow-hidden rounded-[2rem] shadow-soft transition hover:shadow-glow"
                  >
                    <img
                      src={c.image ?? ""}
                      alt={c.name}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5 text-background">
                      <div>
                        <div className="text-xs uppercase tracking-widest opacity-80">Category</div>
                        <h3 className="font-display text-2xl font-semibold">{c.name}</h3>
                      </div>
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground transition group-hover:bg-pink group-hover:text-pink-foreground">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
