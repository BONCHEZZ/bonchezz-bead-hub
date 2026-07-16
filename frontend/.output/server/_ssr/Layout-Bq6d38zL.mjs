import { o as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-CN24kyyZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { C as MessageCircle, O as Instagram, T as Mail, a as User, g as Search, n as X, p as ShoppingBag, v as Phone, w as Menu, x as Music2 } from "../_libs/lucide-react.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCart, r as useAuth } from "./cart-context-BJmH7bpo.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Layout-Bq6d38zL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/shop",
		label: "Shop"
	},
	{
		to: "/categories",
		label: "Categories"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function Navbar() {
	const { count, setOpen } = useCart();
	const { user, loading, logout } = useAuth();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [searchValue, setSearchValue] = (0, import_react.useState)("");
	const isAuthenticated = !loading && (Boolean(user) || Boolean(localStorage.getItem("bonchezz-token")));
	const handleSearch = (value) => {
		const trimmed = value.trim();
		navigate({
			to: "/shop",
			search: trimmed ? { q: trimmed } : {}
		});
	};
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		handleSearch(searchValue);
		setSearchOpen(false);
	};
	const clearSearch = () => {
		setSearchValue("");
		navigate({ to: "/shop" });
		setSearchOpen(false);
	};
	const handleLogout = async () => {
		await logout();
		setMobileOpen(false);
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "lg:hidden -ml-1 p-2 text-foreground",
						onClick: () => setMobileOpen(true),
						"aria-label": "Open menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-soft font-display text-lg",
							children: "B"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden sm:block font-display text-lg font-semibold tracking-tight",
							children: ["Bonchezz ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-purple",
								children: "Bead Hub"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden lg:flex items-center gap-1 ml-4",
						children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							activeOptions: { exact: l.to === "/" },
							className: "px-3 py-2 text-sm font-medium text-muted-foreground rounded-full transition-colors hover:text-foreground hover:bg-accent/60",
							activeProps: { className: "text-foreground bg-accent" },
							children: l.label
						}, l.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSearchSubmit,
						className: "hidden md:flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 w-64 focus-within:ring-2 focus-within:ring-ring/40 transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: searchValue,
								onChange: (e) => setSearchValue(e.target.value),
								placeholder: "Search beads, charms…",
								className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
							}),
							searchValue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: clearSearch,
								className: "text-xs font-medium text-muted-foreground hover:text-foreground",
								children: "Clear"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "md:hidden p-2 text-foreground",
						onClick: () => setSearchOpen((v) => !v),
						"aria-label": "Search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" })
					}),
					isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleLogout,
						className: "hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), "Log out"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/login",
						className: "hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), "Login"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen(true),
						className: "relative rounded-full bg-foreground text-background p-2.5 hover:bg-foreground/90 transition-colors",
						"aria-label": "Open cart",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-pink px-1 text-[10px] font-bold text-pink-foreground",
							children: count
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					height: 0,
					opacity: 0
				},
				animate: {
					height: "auto",
					opacity: 1
				},
				exit: {
					height: 0,
					opacity: 0
				},
				className: "md:hidden border-t border-border overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSearchSubmit,
						className: "flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								autoFocus: true,
								value: searchValue,
								onChange: (e) => setSearchValue(e.target.value),
								placeholder: "Search beads, charms…",
								className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
							}),
							searchValue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: clearSearch,
								className: "text-xs font-medium text-muted-foreground hover:text-foreground",
								children: "Clear"
							})
						]
					})
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm",
				onClick: () => setMobileOpen(false)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
				initial: { x: "-100%" },
				animate: { x: 0 },
				exit: { x: "-100%" },
				transition: {
					type: "spring",
					damping: 25,
					stiffness: 220
				},
				className: "fixed inset-y-0 left-0 z-50 w-72 bg-background p-6 shadow-glow",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-semibold",
							children: "Bonchezz"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMobileOpen(false),
							className: "p-2 rounded-full hover:bg-accent",
							"aria-label": "Close menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-8 flex flex-col gap-1",
						children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							onClick: () => setMobileOpen(false),
							className: cn("rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"),
							activeProps: { className: "bg-accent text-foreground" },
							children: l.label
						}, l.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border-t border-border pt-4 flex gap-2",
						children: [isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleLogout,
							className: "flex-1 rounded-full border border-border px-4 py-2 text-center text-sm font-medium",
							children: "Log out"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							onClick: () => setMobileOpen(false),
							className: "flex-1 rounded-full border border-border px-4 py-2 text-center text-sm font-medium",
							children: "Login"
						}), !isAuthenticated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							onClick: () => setMobileOpen(false),
							className: "flex-1 rounded-full bg-foreground px-4 py-2 text-center text-sm font-medium text-background",
							children: "Register"
						})]
					})
				]
			})] }) })
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border bg-gradient-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-primary-foreground font-display text-lg",
						children: "B"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-semibold",
						children: "Bonchezz Bead Hub"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground max-w-xs",
					children: "Handcrafted accessories made on campus, made for students. Small batches, big style."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-semibold text-foreground",
					children: "Quick Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "hover:text-foreground",
							children: "Shop"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categories",
							className: "hover:text-foreground",
							children: "Categories"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "hover:text-foreground",
							children: "About"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "hover:text-foreground",
							children: "Contact"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-semibold text-foreground",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-purple" }), " +254 705990086"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-purple" }), " derrickbonche9@gmail.com"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Campus pickup: Main Gate, STC" })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-semibold text-foreground",
					children: "Follow the Bead"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							"aria-label": "Instagram",
							className: "grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-pink hover:text-pink-foreground transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							"aria-label": "TikTok",
							className: "grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-foreground hover:text-background transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							"aria-label": "WhatsApp",
							className: "grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-purple hover:text-purple-foreground transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" })
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6 lg:px-8",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Bonchezz Bead Hub. Handmade with love."
				]
			})
		})]
	});
}
function SiteLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { SiteLayout as t };
