/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@/lib/auth-context";
import type { Product } from "./api";
import {
  addCartItem,
  clearCart as clearCartApi,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "./api";

export type CartItem = {
  id?: number;
  product: Product;
  quantity: number;
};

type CartCtx = {
  items: CartItem[];
  add: (product: Product, quantity?: number) => Promise<void>;
  remove: (id: string) => Promise<void>;
  setQuantity: (id: string, quantity: number) => Promise<void>;
  clear: () => Promise<void>;
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartCtx | null>(null);
const GUEST_CART_KEY = "bonchezz-guest-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    try {
      if (!user) {
        const raw = localStorage.getItem(GUEST_CART_KEY);
        if (raw) setItems(JSON.parse(raw));
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, [user]);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    }
  }, [items, hydrated, user]);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      setItems([]);
      const raw = localStorage.getItem(GUEST_CART_KEY);
      if (raw) {
        try {
          setItems(JSON.parse(raw));
        } catch {
          setItems([]);
        }
      }
      return;
    }

    (async () => {
      try {
        const cart = await getCart();
        setItems(
          cart.items.map((item) => ({
            id: item.id,
            product: item.product,
            quantity: item.quantity,
          })),
        );
      } catch {
        setItems([]);
      }
    })();
  }, [user, hydrated]);

  const refreshItems = async () => {
    if (!user) return;
    try {
      const cart = await getCart();
      setItems(
        cart.items.map((item) => ({ id: item.id, product: item.product, quantity: item.quantity })),
      );
    } catch {
      setItems([]);
    }
  };

  const addItem = useCallback(
    async (product: Product, quantity = 1) => {
      if (user) {
        try {
          const cart = await addCartItem({ product_id: product.id, quantity });
          setItems(
            cart.items.map((item) => ({
              id: item.id,
              product: item.product,
              quantity: item.quantity,
            })),
          );
          setOpen(true);
          return;
        } catch {
          return;
        }
      }

      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
          );
        }
        return [...prev, { product, quantity }];
      });
      setOpen(true);
    },
    [user],
  );

  const removeItem = useCallback(
    async (id: string) => {
      if (user) {
        const item = items.find((i) => String(i.product.id) === id || String(i.id) === id);
        if (item?.id != null) {
          try {
            await deleteCartItem(item.id);
            setItems((prev) => prev.filter((i) => i.id !== item.id));
            return;
          } catch {
            return;
          }
        }
      }
      setItems((prev) => prev.filter((i) => String(i.product.id) !== id));
    },
    [items, user],
  );

  const updateQuantity = useCallback(
    async (id: string, quantity: number) => {
      if (quantity <= 0) {
        await removeItem(id);
        return;
      }
      if (user) {
        const item = items.find((i) => String(i.product.id) === id || String(i.id) === id);
        if (item?.id != null) {
          try {
            const updated = await updateCartItem(item.id, { quantity });
            setItems((prev) =>
              prev.map((i) =>
                i.id === updated.id || String(i.product.id) === id
                  ? { ...i, quantity: updated.quantity, product: updated.product }
                  : i,
              ),
            );
            return;
          } catch {
            return;
          }
        }
      }
      setItems((prev) => prev.map((i) => (String(i.product.id) === id ? { ...i, quantity } : i)));
    },
    [items, removeItem, user],
  );

  const clearItems = useCallback(async () => {
    if (user) {
      try {
        await clearCartApi();
        setItems([]);
        return;
      } catch {
        return;
      }
    }
    setItems([]);
  }, [user]);

  const value: CartCtx = useMemo(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((n, i) => n + i.quantity * Number(i.product.price), 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      setOpen,
      add: addItem,
      remove: removeItem,
      setQuantity: updateQuantity,
      clear: clearItems,
    };
  }, [items, isOpen, addItem, removeItem, updateQuantity, clearItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
