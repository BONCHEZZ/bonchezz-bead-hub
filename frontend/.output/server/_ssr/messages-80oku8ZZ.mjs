import { o as __toESM } from "../_runtime.mjs";
import { T as markMessageRead, _ as getMessages, u as deleteMessage } from "./utils-AKH12ZYD.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-CrA3ctiB.mjs";
import { T as Mail, c as Trash2 } from "../_libs/lucide-react.mjs";
import { n as AdminLoadingSpinner, t as AdminEmptyState } from "./AdminLoadingSpinner-xeuF3RGi.mjs";
import { t as Badge } from "./badge-BK1Owwqh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/messages-80oku8ZZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminMessages() {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function load() {
			try {
				const messageResponse = await getMessages();
				setMessages(messageResponse);
			} catch {
				setMessages([]);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);
	const handleMarkRead = async (id) => {
		try {
			const updated = await markMessageRead(id);
			setMessages((prev) => prev.map((message) => message.id === updated.id ? updated : message));
		} catch (error) {
			console.error(error);
		}
	};
	const handleDelete = async (id) => {
		try {
			await deleteMessage(id);
			setMessages((prev) => prev.filter((message) => message.id !== id));
		} catch (error) {
			console.error(error);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoadingSpinner, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm uppercase tracking-[0.3em] text-muted-foreground",
			children: "Messages"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-3xl font-semibold",
			children: "Customer inquiries"
		})] }), messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
			title: "No messages",
			message: "Customer contact inquiries will appear here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4",
			children: messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: message.email })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-lg font-semibold",
								children: message.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: ["Received ", new Date(message.created_at).toLocaleDateString()]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: !message.is_read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: "Unread"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "default",
								children: "Read"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted-foreground",
						children: message.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [!message.is_read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => handleMarkRead(message.id),
							children: "Mark as read"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "destructive",
							onClick: () => handleDelete(message.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete"]
						})]
					})
				]
			}, message.id))
		})]
	});
}
//#endregion
export { AdminMessages as component };
