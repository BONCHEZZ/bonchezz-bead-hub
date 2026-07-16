import { o as __toESM } from "../_runtime.mjs";
import { i as cn, n as checkout } from "./utils-CN24kyyZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { R as CircleCheck, f as Smartphone, r as Wallet } from "../_libs/lucide-react.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useCart, r as useAuth } from "./cart-context-BJmH7bpo.mjs";
import { t as SiteLayout } from "./Layout-Bq6d38zL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BsKmItJa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Checkout() {
	const { items, clear } = useCart();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [method, setMethod] = (0, import_react.useState)("mpesa");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const delivery = items.length > 0 ? 100 : 0;
	const total = items.reduce((n, i) => n + i.quantity * Number(i.product.price), 0) + delivery;
	const onSubmit = async (e) => {
		e.preventDefault();
		if (items.length === 0) return;
		setLoading(true);
		try {
			const pickup_location = e.currentTarget.elements.namedItem("location").value.trim();
			if (!pickup_location) {
				toast.error("Please enter a pickup location.");
				setLoading(false);
				return;
			}
			await checkout({
				pickup_location,
				payment_method: method === "cash" ? "Cash on Pickup" : "M-Pesa"
			});
			clear();
			setSubmitted(true);
			toast.success("Order placed! We'll be in touch shortly.");
			setTimeout(() => navigate({ to: "/" }), 1800);
		} catch {
			toast.error("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	if (submitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-3xl font-bold",
				children: "Order confirmed!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Check your email for pickup details."
			})
		]
	}) });
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: "Your bag is empty"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Add something before checking out."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-purple",
				children: "Shop now"
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-bold sm:text-5xl",
			children: "Checkout"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "mt-8 grid gap-8 lg:grid-cols-[1fr_380px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Delivery details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "name",
									defaultValue: user?.full_name || "",
									required: true,
									className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20",
									readOnly: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "Phone Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "phone",
									type: "tel",
									defaultValue: user?.phone_number || "",
									required: true,
									className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20",
									readOnly: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "email",
									type: "email",
									defaultValue: user?.student_email || "",
									required: true,
									className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20",
									readOnly: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "Hostel / Residence"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "hostel",
									required: true,
									className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "Pickup Location"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "location",
									required: true,
									className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Payment method"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentOption, {
							active: method === "mpesa",
							onClick: () => {
								toast.error("M-Pesa is not available yet. Please choose cash on pickup.");
								setMethod("cash");
							},
							icon: Smartphone,
							title: "M-Pesa",
							subtitle: "Pay via STK push"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentOption, {
							active: method === "cash",
							onClick: () => setMethod("cash"),
							icon: Wallet,
							title: "Cash on Pickup",
							subtitle: "Pay when you collect"
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-fit rounded-3xl border border-border bg-card p-6 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl font-semibold",
						children: "Order summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: i.product.images?.[0]?.image ?? i.product.image ?? "/src/assets/hero-beads.jpg",
									alt: "",
									className: "h-12 w-12 rounded-lg object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: i.product.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: ["Qty ", i.quantity]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: ["KSh ", (Number(i.product.price) * i.quantity).toLocaleString()]
								})
							]
						}, i.product.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 space-y-2 border-t border-border pt-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
									"KSh",
									" ",
									items.reduce((n, i) => n + i.quantity * Number(i.product.price), 0).toLocaleString()
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Delivery"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["KSh ", delivery.toLocaleString()] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-t border-border pt-2 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-semibold",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-display text-lg font-bold",
									children: ["KSh ", total.toLocaleString()]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: loading || items.length === 0,
						className: "mt-6 block w-full rounded-full bg-gradient-brand py-3 text-center text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow disabled:opacity-50",
						children: loading ? "Processing..." : "Place order"
					})
				]
			})]
		})]
	}) });
}
function PaymentOption({ active, onClick, icon: Icon, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition", active ? "border-purple bg-secondary" : "border-border hover:border-foreground/20"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("grid h-10 w-10 place-items-center rounded-full", active ? "bg-gradient-brand text-primary-foreground" : "bg-muted"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-muted-foreground",
			children: subtitle
		})] })]
	});
}
//#endregion
export { Checkout as component };
