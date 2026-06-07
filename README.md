# Church Management System

A comprehensive web application for managing church operations including member records, donations, services, pastors, and departments.

## 🎯 Features

- **Member Management**: Register and manage church members with contact information
- **Donation Tracking**: Record and track donations from members with detailed item breakdowns
- **Service Management**: Manage church services and attendance
- **Branch/Location Management**: Support multiple church branch locations
- **Pastor Management**: Manage pastors assigned to branches
- **Department Management**: Organize church departments with leaders
- **Role-Based Access Control**: Admin, Pastor, and Member roles with JWT authentication

## 📚 Technology Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL / SQL Server
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API
- **Validation**: Joi/Yup
- **Testing**: Jest + React Testing Library

## 📁 Project Structure

```
church-management-system/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── models/            # Sequelize database models
│   │   ├── routes/            # API route definitions
│   │   ├── controllers/        # Business logic handlers
│   │   ├── middleware/         # Auth, validation, error handling
│   │   ├── services/           # Business services
│   │   ├── validators/         # Request validation schemas
│   │   ├── config/             # Database and app configuration
│   │   ├── utils/              # Helper functions
│   │   └── app.js              # Express app setup
│   ├── migrations/             # Database migrations
│   ├── seeders/                # Sample/test data
│   ├── tests/                  # Backend tests
│   ├── .env.example            # Environment variables template
│   └── package.json
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API client services
│   │   ├── context/            # React Context (auth, theme, etc)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── types/              # TypeScript type definitions
│   │   ├── styles/             # Global styles & Tailwind
│   │   ├── utils/              # Helper functions
│   │   ├── App.tsx             # Main App component
│   │   └── index.tsx           # React entry point
│   ├── tests/                  # Frontend tests
│   ├── .env.example            # Environment variables template
│   └── package.json
├── database/                   # SQL scripts and documentation
│   ├── schema.sql              # Complete database schema
│   ├── seed.sql                # Sample initial data
│   └── migrations/             # Migration scripts
└── docs/                       # Documentation
    ├── ERD.md                  # Entity Relationship Diagram
    ├── API.md                  # API Endpoints Documentation
    ├── SETUP.md                # Setup Instructions
    └── DATABASE.md             # Database Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL 12+ or SQL Server 2019+
- Git

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/PatrickOsei667/church-management-system.git
cd church-management-system
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run seed
npm run dev
```

3. **Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

## 📖 Documentation

- **[Setup Guide](docs/SETUP.md)** - Detailed installation instructions
- **[Database Documentation](docs/DATABASE.md)** - Database schema and relationships
- **[API Documentation](docs/API.md)** - Complete API endpoint reference
- **[ERD](docs/ERD.md)** - Entity Relationship Diagram

## 🗄️ Database Schema

The system uses the following main entities:

- **BRANCH** - Church locations/branches
- **MEMBER** - Church members
- **PASTOR** - Pastors at branches
- **SERVICE** - Church services
- **DONATION** - Member donations
- **DONATION_ITEM** - Individual items in donations
- **DEPARTMENT** - Church departments

See [Database Documentation](docs/DATABASE.md) for detailed schema information.

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- CORS protection
- Rate limiting
- Role-based access control (RBAC)

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test
npm run test:coverage
```

### Frontend Tests
```bash
cd frontend
npm run test
npm run test:coverage
```

## 📝 Default Users

After seeding, the following test accounts are available:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@church.com | admin123 |
| Pastor | pastor@church.com | pastor123 |
| Member | member@church.com | member123 |

**⚠️ Change these passwords in production!**

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

**Patrick Osei** - [@PatrickOsei667](https://github.com/PatrickOsei667)

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Last Updated**: 2026-06-07
