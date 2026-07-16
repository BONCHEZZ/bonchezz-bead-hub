import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CartDrawer() {
  const { isOpen, setOpen, items, setQuantity, remove, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-glow"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="font-display text-lg font-semibold">Your Bag</h3>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-accent"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-primary-foreground">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h4 className="font-display text-xl">Your bag is empty</h4>
                <p className="text-sm text-muted-foreground">
                  Add a piece you love and we'll hold it here for you.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
                >
                  Browse the shop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="space-y-4">
                    {items.map((i) => (
                      <li
                        key={i.product.id}
                        className="flex gap-3 rounded-2xl border border-border p-3"
                      >
                        <img
                          src={
                            i.product.images?.[0]?.image ??
                            i.product.image ??
                            "/src/assets/hero-beads.jpg"
                          }
                          alt={i.product.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium leading-tight">{i.product.name}</h4>
                            <button
                              onClick={() => remove(String(i.product.id))}
                              className="text-muted-foreground hover:text-destructive"
                              aria-label="Remove"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            KSh {Number(i.product.price).toLocaleString()}
                          </span>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-border p-0.5">
                              <button
                                onClick={() => setQuantity(String(i.product.id), i.quantity - 1)}
                                className="grid h-7 w-7 place-items-center rounded-full hover:bg-accent"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-6 text-center text-sm font-medium">
                                {i.quantity}
                              </span>
                              <button
                                onClick={() => setQuantity(String(i.product.id), i.quantity + 1)}
                                className="grid h-7 w-7 place-items-center rounded-full hover:bg-accent"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="font-semibold">
                              KSh {(Number(i.product.price) * i.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border px-6 py-5 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">KSh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Delivery</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-full bg-gradient-brand py-3 text-center text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition"
                  >
                    Checkout · KSh {subtotal.toLocaleString()}
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-full border border-border py-2.5 text-center text-sm font-medium hover:bg-accent"
                  >
                    View full cart
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
