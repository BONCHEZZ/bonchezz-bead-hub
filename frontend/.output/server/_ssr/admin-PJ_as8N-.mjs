import { o as __toESM } from "../_runtime.mjs";
import { g as getCustomers, h as getCategories, i as cn, v as getOrders, x as getProducts } from "./utils-CN24kyyZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { D as Layers, M as DollarSign, U as ArrowRight, b as Package, i as Users, p as ShoppingBag, s as TrendingUp } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as AdminLoadingSpinner, t as AdminEmptyState } from "./AdminLoadingSpinner-xeuF3RGi.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DlisZoRS.mjs";
import { t as Badge } from "./badge-mr_RExgU.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-PJ_as8N-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var accentStyles = {
	gold: "bg-gold/10 text-gold",
	purple: "bg-purple/10 text-purple",
	pink: "bg-pink/10 text-pink"
};
function AdminSummaryCard({ label, value, description, icon: Icon, accent = "purple" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 18
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .35 },
		className: "group rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-3xl font-semibold text-foreground",
					children: value
				}),
				description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: description
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("grid h-12 w-12 place-items-center rounded-3xl border border-border", accentStyles[accent]),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			})]
		})
	});
}
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
function AdminDashboard() {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function load() {
			try {
				const [productResponse, categoryResponse, orderResponse, customerResponse] = await Promise.all([
					getProducts(),
					getCategories(),
					getOrders(),
					getCustomers()
				]);
				setProducts(productResponse.results);
				setCategories(categoryResponse);
				setOrders(orderResponse);
				setCustomers(customerResponse);
			} catch (error) {
				console.error(error);
				toast.error("Failed to load dashboard data");
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);
	const lowStockProducts = (0, import_react.useMemo)(() => products.filter((product) => typeof product.stock_quantity === "number" && product.stock_quantity <= 5), [products]);
	const pendingOrders = (0, import_react.useMemo)(() => orders.filter((order) => order.status === "Pending"), [orders]);
	const completedOrders = (0, import_react.useMemo)(() => orders.filter((order) => order.status === "Completed"), [orders]);
	const latestCustomers = (0, import_react.useMemo)(() => [...customers].sort((a, b) => Number(new Date(b.registered_at)) - Number(new Date(a.registered_at))).slice(0, 5), [customers]);
	const revenueToday = (0, import_react.useMemo)(() => {
		const today = (/* @__PURE__ */ new Date()).toDateString();
		return orders.filter((order) => new Date(order.order_date).toDateString() === today).reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
	}, [orders]);
	const monthlyRevenue = (0, import_react.useMemo)(() => {
		const now = /* @__PURE__ */ new Date();
		const currentMonth = now.getMonth();
		const currentYear = now.getFullYear();
		return orders.filter((order) => {
			const d = new Date(order.order_date);
			return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
		}).reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
	}, [orders]);
	const salesChartData = (0, import_react.useMemo)(() => {
		return Array.from({ length: 7 }, (_, i) => {
			const d = /* @__PURE__ */ new Date();
			d.setDate(d.getDate() - (6 - i));
			return d;
		}).map((date) => {
			const dateStr = date.toDateString();
			const dayOrders = orders.filter((order) => new Date(order.order_date).toDateString() === dateStr);
			const revenue = dayOrders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
			return {
				name: date.toLocaleDateString(void 0, {
					weekday: "short",
					month: "short",
					day: "numeric"
				}),
				orders: dayOrders.length,
				revenue
			};
		});
	}, [orders]);
	const bestSellingProducts = (0, import_react.useMemo)(() => {
		const productMap = /* @__PURE__ */ new Map();
		orders.forEach((order) => {
			order.items?.forEach((item) => {
				const existing = productMap.get(Number(item.product)) || {
					name: item.product_name,
					quantity: 0,
					revenue: 0
				};
				existing.quantity += Number(item.quantity || 0);
				existing.revenue += Number(item.price || 0) * Number(item.quantity || 0);
				productMap.set(Number(item.product), existing);
			});
		});
		return Array.from(productMap.entries()).map(([id, data]) => ({
			id,
			...data
		})).sort((a, b) => b.quantity - a.quantity).slice(0, 5);
	}, [orders]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoadingSpinner, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSummaryCard, {
						label: "Total products",
						value: products.length,
						icon: Package,
						accent: "gold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSummaryCard, {
						label: "Total categories",
						value: categories.length,
						icon: Layers,
						accent: "purple"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSummaryCard, {
						label: "Total orders",
						value: orders.length,
						icon: ShoppingBag,
						accent: "pink"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSummaryCard, {
						label: "Total customers",
						value: customers.length,
						icon: Users,
						accent: "gold"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSummaryCard, {
					label: "Revenue today",
					value: `KSh ${revenueToday.toLocaleString()}`,
					icon: DollarSign,
					accent: "purple"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSummaryCard, {
					label: "Monthly revenue",
					value: `KSh ${monthlyRevenue.toLocaleString()}`,
					icon: TrendingUp,
					accent: "gold"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-[1.75fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 flex items-center justify-between gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground",
							children: "Sales overview"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Daily order count and revenue for the last 7 days."
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[320px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: salesChartData,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										className: "stroke-border"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: { fontSize: 12 },
										className: "text-muted-foreground"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: { fontSize: 12 },
										className: "text-muted-foreground"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "orders",
										fill: "var(--color-orders)",
										radius: [
											8,
											8,
											0,
											0
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "colorOrders",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#8b5cf6"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#6366f1"
										})]
									}) })
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground",
								children: "Low stock"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Products that need restocking soon."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/inventory",
								className: "text-sm font-semibold text-purple hover:text-foreground",
								children: "Manage inventory"
							})]
						}), lowStockProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No low stock products right now."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: lowStockProducts.slice(0, 5).map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-3xl border border-border bg-muted/60 p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: product.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: ["Stock: ", product.stock_quantity ?? 0]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "destructive",
										children: "Low"
									})]
								})
							}, product.id))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground",
								children: "New customers"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Recently registered shoppers."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/customers",
								className: "text-sm font-semibold text-purple hover:text-foreground",
								children: "View customers"
							})]
						}), latestCustomers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No customers have registered yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: latestCustomers.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-border bg-muted/60 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: customer.full_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: customer.email
								})]
							}, customer.id))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground",
								children: "Pending orders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-3xl font-semibold",
								children: pendingOrders.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Awaiting processing"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground",
								children: "Completed orders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-3xl font-semibold",
								children: completedOrders.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Successfully fulfilled"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground",
								children: "Low stock items"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-3xl font-semibold",
								children: lowStockProducts.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Below reorder threshold"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground",
							children: "Recent orders"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Latest customer pickup and payment updates."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/orders",
							className: "inline-flex items-center gap-2 text-sm font-semibold text-purple hover:text-foreground",
							children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})]
					}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
						title: "No orders yet",
						message: "New orders will appear here once customers place them."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Order" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Customer" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Total" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: orders.slice(0, 5).map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: ["#", order.order_number] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: order.customer_name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: order.status === "Completed" ? "secondary" : order.status === "Pending" ? "destructive" : "default",
							children: order.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: order.total_amount })
					] }, order.id)) })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground",
							children: "Best sellers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Top products by quantity sold."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/products",
							className: "text-sm font-semibold text-purple hover:text-foreground",
							children: "View products"
						})]
					}), bestSellingProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No sales data available yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: bestSellingProducts.map((product, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-3xl border border-border bg-muted/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-8 w-8 items-center justify-center rounded-full bg-purple/10 text-sm font-semibold text-purple",
									children: index + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: product.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [product.quantity, " sold"]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-semibold text-foreground",
								children: ["KSh ", product.revenue.toLocaleString()]
							})]
						}, product.id))
					})]
				})]
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
