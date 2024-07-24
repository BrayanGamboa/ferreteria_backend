'use strict';

const constants = require('./constants');
const environment = require('./environment');

//Import serializers
// const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
const UserSerializer = require('../../interfaces/serializers/UserSerializer');
const RoleSerializer = require('../../interfaces/serializers/RoleSerializer');


function buildBeans() {

  const beans = {
    // accessTokenManager: new JwtAccessTokenManager(),
    authUserSerializer: new UserSerializer(),
    authRoleSerializer: new RoleSerializer(),
  };

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY) {

  } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
    
  } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.POSTGRES) {
    //Import all repositories from the database
    const AuthUserRepositoryPostgres = require('../repositories/auth_user_repository_postgres');
    const AuthRoleRepositoryPostgres = require('../repositories/auth_role_repository_postgres');


    // All repositories are instantiated by adding them to the beans object.
    beans.authUserRepository = new AuthUserRepositoryPostgres();
    beans.authRoleRepository = new AuthRoleRepositoryPostgres();

  } else {

  }

  return beans;
}

module.exports = buildBeans();
