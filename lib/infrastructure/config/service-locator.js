'use strict';

const constants = require('./constants');
const environment = require('./environment');

//Import serializers
// const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
const UserSerializer = require('../../interfaces/serializers/UserSerializer');
const RoleSerializer = require('../../interfaces/serializers/RoleSerializer');
const DocumentTypeSerializer = require('../../interfaces/serializers/DocumentTypeSerializer');
const CategorySerializer = require('../../interfaces/serializers/CategorySerializer');
const BillSerializer = require('../../interfaces/serializers/BillSerializer');
const InventorySerializer = require('../../interfaces/serializers/InventorySerializer');
const ProductSerializer = require('../../interfaces/serializers/ProductSerializer');
const SiteSerializer = require('../../interfaces/serializers/SiteSerializer');
const BillProductSerializer = require('../../interfaces/serializers/BillProductSerializer');

function buildBeans() {
  const beans = {
    // accessTokenManager: new JwtAccessTokenManager(),
    authUserSerializer: new UserSerializer(),
    authRoleSerializer: new RoleSerializer(),
    masterDocumentTypeSerializer: new DocumentTypeSerializer(),
    mixCategorySerializer: new CategorySerializer(),
    billSerializer: new BillSerializer(),
    inventorySerializer: new InventorySerializer(),
    productSerializer: new ProductSerializer(),
    siteSerializer: new SiteSerializer(),
    billProductSerializer: new BillProductSerializer()
  };

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY) {
    console.error(`Dialect "${environment.database.dialect}" (DB) is not supported`);
  } else if (
    environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO
  ) {
    console.error(`Dialect "${environment.database.dialect}" (DB) is not supported`);
  } else if (
    environment.database.dialect === constants.SUPPORTED_DATABASE.POSTGRES
  ) {
    //Import all repositories from the database
    const AuthUserRepositoryPostgres = require('../repositories/auth_user_repository_postgres');
    const AuthRoleRepositoryPostgres = require('../repositories/auth_role_repository_postgres');
    const MasterDocumentTypePostgres = require('../repositories/master_document_type_repository_postgres');
    const MixCategoryPostgres = require('../repositories/mix_category_repository_postgres');

    // All repositories are instantiated by adding them to the beans object.
    beans.authUserRepository = new AuthUserRepositoryPostgres();
    beans.authRoleRepository = new AuthRoleRepositoryPostgres();
    beans.masterDocumentTypeRepository = new MasterDocumentTypePostgres();
    beans.mixCategoryRepository = new MixCategoryPostgres();
  } else {
    console.error(`Dialect (DB) is not supported`);
  }

  return beans;
}

module.exports = buildBeans();
