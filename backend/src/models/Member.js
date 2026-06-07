const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Member = sequelize.define(
    'Member',
    {
      member_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'Member_ID',
      },
      member_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'Member_Name',
      },
      phone: {
        type: DataTypes.STRING(20),
        field: 'Phone',
      },
      address: {
        type: DataTypes.STRING(255),
        field: 'Address',
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        field: 'Email',
      },
      password_hash: {
        type: DataTypes.STRING(255),
        field: 'Password_Hash',
      },
      role: {
        type: DataTypes.ENUM('member', 'admin', 'pastor'),
        defaultValue: 'member',
        field: 'Role',
      },
      branch_id: {
        type: DataTypes.INTEGER,
        field: 'Branch_ID',
      },
    },
    {
      tableName: 'MEMBER',
      timestamps: false,
      underscored: true,
    }
  );

  Member.associate = (models) => {
    Member.belongsTo(models.Branch, { foreignKey: 'branch_id', as: 'branch' });
    Member.hasMany(models.Donation, { foreignKey: 'member_id', as: 'donations' });
  };

  return Member;
};
