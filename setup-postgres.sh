#!/bin/bash

echo "🐘 Setting up PostgreSQL for Resume Portfolio Backend"
echo "=================================================="

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    echo "   On Ubuntu/Debian: sudo systemctl start postgresql"
    echo "   On macOS: brew services start postgresql"
    echo "   On Windows: Start PostgreSQL service from Services"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Get PostgreSQL user (default is usually 'postgres')
read -p "Enter PostgreSQL username (default: postgres): " PG_USER
PG_USER=${PG_USER:-postgres}

# Get PostgreSQL password
read -s -p "Enter PostgreSQL password for $PG_USER: " PG_PASSWORD
echo

# Create database
echo "📊 Creating database 'resume_portfolio'..."
PGPASSWORD=$PG_PASSWORD psql -U $PG_USER -h localhost -c "CREATE DATABASE resume_portfolio;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database 'resume_portfolio' created successfully"
elif [ $? -eq 2 ]; then
    echo "ℹ️  Database 'resume_portfolio' already exists"
else
    echo "❌ Failed to create database. Please check your credentials."
    exit 1
fi

# Create .env file
echo "📝 Creating .env file..."
cd backend

if [ ! -f .env ]; then
    cat > .env << EOF
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=resume_portfolio
DB_USER=$PG_USER
DB_PASSWORD=$PG_PASSWORD

# Admin Authentication
ADMIN_KEY=admin123

# Optional: JWT Secret for future authentication
JWT_SECRET=your_jwt_secret_here
EOF
    echo "✅ .env file created with your PostgreSQL credentials"
else
    echo "ℹ️  .env file already exists. Please update it manually with:"
    echo "   DB_USER=$PG_USER"
    echo "   DB_PASSWORD=$PG_PASSWORD"
fi

# Install dependencies
echo "📦 Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 PostgreSQL setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the backend: cd backend && npm run dev"
echo "2. Test the API: node test-api.js"
echo "3. Start the frontend: npm start"
echo ""
echo "Your contact form will now store submissions in PostgreSQL!"
