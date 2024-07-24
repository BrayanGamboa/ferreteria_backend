const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mix_bill_product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mix_bill',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mix_product',
        key: 'id'
      }
    },
    info: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'mix_bill_product',
    schema: 'mix',
    timestamps: false,
    indexes: [
      {
        name: "mix_bill_product_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
