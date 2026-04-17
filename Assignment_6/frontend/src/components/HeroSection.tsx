import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full min-h-[90vh] bg-white flex flex-col justify-between overflow-visible">
      <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 lg:pt-12 flex-1 flex items-center">
        <div className="w-full relative min-h-[620px] sm:min-h-[700px] lg:min-h-[720px] flex items-center justify-center">
          <div className="relative z-20 text-left -mt-8 lg:-mt-12">
            <h1 className="font-display font-black leading-[1.02] tracking-[0.04em] text-trend-black text-[clamp(4.4rem,11.8vw,9.6rem)]">
              <span className="block mb-3 lg:mb-4">Express Yourself</span>
              <span className="inline-flex items-center gap-4 lg:gap-6">
                <span className="inline-block w-[82px] h-[10px] bg-[#E8400C] rounded-full" aria-hidden="true" />
                <span>Through Style<span className="text-[#E8400C]">.</span></span>
              </span>
            </h1>

            <p className="mt-8 lg:mt-10 text-base sm:text-lg text-[#2d2d2d] max-w-[32ch]">
              Shop the latest drops. Own your look.
            </p>

            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center bg-black text-white rounded-full px-8 py-3 text-sm sm:text-base font-semibold tracking-wide hover:bg-[#1b1b1b] transition-colors"
            >
              Shop Now
            </button>
          </div>

          <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-center overflow-visible pointer-events-none">
            <div className="relative h-[420px] sm:h-[520px] lg:h-[650px] w-full max-w-[660px]">
              <img
                src="/images/hero_1.png"
                alt="Off-White x Air Jordan 1 hanging sneaker"
                className="w-full h-full object-contain object-top -translate-y-10 sm:-translate-y-12 lg:-translate-y-16"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10 pb-3 -mt-10 sm:-mt-14 lg:-mt-20 relative z-40">
        <div className="w-full h-[150px] sm:h-[180px] lg:h-[220px] grid grid-cols-11 gap-3">
        {[...Array(11)].map((_, i) => (
          <div key={i} className="bg-[#F5C500] rounded-full relative flex items-center justify-center h-full w-full">
            {i === 8 && (
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" aria-hidden="true">
                  <path
                    d="M12 2.5L14.8 9.2L21.5 12L14.8 14.8L12 21.5L9.2 14.8L2.5 12L9.2 9.2L12 2.5Z"
                    fill="#E8400C"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};
