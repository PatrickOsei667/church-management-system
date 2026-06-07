const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Service = sequelize.define(
    'Service',
    {
      service_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'Service_ID',
      },
      service_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'Service_Type',
      },
      service_date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'Service_Date',
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'Branch_ID',
      },
    },
    {
      tableName: 'SERVICE',
      timestamps: false,
      underscored: true,
    }
  );

  Service.associate = (models) => {
    Service.belongsTo(models.Branch, { foreignKey: 'branch_id', as: 'branch' });
  };

  return Service;
};
