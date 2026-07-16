import { o as __toESM } from "../_runtime.mjs";
import { A as updateCartItem, C as login, E as register, S as getProfile, c as deleteCartItem, m as getCart, r as clearCart, t as addCartItem, w as logout } from "./utils-CN24kyyZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-context-BJmH7bpo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem("bonchezz-user");
			if (raw) setUser(JSON.parse(raw));
		} catch {}
		setLoading(false);
	}, []);
	const login$1 = async (email, password) => {
		const data = await login(email, password);
		localStorage.setItem("bonchezz-token", data.access);
		localStorage.setItem("bonchezz-refresh", data.refresh);
		const profile = await getProfile();
		localStorage.setItem("bonchezz-user", JSON.stringify(profile));
		setUser(profile);
	};
	const register$1 = async (payload) => {
		const profile = await register(payload);
		const data = await login(payload.student_email, payload.password);
		localStorage.setItem("bonchezz-token", data.access);
		localStorage.setItem("bonchezz-refresh", data.refresh);
		localStorage.setItem("bonchezz-user", JSON.stringify(profile));
		setUser(profile);
	};
	const logout$1 = async () => {
		try {
			await logout();
		} catch {}
		localStorage.removeItem("bonchezz-token");
		localStorage.removeItem("bonchezz-refresh");
		localStorage.removeItem("bonchezz-user");
		setUser(null);
	};
	const value = (0, import_react.useMemo)(() => ({
		user,
		loading,
		login: login$1,
		register: register$1,
		logout: logout$1
	}), [user, loading]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
var CartContext = (0, import_react.createContext)(null);
var GUEST_CART_KEY = "bonchezz-guest-cart";
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isOpen, setOpen] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const { user } = useAuth();
	(0, import_react.useEffect)(() => {
		try {
			if (!user) {
				const raw = localStorage.getItem(GUEST_CART_KEY);
				if (raw) setItems(JSON.parse(raw));
			}
		} catch {}
		setHydrated(true);
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		if (!user) localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
	}, [
		items,
		hydrated,
		user
	]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		if (!user) {
			setItems([]);
			const raw = localStorage.getItem(GUEST_CART_KEY);
			if (raw) try {
				setItems(JSON.parse(raw));
			} catch {
				setItems([]);
			}
			return;
		}
		(async () => {
			try {
				const cart = await getCart();
				setItems(cart.items.map((item) => ({
					id: item.id,
					product: item.product,
					quantity: item.quantity
				})));
			} catch {
				setItems([]);
			}
		})();
	}, [user, hydrated]);
	const addItem = (0, import_react.useCallback)(async (product, quantity = 1) => {
		if (user) try {
			const cart = await addCartItem({
				product_id: product.id,
				quantity
			});
			setItems(cart.items.map((item) => ({
				id: item.id,
				product: item.product,
				quantity: item.quantity
			})));
			setOpen(true);
			return;
		} catch {
			return;
		}
		setItems((prev) => {
			if (prev.find((i) => i.product.id === product.id)) return prev.map((i) => i.product.id === product.id ? {
				...i,
				quantity: i.quantity + quantity
			} : i);
			return [...prev, {
				product,
				quantity
			}];
		});
		setOpen(true);
	}, [user]);
	const removeItem = (0, import_react.useCallback)(async (id) => {
		if (user) {
			const item = items.find((i) => String(i.product.id) === id || String(i.id) === id);
			if (item?.id != null) try {
				await deleteCartItem(item.id);
				setItems((prev) => prev.filter((i) => i.id !== item.id));
				return;
			} catch {
				return;
			}
		}
		setItems((prev) => prev.filter((i) => String(i.product.id) !== id));
	}, [items, user]);
	const updateQuantity = (0, import_react.useCallback)(async (id, quantity) => {
		if (quantity <= 0) {
			await removeItem(id);
			return;
		}
		if (user) {
			const item = items.find((i) => String(i.product.id) === id || String(i.id) === id);
			if (item?.id != null) try {
				const updated = await updateCartItem(item.id, { quantity });
				setItems((prev) => prev.map((i) => i.id === updated.id || String(i.product.id) === id ? {
					...i,
					quantity: updated.quantity,
					product: updated.product
				} : i));
				return;
			} catch {
				return;
			}
		}
		setItems((prev) => prev.map((i) => String(i.product.id) === id ? {
			...i,
			quantity
		} : i));
	}, [
		items,
		removeItem,
		user
	]);
	const clearItems = (0, import_react.useCallback)(async () => {
		if (user) try {
			await clearCart();
			setItems([]);
			return;
		} catch {
			return;
		}
		setItems([]);
	}, [user]);
	const value = (0, import_react.useMemo)(() => {
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
			clear: clearItems
		};
	}, [
		items,
		isOpen,
		addItem,
		removeItem,
		updateQuantity,
		clearItems
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
//#endregion
export { useCart as i, CartProvider as n, useAuth as r, AuthProvider as t };
