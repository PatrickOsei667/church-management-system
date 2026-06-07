const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Donation = sequelize.define(
    'Donation',
    {
      donation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'Donation_ID',
      },
      donation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'Donation_Date',
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'Total_Amount',
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'Member_ID',
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'Branch_ID',
      },
    },
    {
      tableName: 'DONATION',
      timestamps: false,
      underscored: true,
    }
  );

  Donation.associate = (models) => {
    Donation.belongsTo(models.Member, { foreignKey: 'member_id', as: 'member' });
    Donation.belongsTo(models.Branch, { foreignKey: 'branch_id', as: 'branch' });
    Donation.hasMany(models.DonationItem, { foreignKey: 'donation_id', as: 'items' });
  };

  return Donation;
};
