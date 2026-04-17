# TrendTrunk Backend

TrendTrunk is a full-stack sneaker e-commerce application backend built with Node.js, Express.js, and MongoDB.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/trendtrunk
JWT_SECRET=your_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

3. Make sure MongoDB is running on your system:
```bash
# For Windows with MongoDB installed
net start MongoDB

# For macOS with Homebrew
brew services start mongodb-community

# For Linux with systemd
sudo systemctl start mongod
```

## Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## Seeding the Database

To populate the database with sample products:

```bash
npm run seed
```

This will clear existing products and insert 12 Nike sneaker products with realistic prices in GBP.

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/popular` - Get featured products
- `GET /api/products/new` - Get new arrivals
- `GET /api/products/:id` - Get single product

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Cart
- `POST /api/cart` - Add item to cart (requires auth)
- `GET /api/cart/:userId` - Get user's cart
- `DELETE /api/cart` - Remove item from cart (requires auth)

### Wishlist
- `POST /api/wishlist` - Add to wishlist (requires auth)
- `GET /api/wishlist/:userId` - Get user's wishlist
- `DELETE /api/wishlist` - Remove from wishlist (requires auth)

## Project Structure

```
backend/
├── config/
│   └── db.js           # MongoDB connection
├── models/
│   ├── Product.js      # Product schema
│   ├── User.js         # User schema
│   └── Order.js        # Order schema
├── controllers/
│   ├── productController.js
│   ├── authController.js
│   ├── cartController.js
│   └── wishlistController.js
├── routes/
│   ├── products.js
│   ├── auth.js
│   ├── cart.js
│   └── wishlist.js
├── middleware/
│   └── auth.js         # JWT authentication
├── server.js           # Main server file
├── seed.js             # Database seed script
├── package.json
└── .env
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Nodemon** - Development auto-reload

## License

MIT
