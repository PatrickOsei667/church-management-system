const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const Member = sequelize.define('Member', {
    member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    member_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    address: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING(255),
    },
    role: {
      type: DataTypes.ENUM('member', 'admin', 'pastor'),
      defaultValue: 'member',
    },
    branch_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'branch',
        key: 'branch_id',
      },
    },
  },
  {
    tableName: 'member',
    timestamps: true,
    underscored: true,
  });

  // Hash password before saving
  Member.beforeCreate(async (member) => {
    if (member.password_hash) {
      const salt = await bcrypt.genSalt(10);
      member.password_hash = await bcrypt.hash(member.password_hash, salt);
    }
  });

  // Method to validate password
  Member.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password_hash);
  };

  Member.associate = (models) => {
    Member.belongsTo(models.Branch, { foreignKey: 'branch_id' });
    Member.hasMany(models.Donation, { foreignKey: 'member_id', onDelete: 'CASCADE' });
  };

  return Member;
};
