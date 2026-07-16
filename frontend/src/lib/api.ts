import axios, { type AxiosRequestConfig, type AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
    (config.headers as Record<string, string>)[key] = value;
  });
  return config;
});

let isRefreshing = false;
client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config;
    if (!original || !original.url) return Promise.reject(error);
    if (error.response?.status !== 401) return Promise.reject(error);
    if (original.url.includes("/login") || original.url.includes("/register"))
      return Promise.reject(error);
    if (isRefreshing) return Promise.reject(error);
    isRefreshing = true;
    try {
      const refresh = localStorage.getItem("bonchezz-refresh");
      if (!refresh) throw new Error("no refresh");
      const res = await axios.post(`${API_BASE_URL}/api/accounts/token/refresh/`, { refresh });
      const access = res.data.access;
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
  },
);

async function request<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
  const requestConfig = {
    url: path,
    ...config,
  };

  if (requestConfig.data instanceof FormData) {
    requestConfig.headers = {
      ...requestConfig.headers,
      "Content-Type": undefined,
    };
  }

  const response = await client.request<T>(requestConfig);
  return response.data;
}

export type Category = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  is_active: boolean;
};

export type Product = {
  id: number | string;
  name: string;
  description: string;
  price: string | number;
  discount_price?: string | number;
  stock_quantity?: number;
  category?: number | string;
  category_name?: string;
  rating?: string | number;
  availability?: boolean;
  featured?: boolean;
  images?: Array<{ id: number; image: string }>;
  image?: string;
  reviews?: number;
  colors?: string[];
  inStock?: boolean;
};

export type Order = {
  id: number;
  order_number: string;
  status: string;
  customer_name: string;
  phone: string;
  pickup_location: string;
  order_date: string;
  total_amount: string;
  payment_method: string;
  payment_status: string;
  delivery_status: string;
  items?: Array<{
    id: number;
    product: number | string;
    product_name: string;
    quantity: number;
    price: string | number;
  }>;
};

export type Customer = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  registered_at: string;
  orders_count: number;
};

export type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
};

export type BusinessSettings = {
  business_name: string;
  logo_url?: string;
  phone: string;
  email: string;
  description: string;
  pickup_location: string;
  instagram: string;
  tiktok: string;
  whatsapp: string;
};

export type Payment = {
  id: number;
  order: number;
  user: number;
  payment_method: string;
  status: string;
  amount: string;
  created_at: string;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type UserProfile = {
  id: number;
  full_name: string;
  student_email: string;
  phone_number: string;
  is_active: boolean;
  date_joined: string;
  is_staff?: boolean;
  is_superuser?: boolean;
};

const buildSearchParams = (params?: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);
  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export async function getCategories() {
  return request<Category[]>("/api/categories/");
}

export async function createCategory(payload: FormData | Record<string, unknown>) {
  return request<Category>("/api/categories/", {
    method: "POST",
    data: payload,
  });
}

export async function updateCategory(
  id: number | string,
  payload: FormData | Record<string, unknown>,
) {
  return request<Category>(`/api/categories/${id}/`, {
    method: "PUT",
    data: payload,
  });
}

export async function deleteCategory(id: number | string) {
  return request<void>(`/api/categories/${id}/`, {
    method: "DELETE",
  });
}

export async function getProducts(params?: Record<string, string>) {
  return request<{
    results: Product[];
    count: number;
    next: string | null;
    previous: string | null;
  }>(`/api/products/${buildSearchParams(params)}`, { method: "GET" });
}

export async function getProductById(id: string) {
  return request<Product>(`/api/products/${id}/`, { method: "GET" });
}

export async function createProduct(payload: FormData | Record<string, unknown>) {
  return request<Product>("/api/products/", {
    method: "POST",
    data: payload,
  });
}

export async function updateProduct(
  id: number | string,
  payload: FormData | Record<string, unknown>,
) {
  return request<Product>(`/api/products/${id}/`, {
    method: "PATCH",
    data: payload,
  });
}

export async function updateProductStock(id: number | string, stock_quantity: number) {
  return request<Product>(`/api/products/${id}/`, {
    method: "PATCH",
    data: { stock_quantity },
  });
}

export async function deleteProduct(id: number | string) {
  return request<void>(`/api/products/${id}/`, {
    method: "DELETE",
  });
}

export async function uploadProductImage(productId: number | string, files: FileList | File[]) {
  const form = new FormData();
  Array.from(files).forEach((file) => form.append("images", file));
  return request<{ detail: string }>(`/api/products/${productId}/upload-images/`, {
    method: "POST",
    data: form,
  });
}

export async function getOrders() {
  return request<Order[]>("/api/orders/", { method: "GET" });
}

export async function getOrderById(id: number | string) {
  return request<Order>(`/api/orders/${id}/`, { method: "GET" });
}

export async function updateOrderStatus(id: number | string, status: string) {
  return request<Order>(`/api/orders/${id}/`, {
    method: "PATCH",
    data: { status },
  });
}

export async function checkout(payload: { pickup_location: string; payment_method: string }) {
  return request<Order>("/api/orders/checkout/", {
    method: "POST",
    data: payload,
  });
}

export async function getCustomers() {
  return request<Customer[]>("/api/customers/", { method: "GET" });
}

export async function getMessages() {
  return request<Message[]>("/api/messages/", { method: "GET" });
}

export async function sendMessage(payload: { name: string; email: string; message: string }) {
  const response = await fetch("https://formspree.io/f/mykrypdr", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      _replyto: payload.email,
      _subject: `New message from ${payload.name}`,
      message: payload.message,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Formspree failed: ${response.status} ${text}`);
  }

  return response.json();
}

export async function markMessageRead(id: number | string) {
  return request<Message>(`/api/messages/${id}/`, {
    method: "PATCH",
    data: { is_read: true },
  });
}

export async function deleteMessage(id: number | string) {
  return request<void>(`/api/messages/${id}/`, {
    method: "DELETE",
  });
}

export type Review = {
  id: number;
  user: number;
  user_name: string;
  product: number;
  product_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export async function getAdminReviews() {
  return request<Review[]>("/api/reviews/admin/", { method: "GET" });
}

export async function updateAdminReview(
  id: number | string,
  payload: { rating?: number; comment?: string },
) {
  return request<Review>(`/api/reviews/admin/${id}/`, {
    method: "PATCH",
    data: payload,
  });
}

export async function deleteAdminReview(id: number | string) {
  return request<void>(`/api/reviews/admin/${id}/`, {
    method: "DELETE",
  });
}

export async function getBusinessSettings() {
  return request<BusinessSettings>("/api/settings/", { method: "GET" });
}

export async function updateBusinessSettings(payload: Partial<BusinessSettings>) {
  return request<BusinessSettings>("/api/settings/", {
    method: "PATCH",
    data: payload,
  });
}

export async function login(email: string, password: string) {
  return request<AuthTokens>("/api/accounts/login/", {
    method: "POST",
    data: { student_email: email, password },
  });
}

export async function register(payload: {
  full_name: string;
  student_email: string;
  phone_number: string;
  password: string;
}) {
  return request<UserProfile>("/api/accounts/register/", {
    method: "POST",
    data: payload,
  });
}

export async function logout() {
  return request<void>("/api/accounts/logout/", { method: "POST" });
}

export async function getProfile() {
  return request<UserProfile>("/api/accounts/profile/", { method: "GET" });
}

export async function createPayment(payload: { order: number | string; payment_method?: string }) {
  return request<{
    id: number;
    order: number;
    user: number;
    payment_method: string;
    status: string;
    amount: string;
    created_at: string;
  }>("/api/payments/create/", {
    method: "POST",
    data: payload,
  });
}

export async function getPayments() {
  return request<{
    results: Payment[];
    count: number;
    next: string | null;
    previous: string | null;
  }>("/api/payments/", { method: "GET" });
}

export async function getCart() {
  return request<{
    id: number;
    items: Array<{ id: number; product: Product; quantity: number }>;
    created_at: string;
  }>("/api/cart/", { method: "GET" });
}

export async function addCartItem(payload: { product_id: number | string; quantity?: number }) {
  return request<{
    id: number;
    items: Array<{ id: number; product: Product; quantity: number }>;
    created_at: string;
  }>("/api/cart/", {
    method: "POST",
    data: payload,
  });
}

export async function updateCartItem(id: number | string, payload: { quantity: number }) {
  return request<{ id: number; product: Product; quantity: number }>(`/api/cart/items/${id}/`, {
    method: "PATCH",
    data: payload,
  });
}

export async function deleteCartItem(id: number | string) {
  return request<void>(`/api/cart/items/${id}/`, {
    method: "DELETE",
  });
}

export async function clearCart() {
  return request<void>("/api/cart/clear/", {
    method: "DELETE",
  });
}
