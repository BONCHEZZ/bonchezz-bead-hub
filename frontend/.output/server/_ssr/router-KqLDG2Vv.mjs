import "./utils-CN24kyyZ.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { S as Minus, _ as Plus, c as Trash2, n as X, p as ShoppingBag } from "../_libs/lucide-react.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, k as redirect, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { i as useCart, n as CartProvider, t as AuthProvider } from "./cart-context-BJmH7bpo.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
import { t as Route$20 } from "./product._id-CwEP_XD7.mjs";
import { t as Route$21 } from "./shop-C61c0kUs.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-KqLDG2Vv.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B347U3A5.css";
function CartDrawer() {
	const { isOpen, setOpen, items, setQuantity, remove, subtotal } = useCart();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: () => setOpen(false),
		className: "fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
		initial: { x: "100%" },
		animate: { x: 0 },
		exit: { x: "100%" },
		transition: {
			type: "spring",
			damping: 26,
			stiffness: 220
		},
		className: "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-glow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border px-6 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold",
				children: "Your Bag"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setOpen(false),
				className: "grid h-9 w-9 place-items-center rounded-full hover:bg-accent",
				"aria-label": "Close cart",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
			})]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-display text-xl",
					children: "Your bag is empty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Add a piece you love and we'll hold it here for you."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					onClick: () => setOpen(false),
					className: "mt-3 inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background",
					children: "Browse the shop"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto px-6 py-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-4",
				children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 rounded-2xl border border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: i.product.images?.[0]?.image ?? i.product.image ?? "/src/assets/hero-beads.jpg",
						alt: i.product.name,
						className: "h-20 w-20 rounded-xl object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-medium leading-tight",
									children: i.product.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => remove(String(i.product.id)),
									className: "text-muted-foreground hover:text-destructive",
									"aria-label": "Remove",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted-foreground",
								children: ["KSh ", Number(i.product.price).toLocaleString()]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-auto flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 rounded-full border border-border p-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setQuantity(String(i.product.id), i.quantity - 1),
											className: "grid h-7 w-7 place-items-center rounded-full hover:bg-accent",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-6 text-center text-sm font-medium",
											children: i.quantity
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setQuantity(String(i.product.id), i.quantity + 1),
											className: "grid h-7 w-7 place-items-center rounded-full hover:bg-accent",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: ["KSh ", (Number(i.product.price) * i.quantity).toLocaleString()]
								})]
							})
						]
					})]
				}, i.product.id))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border px-6 py-5 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Subtotal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold",
						children: ["KSh ", subtotal.toLocaleString()]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Calculated at checkout" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/checkout",
					onClick: () => setOpen(false),
					className: "block w-full rounded-full bg-gradient-brand py-3 text-center text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition",
					children: ["Checkout · KSh ", subtotal.toLocaleString()]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cart",
					onClick: () => setOpen(false),
					className: "block w-full rounded-full border border-border py-2.5 text-center text-sm font-medium hover:bg-accent",
					children: "View full cart"
				})
			]
		})] })]
	})] }) });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl font-bold text-gradient-brand",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-2xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The bead you're looking for rolled off the table."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-purple transition-colors",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-purple transition-colors",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Bonchezz Bead Hub — Handcrafted Accessories for Students" },
			{
				name: "description",
				content: "Bonchezz Bead Hub crafts one-of-a-kind bracelets, necklaces, watches, phone charms and waist beads on campus. Student prices, fast pickup."
			},
			{
				name: "author",
				content: "Bonchezz Bead Hub"
			},
			{
				property: "og:title",
				content: "Bonchezz Bead Hub — Handcrafted Accessories"
			},
			{
				property: "og:description",
				content: "Handmade bead jewelry designed for students. Bracelets, necklaces, waist beads and more."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				richColors: true
			})
		] }) })
	});
}
var $$splitComponentImporter$18 = () => import("./register-BUUAJkak.mjs");
var Route$18 = createFileRoute("/register")({
	beforeLoad: () => {
		if (localStorage.getItem("bonchezz-token")) throw redirect({ to: "/" });
	},
	head: () => ({ meta: [{ title: "Create account — Bonchezz" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./login-Dgc7mZxa.mjs");
var Route$17 = createFileRoute("/login")({
	beforeLoad: () => {
		if (localStorage.getItem("bonchezz-token")) throw redirect({ to: "/" });
	},
	head: () => ({ meta: [{ title: "Login — Bonchezz" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./contact-BS1X6-Mf.mjs");
var Route$16 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact — Bonchezz Bead Hub" }, {
		name: "description",
		content: "Talk to Bonchezz: WhatsApp, Instagram, email or the contact form."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./checkout-BsKmItJa.mjs");
var Route$15 = createFileRoute("/checkout")({
	beforeLoad: () => {
		if (!localStorage.getItem("bonchezz-token")) throw redirect({ to: "/login" });
	},
	head: () => ({ meta: [{ title: "Checkout — Bonchezz" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./categories-C1pkABwS.mjs");
var Route$14 = createFileRoute("/categories")({
	head: () => ({ meta: [{ title: "Categories — Bonchezz" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./cart-D8TYjUWO.mjs");
var Route$13 = createFileRoute("/cart")({
	head: () => ({ meta: [{ title: "Cart — Bonchezz" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./about-CxvMhbOF.mjs");
var Route$12 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — Bonchezz Bead Hub" }, {
		name: "description",
		content: "Our story: a student-run bead studio making handcrafted accessories for campus life."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./routes-B0I7ufY1.mjs");
var Route$11 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./admin-PJ_as8N-.mjs");
var Route$10 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./settings-Qf3b2X9H.mjs");
objectType({
	business_name: stringType().min(2),
	phone: stringType().min(5),
	email: stringType().email(),
	description: stringType().optional(),
	pickup_location: stringType().min(2),
	instagram: stringType().optional(),
	tiktok: stringType().optional(),
	whatsapp: stringType().optional()
});
var Route$9 = createFileRoute("/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./reviews-DJrYfyVW.mjs");
var Route$8 = createFileRoute("/admin/reviews")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./products-DL6bI8wu.mjs");
var Route$7 = createFileRoute("/admin/products")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./payments-wUio8Syo.mjs");
var Route$6 = createFileRoute("/admin/payments")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./orders-CqPPvgh7.mjs");
var Route$5 = createFileRoute("/admin/orders")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./messages-BPWTWExa.mjs");
var Route$4 = createFileRoute("/admin/messages")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./inventory-6zRLHCpz.mjs");
var Route$3 = createFileRoute("/admin/inventory")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./customers-B7bMIh1x.mjs");
var Route$2 = createFileRoute("/admin/customers")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./categories-mNwes0GE.mjs");
var Route$1 = createFileRoute("/admin/categories")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_layout-DNfRkjsY.mjs");
var Route = createFileRoute("/admin/_layout")({
	head: () => ({ meta: [{ title: "Admin Dashboard — Bonchezz" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ShopRoute = Route$21.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$19
});
var RegisterRoute = Route$18.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$19
});
var LoginRoute = Route$17.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$19
});
var ContactRoute = Route$16.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$19
});
var CheckoutRoute = Route$15.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$19
});
var CategoriesRoute = Route$14.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => Route$19
});
var CartRoute = Route$13.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$19
});
var AboutRoute = Route$12.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$19
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AdminIndexRoute = Route$10.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$19
});
var ProductIdRoute = Route$20.update({
	id: "/product/$id",
	path: "/product/$id",
	getParentRoute: () => Route$19
});
var AdminSettingsRoute = Route$9.update({
	id: "/admin/settings",
	path: "/admin/settings",
	getParentRoute: () => Route$19
});
var AdminReviewsRoute = Route$8.update({
	id: "/admin/reviews",
	path: "/admin/reviews",
	getParentRoute: () => Route$19
});
var AdminProductsRoute = Route$7.update({
	id: "/admin/products",
	path: "/admin/products",
	getParentRoute: () => Route$19
});
var AdminPaymentsRoute = Route$6.update({
	id: "/admin/payments",
	path: "/admin/payments",
	getParentRoute: () => Route$19
});
var AdminOrdersRoute = Route$5.update({
	id: "/admin/orders",
	path: "/admin/orders",
	getParentRoute: () => Route$19
});
var AdminMessagesRoute = Route$4.update({
	id: "/admin/messages",
	path: "/admin/messages",
	getParentRoute: () => Route$19
});
var AdminInventoryRoute = Route$3.update({
	id: "/admin/inventory",
	path: "/admin/inventory",
	getParentRoute: () => Route$19
});
var AdminCustomersRoute = Route$2.update({
	id: "/admin/customers",
	path: "/admin/customers",
	getParentRoute: () => Route$19
});
var AdminCategoriesRoute = Route$1.update({
	id: "/admin/categories",
	path: "/admin/categories",
	getParentRoute: () => Route$19
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	CartRoute,
	CategoriesRoute,
	CheckoutRoute,
	ContactRoute,
	LoginRoute,
	RegisterRoute,
	ShopRoute,
	AdminLayoutRoute: Route.update({
		id: "/admin/_layout",
		path: "/admin",
		getParentRoute: () => Route$19
	}),
	AdminCategoriesRoute,
	AdminCustomersRoute,
	AdminInventoryRoute,
	AdminMessagesRoute,
	AdminOrdersRoute,
	AdminPaymentsRoute,
	AdminProductsRoute,
	AdminReviewsRoute,
	AdminSettingsRoute,
	ProductIdRoute,
	AdminIndexRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
