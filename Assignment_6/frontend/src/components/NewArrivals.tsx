import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { productService } from '../services/api';

export const NewArrivals: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const listImages = [
    '/images/list/list_1.png',
    '/images/list/list_2.png',
    '/images/list/list_3.png',
    '/images/list/list_4.png',
    '/images/list/list_5.png',
    '/images/list/list_6.png',
    '/images/list/list_7.png',
    '/images/list/list_8.png',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getNewArrivals();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
        setErrorMessage('Unable to load new arrivals right now.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const arrivalsToDisplay = products.slice(0, listImages.length).map((product, index) => ({
    product,
    imagePath: listImages[index] || product.imageUrl,
  }));

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="font-display text-5xl lg:text-6xl font-black text-trend-black text-center mb-16">
          Step into Style with New Arrivals!
        </h2>

        {/* 3x3 Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : errorMessage ? (
          <div className="text-center py-12 text-red-500">{errorMessage}</div>
        ) : arrivalsToDisplay.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No new arrivals available right now.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {arrivalsToDisplay.map(({ product, imagePath }, index) => (
              <button
                type="button"
                key={product._id || `arrival-product-${index + 1}`}
                className="text-center"
                onClick={() => {
                  navigate(`/product/${product._id}`, { state: { imagePath } });
                }}
              >
                {/* Product Image Circle */}
                <div className="w-48 h-48 md:w-56 md:h-56 bg-trend-light-gray rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm hover:shadow-md transition overflow-hidden">
                  <img
                    src={imagePath}
                    alt={product.name || `List shoe ${index + 1}`}
                    className="w-4/5 h-4/5 object-contain"
                  />
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-display text-lg font-black text-trend-black mb-1">
                    {product.name || `New Arrival ${index + 1}`}
                  </h3>
                  <p className="text-gray-400 text-xs mb-3 font-medium">{product.subtitle || 'Latest Drop'}</p>

                  {/* Price */}
                  <div className="flex justify-center items-baseline gap-1">
                    <span className="text-trend-orange font-display font-black text-2xl">₹{Math.floor(product.price ?? 0)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
