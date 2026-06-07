-- Sample data for Church Management System

-- Insert Branch data
INSERT INTO BRANCH (Branch_Name, Location) VALUES
('Main Branch', '123 Church Street, City Center'),
('West Branch', '456 West Avenue, West District'),
('East Branch', '789 East Road, East District');

-- Insert Member data (with hashed passwords for demo)
INSERT INTO MEMBER (Member_Name, Phone, Address, Email, Password_Hash, Role, Branch_ID) VALUES
('John Doe', '0551234567', '123 Main St', 'john@church.com', '$2b$10$examplehash1', 'member', 1),
('Jane Smith', '0559876543', '456 Oak Ave', 'jane@church.com', '$2b$10$examplehash2', 'member', 1),
('Admin User', '0550000000', '789 Admin Ln', 'admin@church.com', '$2b$10$examplehash3', 'admin', 1),
('Pastor James', '0552222222', '321 Pastor Rd', 'pastor@church.com', '$2b$10$examplehash4', 'pastor', 1);

-- Insert Pastor data
INSERT INTO PASTOR (Pastor_Name, Phone, Email, Branch_ID) VALUES
('Pastor James Brown', '0552222222', 'pastor1@church.com', 1),
('Pastor Michael Johnson', '0553333333', 'pastor2@church.com', 2),
('Pastor David Williams', '0554444444', 'pastor3@church.com', 3);

-- Insert Service data
INSERT INTO SERVICE (Service_Type, Service_Date, Branch_ID) VALUES
('Sunday Worship', '2026-06-07 09:00:00', 1),
('Sunday Worship', '2026-06-07 10:00:00', 2),
('Wednesday Prayer', '2026-06-04 18:00:00', 1),
('Youth Meeting', '2026-06-06 19:00:00', 3);

-- Insert Donation data
INSERT INTO DONATION (Donation_Date, Total_Amount, Member_ID, Branch_ID) VALUES
('2026-06-07 09:30:00', 150.00, 1, 1),
('2026-06-07 10:00:00', 200.00, 2, 1),
('2026-06-04 18:15:00', 75.50, 1, 1),
('2026-06-01 09:00:00', 300.00, 2, 2);

-- Insert Donation Item data
INSERT INTO DONATION_ITEM (Donation_ID, Donation_Type, Amount) VALUES
(1, 'Tithe', 100.00),
(1, 'Building Fund', 50.00),
(2, 'General Offering', 200.00),
(3, 'Benevolence', 75.50),
(4, 'Mission', 300.00);

-- Insert Department data
INSERT INTO DEPARTMENT (Department_Name, Leader, Branch_ID) VALUES
('Worship Team', 'John Doe', 1),
('Sunday School', 'Jane Smith', 1),
('Youth Ministry', 'Michael Johnson', 2),
('Women Fellowship', 'Sarah Johnson', 3);