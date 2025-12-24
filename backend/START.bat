@echo off
REM Dean by D'Zyne Backend Quick Start Script for Windows

echo.
echo ╔════════════════════════════════════════╗
echo ║  Dean by D'Zyne Backend Setup         ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node --version
npm --version
echo.

REM Check if in backend directory
if not exist "package.json" (
    echo ❌ Error: package.json not found!
    echo Please run this script from the backend directory:
    echo cd "C:\Users\SHARBET\Desktop\DEAN BY D'ZYNE\backend"
    echo.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  .env file not found!
    echo.
    echo Creating .env from .env.example...
    copy .env.example .env >nul 2>nul
    
    if %errorlevel% equ 0 (
        echo ✅ Created .env file
        echo.
        echo ⚠️  IMPORTANT: Please edit .env with your email settings!
        echo    - Open .env in your text editor
        echo    - Add your EMAIL_USER and EMAIL_PASSWORD
        echo    - Save the file
        echo.
        echo Opening .env file...
        start notepad .env
        echo.
        echo Please edit the .env file and save it, then run this script again.
        pause
        exit /b 0
    )
)

REM Install dependencies
echo 📦 Installing dependencies...
if not exist "node_modules" (
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Error installing dependencies!
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencies already installed
)

echo.
echo ✅ Setup complete!
echo.
echo 🚀 Starting backend server...
echo    API running on: http://localhost:5000
echo    Press Ctrl+C to stop the server
echo.

call npm start
