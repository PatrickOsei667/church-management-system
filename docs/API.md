# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication

#### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@church.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "member_id": 1,
    "member_name": "Admin User",
    "email": "admin@church.com",
    "role": "admin",
    "branch_id": 1
  }
}
```

#### Register
```
POST /auth/register
```

**Request Body:**
```json
{
  "member_name": "New Member",
  "email": "newmember@church.com",
  "password": "password123",
  "phone": "0551234567",
  "address": "123 Main St",
  "branch_id": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Member registered successfully",
  "member_id": 5
}
```

### Branches

#### Get All Branches
```
GET /branches
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "branch_id": 1,
      "branch_name": "Main Branch",
      "location": "123 Church Street, City Center"
    },
    {
      "branch_id": 2,
      "branch_name": "West Branch",
      "location": "456 West Avenue, West District"
    }
  ]
}
```

#### Get Branch Details
```
GET /branches/:branchId
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "branch_id": 1,
    "branch_name": "Main Branch",
    "location": "123 Church Street",
    "members_count": 45,
    "pastors_count": 2,
    "donations_count": 120
  }
}
```

#### Create Branch (Admin Only)
```
POST /branches
```

**Request Body:**
```json
{
  "branch_name": "North Branch",
  "location": "999 North Road"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "branch_id": 4,
    "branch_name": "North Branch",
    "location": "999 North Road"
  }
}
```

### Members

#### Get All Members
```
GET /members?branch_id=1&limit=10&page=1
```

**Query Parameters:**
- `branch_id` (optional): Filter by branch
- `limit` (optional): Results per page (default: 10)
- `page` (optional): Page number (default: 1)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "member_id": 1,
      "member_name": "John Doe",
      "email": "john@church.com",
      "phone": "0551234567",
      "address": "123 Main St",
      "role": "member",
      "branch_id": 1
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

#### Get Member Details
```
GET /members/:memberId
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "member_id": 1,
    "member_name": "John Doe",
    "email": "john@church.com",
    "phone": "0551234567",
    "address": "123 Main St",
    "role": "member",
    "branch_id": 1,
    "joined_date": "2025-01-15",
    "total_donations": 1500.00
  }
}
```

#### Update Member
```
PUT /members/:memberId
```

**Request Body:**
```json
{
  "member_name": "John D. Doe",
  "phone": "0559999999",
  "address": "456 New St"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Member updated successfully"
}
```

### Donations

#### Get All Donations
```
GET /donations?member_id=1&branch_id=1&start_date=2026-01-01&end_date=2026-06-30
```

**Query Parameters:**
- `member_id` (optional): Filter by member
- `branch_id` (optional): Filter by branch
- `start_date` (optional): Filter from date (YYYY-MM-DD)
- `end_date` (optional): Filter to date (YYYY-MM-DD)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "donation_id": 1,
      "donation_date": "2026-06-07T09:30:00Z",
      "total_amount": 150.00,
      "member_id": 1,
      "member_name": "John Doe",
      "branch_id": 1,
      "items": [
        {
          "donation_item_id": 1,
          "donation_type": "Tithe",
          "amount": 100.00
        },
        {
          "donation_item_id": 2,
          "donation_type": "Building Fund",
          "amount": 50.00
        }
      ]
    }
  ]
}
```

#### Create Donation
```
POST /donations
```

**Request Body:**
```json
{
  "member_id": 1,
  "branch_id": 1,
  "donation_date": "2026-06-07T10:00:00Z",
  "items": [
    {
      "donation_type": "General Offering",
      "amount": 100.00
    },
    {
      "donation_type": "Mission",
      "amount": 50.00
    }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "donation_id": 10,
    "total_amount": 150.00,
    "member_id": 1
  }
}
```

#### Get Donation Details
```
GET /donations/:donationId
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "donation_id": 1,
    "donation_date": "2026-06-07T09:30:00Z",
    "total_amount": 150.00,
    "member_id": 1,
    "member_name": "John Doe",
    "branch_id": 1,
    "items": [
      {
        "donation_item_id": 1,
        "donation_type": "Tithe",
        "amount": 100.00
      },
      {
        "donation_item_id": 2,
        "donation_type": "Building Fund",
        "amount": 50.00
      }
    ]
  }
}
```

### Pastors

#### Get All Pastors
```
GET /pastors?branch_id=1
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "pastor_id": 1,
      "pastor_name": "Pastor James Brown",
      "email": "pastor1@church.com",
      "phone": "0552222222",
      "branch_id": 1,
      "branch_name": "Main Branch"
    }
  ]
}
```

#### Create Pastor (Admin Only)
```
POST /pastors
```

**Request Body:**
```json
{
  "pastor_name": "Pastor New Person",
  "email": "pastor.new@church.com",
  "phone": "0559999999",
  "branch_id": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "pastor_id": 5,
    "pastor_name": "Pastor New Person",
    "email": "pastor.new@church.com",
    "branch_id": 1
  }
}
```

### Services

#### Get All Services
```
GET /services?branch_id=1&start_date=2026-06-01&end_date=2026-06-30
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "service_id": 1,
      "service_type": "Sunday Worship",
      "service_date": "2026-06-07T09:00:00Z",
      "branch_id": 1,
      "branch_name": "Main Branch"
    }
  ]
}
```

#### Create Service (Admin/Pastor Only)
```
POST /services
```

**Request Body:**
```json
{
  "service_type": "Sunday Worship",
  "service_date": "2026-06-14T09:00:00Z",
  "branch_id": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "service_id": 5,
    "service_type": "Sunday Worship",
    "service_date": "2026-06-14T09:00:00Z",
    "branch_id": 1
  }
}
```

### Departments

#### Get All Departments
```
GET /departments?branch_id=1
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "department_id": 1,
      "department_name": "Worship Team",
      "leader": "John Doe",
      "branch_id": 1,
      "branch_name": "Main Branch"
    }
  ]
}
```

#### Create Department (Admin Only)
```
POST /departments
```

**Request Body:**
```json
{
  "department_name": "Tech Team",
  "leader": "Jane Smith",
  "branch_id": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "department_id": 5,
    "department_name": "Tech Team",
    "leader": "Jane Smith",
    "branch_id": 1
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized - Missing or invalid token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Forbidden - You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error