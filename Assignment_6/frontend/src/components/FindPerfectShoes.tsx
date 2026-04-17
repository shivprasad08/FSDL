import React from 'react';

export const FindPerfectShoes: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Section - Text */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-5xl lg:text-6xl font-black text-trend-black mb-2">
              Find the Perfect Shoes <span className="text-orange">&mdash;</span>
            </h2>
            <div className="flex items-baseline gap-3 mb-8">
              <h3 className="font-display text-5xl lg:text-6xl font-black text-trend-black">Essentials.</h3>
              <span className="font-display text-6xl lg:text-7xl font-black text-trend-yellow">98%</span>
            </div>

            {/* Body Text */}
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
              Discover our curated selection of essential shoes designed for comfort, style, and performance.
              Each pair in our collection has been carefully selected to meet the highest standards of quality
              and craftsmanship. Whether you're looking for everyday wear or something special, we have the
              perfect shoes for you.
            </p>

            {/* Icon Pills */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-trend-black text-white flex items-center justify-center font-bold text-lg">
                  ⊕
                </div>
                <div>
                  <p className="font-bold text-trend-black text-sm">Care Instructions</p>
                  <p className="text-gray-500 text-xs">Machine wash at 30°</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-trend-black text-white flex items-center justify-center font-bold text-lg">
                  ⊕
                </div>
                <div>
                  <p className="font-bold text-trend-black text-sm">Fabric Material</p>
                  <p className="text-gray-500 text-xs">84% Cotton, 16% Polyester</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Image with Orange Blob */}
          <div className="lg:col-span-1 relative h-[30rem] lg:h-[40rem]">
            {/* Orange Blob Background - Organic shape */}
            <div className="absolute inset-0 bg-trend-orange rounded-full opacity-90 blur-lg" style={{
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              transform: 'rotate(45deg)',
            }}></div>

            {/* Inner white cutout effect */}
            <div className="absolute inset-4 rounded-full bg-white opacity-0"></div>

            {/* Image */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <img
                src="/images/nike_11.png"
                alt="Nike shoe"
                className="h-full w-full object-contain scale-[1.5] lg:scale-[1.8] drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
