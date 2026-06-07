const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Donation = sequelize.define('Donation', {
    donation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    donation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'member',
        key: 'member_id',
      },
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch',
        key: 'branch_id',
      },
    },
  },
  {
    tableName: 'donation',
    timestamps: true,
    underscored: true,
  });

  Donation.associate = (models) => {
    Donation.belongsTo(models.Member, { foreignKey: 'member_id' });
    Donation.belongsTo(models.Branch, { foreignKey: 'branch_id' });
    Donation.hasMany(models.DonationItem, { foreignKey: 'donation_id', onDelete: 'CASCADE' });
  };

  return Donation;
};
