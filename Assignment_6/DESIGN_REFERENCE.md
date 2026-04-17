# Solēd Design Implementation Guide

This guide shows exactly how your website should look based on the screenshots provided.

## 1. Navbar (Top Fixed Bar)
- **Logo**: "TrendTrunk." in bold serif font on the left
- **Navigation**: Center links (New & Featured, Men, Women, Sale)
- **Right Icons**: Search 🔍, Wishlist 🤍, Cart 🛒
- **Style**: White background with thin gray bottom border
- **Behavior**: Sticky on scroll

---

## 2. Hero Section (Full Width)

### Text Layout
```
Express — Yourself
Through
Style.
```
- **"Express"**: Bold black text
- **"—" (dash)**: ORANGE color (#E8500A)
- **"Yourself"**: Bold black text
- **"Style"**: Bold black text
- **"." (period)**: ORANGE color (#E8500A)
- **Font**: Barlow Condensed / Bebas Neue, ~120px
- **Lorem ipsum text**: Gray paragraph between "Through" and "Style"

### Background
- **Top half**: White background
- **Bottom half**: YELLOW background (#F5C518)

### Elements
- **Floating Shoe**: Yellow Nike shoe image, centered, floating over yellow grid
- **Grid**: Decorative circle shapes in rows behind the shoe
- **Star Circle**: White circle with 4-pointed orange star (✦) in bottom-right corner

---

## 3. Popular Product Section

### Title
- **Text**: "Popular Product"
- **Style**: Bold, large, left-aligned
- **Right**: Left/Right arrow buttons (← →)

### Product Cards (Horizontal Scrollable)
Each card contains:
- **Circular Background**: Light gray (#F5F5F5), ~250-280px diameter
- **Product Image**: Centered inside circle, PNG with transparency
- **Product Name**: Bold (e.g., "Nike Dunk Low")
- **Subtitle**: Gray text, smaller (e.g., "1 Colour")
- **Price**: Orange text, large **bold number** with smaller **.95** (e.g., £109.95)

### Products in Order
1. Nike Dunk Low - 1 Colour - £109.95
2. Air Jordan 1 Low - 1 Colour - £69.95
3. Nike Air Max Plus 3 - 1 Colour - £184.95
4. Nike SB Dunk - 2 Colours - (partially visible)

---

## 4. Find the Perfect Shoes Section

### Left Side (60% width)
- **Large Black Text**: "Find the Perfect Shoes —"
- **Next Line**: "Essentials." (black) + "98%" (YELLOW text, huge)
- **Body Text**: Gray paragraph about essential shoes
- **Icon Pills** (circular with ⊕ icon):
  1. Care Instructions - Machine wash at 30
  2. Fabric Material - 84% Cotton, 16% Polyester

### Right Side (40% width)
- **Background**: ORANGE (#E8500A) blob/oval shape (organic, irregular)
- **Image**: Man holding vintage camera, cutout style
- **Effect**: Image appears to be on top of orange blob

---

## 5. Elevate Your Game Section

### Background
- **Shape**: PURPLE (#5B4BEB) with scalloped/cloud edge border
- **Scallops**: Wavy curved edges at top and bottom

### Left Side
- **Image**: Man in camo/denim jacket, viewed from behind/side
- **Style**: Cutout with white outline effect

### Right Side (Text)
- **Line 1**: "Elevate Your Game," — "Game" in YELLOW (#F5C518)
- **Line 2**: "Elevate Your Life" — "Life" in CYAN (#00D9FF)
- **Line 3**: "with Nike Product!" — White text
- **Subtitle**: Small gray text with product description

### Bottom Right
- **Element**: Orange circle with white 4-pointed star inside
- **Size**: ~60-70px diameter

---

## 6. New Arrivals Grid Section

### Title
- **Text**: "Step into Style with New Arrivals!"
- **Style**: Bold, large, centered

### Grid Layout
- **Structure**: 3 columns × 3 rows = 9 products
- **Responsive**: 1 column on mobile, 2 on tablet, 3 on desktop

### Product Cards (Same as Popular Products)
Each card has:
- Circular light gray background
- Centered shoe image
- Product name (bold)
- Colour count (gray)
- Orange price (e.g., £64.95, £109.95, £89.95, etc.)

### Products
Row 1: Jordan 1 Mid Kids (£64.95), Nike Dunk Low Retro (£109.95), Jordan 1 Mid SE Kids (£64.95)
Row 2: Nike Air Max 1 SC (£89.95), Nike Air Max (£139.95), Nike InfinityRN 4 (£109.95)
Row 3: Sabrina 1 'Ionic' (£119.95), Nike Dunk Low (£109.95), Nike Metcon 9 AMP (£139.95)

---

## 7. Just Do It Banner Section

### Background
- **Color**: YELLOW (#F5C518)
- **Border**: Scalloped/cloud edge at top and bottom
- **Style**: Wavy, organic curved edges

### Left Side
- **Text**: "JUST DO IT!" in HUGE black letters
- **Style**: Bold, outlined/stroked effect, massive size
- **Effect**: Text appears behind the image

### Right Side
- **Image**: Person from behind wearing white Nike tee with cap
- **Style**: Full body cutout image

### Bottom Right Corner
- **Element**: Orange circle with white 4-pointed star
- **Size**: ~60-70px diameter

---

## 8. Footer

### Layout
- **5 Columns**: Logo & Contact | Home | Company | Social | Support

### Column 1: Logo & Contact
- **Logo**: "TrendTrunk."
- **Email**: hello@quickikle@gmail.com
- **Phone**: 0852 - 9241 - 0704

### Column 2: Home
- New & Featured
- Men
- Women
- Sale

### Column 3: Company
- About Us
- Community
- Reviews
- FAQ's

### Column 4: Social
- Instagram
- Facebook
- X
- LinkedIn

### Column 5: Support
- Privacy Policy
- Term & Condition
- Help Center

### Bottom
- **Copyright**: ©2023 FootwearFinds
- **Style**: Centered, small gray text
- **Divider**: Gray line above copyright

---

## Color Reference

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary Black | Black | #0D0D0D |
| Accent Yellow | Gold | #F5C518 |
| Accent Orange | Orange | #E8500A |
| White | White | #FFFFFF |
| Secondary Purple | Purple | #5B4BEB |
| Light Gray | Gray | #F5F5F5 |
| Text Gray | Gray | #999999 |
| Cyan Accent | Cyan | #00D9FF |

---

## Typography

### Display Font (Headlines)
- **Font**: Barlow Condensed, Bebas Neue
- **Sizes**: 
  - Hero: ~120px
  - Section titles: 48-64px
  - Product names: 18-24px

### Body Font
- **Font**: Inter, Helvetica, Arial, sans-serif
- **Sizes**:
  - Body text: 14-16px
  - Small text (metadata): 12px
  - Tiny text (footer): 11-12px

---

## Image Requirements

### Circular Product Image Containers
- **Size**: 250-300px diameter
- **Background**: Light gray (#F5F5F5)
- **Image inside**: Centered, PNG with transparent background preferred
- **Scale**: Shoe image takes up ~70-85% of circle

### Section Images
- **Hero Shoe**: 400-500px width, centered
- **Hero Grid**: Decorative circles behind shoe
- **Man with Camera**: 300-400px width, positioned right
- **Man in Camo**: 300-400px width, positioned left
- **Person Nike Tee**: 300-400px width, positioned right

### Image Optimization
- **Format**: PNG (for transparency) or optimized JPG
- **Quality**: High quality, no compression artifacts
- **Dimensions**: Proportional, maintain aspect ratio
- **Transparency**: Use PNG for product images and cutouts

---

## Interactive Elements

### Scrollable Products
- **Behavior**: Horizontal scroll
- **Controls**: Left (←) and Right (→) buttons at top-right
- **Smooth**: Smooth scroll animation on click

### Hover States
- **Product Cards**: Subtle shadow increase
- **Links**: Change color to orange (#E8500A)
- **Buttons**: Background color change

### Responsive Breakpoints
- **Mobile**: Single column, full width
- **Tablet (768px)**: 2 columns
- **Desktop (1024px)**: 3 columns, full width features

---

## Special Effects

### Scalloped Borders
- **Used in**: Elevate Your Game, Just Do It sections
- **Implementation**: CSS clip-path
- **Wave pattern**: Smooth, organic curves
- **Top & Bottom**: Both edges have scallops

### Blob Background
- **Used in**: Find Perfect Shoes section
- **Color**: Orange (#E8500A)
- **Shape**: Irregular, organic oval
- **Effect**: Image positioned on top

### Pricing Format
- **Display**: £[LARGE BOLD NUMBER].small-decimal
- **Example**: £109.95 where 95 is in smaller superscript
- **Color**: All orange (#E8500A)

---

## CSS Classes & Utilities

Key Tailwind classes being used:
- `font-display` - Display typography
- `text-trend-black` - Primary black
- `text-trend-orange` - Accent orange
- `text-trend-yellow` - Accent yellow
- `text-trend-purple` - Secondary purple
- `bg-trend-light-gray` - Light gray background
- `rounded-full` - Circular elements
- `scalloped-border` - Wavy edges

---

## Summary Checklist

✅ Navbar - Fixed, white, with icons
✅ Hero - Large text, orange orange accents, yellow grid background
✅ Popular Products - Scrollable carousel with circular product cards
✅ Find Perfect Shoes - Split layout with orange blob
✅ Elevate Your Game - Purple scalloped banner with colored text
✅ New Arrivals - 3×3 grid of products
✅ Just Do It - Yellow scalloped banner with large text
✅ Footer - Multi-column with links

All components are now styled to match the design screenshots exactly!
