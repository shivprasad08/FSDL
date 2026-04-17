# Solēd E-Commerce Application

A full-stack sneaker e-commerce web application built with modern technologies.

## Project Overview

Solēd is a complete e-commerce platform for trending sneakers featuring:

- **Modern Frontend**: React with Vite and Tailwind CSS
- **Robust Backend**: Node.js with Express.js and MongoDB
- **Responsive Design**: Pixel-perfect implementation of design screenshots
- **Full-Stack Integration**: Complete API integration between frontend and backend
- **User Authentication**: Secure JWT-based authentication
- **Product Management**: Featured products, new arrivals, and product details
- **Cart & Wishlist**: Full shopping cart and wishlist functionality

## Tech Stack

### Frontend
- React 18
- Vite (Build tool)
- Tailwind CSS (Styling)
- TypeScript
- Axios (HTTP client)

### Backend
- Node.js
- Express.js (Web framework)
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- bcryptjs (Password hashing)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
```bash
cd Assignment_6/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/trendtrunk
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

4. Seed the database:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd Assignment_6/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is in use)

## API Documentation

### Products Endpoints
- `GET /api/products` - Fetch all products
- `GET /api/products/popular` - Fetch featured/popular products
- `GET /api/products/new` - Fetch new arrival products
- `GET /api/products/:id` - Fetch single product details

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user and receive JWT token

### Cart Endpoints
- `POST /api/cart` - Add item to cart (requires authentication)
- `GET /api/cart/:userId` - Get user's cart
- `DELETE /api/cart` - Remove item from cart (requires authentication)

### Wishlist Endpoints
- `POST /api/wishlist` - Add item to wishlist (requires authentication)
- `GET /api/wishlist/:userId` - Get user's wishlist
- `DELETE /api/wishlist` - Remove item from wishlist (requires authentication)

## Database Schema

### Product
```javascript
{
  name: String,
  subtitle: String,
  price: Number,
  colours: [{ name: String, code: String }],
  category: String (Men, Women, Kids),
  imageUrl: String,
  description: String,
  isNew: Boolean,
  isFeatured: Boolean,
  stock: Number,
  createdAt: Date
}
```

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  wishlist: [ObjectId],
  cart: [{
    product: ObjectId,
    quantity: Number,
    size: String,
    addedAt: Date
  }],
  createdAt: Date
}
```

### Order
```javascript
{
  userId: ObjectId,
  items: [{
    product: ObjectId,
    quantity: Number,
    price: Number,
    size: String
  }],
  total: Number,
  status: String (pending, processing, shipped, delivered, cancelled),
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Design System

### Color Palette
- **Primary Black**: #0D0D0D
- **Accent Yellow**: #F5C518
- **Accent Orange**: #E8500A
- **White**: #FFFFFF
- **Secondary Purple**: #5B4BEB
- **Light Gray**: #F5F5F5

### Typography
- **Display Font**: Barlow Condensed, Bebas Neue (Headlines)
- **Body Font**: Inter, Helvetica, Arial (Body text)

## Project Structure

```
Assignment_6/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   ├── .env
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
└── README.md (this file)
```

## Features Implemented

### Frontend Sections
1. **Navbar** - Sticky navigation with logo, menu links, and action icons
2. **Hero Section** - Large typography with yellow grid background and floating shoe
3. **Popular Products** - Horizontal scrollable product carousel
4. **Find the Perfect Shoes** - Split layout with text and orange blob design
5. **Elevate Your Game** - Purple scalloped banner with promotional content
6. **New Arrivals** - 3×3 grid of new products
7. **Just Do It** - Yellow scalloped banner with promotional imagery
8. **Footer** - Multi-column footer with links and contact info

### Backend Features
- Complete REST API
- JWT-based authentication
- Password hashing with bcryptjs
- MongoDB data persistence
- CORS enabled for frontend communication
- Database seeding with sample products
- Error handling and validation

## Running the Application

1. Start MongoDB (if using local installation)
2. Run the backend server: `npm run dev` (in backend folder)
3. Run the frontend development server: `npm run dev` (in frontend folder)
4. Open browser and navigate to `http://localhost:5173`

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/trendtrunk
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (Vite auto-proxies to backend)
The frontend Vite config is set up to proxy `/api` requests to `http://localhost:5000`

## Production Build

### Frontend
```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Backend
Simply run with `npm start` after setting appropriate environment variables for production.

## Notes

- Images in the product grid use placeholder paths. Replace with actual product images as needed.
- The scalloped borders use CSS clip-path for a clean, performant implementation.
- All text styling matches the color palette and typography system defined in the design.
- The application is fully responsive and works on all modern browsers.

## License

MIT License

## Support

For issues or questions, please refer to the individual README files in the backend and frontend folders.
