import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { d as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminLoadingSpinner-xeuF3RGi.js
var import_jsx_runtime = require_jsx_runtime();
function AdminEmptyState({ title, message, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[2rem] border border-dashed border-border bg-card/70 p-10 text-center text-muted-foreground shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-foreground",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: message
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: action
			}) : null
		]
	});
}
function AdminLoadingSpinner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[18rem] items-center justify-center rounded-[2rem] border border-border bg-card/80 shadow-soft",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-9 animate-spin rounded-full border-4 border-transparent border-t-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading dashboard data..." })]
		})
	});
}
//#endregion
export { AdminLoadingSpinner as n, AdminEmptyState as t };
