'use strict';
var DataTypes = require('sequelize').DataTypes;
var _auth_role = require('./AuthRole');
var _auth_user = require('./AuthUser');
var _master_document_type = require('./MasterDocumentType');
var _mix_bill = require('./MixBill');
var _mix_bill_product = require('./MixBillProduct');
var _mix_category = require('./MixCategory');
var _mix_inventory = require('./MixInventory');
var _mix_site = require('./MixSite');
var _mix_product = require('./MixProduct');

function initModels(sequelize) {
  var auth_role = _auth_role(sequelize, DataTypes);
  var auth_user = _auth_user(sequelize, DataTypes);
  var master_document_type = _master_document_type(sequelize, DataTypes);
  var mix_bill = _mix_bill(sequelize, DataTypes);
  var mix_bill_product = _mix_bill_product(sequelize, DataTypes);
  var mix_product = _mix_product(sequelize, DataTypes);
  var mix_category = _mix_category(sequelize, DataTypes);
  var mix_inventory = _mix_inventory(sequelize, DataTypes);
  var mix_site = _mix_site(sequelize, DataTypes);

  auth_user.belongsTo(auth_role, { as: 'role', foreignKey: 'role_id' });
  auth_role.hasMany(auth_user, { as: 'auth_users', foreignKey: 'role_id' });
  auth_user.belongsTo(master_document_type, {
    as: 'document_type',
    foreignKey: 'document_type_id'
  });
  master_document_type.hasMany(auth_user, {
    as: 'auth_users',
    foreignKey: 'document_type_id'
  });
  mix_bill.belongsTo(auth_user, { as: 'client', foreignKey: 'client_id' });
  auth_user.hasMany(mix_bill, { as: 'mix_bills', foreignKey: 'client_id' });
  mix_bill.belongsTo(auth_user, { as: 'employed', foreignKey: 'employed_id' });
  auth_user.hasMany(mix_bill, {
    as: 'employed_mix_bills',
    foreignKey: 'employed_id'
  });
  mix_bill_product.belongsTo(mix_bill, { as: 'bill', foreignKey: 'bill_id' });
  mix_bill.hasMany(mix_bill_product, {
    as: 'mix_bill_products',
    foreignKey: 'bill_id'
  });
  mix_product.belongsTo(mix_category, {
    as: 'category',
    foreignKey: 'category_id'
  });
  mix_category.hasMany(mix_product, {
    as: 'mix_products',
    foreignKey: 'category_id'
  });
  mix_bill_product.belongsTo(mix_product, {
    as: 'product',
    foreignKey: 'product_id'
  });
  mix_product.hasMany(mix_bill_product, {
    as: 'mix_bill_products',
    foreignKey: 'product_id'
  });
  mix_inventory.belongsTo(mix_product, {
    as: 'product',
    foreignKey: 'product_id'
  });
  mix_product.hasMany(mix_inventory, {
    as: 'mix_inventories',
    foreignKey: 'product_id'
  });
  mix_bill.belongsTo(mix_site, { as: 'site', foreignKey: 'site_id' });
  mix_site.hasMany(mix_bill, { as: 'mix_bills', foreignKey: 'site_id' });
  mix_inventory.belongsTo(mix_site, { as: 'site', foreignKey: 'site_id' });
  mix_site.hasMany(mix_inventory, {
    as: 'mix_inventories',
    foreignKey: 'site_id'
  });

  return {
    auth_role,
    auth_user,
    master_document_type,
    mix_bill,
    mix_bill_product,
    mix_category,
    mix_inventory,
    mix_site,
    mix_product
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
