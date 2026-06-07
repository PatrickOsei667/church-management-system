# Database Documentation

## Overview

The Church Management System uses a relational database with 7 main entities. This document describes the database schema, relationships, and design decisions.

## Entity Relationship Diagram (ERD)

```
┌──────────────────┐
│     BRANCH       │
├──────────────────┤
│ Branch_ID (PK)   │
│ Branch_Name      │
│ Location         │
└──────────────────┘
         │ 1
         │
    ┌────┴──────────┬──────────────┐
    │               │              │
    │ N             │ N            │ N
    ├───────────────┴──────────────┤
┌────────────┐  ┌──────────┐  ┌──────────────┐
│   MEMBER   │  │  PASTOR  │  │   SERVICE    │
├────────────┤  ├──────────┤  ├──────────────┤
│Member_ID   │  │Pastor_ID │  │Service_ID    │
│Member_Name │  │Pastor..  │  │Service_Type  │
│Phone       │  │Email     │  │Service_Date  │
│Address     │  │Branch_ID │  │Branch_ID     │
│Email       │  │(FK)      │  │(FK)          │
│Password..  │  └──────────┘  └──────────────┘
│Role        │
│Branch_ID   │
│(FK)        │
└────────────┘
      │
      │ N (makes)
      │
    ┌─────────────────┐
    │   DONATION      │
    ├─────────────────┤
    │Donation_ID (PK) │
    │Donation_Date    │
    │Total_Amount     │
    │Member_ID (FK)   │
    │Branch_ID (FK)   │
    └─────────────────┘
            │
            │ 1
            │
            │ N (contains)
            │
    ┌───────────────────────┐
    │  DONATION_ITEM        │
    ├───────────────────────┤
    │DonationItem_ID (PK)   │
    │Donation_ID (FK)       │
    │Donation_Type          │
    │Amount                 │
    └───────────────────────┘

┌──────────────────┐
│   DEPARTMENT     │
├──────────────────┤
│Department_ID(PK) │
│Department_Name   │
│Leader            │
│Branch_ID (FK)    │
└──────────────────┘
```

## Table Definitions

### BRANCH
Stores information about church branches/locations.

| Column | Type | Constraints | Description |
|--------|------|-------------|--------------|
| Branch_ID | INT | PRIMARY KEY, AUTO_INCREMENT | Unique branch identifier |
| Branch_Name | VARCHAR(100) | NOT NULL | Name of the branch |
| Location | VARCHAR(255) | NOT NULL | Physical location/address |
| Created_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| Updated_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record update timestamp |

### MEMBER
Stores information about church members.

| Column | Type | Constraints | Description |
|--------|------|-------------|--------------|
| Member_ID | INT | PRIMARY KEY, AUTO_INCREMENT | Unique member identifier |
| Member_Name | VARCHAR(100) | NOT NULL | Full name of member |
| Phone | VARCHAR(20) | | Phone number |
| Address | VARCHAR(255) | | Home address |
| Email | VARCHAR(100) | UNIQUE | Email address |
| Password_Hash | VARCHAR(255) | | Hashed password (bcrypt) |
| Role | ENUM | DEFAULT 'member' | User role (member, admin, pastor) |
| Branch_ID | INT | FOREIGN KEY | Reference to branch |
| Created_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| Updated_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record update timestamp |

### PASTOR
Stores information about pastors.

| Column | Type | Constraints | Description |
|--------|------|-------------|--------------|
| Pastor_ID | INT | PRIMARY KEY, AUTO_INCREMENT | Unique pastor identifier |
| Pastor_Name | VARCHAR(100) | NOT NULL | Full name of pastor |
| Phone | VARCHAR(20) | | Phone number |
| Email | VARCHAR(100) | UNIQUE | Email address |
| Branch_ID | INT | FOREIGN KEY, NOT NULL | Reference to branch |
| Created_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| Updated_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record update timestamp |

### SERVICE
Stores information about church services.

| Column | Type | Constraints | Description |
|--------|------|-------------|--------------|
| Service_ID | INT | PRIMARY KEY, AUTO_INCREMENT | Unique service identifier |
| Service_Type | VARCHAR(100) | NOT NULL | Type of service (Worship, Prayer, etc) |
| Service_Date | DATETIME | NOT NULL | Date and time of service |
| Branch_ID | INT | FOREIGN KEY, NOT NULL | Reference to branch |
| Created_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| Updated_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record update timestamp |

### DONATION
Stores donation records from members.

| Column | Type | Constraints | Description |
|--------|------|-------------|--------------|
| Donation_ID | INT | PRIMARY KEY, AUTO_INCREMENT | Unique donation identifier |
| Donation_Date | DATETIME | NOT NULL | Date and time of donation |
| Total_Amount | DECIMAL(10,2) | NOT NULL | Total donation amount |
| Member_ID | INT | FOREIGN KEY, NOT NULL | Reference to member |
| Branch_ID | INT | FOREIGN KEY, NOT NULL | Reference to branch |
| Created_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| Updated_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record update timestamp |

### DONATION_ITEM
Stores individual items/categories within a donation.

| Column | Type | Constraints | Description |
|--------|------|-------------|--------------|
| DonationItem_ID | INT | PRIMARY KEY, AUTO_INCREMENT | Unique item identifier |
| Donation_ID | INT | FOREIGN KEY, NOT NULL | Reference to donation |
| Donation_Type | VARCHAR(100) | | Type of donation (Tithe, Offering, etc) |
| Amount | DECIMAL(10,2) | NOT NULL | Item amount |
| Created_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| Updated_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record update timestamp |

### DEPARTMENT
Stores information about church departments.

| Column | Type | Constraints | Description |
|--------|------|-------------|--------------|
| Department_ID | INT | PRIMARY KEY, AUTO_INCREMENT | Unique department identifier |
| Department_Name | VARCHAR(100) | NOT NULL | Name of department |
| Leader | VARCHAR(100) | | Department leader name |
| Branch_ID | INT | FOREIGN KEY, NOT NULL | Reference to branch |
| Created_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| Updated_At | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record update timestamp |

## Relationships

### BRANCH → MEMBER (1:N)
- One branch can have many members
- Branch_ID is a foreign key in MEMBER table
- ON DELETE SET NULL (if branch deleted, member's branch becomes NULL)

### BRANCH → PASTOR (1:N)
- One branch can have many pastors
- Branch_ID is a foreign key in PASTOR table
- ON DELETE CASCADE (if branch deleted, pastors are deleted)

### BRANCH → SERVICE (1:N)
- One branch can host many services
- Branch_ID is a foreign key in SERVICE table
- ON DELETE CASCADE (if branch deleted, services are deleted)

### BRANCH → DONATION (1:N)
- One branch can receive many donations
- Branch_ID is a foreign key in DONATION table
- ON DELETE CASCADE (if branch deleted, donations are deleted)

### BRANCH → DEPARTMENT (1:N)
- One branch can have many departments
- Branch_ID is a foreign key in DEPARTMENT table
- ON DELETE CASCADE (if branch deleted, departments are deleted)

### MEMBER → DONATION (1:N)
- One member can make many donations
- Member_ID is a foreign key in DONATION table
- ON DELETE CASCADE (if member deleted, their donations are deleted)

### DONATION → DONATION_ITEM (1:N)
- One donation can have many items
- Donation_ID is a foreign key in DONATION_ITEM table
- ON DELETE CASCADE (if donation deleted, items are deleted)

## Indexes

Indexes are created for frequently queried columns to improve performance:

- `idx_member_branch` on MEMBER(Branch_ID)
- `idx_member_email` on MEMBER(Email)
- `idx_pastor_branch` on PASTOR(Branch_ID)
- `idx_service_branch` on SERVICE(Branch_ID)
- `idx_service_date` on SERVICE(Service_Date)
- `idx_donation_member` on DONATION(Member_ID)
- `idx_donation_branch` on DONATION(Branch_ID)
- `idx_donation_date` on DONATION(Donation_Date)
- `idx_donation_item_donation` on DONATION_ITEM(Donation_ID)
- `idx_department_branch` on DEPARTMENT(Branch_ID)

## Design Decisions

1. **Normalization**: Schema is normalized to 3NF to eliminate redundancy and maintain data integrity.

2. **Surrogate Keys**: All tables use auto-increment integer primary keys for better performance and flexibility.

3. **Soft Deletes**: Currently not implemented, but can be added using a `Deleted_At` timestamp column if needed.

4. **Audit Columns**: All tables include `Created_At` and `Updated_At` timestamps for audit trails.

5. **Password Storage**: Member passwords should be hashed using bcrypt with appropriate salt rounds (minimum 10).

6. **Referential Integrity**: Foreign key constraints ensure data consistency across related tables.

7. **Cascading Deletes**: Some relationships use ON DELETE CASCADE to automatically clean up related records when parent records are deleted.