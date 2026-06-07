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
├── frontend/                   # React frontend
├── database/                   # SQL scripts
└── docs/                       # Documentation
```

## 🚀 Getting Started

See [SETUP.md](docs/SETUP.md) for detailed installation instructions.

## 📖 Documentation

- **[Setup Guide](docs/SETUP.md)** - Installation & configuration
- **[Database Documentation](docs/DATABASE.md)** - Schema & relationships
- **[API Documentation](docs/API.md)** - Endpoint reference
- **[ERD](docs/ERD.md)** - Entity Relationship Diagram

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention
- CORS protection
- Rate limiting
- Role-based access control (RBAC)

## 📄 License

MIT License

## 👤 Author

**Patrick Osei** - [@PatrickOsei667](https://github.com/PatrickOsei667)