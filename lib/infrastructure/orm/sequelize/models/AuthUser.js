'use strict';
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'auth_user',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'auth_role',
          key: 'id'
        }
      },
      document_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'master_document_type',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'auth_user_email_uq'
      },
      date_birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      info: {
        type: DataTypes.JSON,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'auth_user',
      schema: 'auth',
      timestamps: false,
      indexes: [
        {
          name: 'auth_user_email_uq',
          unique: true,
          fields: [{ name: 'email' }]
        },
        {
          name: 'auth_user_pk',
          unique: true,
          fields: [{ name: 'id' }]
        }
      ]
    }
  );
};
