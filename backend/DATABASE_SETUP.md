# Database Setup for Church Management System

## Prerequisites

Before setting up the database, ensure you have:

1. **PostgreSQL 12+** OR **MySQL 8+** installed and running
2. **Backend dependencies installed**: `npm install` (run in `backend/` directory)
3. **Environment variables configured**: Copy `.env.example` to `.env` and update with your database credentials

## Quick Setup

### For Linux/macOS

```bash
cd backend
chmod +x setup-db.sh
./setup-db.sh
```

### For Windows

```cmd
cd backend
setup-db.bat
```

## Manual Setup

### PostgreSQL Setup

#### 1. Create Database
```bash
psql -U postgres
```

Inside PostgreSQL:
```sql
CREATE DATABASE church_management;
\c church_management
```

#### 2. Import Schema
```bash
psql -U postgres -d church_management -f database/schema.sql
```

#### 3. Seed Sample Data
```bash
psql -U postgres -d church_management -f database/seed.sql
```

#### 4. Verify Setup
```bash
psql -U postgres -d church_management
```

Inside PostgreSQL:
```sql
-- Check tables
\dt

-- Check table structure
\d BRANCH

-- Check sample data
SELECT * FROM BRANCH;
```

### MySQL/MariaDB Setup

#### 1. Create Database
```bash
mysql -u root -p
```

Inside MySQL:
```sql
CREATE DATABASE church_management;
USE church_management;
```

#### 2. Import Schema
```bash
mysql -u root -p church_management < database/schema.sql
```

#### 3. Seed Sample Data
```bash
mysql -u root -p church_management < database/seed.sql
```

#### 4. Verify Setup
```bash
mysql -u root -p
```

Inside MySQL:
```sql
-- Check database
USE church_management;

-- Check tables
SHOW TABLES;

-- Check table structure
DESC BRANCH;

-- Check sample data
SELECT * FROM BRANCH;
```

## Environment Configuration

### PostgreSQL Configuration (.env)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=church_management
DB_DIALECT=postgres
```

### MySQL Configuration (.env)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=church_management
DB_DIALECT=mysql
```

## Database Schema Overview

### Tables Created

1. **BRANCH** - Church locations
   - Fields: Branch_ID, Branch_Name, Location

2. **MEMBER** - Church members
   - Fields: Member_ID, Member_Name, Phone, Address, Email, Password_Hash, Role, Branch_ID

3. **PASTOR** - Pastors at branches
   - Fields: Pastor_ID, Pastor_Name, Phone, Email, Branch_ID

4. **SERVICE** - Church services
   - Fields: Service_ID, Service_Type, Service_Date, Branch_ID

5. **DONATION** - Member donations
   - Fields: Donation_ID, Donation_Date, Total_Amount, Member_ID, Branch_ID

6. **DONATION_ITEM** - Items within donations
   - Fields: DonationItem_ID, Donation_ID, Donation_Type, Amount

7. **DEPARTMENT** - Church departments
   - Fields: Department_ID, Department_Name, Leader, Branch_ID

## Sample Data

The seed script populates the database with:

- **3 Branches**: Main, West, East
- **4 Members**: John Doe, Jane Smith, Admin User, Pastor James
- **3 Pastors**: James Brown, Michael Johnson, David Williams
- **4 Services**: Sunday Worship, Wednesday Prayer, Youth Meeting
- **4 Donations**: Various amounts with items
- **4 Departments**: Worship Team, Sunday School, Youth Ministry, Women Fellowship

## Test Accounts

After setup, you can login with:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@church.com | admin123 |
| Pastor | pastor@church.com | pastor123 |
| Member | member@church.com | member123 |

## Troubleshooting

### PostgreSQL Connection Error

**Problem**: `psql: error: could not translate host name "localhost" to address`

**Solution**:
- Ensure PostgreSQL is running
- Check the host address in `.env` (use `127.0.0.1` instead of `localhost` if needed)
- Verify username and password

### MySQL Access Denied

**Problem**: `Error 1045 (28000): Access denied for user 'root'@'localhost'`

**Solution**:
- Verify MySQL is running
- Check the password in `.env`
- Reset MySQL password if forgotten

### Database Already Exists

**Problem**: `ERROR: database "church_management" already exists`

**Solution**:
```bash
# PostgreSQL - drop and recreate
psql -U postgres -c "DROP DATABASE church_management;"
psql -U postgres -c "CREATE DATABASE church_management;"
psql -U postgres -d church_management -f database/schema.sql

# MySQL - drop and recreate
mysql -u root -p -e "DROP DATABASE church_management;"
mysql -u root -p -e "CREATE DATABASE church_management;"
mysql -u root -p church_management < database/schema.sql
```

### Character Encoding Issues

**Problem**: Special characters not displaying correctly

**Solution - PostgreSQL**:
```bash
psql -U postgres -d church_management -f database/schema.sql --encoding=UTF8
```

**Solution - MySQL**:
```bash
mysql -u root -p --default-character-set=utf8mb4 church_management < database/schema.sql
```

## Advanced: Using Docker (Optional)

If you prefer Docker, you can use:

### PostgreSQL with Docker

```bash
docker run --name church-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=church_management -p 5432:5432 -d postgres:15
```

### MySQL with Docker

```bash
docker run --name church-db -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=church_management -p 3306:3306 -d mysql:8
```

## Next Steps

After database setup:

1. **Start the backend server**:
   ```bash
   npm run dev
   ```

2. **Start the frontend**:
   ```bash
   cd frontend
   npm start
   ```

3. **Test the application**:
   - Open http://localhost:3000
   - Login with credentials above
   - Browse the dashboard and test features

## Database Backups

### PostgreSQL Backup

```bash
pg_dump -U postgres church_management > backup.sql
```

### MySQL Backup

```bash
mysqldump -u root -p church_management > backup.sql
```

### Restore from Backup

```bash
# PostgreSQL
psql -U postgres church_management < backup.sql

# MySQL
mysql -u root -p church_management < backup.sql
```

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Database Design Best Practices](../docs/DATABASE.md)
- [API Documentation](../docs/API.md)
