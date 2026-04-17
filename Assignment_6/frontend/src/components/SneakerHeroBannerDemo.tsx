import React from 'react';
import SneakerHeroBanner from './SneakerHeroBanner';

export const SneakerHeroBannerDemo: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Sneaker Hero Banner Component</h2>

      {/* Default YR banner */}
      <div style={{ marginBottom: '40px' }}>
        <h3>YR Brand Banner</h3>
        <SneakerHeroBanner
          brandLetters="YR"
          sneakerImageUrl="/api/placeholder/sneaker.png"
          showAccentDots={true}
        />
      </div>

      {/* Alternative NX banner */}
      <div style={{ marginBottom: '40px' }}>
        <h3>NX Brand Banner</h3>
        <SneakerHeroBanner
          brandLetters="NX"
          sneakerImageUrl="/api/placeholder/sneaker.png"
          showAccentDots={true}
        />
      </div>

      {/* Usage Guide */}
      <div style={{ marginTop: '60px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Component Props</h3>
        <pre>{`
<SneakerHeroBanner
  brandLetters="YR"              // 2-3 letter acronym
  sneakerImageUrl="/sneaker.png" // Path to cutout sneaker image
  showAccentDots={true}          // Show floating accent dots
/>
        `}</pre>

        <h3>Image Preparation</h3>
        <ul>
          <li>Use a transparent PNG for the sneaker image</li>
          <li>Remove all black background (should be transparent)</li>
          <li>Recommended size: 800×800px or larger</li>
          <li>Image will be centered and scaled proportionally</li>
        </ul>

        <h3>Features</h3>
        <ul>
          <li>✓ Split diagonal background (dark olive / warm cream)</li>
          <li>✓ Massive typographic letters (420px)</li>
          <li>✓ Sneaker image floats above letters with z-index layering</li>
          <li>✓ Text split left/right below letters</li>
          <li>✓ Floating accent dots (red/orange)</li>
          <li>✓ Responsive design (works on mobile)</li>
          <li>✓ Clean editorial streetwear aesthetic</li>
          <li>✓ No drop shadows - minimalist design</li>
        </ul>

        <h3>Customization</h3>
        <p>Edit <code>SneakerHeroBanner.css</code> to adjust:</p>
        <ul>
          <li>Letter size: Change <code>font-size: 420px</code></li>
          <li>Colors: Edit color values (#3d3d3d, #f5ede3, #d41e3a)</li>
          <li>Text styling: Modify font-size, font-weight, color in .text-left/.text-right</li>
          <li>Sneaker size: Change <code>width/height</code> in .sneaker-wrapper (currently 520px)</li>
        </ul>
      </div>
    </div>
  );
};

export default SneakerHeroBannerDemo;
