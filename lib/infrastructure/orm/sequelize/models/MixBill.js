const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mix_bill', {
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
    tableName: 'mix_bill',
    schema: 'mix',
    timestamps: false,
    indexes: [
      {
        name: "mix_bill_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
