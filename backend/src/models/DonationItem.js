const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DonationItem = sequelize.define('DonationItem', {
    donation_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    donation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'donation',
        key: 'donation_id',
      },
    },
    donation_type: {
      type: DataTypes.STRING(100),
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: 'donation_item',
    timestamps: true,
    underscored: true,
  });

  DonationItem.associate = (models) => {
    DonationItem.belongsTo(models.Donation, { foreignKey: 'donation_id' });
  };

  return DonationItem;
};
