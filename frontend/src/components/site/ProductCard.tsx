import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/api";
import { toast } from "sonner";
import heroImg from "@/assets/hero-beads.jpg";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  const imageUrl = product.images?.[0]?.image ?? product.image ?? heroImg;
  const productId = String(product.id);
  const productRating = Number(product.rating ?? 0);
  const reviewCount = product.reviews ?? 0;
  const isInStock = product.inStock ?? product.availability ?? true;
  const productPrice = Number(product.price);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col rounded-3xl border border-border bg-card p-3 shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
    >
      <Link
        to="/product/$id"
        params={{ id: productId }}
        className="relative block overflow-hidden rounded-2xl bg-muted"
      >
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {isInStock && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-purple backdrop-blur">
            In stock
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="font-medium text-foreground">{productRating}</span>
          <span>({reviewCount})</span>
        </div>
        <h3 className="mt-1.5 font-display text-lg font-semibold leading-tight">
          <Link to="/product/$id" params={{ id: productId }} className="hover:text-purple">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{product.description}</p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <span className="font-display text-xl font-semibold">
            KSh {productPrice.toLocaleString()}
          </span>
          <button
            onClick={() => {
              add(product);
              toast.success(`${product.name} added to cart`);
            }}
            className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background transition hover:bg-purple"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
        <Link
          to="/product/$id"
          params={{ id: productId }}
          className="mt-3 block rounded-full border border-border py-2 text-center text-xs font-medium text-muted-foreground hover:border-purple hover:text-purple"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
