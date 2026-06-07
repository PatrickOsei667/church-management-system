const sequelize = require('../config/database');
const BranchModel = require('./Branch');
const MemberModel = require('./Member');
const PastorModel = require('./Pastor');
const ServiceModel = require('./Service');
const DonationModel = require('./Donation');
const DonationItemModel = require('./DonationItem');
const DepartmentModel = require('./Department');

const Branch = BranchModel(sequelize);
const Member = MemberModel(sequelize);
const Pastor = PastorModel(sequelize);
const Service = ServiceModel(sequelize);
const Donation = DonationModel(sequelize);
const DonationItem = DonationItemModel(sequelize);
const Department = DepartmentModel(sequelize);

// Set up associations
Branch.associate({ Member, Pastor, Service, Donation, Department });
Member.associate({ Branch, Donation });
Pastor.associate({ Branch });
Service.associate({ Branch });
Donation.associate({ Member, Branch, DonationItem });
DonationItem.associate({ Donation });
Department.associate({ Branch });

module.exports = {
  sequelize,
  Branch,
  Member,
  Pastor,
  Service,
  Donation,
  DonationItem,
  Department,
};
