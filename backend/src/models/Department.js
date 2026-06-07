const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Department = sequelize.define('Department', {
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    department_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    leader: {
      type: DataTypes.STRING(100),
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
    tableName: 'department',
    timestamps: true,
    underscored: true,
  });

  Department.associate = (models) => {
    Department.belongsTo(models.Branch, { foreignKey: 'branch_id' });
  };

  return Department;
};
