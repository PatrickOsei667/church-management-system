const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Service = sequelize.define('Service', {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    service_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    service_date: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: 'service',
    timestamps: true,
    underscored: true,
  });

  Service.associate = (models) => {
    Service.belongsTo(models.Branch, { foreignKey: 'branch_id' });
  };

  return Service;
};
