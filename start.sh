#!/usr/bin/env bash
set -e
echo "========== Starting TaskMaster =========="

BACKEND_DIR="backend"
FRONTEND_DIR="frontend"

echo ">>> Installing backend dependencies..."
cd $BACKEND_DIR
npm install

echo ">>> Starting backend..."
npm run dev & 
BACKEND_PID=$!

echo ">>> Installing frontend dependencies..."
cd ../$FRONTEND_DIR
npm install

echo ">>> Starting frontend..."
npm run dev &   
FRONTEND_PID=$!

echo "=========================================="
echo " Backend running in PID $BACKEND_PID"
echo " Frontend running in PID $FRONTEND_PID"
echo " Access frontend: http://localhost:5173"
echo "=========================================="

wait