import React, { useEffect, useMemo, useState } from 'react';
import { cartService, orderService } from '../services/api';

type GuestCartItem = {
  productId: string;
  shoeName: string;
  imageUrl: string;
  size: string;
  quantity: number;
  unitPrice: number;
};

type ServerCartItem = {
  product: {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
  };
  size: string;
  quantity: number;
};

type StoredUser = {
  id: string;
  userCode?: string;
  name: string;
  email: string;
};

type UserOrder = {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: Array<{ quantity: number }>;
};

export const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [guestCartItems, setGuestCartItems] = useState<GuestCartItem[]>([]);
  const [serverCartItems, setServerCartItems] = useState<ServerCartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);

  const readGuestCart = () => {
    const raw = localStorage.getItem('guest_cart');
    const parsed = raw ? (JSON.parse(raw) as GuestCartItem[]) : [];
    setGuestCartItems(parsed);
  };

  const readStoredUser = () => {
    const raw = localStorage.getItem('user');
    if (!raw) {
      setCurrentUser(null);
      return;
    }

    try {
      setCurrentUser(JSON.parse(raw));
    } catch {
      setCurrentUser(null);
    }
  };

  const readServerCart = async () => {
    if (!localStorage.getItem('token')) {
      setServerCartItems([]);
      return;
    }

    try {
      const response = await cartService.getMyCart();
      setServerCartItems(response.data || []);
    } catch (error) {
      console.error('Error fetching server cart:', error);
      setServerCartItems([]);
    }
  };

  useEffect(() => {
    readGuestCart();
    readServerCart();
    readStoredUser();

    const onStorage = (event: StorageEvent) => {
      if (event.key === 'guest_cart') {
        readGuestCart();
      }
    };

    const onGuestCartUpdated = () => readGuestCart();
    const onCartUpdated = () => readServerCart();
    const onAuthChanged = () => {
      readStoredUser();
      readServerCart();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('guest-cart-updated', onGuestCartUpdated);
    window.addEventListener('cart-updated', onCartUpdated);
    window.addEventListener('auth-changed', onAuthChanged);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('guest-cart-updated', onGuestCartUpdated);
      window.removeEventListener('cart-updated', onCartUpdated);
      window.removeEventListener('auth-changed', onAuthChanged);
    };
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      readServerCart();
      readGuestCart();
    }
  }, [isCartOpen]);

  const usingServerCart = Boolean(localStorage.getItem('token'));

  const fetchMyOrders = async () => {
    if (!localStorage.getItem('token')) {
      setUserOrders([]);
      return;
    }

    try {
      setOrdersLoading(true);
      const response = await orderService.getMyOrders();
      setUserOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      setUserOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  const normalizedCartItems = useMemo(() => {
    if (usingServerCart) {
      return serverCartItems.map((item) => ({
        key: `${item.product._id}-${item.size}`,
        productId: item.product._id,
        shoeName: item.product.name,
        imageUrl: item.product.imageUrl,
        size: item.size,
        quantity: item.quantity,
        unitPrice: item.product.price,
      }));
    }

    return guestCartItems.map((item) => ({
      key: `${item.productId}-${item.size}`,
      ...item,
    }));
  }, [usingServerCart, serverCartItems, guestCartItems]);

  const cartCount = useMemo(
    () => normalizedCartItems.reduce((sum, item) => sum + item.quantity, 0),
    [normalizedCartItems]
  );

  const cartTotal = useMemo(
    () => normalizedCartItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    [normalizedCartItems]
  );

  const removeGuestCartItem = (productId: string, size: string) => {
    const next = guestCartItems.filter((item) => !(item.productId === productId && item.size === size));
    localStorage.setItem('guest_cart', JSON.stringify(next));
    setGuestCartItems(next);
  };

  const handleProfileToggle = async () => {
    const nextOpen = !isProfileOpen;
    setIsProfileOpen(nextOpen);

    if (nextOpen) {
      await fetchMyOrders();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setUserOrders([]);
    setServerCartItems([]);
    setIsProfileOpen(false);
    window.dispatchEvent(new Event('auth-changed'));
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-display text-4xl lg:text-5xl font-black text-trend-black tracking-tight">
              Solēd
            </h1>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-trend-black hover:text-trend-orange transition text-sm font-medium">
              New & Featured
            </a>
            <a href="#" className="text-trend-black hover:text-trend-orange transition text-sm font-medium">
              Men
            </a>
            <a href="#" className="text-trend-black hover:text-trend-orange transition text-sm font-medium">
              Women
            </a>
            <a href="#" className="text-trend-black hover:text-trend-orange transition text-sm font-medium">
              Sale
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-trend-black hover:text-trend-orange transition p-1"
              title="Search"
              type="button"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Wishlist Icon */}
            <button
              className="text-trend-black hover:text-trend-orange transition p-1"
              title="Wishlist"
              type="button"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen((prev) => !prev)}
              className="text-trend-black hover:text-trend-orange transition p-1"
              title="Cart"
              type="button"
            >
              <div className="relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-trend-orange text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            {currentUser && (
              <div className="relative">
                <button
                  type="button"
                  onClick={handleProfileToggle}
                  className="flex items-center gap-2"
                  title="Profile"
                >
                  <div className="w-8 h-8 rounded-full bg-trend-black text-white text-xs font-bold flex items-center justify-center">
                    {currentUser.name?.slice(0, 1).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline text-sm font-semibold text-trend-black max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-[320px] bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
                    <div className="mb-3">
                      <p className="text-sm font-bold text-trend-black">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                      {currentUser.userCode && <p className="text-xs text-gray-500">ID: {currentUser.userCode}</p>}
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-sm font-semibold text-trend-black mb-2">Previous Orders</p>
                      {ordersLoading ? (
                        <p className="text-xs text-gray-500">Loading orders...</p>
                      ) : userOrders.length === 0 ? (
                        <p className="text-xs text-gray-500">No previous orders found.</p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {userOrders.slice(0, 6).map((order) => (
                            <div key={order._id} className="border rounded-lg p-2">
                              <p className="text-xs font-semibold text-trend-black">Order #{order._id.slice(-6).toUpperCase()}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 0} items
                              </p>
                              <p className="text-xs text-gray-500">Status: {order.status}</p>
                              <p className="text-sm font-bold text-trend-orange">₹{Math.round(order.totalAmount || 0).toLocaleString('en-IN')}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-3 w-full border border-gray-300 rounded-lg py-2 text-sm font-semibold hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar (conditional) */}
        {isSearchOpen && (
          <div className="pb-4">
            <input
              type="text"
              placeholder="Search shoes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-trend-orange"
            />
          </div>
        )}

        {isCartOpen && (
          <div className="pb-4">
            <div className="border border-gray-200 rounded-xl p-4 max-h-[420px] overflow-y-auto bg-white shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-2xl font-black text-trend-black">Bag</h3>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="text-sm font-semibold text-gray-500 hover:text-trend-black"
                >
                  Close
                </button>
              </div>

              {normalizedCartItems.length === 0 ? (
                <p className="text-sm text-gray-500">Your bag is empty.</p>
              ) : (
                <div className="space-y-3">
                  {normalizedCartItems.map((item) => (
                    <div key={item.key} className="flex items-center gap-3 border rounded-lg p-2">
                      <img src={item.imageUrl} alt={item.shoeName} className="w-14 h-14 object-contain bg-[#f3f3f3] rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-trend-black truncate">{item.shoeName}</p>
                        <p className="text-xs text-gray-500">Size: {item.size}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-trend-orange">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                      {!usingServerCart && (
                        <button
                          type="button"
                          onClick={() => removeGuestCartItem(item.productId, item.size)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <div className="pt-2 border-t flex justify-between items-center">
                    <span className="text-sm font-semibold text-trend-black">Total</span>
                    <span className="text-lg font-black text-trend-orange">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
