# TrendTrunk Frontend

TrendTrunk is a modern sneaker e-commerce frontend built with React, Vite, and Tailwind CSS.

## Installation

1. Install dependencies:
```bash
npm install
```

2. The frontend is configured to proxy API requests to `http://localhost:5000` in development mode.

## Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Features

- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Modern Typography** - Uses Barlow Condensed and Bebas Neue for bold headlines
- **Product Showcases** - Popular products, new arrivals, and featured sections
- **Interactive Components** - Scroll navigation, search, and wishlist functionality
- **Beautiful Layouts** - Pixel-perfect design matching provided screenshots
- **Design Elements**:
  - Scalloped borders on promotional banners
  - Gradient overlays and blob shapes
  - Circular product image containers
  - Hero section with large typography
  - Grid-based layouts

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── HeroSection.tsx       # Hero with large typography
│   │   ├── PopularProducts.tsx   # Featured products carousel
│   │   ├── FindPerfectShoes.tsx  # Product essentials section
│   │   ├── ElevateYourGame.tsx   # Purple banner section
│   │   ├── NewArrivals.tsx       # Product grid
│   │   ├── JustDoIt.tsx          # Yellow promotional banner
│   │   └── Footer.tsx            # Footer with links
│   ├── pages/
│   ├── services/
│   │   └── api.ts             # API service and endpoints
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles
├── public/
│   └── images/                # Product and banner images
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Color Palette

- **Black**: #0D0D0D
- **Yellow/Gold**: #F5C518
- **Orange**: #E8500A
- **White**: #FFFFFF
- **Purple**: #5B4BEB
- **Light Gray**: #F5F5F5

## Fonts

- **Display**: Barlow Condensed, Bebas Neue
- **Body**: Inter, Helvetica, Arial

## Components

### Navbar
Sticky navigation with logo, menu links, and icons for search, wishlist, and cart.

### Hero Section
Large oversized typography ("Express — Yourself Through Style") with a filled yellow grid background and floating shoe image.

### Popular Products
Horizontally scrollable product carousel with featured items and navigation arrows.

### Find the Perfect Shoes
Split layout section with text content and an orange blob design with image.

### Elevate Your Game
Purple scalloped banner banner with multi-colored text highlights and promotional content.

### New Arrivals
3×3 grid of new products with consistent card styling.

### Just Do It
Yellow scalloped banner with large "JUST DO IT!" text and cutout image.

### Footer
Multi-column footer with company information, navigation links, and social media.

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **PostCSS** - CSS processing
- **Autoprefixer** - Vendor prefixes

## API Integration

The frontend connects to the backend API for:
- Fetching product data
- User authentication
- Cart management
- Wishlist management

All API calls include automatic JWT token attachment from localStorage.

## Responsive Design

The application uses Tailwind CSS breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
