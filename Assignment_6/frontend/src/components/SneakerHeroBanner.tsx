import React from 'react';
import './SneakerHeroBanner.css';

interface SneakerHeroBannerProps {
  leftText?: string;
  centerText?: string;
  rightText?: string;
  sneakerImageUrl?: string;
  accentColor?: string;
  tileColor?: string;
  tileCount?: number;
}

const SneakerHeroBanner: React.FC<SneakerHeroBannerProps> = ({
  leftText = 'Express',
  centerText = 'Through',
  rightText = 'Self Style.',
  sneakerImageUrl = '/sneaker-hero.png',
  accentColor = '#E74C3C',
  tileColor = '#FFD700',
  tileCount = 11,
}) => {
  return (
    <section className="sneaker-hero-banner">
      {/* Top text layer - spanning across */}
      <div className="text-top-layer">
        <div className="text-left-top">{leftText}</div>
        <div className="spacer">-</div>
        <div className="text-center-top">{centerText}</div>
        <div className="text-right-top">{rightText}</div>
      </div>

      {/* Main sneaker display area */}
      <div className="sneaker-display-zone">
        <div className="sneaker-wrapper">
          <img
            src={sneakerImageUrl}
            alt="Premium Sneaker"
            className="sneaker-image"
          />
        </div>
      </div>

      {/* Accent line */}
      <div className="accent-line" style={{ backgroundColor: accentColor }}></div>

      {/* Rounded tile pattern at bottom */}
      <div className="tiles-container">
        {Array.from({ length: tileCount }).map((_, index) => (
          <div
            key={index}
            className="tile"
            style={{ backgroundColor: tileColor }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default SneakerHeroBanner;
