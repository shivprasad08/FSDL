import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productService = {
  getAllProducts: () => api.get('/products'),
  getPopularProducts: () => api.get('/products/popular'),
  getNewArrivals: () => api.get('/products/new'),
  getProductById: (id: string) => api.get(`/products/${id}`),
};

export const authService = {
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

export const cartService = {
  addToCart: (productId: string, quantity: number, size: string) =>
    api.post('/cart', { productId, quantity, size }),
  getMyCart: () => api.get('/cart/me'),
  getCart: (userId: string) => api.get(`/cart/${userId}`),
  removeFromCart: (productId: string, size: string) =>
    api.delete('/cart', { data: { productId, size } }),
};

export const orderService = {
  createOrder: (payload?: { items?: { productId: string; quantity: number; size: string }[]; shippingAddress?: Record<string, string> }) =>
    api.post('/orders', payload || {}),
  getMyOrders: () => api.get('/orders/my-orders'),
  getOrderById: (id: string) => api.get(`/orders/${id}`),
};

export const wishlistService = {
  addToWishlist: (productId: string) =>
    api.post('/wishlist', { productId }),
  getWishlist: (userId: string) => api.get(`/wishlist/${userId}`),
  removeFromWishlist: (productId: string) =>
    api.delete('/wishlist', { data: { productId } }),
};

export default api;
