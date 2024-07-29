'use strict';
var DataTypes = require('sequelize').DataTypes;
var _auth_role = require('./AuthRole');
var _auth_user = require('./AuthUser');
var _geocode_settings = require('./GeocodeSettings');
var _geocode_settings_default = require('./GeocodeSettingsDefault');
var _geography_columns = require('./GeographyColumns');
var _geometry_columns = require('./GeometryColumns');
var _layer = require('./Layer');
var _loader_lookuptables = require('./LoaderLookuptables');
var _loader_platform = require('./LoaderPlatform');
var _loader_variables = require('./LoaderVariables');
var _master_document_type = require('./MasterDocumentType');
var _mix_bill = require('./MixBill');
var _mix_bill_product = require('./MixBillProduct');
var _mix_category = require('./MixCategory');
var _mix_inventory = require('./MixInventory');
var _mix_site = require('./MixSite');
var _pagc_gaz = require('./PagcGaz');
var _pagc_lex = require('./PagcLex');
var _pagc_rules = require('./PagcRules');
var _pg_stat_statements = require('./PgStatStatements');
var _pg_stat_statements_info = require('./PgStatStatementsInfo');
var _raster_columns = require('./RasterColumns');
var _raster_overviews = require('./RasterOverviews');
var _topology = require('./Topology');

function initModels(sequelize) {
  var auth_role = _auth_role(sequelize, DataTypes);
  var auth_user = _auth_user(sequelize, DataTypes);
  var geocode_settings = _geocode_settings(sequelize, DataTypes);
  var geocode_settings_default = _geocode_settings_default(
    sequelize,
    DataTypes
  );
  var geography_columns = _geography_columns(sequelize, DataTypes);
  var geometry_columns = _geometry_columns(sequelize, DataTypes);
  var layer = _layer(sequelize, DataTypes);
  var loader_lookuptables = _loader_lookuptables(sequelize, DataTypes);
  var loader_platform = _loader_platform(sequelize, DataTypes);
  var loader_variables = _loader_variables(sequelize, DataTypes);
  var master_document_type = _master_document_type(sequelize, DataTypes);
  var mix_bill = _mix_bill(sequelize, DataTypes);
  var mix_bill_product = _mix_bill_product(sequelize, DataTypes);
  var mix_category = _mix_category(sequelize, DataTypes);
  var mix_inventory = _mix_inventory(sequelize, DataTypes);
  var mix_site = _mix_site(sequelize, DataTypes);
  var pagc_gaz = _pagc_gaz(sequelize, DataTypes);
  var pagc_lex = _pagc_lex(sequelize, DataTypes);
  var pagc_rules = _pagc_rules(sequelize, DataTypes);
  var pg_stat_statements = _pg_stat_statements(sequelize, DataTypes);
  var pg_stat_statements_info = _pg_stat_statements_info(sequelize, DataTypes);
  var raster_columns = _raster_columns(sequelize, DataTypes);
  var raster_overviews = _raster_overviews(sequelize, DataTypes);
  var topology = _topology(sequelize, DataTypes);

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
    geocode_settings,
    geocode_settings_default,
    geography_columns,
    geometry_columns,
    layer,
    loader_lookuptables,
    loader_platform,
    loader_variables,
    master_document_type,
    mix_bill,
    mix_bill_product,
    mix_category,
    mix_inventory,
    mix_site,
    pagc_gaz,
    pagc_lex,
    pagc_rules,
    pg_stat_statements,
    pg_stat_statements_info,
    raster_columns,
    raster_overviews,
    topology
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
