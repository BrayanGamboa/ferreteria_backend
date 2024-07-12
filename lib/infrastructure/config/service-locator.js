'use strict';

const constants = require('./constants');
const environment = require('./environment');

//Import serializers
// const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
const UserSerializer = require('../../interfaces/serializers/UserSerializer');

function buildBeans() {

  const beans = {
    // accessTokenManager: new JwtAccessTokenManager(),
    authUserSerializer: new UserSerializer(),
  };

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY) {
    // const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');
  } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
    // const UserRepositoryMongo = require('../repositories/UserRepositoryMongo');
  } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.POSTGRES) {
    const AuthUserRepositoryPostgres = require('../repositories/auth_user_repository_postgres');
    throw new Error('Add PostgreSQL support');  
  } else {
    // const UserRepositorySQLite= require('../repositories/UserRepositorySQLite');
  }

  return beans;
}

module.exports = buildBeans();
