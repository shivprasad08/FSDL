# Sneaker Hero Banner Component Guide

## Overview
A premium streetwear hero banner component featuring:
- **1500×600px** landscape format with white background
- **Split diagonal background**: Dark charcoal/olive (left) + Warm cream (right)
- **Massive typographic letters** ("YR", "NX", etc.) ~70% of banner height
- **Floating sneaker image** (~80-90% height) layered above letters
- **Editorial text layout** with split left/right positioning
- **Floating accent dots** for visual interest
- **Responsive design** for all screen sizes

## Quick Setup

### 1. Import the Component
```tsx
import SneakerHeroBanner from '@/components/SneakerHeroBanner';

function App() {
  return (
    <SneakerHeroBanner
      brandLetters="YR"
      sneakerImageUrl="/images/sneaker.png"
      showAccentDots={true}
    />
  );
}
```

### 2. Prepare Your Sneaker Image

You'll need a **transparent PNG** image of the sneaker cutout. Follow these steps:

#### Using an existing image (e.g., Off-White Air Jordan 1):
1. Find a high-quality product photo of the shoe
2. Use an image editor (Photoshop, GIMP, Figma, or online tool like **Remove.bg**):
   - Remove the black background
   - Export as PNG with transparency
   - Crop to the shoe bounds with ~20px padding
3. Optimize: Resize to ~800×800px or larger (for sharpness)
4. Save to `/frontend/public/images/sneaker.png`

#### Quick online tools:
- **Remove.bg** (https://remove.bg) - AI background removal
- **Photoshop**: File → Export As → PNG with transparency
- **Figma**: Use selection tool + transparent background
- **GIMP**: Layer → Transparency → Remove Color

#### Expected result:
- File: `sneaker.png` (transparent background)
- Size: 800×800px minimum
- Format: PNG (not JPG)
- No background color visible

### 3. Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brandLetters` | string | `"YR"` | 2-3 letter brand acronym |
| `sneakerImageUrl` | string | `"/sneaker-hero.png"` | Path to transparent shoe PNG |
| `showAccentDots` | boolean | `true` | Show floating red/orange dots |

## Design Details

### Colors
```css
Dark Background (Left):  #3d3d3d (charcoal/olive)
Light Background (Right): #f5ede3 (warm cream/beige)
Accent Dots:            #d41e3a (red/orange)
Text:                   #3d3d3d (left), #f5ede3 (right)
```

### Typography
```css
Brand Letters:   420px, font-weight: 900, letter-spacing: -10px
Body Text:       20px, font-weight: 600, sans-serif
```

### Layering (z-index)
```
Accent Dots:        z-index: 10
Sneaker Image:      z-index: 5  ← Sits on top of letters
Letters:            z-index: 2
Backgrounds:        z-index: 1
```

### Size Specifications
- **Banner**: 1500×600px (responsive down to 320px)
- **Letters**: 420px height (70% of 600px)
- **Sneaker**: 520px × 520px (~87% of 600px)
- **Sneaker breaks edges**: ~260px on each side

## Customization

### Change Letter Size
Edit `SneakerHeroBanner.css`:
```css
.letter {
  font-size: 420px; /* Change this value */
}
```

### Change Colors
```css
.letter-left {
  color: #3d3d3d; /* Letter color left side */
}

.letter-right {
  color: #f5ede3; /* Letter color right side */
}

.letters-container::before {
  background-color: #3d3d3d; /* Background left */
}

.letters-container::after {
  background-color: #f5ede3; /* Background right */
}

.dot {
  background-color: #d41e3a; /* Accent dots */
}
```

### Adjust Sneaker Size
```css
.sneaker-wrapper {
  width: 520px;   /* Change width */
  height: 520px;  /* Change height */
}
```

### Modify Text
Component text is hardcoded in React. To make it dynamic, modify `SneakerHeroBanner.tsx`:

```tsx
interface SneakerHeroBannerProps {
  // ... existing props
  leftText?: string;
  rightText?: string;
}

// Then use:
<p>{leftText || 'Express Yourself Through'}</p>
<p>{rightText || 'Style.'}</p>
```

## Technical Features

✅ **Z-index Layering**: Sneaker sits above letters via `z-index: 5`
✅ **Overflow Hidden**: Container naturally clips shoe bleed-out
✅ **Mix-blend-mode**: Applied to sneaker image for blending effects
✅ **No Drop Shadows**: Clean, editorial aesthetic
✅ **Responsive**: Breakpoints at 1024px, 768px
✅ **Performance**: CSS-only animations (floating dots)
✅ **Accessibility**: Semantic HTML, alt text on image

## Troubleshooting

### Sneaker image has black background
**Solution**: Ensure PNG is saved with transparent background, not white/black.
- Use Remove.bg or manual editing
- Export from Photoshop: PNG-24 with transparency
- Check: Image should show checkerboard in Photoshop/Figma

### Text not visible
**Solution**: Check color contrast. Adjust text colors in CSS:
```css
.text-left p { color: #3d3d3d; }  /* Dark on light */
.text-right p { color: #f5ede3; } /* Light on dark */
```

### Sneaker too small/large
**Solution**: Adjust `.sneaker-wrapper` dimensions:
```css
.sneaker-wrapper {
  width: 520px;   /* Increase for larger */
  height: 520px;  /* Keep 1:1 ratio */
}
```

### Banner looks pixelated on large screens
**Solution**: Use higher-resolution sneaker image (1200×1200px+)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid & Flexbox supported
- Responsive design tested on all viewports

## Files Created
- `SneakerHeroBanner.tsx` - Main component
- `SneakerHeroBanner.css` - Styling & layout
- `SneakerHeroBannerDemo.tsx` - Usage examples & guide

## Next Steps
1. Prepare your sneaker cutout image (PNG with transparency)
2. Place image in `/frontend/public/images/`
3. Import component in your page/layout
4. Adjust colors/sizing as needed
5. Deploy!

---

**Need help?** Check the demo component (`SneakerHeroBannerDemo.tsx`) for implementation examples.
