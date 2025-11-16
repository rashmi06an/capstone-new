#!/bin/bash

echo "🚀 Starting Freelanch Backend Server..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your database credentials!"
    echo "   Then run this script again."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if Prisma Client is generated
if [ ! -d "node_modules/.prisma" ]; then
    echo "🔧 Generating Prisma Client..."
    npm run prisma:generate
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL=" .env || grep -q "DATABASE_URL=\"mysql://user:password" .env; then
    echo "⚠️  Warning: DATABASE_URL might not be configured properly!"
    echo "   Please edit .env and set your database connection string."
fi

echo "✅ Starting server..."
echo ""

npm run dev

