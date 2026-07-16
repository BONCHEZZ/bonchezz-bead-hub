import { o as __toESM } from "../_runtime.mjs";
import { i as cn, x as getProducts } from "./utils-CN24kyyZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { S as Minus, _ as Plus, p as ShoppingBag, t as Zap, u as Star } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useCart } from "./cart-context-BJmH7bpo.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as SiteLayout } from "./Layout-Bq6d38zL.mjs";
import { t as Route } from "./product._id-CwEP_XD7.mjs";
import { t as ProductCard } from "./ProductCard-CdnGOql1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-CJ0asu7Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { product } = Route.useLoaderData();
	const { add } = useCart();
	const [qty, setQty] = (0, import_react.useState)(1);
	const [color, setColor] = (0, import_react.useState)("Default");
	const [related, setRelated] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		async function loadRelated() {
			const data = await getProducts();
			setRelated(data.results.filter((item) => item.id !== Number(product.id)).slice(0, 4));
		}
		loadRelated();
	}, [product.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-foreground",
						children: "Home"
					}),
					" ",
					"·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "hover:text-foreground",
						children: "Shop"
					}),
					" ",
					"· ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: product.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						scale: .98
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: { duration: .4 },
					className: "overflow-hidden rounded-3xl bg-muted shadow-soft",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.images?.[0]?.image ?? "",
						alt: product.name,
						className: "aspect-square w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-sm",
							children: [[...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("h-4 w-4", i < Math.round(Number(product.rating)) ? "fill-gold text-gold" : "text-muted-foreground") }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 text-muted-foreground",
								children: [
									product.rating,
									" · ",
									product.reviews,
									" reviews"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-3xl font-semibold",
								children: ["KSh ", Number(product.price).toLocaleString()]
							}), product.availability && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-secondary px-3 py-1 text-xs font-medium text-purple",
								children: "In stock"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 leading-relaxed text-muted-foreground",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Color"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [
									"Default",
									"Rose",
									"Gold"
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setColor(c),
									className: cn("rounded-full border px-4 py-1.5 text-sm transition", color === c ? "border-foreground bg-foreground text-background" : "border-border hover:bg-accent"),
									children: c
								}, c))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Quantity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 inline-flex items-center gap-2 rounded-full border border-border p-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty((q) => Math.max(1, q - 1)),
										className: "grid h-9 w-9 place-items-center rounded-full hover:bg-accent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-10 text-center font-semibold",
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty((q) => q + 1),
										className: "grid h-9 w-9 place-items-center rounded-full hover:bg-accent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									add({
										id: String(product.id),
										name: product.name,
										price: Number(product.price),
										image: product.images?.[0]?.image ?? "",
										category: product.category_name ?? "",
										description: product.description,
										rating: Number(product.rating),
										reviews: 0,
										colors: ["Default"],
										inStock: product.availability
									}, qty);
									toast.success(`Added ${qty} × ${product.name}`);
								},
								className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background hover:bg-purple transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), " Add to cart"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/checkout",
								onClick: () => add({
									id: String(product.id),
									name: product.name,
									price: Number(product.price),
									image: product.images?.[0]?.image ?? "",
									category: product.category_name ?? "",
									description: product.description,
									rating: Number(product.rating),
									reviews: 0,
									colors: ["Default"],
									inStock: product.availability
								}, qty),
								className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" }), " Buy now"]
							})]
						})
					]
				})]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold sm:text-3xl",
					children: "You may also love"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
					children: related.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product: p,
						index: i
					}, p.id))
				})]
			})
		]
	}) });
}
//#endregion
export { ProductPage as component };
