import { o as __toESM } from "../_runtime.mjs";
import { g as getCustomers } from "./utils-CN24kyyZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as AdminLoadingSpinner, t as AdminEmptyState } from "./AdminLoadingSpinner-xeuF3RGi.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DlisZoRS.mjs";
import { t as AdminSearchBar } from "./AdminSearchBar-Cm9bAGQL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-B7bMIh1x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminCustomers() {
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		async function load() {
			try {
				const customerResponse = await getCustomers();
				setCustomers(customerResponse);
			} catch {
				setCustomers([]);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);
	const filteredCustomers = (0, import_react.useMemo)(() => customers.filter((customer) => {
		const query = search.toLowerCase();
		return customer.full_name.toLowerCase().includes(query) || customer.email.toLowerCase().includes(query) || customer.phone.toLowerCase().includes(query);
	}), [customers, search]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoadingSpinner, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm uppercase tracking-[0.3em] text-muted-foreground",
				children: "Customers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold",
				children: "Customer management"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearchBar, {
				value: search,
				onChange: setSearch,
				placeholder: "Search customers"
			}),
			filteredCustomers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
				title: "No customers found",
				message: "Customers will appear here after registration."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Full name" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Email" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Phone" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Orders" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Registered" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredCustomers.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: customer.full_name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: customer.email }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: customer.phone }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: customer.orders_count }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(customer.registered_at).toLocaleDateString() })
			] }, customer.id)) })] })
		]
	});
}
//#endregion
export { AdminCustomers as component };
