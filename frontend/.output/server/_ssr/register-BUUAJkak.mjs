import { o as __toESM } from "../_runtime.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useAuth } from "./cart-context-BJmH7bpo.mjs";
import { t as SiteLayout } from "./Layout-Bq6d38zL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-BUUAJkak.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Register() {
	const { register } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const form = e.currentTarget;
		const full_name = form.elements.namedItem("full_name").value.trim();
		const student_email = form.elements.namedItem("student_email").value.trim();
		const phone_number = form.elements.namedItem("phone_number").value.trim();
		const password = form.elements.namedItem("password").value;
		const confirm = form.elements.namedItem("confirm").value;
		if (!full_name || !student_email || !phone_number || !password || !confirm) {
			setError("All fields are required.");
			return;
		}
		if (password !== confirm) {
			setError("Passwords do not match.");
			return;
		}
		setLoading(true);
		try {
			await register({
				full_name,
				student_email,
				phone_number,
				password
			});
			toast.success("Account created!");
			window.location.href = "/";
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.data) {
				const data = error.response.data;
				const messages = [];
				if (typeof data.detail === "string") messages.push(data.detail);
				for (const value of Object.values(data)) if (Array.isArray(value)) messages.push(value.join(" "));
				else if (typeof value === "string") messages.push(value);
				setError(messages.filter(Boolean).join(" ") || "Could not create account. The email may already be in use.");
			} else setError("Could not create account. The email may already be in use.");
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
					children: "Join the club"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Members get early drops and student discounts."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Full name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "full_name",
								required: true,
								className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Student email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "student_email",
								type: "email",
								required: true,
								className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Phone number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "phone_number",
								type: "tel",
								required: true,
								className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
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
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "Confirm password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "confirm",
									type: "password",
									required: true,
									className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
								})]
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: loading,
							className: "w-full rounded-full bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow disabled:opacity-60",
							children: loading ? "Creating account..." : "Create account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: [
						"Already have one?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "font-medium text-purple hover:underline",
							children: "Log in"
						})
					]
				})
			]
		})
	}) });
}
//#endregion
export { Register as component };
