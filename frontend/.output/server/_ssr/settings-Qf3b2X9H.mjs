import { o as __toESM } from "../_runtime.mjs";
import { k as updateBusinessSettings, p as getBusinessSettings } from "./utils-CN24kyyZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-DMrVmy0x.mjs";
import { t as Input } from "./input-BaTVOGyF.mjs";
import { n as AdminLoadingSpinner, t as AdminEmptyState } from "./AdminLoadingSpinner-xeuF3RGi.mjs";
import { t as Textarea } from "./textarea-CI16D86N.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Qf3b2X9H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var settingsSchema = objectType({
	business_name: stringType().min(2),
	phone: stringType().min(5),
	email: stringType().email(),
	description: stringType().optional(),
	pickup_location: stringType().min(2),
	instagram: stringType().optional(),
	tiktok: stringType().optional(),
	whatsapp: stringType().optional()
});
function AdminSettings() {
	const [settings, setSettings] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const form = useForm({ resolver: u(settingsSchema) });
	(0, import_react.useEffect)(() => {
		async function load() {
			try {
				const businessSettings = await getBusinessSettings();
				setSettings(businessSettings);
				form.reset(businessSettings);
			} catch {
				setSettings(null);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [form]);
	const onSubmit = async (data) => {
		setSaving(true);
		try {
			const updatedSettings = await updateBusinessSettings(data);
			setSettings(updatedSettings);
			form.reset(updatedSettings);
		} catch (error) {
			console.error(error);
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoadingSpinner, {});
	if (!settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
		title: "Settings unavailable",
		message: "Unable to load business settings right now."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm uppercase tracking-[0.3em] text-muted-foreground",
			children: "Settings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-3xl font-semibold",
			children: "Business information"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-6",
			onSubmit: form.handleSubmit(onSubmit),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Business name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("business_name") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Phone number" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("phone") })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("email") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pickup location" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("pickup_location") })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Business description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						...form.register("description"),
						rows: 5
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Instagram" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("instagram") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TikTok" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("tiktok") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WhatsApp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("whatsapp") })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: saving,
						children: saving ? "Saving..." : "Save changes"
					})
				})
			]
		})]
	});
}
//#endregion
export { AdminSettings as component };
