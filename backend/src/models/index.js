const sequelize = require('../config/database');
const Branch = require('./Branch')(sequelize);
const Member = require('./Member')(sequelize);
const Pastor = require('./Pastor')(sequelize);
const Service = require('./Service')(sequelize);
const Donation = require('./Donation')(sequelize);
const DonationItem = require('./DonationItem')(sequelize);
const Department = require('./Department')(sequelize);

// Register associations
Object.keys({ Branch, Member, Pastor, Service, Donation, DonationItem, Department }).forEach(
  (modelName) => {
    const model = { Branch, Member, Pastor, Service, Donation, DonationItem, Department }[modelName];
    if (model.associate) {
      model.associate({ Branch, Member, Pastor, Service, Donation, DonationItem, Department });
    }
  }
);

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
