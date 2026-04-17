#!/bin/bash
# TrendTrunk Quick Start Script for macOS/Linux
# This script sets up both backend and frontend

echo ""
echo "========================================"
echo "   TrendTrunk E-Commerce Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[1/4] Node.js found: OK"
echo ""

# Check if MongoDB is installed/running
echo "[2/4] Checking MongoDB..."
echo "NOTE: Make sure MongoDB is running"
echo "Run: brew services start mongodb-community (macOS)"
echo "Or: sudo systemctl start mongod (Linux)"
echo ""

# Setup Backend
echo "[3/4] Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/trendtrunk
JWT_SECRET=your_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
EOF
    echo ".env created with default values"
    echo "NOTE: Update .env with your settings if needed"
fi

# Seed database
echo ""
echo "Seeding database with products..."
npm run seed

cd ..

# Setup Frontend
echo ""
echo "[4/4] Setting up Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed"
fi

cd ..

echo ""
echo "========================================"
echo "   Setup Complete!"
echo "========================================"
echo ""
echo "To start the application:"
echo ""
echo "1. Open TWO new terminal windows"
echo ""
echo "2. In Terminal 1 (Backend):"
echo "   cd Assignment_6/backend"
echo "   npm run dev"
echo ""
echo "3. In Terminal 2 (Frontend):"
echo "   cd Assignment_6/frontend"
echo "   npm run dev"
echo ""
echo "4. Open browser: http://localhost:5173"
echo ""
echo "========================================"
echo ""
