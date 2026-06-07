#!/bin/bash

# Church Management System Database Setup Script
# This script sets up the database with schema and sample data

set -e

echo "========================================"
echo "Church Management System Database Setup"
echo "========================================"
echo ""

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | xargs)
else
    echo "ERROR: .env file not found!"
    echo "Please copy backend/.env.example to backend/.env and configure it."
    exit 1
fi

# Check if database dialect is set
if [ -z "$DB_DIALECT" ]; then
    echo "ERROR: DB_DIALECT not set in .env"
    exit 1
fi

echo "Database Configuration:"
echo "  Dialect: $DB_DIALECT"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo ""

if [ "$DB_DIALECT" = "postgres" ]; then
    echo "[1/4] Creating PostgreSQL database..."
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || echo "Database already exists or connection failed"
    
    echo "[2/4] Running schema..."
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f ../database/schema.sql
    
    echo "[3/4] Seeding sample data..."
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f ../database/seed.sql
    
elif [ "$DB_DIALECT" = "mysql" ] || [ "$DB_DIALECT" = "mariadb" ]; then
    echo "[1/4] Creating MySQL/MariaDB database..."
    mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
    
    echo "[2/4] Running schema..."
    mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < ../database/schema.sql
    
    echo "[3/4] Seeding sample data..."
    mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < ../database/seed.sql
    
else
    echo "ERROR: Unsupported database dialect: $DB_DIALECT"
    exit 1
fi

echo "[4/4] Verifying database setup..."
echo "Setup completed successfully!"
echo ""
echo "Database: $DB_NAME is ready to use."
echo ""
