const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mix_inventory', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mix_product',
        key: 'id'
      }
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mix_site',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    info: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'mix_inventory',
    schema: 'mix',
    timestamps: false,
    indexes: [
      {
        name: "mix_inventory_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
