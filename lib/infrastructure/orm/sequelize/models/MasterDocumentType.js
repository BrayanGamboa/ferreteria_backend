const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_document_type', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'master_document_type',
    schema: 'master',
    timestamps: false,
    indexes: [
      {
        name: "master_document_type_name_uq",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "master_document_type_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
