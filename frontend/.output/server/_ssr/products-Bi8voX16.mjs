import { o as __toESM } from "../_runtime.mjs";
import { F as uploadProductImage, N as updateProduct, d as deleteProduct, h as getCategories, o as createProduct, x as getProducts } from "./utils-AKH12ZYD.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-CrA3ctiB.mjs";
import { t as Input } from "./input-JE7E82rG.mjs";
import { _ as Plus } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BtLnQ73Y.mjs";
import { n as AdminLoadingSpinner, t as AdminEmptyState } from "./AdminLoadingSpinner-xeuF3RGi.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-m_oq8NCT.mjs";
import { t as Badge } from "./badge-BK1Owwqh.mjs";
import { t as AdminSearchBar } from "./AdminSearchBar-DmQk0a8T.mjs";
import { t as Textarea } from "./textarea-lokovlWD.mjs";
import { t as DeleteConfirmationModal } from "./DeleteConfirmationModal-Cg0guhva.mjs";
import { a as stringType, i as objectType, n as booleanType, r as literalType, t as anyType } from "../_libs/zod.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DcMSRoAr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-Bi8voX16.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var productSchema = objectType({
	name: stringType().min(2, "Product name is required"),
	category: stringType().min(1, "Category is required"),
	description: stringType().optional(),
	price: stringType().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price"),
	stock_quantity: stringType().regex(/^\d+$/, "Enter a valid quantity"),
	availability: booleanType(),
	discount_price: stringType().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid discount price").optional().or(literalType("")),
	image: anyType().optional()
});
function ProductFormModal({ open, onOpenChange, categories, initialData, onSubmit }) {
	const [preview, setPreview] = (0, import_react.useState)(null);
	const form = useForm({
		resolver: u(productSchema),
		defaultValues: {
			name: initialData?.name ?? "",
			category: String(initialData?.category ?? ""),
			description: initialData?.description ?? "",
			price: String(initialData?.price ?? ""),
			stock_quantity: String(initialData?.stock_quantity ?? ""),
			availability: initialData?.availability ?? true,
			discount_price: initialData?.discount_price ? String(initialData.discount_price) : ""
		}
	});
	(0, import_react.useEffect)(() => {
		setPreview(initialData?.image ?? initialData?.images?.[0]?.image ?? null);
		form.reset({
			name: initialData?.name ?? "",
			category: String(initialData?.category ?? ""),
			description: initialData?.description ?? "",
			price: String(initialData?.price ?? ""),
			stock_quantity: String(initialData?.stock_quantity ?? ""),
			availability: initialData?.availability ?? true,
			discount_price: initialData?.discount_price ? String(initialData.discount_price) : ""
		});
	}, [initialData, form]);
	const handleFileChange = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setPreview(url);
		}
	};
	const submitForm = async (data) => {
		const payload = new FormData();
		payload.append("name", data.name);
		payload.append("category", data.category);
		payload.append("description", data.description ?? "");
		payload.append("price", data.price);
		payload.append("stock_quantity", data.stock_quantity);
		payload.append("availability", data.availability ? "true" : "false");
		if (data.discount_price) payload.append("discount_price", data.discount_price);
		if (initialData?.id) payload.append("featured", String(!!initialData.featured));
		const imageField = form.getValues("image")?.[0];
		await onSubmit({
			formData: payload,
			imageFile: imageField
		});
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: initialData ? "Edit product" : "Add new product" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: initialData ? "Update product details and inventory." : "Create a new product listing for the store." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4 pt-4",
				onSubmit: form.handleSubmit(submitForm),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("name") })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: (value) => form.setValue("category", value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Pick a category" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: String(category.id),
									children: category.name
								}, category.id)) })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...form.register("description"),
							rows: 4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Price" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									...form.register("price"),
									placeholder: "00.00"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Discount price" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									...form.register("discount_price"),
									placeholder: "00.00"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stock quantity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									...form.register("stock_quantity"),
									placeholder: "0"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Availability" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									...form.register("availability"),
									className: "h-4 w-4 rounded border-border"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: form.watch("availability") ? "Available" : "Out of stock" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Product image" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "file",
								accept: "image/*",
								...form.register("image"),
								onChange: handleFileChange
							})]
						})]
					}),
					preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: preview,
							alt: "Preview",
							className: "h-40 w-40 rounded-2xl object-cover border border-border"
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
							children: "Save product"
						})]
					})
				]
			})]
		})
	});
}
function AdminProducts() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("");
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [products, setProducts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [productModalOpen, setProductModalOpen] = (0, import_react.useState)(false);
	const [deleteModalOpen, setDeleteModalOpen] = (0, import_react.useState)(false);
	const [selectedProduct, setSelectedProduct] = (0, import_react.useState)(null);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		async function load() {
			try {
				const [productResponse, categoryData] = await Promise.all([getProducts(), getCategories()]);
				setProducts(productResponse.results);
				setCategories(categoryData);
			} catch {
				setProducts([]);
				setCategories([]);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);
	const filteredProducts = (0, import_react.useMemo)(() => {
		return products.filter((product) => {
			const matchesSearch = search ? product.name.toLowerCase().includes(search.toLowerCase()) || product.description?.toLowerCase().includes(search.toLowerCase()) : true;
			const matchesCategory = categoryFilter ? String(product.category) === categoryFilter : true;
			return matchesSearch && matchesCategory;
		});
	}, [
		products,
		search,
		categoryFilter
	]);
	const handleAdd = () => {
		setSelectedProduct(null);
		setProductModalOpen(true);
	};
	const handleSubmit = async ({ formData, imageFile }) => {
		try {
			if (selectedProduct) {
				await updateProduct(selectedProduct.id, formData);
				if (imageFile) await uploadProductImage(selectedProduct.id, [imageFile]);
			} else {
				const product = await createProduct(formData);
				if (imageFile) await uploadProductImage(product.id, [imageFile]);
			}
			const result = await getProducts();
			setProducts(result.results);
		} catch (error) {
			console.error(error);
		}
	};
	const handleDelete = async () => {
		if (!deleteTarget) return;
		try {
			await deleteProduct(deleteTarget.id);
			setProducts((prev) => prev.filter((product) => product.id !== deleteTarget.id));
			setDeleteTarget(null);
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
					children: "Products"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-semibold",
					children: "Manage inventory"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleAdd,
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add product"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-[1fr_auto]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearchBar, {
					value: search,
					onChange: setSearch,
					placeholder: "Search products"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: categoryFilter,
						onValueChange: setCategoryFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Filter category" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "",
							children: "All categories"
						}), categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: String(category.id),
							children: category.name
						}, category.id))] })]
					})
				})]
			}),
			filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
				title: "No matching products",
				message: "Try adjusting the search or category filter."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Product" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Category" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Price" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Stock" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Actions" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: product.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: product.category_name ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: product.price }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: product.stock_quantity ?? 0 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: product.availability ? "secondary" : "destructive",
					children: product.availability ? "Available" : "Out of stock"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "space-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => {
							setSelectedProduct(product);
							setProductModalOpen(true);
						},
						children: "Edit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						size: "sm",
						onClick: () => {
							setDeleteTarget(product);
							setDeleteModalOpen(true);
						},
						children: "Delete"
					})]
				})
			] }, product.id)) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductFormModal, {
				open: productModalOpen,
				onOpenChange: setProductModalOpen,
				categories,
				initialData: selectedProduct ?? void 0,
				onSubmit: handleSubmit
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmationModal, {
				open: deleteModalOpen,
				onOpenChange: setDeleteModalOpen,
				title: "Delete product",
				description: `Are you sure you want to delete ${deleteTarget?.name ?? "this product"}? This cannot be undone.`,
				onConfirm: handleDelete
			})
		]
	});
}
//#endregion
export { AdminProducts as component };
