# Entity Relationship Diagram

## Visual Representation

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           BRANCH                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ PK  Branch_ID          INT                                              │
│     Branch_Name        VARCHAR(100)                                     │
│     Location           VARCHAR(255)                                     │
└─────────────────────────────────────────────────────────────────────────┘
     │
     ├─────────────────────────────┬──────────────────┬──────────────────┐
     │ 1:N                         │ 1:N              │ 1:N              │
     │                             │                  │                  │
┌────┴─────────────┐   ┌───────────┴────────┐  ┌──────┴──────────────┐  │
│     MEMBER       │   │      PASTOR        │  │     SERVICE        │  │
├──────────────────┤   ├────────────────────┤  ├────────────────────┤  │
│ PK Member_ID     │   │ PK Pastor_ID       │  │ PK Service_ID      │  │
│    Member_Name   │   │    Pastor_Name     │  │    Service_Type    │  │
│    Phone         │   │    Phone           │  │    Service_Date    │  │
│    Address       │   │    Email           │  │ FK Branch_ID       │  │
│    Email         │   │ FK Branch_ID       │  └────────────────────┘  │
│    Password_Hash │   │ (NOT NULL)         │                           │
│    Role          │   └────────────────────┘                           │
│ FK Branch_ID     │                                              ┌──────┴──────┐
│    (nullable)    │                                              │ DEPARTMENT   │
└────────┬─────────┘                                              ├──────────────┤
         │                                                        │ PK Dept_ID   │
         │ 1:N "makes"                                           │    Dept_Name │
         │                                                        │    Leader    │
    ┌────┴──────────────┐                                         │ FK Branch_ID │
    │    DONATION       │                                         └──────────────┘
    ├───────────────────┤
    │ PK Donation_ID    │
    │    Donation_Date  │
    │    Total_Amount   │
    │ FK Member_ID      │
    │ FK Branch_ID      │
    └────────┬──────────┘
             │
             │ 1:N "contains"
             │
    ┌────────┴──────────────────┐
    │   DONATION_ITEM            │
    ├────────────────────────────┤
    │ PK DonationItem_ID         │
    │ FK Donation_ID             │
    │    Donation_Type           │
    │    Amount                  │
    └────────────────────────────┘
```

## Relationship Summary

| Relationship | Type | Parent | Child | Constraint |
|---|---|---|---|---|
| Branch → Member | 1:N | BRANCH | MEMBER | ON DELETE SET NULL |
| Branch → Pastor | 1:N | BRANCH | PASTOR | ON DELETE CASCADE |
| Branch → Service | 1:N | BRANCH | SERVICE | ON DELETE CASCADE |
| Branch → Donation | 1:N | BRANCH | DONATION | ON DELETE CASCADE |
| Branch → Department | 1:N | BRANCH | DEPARTMENT | ON DELETE CASCADE |
| Member → Donation | 1:N | MEMBER | DONATION | ON DELETE CASCADE |
| Donation → DonationItem | 1:N | DONATION | DONATION_ITEM | ON DELETE CASCADE |

## Data Flow

```
User Registration → MEMBER
        ↓
   Member makes → DONATION → contains → DONATION_ITEM
        ↓              ↓
   Belongs to   Recorded at
        ↓              ↓
      BRANCH ←────────┘
        ↓
    Manages
        ↓
┌──────────────────────────┐
│  • PASTOR                │
│  • SERVICE               │
│  • DEPARTMENT            │
└──────────────────────────┘
```

## Normalization

The schema is normalized to **Third Normal Form (3NF)**:

1. **First Normal Form (1NF)**: All attributes contain atomic values. No repeating groups.
2. **Second Normal Form (2NF)**: All non-key attributes are fully dependent on the primary key.
3. **Third Normal Form (3NF)**: Non-key attributes depend only on the primary key, not on other non-key attributes.

## Key Constraints

### Primary Keys
- Each table has a surrogate primary key (auto-incrementing integer)
- Ensures uniqueness for all entity instances

### Foreign Keys
- Establish referential integrity between related tables
- Prevent orphaned records
- Support cascading operations (updates, deletes)

### Unique Constraints
- `MEMBER.Email` - UNIQUE (allows NULL for non-registered members)
- `PASTOR.Email` - UNIQUE (each pastor has unique email)

### NOT NULL Constraints
- Applied to required attributes like names, dates, amounts

## Design Patterns

### 1. One-to-Many (1:N)
- A branch can have many members
- A member can make many donations
- A donation can have many items

### 2. Audit Trails
- All tables include `Created_At` and `Updated_At` timestamps
- Enables tracking of record modifications

### 3. Soft Foreign Keys
- Member.Branch_ID is nullable (members can exist without branch)
- Allows flexibility in data entry

### 4. Cascade Operations
- Most branch-related entities cascade on deletion
- Ensures consistency when removing branches

## Query Patterns

### Get All Members in a Branch
```sql
SELECT * FROM MEMBER WHERE Branch_ID = 1;
```

### Get Total Donations by Member
```sql
SELECT 
    m.Member_Name, 
    SUM(d.Total_Amount) as Total_Donations
FROM MEMBER m
LEFT JOIN DONATION d ON m.Member_ID = d.Member_ID
GROUP BY m.Member_ID, m.Member_Name;
```

### Get Donation Breakdown by Type
```sql
SELECT 
    di.Donation_Type,
    COUNT(*) as Count,
    SUM(di.Amount) as Total
FROM DONATION_ITEM di
GROUP BY di.Donation_Type
ORDER BY Total DESC;
```

### Get Branch Statistics
```sql
SELECT 
    b.Branch_Name,
    COUNT(DISTINCT m.Member_ID) as Member_Count,
    COUNT(DISTINCT p.Pastor_ID) as Pastor_Count,
    SUM(d.Total_Amount) as Total_Donations
FROM BRANCH b
LEFT JOIN MEMBER m ON b.Branch_ID = m.Branch_ID
LEFT JOIN PASTOR p ON b.Branch_ID = p.Branch_ID
LEFT JOIN DONATION d ON b.Branch_ID = d.Branch_ID
GROUP BY b.Branch_ID, b.Branch_Name;
```