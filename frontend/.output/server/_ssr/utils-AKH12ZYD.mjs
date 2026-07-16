import { t as axios } from "../_libs/axios+[...].mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-AKH12ZYD.js
var API_BASE_URL = "http://127.0.0.1:8000";
var client = axios.create({
	baseURL: API_BASE_URL,
	headers: { "Content-Type": "application/json" }
});
function getAuthHeaders() {
	try {
		const token = localStorage.getItem("bonchezz-token");
		return token ? { Authorization: `Bearer ${token}` } : {};
	} catch {
		return {};
	}
}
client.interceptors.request.use((config) => {
	const headers = getAuthHeaders();
	Object.entries(headers).forEach(([key, value]) => {
		config.headers[key] = value;
	});
	return config;
});
var isRefreshing = false;
client.interceptors.response.use((response) => response, async (error) => {
	const original = error.config;
	if (!original || !original.url) return Promise.reject(error);
	if (error.response?.status !== 401) return Promise.reject(error);
	if (original.url.includes("/login") || original.url.includes("/register")) return Promise.reject(error);
	if (isRefreshing) return Promise.reject(error);
	isRefreshing = true;
	try {
		const refresh = localStorage.getItem("bonchezz-refresh");
		if (!refresh) throw new Error("no refresh");
		const access = (await axios.post(`${API_BASE_URL}/api/accounts/token/refresh/`, { refresh })).data.access;
		localStorage.setItem("bonchezz-token", access);
		if (original.headers) original.headers.Authorization = `Bearer ${access}`;
		return client(original);
	} catch {
		localStorage.removeItem("bonchezz-token");
		localStorage.removeItem("bonchezz-refresh");
		return Promise.reject(error);
	} finally {
		isRefreshing = false;
	}
});
async function request(path, config) {
	const requestConfig = {
		url: path,
		...config
	};
	if (requestConfig.data instanceof FormData) requestConfig.headers = {
		...requestConfig.headers,
		"Content-Type": void 0
	};
	return (await client.request(requestConfig)).data;
}
var buildSearchParams = (params) => {
	const query = new URLSearchParams(params).toString();
	return query ? `?${query}` : "";
};
async function getCategories() {
	return request("/api/categories/");
}
async function createCategory(payload) {
	return request("/api/categories/", {
		method: "POST",
		data: payload
	});
}
async function updateCategory(id, payload) {
	return request(`/api/categories/${id}/`, {
		method: "PUT",
		data: payload
	});
}
async function deleteCategory(id) {
	return request(`/api/categories/${id}/`, { method: "DELETE" });
}
async function getProducts(params) {
	return request(`/api/products/${buildSearchParams(params)}`, { method: "GET" });
}
async function getProductById(id) {
	return request(`/api/products/${id}/`, { method: "GET" });
}
async function createProduct(payload) {
	return request("/api/products/", {
		method: "POST",
		data: payload
	});
}
async function updateProduct(id, payload) {
	return request(`/api/products/${id}/`, {
		method: "PATCH",
		data: payload
	});
}
async function updateProductStock(id, stock_quantity) {
	return request(`/api/products/${id}/`, {
		method: "PATCH",
		data: { stock_quantity }
	});
}
async function deleteProduct(id) {
	return request(`/api/products/${id}/`, { method: "DELETE" });
}
async function uploadProductImage(productId, files) {
	const form = new FormData();
	Array.from(files).forEach((file) => form.append("images", file));
	return request(`/api/products/${productId}/upload-images/`, {
		method: "POST",
		data: form
	});
}
async function getOrders() {
	return request("/api/orders/", { method: "GET" });
}
async function updateOrderStatus(id, status) {
	return request(`/api/orders/${id}/`, {
		method: "PATCH",
		data: { status }
	});
}
async function checkout(payload) {
	return request("/api/orders/checkout/", {
		method: "POST",
		data: payload
	});
}
async function getCustomers() {
	return request("/api/customers/", { method: "GET" });
}
async function getMessages() {
	return request("/api/messages/", { method: "GET" });
}
async function sendMessage(payload) {
	const response = await fetch("https://formspree.io/f/mykrypdr", {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: payload.name,
			email: payload.email,
			_replyto: payload.email,
			_subject: `New message from ${payload.name}`,
			message: payload.message
		})
	});
	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Formspree failed: ${response.status} ${text}`);
	}
	return response.json();
}
async function markMessageRead(id) {
	return request(`/api/messages/${id}/`, {
		method: "PATCH",
		data: { is_read: true }
	});
}
async function deleteMessage(id) {
	return request(`/api/messages/${id}/`, { method: "DELETE" });
}
async function getAdminReviews() {
	return request("/api/reviews/admin/", { method: "GET" });
}
async function updateAdminReview(id, payload) {
	return request(`/api/reviews/admin/${id}/`, {
		method: "PATCH",
		data: payload
	});
}
async function deleteAdminReview(id) {
	return request(`/api/reviews/admin/${id}/`, { method: "DELETE" });
}
async function getBusinessSettings() {
	return request("/api/settings/", { method: "GET" });
}
async function updateBusinessSettings(payload) {
	return request("/api/settings/", {
		method: "PATCH",
		data: payload
	});
}
async function login(email, password) {
	return request("/api/accounts/login/", {
		method: "POST",
		data: {
			student_email: email,
			password
		}
	});
}
async function register(payload) {
	return request("/api/accounts/register/", {
		method: "POST",
		data: payload
	});
}
async function logout() {
	return request("/api/accounts/logout/", { method: "POST" });
}
async function getProfile() {
	return request("/api/accounts/profile/", { method: "GET" });
}
async function getPayments() {
	return request("/api/payments/", { method: "GET" });
}
async function getCart() {
	return request("/api/cart/", { method: "GET" });
}
async function addCartItem(payload) {
	return request("/api/cart/", {
		method: "POST",
		data: payload
	});
}
async function updateCartItem(id, payload) {
	return request(`/api/cart/items/${id}/`, {
		method: "PATCH",
		data: payload
	});
}
async function deleteCartItem(id) {
	return request(`/api/cart/items/${id}/`, { method: "DELETE" });
}
async function clearCart() {
	return request("/api/cart/clear/", { method: "DELETE" });
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { updateCartItem as A, login as C, sendMessage as D, register as E, uploadProductImage as F, updateOrderStatus as M, updateProduct as N, updateAdminReview as O, updateProductStock as P, getProfile as S, markMessageRead as T, getMessages as _, createCategory as a, getProductById as b, deleteCartItem as c, deleteProduct as d, getAdminReviews as f, getCustomers as g, getCategories as h, cn as i, updateCategory as j, updateBusinessSettings as k, deleteCategory as l, getCart as m, checkout as n, createProduct as o, getBusinessSettings as p, clearCart as r, deleteAdminReview as s, addCartItem as t, deleteMessage as u, getOrders as v, logout as w, getProducts as x, getPayments as y };
