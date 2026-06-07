const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pastor = sequelize.define('Pastor', {
    pastor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pastor_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      validate: {
        isEmail: true,
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
    tableName: 'pastor',
    timestamps: true,
    underscored: true,
  });

  Pastor.associate = (models) => {
    Pastor.belongsTo(models.Branch, { foreignKey: 'branch_id' });
  };

  return Pastor;
};
