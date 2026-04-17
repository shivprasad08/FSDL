import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { productService } from '../services/api';

export const PopularProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const nikeImages = [
    '/images/nike_1.png',
    '/images/nike_2.png',
    '/images/nike_3.png',
    '/images/nike_4.png',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getPopularProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching popular products:', error);
        setErrorMessage('Unable to load popular products right now.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const productsToDisplay = products.slice(0, nikeImages.length).map((product, index) => ({
    product,
    imagePath: nikeImages[index] || product.imageUrl,
  }));

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-display text-4xl lg:text-5xl font-black text-trend-black">Popular Product</h2>
        </div>

        {/* Left-aligned 4-item product row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-start">
          {loading ? (
            <div className="col-span-full text-center py-12">Loading...</div>
          ) : errorMessage ? (
            <div className="col-span-full text-center py-12 text-red-500">{errorMessage}</div>
          ) : productsToDisplay.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No popular products available right now.</div>
          ) : (
            productsToDisplay.map(({ product, imagePath }, index) => (
              <button
                type="button"
                key={product._id || `nike-product-${index + 1}`}
                className="flex-shrink-0 w-64 text-left"
                onClick={() => {
                  navigate(`/product/${product._id}`, { state: { imagePath } });
                }}
              >
                {/* Product Image Circle */}
                <div className="w-64 h-64 bg-trend-light-gray rounded-full flex items-center justify-center mb-4 shadow-sm hover:shadow-md transition overflow-hidden">
                  <img
                    src={imagePath}
                    alt={product.name || `Nike shoe ${index + 1}`}
                    className="w-4/5 h-4/5 object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <h3 className="font-display text-lg font-black text-trend-black mb-1">
                    {product.name || `Nike Product ${index + 1}`}
                  </h3>
                  <p className="text-gray-400 text-xs mb-3 font-medium">{product.subtitle || 'Latest Collection'}</p>

                  {/* Price */}
                  <div className="flex justify-center items-baseline gap-1">
                    <span className="text-trend-orange font-display font-black text-2xl">₹{Math.floor(product.price ?? 0)}</span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
