import { o as __toESM } from "../_runtime.mjs";
import { P as updateProductStock, x as getProducts } from "./utils-AKH12ZYD.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-CrA3ctiB.mjs";
import { I as CircleX, S as Minus, _ as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AdminLoadingSpinner, t as AdminEmptyState } from "./AdminLoadingSpinner-xeuF3RGi.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-m_oq8NCT.mjs";
import { t as Badge } from "./badge-BK1Owwqh.mjs";
import { t as AdminSearchBar } from "./AdminSearchBar-DmQk0a8T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-D4Qej6jB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminInventory() {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [savingId, setSavingId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		async function load() {
			try {
				const productResponse = await getProducts();
				setProducts(productResponse.results);
			} catch {
				setProducts([]);
				toast.error("Failed to load inventory");
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);
	const filteredProducts = (0, import_react.useMemo)(() => products.filter((product) => {
		const query = search.toLowerCase();
		return product.name.toLowerCase().includes(query) || product.category_name?.toLowerCase().includes(query) || String(product.stock_quantity).includes(query);
	}), [products, search]);
	const lowStockProducts = (0, import_react.useMemo)(() => products.filter((product) => typeof product.stock_quantity === "number" && product.stock_quantity <= 5), [products]);
	const adjustStock = async (product, delta) => {
		if (savingId) return;
		setSavingId(product.id);
		try {
			const current = Number(product.stock_quantity || 0);
			const next = Math.max(0, current + delta);
			const updated = await updateProductStock(product.id, next);
			setProducts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
			toast.success(`Stock updated to ${next}`);
		} catch {
			toast.error("Failed to update stock");
		} finally {
			setSavingId(null);
		}
	};
	const markOutOfStock = async (product) => {
		if (savingId) return;
		setSavingId(product.id);
		try {
			const updated = await updateProductStock(product.id, 0);
			setProducts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
			toast.success("Marked as out of stock");
		} catch {
			toast.error("Failed to update stock");
		} finally {
			setSavingId(null);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoadingSpinner, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm uppercase tracking-[0.3em] text-muted-foreground",
				children: "Inventory"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold",
				children: "Stock levels"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearchBar, {
				value: search,
				onChange: setSearch,
				placeholder: "Search inventory"
			}),
			filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
				title: "No products found",
				message: "Search by item name, category, or stock level."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Product" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Stock" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: product.stock_quantity ?? 0 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: product.stock_quantity && product.stock_quantity <= 5 ? "destructive" : "secondary",
					children: product.stock_quantity && product.stock_quantity <= 5 ? "Low stock" : "In stock"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							"aria-label": "Decrease stock",
							disabled: savingId === product.id || (product.stock_quantity ?? 0) <= 0,
							onClick: () => adjustStock(product, -1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							"aria-label": "Increase stock",
							disabled: savingId === product.id,
							onClick: () => adjustStock(product, 1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							size: "icon",
							"aria-label": "Mark out of stock",
							disabled: savingId === product.id || (product.stock_quantity ?? 0) === 0,
							onClick: () => markOutOfStock(product),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" })
						})
					]
				}) })
			] }, product.id)) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground",
						children: "Low stock focus"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Highlighted products are below the reorder threshold and should be restocked soon."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-3",
						children: lowStockProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No items are currently low in stock."
						}) : lowStockProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl border border-border bg-muted/70 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: product.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "destructive",
									children: [product.stock_quantity ?? 0, " left"]
								})]
							})
						}, product.id))
					})
				]
			})
		]
	});
}
//#endregion
export { AdminInventory as component };
