const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pastor = sequelize.define(
    'Pastor',
    {
      pastor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'Pastor_ID',
      },
      pastor_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'Pastor_Name',
      },
      phone: {
        type: DataTypes.STRING(20),
        field: 'Phone',
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        field: 'Email',
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'Branch_ID',
      },
    },
    {
      tableName: 'PASTOR',
      timestamps: false,
      underscored: true,
    }
  );

  Pastor.associate = (models) => {
    Pastor.belongsTo(models.Branch, { foreignKey: 'branch_id', as: 'branch' });
  };

  return Pastor;
};
