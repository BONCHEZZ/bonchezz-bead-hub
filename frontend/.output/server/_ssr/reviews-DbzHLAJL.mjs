import { o as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { O as updateAdminReview, f as getAdminReviews, i as cn, s as deleteAdminReview } from "./utils-AKH12ZYD.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-CrA3ctiB.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BtLnQ73Y.mjs";
import { n as AdminLoadingSpinner, t as AdminEmptyState } from "./AdminLoadingSpinner-xeuF3RGi.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-m_oq8NCT.mjs";
import { t as Badge } from "./badge-BK1Owwqh.mjs";
import { t as AdminSearchBar } from "./AdminSearchBar-DmQk0a8T.mjs";
import { t as Textarea } from "./textarea-lokovlWD.mjs";
import { t as DeleteConfirmationModal } from "./DeleteConfirmationModal-Cg0guhva.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DcMSRoAr.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-DbzHLAJL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var ratingOptions = [
	1,
	2,
	3,
	4,
	5
];
function AdminReviews() {
	const [reviews, setReviews] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	const [selectedReview, setSelectedReview] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		rating: 5,
		comment: ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		async function load() {
			try {
				const data = await getAdminReviews();
				setReviews(data);
			} catch {
				setReviews([]);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);
	const filteredReviews = (0, import_react.useMemo)(() => reviews.filter((review) => {
		const query = search.toLowerCase();
		return review.product_name?.toLowerCase().includes(query) || review.user_name?.toLowerCase().includes(query) || review.comment?.toLowerCase().includes(query);
	}), [reviews, search]);
	const openEdit = (review) => {
		setSelectedReview(review);
		setForm({
			rating: review.rating,
			comment: review.comment
		});
		setEditOpen(true);
	};
	const saveEdit = async () => {
		if (!selectedReview) return;
		setSaving(true);
		try {
			const updated = await updateAdminReview(selectedReview.id, form);
			setReviews((prev) => prev.map((r) => r.id === updated.id ? updated : r));
			setEditOpen(false);
		} catch (error) {
			console.error(error);
		} finally {
			setSaving(false);
		}
	};
	const handleDelete = async () => {
		if (!selectedReview) return;
		try {
			await deleteAdminReview(selectedReview.id);
			setReviews((prev) => prev.filter((r) => r.id !== selectedReview.id));
			setDeleteOpen(false);
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
				children: "Reviews"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold",
				children: "Customer reviews"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearchBar, {
				value: search,
				onChange: setSearch,
				placeholder: "Search reviews"
			}),
			filteredReviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
				title: "No reviews found",
				message: "Customer reviews will appear here once submitted."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Product" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Rating" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Comment" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Actions" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredReviews.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: review.product_name ?? `#${review.product}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: review.user_name ?? `#${review.user}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "secondary",
					children: [review.rating, "/5"]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "max-w-[320px] truncate text-sm text-muted-foreground",
					children: review.comment
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-sm text-muted-foreground",
					children: new Date(review.created_at).toLocaleDateString()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => openEdit(review),
						children: "Edit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						size: "sm",
						onClick: () => {
							setSelectedReview(review);
							setDeleteOpen(true);
						},
						children: "Delete"
					})]
				})
			] }, review.id)) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: editOpen,
				onOpenChange: setEditOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Edit review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Update the rating and comment for this review." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Rating" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: String(form.rating),
								onValueChange: (value) => setForm((prev) => ({
									...prev,
									rating: Number(value)
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Rating" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ratingOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: String(option),
									children: option
								}, option)) })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Comment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: form.comment,
								onChange: (e) => setForm((prev) => ({
									...prev,
									comment: e.target.value
								})),
								rows: 4
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setEditOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: saveEdit,
						disabled: saving,
						children: saving ? "Saving..." : "Save changes"
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmationModal, {
				open: deleteOpen,
				onOpenChange: setDeleteOpen,
				title: "Delete review",
				description: `Are you sure you want to delete this review? This cannot be undone.`,
				onConfirm: handleDelete
			})
		]
	});
}
//#endregion
export { AdminReviews as component };
