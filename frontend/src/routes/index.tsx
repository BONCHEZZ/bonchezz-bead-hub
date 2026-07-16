import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles, Star, Truck, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-beads.jpg";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { getCategories, getProducts, type Category, type Product } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: Home,
});

const features = [
  {
    icon: Heart,
    title: "Handmade with Love",
    text: "Every piece strung by hand in small batches — no two are identical.",
  },
  {
    icon: Wallet,
    title: "Student Prices",
    text: "Priced for pocket money, not payslips. Bulk discounts on request.",
  },
  {
    icon: Truck,
    title: "Fast Campus Delivery",
    text: "Same-day pickup at the Main Gate. Hostel drops on Fridays.",
  },
  {
    icon: Sparkles,
    title: "Unique Designs",
    text: "Trend-forward, seasonal drops you won't find anywhere else.",
  },
];

const testimonials = [
  {
    name: "Amina K.",
    school: "Year 3, Comm.",
    quote: "The pearl necklace is my new signature. So many compliments in one week.",
  },
  {
    name: "Cynthia W.",
    school: "Year 2, Business",
    quote: "Ordered on Monday, picked it up at lunch. Waist beads are perfection.",
  },
  {
    name: "Faith N.",
    school: "Year 1, Nursing",
    quote: "The butterfly charm made my phone look 10x cuter. Obsessed.",
  },
];

function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [categoryData, productData] = await Promise.all([
          getCategories(),
          getProducts({ featured: "true" }),
        ]);
        setCategories(categoryData.filter((c) => c.is_active));
        setFeatured(productData.results.slice(0, 4));
      } catch (error) {
        console.error("Home page data load failed", error);
      }
    }

    void load();
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-pink/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-purple backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> New drop · Autumn 2026
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Handcrafted accessories that{" "}
              <span className="text-gradient-brand">match your style</span>.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              Bead by bead, we make jewelry for students who like to stand out. Bracelets,
              necklaces, waist beads and more — priced for campus life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-soft transition hover:bg-purple hover:shadow-glow"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur hover:bg-accent"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-gradient-brand"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-muted-foreground">Loved by 1200+ students on campus</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-glow">
              <img
                src={heroImg}
                alt="Handcrafted bead accessories"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-4 hidden sm:flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 shadow-soft"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-pink/30 text-pink-foreground">
                <Heart className="h-5 w-5 text-purple" />
              </div>
              <div>
                <div className="text-sm font-semibold">1,200+ pieces</div>
                <div className="text-xs text-muted-foreground">crafted this year</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Shop by category</h2>
            <p className="mt-2 text-muted-foreground">
              Find your vibe — from dainty to rainbow-bold.
            </p>
          </div>
          <Link
            to="/categories"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-purple hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
            Categories will appear here once the backend has catalog data.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to="/shop"
                  search={{
                    category: c.name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, ""),
                  }}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={c.image ?? heroImg}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-semibold leading-tight">{c.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {c.description?.slice(0, 80) || "Browse this collection"}
                      {c.description && c.description.length > 80 ? "…" : ""}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Featured pieces</h2>
            <p className="mt-2 text-muted-foreground">
              Our best-loved drops, hand-picked this week.
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-purple hover:underline"
          >
            Shop all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
            FEATURED PRODUCTS COMING SOON!!
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* WHY US */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-gradient-soft p-6 sm:p-10 lg:p-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Why Bonchezz?</h2>
            <p className="mt-3 text-muted-foreground">
              We're a student-run studio, so we get it. Fair prices, real quality, no drama.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-background/80 p-6 shadow-soft backdrop-blur"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Love notes from campus</h2>
          <p className="mt-2 text-muted-foreground">Real reviews from real students.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-4 text-base leading-relaxed">"{t.quote}"</p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-brand" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.school}</div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
