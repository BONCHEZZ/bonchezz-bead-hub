import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useAuth } from "./cart-context-ak53IsLb.mjs";
import { t as SiteLayout } from "./Layout-CEDalOgd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BdLBZfI1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { login } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const form = e.currentTarget;
		const email = form.elements.namedItem("email").value.trim();
		const password = form.elements.namedItem("password").value;
		if (!email || !password) {
			setError("Please fill in all fields.");
			return;
		}
		setLoading(true);
		try {
			await login(email, password);
			toast.success("Welcome back!");
			window.location.href = "/";
		} catch {
			setError("Invalid email or password.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto grid min-h-[70vh] max-w-md items-center px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full rounded-3xl border border-border bg-card p-8 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold",
					children: "Welcome back"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Log in to track orders and save favorites."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Student email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "email",
								type: "email",
								required: true,
								className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "password",
								type: "password",
								required: true,
								className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "text-purple hover:underline",
								children: "Forgot password?"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: loading,
							className: "w-full rounded-full bg-foreground py-3 text-sm font-semibold text-background hover:bg-purple disabled:opacity-60",
							children: loading ? "Logging in..." : "Log in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: [
						"New here?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							className: "font-medium text-purple hover:underline",
							children: "Create an account"
						})
					]
				})
			]
		})
	}) });
}
//#endregion
export { Login as component };
