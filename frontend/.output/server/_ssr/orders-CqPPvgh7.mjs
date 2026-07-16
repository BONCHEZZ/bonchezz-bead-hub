import { o as __toESM } from "../_runtime.mjs";
import { M as updateOrderStatus, v as getOrders } from "./utils-CN24kyyZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { I as CircleX, P as Clock3, R as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as AdminLoadingSpinner, t as AdminEmptyState } from "./AdminLoadingSpinner-xeuF3RGi.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DlisZoRS.mjs";
import { t as AdminSearchBar } from "./AdminSearchBar-Cm9bAGQL.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-B1dQmLMX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-CqPPvgh7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusOptions = [
	"Pending",
	"Confirmed",
	"Ready for Pickup",
	"Completed",
	"Cancelled"
];
function AdminOrders() {
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		async function load() {
			try {
				const orderResponse = await getOrders();
				setOrders(orderResponse);
			} catch {
				setOrders([]);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);
	const filteredOrders = (0, import_react.useMemo)(() => orders.filter((order) => {
		const query = search.toLowerCase();
		return order.order_number.toLowerCase().includes(query) || order.customer_name.toLowerCase().includes(query) || order.phone.toLowerCase().includes(query) || order.pickup_location.toLowerCase().includes(query);
	}), [orders, search]);
	const updateStatus = async (orderId, status) => {
		try {
			const updated = await updateOrderStatus(orderId, status);
			setOrders((prev) => prev.map((order) => order.id === updated.id ? updated : order));
		} catch (error) {
			console.error(error);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoadingSpinner, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm uppercase tracking-[0.3em] text-muted-foreground",
				children: "Orders"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold",
				children: "Customer orders"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearchBar, {
				value: search,
				onChange: setSearch,
				placeholder: "Search by order, customer, phone or pickup"
			}),
			filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
				title: "No orders found",
				message: "Orders will appear here once customers complete checkout."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Order" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Customer" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Pickup" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Payment" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: ["#", order.order_number] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: order.customer_name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: order.pickup_location }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(order.order_date).toLocaleDateString() }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: order.total_amount }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: order.payment_method }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: order.status,
						onValueChange: (value) => updateStatus(order.id, value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: order.status }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: statusOptions.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: status,
							children: status
						}, status)) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [
							order.status === "Completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-secondary" }) : null,
							order.status === "Pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-4 w-4 text-gold" }) : null,
							order.status === "Cancelled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 text-destructive" }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: order.payment_status })
						]
					})]
				})
			] }, order.id)) })] })
		]
	});
}
//#endregion
export { AdminOrders as component };
