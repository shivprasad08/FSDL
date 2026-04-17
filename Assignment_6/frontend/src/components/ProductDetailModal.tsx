import React from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  imagePath: string;
  onClose: () => void;
}

const FALLBACK_SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'];

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, imagePath, onClose }) => {
  const sizes = product.availableSizes?.length ? product.availableSizes : FALLBACK_SIZES;

  return (
    <div className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="font-display text-3xl font-black text-trend-black">{product.name}</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-gray-300 text-lg font-bold hover:bg-gray-100"
            aria-label="Close product details"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[48%_52%] gap-0">
          <div className="bg-[#f3f3f3] min-h-[320px] md:min-h-[460px] flex items-center justify-center p-8">
            <img src={imagePath} alt={product.name} className="max-h-[340px] md:max-h-[420px] w-auto object-contain" />
          </div>

          <div className="p-6 md:p-8">
            <p className="text-gray-500 font-medium mb-1">{product.subtitle || '1 Colour'}</p>
            <p className="text-3xl font-display font-black text-trend-orange mb-6">
              ₹{Math.round(product.price ?? 0).toLocaleString('en-IN')}
            </p>

            <p className="text-sm uppercase tracking-wide font-semibold text-gray-700 mb-3">Available Sizes</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
              {sizes.map((size) => (
                <div
                  key={size}
                  className="border border-gray-300 rounded-lg text-center py-2 text-sm font-medium text-trend-black"
                >
                  {size}
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-gray-700 mb-6">
              <p>
                <span className="font-semibold text-trend-black">Category:</span> {product.category}
              </p>
              <p>
                <span className="font-semibold text-trend-black">Stock:</span> {product.stock}
              </p>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description || 'Premium Nike silhouette with comfort-driven cushioning and everyday streetwear appeal.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};