'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'mix_bill',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      site_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'mix_site',
          key: 'id'
        }
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'auth_user',
          key: 'id'
        }
      },
      employed_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'auth_user',
          key: 'id'
        }
      },
      note: {
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
      tableName: 'mix_bill',
      schema: 'mix',
      timestamps: false,
      indexes: [
        {
          name: 'mix_bill_pk',
          unique: true,
          fields: [{ name: 'id' }]
        }
      ]
    }
  );
};
