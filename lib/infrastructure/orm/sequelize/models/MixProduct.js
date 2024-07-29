'use strict';
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'mix_product',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'mix_category',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      info: {
        type: DataTypes.JSON,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'mix_product',
      schema: 'mix',
      timestamps: false,
      indexes: [
        {
          name: 'mix_product_pk',
          unique: true,
          fields: [{ name: 'id' }]
        }
      ]
    }
  );
};
