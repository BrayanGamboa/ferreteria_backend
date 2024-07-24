const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mix_site', {
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    number_phone: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    info: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'mix_site',
    schema: 'mix',
    timestamps: false,
    indexes: [
      {
        name: "mix_site_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
