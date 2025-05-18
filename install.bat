@echo off
setlocal enabledelayedexpansion

:: YUV.AI NextJS Boilerplate Installation Script
echo 🚀 Setting up YUV.AI NextJS Boilerplate...

:: Prompt for project name
set PROJECT_NAME=my-yuv-app
set /p PROJECT_NAME="Enter project name (default: my-yuv-app): "

:: Create project directory
mkdir "%PROJECT_NAME%" 2>nul
cd "%PROJECT_NAME%" || exit /b

:: Clone repository
echo 📦 Cloning repository...
git clone --depth 1 https://github.com/hoodini/yuv-nextjs-boilerplate .
rmdir /s /q .git

:: Initialize new git repository
git init

:: Install dependencies
echo 📚 Installing dependencies...
call npm install

:: Set up environment variables
copy .env.example .env.local
echo ⚙️ Created .env.local file. Please update it with your MongoDB and Clerk credentials.

echo 🎉 YUV.AI NextJS Boilerplate has been successfully installed!
echo To get started, run the following commands:
echo   cd %PROJECT_NAME%
echo   # Update .env.local with your credentials
echo   npm run dev
echo.
echo Fly High With YUV.AI 🚀

endlocal 