import { o as __toESM } from "../_runtime.mjs";
import { a as createCategory, h as getCategories, j as updateCategory, l as deleteCategory } from "./utils-AKH12ZYD.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-CrA3ctiB.mjs";
import { t as Input } from "./input-JE7E82rG.mjs";
import { _ as Plus } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BtLnQ73Y.mjs";
import { n as AdminLoadingSpinner, t as AdminEmptyState } from "./AdminLoadingSpinner-xeuF3RGi.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-m_oq8NCT.mjs";
import { t as AdminSearchBar } from "./AdminSearchBar-DmQk0a8T.mjs";
import { t as Textarea } from "./textarea-lokovlWD.mjs";
import { t as DeleteConfirmationModal } from "./DeleteConfirmationModal-Cg0guhva.mjs";
import { a as stringType, i as objectType, t as anyType } from "../_libs/zod.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-y_Ppsa1I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categorySchema = objectType({
	name: stringType().min(2, "Category name is required"),
	description: stringType().optional(),
	image: anyType().optional()
});
function CategoryFormModal({ open, onOpenChange, initialData, onSubmit }) {
	const [preview, setPreview] = (0, import_react.useState)(null);
	const form = useForm({
		resolver: u(categorySchema),
		defaultValues: {
			name: initialData?.name ?? "",
			description: initialData?.description ?? ""
		}
	});
	(0, import_react.useEffect)(() => {
		setPreview(initialData?.image ?? null);
		form.reset({
			name: initialData?.name ?? "",
			description: initialData?.description ?? ""
		});
	}, [initialData, form]);
	const handleFileChange = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setPreview(url);
		}
	};
	const handleSubmit = async (values) => {
		const payload = new FormData();
		payload.append("name", values.name);
		payload.append("description", values.description ?? "");
		const imageField = form.getValues("image")?.[0];
		if (imageField) payload.append("image", imageField);
		await onSubmit(payload);
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: initialData ? "Edit category" : "Add category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: initialData ? "Update category details." : "Create a new category for the product catalog." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4 pt-4",
				onSubmit: form.handleSubmit(handleSubmit),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("name") })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...form.register("description"),
							rows: 4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Category image" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "file",
							accept: "image/*",
							...form.register("image"),
							onChange: handleFileChange
						})]
					}),
					preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: preview,
							alt: "Preview",
							className: "h-32 w-32 rounded-2xl object-cover border border-border"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => onOpenChange(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Save category"
						})]
					})
				]
			})]
		})
	});
}
function AdminCategories() {
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)(null);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		async function load() {
			try {
				const categoryResponse = await getCategories();
				setCategories(categoryResponse);
			} catch {
				setCategories([]);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);
	const filteredCategories = (0, import_react.useMemo)(() => categories.filter((category) => category.name.toLowerCase().includes(search.toLowerCase())), [categories, search]);
	const handleSubmit = async (payload) => {
		try {
			if (selectedCategory) await updateCategory(selectedCategory.id, payload);
			else await createCategory(payload);
			const refreshed = await getCategories();
			setCategories(refreshed);
		} catch (error) {
			console.error(error);
		}
	};
	const handleDelete = async () => {
		if (!selectedCategory) return;
		try {
			await deleteCategory(selectedCategory.id);
			setCategories((prev) => prev.filter((category) => category.id !== selectedCategory.id));
			setSelectedCategory(null);
		} catch (error) {
			console.error(error);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoadingSpinner, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm uppercase tracking-[0.3em] text-muted-foreground",
					children: "Categories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-semibold",
					children: "Manage product categories"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => {
						setSelectedCategory(null);
						setModalOpen(true);
					},
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add category"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearchBar, {
				value: search,
				onChange: setSearch,
				placeholder: "Search categories"
			}),
			filteredCategories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
				title: "No categories found",
				message: "Create a new category to group your products."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Description" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Actions" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: category.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: category.description ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => {
							setSelectedCategory(category);
							setModalOpen(true);
						},
						children: "Edit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						size: "sm",
						onClick: () => {
							setSelectedCategory(category);
							setDeleteOpen(true);
						},
						children: "Delete"
					})]
				})
			] }, category.id)) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryFormModal, {
				open: modalOpen,
				onOpenChange: setModalOpen,
				initialData: selectedCategory ?? void 0,
				onSubmit: handleSubmit
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmationModal, {
				open: deleteOpen,
				onOpenChange: setDeleteOpen,
				title: "Delete category",
				description: `Are you sure you want to delete ${selectedCategory?.name ?? "this category"}?`,
				onConfirm: handleDelete
			})
		]
	});
}
//#endregion
export { AdminCategories as component };
