'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'mix_category',
    {
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
    },
    {
      sequelize,
      tableName: 'mix_category',
      schema: 'mix',
      timestamps: false,
      indexes: [
        {
          name: 'mix_category_pk',
          unique: true,
          fields: [{ name: 'id' }]
        }
      ]
    }
  );
};
