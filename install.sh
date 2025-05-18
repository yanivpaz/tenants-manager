#!/bin/bash

# YUV.AI NextJS Boilerplate Installation Script
echo "🚀 Setting up YUV.AI NextJS Boilerplate..."

# Prompt for project name
read -p "Enter project name (default: my-yuv-app): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-my-yuv-app}

# Create project directory
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME" || exit

# Clone repository
echo "📦 Cloning repository..."
git clone --depth 1 https://github.com/hoodini/yuv-nextjs-boilerplate .
rm -rf .git

# Initialize new git repository
git init

# Install dependencies
echo "📚 Installing dependencies..."
npm install

# Set up environment variables
cp .env.example .env.local
echo "⚙️ Created .env.local file. Please update it with your MongoDB and Clerk credentials."

echo "🎉 YUV.AI NextJS Boilerplate has been successfully installed!"
echo "To get started, run the following commands:"
echo "  cd $PROJECT_NAME"
echo "  # Update .env.local with your credentials"
echo "  npm run dev"
echo ""
echo "Fly High With YUV.AI 🚀" 