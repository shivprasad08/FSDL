import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Logo & Contact */}
          <div>
            <h3 className="font-display text-2xl font-black text-trend-black mb-4">Solēd</h3>
            <div className="space-y-1 text-sm text-gray-600 font-medium">
              <p>hello@quickikle@gmail.com</p>
              <p>0852 - 9241 - 0704</p>
            </div>
          </div>

          {/* Home Links - Centered */}
          <div className="text-center">
            <h4 className="font-bold text-trend-black mb-4 text-sm">Home</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 text-xs hover:text-trend-orange transition">
                  New & Featured
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-xs hover:text-trend-orange transition">
                  Men
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-xs hover:text-trend-orange transition">
                  Women
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-xs hover:text-trend-orange transition">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links - Right aligned */}
          <div className="text-right">
            <h4 className="font-bold text-trend-black mb-4 text-sm">Social</h4>
            <ul className="space-y-2 flex flex-col items-end">
              <li>
                <a href="#" className="text-gray-600 text-xs hover:text-trend-orange transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-xs hover:text-trend-orange transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-xs hover:text-trend-orange transition">
                  X
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-xs hover:text-trend-orange transition">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600 text-xs font-medium">@2026 all right reserved</p>
        </div>
      </div>
    </footer>
  );
};
