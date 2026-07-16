import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { p as ShoppingBag, u as Star } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useCart } from "./cart-context-BJmH7bpo.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-CdnGOql1.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product, index = 0 }) {
	const { add } = useCart();
	const imageUrl = product.images?.[0]?.image ?? product.image ?? "/assets/hero-beads-CWqlINKl.jpg";
	const productId = String(product.id);
	const productRating = Number(product.rating ?? 0);
	const reviewCount = product.reviews ?? 0;
	const isInStock = product.inStock ?? product.availability ?? true;
	const productPrice = Number(product.price);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-40px"
		},
		transition: {
			duration: .4,
			delay: index * .05
		},
		className: "group flex flex-col rounded-3xl border border-border bg-card p-3 shadow-soft transition hover:-translate-y-1 hover:shadow-glow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/product/$id",
			params: { id: productId },
			className: "relative block overflow-hidden rounded-2xl bg-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageUrl,
				alt: product.name,
				loading: "lazy",
				className: "aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
			}), isInStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-purple backdrop-blur",
				children: "In stock"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-gold text-gold" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: productRating
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"(",
							reviewCount,
							")"
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1.5 font-display text-lg font-semibold leading-tight",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$id",
						params: { id: productId },
						className: "hover:text-purple",
						children: product.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-1 text-xs text-muted-foreground",
					children: product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-end justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-xl font-semibold",
						children: ["KSh ", productPrice.toLocaleString()]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							add(product);
							toast.success(`${product.name} added to cart`);
						},
						className: "grid h-9 w-9 place-items-center rounded-full bg-foreground text-background transition hover:bg-purple",
						"aria-label": `Add ${product.name} to cart`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$id",
					params: { id: productId },
					className: "mt-3 block rounded-full border border-border py-2 text-center text-xs font-medium text-muted-foreground hover:border-purple hover:text-purple",
					children: "View Details"
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
