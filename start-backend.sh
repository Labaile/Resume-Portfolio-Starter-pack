#!/bin/bash

echo "🚀 Starting Resume Portfolio Backend..."
echo "📁 Changing to backend directory..."
cd backend

echo "🔧 Checking if .env file exists..."
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "✅ .env file created. Please edit it with your database configuration."
    echo "📝 Edit backend/.env and set your MONGODB_URI"
    exit 1
fi

echo "📦 Installing dependencies if needed..."
npm install

echo "🌐 Starting development server..."
echo "🔗 Server will be available at: http://localhost:5000"
echo "📊 Health check: http://localhost:5000/api/health"
echo "📝 Contact API: http://localhost:5000/api/contact"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
