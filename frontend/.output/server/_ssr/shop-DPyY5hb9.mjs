import { o as __toESM } from "../_runtime.mjs";
import { h as getCategories, i as cn, x as getProducts } from "./utils-CN24kyyZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { g as Search } from "../_libs/lucide-react.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SiteLayout } from "./Layout-Bq6d38zL.mjs";
import { t as ProductCard } from "./ProductCard-CdnGOql1.mjs";
import { t as Route } from "./shop-C61c0kUs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-DPyY5hb9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Shop() {
	const navigate = useNavigate();
	const { category, q: searchQuery } = Route.useSearch();
	const [q, setQ] = (0, import_react.useState)(searchQuery ?? "");
	const [sort, setSort] = (0, import_react.useState)("latest");
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [products, setProducts] = (0, import_react.useState)([]);
	const active = category ?? "all";
	(0, import_react.useEffect)(() => {
		setQ(searchQuery ?? "");
	}, [searchQuery]);
	(0, import_react.useEffect)(() => {
		async function load() {
			const [categoryData, productData] = await Promise.all([getCategories(), getProducts()]);
			setCategories(categoryData.filter((c) => c.is_active));
			setProducts(productData.results);
		}
		load();
	}, []);
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		navigate({
			to: "/shop",
			search: {
				category: category ?? void 0,
				q: q.trim() || void 0
			}
		});
	};
	const filtered = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		let list = products.filter((p) => {
			const matchesCategory = active === "all" || p.category_name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === active;
			const matchesSearch = needle === "" || [
				p.name,
				p.description,
				p.category_name
			].filter(Boolean).some((value) => String(value).toLowerCase().includes(needle));
			return matchesCategory && matchesSearch;
		});
		if (sort === "price-asc") list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
		if (sort === "price-desc") list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
		return list;
	}, [
		active,
		products,
		q,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-gradient-soft",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-bold sm:text-5xl",
				children: "The Shop"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Every piece handmade on campus. Ships or picks up same day."
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSearchSubmit,
					className: "flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 lg:w-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search products…",
						className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 overflow-x-auto pb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: cn("shrink-0 rounded-full border border-border px-4 py-1.5 text-sm transition", active === "all" ? "bg-foreground text-background" : "hover:bg-accent"),
						children: "All"
					}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: {
							category: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
							q: q.trim() || void 0
						},
						className: cn("shrink-0 rounded-full border border-border px-4 py-1.5 text-sm transition", active === c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ? "bg-foreground text-background" : "hover:bg-accent"),
						children: c.name
					}, c.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: sort,
					onChange: (e) => setSort(e.target.value),
					className: "rounded-full border border-border bg-card px-4 py-2 text-sm outline-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "latest",
							children: "Latest"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "price-asc",
							children: "Price: Low to High"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "price-desc",
							children: "Price: High to Low"
						})
					]
				})
			]
		}), products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-16 rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground",
			children: "Products are loading from the backend. Once items are published, they will appear here."
		}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-16 rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground",
			children: "No pieces match that search. Try a different keyword."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
			children: filtered.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
				product: p,
				index: i
			}, p.id))
		})]
	})] });
}
//#endregion
export { Shop as component };
