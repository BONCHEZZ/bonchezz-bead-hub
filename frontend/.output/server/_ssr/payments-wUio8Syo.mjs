import { o as __toESM } from "../_runtime.mjs";
import { v as getOrders, y as getPayments } from "./utils-CN24kyyZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as AdminLoadingSpinner, t as AdminEmptyState } from "./AdminLoadingSpinner-xeuF3RGi.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DlisZoRS.mjs";
import { t as Badge } from "./badge-mr_RExgU.mjs";
import { t as AdminSearchBar } from "./AdminSearchBar-Cm9bAGQL.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-B1dQmLMX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-wUio8Syo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusOptions = [
	"Paid",
	"Pending",
	"Failed",
	"Cancelled"
];
function AdminPayments() {
	const [payments, setPayments] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("");
	const orderMap = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		orders.forEach((order) => map.set(order.id, order));
		return map;
	}, [orders]);
	(0, import_react.useEffect)(() => {
		async function load() {
			try {
				const [paymentResponse, orderResponse] = await Promise.all([getPayments(), getOrders()]);
				setPayments(paymentResponse.results);
				setOrders(orderResponse);
			} catch {
				setPayments([]);
				setOrders([]);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);
	const filteredPayments = (0, import_react.useMemo)(() => {
		return payments.filter((payment) => {
			const order = orderMap.get(payment.order);
			const query = search.toLowerCase();
			const matchesSearch = search === "" || String(payment.order).includes(query) || payment.payment_method.toLowerCase().includes(query) || payment.status.toLowerCase().includes(query) || (order?.order_number ?? "").toLowerCase().includes(query) || (order?.customer_name ?? "").toLowerCase().includes(query);
			const matchesStatus = statusFilter ? payment.status === statusFilter : true;
			return matchesSearch && matchesStatus;
		});
	}, [
		payments,
		search,
		statusFilter,
		orderMap
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoadingSpinner, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm uppercase tracking-[0.3em] text-muted-foreground",
				children: "Payments"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold",
				children: "Payment records"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-[1fr_auto]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearchBar, {
					value: search,
					onChange: setSearch,
					placeholder: "Search payments"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: statusFilter,
						onValueChange: setStatusFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Filter status" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "",
							children: "All statuses"
						}), statusOptions.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: status,
							children: status
						}, status))] })]
					})
				})]
			}),
			filteredPayments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
				title: "No payments found",
				message: "Payment records will appear here once orders are placed."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Order" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Customer" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Method" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredPayments.map((payment) => {
				const order = orderMap.get(payment.order);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "font-medium",
						children: ["#", order?.order_number ?? payment.order]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: order?.customer_name ?? "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: payment.amount }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: payment.payment_method }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: payment.status === "Paid" ? "secondary" : payment.status === "Pending" ? "default" : "destructive",
						children: payment.status
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-sm text-muted-foreground",
						children: new Date(payment.created_at).toLocaleDateString()
					})
				] }, payment.id);
			}) })] })
		]
	});
}
//#endregion
export { AdminPayments as component };
