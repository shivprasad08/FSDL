import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { authService, cartService, orderService, productService } from '../services/api';
import { Product } from '../types';

const DEFAULT_SIZES = ['US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'];
const DEFAULT_GALLERY = [
  '/images/nike_1.png',
  '/images/nike_2.png',
  '/images/nike_3.png',
  '/images/nike_4.png',
  '/images/list/list_1.png',
  '/images/list/list_2.png',
  '/images/list/list_3.png',
  '/images/list/list_4.png',
];

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { imagePath?: string } };

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthCard, setShowAuthCard] = useState(false);
  const [pendingAction, setPendingAction] = useState<'add' | 'order' | null>(null);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authSubmitting, setAuthSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response = await productService.getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const galleryImages = useMemo(() => {
    if (!product) {
      return [];
    }

    if (product.detailImages?.length) {
      return product.detailImages;
    }

    const primary = [location.state?.imagePath, product.imageUrl].filter(Boolean) as string[];
    const merged = [...primary, ...DEFAULT_GALLERY].filter((img, index, arr) => arr.indexOf(img) === index);
    return merged.length ? merged : ['/images/placeholder.png'];
  }, [product, location.state]);

  const sizes = product?.availableSizes?.length ? product.availableSizes : DEFAULT_SIZES;

  const promptAuthCard = (message: string, action: 'add' | 'order') => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-changed'));
    setPendingAction(action);
    setShowAuthCard(true);
    setActionMessage(message);
  };

  const ensureSizeSelected = () => {
    if (!selectedSize) {
      setActionMessage('Please select a size first.');
      return false;
    }

    setActionMessage('');
    return true;
  };

  const syncGuestCartToMongo = async () => {
    const guestCartRaw = localStorage.getItem('guest_cart');
    const guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : [];

    if (!Array.isArray(guestCart) || guestCart.length === 0) {
      return;
    }

    for (const item of guestCart) {
      await cartService.addToCart(item.productId, Number(item.quantity || 1), item.size);
    }

    localStorage.removeItem('guest_cart');
    window.dispatchEvent(new Event('guest-cart-updated'));
  };

  const handleAddToBag = async () => {
    if (!product || !ensureSizeSelected()) {
      return;
    }

    if (!localStorage.getItem('token')) {
      setPendingAction('add');
      setShowAuthCard(true);
      setActionMessage('Please login/signup to add this item to MongoDB cart.');
      return;
    }

    try {
      setIsSubmitting(true);
      await cartService.addToCart(product._id, 1, selectedSize as string);
      window.dispatchEvent(new Event('cart-updated'));
      setActionMessage('Added to bag successfully.');
    } catch (error: any) {
      console.error('Error adding to bag:', error);
      const status = error?.response?.status;
      const backendMessage = error?.response?.data?.message;

      if (status === 401 || status === 404 || backendMessage === 'User not found') {
        promptAuthCard('Session expired. Please login again to add items.', 'add');
      } else {
        setActionMessage('Could not add to bag. Try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!product || !ensureSizeSelected()) {
      return;
    }

    if (!localStorage.getItem('token')) {
      setPendingAction('order');
      setShowAuthCard(true);
      setActionMessage('Please login/signup to place order and store in MongoDB.');
      return;
    }

    try {
      setIsSubmitting(true);
      await orderService.createOrder({
        items: [
          {
            productId: product._id,
            quantity: 1,
            size: selectedSize as string,
          },
        ],
      });
      setActionMessage('Order placed and stored in MongoDB.');
    } catch (error: any) {
      console.error('Error placing order:', error);
      const status = error?.response?.status;
      const backendMessage = error?.response?.data?.message;

      if (status === 401 || status === 404 || backendMessage === 'User not found') {
        promptAuthCard('Session expired. Please login again to place order.', 'order');
      } else {
        setActionMessage('Could not place order. Try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!authForm.name || !authForm.email || !authForm.password) {
      setActionMessage('Please fill username, email and password.');
      return;
    }

    try {
      setAuthSubmitting(true);
      let response;

      try {
        response = await authService.register(authForm.name, authForm.email, authForm.password);
      } catch {
        response = await authService.login(authForm.email, authForm.password);
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('auth-changed'));

      await syncGuestCartToMongo();

      if (pendingAction === 'add' && product && selectedSize) {
        await cartService.addToCart(product._id, 1, selectedSize);
        setActionMessage('Logged in and added to bag. Stored in MongoDB.');
      }

      if (pendingAction === 'order' && product && selectedSize) {
        await orderService.createOrder({
          items: [{ productId: product._id, quantity: 1, size: selectedSize }],
        });
        setActionMessage('Logged in and order placed. Stored in MongoDB.');
      }

      window.dispatchEvent(new Event('cart-updated'));
      setShowAuthCard(false);
      setPendingAction(null);
    } catch (error) {
      console.error('Auth failed:', error);
      setActionMessage('Authentication failed. Please check email/password.');
    } finally {
      setAuthSubmitting(false);
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-lg font-semibold text-trend-black mb-4">Product not found.</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="bg-black text-white rounded-full px-6 py-3 font-semibold"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <section className="bg-[#f5f5f5] py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 text-sm font-semibold text-trend-black hover:text-trend-orange"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[56%_44%] gap-6 lg:gap-8">
          <div className="grid grid-cols-[64px_1fr] md:grid-cols-[72px_1fr] gap-4 md:gap-5">
            <div className="space-y-2">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 md:w-[72px] md:h-[72px] rounded-md overflow-hidden border ${
                    selectedImageIndex === index ? 'border-trend-black' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover bg-[#d9d9d9]" />
                </button>
              ))}
            </div>

            <div className="relative bg-[#c9c9c9] rounded-lg min-h-[420px] md:min-h-[640px] flex items-center justify-center p-8">
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium">
                ★ Highly Rated
              </span>
              <img
                src={galleryImages[selectedImageIndex] || '/images/placeholder.png'}
                alt={product.name}
                className="w-full h-full object-contain"
              />

              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  className="w-10 h-10 rounded-full bg-white text-xl"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full bg-white text-xl"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-trend-black mb-1">{product.name}</h1>
            <p className="text-2xl text-gray-600 mb-3">{product.category}&apos;s Shoes</p>
            <p className="text-3xl font-black text-trend-black mb-6">₹{Math.round(product.price).toLocaleString('en-IN')}</p>

            <p className="text-2xl font-bold text-trend-black mb-4">Select Size</p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border rounded-md text-lg ${
                    selectedSize === size ? 'border-trend-black bg-[#ececec]' : 'border-gray-300 bg-[#f0f0f0]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddToBag}
              disabled={isSubmitting}
              className="w-full bg-black text-white rounded-full py-4 text-2xl font-semibold mb-3 disabled:opacity-60"
            >
              Add to Bag
            </button>
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full border border-gray-400 rounded-full py-4 text-2xl font-semibold mb-4 disabled:opacity-60"
            >
              Place Order
            </button>

            {actionMessage && <p className="text-sm font-medium text-trend-orange mb-6">{actionMessage}</p>}

            <p className="text-xl leading-relaxed text-gray-800 mb-6">
              {product.description ||
                'Inspired by the original that debuted in 1985, this clean classic stays familiar yet always fresh.'}
            </p>

            <ul className="list-disc pl-6 text-xl text-gray-800 space-y-2 mb-8">
              <li>Colour Shown: {product.colours?.[0]?.name || 'Classic Tone'}</li>
              <li>Style: {product.styleCode || product._id?.slice(-8).toUpperCase() || 'N/A'}</li>
              <li>Country/Region of Origin: {product.originCountry || 'Indonesia'}</li>
            </ul>

            <div className="space-y-5 text-2xl text-trend-black">
              <div className="border-t border-gray-300 pt-4">Free Delivery and Returns</div>
              <div className="border-t border-gray-300 pt-4">
                Reviews ({product.reviewCount || 1071}) {'★'.repeat(Math.max(1, Math.round(product.rating || 5)))}
              </div>
              <div className="border-t border-gray-300 pt-4">More Info</div>
            </div>
          </div>
        </div>
      </div>

      {showAuthCard && (
        <div className="fixed inset-0 z-[120] bg-black/45 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
            <h3 className="font-display text-3xl font-black text-trend-black mb-4">Login / Sign Up</h3>
            <p className="text-sm text-gray-600 mb-4">Enter username, email and password to continue.</p>

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <input
                type="text"
                value={authForm.name}
                onChange={(e) => setAuthForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Username"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => setAuthForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="password"
                value={authForm.password}
                onChange={(e) => setAuthForm((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAuthCard(false)}
                  className="flex-1 border border-gray-300 rounded-lg py-2 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="flex-1 bg-black text-white rounded-lg py-2 font-semibold disabled:opacity-60"
                >
                  {authSubmitting ? 'Please wait...' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
