@echo off
REM TrendTrunk Quick Start Script for Windows
REM This script sets up and starts both backend and frontend

echo.
echo ========================================
echo   TrendTrunk E-Commerce Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Node.js found: OK
echo.

REM Check if MongoDB is running
echo [2/4] Checking MongoDB connection...
REM This is a basic check - MongoDB might still need to be started manually
echo NOTE: Make sure MongoDB is running (run 'net start MongoDB' in Admin cmd)
echo.

REM Setup Backend
echo [3/4] Setting up Backend...
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    (
        echo MONGODB_URI=mongodb://localhost:27017/trendtrunk
        echo JWT_SECRET=your_secret_key_here_change_in_production
        echo PORT=5000
        echo NODE_ENV=development
    ) > .env
    echo .env created with default values
    echo NOTE: Update .env with your settings if needed
)

REM Seed database
echo.
echo Seeding database with products...
call npm run seed

cd ..

REM Setup Frontend
echo.
echo [4/4] Setting up Frontend...
cd frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)
cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Open TWO new terminal windows
echo.
echo 2. In Terminal 1 (Backend):
echo    cd Assignment_6\backend
echo    npm run dev
echo.
echo 3. In Terminal 2 (Frontend):
echo    cd Assignment_6\frontend
echo    npm run dev
echo.
echo 4. Open browser: http://localhost:5173
echo.
echo ========================================
echo.
pause
