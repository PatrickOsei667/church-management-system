const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Department = sequelize.define(
    'Department',
    {
      department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'Department_ID',
      },
      department_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'Department_Name',
      },
      leader: {
        type: DataTypes.STRING(100),
        field: 'Leader',
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'Branch_ID',
      },
    },
    {
      tableName: 'DEPARTMENT',
      timestamps: false,
      underscored: true,
    }
  );

  Department.associate = (models) => {
    Department.belongsTo(models.Branch, { foreignKey: 'branch_id', as: 'branch' });
  };

  return Department;
};
