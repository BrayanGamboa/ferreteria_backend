const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth_role', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "auth_role_name_uq"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    info: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'auth_role',
    schema: 'auth',
    timestamps: false,
    indexes: [
      {
        name: "auth_role_name_uq",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "auth_role_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
