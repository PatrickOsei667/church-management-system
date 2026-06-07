@echo off
REM Church Management System Database Setup Script (Windows)
REM This script sets up the database with schema and sample data

echo ========================================
echo Church Management System Database Setup
echo ========================================
echo.

REM Check if .env file exists
if not exist ".env" (
    echo ERROR: .env file not found!
    echo Please copy backend\.env.example to backend\.env and configure it.
    pause
    exit /b 1
)

echo Please ensure your database server is running.
echo.

echo Select your database type:
echo 1. PostgreSQL
echo 2. MySQL/MariaDB
set /p choice="Enter choice (1 or 2): "

if "%choice%"=="1" (
    echo Setting up PostgreSQL database...
    echo.
    echo Step 1: Creating database...
    echo Run this in PostgreSQL:
    echo CREATE DATABASE church_management;
    echo.
    echo Step 2: Applying schema...
    psql -U postgres -d church_management -f "..\database\schema.sql"
    echo.
    echo Step 3: Seeding data...
    psql -U postgres -d church_management -f "..\database\seed.sql"
) else if "%choice%"=="2" (
    echo Setting up MySQL/MariaDB database...
    echo.
    echo Step 1: Creating database...
    mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS church_management;"
    echo.
    echo Step 2: Applying schema...
    mysql -u root -p church_management < "..\database\schema.sql"
    echo.
    echo Step 3: Seeding data...
    mysql -u root -p church_management < "..\database\seed.sql"
) else (
    echo Invalid choice. Please run again and select 1 or 2.
    pause
    exit /b 1
)

echo.
echo Database setup completed!
pause
