const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Branch = sequelize.define('Branch', {
    branch_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    branch_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'branch',
    timestamps: true,
    underscored: true,
  });

  Branch.associate = (models) => {
    Branch.hasMany(models.Member, { foreignKey: 'branch_id', onDelete: 'SET NULL' });
    Branch.hasMany(models.Pastor, { foreignKey: 'branch_id', onDelete: 'CASCADE' });
    Branch.hasMany(models.Service, { foreignKey: 'branch_id', onDelete: 'CASCADE' });
    Branch.hasMany(models.Donation, { foreignKey: 'branch_id', onDelete: 'CASCADE' });
    Branch.hasMany(models.Department, { foreignKey: 'branch_id', onDelete: 'CASCADE' });
  };

  return Branch;
};
