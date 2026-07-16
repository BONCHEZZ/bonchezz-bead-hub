import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Input } from "./input-BaTVOGyF.mjs";
import { g as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminSearchBar-Cm9bAGQL.js
var import_jsx_runtime = require_jsx_runtime();
function AdminSearchBar({ value, placeholder = "Search…", onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "relative block w-full max-w-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			onChange: (event) => onChange(event.currentTarget.value),
			placeholder,
			className: "pl-11"
		})]
	});
}
//#endregion
export { AdminSearchBar as t };
