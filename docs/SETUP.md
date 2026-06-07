# Setup Instructions

This guide will help you set up the Church Management System locally.

## Prerequisites

- Node.js v16+ ([Download](https://nodejs.org/))
- npm or yarn
- PostgreSQL 12+ or MySQL 8+ ([Download](https://www.postgresql.org/download/))
- Git
- A code editor (VS Code recommended)

## Database Setup

### PostgreSQL

1. **Create a new database**
```bash
psql -U postgres
CREATE DATABASE church_management;
\q
```

2. **Run the schema script**
```bash
psql -U postgres -d church_management -f database/schema.sql
```

3. **Seed the database**
```bash
psql -U postgres -d church_management -f database/seed.sql
```

### MySQL

1. **Create a new database**
```bash
mysql -u root -p
CREATE DATABASE church_management;
USE church_management;
EXIT;
```

2. **Run the schema script**
```bash
mysql -u root -p church_management < database/schema.sql
```

3. **Seed the database**
```bash
mysql -u root -p church_management < database/seed.sql
```

## Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure .env file**
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432  # PostgreSQL: 5432, MySQL: 3306
DB_USER=postgres  # or root for MySQL
DB_PASSWORD=your_password
DB_NAME=church_management
DB_DIALECT=postgres  # or mysql

# JWT
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRY=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

5. **Run database migrations**
```bash
npm run migrate
```

6. **Seed the database**
```bash
npm run seed
```

7. **Start the development server**
```bash
npm run dev
```

The backend API should now be running at `http://localhost:5000`

## Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure .env file**
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=30000
```

5. **Start the development server**
```bash
npm start
```

The frontend should now be running at `http://localhost:3000`

## Verification

### Test Backend API

```bash
# Get all branches
curl http://localhost:5000/api/branches

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@church.com","password":"admin123"}'
```

### Test Frontend

1. Open `http://localhost:3000` in your browser
2. Login with credentials:
   - Email: `admin@church.com`
   - Password: `admin123`

## Default Test Accounts

| Role | Email | Password | Permissions |
|------|-------|----------|-----|
| Admin | admin@church.com | admin123 | Full access to all features |
| Pastor | pastor@church.com | pastor123 | Manage members, donations, services in assigned branch |
| Member | member@church.com | member123 | View own donations, edit profile |

**⚠️ Important**: Change these passwords immediately in production!

## Troubleshooting

### Database Connection Error

**Problem**: "Error: connect ECONNREFUSED"

**Solution**:
1. Ensure PostgreSQL/MySQL is running
2. Check database credentials in `.env`
3. Verify database exists: `psql -l` (PostgreSQL) or `mysql -u root -p -e "SHOW DATABASES;"` (MySQL)

### Port Already in Use

**Problem**: "Error: listen EADDRINUSE: address already in use :::5000"

**Solution**:
```bash
# Kill process on port 5000
# On macOS/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Dependencies Installation Issues

**Problem**: npm install fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Module Not Found Errors

**Problem**: "Cannot find module 'express'"

**Solution**:
```bash
# Make sure you're in the correct directory (backend or frontend)
cd backend
npm install
```

## Next Steps

1. Review the [API Documentation](API.md) to understand available endpoints
2. Check the [Database Documentation](DATABASE.md) for schema details
3. Start building features based on the project requirements
4. Create feature branches for development: `git checkout -b feature/feature-name`

## Production Deployment

For production deployment, see the deployment guide in your DevOps documentation or cloud provider's documentation.

### Pre-deployment Checklist

- [ ] Update all hardcoded credentials
- [ ] Enable HTTPS
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper database backups
- [ ] Set up monitoring and logging
- [ ] Review security configurations
- [ ] Test all API endpoints
- [ ] Verify CORS settings
- [ ] Set strong JWT secret
- [ ] Configure email notifications (if applicable)