import React from 'react';

export const ElevateYourGame: React.FC = () => {
  return (
    <section className="relative py-8">
      {/* Purple Scalloped Banner */}
      <div 
        className="relative bg-trend-purple min-h-96 flex items-center overflow-hidden"
        style={{
          clipPath: `polygon(
            0 5%, 2% 3%, 4% 2%, 6% 2%, 8% 3%, 10% 5%, 12% 6%, 14% 5%, 16% 3%, 18% 2%,
            20% 2%, 22% 3%, 24% 5%, 26% 6%, 28% 5%, 30% 3%, 32% 2%, 34% 2%, 36% 3%, 38% 5%,
            40% 6%, 42% 5%, 44% 3%, 46% 2%, 48% 2%, 50% 3%, 52% 5%, 54% 6%, 56% 5%, 58% 3%,
            60% 2%, 62% 2%, 64% 3%, 66% 5%, 68% 6%, 70% 5%, 72% 3%, 74% 2%, 76% 2%, 78% 3%,
            80% 5%, 82% 6%, 84% 5%, 86% 3%, 88% 2%, 90% 2%, 92% 3%, 94% 5%, 96% 6%, 98% 5%, 100% 3%,
            100% 100%, 0 100%
          )`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Image */}
            <div className="relative h-80 lg:h-96 flex items-center justify-center">
              <img
                src="/images/nike_22.png"
                alt="Nike shoe"
                className="h-full w-full object-contain scale-140 lg:scale-[1.6] drop-shadow-2xl"
              />
            </div>

            {/* Right - Text Content */}
            <div className="text-white space-y-6 lg:justify-self-end lg:max-w-xl">
              <div>
                <h2 className="font-display text-5xl lg:text-6xl font-black leading-tight">
                  Elevate Your <span className="text-trend-yellow">Game</span>,
                </h2>
              </div>

              <div>
                <p className="font-display text-5xl lg:text-6xl font-black leading-tight">
                  Elevate Your <span className="text-cyan-300">Life</span>
                </p>
              </div>

              <div>
                <p className="font-display text-4xl lg:text-5xl font-black">
                  with Nike Product!
                </p>
              </div>

              {/* Subtitle */}
              <p className="text-gray-100 text-sm leading-relaxed max-w-sm font-medium">
                Explore the latest arrivals from Nike. Unleash your potential with top-quality sportswear,
                sneakers, and equipment. Elevate your game!
              </p>

              {/* Star Icon */}
              <div className="pt-4">
                <div className="w-16 h-16 bg-trend-orange rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl text-white">✦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
