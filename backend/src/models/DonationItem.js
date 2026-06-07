const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DonationItem = sequelize.define(
    'DonationItem',
    {
      donation_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'DonationItem_ID',
      },
      donation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'Donation_ID',
      },
      donation_type: {
        type: DataTypes.STRING(100),
        field: 'Donation_Type',
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'Amount',
      },
    },
    {
      tableName: 'DONATION_ITEM',
      timestamps: false,
      underscored: true,
    }
  );

  DonationItem.associate = (models) => {
    DonationItem.belongsTo(models.Donation, { foreignKey: 'donation_id', as: 'donation' });
  };

  return DonationItem;
};
