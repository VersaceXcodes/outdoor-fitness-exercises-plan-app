#!/bin/bash
set -e
echo "=== LaunchPulse Dev Server Init ==="

# Install backend dependencies
echo "Installing backend dependencies..."
cd /app/backend
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd /app/vitereact
npm install

# Start backend server (port 3000)
echo "Starting backend server on port 3000..."
cd /app/backend
npm run dev &

# Wait for backend to initialize
sleep 2

# Start frontend dev server (port 5173)
echo "Starting frontend dev server on port 5173..."
cd /app/vitereact
npm run dev &

echo "=== Development servers started ==="
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:3000"
