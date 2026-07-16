import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { S as Minus, _ as Plus, c as Trash2, p as ShoppingBag } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCart } from "./cart-context-ak53IsLb.mjs";
import { t as SiteLayout } from "./Layout-CEDalOgd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-ChbHNYQS.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { items, setQuantity, remove, subtotal } = useCart();
	const delivery = subtotal > 0 ? 150 : 0;
	const total = subtotal + delivery;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-bold sm:text-5xl",
			children: "Your Bag"
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 rounded-3xl border border-border bg-card p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-2xl",
					children: "Your bag is empty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Browse handmade pieces you'll actually wear."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-purple",
					children: "Start shopping"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 lg:grid-cols-[1fr_360px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-4",
				children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: i.product.images?.[0]?.image ?? i.product.image ?? "/src/assets/hero-beads.jpg",
						alt: i.product.name,
						className: "h-32 w-full rounded-2xl object-cover sm:w-32"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/product/$id",
								params: { id: String(i.product.id) },
								className: "font-display text-lg font-semibold hover:text-purple",
								children: i.product.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground capitalize",
								children: String(i.product.category).replace("-", " ")
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => remove(String(i.product.id)),
								className: "grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
								"aria-label": "Remove",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 rounded-full border border-border p-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQuantity(String(i.product.id), i.quantity - 1),
										className: "grid h-8 w-8 place-items-center rounded-full hover:bg-accent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-8 text-center text-sm font-semibold",
										children: i.quantity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQuantity(String(i.product.id), i.quantity + 1),
										className: "grid h-8 w-8 place-items-center rounded-full hover:bg-accent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-xl font-semibold",
								children: ["KSh ", (Number(i.product.price) * i.quantity).toLocaleString()]
							})]
						})]
					})]
				}, i.product.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-fit rounded-3xl border border-border bg-card p-6 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl font-semibold",
						children: "Order summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-medium",
									children: ["KSh ", subtotal.toLocaleString()]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Delivery"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-medium",
									children: ["KSh ", delivery.toLocaleString()]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex justify-between border-t border-border pt-3 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-semibold",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-display text-xl font-bold",
									children: ["KSh ", total.toLocaleString()]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/checkout",
						className: "mt-6 block rounded-full bg-gradient-brand py-3 text-center text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow",
						children: "Continue to checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "mt-3 block text-center text-sm text-muted-foreground hover:text-foreground",
						children: "or keep shopping"
					})
				]
			})]
		})]
	}) });
}
//#endregion
export { CartPage as component };
