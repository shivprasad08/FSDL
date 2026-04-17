import React from 'react';

export const JustDoIt: React.FC = () => {
  return (
    <section className="relative py-8">
      {/* Yellow Scalloped Banner */}
      <div 
        className="relative bg-trend-yellow min-h-96 flex items-center overflow-hidden"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            {/* Left Side - Just Do It Text */}
            <div className="flex items-center justify-center relative">
              <h2 className="font-display text-7xl lg:text-9xl font-black text-trend-black text-center" 
                  style={{
                    WebkitTextStroke: '2px rgba(0,0,0,0.1)',
                    textShadow: '0 0 0 2px rgba(0,0,0,0.05)',
                    letterSpacing: '-0.02em',
                    lineHeight: '0.9',
                  }}>
                JUST<br />DO<br />IT!
              </h2>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-96 flex items-center justify-end">
              <img
                src="/images/end_1.png"
                alt="End Section Image"
                className="h-full w-auto object-contain drop-shadow-xl"
                style={{ transform: 'rotate(-20deg) scale(1.4)' }}
              />

              {/* Star Icon Circle - Bottom Right */}
              <div className="absolute bottom-8 right-8 w-16 h-16 bg-trend-orange rounded-full flex items-center justify-center shadow-lg z-20">
                <span className="text-3xl text-white">✦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
