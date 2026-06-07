const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Branch = sequelize.define(
    'Branch',
    {
      branch_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'Branch_ID',
      },
      branch_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'Branch_Name',
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'Location',
      },
    },
    {
      tableName: 'BRANCH',
      timestamps: false,
      underscored: true,
    }
  );

  Branch.associate = (models) => {
    Branch.hasMany(models.Member, { foreignKey: 'branch_id', as: 'members' });
    Branch.hasMany(models.Pastor, { foreignKey: 'branch_id', as: 'pastors' });
    Branch.hasMany(models.Service, { foreignKey: 'branch_id', as: 'services' });
    Branch.hasMany(models.Donation, { foreignKey: 'branch_id', as: 'donations' });
    Branch.hasMany(models.Department, { foreignKey: 'branch_id', as: 'departments' });
  };

  return Branch;
};
