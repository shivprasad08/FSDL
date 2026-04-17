# Solēd - Complete Setup Guide

This guide will walk you through setting up and running the Solēd e-commerce application on your local machine.

## Prerequisites

### Required Software
1. **Node.js** (v16 or higher) - Download from https://nodejs.org/
2. **MongoDB** - Choose one of:
   - **Local Installation**: Download from https://www.mongodb.com/try/download/community
   - **MongoDB Atlas** (Cloud): Create a free account at https://www.mongodb.com/cloud/atlas

### Tools
- A code editor (VS Code recommended)
- Terminal/Command Prompt
- A web browser (Chrome, Firefox, Safari, or Edge)

---

## Step 1: MongoDB Setup

### Option A: Local MongoDB Installation (Windows)

1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will be installed as a Windows Service
4. Open Command Prompt and verify installation:
```bash
mongo --version
```

### Option B: Using MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/trendtrunk`)
5. Note: You'll use this in the `.env` file later

---

## Step 2: Backend Setup

### 2.1 Open Terminal and Navigate to Backend

```bash
cd Assignment_6/backend
```

### 2.2 Install Dependencies

```bash
npm install
```

This will install all required packages:
- express: Web framework
- mongoose: MongoDB ODM
- cors: Cross-origin requests
- jsonwebtoken: Authentication
- bcryptjs: Password hashing
- dotenv: Environment variables

### 2.3 Configure Environment Variables

Create a `.env` file in the `backend` folder:

**For Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/trendtrunk
JWT_SECRET=your_very_secret_key_change_this_in_production_12345
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trendtrunk
JWT_SECRET=your_very_secret_key_change_this_in_production_12345
PORT=5000
NODE_ENV=development
```

Replace `username`, `password`, and `cluster` with your actual MongoDB Atlas credentials.

### 2.4 Start MongoDB (if using local installation)

**Windows:**
```bash
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 2.5 Seed the Database

Populate the database with sample products:

```bash
npm run seed
```

You should see: `Database seeded successfully`

### 2.6 Start the Backend Server

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected: localhost
```

✅ **Backend is now running on `http://localhost:5000`**

---

## Step 3: Frontend Setup

### 3.1 Open a New Terminal and Navigate to Frontend

In a **new terminal window**:

```bash
cd Assignment_6/frontend
```

### 3.2 Install Dependencies

```bash
npm install
```

### 3.3 Start Development Server

```bash
npm run dev
```

You should see output similar to:
```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ **Frontend is now running on `http://localhost:5173`**

---

## Step 4: Access the Application

Open your web browser and go to:
```
http://localhost:5173
```

You should now see the TrendTrunk application with:
- Navigation bar with logo and menu
- Hero section with large "Express — Yourself Through Style" text
- Popular Products carousel
- Find the Perfect Shoes section
- Elevate Your Game banner
- New Arrivals grid
- Just Do It promotional banner
- Footer

---

## Features to Test

### 1. Browse Products
- Scroll through Popular Products
- View New Arrivals in the grid
- All products should load with images and prices

### 2. Navigation
- Click menu items (they're currently demo links)
- Use search icon in navbar
- View wishlist and cart icons

### 3. Responsive Design
- Resize browser window to test mobile/tablet views
- Everything should adapt properly

---

## Troubleshooting

### Port Already in Use

If you see "Port 5000 already in use" or "Port 5173 already in use":

**Windows:**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Kill process on specific port
kill -9 $(lsof -t -i :5000)
kill -9 $(lsof -t -i :5173)
```

### MongoDB Connection Error

If you get "MongoDB connection failed":

1. Verify MongoDB is running:
   - Local: Check Windows Services for MongoDB or run `mongo` command
   - Atlas: Check your connection string in `.env`

2. Check your connection string format:
   ```bash
   # Local
   mongodb://localhost:27017/trendtrunk
   
   # Atlas
   mongodb+srv://username:password@cluster.mongodb.net/trendtrunk
   ```

### Module Not Found Errors

If you see "Cannot find module" errors:

```bash
# Clear node_modules and reinstall
# In backend folder
rm -rf node_modules package-lock.json
npm install

# In frontend folder
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

If you see CORS errors in browser console, ensure the backend is running on port 5000:
- Check terminal running backend shows "Server running on port 5000"
- The frontend Vite config automatically proxies `/api` to `http://localhost:5000`

---

## API Testing with Postman

You can test the API directly using Postman:

1. Download Postman from https://www.postman.com/downloads/

2. **Get All Products:**
   - Method: GET
   - URL: `http://localhost:5000/api/products`

3. **Get Popular Products:**
   - Method: GET
   - URL: `http://localhost:5000/api/products/popular`

4. **Get New Arrivals:**
   - Method: GET
   - URL: `http://localhost:5000/api/products/new`

5. **Register User:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Body (JSON):
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

6. **Login User:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body (JSON):
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

---

## Project Images

The application expects images in the `/public/images` folder. Currently using placeholders:

**Required Images:**
- `/public/images/hero-shoe.png` - Hero section shoe
- `/public/images/nike-dunk-low.png` - Product images
- `/public/images/aj1-low.png`
- `/public/images/airmax-plus-3.png`
- `/public/images/nike-sb-dunk.png`
- `/public/images/jordan1-mid-kids.png`
- `/public/images/dunk-low-retro.png`
- `/public/images/jordan1-mid-se-kids.png`
- `/public/images/airmax1-sc.png`
- `/public/images/nike-airmax.png`
- `/public/images/infinityrn-4.png`
- `/public/images/sabrina1-ionic.png`
- `/public/images/metcon9-amp.png`
- `/public/images/man-camera.png` - Section images
- `/public/images/man-camo.png`
- `/public/images/person-nike-tee.png`

You can replace these with actual Nike product images or use placeholder services like:
- https://placeholder.com/400x400?text=Nike+Shoe
- https://via.placeholder.com/400x400

---

## Building for Production

### Frontend Production Build

```bash
cd Assignment_6/frontend
npm run build
```

This creates an optimized `dist` folder ready for deployment.

### Backend Production

For production deployment:
1. Update `.env` with production database URL
2. Change `JWT_SECRET` to a strong random string
3. Set `NODE_ENV=production`
4. Use a process manager like PM2

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start server.js --name "trendtrunk"
```

---

## Next Steps

1. ✅ Backend running: http://localhost:5000
2. ✅ Frontend running: http://localhost:5173
3. ✅ Database populated with 12 products
4. 📝 Add product images to `/public/images`
5. 🔐 Implement user authentication UI
6. 🛒 Add shopping cart functionality
7. 💌 Add wishlist functionality
8. 📦 Implement checkout process
9. 🚀 Deploy to production

---

## Support & Troubleshooting

If you encounter any issues:

1. Check the README.md files in backend and frontend folders
2. Verify all prerequisites are installed
3. Ensure MongoDB is running
4. Check that no ports (5000, 5173) are already in use
5. Clear browser cache and restart development servers

---

## Success!

You now have a fully functional TrendTrunk e-commerce application running locally with:
- ✅ React + Vite frontend
- ✅ Node.js + Express backend
- ✅ MongoDB database with seed data
- ✅ Beautiful UI matching design specifications
- ✅ Full API integration

Start building and customizing! 🚀
